import { useEffect, useRef, useState } from "react";
import { Check, Palette, X } from "lucide-react";
import { THEMES, THEME_STORAGE_KEY, DEFAULT_THEME, FAVICON_COLORS, buildFaviconDataUrl, type ThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", id);
  applyFavicon(id);
}

function applyFavicon(id: ThemeId) {
  if (typeof document === "undefined") return;
  const href = buildFaviconDataUrl(id);
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    document.head.appendChild(link);
  }
  link.href = href;
}

function readStoredTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
  if (stored && THEMES.some((t) => t.id === stored)) return stored;
  return DEFAULT_THEME;
}

export function ThemePicker() {
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    const stored = readStoredTheme();
    setActive(stored);
    applyTheme(stored);
  }, []);

  // Outside click + Escape to close.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function selectTheme(id: ThemeId) {
    setActive(id);
    applyTheme(id);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Change color theme"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border/70",
          "text-foreground/70 transition-all duration-300 hover:text-primary hover:border-primary/60 hover:rotate-12 hover:scale-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <Palette className="h-4 w-4" />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Select Theme"
        aria-hidden={!open}
        className={cn(
          "absolute right-0 top-full z-50 mt-3 w-72 origin-top-right",
          "rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl",
          "transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <h3 className="font-display text-base tracking-tight">Select Theme</h3>
          <button
            type="button"
            aria-label="Close theme picker"
            onClick={() => setOpen(false)}
            className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <ul className="max-h-[60vh] overflow-auto p-2 pt-1">
          {THEMES.map((theme) => {
            const isActive = theme.id === active;
            return (
              <li key={theme.id}>
                <button
                  type="button"
                  onClick={() => selectTheme(theme.id)}
                  aria-checked={isActive}
                  role="radio"
                  className={cn(
                    "group flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5",
                    "text-left transition-colors",
                    isActive
                      ? "bg-foreground/[0.06]"
                      : "hover:bg-foreground/[0.04]",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono-tight text-xs uppercase tracking-wider",
                      isActive ? "text-primary" : "text-foreground/80",
                    )}
                  >
                    {theme.name}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <span
                      className="flex overflow-hidden rounded-full ring-1 ring-foreground/10"
                      aria-hidden="true"
                    >
                      {theme.swatches.map((c, i) => (
                        <span
                          key={i}
                          className="h-4 w-4"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </span>
                    {isActive && (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * Inline script string to apply the stored theme + matching favicon
 * before first paint (prevents a flash of the default theme/icon on load).
 * Inject via dangerouslySetInnerHTML in the root <head>.
 */
export const themeBootScript = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var d=${JSON.stringify(DEFAULT_THEME)};var t=localStorage.getItem(k)||d;var C=${JSON.stringify(
  FAVICON_COLORS,
)};if(t)document.documentElement.setAttribute('data-theme',t);var c=C[t]||C[d];var s="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='"+c.bg+"'/><text x='14' y='46' font-family='Georgia,serif' font-weight='600' font-size='40' fill='"+c.fg+"'>F</text><circle cx='44' cy='46' r='4' fill='"+c.dot+"'/></svg>";var h='data:image/svg+xml;utf8,'+encodeURIComponent(s);var l=document.querySelector("link[rel~='icon']");if(!l){l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';document.head.appendChild(l);}l.href=h;}catch(e){}})();`;

