import Link from "next/link";
import { notFound } from "next/navigation";
import { SeedNote } from "@/components/SeedNote";
import { VoiceButton } from "@/components/VoiceButton";
import { getPaper } from "@/lib/content";
import { localize } from "@/lib/paths";
import type { Lang } from "@/lib/types";

export async function PaperView({ lang, slug }: { lang: Lang; slug: string }) {
  const { item, fromSeed } = await getPaper(slug);
  if (!item) notFound();
  const spoken = `${item.title}. ${item.explainer}`;
  const publication = item.publicationUrl?.trim();
  return (
    <main className="reader" id="content">
      <header className="reader-bar">
        <Link className="ledger" href={localize("/academic#library", lang)}>
          {lang === "zh" ? "← 书架" : "← The shelf"}
        </Link>
        <p className="ledger">{item.years}</p>
        <Link className="ledger" href={localize("/papers", lang)}>
          {lang === "zh" ? "全部论文" : "All papers"}
        </Link>
      </header>
      <div className="reader-stage">
        <article className="folio" aria-label={item.title}>
          <div className="folio-bar">
            <span className="ledger">{lang === "zh" ? "文稿" : "Plate"} · 01</span>
            {item.pdfUrl ? (
              <a href={item.pdfUrl}>{lang === "zh" ? "打开 PDF 文件" : "Open the PDF file"}</a>
            ) : (
              <span className="ledger">{lang === "zh" ? "没有 PDF" : "No PDF on file"}</span>
            )}
          </div>
          <div className="folio-page">
            <p className="ledger">
              {item.pdfUrl
                ? lang === "zh"
                  ? "占位文稿。正式 PDF 用上方链接打开，或在 Studio 替换。"
                  : "Placeholder plate. The file itself is linked above. Replace it in Studio."
                : lang === "zh"
                  ? "尚未上传 PDF。"
                  : "No PDF has been uploaded."}
            </p>
            <h2 className="display">{item.title}</h2>
            <p>{item.abstract}</p>
            {item.measures?.length ? (
              <p className="folio-measures">
                {item.measures.map((measure) => `${measure.label} ${measure.value}`).join("   ·   ")}
              </p>
            ) : null}
          </div>
        </article>
        <aside className="reader-notes">
          <p className="ledger">{item.venue || (lang === "zh" ? "未标明出处" : "No venue on file")}</p>
          <h1 className="display">{item.title}</h1>
          <SeedNote fromSeed={fromSeed} lang={lang} />
          {lang === "zh" ? <p className="ledger">解说为英文</p> : null}
          <p>{item.explainer}</p>
          {item.measures?.length ? (
            <ul className="reader-measures">
              {item.measures.map((measure) => (
                <li key={measure.label}>
                  <span className="ledger">{measure.label}</span>
                  <strong>{measure.value}</strong>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="reader-link">
            {publication ? (
              <a href={publication} rel="noreferrer">
                {lang === "zh" ? "出版链接" : "Publication"}
              </a>
            ) : (
              <span className="ledger">{lang === "zh" ? "尚无公开链接" : "No public link on file"}</span>
            )}
          </p>
          <VoiceButton text={spoken} lang={lang} />
        </aside>
      </div>
    </main>
  );
}
