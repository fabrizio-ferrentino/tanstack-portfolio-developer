import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Alex Rivera - Contact" },
      {
        name: "description",
        content:
          "Get in touch with Alex Rivera — email, GitHub, LinkedIn and GitLab.",
      },
      { property: "og:title", content: "Alex Rivera - Contact" },
      {
        property: "og:description",
        content: "Say hi by email or on your favourite social.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const links = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: t("contact.links.emailNote"),
    },
    {
      label: "GitHub",
      value: site.githubHandle,
      href: site.github,
      note: t("contact.links.githubNote"),
    },
    {
      label: "LinkedIn",
      value: site.linkedinHandle,
      href: site.linkedin,
      note: t("contact.links.linkedinNote"),
    },
  ];

  return (
    <>
      <section className="container-prose pt-10 sm:pt-16 pb-24 max-w-3xl">
        <p className="kicker font-mono-tight text-sm uppercase tracking-[0.2em] text-primary mb-4">
          {t("contact.kicker")}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-balance">
          {t("contact.title")}
        </h1>
        <p className="mt-6 text-lg text-foreground/80 leading-relaxed text-pretty">
          {t("contact.lede")}
        </p>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="sm:p-6 term-row group flex items-center justify-between gap-6 py-5 sm:py-6 hover:text-primary transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-mono-tight text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary/70">
                    {l.label}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl mt-1 truncate">
                    {l.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{l.note}</p>
                </div>
                <span
                  aria-hidden
                  className="font-display text-3xl text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-transform"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
