import { createFileRoute, Link } from "@tanstack/react-router";
import { works, localizeWorks, type Work, type WorkCategory } from "@/lib/works";
import { useI18n, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/works/")({
  head: () => ({
    meta: [
      { title: "Alex Rivera - Works" },
      {
        name: "description",
        content:
          "A selection of things I've built — web apps, APIs, dashboards, and a few side projects.",
      },
      { property: "og:title", content: "Alex Rivera - Works" },
      {
        property: "og:description",
        content:
          "A selection of things I've built — web apps, APIs, dashboards, and a few side projects.",
      },
    ],
  }),
  component: WorksIndex,
});

/**
 * Group works by category: paid/professional work first, then personal/side projects.
 */
const CATEGORY_ORDER: WorkCategory[] = ["work", "personal"];
const CATEGORY_LABEL_KEY: Record<WorkCategory, TKey> = {
  work: "works.groupWork",
  personal: "works.groupPersonal",
};

function groupByCategory(items: Work[]): { category: WorkCategory; items: Work[] }[] {
  const groups = new Map<WorkCategory, Work[]>();
  for (const w of items) {
    if (!groups.has(w.category)) groups.set(w.category, []);
    groups.get(w.category)!.push(w);
  }
  return CATEGORY_ORDER.filter((c) => groups.has(c)).map((category) => ({
    category,
    items: groups.get(category)!,
  }));
}

function WorksIndex() {
  const { t, lang } = useI18n();
  const localized = localizeWorks(works, lang);
  const grouped = groupByCategory(localized);

  return (
    <>
      <section className="container-prose pt-16 sm:pt-24 pb-12">
        <p className="kicker font-mono-tight text-sm uppercase tracking-[0.22em] text-primary mb-6">
          {t("works.kicker")} · {works.length}
        </p>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] tracking-[-0.02em] font-medium text-balance">
          {t("works.title")}<span className="text-primary">.</span>
        </h1>
        <p className="kicker mt-8 max-w-2xl text-lg sm:text-xl leading-snug text-foreground/80 text-pretty">
          {t("works.lede")}
        </p>
      </section>

      <section className="container-prose pb-28">
        {grouped.map(({ category, items }) => (
          <div key={category} className="mt-14 first:mt-6">
            <header className="flex items-baseline justify-between border-b border-border pb-3 mb-2">
              <h2 className="font-mono-tight text-xs sm:text-sm uppercase tracking-[0.22em] text-foreground/60">
                {t(CATEGORY_LABEL_KEY[category])}
              </h2>
              <span className="font-mono-tight text-xs uppercase tracking-[0.18em] text-foreground/40 tabular-nums">
                {items.length}{" "}
                {items.length === 1 ? t("works.project") : t("works.projects")}
              </span>
            </header>

            <ul>
              {items.map((w) => (
                <li key={w.slug}>
                  <WorkRow work={w} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}

function WorkRow({ work }: { work: Work }) {
  return (
    <Link
      to="/works/$slug"
      params={{ slug: work.slug }}
      className="term-row group grid grid-cols-[5.5rem_1fr] lg:grid-cols-[7rem_1fr_8rem] gap-5 lg:gap-8 items-start py-6 sm:py-8 border-b border-border/70 last:border-b-0 transition-colors duration-300 hover:bg-foreground/[0.025] -mx-3 px-3 rounded-sm"
    >
      {/* Year */}
      <div className="pt-2 font-mono-tight text-xs sm:text-sm uppercase tracking-[0.18em] text-primary tabular-nums">
        {work.year}
      </div>

      {/* Center: title + description + stack */}
      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-[1.05] tracking-[-0.015em] font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
          <span className="align-middle">{work.title}</span>
          <span
            aria-hidden
            className="inline-block ml-3 align-middle text-foreground/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-primary"
          >
            →
          </span>
        </h3>
        <p className="kicker mt-2.5 max-w-2xl text-foreground/70 leading-relaxed text-pretty line-clamp-2">
          {work.description}
        </p>
        <p className="mt-3 font-mono-tight text-xs uppercase tracking-[0.14em] text-foreground/50">
          {work.stack.join(" · ")}
        </p>
      </div>

      {/* Right: thumbnail (lg+) */}
      <div className="hidden lg:block overflow-hidden rounded-sm aspect-[4/5] w-full max-w-[8rem] shadow-[0_6px_18px_-10px_rgba(0,0,0,0.4)]">
        <img
          src={work.image}
          alt=""
          loading="lazy"
          width={400}
          height={500}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
    </Link>
  );
}
