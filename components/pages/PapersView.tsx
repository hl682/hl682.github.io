import { Frame } from "@/components/Frame";
import { SeedNote } from "@/components/SeedNote";
import { localize } from "@/lib/paths";
import type { Lang, Paper } from "@/lib/types";
import Link from "next/link";

export function PapersView({ lang, items, fromSeed }: { lang: Lang; items: Paper[]; fromSeed: boolean }) {
  const chapters = [
    { id: "list", index: "01", label: lang === "zh" ? "目录" : "List" },
  ];
  return (
    <Frame lang={lang} chapters={chapters}>
      <header className="page-head" id="list">
        <p className="kicker ledger">01 — {lang === "zh" ? "论文" : "Papers"}</p>
        <h1 className="display display-xl">{lang === "zh" ? "论文" : "Papers"}</h1>
        <p className="quiet" style={{ marginTop: "1rem" }}>
          {lang === "zh"
            ? "自己的工作。摘要、解说、图版，以及一条影像槽。"
            : "Her own work. Abstract, explainer, plates, and a film slot."}
        </p>
      </header>
      <div style={{ marginTop: "2rem" }}>
        <SeedNote fromSeed={fromSeed} lang={lang} />
        <ol className="catalogue">
          {items.map((paper, index) => (
            <li key={paper.slug}>
              <Link href={localize(`/papers/${paper.slug}`, lang)}>
                <span className="ledger">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="cat-title">{paper.title}</span>
                  <span className="quiet dek">{paper.venue}</span>
                </span>
                <span className="ledger meta">{paper.years}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}
