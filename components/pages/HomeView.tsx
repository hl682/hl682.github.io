"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Disclosure } from "@/components/Disclosure";
import { Reveal } from "@/components/Reveal";
import { localize, withLang } from "@/lib/paths";
import type { Lang } from "@/lib/types";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const plates = [
  "/media/cloister.svg",
  "/media/quad.svg",
  "/media/diagram.svg",
  "/media/drape.svg",
  "/media/fog-path.svg",
];

const copy = {
  en: {
    index: "Index",
    close: "Close",
    chapters: [
      { id: "presence", index: "01", label: "Presence" },
      { id: "research", index: "02", label: "Research" },
      { id: "practice", index: "03", label: "Practice" },
      { id: "runway", index: "04", label: "Runway" },
      { id: "contact", index: "05", label: "Contact" },
    ],
    presenceKicker: "PhD candidate · high-fashion model",
    presenceLines: ["Two practices.", "One climate of attention."],
    presenceAside: "A cloister in low fog. The plate changes as the page is turned.",
    asideNote: "Not a curriculum vitae.",
    disclose: "Full disclosure",
    discloseBody: [
      "I am a PhD candidate in Engineering at Cambridge, St John's College. Supervisors: Prof. Ioannis Lestas and Prof. Ruchi Choudhary, who also sits at the Alan Turing Institute.",
      "One practice is reinforcement learning, and the longer wish to learn how to learn when the task moves. The other is cloth, campaign, and the camera. My mother agency is Lacoco Models.",
    ],
    researchTitle: "How a group learns to share a grid.",
    researchLede:
      "Reinforcement learning for storage that must share a feeder, a tariff, a peak. Meta-learning is the longer question, not a finished claim.",
    researchAside: "Stone court, mist. The figure of the work is elsewhere.",
    arcIntro: "Three stations. Nothing else is inventoried here.",
    stations: [
      ["Southwest Jiaotong University", "Civil engineering, the bachelor's degree. 2020."],
      ["Hong Kong University of Science and Technology", "AI and energy. Supervised by Prof. Zhe (Walter) Wang. 2024."],
      ["Cambridge, St John's College", "The doctorate. Registered as a PhD candidate, January 2026."],
    ],
    researchLink: "The longer account",
    practiceTitle: "What is kept.",
    practiceLede: "Papers, the failures, and other people's work left on the table.",
    doors: [
      { href: "/papers", index: "I", title: "Papers", dek: "Abstract, explainer, plates, film." },
      { href: "/lab-notes", index: "II", title: "Lab notes", dek: "What failed, and why." },
      { href: "/reading", index: "III", title: "Reading", dek: "Other hands. Figure, slides, sound." },
    ],
    runwayTitle: "Cloth, and the camera.",
    runwayLede: "Campaigns on one wall. Photographs on the other. Neither is asked to imitate the laboratory.",
    seen: [
      { href: "/runway", index: "I", title: "Runway", dek: "SELFWHO, and the agency." },
      { href: "/lens", index: "II", title: "Lens", dek: "Stone, fog, and the charity show." },
    ],
    contactTitle: "Write plainly.",
    academic: "Academic",
    agency: "Agency · Lacoco Models",
    agencyNote: "Fashion collaborations go through the agent.",
    collegeNote: "Department of Engineering. St John's College.",
    plateNote: "The full plate",
  },
  zh: {
    index: "目录",
    close: "关闭",
    chapters: [
      { id: "presence", index: "01", label: "在场" },
      { id: "research", index: "02", label: "研究" },
      { id: "practice", index: "03", label: "实践" },
      { id: "runway", index: "04", label: "秀场" },
      { id: "contact", index: "05", label: "联系" },
    ],
    presenceKicker: "工程博士候选人 · 高定时装模特",
    presenceLines: ["两种实践。", "同一种注视。"],
    presenceAside: "低雾中的回廊。页面向下，图版跟着换。",
    asideNote: "这不是一份简历。",
    disclose: "全文",
    discloseBody: [
      "我是剑桥大学工程系的博士候选人，学院为圣约翰学院。导师是 Ioannis Lestas 教授与 Ruchi Choudhary 教授，后者亦任职于艾伦·图灵研究所。",
      "一种实践是强化学习，以及当任务移动时如何学习「怎样去学」。另一种是衣服、广告与镜头。母经纪公司是 Lacoco Models。",
    ],
    researchTitle: "一组学习者如何共用一条电网。",
    researchLede: "储能必须共享馈线、电价与峰值。元学习是更长的问题，不是已经完成的主张。",
    researchAside: "石庭与雾。工作的图在别的房间。",
    arcIntro: "三站。其余的不在这里编目。",
    stations: [
      ["西南交通大学", "土木工程学士，2020。"],
      ["香港科技大学", "人工智能与能源。导师王者教授。2024。"],
      ["剑桥，圣约翰学院", "工程博士。2026 年 1 月注册为博士候选人。"],
    ],
    researchLink: "更长的记述",
    practiceTitle: "保存下来的。",
    practiceLede: "论文、失败，以及留在手边的别人的工作。",
    doors: [
      { href: "/papers", index: "I", title: "论文", dek: "摘要、解说、图版、影像。" },
      { href: "/lab-notes", index: "II", title: "实验笔记", dek: "失败，以及为什么。" },
      { href: "/reading", index: "III", title: "阅读", dek: "别人的论文。图、幻灯片、声音。" },
    ],
    runwayTitle: "衣服，以及镜头。",
    runwayLede: "一堵墙是广告与秀场。另一堵是照片。都不模仿实验室。",
    seen: [
      { href: "/runway", index: "I", title: "秀场", dek: "SELFWHO，以及经纪公司。" },
      { href: "/lens", index: "II", title: "镜头", dek: "石、雾，以及慈善时装秀。" },
    ],
    contactTitle: "写得明白。",
    academic: "学术",
    agency: "经纪 · Lacoco Models",
    agencyNote: "时装合作请联系经纪人。",
    collegeNote: "工程系，圣约翰学院。",
    plateNote: "完整的一页",
  },
} as const;

