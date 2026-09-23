import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { Section } from "@/components/Section";
import { SeedNote } from "@/components/SeedNote";
import { getReadingPiece } from "@/lib/content";
import { localize } from "@/lib/paths";
import type { Lang } from "@/lib/types";
import Link from "next/link";

function safeHttp(url?: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return url;
  } catch {
    return "";
  }
  return "";
}

export async function ReadingPieceView({ lang, slug }: { lang: Lang; slug: string }) {
  const { item, fromSeed } = await getReadingPiece(slug);
  if (!item) notFound();
  const slides = safeHttp(item.slidesUrl);
  const audio = safeHttp(item.audioUrl);
  const link = safeHttp(item.link);
  const audioFile = audio && /\.(mp3|wav|m4a|ogg)(\?|$)/i.test(audio);
  const chapters = [
    { id: "why", index: "01", label: lang === "zh" ? "为何" : "Why" },
    { id: "explainer", index: "02", label: lang === "zh" ? "解说" : "Explainer" },
    { id: "figure", index: "03", label: lang === "zh" ? "图" : "Figure" },
    { id: "media", index: "04", label: lang === "zh" ? "附件" : "Annex" },
  ];
  return (
    <Frame lang={lang} chapters={chapters}>
      <header className="page-head" id="why">
        <p className="kicker ledger">01 — {chapters[0].label}</p>
        <p className="ledger">
          <Link href={localize("/reading", lang)}>{lang === "zh" ? "← 阅读室" : "← Reading room"}</Link>
        </p>
        <h1 className="display display-lg">{item.title}</h1>
        <p className="ledger" style={{ marginTop: "0.9rem" }}>
          {item.authors}
          {item.year ? ` · ${item.year}` : ""}
        </p>
        <SeedNote fromSeed={fromSeed} lang={lang} />
        <div className="prose" style={{ marginTop: "1.2rem" }}>
          <p>{item.why}</p>
        </div>
        {link ? (
          <p className="ledger" style={{ marginTop: "1rem" }}>
            <a href={link} rel="noreferrer">
              {lang === "zh" ? "原文" : "Source"}
            </a>
          </p>
        ) : null}
      </header>
      <Section id="explainer" kicker={`02 — ${chapters[1].label}`}>
        <div className="prose">
          <p>{item.explainer}</p>
        </div>
      </Section>
      <Section id="figure" kicker={`03 — ${chapters[2].label}`}>
        <Plate
          src={item.infographic}
          alt=""
          wide
          kicker={lang === "zh" ? "信息图槽" : "Infographic slot"}
          caption={lang === "zh" ? "在 Studio 替换为她的图。" : "Replace with her figure in Studio."}
          empty={lang === "zh" ? "信息图槽" : "Infographic"}
        />
      </Section>
      <Section id="media" kicker={`04 — ${chapters[3].label}`} short>
        <div className="stack">
          <div>
            <p className="ledger">{lang === "zh" ? "幻灯片" : "Slides"}</p>
            {slides ? (
              <p>
                <a className="file-link" href={slides} rel="noreferrer">
                  {slides}
                </a>
              </p>
            ) : (
              <Plate src="/media/tracery.svg" empty={lang === "zh" ? "幻灯片槽" : "Slides slot"} caption={lang === "zh" ? "PPT 或 PDF 的链接。" : "A link to a deck or PDF."} />
            )}
          </div>
          <div>
            <p className="ledger">{lang === "zh" ? "声音" : "Audio"}</p>
            {audioFile ? (
              <audio controls src={audio} style={{ width: "100%", marginTop: "0.6rem" }} />
            ) : audio ? (
              <p>
                <a className="file-link" href={audio} rel="noreferrer">
                  {audio}
                </a>
              </p>
            ) : (
              <Plate src="/media/fog-path.svg" empty={lang === "zh" ? "声音槽" : "Audio slot"} caption={lang === "zh" ? "上传一段讲解。" : "A spoken note, when there is one."} />
            )}
          </div>
        </div>
      </Section>
    </Frame>
  );
}
