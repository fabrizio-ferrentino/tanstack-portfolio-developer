import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { site } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${site.name}` },
      {
        name: "description",
        content: `Privacy Policy for ${site.website}.`,
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang, t } = useI18n();
  const updated = "01/01/1970";
  return (
    <section className="container-prose pt-16 sm:pt-24 pb-24">
      <Link
        to="/"
        className="term-logo inline-flex items-center font-mono-tight text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        {t("privacy.backHome")}
      </Link>
      <p className="kicker font-mono-tight text-sm uppercase tracking-[0.22em] text-primary mb-6">
        {lang === "it" ? "Informativa" : "Legal"}
      </p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] leading-[1] tracking-[-0.03em] font-medium">
        Privacy Policy<span className="text-primary">.</span>
      </h1>
      <p className="kicker mt-4 font-mono-tight text-sm text-muted-foreground">
        {lang === "it" ? "Ultimo aggiornamento" : "Last updated"}: {updated}
      </p>

      <div className="prose-content mt-12 space-y-8 text-foreground/85 leading-relaxed max-w-3xl">
        {lang === "it" ? <ItalianPolicy /> : <EnglishPolicy />}
      </div>
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mt-10 mb-3">
      {children}
    </h2>
  );
}

function ItalianPolicy() {
  return (
    <>
      <p className="kicker">
        Sostituisci questa sezione con una informativa reale, redatta da un professionista, prima di pubblicare il sito.
      </p>
    </>
  );
}

function EnglishPolicy() {
  return (
    <>
      <p className="kicker">
        Replace this section with your actual privacy policy, reviewed by a legal professional, before publishing your site.
      </p>
    </>
  );
}
