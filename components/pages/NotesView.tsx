import { Frame } from "@/components/Frame";
import { SeedNote } from "@/components/SeedNote";
import { localize } from "@/lib/paths";
import type { LabNote, Lang } from "@/lib/types";
import Link from "next/link";

export function NotesView({ lang, items, fromSeed }: { lang: Lang; items: LabNote[]; fromSeed: boolean }) {
  return (
    <Frame lang={lang} chapters={[{ id: "list", index: "01", label: lang === "zh" ? "目录" : "List" }]}>
      <header className="page-head" id="list">
        <p className="kicker ledger">01 — {lang === "zh" ? "实验笔记" : "Lab notes"}</p>
        <h1 className="display display-xl">{lang === "zh" ? "实验笔记" : "Lab notes"}</h1>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>
          {lang === "zh"
            ? "没有发表的实验。重点是它为什么失败。"
            : "Unpublished experiments. The point is why they failed."}
        </p>
      </header>
      <div style={{ marginTop: "2rem" }}>
        <SeedNote fromSeed={fromSeed} lang={lang} />
        <ol className="catalogue">
          {items.map((note, index) => (
            <li key={note.slug}>
              <Link href={localize(`/lab-notes/${note.slug}`, lang)}>
                <span className="ledger">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="cat-title">{note.title}</span>
                  <span className="quiet dek">{note.premise}</span>
                </span>
                <span className="ledger meta">{note.date}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}
