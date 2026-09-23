import { Disclosure } from "@/components/Disclosure";
import { Door } from "@/components/Door";
import { Frame } from "@/components/Frame";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { localize } from "@/lib/paths";
import type { Lang } from "@/lib/types";
import Link from "next/link";

const copy = {
  en: {
    chapters: [
      { id: "frontispiece", index: "01", label: "Frontispiece" },
      { id: "manifesto", index: "02", label: "Manifesto" },
      { id: "rooms", index: "03", label: "Two rooms" },
      { id: "arc", index: "04", label: "Arc" },
      { id: "doors", index: "05", label: "Doors" },
      { id: "catalogue", index: "06", label: "Catalogue" },
      { id: "colophon", index: "07", label: "Colophon" },
    ],
    place: "PhD candidate · Engineering",
    lede: "Also a high-fashion model. The site is a catalogue of both practices.",
    lines: ["Two rooms.", "One climate of attention.", "Agents on a grid. Cloth, and a camera."],
    aside: "Not a curriculum vitae.",
    disclose: "Full disclosure",
    discloseBody: [
      "I am a PhD candidate in the Department of Engineering at Cambridge, a member of St John's College. The supervisors are Prof. Ioannis Lestas and Prof. Ruchi Choudhary, who also sits at the Alan Turing Institute.",
      "The research is reinforcement learning, and the wish to learn how to learn when the task moves. The present thread is multi-agent coordination: how storage on a microgrid can form groups, and still act apart.",
      "The other room is fashion. My mother agency is Lacoco Models. Campaigns and the runway live through that door. I also photograph.",
    ],
    roomKicker: "The division",
    roomTitle: "What each room keeps",
    roomBody: [
      "Research keeps papers, the failures that did not become papers, and other people's work I want nearby.",
      "Runway keeps campaigns and stills. Lens keeps my photographs. Neither room is asked to imitate the other.",
    ],
    arcIntro: "Three stations. Nothing else is inventoried here.",
    stations: [
      { years: "— 2020", place: "Southwest Jiaotong University", line: "Civil engineering, the bachelor's degree." },
      { years: "— 2024", place: "Hong Kong University of Science and Technology", line: "AI and energy. Supervised by Prof. Zhe (Walter) Wang." },
      { years: "— now", place: "Cambridge, St John's College", line: "The doctorate, in engineering. Registered as a PhD candidate in January 2026." },
    ],
    doorsTitle: "Enter",
    researchDoor: "The grid, the group, the unpublished note.",
    runwayDoor: "Campaigns, cloth, the still that remains.",
    catalogueIntro: "A short index. The long form is inside.",
    entries: [
      { href: "/papers", index: "I", title: "Papers", dek: "Abstract, explainer, plates, film." },
      { href: "/lab-notes", index: "II", title: "Lab notes", dek: "What failed, and why." },
      { href: "/reading", index: "III", title: "Reading room", dek: "Other hands. Explainer, figure, sound." },
      { href: "/lens", index: "IV", title: "Lens", dek: "Photographs, including the charity show." },
    ],
    colophon:
      "Set in Court Serif — Source Serif 4 at a display optical size — with Quad Sans and Ledger Mono, which are IBM Plex, renamed only in CSS. The glaze is parchment, stone, and mist.",
  },
  zh: {
    chapters: [
      { id: "frontispiece", index: "01", label: "扉页" },
      { id: "manifesto", index: "02", label: "宣言" },
      { id: "rooms", index: "03", label: "两间" },
      { id: "arc", index: "04", label: "来路" },
      { id: "doors", index: "05", label: "门" },
      { id: "catalogue", index: "06", label: "目录" },
      { id: "colophon", index: "07", label: "跋" },
    ],
    place: "工程系博士候选人",
    lede: "同时也是高定时装模特。这个网站是两种实践的目录。",
    lines: ["两间屋子。", "同一种注视。", "电网上的智能体。衣服，以及镜头。"],
    aside: "这不是一份简历。",
    disclose: "全文",
    discloseBody: [
      "我是剑桥大学工程系的博士候选人，学院为圣约翰学院。导师是 Ioannis Lestas 教授与 Ruchi Choudhary 教授，后者亦任职于艾伦·图灵研究所。",
      "研究是强化学习，以及当任务本身在移动时，如何学习「怎样去学」。眼下的线索是多智能体协作：微电网里的储能怎样结成小组，再各自行动。",
      "另一间是时装。母经纪公司是 Lacoco Models。广告与秀场从那扇门进去。我也拍照。",
    ],
    roomKicker: "分界",
    roomTitle: "每间屋子各自保存什么",
    roomBody: [
      "研究保存论文、没有变成论文的失败，以及我希望放在手边的别人的工作。",
      "秀场保存广告与静帧。镜头保存我的照片。两间屋子不必互相模仿。",
    ],
    arcIntro: "三站。其余的不在这里编目。",
    stations: [
      { years: "— 2020", place: "西南交通大学", line: "土木工程，学士。" },
      { years: "— 2024", place: "香港科技大学", line: "人工智能与能源。导师王者教授。" },
      { years: "— 现在", place: "剑桥，圣约翰学院", line: "工程博士。2026 年 1 月注册为博士候选人。" },
    ],
    doorsTitle: "进入",
    researchDoor: "电网、分组，以及尚未发表的笔记。",
    runwayDoor: "广告、衣料，以及留下的静帧。",
    catalogueIntro: "短目录。长文在里面。",
    entries: [
      { href: "/papers", index: "I", title: "论文", dek: "摘要、解说、图版、影像。" },
      { href: "/lab-notes", index: "II", title: "实验笔记", dek: "失败，以及为什么。" },
      { href: "/reading", index: "III", title: "阅读室", dek: "别人的论文。解说、图、声音。" },
      { href: "/lens", index: "IV", title: "镜头", dek: "摄影，包括慈善时装秀。" },
    ],
    colophon:
      "标题用 Court Serif，即 Source Serif 4 的展示光学尺寸；正文 Quad Sans 与标签 Ledger Mono 是 IBM Plex，只在 CSS 里改了名字。釉色是羊皮纸、石与雾。",
  },
} as const;

