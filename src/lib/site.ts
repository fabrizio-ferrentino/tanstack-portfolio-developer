export const site = {
  name: "Alex Rivera",
  role: "Software Developer",
  location: "San Francisco, CA",
  welcome: "Software Developer — web apps, APIs, and a few side projects.",
  email: "alex@example.com",
  github: "https://github.com/alex_rivera",
  githubHandle: "@alex_rivera",
  gitlab: "https://gitlab.com/alex_rivera",
  gitlabHandle: "@alex_rivera",
  linkedin: "https://linkedin.com/in/alex_rivera",
  linkedinHandle: "in/alex_rivera",
  website: "https://yoursite.dev",
  company: "TechCorp",
  companyUrl: "https://example.com",
};

export type Job = {
  id: number;
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  /** Italian translations of localizable fields */
  it?: {
    title?: string;
    type?: string;
    description?: string;
    achievements?: string[];
  };
};

export const jobs: Job[] = [
  {
    id: 1,
    title: "Software Developer",
    company: "TechCorp Inc.",
    companyUrl: "https://example.com",
    location: "San Francisco, CA",
    duration: "Jan 2024 — Present",
    type: "Full-time",
    description:
      "Working as a Software Developer on web and cloud platforms, contributing to both frontend and backend development. Involved in building scalable services, integrating third-party APIs, and maintaining production systems.",
    achievements: [
      "Led development of a new customer-facing dashboard that reduced support tickets by 30%",
      "Built and maintained RESTful APIs serving thousands of daily active users",
      "Integrated third-party payment and authentication services",
      "Contributed to CI/CD pipeline improvements, reducing deployment times",
      "Participated in code reviews and mentored junior team members",
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    it: {
      title: "Software Developer",
      type: "Tempo pieno",
      description:
        "Lavoro come Software Developer su piattaforme web e cloud, contribuendo allo sviluppo frontend e backend. Mi occupo di costruire servizi scalabili, integrare API di terze parti e mantenere sistemi in produzione.",
      achievements: [
        "Guidato lo sviluppo di una nuova dashboard per i clienti, riducendo i ticket di supporto del 30%",
        "Sviluppato e mantenuto API RESTful per migliaia di utenti attivi giornalieri",
        "Integrato servizi di pagamento e autenticazione di terze parti",
        "Contribuito al miglioramento della pipeline CI/CD, riducendo i tempi di deploy",
        "Partecipato a code review e affiancato sviluppatori junior",
      ],
    },
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Digital Agency",
    companyUrl: "https://example.com",
    location: "Remote",
    duration: "Jun 2022 — Dec 2023",
    type: "Full-time",
    description:
      "Built performant, accessible web interfaces for clients across e-commerce, fintech, and media. Collaborated closely with designers and backend teams to deliver polished user experiences.",
    achievements: [
      "Delivered 5+ client projects from design handoff to production",
      "Improved Lighthouse performance scores from the 60s to 95+ on key client sites",
      "Developed a reusable component library used across all client projects",
      "Implemented responsive designs and ensured cross-browser compatibility",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    it: {
      title: "Frontend Developer",
      type: "Tempo pieno",
      description:
        "Realizzato interfacce web performanti e accessibili per clienti in e-commerce, fintech e media. Collaborato strettamente con designer e team backend per consegnare esperienze utente curate.",
      achievements: [
        "Consegnato oltre 5 progetti cliente dal design alla produzione",
        "Migliorato i punteggi Lighthouse da 60 a oltre 95 sui siti principali dei clienti",
        "Sviluppato una libreria di componenti riutilizzabile per tutti i progetti",
        "Implementato design responsive con compatibilità cross-browser",
      ],
    },
  },
  {
    id: 3,
    title: "Web Developer Intern",
    company: "Open Source Foundation",
    companyUrl: "https://example.com",
    location: "Remote",
    duration: "Jun 2021 — Aug 2021",
    type: "Internship",
    description:
      "Summer internship contributing to open-source web tooling projects. Fixed bugs, wrote documentation, and implemented small features under the guidance of senior maintainers.",
    achievements: [
      "Merged 12 pull requests to active open-source repositories",
      "Wrote and updated developer documentation for two projects",
      "Fixed accessibility issues, improving WCAG compliance",
      "Participated in weekly community calls and code reviews",
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Git", "Markdown"],
    it: {
      title: "Tirocinante Web Developer",
      type: "Tirocinio",
      description:
        "Tirocinio estivo con contributi a progetti open-source di web tooling. Corretti bug, scritta documentazione e implementate piccole funzionalità con la guida di maintainer senior.",
      achievements: [
        "Uniti 12 pull request a repository open-source attivi",
        "Scritta e aggiornata documentazione per sviluppatori su due progetti",
        "Corretti problemi di accessibilità, migliorando la conformità WCAG",
        "Partecipato a call settimanali della community e code review",
      ],
    },
  },
];

/** Returns the job with localized fields applied for the given language. */
export function localizeJob(job: Job, lang: "en" | "it"): Job {
  if (lang !== "it" || !job.it) return job;
  return {
    ...job,
    title: job.it.title ?? job.title,
    type: job.it.type ?? job.type,
    description: job.it.description ?? job.description,
    achievements: job.it.achievements ?? job.achievements,
  };
}
