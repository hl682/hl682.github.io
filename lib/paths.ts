import type { Lang } from "./types";

export const rooms: { href: string; en: string; zh: string }[] = [
  { href: "/", en: "Index", zh: "首页" },
  { href: "/academic", en: "Academic", zh: "学术" },
  { href: "/model", en: "Model", zh: "模特" },
  { href: "/research", en: "Research", zh: "研究" },
  { href: "/papers", en: "Papers", zh: "论文" },
  { href: "/lab-notes", en: "Lab notes", zh: "实验笔记" },
  { href: "/reading", en: "Reading", zh: "阅读" },
  { href: "/runway", en: "Runway", zh: "秀场" },
  { href: "/lens", en: "Lens", zh: "镜头" },
  { href: "/contact", en: "Contact", zh: "联系" },
];

export function barePath(path: string) {
  if (path === "/zh" || path === "/zh/") return "/";
  if (path.startsWith("/zh/")) return path.slice(3) || "/";
  return path || "/";
}

export function localize(href: string, lang: Lang) {
  if (href.startsWith("/studio") || href.startsWith("http") || href.startsWith("mailto:")) return href;
  const bare = barePath(href);
  if (lang === "en") return bare;
  return bare === "/" ? "/zh" : `/zh${bare}`;
}

export function withLang(path: string, lang: Lang) {
  return localize(barePath(path), lang);
}
