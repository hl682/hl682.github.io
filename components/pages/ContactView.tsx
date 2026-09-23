import { Frame } from "@/components/Frame";
import { Plate } from "@/components/Plate";
import { Section } from "@/components/Section";
import type { Lang } from "@/lib/types";

export function ContactView({ lang }: { lang: Lang }) {
  const chapters = [
    { id: "college", index: "01", label: lang === "zh" ? "学院" : "College" },
    { id: "agency", index: "02", label: lang === "zh" ? "经纪" : "Agency" },
    { id: "elsewhere", index: "03", label: lang === "zh" ? "别处" : "Elsewhere" },
  ];
  return (
    <Frame lang={lang} chapters={chapters}>
      <header className="page-head" id="college">
        <p className="kicker ledger">01 — {chapters[0].label}</p>
        <h1 className="display display-xl">{lang === "zh" ? "联系" : "Contact"}</h1>
        <p className="quiet" style={{ marginTop: "1rem" }}>
          {lang === "zh" ? "两处地址。都请写得明白。" : "Two addresses. Write plainly to either."}
        </p>
        <div style={{ maxWidth: "16rem", marginTop: "1.6rem" }}>
          <Plate
            src="/media/portrait.jpg"
            alt={lang === "zh" ? "罗昊旻肖像" : "Portrait of Haomin LUO"}
            kicker={lang === "zh" ? "肖像" : "Portrait"}
            caption={lang === "zh" ? "釉色压低后的肖像。" : "The portrait, under a low varnish."}
          />
        </div>
      </header>
      <div className="contact-grid">
        <div>
          <p className="ledger">{lang === "zh" ? "学术" : "Academic"}</p>
          <a className="display display-md mail" href="mailto:hl682@cam.ac.uk">
            hl682@cam.ac.uk
          </a>
          <p className="quiet">
            {lang === "zh"
              ? "剑桥大学工程系，圣约翰学院。"
              : "Department of Engineering, University of Cambridge. St John's College."}
          </p>
        </div>
        <div id="agency">
          <p className="ledger">{lang === "zh" ? "经纪 · Lacoco Models" : "Agency · Lacoco Models"}</p>
          <a className="display display-md mail" href="mailto:Vico.wu@lacocomodels.com">
            Vico.wu@lacocomodels.com
          </a>
          <p className="quiet">
            {lang === "zh" ? "时装合作请联系经纪人。" : "Fashion collaborations go through the agent."}
          </p>
        </div>
      </div>
      <Section id="elsewhere" kicker={`03 — ${chapters[2].label}`} short>
        <ul className="arc">
          <li>
            <a href="https://www.instagram.com/haomin_1896/">Instagram · haomin_1896</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/haomin-luo-40856714b/">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.xiaohongshu.com/user/profile/601108b20000000001003c94">
              {lang === "zh" ? "小红书" : "Xiaohongshu"}
            </a>
          </li>
          <li>
            <a href="https://models.com/agency/lacoco-model-management/">Lacoco Models</a>
          </li>
        </ul>
      </Section>
    </Frame>
  );
}
