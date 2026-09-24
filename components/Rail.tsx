"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { barePath, localize, rooms, withLang } from "@/lib/paths";
import type { Chapter, Lang } from "@/lib/types";

type Props = {
  lang: Lang;
  chapters: Chapter[];
};

export function Rail({ lang, chapters }: Props) {
  const pathname = usePathname();
  const bare = barePath(pathname);
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const nodes = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [chapters, pathname]);

  return (
    <aside className="rail">
      <Link href={localize("/", lang)} className="rail-brand">
        <span className="rail-name">
          Haomin
          <br />
          LUO
        </span>
        <span className="ledger">{lang === "zh" ? "剑桥 · 圣约翰" : "Cambridge · St John's"}</span>
      </Link>
      <ol className="rail-chapters">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a className="rail-link" href={`#${chapter.id}`} data-active={active === chapter.id}>
              <span className="ledger rail-index">{chapter.index}</span>
              <span className="ledger">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <nav aria-label={lang === "zh" ? "目录" : "Index"}>
        <ol className="rail-rooms">
          {rooms.map((room) => {
            const href = localize(room.href, lang);
            const current = bare === room.href;
            return (
              <li key={room.href}>
                <Link className="rail-link" href={href} data-active={current} aria-current={current ? "page" : undefined}>
                  <span className="ledger rail-index">{current ? "—" : ""}</span>
                  <span className="ledger">{lang === "zh" ? room.zh : room.en}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="rail-foot">
        <Link href={withLang(pathname, "en")} data-active={lang === "en"} className="ledger">
          EN
        </Link>
        <Link href={withLang(pathname, "zh")} data-active={lang === "zh"} className="ledger">
          中文
        </Link>
      </div>
    </aside>
  );
}
