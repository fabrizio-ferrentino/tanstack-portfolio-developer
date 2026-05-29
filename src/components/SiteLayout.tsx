import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Coffee, Github, Heart, Menu, X } from "lucide-react";
import { ThemePicker } from "@/components/ThemePicker";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n, type TKey } from "@/lib/i18n";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site } from "@/lib/site";

const NAV = [
  { to: "/", labelKey: "nav.home", match: "exact" },
  { to: "/about", labelKey: "nav.about", match: "exact" },
  { to: "/experience", labelKey: "nav.experience", match: "exact" },
  { to: "/works", labelKey: "nav.works", match: "prefix" },
  { to: "/contact", labelKey: "nav.contact", match: "exact" },
] as const;

function isActive(pathname: string, item: (typeof NAV)[number]) {
  return item.match === "prefix"
    ? pathname === item.to || pathname.startsWith(item.to + "/")
    : pathname === item.to;
}

type Indicator = { left: number; width: number; ready: boolean };

export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);

  // Animated underline indicator (desktop nav)
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0, ready: false });
  // Disable transition only for the very first measurement, so the bar
  // appears already in place. Every later update animates smoothly.
  const [animEnabled, setAnimEnabled] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let raf = 0;

    function measure(): Indicator | null {
      const activeItem = NAV.find((item) => isActive(pathname, item));
      if (!activeItem) return null;
      const el = linkRefs.current.get(activeItem.to);
      if (!el || !nav) return null;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      if (elRect.width <= 0) return null;
      return {
        left: elRect.left - navRect.left,
        width: elRect.width,
        ready: true,
      };
    }

    function apply() {
      const next = measure();
      if (!next) {
        // No nav item matches the current route (e.g. /privacy).
        // Hide the underline indicator instead of leaving it on the last position.
        setIndicator((prev) =>
          prev.ready || prev.width !== 0 ? { left: 0, width: 0, ready: false } : prev,
        );
        return;
      }
      setIndicator((prev) =>
        prev.ready &&
          Math.abs(prev.left - next.left) < 0.5 &&
          Math.abs(prev.width - next.width) < 0.5
          ? prev
          : next,
      );
    }

    apply();

    // Re-measure after fonts load (Fraunces / JetBrains Mono shift widths).
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) apply();
        })
        .catch(() => undefined);
    }

    // Re-measure on viewport / nav size changes.
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    window.addEventListener("resize", onResize);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(onResize);
      observer.observe(nav);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
    // Re-run when route or language changes (label widths can differ).
  }, [pathname, lang]);

  // Enable CSS transitions only AFTER the first paint with a measured
  // indicator. This guarantees the very first click animates from the
  // current active item, not from (0,0).
  useEffect(() => {
    if (animEnabled || !indicator.ready) return;
    const id = requestAnimationFrame(() => setAnimEnabled(true));
    return () => cancelAnimationFrame(id);
  }, [animEnabled, indicator.ready]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="container-prose pt-8 pb-4 sm:pt-12">
        <div className="flex items-center justify-between gap-6">
          <Link
            to="/"
            className="font-display text-2xl tracking-tight hover:text-primary transition-colors"
          >
            {site.name.split(" ")[0]}<span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            <nav
              ref={navRef}
              className="relative flex items-center gap-5 sm:gap-9 text-sm font-mono-tight tracking-wide"
            >
              {NAV.map((item) => {
                const active = isActive(pathname, item);
                const label = t(item.labelKey as TKey);
                const first = label.charAt(0);
                const rest = label.slice(1).toLowerCase();
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    ref={(el) => {
                      if (el) linkRefs.current.set(item.to, el);
                      else linkRefs.current.delete(item.to);
                    }}
                    className={
                      "relative pb-2 inline-flex items-baseline transition-colors " +
                      (active
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground")
                    }
                  >
                    <span className="font-display text-base leading-none">{first}</span>
                    <span>{rest}</span>
                  </Link>
                );
              })}
              {/* Animated underline — fixed width, slides left/right */}
              <span
                aria-hidden="true"
                className={
                  "pointer-events-none absolute bottom-0 left-0 h-[2px] w-6 bg-primary " +
                  (animEnabled
                    ? "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                    : "")
                }
                style={{
                  transform: `translateX(${indicator.left + indicator.width / 2 - 12}px)`,
                  opacity: indicator.ready && indicator.width > 0 ? 1 : 0,
                }}
              />
            </nav>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ThemePicker />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemePicker />
            <button
              type="button"
              aria-label={t("nav.openMenu")}
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-border text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={
          "md:hidden fixed inset-0 z-50 transition-opacity duration-200 " +
          (open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label={t("nav.closeMenu")}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Panel */}
        <div
          className={
            "absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background border-l border-border shadow-2xl flex flex-col transition-transform duration-300 " +
            (open ? "translate-x-0" : "translate-x-full")
          }
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-6 pt-8 pb-4">
            <span className="font-mono-tight text-xs uppercase tracking-widest text-muted-foreground">
              {t("nav.menu")}
            </span>
            <button
              type="button"
              aria-label={t("nav.closeMenu")}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 px-6 pt-4 pb-10 flex flex-col gap-2">
            {NAV.map((item, i) => {
              const active = isActive(pathname, item);
              const num = String(i + 1).padStart(2, "0");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={
                    "group flex items-baseline gap-4 py-3 border-b border-border/60 transition-colors " +
                    (active
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground")
                  }
                >
                  <span className="font-mono-tight text-xs text-muted-foreground tabular-nums w-6">
                    {num}
                  </span>
                  <span className="font-display text-3xl tracking-tight leading-none">
                    {t(item.labelKey as TKey)}
                  </span>
                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-primary self-center" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-6 pb-8 text-xs font-mono-tight text-muted-foreground">
            © {new Date().getFullYear()} {site.name}
          </div>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <ScrollToTop />

      <footer className="mt-24 border-t border-border">
        <div className="container-prose py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground font-mono-tight">
            {/* Left side */}
            <div className="flex flex-col items-center gap-1 md:flex-row md:items-center md:gap-2 md:flex-wrap md:justify-start">
              <span>© {new Date().getFullYear()} {site.name}</span>
              <span className="hidden sm:inline">·</span>
              <Link
                to="/privacy"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <span className="hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>and</span>
                <Coffee className="w-4 h-4 text-amber-600" />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <span>Built with TanStack & React</span>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
