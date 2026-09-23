"use client";

import { useState } from "react";
import type { Lang } from "@/lib/types";

export function VoiceButton({ text, lang }: { text: string; lang: Lang }) {
  const [speaking, setSpeaking] = useState(false);
  const label = lang === "zh" ? "朗读" : "Read aloud";
  const note = lang === "zh" ? "浏览器合成语音，不是录音" : "Browser voice. Not a recording";

  function toggle() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "zh" ? "zh-CN" : "en-GB";
    utterance.rate = 0.96;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return (
    <div className="voice">
      <button type="button" className="voice-btn" onClick={toggle} aria-pressed={speaking}>
        {speaking ? (lang === "zh" ? "停止" : "Stop") : label}
      </button>
      <p className="ledger">{note}</p>
    </div>
  );
}
