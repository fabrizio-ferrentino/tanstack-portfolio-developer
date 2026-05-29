import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  const opts: Lang[] = ["en", "it"];
  const activeIndex = opts.indexOf(lang);

  return (
    <div
      role="group"
      aria-label={t("lang.switchTo")}
      className={cn(
        "relative inline-flex h-9 items-center rounded-full border border-border/70 p-0.5",
        "font-mono-tight text-[11px] uppercase tracking-[0.14em]",
        "transition-colors hover:border-primary/60",
      )}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-primary",
          "shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        )}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {opts.map((opt) => {
        const active = lang === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => setLang(opt)}
            aria-pressed={active}
            className={cn(
              "relative z-10 inline-flex h-8 min-w-[2.25rem] cursor-pointer items-center justify-center rounded-full px-2.5",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "text-primary-foreground"
                : "text-foreground/60 hover:text-foreground",
            )}
          >
            {t(opt === "en" ? "lang.en" : "lang.it")}
          </button>
        );
      })}
    </div>
  );
}
