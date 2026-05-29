import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function ScrollToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label={t("scrollToTop")}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "inline-flex h-10 w-10 items-center justify-center",
        "rounded-md border border-border bg-background",
        "text-foreground shadow-sm",
        "transition-all duration-300 ease-out",
        "cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-3 opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
