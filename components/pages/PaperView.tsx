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
        {item.pdfUrl ? (
          <iframe className="reader-pdf" src={item.pdfUrl} title={item.title} />
        ) : (
          <div className="reader-missing">
            <p className="ledger">{lang === "zh" ? "没有 PDF" : "No PDF on file"}</p>
            <p>
              {lang === "zh"
                ? "在 Studio 的 Paper 文档里上传 PDF。这里不会编造一份论文。"
                : "Upload a PDF on the Paper document in Studio. This page will not invent one."}
            </p>
          </div>
        )}
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