export function HomeView({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const plateRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState<string>(t.chapters[0].id);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = t.chapters.map((chapter) => document.getElementById(chapter.id));

    const apply = (progress: number) => {
      const count = t.chapters.length;
      let current: string = t.chapters[0].id;
      const mark = window.innerHeight * 0.42;
      nodes.forEach((node, index) => {
        if (!node) return;
        if (node.getBoundingClientRect().top <= mark) current = t.chapters[index].id;
      });
      setActive((prev) => (prev === current ? prev : current));
      if (barRef.current) barRef.current.style.height = `${Math.min(1, Math.max(0, progress)) * 100}%`;
      plateRefs.current.forEach((plate, index) => {
        if (!plate) return;
        const center = (index + 0.45) / count;
        const influence = Math.max(0, 1 - Math.abs(progress - center) / 0.26);
        const shown = t.chapters[index].id === current ? Math.max(influence, 0.92) : influence;
        plate.style.opacity = String(shown);
        const drift = reduced ? 0 : (progress - center) * 6;
        const scale = reduced ? 1 : 1.07 - influence * 0.05;
        plate.style.transform = `scale(${scale}) translate3d(0, ${drift}%, 0)`;
      });
    };

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: reduced ? false : 0.55,
      onUpdate: (self) => apply(self.progress),
    });
    apply(0);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      trigger.kill();
    };
  }, [t.chapters]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (menu) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [menu]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  function go(id: string) {
    setMenu(false);
    const node = document.getElementById(id);
    if (!node) return;
    const y = node.getBoundingClientRect().top + window.scrollY;
    requestAnimationFrame(() => {
      const lenis = window.__lenis;
      lenis?.start();
      if (lenis) lenis.scrollTo(y, { duration: reduce ? 0 : 1.1 });
      else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    });
  }

  return (
    <div className="story" id="content">
      <div className="story-canvas" aria-hidden="true">
        {plates.map((src, index) => (
          <div
            className="story-plate"
            key={src}
            style={{ opacity: index === 0 ? 1 : 0 }}
            ref={(node) => {
              plateRefs.current[index] = node;
            }}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>
      <div className="story-frame" aria-hidden="true">
        <i className="junction" data-corner="tl" />
        <i className="junction" data-corner="tr" />
        <i className="junction" data-corner="bl" />
        <i className="junction" data-corner="br" />
      </div>
      <div className="story-rule" aria-hidden="true" />

      <header className="story-top">
        <button type="button" className="story-menu-btn" aria-expanded={menu} onClick={() => setMenu((open) => !open)}>
          <span className="junction junction-btn" aria-hidden="true" />
          <span className="ledger">{menu ? t.close : t.index}</span>
        </button>
        <span className="story-lang">
          <Link href={withLang(pathname, "en")} data-active={lang === "en"} className="ledger">
            EN
          </Link>
          <Link href={withLang(pathname, "zh")} data-active={lang === "zh"} className="ledger">
            中文
          </Link>
        </span>
      </header>

      <nav className="story-rail" aria-label={t.index}>
        <span className="story-rail-bar" ref={barRef} />
        {t.chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className="story-rail-link"
            data-active={active === chapter.id}
            onClick={() => go(chapter.id)}
          >
            <span className="ledger">{chapter.index}</span>
            <span className="ledger">{chapter.label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {menu ? (
          <motion.div
            className="story-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ol>
              {t.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <button type="button" onClick={() => go(chapter.id)} data-active={active === chapter.id}>
                    <span className="ledger">CH. {chapter.index}</span>
                    <span className="display display-md">{chapter.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="story-track" ref={trackRef}>
        <section className="story-chapter" id="presence">
          <div className="story-copy">
            <p className="ledger">{t.chapters[0].index} — {t.chapters[0].label}</p>
            <Reveal as="h1" className="display display-xl" text="Haomin LUO" />
            <p className="ledger" style={{ marginTop: "1.2rem" }}>{t.presenceKicker}</p>
            <div className="stanzas" style={{ marginTop: "1.6rem" }}>
              {t.presenceLines.map((line) => (
                <Reveal key={line} as="h2" className="display display-md" text={line} />
              ))}
            </div>
            <p className="display italic" style={{ marginTop: "1.4rem", fontSize: "1.65rem" }}>{t.asideNote}</p>
            <Disclosure label={t.disclose} kicker={lang === "zh" ? "附记" : "Note"}>
              {t.discloseBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Disclosure>
          </div>
          <p className="story-aside quiet">{t.presenceAside}</p>
        </section>

        <section className="story-chapter" id="research">
          <div className="story-copy">
            <p className="ledger">{t.chapters[1].index} — {t.chapters[1].label}</p>
            <h2 className="display display-lg">{t.researchTitle}</h2>
            <p className="quiet measure" style={{ marginTop: "1.1rem" }}>{t.researchLede}</p>
            <Disclosure label={t.disclose} kicker={lang === "zh" ? "来路" : "Arc"}>
              <p>{t.arcIntro}</p>
              {t.stations.map(([place, line]) => (
                <p key={place}>
                  <strong>{place}</strong>
                  <br />
                  {line}
                </p>
              ))}
            </Disclosure>
            <p className="ledger" style={{ marginTop: "1.4rem" }}>
              <Link href={localize("/research", lang)}>{t.researchLink}</Link>
            </p>
          </div>
          <p className="story-aside quiet">{t.researchAside}</p>
        </section>

        <section className="story-chapter" id="practice">
          <div className="story-copy">
            <p className="ledger">{t.chapters[2].index} — {t.chapters[2].label}</p>
            <h2 className="display display-lg">{t.practiceTitle}</h2>
            <p className="quiet" style={{ marginTop: "0.9rem" }}>{t.practiceLede}</p>
            <ol className="story-doors">
              {t.doors.map((door) => (
                <li key={door.href}>
                  <Link href={localize(door.href, lang)}>
                    <span className="ledger">{door.index}</span>
                    <span>
                      <span className="cat-title">{door.title}</span>
                      <span className="quiet dek">{door.dek}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="story-chapter" id="runway">
          <div className="story-copy">
            <p className="ledger">{t.chapters[3].index} — {t.chapters[3].label}</p>
            <h2 className="display display-lg">{t.runwayTitle}</h2>
            <p className="quiet measure" style={{ marginTop: "0.9rem" }}>{t.runwayLede}</p>
            <ol className="story-doors">
              {t.seen.map((door) => (
                <li key={door.href}>
                  <Link href={localize(door.href, lang)}>
                    <span className="ledger">{door.index}</span>
                    <span>
                      <span className="cat-title">{door.title}</span>
                      <span className="quiet dek">{door.dek}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="story-chapter" id="contact">
          <div className="story-copy">
            <p className="ledger">{t.chapters[4].index} — {t.chapters[4].label}</p>
            <h2 className="display display-lg">{t.contactTitle}</h2>
            <div className="story-mails">
              <div>
                <p className="ledger">{t.academic}</p>
                <a className="display display-md mail" href="mailto:hl682@cam.ac.uk">hl682@cam.ac.uk</a>
                <p className="quiet">{t.collegeNote}</p>
              </div>
              <div>
                <p className="ledger">{t.agency}</p>
                <a className="display display-md mail" href="mailto:Vico.wu@lacocomodels.com">Vico.wu@lacocomodels.com</a>
                <p className="quiet">{t.agencyNote}</p>
              </div>
            </div>
            <p className="ledger" style={{ marginTop: "1.6rem" }}>
              <Link href={localize("/contact", lang)}>{t.plateNote}</Link>
              {"  ·  "}
              <Link href="/studio">Studio</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
