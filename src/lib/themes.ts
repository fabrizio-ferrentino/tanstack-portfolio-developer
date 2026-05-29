// Color themes inspired by mxb.dev's themepicker.
// Each theme defines the core semantic tokens. Colors are kept in oklch
// to match the project's design system (see src/styles.css).
//
// The 5 swatches shown in the picker palette correspond to:
// primary · secondary · border · muted · text

export type ThemeId =
  | "default"
  | "dark"
  | "midnight"
  | "beach"
  | "choco"
  | "moomoo"
  | "bowser"
  | "yoshi";

export interface Theme {
  id: ThemeId;
  name: string;
  /** Five swatches displayed in the picker, in token order. */
  swatches: [string, string, string, string, string];
}

export const THEMES: Theme[] = [
  {
    id: "default",
    name: "Classic",
    swatches: ["#c1502b", "#d99a4a", "#e6dcc9", "#b8a98f", "#2b211a"],
  },
  {
    id: "dark",
    name: "Classic Dark",
    swatches: ["#e09866", "#f0b97a", "#2a2a2b", "#7a7670", "#f1ece0"],
  },
  {
    id: "midnight",
    name: "Midnight Blue",
    swatches: ["#5fb8ff", "#7ecbff", "#1b2540", "#7a8aad", "#eaf1ff"],
  },
  {
    id: "beach",
    name: "Koopa Beach",
    swatches: ["#ff9d00", "#bae8e8", "#e3f6f5", "#a9c4c3", "#272343"],
  },
  {
    id: "choco",
    name: "Choco Mountain",
    swatches: ["#f3ab87", "#e78fb3", "#271c19", "#8a6f67", "#fffffe"],
  },
  {
    id: "moomoo",
    name: "Moo Moo Farm",
    swatches: ["#f582ae", "#8bd3dd", "#f3d2c1", "#c9a892", "#172c66"],
  },
  {
    id: "bowser",
    name: "Bowser's Castle",
    swatches: ["#7f5af0", "#2cb67d", "#383a61", "#7a7c9c", "#fffffe"],
  },
  {
    id: "yoshi",
    name: "Yoshi Valley",
    swatches: ["#99c221", "#e55812", "#e8e0d9", "#a8a097", "#41474c"],
  },
];

export const DEFAULT_THEME: ThemeId = "default";
export const THEME_STORAGE_KEY = "theme";

/**
 * Per-theme favicon palette. Each theme has a coordinated background,
 * letter color and accent dot color used to render the "F." monogram.
 */
export const FAVICON_COLORS: Record<ThemeId, { bg: string; fg: string; dot: string }> = {
  default: { bg: "#fff9f0", fg: "#3b312b", dot: "#e8743b" },
  dark:    { bg: "#2b3337", fg: "#fdf8f2", dot: "#e8743b" },
  midnight:{ bg: "#1b2540", fg: "#eaf1ff", dot: "#5fb8ff" },
  beach:   { bg: "#e3f6f5", fg: "#272343", dot: "#ff9d00" },
  choco:   { bg: "#3a2a24", fg: "#fffffe", dot: "#f3ab87" },
  moomoo:  { bg: "#fff9ee", fg: "#172c66", dot: "#f582ae" },
  bowser:  { bg: "#1f1638", fg: "#fffffe", dot: "#7f5af0" },
  yoshi:   { bg: "#f1ede4", fg: "#41474c", dot: "#99c221" },
};

export function buildFaviconDataUrl(id: ThemeId): string {
  const c = FAVICON_COLORS[id] ?? FAVICON_COLORS[DEFAULT_THEME];
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>` +
    `<rect width='64' height='64' rx='14' fill='${c.bg}'/>` +
    `<text x='14' y='46' font-family='Georgia,serif' font-weight='600' font-size='40' fill='${c.fg}'>F</text>` +
    `<circle cx='44' cy='46' r='4' fill='${c.dot}'/>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

