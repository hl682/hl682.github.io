import { Disclosure } from "@/components/Disclosure";
import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { Section } from "@/components/Section";
import { localize } from "@/lib/paths";
import type { Lang } from "@/lib/types";
import Link from "next/link";

const copy = {
  en: {
    chapters: [
      { id: "direction", index: "01", label: "Direction" },
      { id: "method", index: "02", label: "Method" },
      { id: "arc", index: "03", label: "Arc" },
      { id: "held", index: "04", label: "Held here" },
    ],
    title: "Research",
    dek: "Reinforcement learning, meta-learning, and the street-level grid.",
    direction: [
      "The direction is reinforcement learning for systems that must share a constraint: a feeder, a tariff, a peak. Multi-agent learning is the present instrument. Meta-learning is the longer one — a way of learning that can move when the prices, the weather, or the task itself moves.",
      "Earlier work used learning as a model-free controller for demand response: microgrids, storage, rooftop solar. The interest now leans toward decisions where energy and price meet. The pages here will carry that work as it becomes sayable. They will not carry a dossier.",
    ],
    methodTitle: "Grouping, then acting apart",
    method: [
      "Centralized training sees too much and scales poorly. Fully decentralized agents treat one another as weather. HTDE-MADDPG, the paper in progress from the first-year report, sits between them: agents form clusters with a graph attention network, sample the group with a Gumbel-Sigmoid, and execute without a permanent centre.",
      "The reward is local cost against a time-of-use price, a share of the district peak, and a penalty on needless ramping. The comparison is no control, the two MADDPG training regimes, and a model-predictive bound, on CityLearn.",
    ],
    arcTitle: "Education, as an arc",
    stations: [
      ["Southwest Jiaotong University", "B.Eng., civil engineering, 2020."],
      ["Hong Kong University of Science and Technology", "MSc, AI and energy, Department of Mechanical and Aerospace Engineering, 2024. Supervisor: Prof. Zhe (Walter) Wang."],
      ["University of Cambridge, St John's College", "PhD, Department of Engineering. Supervisors: Prof. Ioannis Lestas and Prof. Ruchi Choudhary (Alan Turing Institute). PhD candidate, January 2026."],
    ],
    heldTitle: "What this room refuses",
    held: "Grades, a ledger of internships, and the private weather of a life are not part of the catalogue. The scientific claims that are ready sit under Papers. The ones that failed sit under Lab notes, once they are mine to post.",
  },
  zh: {
    chapters: [
      { id: "direction", index: "01", label: "方向" },
      { id: "method", index: "02", label: "方法" },
      { id: "arc", index: "03", label: "来路" },
      { id: "held", index: "04", label: "存放" },
    ],
    title: "研究",
    dek: "强化学习、元学习，以及街道尺度的电网。",
    direction: [
      "方向是强化学习：让必须共享一条约束的系统学会行动。约束可以是一条馈线、一种电价、一次峰值。多智能体是眼下的工具。元学习是更长的那一个——当电价、天气或任务本身移动时，学习的方式也能跟着移动。",
      "更早的工作把学习当作需求响应的无模型控制：微电网、储能、屋顶光伏。现在的兴趣偏向能源与价格相遇的决策。能说清楚的工作会放在这里。档案不会。",
    ],
    methodTitle: "先分组，再各自行动",
    method: [
      "集中训练看见得太多，也难以扩展。完全分散的智能体把彼此当成天气。一年级报告中的 HTDE-MADDPG 站在两者之间：用图注意力结成小组，用 Gumbel-Sigmoid 采样分组，执行时不再依赖一个永久的中心。",
      "奖励看分时电价下的本地成本、对街区峰值的分担，以及对无谓爬坡的惩罚。对照是无控制、两种 MADDPG 训练体制，以及模型预测的边界，场景在 CityLearn。",
    ],
    arcTitle: "教育，只作为一条弧",
    stations: [
      ["西南交通大学", "土木工程学士，2020。"],
      ["香港科技大学", "人工智能与能源硕士，机械与航空航天工程系，2024。导师王者教授。"],
      ["剑桥大学圣约翰学院", "工程系博士。导师 Ioannis Lestas 教授与 Ruchi Choudhary 教授（艾伦·图灵研究所）。2026 年 1 月注册为博士候选人。"],
    ],
    heldTitle: "这间屋子不收录的",
    held: "成绩、一长串实习，以及生活里的私事，都不进入目录。准备好的科学陈述在「论文」。失败的在「实验笔记」，等它们确实是我可以公布的笔记。",
  },
} as const;

export function ResearchView({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <Frame lang={lang} chapters={[...t.chapters]}>
      <header className="page-head" id="direction">
        <p className="kicker ledger">{t.chapters[0].index} — {t.chapters[0].label}</p>
        <h1 className="display display-xl">{t.title}</h1>
        <p className="quiet" style={{ marginTop: "1rem" }}>{t.dek}</p>
      </header>
      <div className="prose" style={{ marginTop: "2rem" }}>
        {t.direction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Plate
        src="/media/quad.svg"
        wide
        kicker={lang === "zh" ? "图版 · 方向" : "Plate · direction"}
        caption={lang === "zh" ? "庭院没入雾中。研究页的釉绘，不是数据图。" : "A court sinking into mist. A glaze for this page, not a chart."}
      />

      <Section id="method" kicker={`${t.chapters[1].index} — ${t.chapters[1].label}`}>
        <h2 className="display display-md">{t.methodTitle}</h2>
        <div className="prose" style={{ marginTop: "1.2rem" }}>
          {t.method.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="ledger" style={{ marginTop: "1.4rem" }}>
          <Link href={localize("/papers/htde-maddpg", lang)}>{lang === "zh" ? "阅读论文" : "Read the paper"}</Link>
        </p>
        <Disclosure label={lang === "zh" ? "全文" : "Full disclosure"} kicker={lang === "zh" ? "范围" : "Scope"}>
          <p>
            {lang === "zh"
              ? "元学习写在方向里，不写在成果里。本站不会把兴趣说成已经完成的论文。"
              : "Meta-learning is named as a direction, not as a finished paper. This site will not promote an interest into a result."}
          </p>
        </Disclosure>
      </Section>

      <Section id="arc" kicker={`${t.chapters[2].index} — ${t.chapters[2].label}`}>
        <h2 className="display display-md">{t.arcTitle}</h2>
        <ol className="arc">
          {t.stations.map(([place, line]) => (
            <li key={place}>
              <h3>{place}</h3>
              <p className="quiet">{line}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="held" kicker={`${t.chapters[3].index} — ${t.chapters[3].label}`} short>
        <h2 className="display display-md">{t.heldTitle}</h2>
        <p className="quiet measure" style={{ marginTop: "1rem" }}>{t.held}</p>
      </Section>
    </Frame>
  );
}
