import { notFound } from "next/navigation";
import { Disclosure } from "@/components/Disclosure";
import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { Section } from "@/components/Section";
import { SeedNote } from "@/components/SeedNote";
import { VideoSlot } from "@/components/VideoSlot";
import { getPaper } from "@/lib/content";
import { localize } from "@/lib/paths";
import type { Lang } from "@/lib/types";
import Link from "next/link";

export async function PaperView({ lang, slug }: { lang: Lang; slug: string }) {
  const { item, fromSeed } = await getPaper(slug);
  if (!item) notFound();
  const chapters = [
    { id: "abstract", index: "01", label: lang === "zh" ? "摘要" : "Abstract" },
    { id: "explainer", index: "02", label: lang === "zh" ? "解说" : "Explainer" },
    { id: "plates", index: "03", label: lang === "zh" ? "图版" : "Plates" },
    { id: "film", index: "04", label: lang === "zh" ? "影像" : "Film" },
  ];
  return (
    <Frame lang={lang} chapters={chapters}>
      <header className="page-head" id="abstract">
        <p className="kicker ledger">01 — {chapters[0].label}</p>
        <p className="ledger">
          <Link className="back" href={localize("/papers", lang)}>
            {lang === "zh" ? "← 论文" : "← Papers"}
          </Link>
        </p>
        <h1 className="display display-lg">{item.title}</h1>
        <p className="ledger" style={{ marginTop: "1rem" }}>
          {item.years}
          {item.venue ? ` · ${item.venue}` : ""}
        </p>
        {lang === "zh" ? <p className="ledger">正文为英文</p> : null}
        <SeedNote fromSeed={fromSeed} lang={lang} />
        <div className="prose" style={{ marginTop: "1.5rem" }}>
          <p>{item.abstract}</p>
        </div>
      </header>
      <Section id="explainer" kicker={`02 — ${chapters[1].label}`}>
        <div className="prose">
          <p>{item.explainer}</p>
        </div>
        {item.measures?.length ? (
          <Disclosure label={lang === "zh" ? "测得的数字" : "The measured plate"} kicker={lang === "zh" ? "相对无控制" : "Against no control"}>
            <div className="measures">
              {item.measures.map((measure) => (
                <div key={measure.label}>
                  <span className="ledger">{measure.label}</span>
                  <strong>{measure.value}</strong>
                </div>
              ))}
            </div>
            <p>
              {lang === "zh"
                ? "数字来自已公开的一年级报告页，六十天的 CityLearn 微电网。对照还包括 DTDE、CTDE 与模型预测边界。"
                : "Figures from the public first-year account, a real microgrid in CityLearn over sixty days. The same account compares DTDE, CTDE, and a model-predictive bound."}
            </p>
          </Disclosure>
        ) : null}
      </Section>
      <Section id="plates" kicker={`03 — ${chapters[2].label}`}>
        <Plate src={item.hero} alt="" kicker={lang === "zh" ? "主图版" : "Hero plate"} caption={item.title} wide />
        <div className="stack">
          {item.figures.map((src, index) => (
            <Plate key={src} src={src} alt="" kicker={`${lang === "zh" ? "图版" : "Plate"} ${index + 2}`} />
          ))}
        </div>
      </Section>
      <Section id="film" kicker={`04 — ${chapters[3].label}`} short>
        <VideoSlot
          url={item.videoUrl}
          title={item.title}
          empty={lang === "zh" ? "影像槽" : "Film slot"}
          caption={lang === "zh" ? "在 Studio 填入视频 URL。" : "Add a video URL in Studio."}
        />
      </Section>
    </Frame>
  );
}
