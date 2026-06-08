import { createFileRoute, Link } from "@tanstack/react-router";
import { WorkCard } from "@/components/WorkCard";
import { site } from "@/lib/site";
import { getFeaturedWorks, localizeWorks } from "@/lib/works";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Rivera - Home" },
      {
        name: "description",
        content:
          "Personal site of Alex Rivera, a Software Developer based in San Francisco working on web apps and APIs.",
      },
      { property: "og:title", content: "Alex Rivera - Home" },
      {
        property: "og:description",
        content:
          "Building web apps & APIs. Currently @ TechCorp. Based in San Francisco, CA.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useI18n();
  const featured = localizeWorks(getFeaturedWorks(), lang);

  return (
    <>
      <section id="main" className="container-prose pt-16 sm:pt-28 pb-20">
        <p className="kicker font-mono-tight text-sm uppercase tracking-[0.22em] text-primary mb-8">
          {t("home.hello")}
        </p>

        <h1 className="font-display text-[clamp(3rem,11vw,8.5rem)] leading-[0.95] tracking-[-0.03em] font-medium text-balance">
          {t("home.headline")}<span className="text-primary">.</span>
        </h1>

        <div className="mt-10 max-w-2xl text-xl sm:text-2xl leading-snug text-foreground/85 text-pretty">
          <p className="kicker">
            {t("home.introA")}{" "}
            <a
              href={site.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-foreground"
            >
              {site.company}
            </a>
            {t("home.introB")}{" "}
            <span className="text-primary">{t("home.italy")}</span>.
          </p>
          <p className="kicker mt-3">
            {t("home.introC")}{" "}
            <Link to="/about" className="link-underline text-foreground">
              {t("home.aboutPage")}
            </Link>{" "}
            {t("home.and")}{" "}
            <Link to="/experience" className="link-underline text-foreground">
              {t("home.logbook")}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container-prose pb-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
            {t("home.featured")}
          </h2>
          <Link
            to="/works"
            className="term-logo font-mono-tight text-sm text-foreground/70 hover:text-primary transition-colors lowercase"
          >
            {t("home.seeAll")}
          </Link>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((w) => (
            <li key={w.slug}>
              <WorkCard work={w} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            to="/works"
            className="term-logo font-mono-tight text-sm lowercase text-foreground/80 hover:text-primary transition-colors border-b border-border pb-1"
          >
            {t("home.seeAll")}
          </Link>
        </div>
      </section>
    </>
  );
}

