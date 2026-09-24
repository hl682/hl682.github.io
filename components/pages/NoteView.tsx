import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { Section } from "@/components/Section";
import { SeedNote } from "@/components/SeedNote";
import { VideoSlot } from "@/components/VideoSlot";
import { getNote } from "@/lib/content";
import { localize } from "@/lib/paths";
import type { Lang } from "@/lib/types";
import Link from "next/link";

export async function NoteView({ lang, slug }: { lang: Lang; slug: string }) {
  const { item, fromSeed } = await getNote(slug);
  if (!item) notFound();
  const chapters = [
    { id: "premise", index: "01", label: lang === "zh" ? "前提" : "Premise" },
    { id: "failed", index: "02", label: lang === "zh" ? "失败" : "Failure" },
    { id: "lesson", index: "03", label: lang === "zh" ? "留下" : "Remains" },
  ];
  return (
    <Frame lang={lang} chapters={chapters}>
      <header className="page-head" id="premise">
        <p className="kicker ledger">01 — {chapters[0].label}</p>
        <p className="ledger">
          <Link href={localize("/lab-notes", lang)}>{lang === "zh" ? "← 实验笔记" : "← Lab notes"}</Link>
        </p>
        <h1 className="display display-lg">{item.title}</h1>
        <p className="ledger" style={{ marginTop: "0.8rem" }}>{item.date}</p>
        <SeedNote fromSeed={fromSeed} lang={lang} />
        <div className="prose" style={{ marginTop: "1.2rem" }}>
          <p>{item.premise}</p>
        </div>
      </header>
      <Section id="failed" kicker={`02 — ${chapters[1].label}`}>
        <h2 className="display display-md">{lang === "zh" ? "它为什么失败" : "Why it failed"}</h2>
        <div className="prose" style={{ marginTop: "1rem" }}>
          <p>{item.failed}</p>
        </div>
        <Plate src={item.figure} alt="" kicker={lang === "zh" ? "图版" : "Plate"} caption={item.title} wide />
      </Section>
      <Section id="lesson" kicker={`03 — ${chapters[2].label}`} short>
        <h2 className="display display-md">{lang === "zh" ? "留下的" : "What remained"}</h2>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>{item.lesson}</p>
        <div style={{ marginTop: "1.5rem" }}>
          <VideoSlot url={item.videoUrl} title={item.title} empty={lang === "zh" ? "影像槽" : "Film slot"} />
        </div>
      </Section>
    </Frame>
  );
}
