import { Frame } from "@/components/Frame";
import { SeedNote } from "@/components/SeedNote";
import { localize } from "@/lib/paths";
import type { Lang, ReadingPiece } from "@/lib/types";
import Link from "next/link";

export function ReadingView({ lang, items, fromSeed }: { lang: Lang; items: ReadingPiece[]; fromSeed: boolean }) {
  return (
    <Frame lang={lang} chapters={[{ id: "list", index: "01", label: lang === "zh" ? "目录" : "List" }]}>
      <header className="page-head" id="list">
        <p className="kicker ledger">01 — {lang === "zh" ? "阅读室" : "Reading room"}</p>
        <h1 className="display display-xl">{lang === "zh" ? "阅读室" : "Reading room"}</h1>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>
          {lang === "zh"
            ? "别人的论文。她愿意放在手边的那些：解说、信息图、幻灯片与声音的位置都留着。"
            : "Other people's papers, kept nearby. Slots for an explainer, an infographic, slides, and audio."}
        </p>
      </header>
      <div style={{ marginTop: "2rem" }}>
        <SeedNote fromSeed={fromSeed} lang={lang} />
        <ol className="catalogue">
          {items.map((piece, index) => (
            <li key={piece.slug}>
              <Link href={localize(`/reading/${piece.slug}`, lang)}>
                <span className="ledger">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="cat-title">{piece.title}</span>
                  <span className="quiet dek">{piece.authors}</span>
                </span>
                <span className="ledger meta">{piece.year}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}
