"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { localize, withLang } from "@/lib/paths";
import type { Lang } from "@/lib/types";

const stage = "/paint/home-stage.png";
const frames = {
  neutral: "/paint/figures/figure-neutral.png",
  left: "/paint/figures/figure-glance-left.png",
  right: "/paint/figures/figure-glance-right.png",
  gown: "/paint/figures/figure-gown.png",
  suit: "/paint/figures/figure-suit.png",
};

const copy = {
  en: {
    academic: "Academic",
    academicDek: "She walks into the court.",
    model: "Model",
    modelDek: "She walks into the studio.",
    enter: "Enter",
  },
  zh: {
    academic: "学术",
    academicDek: "她走进庭院。",
    model: "模特",
    modelDek: "她走进影棚。",
    enter: "进入",
  },
};

export function HomeView({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  useEffect(() => {
    for (const src of [stage, ...Object.values(frames)]) {
      const image = new Image();
      image.src = src;
    }
  }, []);

  function enter(side: "academic" | "model") {
    if (busy.current) return;
    const href = localize(side === "academic" ? "/academic" : "/model", lang);
    const node = root.current;
    if (!node) return;
    busy.current = true;
    node.classList.add("is-playing");
    const finish = () => router.push(href);
    const preferCut = reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (preferCut) {
      gsap.to(node, { opacity: 0, duration: 0.28, onComplete: finish });
      return;
    }
    const academic = side === "academic";
    const nextFrame = node.querySelector(academic ? ".fig-gown" : ".fig-suit");
    const other = node.querySelector(academic ? "[data-side='model']" : "[data-side='academic']");
    const flash = node.querySelector(".split-flash");
    const fog = node.querySelector(".split-fog");
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(node.querySelector(".fig-neutral"), { opacity: 0, duration: 0.35 }, 0);
    tl.to(node.querySelectorAll(".fig-left, .fig-right"), { opacity: 0, duration: 0.2 }, 0);
    tl.to(figure.current, { x: academic ? "-14vw" : "14vw", duration: 1.45, ease: "power2.inOut" }, 0);
    tl.to(
      world.current,
      {
        scale: 1.26,
        x: academic ? "11%" : "-11%",
        duration: 1.6,
        ease: "power2.inOut",
        transformOrigin: academic ? "30% 58%" : "70% 58%",
      },
      0,
    );
    tl.to(nextFrame, { opacity: 1, duration: 0.55 }, 0.42);
    tl.to(other, { opacity: 0, duration: 0.7 }, 0.45);
    if (academic) tl.to(fog, { opacity: 0.62, duration: 1.05 }, 0.35);
    else tl.fromTo(flash, { opacity: 0 }, { opacity: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, 1.28);
  }

  function onKeyDown(event: React.KeyboardEvent, side: "academic" | "model") {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      enter(side);
    }
  }

  const t = copy[lang];
  return (
    <main className="split" id="content" ref={root}>
      <div className="split-stage">
        <div className="split-world" ref={world}>
          <img className="split-bg" src={stage} alt="" />
          <div className="split-fog" />
        </div>
        <div className="split-figure" ref={figure}>
          <img className="fig fig-neutral" src={frames.neutral} alt="" />
          <img className="fig fig-left" src={frames.left} alt="" />
          <img className="fig fig-right" src={frames.right} alt="" />
          <img className="fig fig-gown" src={frames.gown} alt="" />
          <img className="fig fig-suit" src={frames.suit} alt="" />
        </div>
      </div>
      <div className="split-flash" />
      <a
        className="split-half"
        data-side="academic"
        href={localize("/academic", lang)}
        onClick={(event) => {
          event.preventDefault();
          enter("academic");
        }}
        onKeyDown={(event) => onKeyDown(event, "academic")}
      >
        <span className="split-copy">
          <span className="ledger">{lang === "zh" ? "左" : "Left"}</span>
          <span className="display split-title">{t.academic}</span>
          <span className="split-dek">{t.academicDek}</span>
          <span className="ledger split-enter">{t.enter}</span>
        </span>
      </a>
      <a
        className="split-half"
        data-side="model"
        href={localize("/model", lang)}
        onClick={(event) => {
          event.preventDefault();
          enter("model");
        }}
        onKeyDown={(event) => onKeyDown(event, "model")}
      >
        <span className="split-copy">
          <span className="ledger">{lang === "zh" ? "右" : "Right"}</span>
          <span className="display split-title">{t.model}</span>
          <span className="split-dek">{t.modelDek}</span>
          <span className="ledger split-enter">{t.enter}</span>
        </span>
      </a>
      <div className="split-mark">
        <p className="display">Haomin LUO</p>
        <p className="ledger">{lang === "zh" ? "她站在门槛上。" : "She stands at the threshold."}</p>
      </div>
      <nav className="split-lang" aria-label={lang === "zh" ? "语言" : "Language"}>
        <a href={withLang(pathname, "en")} data-active={lang === "en"} hrefLang="en">
          EN
        </a>
        <a href={withLang(pathname, "zh")} data-active={lang === "zh"} hrefLang="zh-Hans">
          中文
        </a>
      </nav>
    </main>
  );
}
