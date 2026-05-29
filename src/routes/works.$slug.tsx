import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as React from "react";
import { getWork, localizeWork, works } from "@/lib/works";
import { useI18n } from "@/lib/i18n";
import { ExternalLink, Github } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string; caption?: string };

function GalleryCarousel({ slides }: { slides: Slide[] }) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="relative">
      <CarouselContent>
        {slides.map((s, i) => (
          <CarouselItem key={i} className="basis-full">
            <div className="relative overflow-hidden rounded-md shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]">
              <img
                src={s.src}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-auto object-cover aspect-[16/10]"
                //className="w-full h-auto rounded-sm shadow-sm"
              />
              <span className="grain absolute inset-0 opacity-50" aria-hidden />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex left-3 lg:-left-12 bg-background/80 backdrop-blur cursor-pointer" />
      <CarouselNext className="hidden sm:flex right-3 lg:-right-12 bg-background/80 backdrop-blur cursor-pointer" />
      {slides.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Gallery pagination">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={current === i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                current === i
                  ? "w-6 bg-primary"
                  : "w-2 bg-foreground/25 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
}

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const w = loaderData?.work;
    if (!w) {
      return {
        meta: [{ title: "Alex Rivera - Work not found" }],
      };
    }
    return {
      meta: [
        { title: `Alex Rivera - ${w.title}` },
        { name: "description", content: w.description },
        { property: "og:title", content: `Alex Rivera - ${w.title}` },
        { property: "og:description", content: w.description },
        { property: "og:image", content: w.image },
        { name: "twitter:image", content: w.image },
      ],
    };
  },
  notFoundComponent: () => <WorkNotFound />,
  errorComponent: ({ error, reset }) => <WorkError error={error} reset={reset} />,
  component: WorkDetail,
});

function WorkDetail() {
  const { work: rawWork } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const work = localizeWork(rawWork, lang);

  // siblings for prev/next navigation
  const idx = works.findIndex((w) => w.slug === work.slug);
  const prev = idx > 0 ? localizeWork(works[idx - 1], lang) : null;
  const next = idx < works.length - 1 ? localizeWork(works[idx + 1], lang) : null;

  return (
    <>
      {/* Hero */}
      <section className="container-prose pt-12 sm:pt-20">
        <Link
          to="/works"
          className="font-mono-tight text-xs uppercase tracking-[0.22em] text-foreground/60 hover:text-primary transition-colors"
        >
          {t("works.allWorks")}
        </Link>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono-tight text-xs uppercase tracking-[0.18em] text-foreground/60">
          <span className="text-primary">{work.year}</span>
          <span aria-hidden>·</span>
          <span>{work.role}</span>
        </div>

        <h1 className="mt-4 font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.02em] font-medium text-balance">
          {work.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-snug text-foreground/80 text-pretty">
          {work.description}
        </p>
      </section>

      {/* Cover carousel — single large image, swipeable through all photos */}
      <section className="container-prose mt-12">
        {(() => {
          const slides = [
            { src: work.image, alt: work.title, caption: undefined as string | undefined },
            ...(work.images ?? []).map((img, i) => ({
              src: img.src,
              alt: img.alt ?? `${work.title} — ${i + 2}`,
              caption: img.caption,
            })),
          ];
          if (slides.length === 1) {
            return (
              <div className="relative overflow-hidden rounded-md shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]">
                <img
                  src={slides[0].src}
                  alt={slides[0].alt}
                  width={1600}
                  height={1000}
                  className="w-full h-auto object-cover aspect-[16/10]"
                  //className="w-full h-auto rounded-sm shadow-sm"
                />
                <span className="grain absolute inset-0 opacity-50" aria-hidden />
              </div>
            );
          }
          return <GalleryCarousel slides={slides} />;
        })()}
      </section>

      {/* Body + sidebar */}
      <section className="container-prose mt-16 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="prose-body space-y-6 text-lg leading-relaxed text-foreground/85">
          {work.body.map((p, i) => (
            <p key={i} className="text-pretty">
              {p}
            </p>
          ))}
          {work.externalUrl && (
            <p className="pt-2">
              <a
                href={work.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-foreground"
              >
                {work.externalLabel ?? t("works.visitProject")} →
              </a>
            </p>
          )}
        </div>

        <aside className="lg:border-l lg:border-border lg:pl-10">
          <dl className="space-y-8 font-mono-tight text-sm">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-foreground/50 mb-2">
                {t("works.year")}
              </dt>
              <dd className="text-foreground">{work.year}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-foreground/50 mb-2">
                {t("works.role")}
              </dt>
              <dd className="text-foreground">{work.role}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-foreground/50 mb-3">
                {t("works.stack")}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {work.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-3 py-1 text-xs text-foreground/75"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            {(work.repoUrl || work.liveUrl) && (
              <div>
                <dt className="text-xs uppercase tracking-[0.18em] text-foreground/50 mb-3">
                  {t("works.links")}
                </dt>
                <dd className="flex flex-col gap-2">
                  {work.liveUrl && (
                    <a
                      href={work.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground/75 transition-colors hover:border-primary hover:text-primary w-fit"
                    >
                      <ExternalLink size={13} />
                      {t("works.livePreview")}
                    </a>
                  )}
                  {work.repoUrl && (
                    <a
                      href={work.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-foreground/75 transition-colors hover:border-primary hover:text-primary w-fit"
                    >
                      <Github size={13} />
                      {t("works.viewCode")}
                    </a>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </section>

      {/* Prev / Next */}
      <section className="container-prose mt-24 pt-10 border-t border-border grid gap-8 sm:grid-cols-2">
        <div>
          {prev && (
            <Link
              to="/works/$slug"
              params={{ slug: prev.slug }}
              className="group block"
            >
              <span className="font-mono-tight text-xs uppercase tracking-[0.18em] text-foreground/50">
                {t("works.previous")}
              </span>
              <span className="mt-2 block font-display text-2xl tracking-tight group-hover:text-primary transition-colors">
                {prev.title}
              </span>
            </Link>
          )}
        </div>
        <div className="sm:text-right">
          {next && (
            <Link
              to="/works/$slug"
              params={{ slug: next.slug }}
              className="group block"
            >
              <span className="font-mono-tight text-xs uppercase tracking-[0.18em] text-foreground/50">
                {t("works.next")}
              </span>
              <span className="mt-2 block font-display text-2xl tracking-tight group-hover:text-primary transition-colors">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

function WorkNotFound() {
  const { t } = useI18n();
  return (
    <>
      <section className="container-prose pt-24 pb-32 text-center">
        <p className="font-mono-tight text-sm uppercase tracking-[0.22em] text-primary mb-6">
          {t("works.notFoundKicker")}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl tracking-tight">
          {t("works.notFoundTitle")}<span className="text-primary">.</span>
        </h1>
        <p className="mt-6 text-foreground/70">{t("works.notFoundBody")}</p>
        <Link to="/works" className="link-underline mt-8 inline-block">
          {t("works.backToWorks")}
        </Link>
      </section>
    </>
  );
}

function WorkError({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useI18n();
  return (
    <>
      <section className="container-prose pt-24 pb-32">
        <h1 className="font-display text-4xl">{t("works.somethingBroke")}</h1>
        <p className="mt-4 text-foreground/70">{error.message}</p>
        <button onClick={reset} className="link-underline mt-6">
          {t("works.tryAgain")}
        </button>
      </section>
    </>
  );
}