export function HomeView({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Frame lang={lang} chapters={[...t.chapters]}>
      <section id="frontispiece" className="chapter chapter-short" data-chapter="frontispiece">
        <p className="kicker ledger">{t.chapters[0].index} — {t.chapters[0].label}</p>
        <div className="front">
          <img className="temple" src="/media/temple.svg" alt="" />
          <div className="front-copy">
            <Reveal as="h1" className="display display-xl" text="Haomin LUO" />
            <p className="ledger place">{t.place}</p>
            <p className="lede quiet">{t.lede}</p>
          </div>
          <figure className="plate">
            <div className="plate-stage">
              <img src="/media/cloister.svg" alt={lang === "zh" ? "雾中回廊的釉绘习作" : "Glazed study of a cloister in fog"} />
            </div>
            <figcaption>
              <span className="ledger">{lang === "zh" ? "图版 I" : "Plate I"}</span>
              <span className="quiet">{lang === "zh" ? "低雾中的回廊 · 习作" : "Cloister in low fog · a study"}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <Section id="manifesto" kicker={`${t.chapters[1].index} — ${t.chapters[1].label}`}>
        <div className="stanzas">
          {t.lines.map((line) => (
            <Reveal key={line} as="h2" className="display display-lg" text={line} />
          ))}
        </div>
        <p className="display display-md italic" style={{ marginTop: "2.2rem" }}>
          {t.aside}
        </p>
        <Disclosure label={t.disclose} kicker={lang === "zh" ? "附记" : "Note"}>
          {t.discloseBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Disclosure>
      </Section>

      <Section id="rooms" kicker={`${t.chapters[2].index} — ${t.chapters[2].label}`}>
        <Reveal as="h2" className="display display-md" text={t.roomTitle} />
        <div className="prose" style={{ marginTop: "1.4rem" }}>
          {t.roomBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section id="arc" kicker={`${t.chapters[3].index} — ${t.chapters[3].label}`}>
        <p className="quiet measure">{t.arcIntro}</p>
        <ol className="arc">
          {t.stations.map((station) => (
            <li key={station.place}>
              <span className="ledger">{station.years}</span>
              <h3>{station.place}</h3>
              <p className="quiet">{station.line}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="doors" kicker={`${t.chapters[4].index} — ${t.chapters[4].label}`} short>
        <h2 className="display display-md" style={{ marginBottom: "1.4rem" }}>
          {t.doorsTitle}
        </h2>
        <div className="doors">
          <Door
            href={localize("/research", lang)}
            index={lang === "zh" ? "房间 I" : "Room I"}
            title={lang === "zh" ? "研究" : "Research"}
            text={t.researchDoor}
            image="/media/quad.svg"
            caption={lang === "zh" ? "石庭 · 习作" : "The court · a study"}
          />
          <Door
            href={localize("/runway", lang)}
            index={lang === "zh" ? "房间 II" : "Room II"}
            title={lang === "zh" ? "秀场" : "Runway"}
            text={t.runwayDoor}
            image="/media/drape.svg"
            caption={lang === "zh" ? "衣褶 · 习作" : "A fold of cloth · a study"}
          />
        </div>
      </Section>

      <Section id="catalogue" kicker={`${t.chapters[5].index} — ${t.chapters[5].label}`}>
        <p className="quiet measure">{t.catalogueIntro}</p>
        <ol className="catalogue">
          {t.entries.map((entry) => (
            <li key={entry.href}>
              <Link href={localize(entry.href, lang)}>
                <span className="ledger">{entry.index}</span>
                <span>
                  <span className="cat-title">{entry.title}</span>
                  <span className="quiet dek">{entry.dek}</span>
                </span>
                <span className="ledger meta">{lang === "zh" ? "进入" : "Enter"}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="colophon" kicker={`${t.chapters[6].index} — ${t.chapters[6].label}`} short>
        <p className="quiet measure">{t.colophon}</p>
        <p className="ledger" style={{ marginTop: "2rem" }}>
          <Link href={localize("/contact", lang)}>{lang === "zh" ? "联系" : "Contact"}</Link>
          {"  ·  "}
          <Link href="/studio">Studio</Link>
        </p>
      </Section>
    </Frame>
  );
}
