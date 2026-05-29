// To use your own project screenshots, add image files to src/assets/ and
// replace the placehold.co URLs below with imports, e.g.:
//   import myProject from "@/assets/my-project.png";

export type WorkCategory = "work" | "personal";

export type Work = {
  slug: string;
  title: string;
  /** grouping bucket: paid/professional work vs personal/side projects */
  category: WorkCategory;
  /** short tagline shown on the card hover and in lists */
  description: string;
  /** longer body for the detail page (one or more paragraphs) */
  body: string[];
  year: string;
  role: string;
  stack: string[];
  /** DEPRECATED optional outbound link (repo, demo, write-up) */
  externalUrl?: string;
  externalLabel?: string;
  /** optional link to source code (GitHub, GitLab, …) */
  repoUrl?: string;
  /** optional link to a live preview / demo */
  liveUrl?: string;
  image: string;
  /** optional additional images shown as a gallery on the detail page */
  images?: { src: string; alt?: string; caption?: string }[];
  /** how dark the gradient overlay should be (0-1) */
  overlay?: number;
  /** Italian translations of localizable fields */
  it?: {
    title?: string;
    description?: string;
    body?: string[];
    role?: string;
    externalLabel?: string;
  };
};

export const works: Work[] = [
  {
    slug: "online-marketplace",
    category: "work",
    title: "Online Marketplace",
    description:
      "Full-featured B2C marketplace with product catalog, cart, user accounts, and Stripe payment integration.",
    body: [
      "A multi-vendor marketplace where sellers can list products and buyers can browse, filter, and purchase securely. The platform handles the full transaction lifecycle — from product discovery to checkout and order tracking.",
      "The frontend is a React SPA with fast client-side filtering, infinite scroll, and a multi-step checkout flow. The backend is a Node.js REST API connected to PostgreSQL, with Redis handling sessions and rate limiting. Stripe Checkout manages all payment flows.",
      "The main architectural challenge was keeping product inventory consistent across concurrent purchases. I implemented optimistic locking at the database layer to prevent overselling without sacrificing checkout speed.",
    ],
    year: "2024",
    role: "Full-stack Developer",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Stripe", "AWS", "Docker"],
    image: "https://placehold.co/800x1000/6366f1/ffffff?text=Online+Marketplace",
    images: [
      { src: "https://placehold.co/800x1000/4f46e5/ffffff?text=Product+Detail" },
      { src: "https://placehold.co/800x1000/4338ca/ffffff?text=Checkout+Flow" },
    ],
    overlay: 0.4,
    it: {
      title: "Marketplace Online",
      description:
        "Marketplace B2C completo con catalogo prodotti, carrello, account utente e pagamenti Stripe.",
      body: [
        "Un marketplace multi-vendor dove i venditori possono pubblicare prodotti e gli acquirenti possono sfogliare, filtrare e acquistare in modo sicuro. La piattaforma gestisce l'intero ciclo di una transazione — dalla scoperta del prodotto al checkout e al tracciamento dell'ordine.",
        "Il frontend è una SPA React con filtri client-side veloci, scroll infinito e un flusso di checkout in più step. Il backend è una REST API Node.js collegata a PostgreSQL, con Redis per sessioni e rate limiting. Stripe Checkout gestisce tutti i flussi di pagamento.",
        "La principale sfida architetturale era mantenere la consistenza dell'inventario su acquisti concorrenti. Ho implementato il locking ottimistico a livello di database per evitare l'overselling senza sacrificare la velocità del checkout.",
      ],
      role: "Sviluppatore Full-stack",
    },
  },
  {
    slug: "crm-dashboard",
    category: "work",
    title: "CRM Dashboard",
    description:
      "Internal CRM and sales analytics platform — lead tracking, pipeline management, and weekly reporting.",
    body: [
      "A web-based CRM built for a B2B sales team that had outgrown their spreadsheets. The core features are lead management, a visual sales pipeline, activity logging, and a reporting module with weekly email digests.",
      "The frontend is built with React and Vite, with a heavy emphasis on table performance (virtual scrolling for 10k+ row datasets) and filtering. The Python/FastAPI backend powers the analytics engine, which aggregates raw CRM data into team-level and rep-level reports.",
      "Role-based access control was a core requirement: sales reps see only their own records, managers see team-wide data, and admins can configure pipeline stages and field definitions. The permission layer is enforced at the API level on every request.",
    ],
    year: "2024",
    role: "Full-stack Developer",
    stack: ["React", "Vite", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Docker"],
    image: "https://placehold.co/800x1000/0891b2/ffffff?text=CRM+Dashboard",
    images: [
      { src: "https://placehold.co/800x1000/0e7490/ffffff?text=Sales+Pipeline" },
    ],
    overlay: 0.45,
    it: {
      title: "CRM Dashboard",
      description:
        "Piattaforma CRM e analytics per un team commerciale B2B — gestione lead, pipeline e reportistica.",
      body: [
        "Un CRM web-based costruito per un team sales B2B che aveva superato le sue capacità con i fogli di calcolo. Le funzionalità principali sono la gestione dei lead, una pipeline commerciale visuale, il log delle attività e un modulo di reportistica con digest email settimanali.",
        "Il frontend è costruito con React e Vite, con grande attenzione alle performance delle tabelle (virtual scrolling per dataset con oltre 10k righe) e al filtraggio. Il backend Python/FastAPI alimenta il motore di analytics, che aggrega i dati CRM in report per team e per singolo commerciale.",
        "Il controllo degli accessi basato sui ruoli era un requisito fondamentale: i commerciali vedono solo i propri record, i manager i dati dell'intero team, e gli admin possono configurare le fasi della pipeline. Il layer dei permessi è applicato a livello API su ogni richiesta.",
      ],
      role: "Sviluppatore Full-stack",
    },
  },
  {
    slug: "booking-api",
    category: "work",
    title: "Booking API",
    description:
      "RESTful API for an event reservation service — seat inventory, payment flow, and booking confirmation emails.",
    body: [
      "A headless API service consumed by both a web frontend and a mobile app to manage event bookings. The system handles seat availability, locks seats during checkout to prevent double-booking, processes payments via Stripe, and sends confirmation emails via SendGrid.",
      "The main technical challenge was the seat locking mechanism: a user who adds seats to their cart needs them held for a fixed window (10 minutes), then released if payment doesn't go through. I implemented this using Redis TTL keys — created on cart add, deleted on successful checkout or expiry.",
      "Load spikes around popular event launches were the other challenge. I added response caching for event listings and availability reads, and used a job queue for the heavier post-booking tasks (email, invoice generation) so the checkout endpoint stays fast under load.",
    ],
    year: "2023",
    role: "Backend Developer",
    stack: ["Node.js", "Express", "MongoDB", "Redis", "Stripe", "SendGrid", "Docker"],
    image: "https://placehold.co/800x1000/dc2626/ffffff?text=Booking+API",
    overlay: 0.4,
    it: {
      title: "Booking API",
      description:
        "API REST per un servizio di prenotazione eventi — inventario posti, flusso di pagamento e conferma via email.",
      body: [
        "Un servizio API headless utilizzato sia da un frontend web sia da un'app mobile per gestire le prenotazioni di eventi. Il sistema gestisce la disponibilità dei posti, blocca i posti durante il checkout per evitare doppie prenotazioni, processa i pagamenti tramite Stripe e invia email di conferma tramite SendGrid.",
        "La principale sfida tecnica era il meccanismo di blocco dei posti: un utente che aggiunge posti al carrello deve tenerli bloccati per un intervallo fisso (10 minuti), poi rilasciarli se il pagamento non va a buon fine. Ho implementato questo usando chiavi TTL di Redis — create all'aggiunta al carrello e cancellate al checkout completato o alla scadenza.",
        "I picchi di traffico durante il lancio di eventi popolari erano l'altra sfida. Ho aggiunto caching delle risposte per le liste degli eventi e le letture di disponibilità, e usato una job queue per i task post-prenotazione più pesanti in modo che l'endpoint di checkout rimanga veloce sotto carico.",
      ],
      role: "Sviluppatore Backend",
    },
  },
  {
    slug: "dev-blog",
    category: "personal",
    title: "Dev Blog",
    description:
      "A minimal technical blog built with Next.js and MDX — posts, syntax highlighting, RSS feed, and dark mode.",
    body: [
      "A self-hosted blog for sharing technical notes, write-ups, and occasional longer-form posts. Built with Next.js App Router, MDX for content authoring, and Shiki for syntax highlighting. Static generation at build time means page loads are near-instant.",
      "The content pipeline is simple by design: write an MDX file in the /posts directory, push to GitHub, and Vercel deploys in under a minute. No CMS, no database. Metadata (title, date, tags, description) lives in front-matter, which powers the post index, RSS feed, and OG images.",
      "Most of the design work went into making the reading experience comfortable: good line length, optical type sizing, readable code blocks, and a dark mode that doesn't require a page reload. The site scores 100 on all Lighthouse metrics.",
    ],
    year: "2024",
    role: "Designer & Developer",
    stack: ["Next.js", "MDX", "Tailwind CSS", "Shiki", "Vercel"],
    image: "https://placehold.co/800x1000/16a34a/ffffff?text=Dev+Blog",
    images: [
      { src: "https://placehold.co/800x1000/15803d/ffffff?text=Post+View" },
    ],
    repoUrl: "https://github.com/yourusername/dev-blog",
    liveUrl: "https://dev-blog-demo.vercel.app",
    overlay: 0.4,
    it: {
      title: "Dev Blog",
      description:
        "Un blog tecnico minimale con Next.js e MDX — articoli, syntax highlighting, feed RSS e dark mode.",
      body: [
        "Un blog self-hosted per condividere note tecniche, approfondimenti e post più lunghi. Costruito con Next.js App Router, MDX per la scrittura dei contenuti e Shiki per la syntax highlighting. La generazione statica in fase di build rende i caricamenti quasi istantanei.",
        "La pipeline dei contenuti è volutamente semplice: scrivi un file MDX nella directory /posts, fai push su GitHub e Vercel fa il deploy in meno di un minuto. Nessun CMS, nessun database. I metadati vivono nel front-matter e alimentano l'indice dei post, il feed RSS e le OG image.",
        "La maggior parte del lavoro di design è andata nel rendere l'esperienza di lettura confortevole: buona lunghezza della riga, dimensioni tipografiche ottiche, blocchi di codice leggibili e una dark mode senza ricaricamento della pagina. Il sito ottiene 100 su tutte le metriche Lighthouse.",
      ],
      role: "Designer & Sviluppatore",
    },
  },
  {
    slug: "weather-app",
    category: "personal",
    title: "Weather App",
    description:
      "A real-time weather forecast app with 7-day outlook, hourly charts, and geolocation support.",
    body: [
      "A weather forecast app built around the OpenWeatherMap API. Enter a city name or allow geolocation, and the app shows current conditions, a 24-hour temperature chart, and a 7-day forecast. Conditions are visualized with animated SVG icons.",
      "The main frontend challenge was handling the API data shape — the free tier returns hourly data in 3-hour blocks for 5 days, which needed aggregation into clean daily summaries. I wrote a small data-normalization layer that handles edge cases like data gaps and timezone offsets.",
      "Built this mainly to practice charting with Recharts and to learn how to write a smooth geolocation flow (permission prompt → fallback to IP-based city → manual city search). The app is installable as a PWA and works offline with cached last-known data.",
    ],
    year: "2023",
    role: "Developer",
    stack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "OpenWeatherMap API"],
    image: "https://placehold.co/800x1000/f59e0b/ffffff?text=Weather+App",
    images: [
      { src: "https://placehold.co/800x1000/d97706/ffffff?text=7-Day+Forecast" },
    ],
    repoUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-app-demo.vercel.app",
    overlay: 0.4,
    it: {
      title: "App Meteo",
      description:
        "Un'app meteo in tempo reale con previsioni a 7 giorni, grafici orari e supporto alla geolocalizzazione.",
      body: [
        "Un'app meteo costruita intorno all'API di OpenWeatherMap. Inserisci il nome di una città o consenti la geolocalizzazione, e l'app mostra le condizioni attuali, un grafico delle temperature delle ultime 24 ore e le previsioni a 7 giorni. Le condizioni sono visualizzate con icone SVG animate.",
        "La principale sfida frontend era gestire la struttura dei dati dell'API — il tier gratuito restituisce dati orari in blocchi da 3 ore per 5 giorni, che andavano aggregati in riepiloghi giornalieri puliti. Ho scritto un piccolo layer di normalizzazione che gestisce i casi limite come gap nei dati e offset dei fusi orari.",
        "Costruito principalmente per esercitarmi con i grafici in Recharts e per imparare a gestire un flusso di geolocalizzazione fluido. L'app è installabile come PWA e funziona offline con gli ultimi dati in cache.",
      ],
      role: "Sviluppatore",
    },
  },
  {
    slug: "task-manager",
    category: "personal",
    title: "Task Manager",
    description:
      "A full-stack Kanban task manager with real-time updates via WebSockets and JWT authentication.",
    body: [
      "A personal project to learn WebSockets and real-time UI updates. The app is a Kanban-style task manager where users can create projects, add tasks to boards, assign them, and watch changes appear live across sessions — useful when testing from two browser tabs.",
      "The backend is Node.js/Express with Socket.io for real-time events and PostgreSQL for persistence. Every mutation (create task, move card, update status) fires a Socket.io broadcast to all sessions watching the same board. Authentication uses short-lived JWTs with a refresh token flow.",
      "The most interesting problem to solve was reconciling optimistic UI updates with server broadcasts. Clicking 'move card' should feel instant, but a slow network can cause the live update to arrive out of order. I ended up using a simple sequence-number approach to deduplicate and reorder incoming events.",
    ],
    year: "2023",
    role: "Full-stack Developer",
    stack: ["React", "Node.js", "Socket.io", "PostgreSQL", "JWT", "Tailwind CSS"],
    image: "https://placehold.co/800x1000/2563eb/ffffff?text=Task+Manager",
    repoUrl: "https://github.com/yourusername/task-manager",
    overlay: 0.4,
    it: {
      title: "Task Manager",
      description:
        "Un task manager Kanban full-stack con aggiornamenti in tempo reale via WebSocket e autenticazione JWT.",
      body: [
        "Un progetto personale per imparare i WebSocket e gli aggiornamenti UI in tempo reale. L'app è un task manager in stile Kanban dove gli utenti possono creare progetti, aggiungere task alle board, assegnarli e vedere le modifiche apparire live in tutte le sessioni.",
        "Il backend è Node.js/Express con Socket.io per gli eventi in tempo reale e PostgreSQL per la persistenza. Ogni mutazione (crea task, sposta card, aggiorna stato) emette un broadcast Socket.io a tutte le sessioni che stanno guardando la stessa board. L'autenticazione usa JWT short-lived con un flusso di refresh token.",
        "Il problema più interessante era riconciliare gli aggiornamenti UI ottimistici con il broadcast del server. Cliccare 'sposta card' deve sembrare istantaneo, ma una rete lenta può causare l'arrivo dell'aggiornamento live nell'ordine sbagliato. Ho usato un semplice approccio con numero di sequenza per deduplicare e riordinare gli eventi in arrivo.",
      ],
      role: "Sviluppatore Full-stack",
    },
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

/**
 * Slugs of works shown in the "Featured Works" section on the home page.
 * Edit/reorder this array to choose which works to highlight.
 */
export const featuredWorkSlugs: string[] = [
  "online-marketplace",
  "crm-dashboard",
  "dev-blog",
  "task-manager",
];

/** Returns featured works in the order defined by `featuredWorkSlugs`. */
export function getFeaturedWorks(): Work[] {
  return featuredWorkSlugs
    .map((slug) => works.find((w) => w.slug === slug))
    .filter((w): w is Work => Boolean(w));
}

/** Returns the work with localized fields applied for the given language. */
export function localizeWork(work: Work, lang: "en" | "it"): Work {
  if (lang !== "it" || !work.it) return work;
  return {
    ...work,
    title: work.it.title ?? work.title,
    description: work.it.description ?? work.description,
    body: work.it.body ?? work.body,
    role: work.it.role ?? work.role,
    externalLabel: work.it.externalLabel ?? work.externalLabel,
  };
}

/** Bulk localize a list of works. */
export function localizeWorks(items: Work[], lang: "en" | "it"): Work[] {
  if (lang !== "it") return items;
  return items.map((w) => localizeWork(w, lang));
}

/** Translate the bucket year label (e.g. "Ongoing" -> "In corso"). */
export function localizeYearBucket(year: string, lang: "en" | "it"): string {
  if (lang !== "it") return year;
  if (year === "Ongoing") return "In corso";
  return year;
}
