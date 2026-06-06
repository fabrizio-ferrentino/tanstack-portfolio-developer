import { createFileRoute } from "@tanstack/react-router";
import { jobs, localizeJob, type Job } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Alex Rivera - Experience" },
      {
        name: "description",
        content:
          "Professional experience of Alex Rivera: software development, web platforms, and open-source projects.",
      },
      { property: "og:title", content: "Alex Rivera - Experience" },
      {
        property: "og:description",
        content: "My professional journey in software development.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { t } = useI18n();
  return (
    <>
      <section className="container-prose pt-10 sm:pt-16 pb-12 max-w-3xl">
        <p className="kicker font-mono-tight text-sm uppercase tracking-[0.2em] text-primary mb-4">
          {t("experience.kicker")}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-balance">
          {t("experience.title")}
        </h1>
        <p className="kicker mt-6 text-lg text-foreground/75 leading-relaxed text-pretty">
          {t("experience.lede")}
        </p>
      </section>

      <section className="container-prose pb-24">
        <ol className="relative border-l border-border ml-3 sm:ml-5">
          {jobs.map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
        </ol>
      </section>
    </>
  );
}

function JobItem({ job }: { job: Job }) {
  const { t, lang } = useI18n();
  const j = localizeJob(job, lang);
  return (
    <li className="relative pl-8 sm:pl-12 pb-16 last:pb-0">
      <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono-tight text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-primary">{j.duration}</span>
        <span aria-hidden>·</span>
        <span>{j.type}</span>
        <span aria-hidden>·</span>
        <span>{j.location}</span>
      </div>

      <h2 className="font-display text-3xl sm:text-4xl mt-3 text-balance">
        {j.title}
        <span className="text-foreground/40"> @ </span>
        <a
          href={j.companyUrl}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-primary"
        >
          {j.company}
        </a>
      </h2>

      <p className="kicker mt-4 text-foreground/80 leading-relaxed text-pretty max-w-3xl">
        {j.description}
      </p>

      <div className="mt-6 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12">
        <div>
          <p className="font-mono-tight text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            {t("experience.keyAchievements")}
          </p>
          <ul className="space-y-2.5">
            {j.achievements.map((a) => (
              <li
                key={a}
                className="relative pl-5 text-foreground/85 leading-relaxed before:content-['—'] before:absolute before:left-0 before:text-primary"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:max-w-[14rem]">
          <p className="font-mono-tight text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            {t("experience.technologies")}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {j.technologies.map((tech) => (
              <li
                key={tech}
                className="term-chip font-mono-tight text-xs px-3 py-1 rounded-full border border-border text-foreground/75"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
