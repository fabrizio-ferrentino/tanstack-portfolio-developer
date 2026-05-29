import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

const profile = "https://placehold.co/400x400/cbd5e1/94a3b8?text=Photo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Alex Rivera - About" },
      {
        name: "description",
        content:
          "About Alex Rivera — a Software Developer who enjoys web platforms, APIs, and small honest tools.",
      },
      { property: "og:title", content: "Alex Rivera - About" },
      {
        property: "og:description",
        content: "A short note about who I am and what I do.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="container-prose pt-10 sm:pt-16 pb-24 max-w-3xl">
        <p className="font-mono-tight text-sm uppercase tracking-[0.2em] text-primary mb-4">
          {t("about.kicker")}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-balance">
          {t("about.title")}
        </h1>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-10">
          <img
            src={profile}
            alt={t("about.title")}
            loading="eager"
            className="w-44 sm:w-[220px] sm:flex-shrink-0 aspect-square object-cover rounded-2xl border border-border shadow-md"
          />
          <div className="flex-1 min-w-0 space-y-6 text-lg leading-relaxed text-foreground/85 text-pretty">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </div>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-8 border-t border-border pt-10">
          <Block title={t("about.workWithTitle")}>{t("about.workWithBody")}</Block>
          <Block title={t("about.learningTitle")}>{t("about.learningBody")}</Block>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono-tight text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
        {title}
      </p>
      <p className="text-foreground/85 leading-relaxed">{children}</p>
    </div>
  );
}
