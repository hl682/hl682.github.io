import { Disclosure } from "@/components/Disclosure";
import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { SeedNote } from "@/components/SeedNote";
import { VideoSlot } from "@/components/VideoSlot";
import type { Lang, RunwayItem, VideoPiece } from "@/lib/types";

export function RunwayView({
  lang,
  items,
  videos,
  fromSeed,
}: {
  lang: Lang;
  items: RunwayItem[];
  videos: VideoPiece[];
  fromSeed: boolean;
}) {
  const chapters = [
    { id: "hang", index: "01", label: lang === "zh" ? "悬挂" : "Hang" },
    { id: "agency", index: "02", label: lang === "zh" ? "经纪" : "Agency" },
  ];
  const films = videos.filter((video) => video.kind === "runway" || video.kind === "film");
  return (
    <Frame lang={lang} chapters={chapters}>
      <header className="page-head" id="hang">
        <p className="kicker ledger">01 — {chapters[0].label}</p>
        <h1 className="display display-xl">{lang === "zh" ? "秀场" : "Runway"}</h1>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>
          {lang === "zh"
            ? "时装周、广告、静帧。釉绘先占着墙，真照片从 Studio 换上。"
            : "Fashion weeks, campaigns, stills. Glazed studies hold the wall until the photographs are uploaded."}
        </p>
      </header>
      <SeedNote fromSeed={fromSeed} lang={lang} />
      <div className="salon">
        {items.flatMap((item) =>
          item.stills.map((still, index) => (
            <article className="salon-card" key={`${item.slug}-${index}`}>
              <Plate
                src={still}
                alt=""
                kicker={`${item.house} · ${item.date}`}
                caption={index === 0 ? item.title : item.season}
              />
              {index === 0 ? (
                <Disclosure label={lang === "zh" ? "全文" : "Full disclosure"} kicker={item.kind}>
                  <p>{item.credit}</p>
                  <p>{item.note}</p>
                </Disclosure>
              ) : null}
              {index === 0 ? (
                <div style={{ marginTop: "1rem" }}>
                  <VideoSlot
                    url={item.videoUrl}
                    title={item.title}
                    empty={lang === "zh" ? "成片槽" : "Film slot"}
                  />
                </div>
              ) : null}
            </article>
          )),
        )}
      </div>
      {films.length ? (
        <div className="stack">
          {films.map((film) => (
            <VideoSlot key={film.slug} url={film.url} title={film.title} empty={film.title} caption={film.caption} />
          ))}
        </div>
      ) : null}
      <section id="agency" className="chapter chapter-short">
        <p className="kicker ledger">02 — {chapters[1].label}</p>
        <h2 className="display display-md">{lang === "zh" ? "母经纪公司" : "Mother agency"}</h2>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>
          {lang === "zh" ? (
            <>
              Lacoco Models。合作请写给经纪人{" "}
              <a className="mail" href="mailto:Vico.wu@lacocomodels.com">
                Vico.wu@lacocomodels.com
              </a>
            </>
          ) : (
            <>
              Lacoco Models. For work, write to the agent at{" "}
              <a className="mail" href="mailto:Vico.wu@lacocomodels.com">
                Vico.wu@lacocomodels.com
              </a>
            </>
          )}
        </p>
      </section>
    </Frame>
  );
}
