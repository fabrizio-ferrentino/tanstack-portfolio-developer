import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { themeBootScript } from "@/components/ThemePicker";
import { I18nProvider, langBootScript, useI18n } from "@/lib/i18n";
import { SiteLayout } from "@/components/SiteLayout";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <section className="container-prose pt-24 pb-32 text-center">
      <p className="kicker font-mono-tight text-sm uppercase tracking-[0.22em] text-primary mb-6">
        {t("notFound.kicker")}
      </p>
      <h1 className="font-display text-5xl sm:text-6xl tracking-tight">
        {t("notFound.title")}<span className="text-primary">.</span>
      </h1>
      <p className="mt-6 text-foreground/70">{t("notFound.body")}</p>
      <Link to="/" className="link-underline mt-8 inline-block">
        {t("notFound.backHome")}
      </Link>
    </section>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Alex Rivera" },
      { name: "description", content: "Software Developer — web apps, APIs, and a few side projects." },
      { name: "author", content: "Alex Rivera" },
      // Open Graph (WhatsApp, Telegram, LinkedIn, etc.)
      { property: "og:title", content: "Alex Rivera" },
      { property: "og:description", content: "Software Developer — web apps, APIs, and a few side projects." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yoursite.dev" },
      { property: "og:image", content: "https://yoursite.dev/og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },

      // Twitter/X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Alex Rivera" },
      { name: "twitter:description", content: "Software Developer — web apps, APIs, and a few side projects." },
      { name: "twitter:image", content: "https://yoursite.dev/og.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400;9..144,500;9..144,600;9..144,400..600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script dangerouslySetInnerHTML={{ __html: langBootScript }} />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </I18nProvider>
  );
}
