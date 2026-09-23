"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localize, withLang } from "@/lib/paths";
import type { Lang } from "@/lib/types";

const copy = {
  en: {
    academic: "Academic",
    academicDek: "A black gown, court by court, into the library.",
    model: "Model",
    modelDek: "A studio, a suit, the next pose.",
    enter: "Enter",
  },
  zh: {
    academic: "学术",
    academicDek: "黑袍。一进庭院，一进图书馆。",
    model: "模特",
    modelDek: "影棚、套装、下一个姿势。",
    enter: "进入",
  },
};

export function HomeView({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const t = copy[lang];
  return (
    <main className="split" id="content">
      <Link className="split-half" href={localize("/academic", lang)} data-side="academic">
        <span className="split-grade">
          <img src="/paint/cambridge-academic.png" alt="A painted Cambridge college court in mist, quieter oil." />
        </span>
        <span className="split-copy">
          <span className="ledger">{lang === "zh" ? "左" : "Left"}</span>
          <span className="display split-title">{t.academic}</span>
          <span className="split-dek">{t.academicDek}</span>
          <span className="ledger split-enter">{t.enter}</span>
        </span>
      </Link>
      <Link className="split-half" href={localize("/model", lang)} data-side="model">
        <span className="split-grade">
          <img src="/paint/cambridge-academic.png" alt="The same painted Cambridge college court, with sharper editorial light." />
        </span>
        <span className="split-copy">
          <span className="ledger">{lang === "zh" ? "右" : "Right"}</span>
          <span className="display split-title">{t.model}</span>
          <span className="split-dek">{t.modelDek}</span>
          <span className="ledger split-enter">{t.enter}</span>
        </span>
      </Link>
      <div className="split-mark">
        <p className="display">Haomin LUO</p>
        <p className="ledger">Cambridge · one court, two hands</p>
      </div>
      <nav className="split-lang" aria-label={lang === "zh" ? "语言" : "Language"}>
        <Link href={withLang(pathname, "en")} data-active={lang === "en"} hrefLang="en">
          EN
        </Link>
        <Link href={withLang(pathname, "zh")} data-active={lang === "zh"} hrefLang="zh-Hans">
          中文
        </Link>
      </nav>
    </main>
  );
}
