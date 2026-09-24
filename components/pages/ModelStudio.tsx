"use client";

import { useState } from "react";
import Link from "next/link";
import { SeedNote } from "@/components/SeedNote";
import { VideoSlot } from "@/components/VideoSlot";
import { localize } from "@/lib/paths";
import type { Lang, ModelCard, VideoPiece } from "@/lib/types";

const poseNames = {
  en: ["Standing", "Seated", "Turn"],
  zh: ["站立", "坐", "回身"],
};

function shown(value: string, lang: Lang) {
  const trimmed = value.trim();
  if (!trimmed) return lang === "zh" ? "未建档" : "Not on file";
  return trimmed;
}

export function ModelStudio({
  lang,
  card,
  fromSeed,
  videos,
}: {
  lang: Lang;
  card: ModelCard;
  fromSeed: boolean;
  videos: VideoPiece[];
}) {
  const stills = card.stills.length ? card.stills : ["/paint/pose-stand.png"];
  const [pose, setPose] = useState(0);
  const [flash, setFlash] = useState(false);
  const name = poseNames[lang][pose % poseNames[lang].length] ?? `${pose + 1}`;

  function nextPose() {
    setFlash(true);
    window.setTimeout(() => {
      setPose((current) => (current + 1) % stills.length);
      window.setTimeout(() => setFlash(false), 420);
    }, 90);
  }

  return (
    <div className="atelier" id="content">
      <section className="set" data-pose={pose} data-flash={flash ? "on" : "off"}>
        <img src={stills[pose]} alt={lang === "zh" ? `影棚姿势：${name}` : `Studio pose: ${name}`} />
        <div className={`strobe ${flash ? "on" : ""}`} aria-hidden="true" />
        <div className="softbox softbox-l" aria-hidden="true" />
        <div className="softbox softbox-r" aria-hidden="true" />
        <header className="tour-bar set-bar">
          <Link href={localize("/", lang)} className="ledger">
            {lang === "zh" ? "← 两扇门" : "← Both doors"}
          </Link>
          <p className="ledger tour-name">Haomin LUO</p>
          <Link href={localize("/academic", lang)} className="ledger">
            {lang === "zh" ? "学术 →" : "Academic →"}
          </Link>
        </header>
        <div className="set-card">
          <p className="ledger">
            {lang === "zh" ? "影棚" : "Studio"} · {String(pose + 1).padStart(2, "0")} / {String(stills.length).padStart(2, "0")} · {name}
          </p>
          <h1 className="display">{lang === "zh" ? "下一姿势" : "The next pose"}</h1>
          <p>
            {lang === "zh"
              ? "黑色套装，暖灰无缝背景。按钮会换一个姿势，闪光灯亮一下。"
              : "A black suit, a warm grey seamless. The button changes the pose and pops the flash."}
          </p>
          <button type="button" className="pose-next" onClick={nextPose}>
            {lang === "zh" ? "换姿势" : "New pose"}
          </button>
        </div>
      </section>

      <section className="comp" id="card">
        <header className="comp-head">
          <p className="ledger">{card.agency}</p>
          <h2 className="display">{card.name}</h2>
          <p className="ledger">{card.city}</p>
          <SeedNote fromSeed={fromSeed} lang={lang} />
        </header>
        <ul className="comp-grid">
          {stills.map((src, index) => (
            <li key={src}>
              <img src={src} alt="" />
              <span className="ledger">{poseNames[lang][index] ?? String(index + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
        <div className="comp-stats">
          <div>
            <p className="ledger">{lang === "zh" ? "尺寸" : "Measurements"}</p>
            <p className="comp-note">{card.note}</p>
            <table>
              <tbody>
                {card.measurements.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td data-empty={row.value.trim() ? "false" : "true"}>{shown(row.value, lang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="ledger">{lang === "zh" ? "预约" : "Booking"}</p>
            <p>
              <a href={`mailto:${card.email}`}>{card.email}</a>
            </p>
            <p className="comp-note">
              {lang === "zh"
                ? "母经纪公司 Lacoco Models。合作请写信给经纪人，不要把尺寸空白当成数字。"
                : "Mother agency: Lacoco Models. Write to the agent. A blank measurement is not a number."}
            </p>
            <p className="ledger" style={{ marginTop: "1.5rem" }}>
              {lang === "zh" ? "影像" : "Reels"}
            </p>
            {videos.length ? (
              videos.map((video) => (
                <VideoSlot key={video.slug} url={video.url} title={video.title} caption={video.caption} empty="" />
              ))
            ) : (
              <VideoSlot
                title={lang === "zh" ? "影像槽" : "Reel slot"}
                empty={lang === "zh" ? "在 Studio 的 Video 里贴上成片链接" : "Add a film URL under Video in Studio"}
                caption={lang === "zh" ? "占位，不是一条已有的片。" : "A slot, not an existing film."}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
