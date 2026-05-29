import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "it";
export const LANG_STORAGE_KEY = "site-lang";
export const DEFAULT_LANG: Lang = "en";

/* ------------------------------------------------------------------ */
/* Dictionary                                                          */
/* ------------------------------------------------------------------ */

type Dict = typeof DICT.en;
type DotPath<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${P}${K}`
    : T[K] extends object
      ? DotPath<T[K], `${P}${K}.`>
      : never;
}[keyof T & string];

export type TKey = DotPath<Dict>;

export const DICT = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      works: "Works",
      contact: "Contact",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      tagline: "Built with care, coffee & TanStack.",
      location: "San Francisco, CA",
      privacy: "Privacy Policy",
    },
    privacy: {
      backHome: "← Back to home",
    },
    home: {
      hello: "Hello, my name is Alex Rivera",
      headline: "I build software",
      introA: "I'm a software developer at",
      introB: ", building web apps & APIs from",
      italy: "San Francisco",
      introC: "Curious by nature — I write full-stack code, ship side projects, and keep notes on my",
      aboutPage: "about page",
      and: "and a small",
      logbook: "logbook of work",
      featured: "Featured Works",
      seeAll: "see all →",
    },
    about: {
      kicker: "About",
      title: "A few words about me.",
      p1: "I'm a Software Developer based in San Francisco. I hold a Computer Science degree (2022) and have been writing code — for school, for work, and for fun — for as long as I can remember.",
      p2: "Today I work at TechCorp on web and cloud platforms, contributing across the stack: from React frontends and Node.js backends, to REST APIs, database design, and cloud deployments. I genuinely enjoy the moment a UI, a backend service, and an API all start working together.",
      p3: "What I've learned shipping production software is that the gap between \"works locally\" and \"works reliably at scale\" is where most of the real engineering happens. That's shaped how I think about code: less about what looks clever, more about what holds up.",
      p4: "When I'm not at work I'm usually exploring something new — recently AI integration in web apps, edge runtimes, and distributed systems. Less for the hype, more because I like understanding how things fit together.",
      workWithTitle: "What I work with",
      workWithBody:
        "TypeScript · React · Next.js · TanStack · Tailwind · Node.js · Python · PostgreSQL · Docker · AWS",
      learningTitle: "What I'm learning",
      learningBody:
        "AI integration in web apps, edge runtimes, distributed systems, and how to write less code without losing the plot.",
    },
    experience: {
      kicker: "Experience",
      title: "My professional journey in software development.",
      lede: "A timeline of the places I've worked, the things I've built and the lessons I picked up along the way.",
      keyAchievements: "Key Achievements",
      technologies: "Technologies",
    },
    works: {
      kicker: "Selected Works",
      title: "Things I've worked on",
      lede: "A short, opinionated list — web apps, APIs, and a few side projects I built to learn something new. Click through for the longer story behind each one.",
      project: "project",
      projects: "projects",
      allWorks: "← All works",
      year: "Year",
      role: "Role",
      stack: "Stack",
      links: "Links",
      viewCode: "View Code",
      livePreview: "Live Preview",
      previous: "← Previous",
      next: "Next →",
      visitProject: "Visit project",
      gallery: "Gallery",
      groupWork: "At work",
      groupPersonal: "Personal & side projects",
      notFoundKicker: "404 · Lost in the archive",
      notFoundTitle: "That work doesn't exist",
      notFoundBody: "It may have been renamed, or never existed in the first place.",
      backToWorks: "← Back to all works",
      somethingBroke: "Something broke.",
      tryAgain: "Try again",
    },
    contact: {
      kicker: "Contact",
      title: "Say hi — I read every message.",
      lede: "Email is the surest way to reach me, but I'm also around on the usual platforms. Whether it's a project, an idea, or just a hello — go ahead, my inbox doesn't bite.",
      links: {
        emailNote: "Send me an email anytime",
        githubNote: "Check out my code",
        linkedinNote: "Let's connect professionally"
      },
    },
    lang: {
      switchTo: "Switch language",
      en: "EN",
      it: "IT",
    },
    notFound: {
      kicker: "404 · Page not found",
      title: "Page not found",
      body: "The page you're looking for doesn't exist or has been moved.",
      backHome: "← Go home",
    },
    scrollToTop: "Back to top",
  },
  it: {
    nav: {
      home: "Home",
      about: "Chi sono",
      experience: "Esperienza",
      works: "Progetti",
      contact: "Contatti",
      menu: "Menu",
      openMenu: "Apri menu",
      closeMenu: "Chiudi menu",
    },
    footer: {
      tagline: "Fatto con cura, caffè & TanStack.",
      location: "San Francisco, CA",
      privacy: "Privacy Policy",
    },
    privacy: {
      backHome: "← Torna alla home",
    },
    home: {
      hello: "Ciao, mi chiamo Alex Rivera",
      headline: "Costruisco software",
      introA: "Sono un software developer in",
      introB: ", dove costruisco web app & API da",
      italy: "San Francisco",
      introC: "Curioso per natura — scrivo codice full-stack, realizzo side project, e tengo qualche nota nella mia",
      aboutPage: "pagina \"chi sono\"",
      and: "e un piccolo",
      logbook: "diario di lavoro",
      featured: "Progetti in evidenza",
      seeAll: "vedi tutti →",
    },
    about: {
      kicker: "Chi sono",
      title: "Due parole su di me.",
      p1: "Sono un Software Developer con base a San Francisco. Mi sono laureato in Informatica (2022) e scrivo codice — per studio, per lavoro e per passione — da quando ne ho memoria.",
      p2: "Oggi lavoro in TechCorp su piattaforme web e cloud, contribuendo a tutto lo stack: frontend React, backend Node.js, API REST, progettazione di database e deployment in cloud. Mi piace particolarmente quel momento in cui una UI, un servizio backend e un'API iniziano davvero a funzionare insieme.",
      p3: "Realizzare software in produzione mi ha insegnato che il divario tra \"funziona in locale\" e \"funziona in modo affidabile in produzione\" è dove si fa la vera ingegneria. Questo ha cambiato il mio approccio al codice: meno attenzione a ciò che sembra intelligente, più a ciò che regge nel tempo.",
      p4: "Fuori dal lavoro esploro quello che ancora non conosco — ultimamente integrazione AI nelle web app, edge runtime e sistemi distribuiti. Non per hype, ma perché mi piace capire come le cose si incastrano tra loro.",
      workWithTitle: "Con cosa lavoro",
      workWithBody:
        "TypeScript · React · Next.js · TanStack · Tailwind · Node.js · Python · PostgreSQL · Docker · AWS",
      learningTitle: "Cosa sto imparando",
      learningBody:
        "Integrazione IA nelle web app, edge runtime, sistemi distribuiti, e come scrivere meno codice senza perdere il filo.",
    },
    experience: {
      kicker: "Esperienza",
      title: "Il mio percorso professionale nello sviluppo software.",
      lede: "Una timeline dei posti dove ho lavorato, delle cose che ho costruito e delle lezioni imparate strada facendo.",
      keyAchievements: "Risultati chiave",
      technologies: "Tecnologie",
    },
    works: {
      kicker: "Progetti selezionati",
      title: "Cose su cui ho lavorato",
      lede: "Una selezione mirata: web app, API e alcuni side project nati per esplorare nuove tecnologie. Clicca su ognuno per scoprire la sfida che c'è dietro.",
      project: "progetto",
      projects: "progetti",
      allWorks: "← Tutti i progetti",
      year: "Anno",
      role: "Ruolo",
      stack: "Stack",
      links: "Link",
      viewCode: "Vedi Il Codice",
      livePreview: "Anteprima Live",
      previous: "← Precedente",
      next: "Successivo →",
      visitProject: "Visita il progetto",
      gallery: "Galleria",
      groupWork: "Lavoro",
      groupPersonal: "Progetti personali",
      notFoundKicker: "404 · Perso nell'archivio",
      notFoundTitle: "Questo progetto non esiste",
      notFoundBody: "Potrebbe essere stato rinominato, o non è mai esistito.",
      backToWorks: "← Torna a tutti i progetti",
      somethingBroke: "Qualcosa si è rotto.",
      tryAgain: "Riprova",
    },
    contact: {
      kicker: "Contatti",
      title: "Scrivimi — leggo ogni messaggio.",
      lede: "L'email è il modo più sicuro per raggiungermi, ma sono anche sulle solite piattaforme. Che sia un progetto, un'idea o un semplice saluto — vai pure, la mia inbox non morde.",
      links: {
        emailNote: "Mandami un'email quando vuoi",
        githubNote: "Dai un'occhiata al codice",
        linkedinNote: "Connettiamoci professionalmente",
      },
    },
    lang: {
      switchTo: "Cambia lingua",
      en: "EN",
      it: "IT",
    },
    notFound: {
      kicker: "404 · Pagina non trovata",
      title: "Pagina non trovata",
      body: "La pagina che cerchi non esiste o è stata spostata.",
      backHome: "← Torna alla home",
    },
    scrollToTop: "Torna in cima",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

function getByPath(obj: unknown, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}

function readStoredLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "it") return stored;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = readStoredLang();
    setLangState(stored);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", stored);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", l);
    }
  }, []);

  const value = useMemo<I18nCtx>(() => {
    const dict = DICT[lang];
    return {
      lang,
      setLang,
      t: (key: TKey) => getByPath(dict, key),
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe fallback for components rendered outside the provider (shouldn't happen)
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (key: TKey) => getByPath(DICT[DEFAULT_LANG], key),
    };
  }
  return ctx;
}

/**
 * Inline script: set <html lang="..."> from localStorage before first paint.
 */
export const langBootScript = `(function(){try{var l=localStorage.getItem(${JSON.stringify(
  LANG_STORAGE_KEY,
)});if(l==='en'||l==='it')document.documentElement.setAttribute('lang',l);}catch(e){}})();`;
