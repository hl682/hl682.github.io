import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { SeedNote } from "@/components/SeedNote";
import type { Lang, LensPhoto } from "@/lib/types";

export function LensView({ lang, items, fromSeed }: { lang: Lang; items: LensPhoto[]; fromSeed: boolean }) {
  return (
    <Frame
      lang={lang}
      chapters={[
        { id: "hang", index: "01", label: lang === "zh" ? "悬挂" : "Hang" },
        { id: "show", index: "02", label: lang === "zh" ? "秀" : "Show" },
      ]}
    >
      <header className="page-head" id="hang">
        <p className="kicker ledger">01 — {lang === "zh" ? "镜头" : "Lens"}</p>
        <h1 className="display display-xl">{lang === "zh" ? "镜头" : "Lens"}</h1>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>
          {lang === "zh"
            ? "她的摄影。雾、石、衣褶。肖像不在占位图里。"
            : "Her photographs. Fog, stone, cloth. No face is invented in the stand-in plates."}
        </p>
      </header>
      <SeedNote fromSeed={fromSeed} lang={lang} />
      <div className="hang">
        {items.map((photo) => (
          <Plate
            key={photo.slug}
            src={photo.image}
            alt={photo.caption}
            kicker={[photo.series, photo.year, photo.place].filter(Boolean).join(" · ")}
            caption={`${photo.title}. ${photo.caption}`}
          />
        ))}
      </div>
      <section id="show" className="chapter chapter-short">
        <p className="kicker ledger">02 — {lang === "zh" ? "秀" : "Show"}</p>
        <h2 className="display display-md">
          {lang === "zh" ? "剑桥大学慈善时装秀" : "Cambridge University Charity Fashion Show"}
        </h2>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>
          {lang === "zh"
            ? "我为剑桥大学慈善时装秀拍照。那一组照片会挂在这里，等底片进来。"
            : "I photograph for the Cambridge University Charity Fashion Show. That series will hang here when the pictures do."}
        </p>
      </section>
    </Frame>
  );
}
