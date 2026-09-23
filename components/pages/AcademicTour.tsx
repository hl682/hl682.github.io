"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localize } from "@/lib/paths";
import type { Lang, Paper } from "@/lib/types";

const scenes = {
  en: [
    {
      id: "court",
      index: "01",
      title: "The court",
      body: "She comes through the gate in a black gown. The college is painted, not surveyed: honey stone, a lawn, mist.",
      image: "/paint/scene-court.png",
      alt: "Painted woman in a black academic gown walking a Cambridge college court.",
    },
    {
      id: "lawn",
      index: "02",
      title: "The lawn",
      body: "Across the grass toward the water. The gown stays black. The willows are broken color, not a postcard.",
      image: "/paint/scene-lawn.png",
      alt: "Painted woman in a black gown walking a college lawn toward a river and bridge.",
    },
    {
      id: "cloister",
      index: "03",
      title: "The cloister",
      body: "A stone walk between the court and the books. She keeps one hand on the pier.",
      image: "/paint/scene-cloister.png",
      alt: "Painted woman in a black gown standing in a stone cloister.",
    },
    {
      id: "library",
      index: "04",
      title: "The library",
      body: "The shelves are the papers. Choose a volume. An empty spine is marked as empty.",
      image: "/paint/scene-library.png",
      alt: "Painted college library with a woman in a black gown beside the shelves.",
    },
  ],
  zh: [
    {
      id: "court",
      index: "01",
      title: "庭院",
      body: "她穿着黑袍从门洞走进来。学院是画出来的，不是测绘：蜜色的石头、草坪、雾。",
      image: "/paint/scene-court.png",
      alt: "黑袍女子走在剑桥学院庭院里的油画。",
    },
    {
      id: "lawn",
      index: "02",
      title: "草坪",
      body: "穿过草地，朝向水面。袍子仍是黑的。柳树是碎笔触，不是明信片。",
      image: "/paint/scene-lawn.png",
      alt: "黑袍女子走在学院草坪上的油画。",
    },
    {
      id: "cloister",
      index: "03",
      title: "回廊",
      body: "庭院与书之间的一段石廊。她的一只手靠在柱墩上。",
      image: "/paint/scene-cloister.png",
      alt: "黑袍女子站在石回廊里的油画。",
    },
    {
      id: "library",
      index: "04",
      title: "图书馆",
      body: "架子上的书就是论文。选一本。空的书脊会标明是空的。",
      image: "/paint/scene-library.png",
      alt: "学院图书馆里，黑袍女子站在书架旁的油画。",
    },
  ],
} as const;

export function AcademicTour({ lang, papers }: { lang: Lang; papers: Paper[] }) {
  const list = scenes[lang];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    const found = list.findIndex((scene) => scene.id === id);
    if (found >= 0) setIndex(found);
  }, [list]);

  const scene = list[index];
  const library = scene.id === "library";

  function go(next: number) {
    const clamped = Math.max(0, Math.min(list.length - 1, next));
    setIndex(clamped);
    const id = list[clamped].id;
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <main className="tour" id="content" data-scene={scene.id}>
      <img className="tour-plate" src={scene.image} alt={scene.alt} />
      <header className="tour-bar">
        <Link href={localize("/", lang)} className="ledger">
          {lang === "zh" ? "← 两扇门" : "← Both doors"}
        </Link>
        <p className="ledger tour-name">Haomin LUO</p>
        <Link href={localize("/model", lang)} className="ledger">
          {lang === "zh" ? "模特 →" : "Model →"}
        </Link>
      </header>
      <section className="tour-card">
        <p className="ledger">
          {scene.index} / {list.length}
        </p>
        <h1 className="display">{scene.title}</h1>
        <p>{scene.body}</p>
        <div className="tour-nav">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0}>
            {lang === "zh" ? "退后" : "Step back"}
          </button>
          <button type="button" onClick={() => go(index + 1)} disabled={index === list.length - 1}>
            {lang === "zh" ? "往前" : "Walk on"}
          </button>
        </div>
      </section>
      {library ? (
        <section className="shelf" aria-label={lang === "zh" ? "论文" : "Papers"}>
          <p className="ledger">{lang === "zh" ? "她的论文" : "Her papers"}</p>
          <ol>
            {papers.map((paper) => (
              <li key={paper.slug}>
                <Link href={localize(`/papers/${paper.slug}`, lang)}>
                  <span className="ledger">{paper.years || "—"}</span>
                  <span className="display shelf-title">{paper.title}</span>
                </Link>
              </li>
            ))}
            {Array.from({ length: Math.max(0, 4 - papers.length) }).map((_, empty) => (
              <li key={`empty-${empty}`} className="shelf-empty">
                <span className="ledger">{lang === "zh" ? "空架" : "Empty"}</span>
                <span className="display shelf-title">{lang === "zh" ? "尚未放入" : "Not yet a volume"}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </main>
  );
}
