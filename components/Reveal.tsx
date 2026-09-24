"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function tokenize(text: string) {
  if (/[\u3400-\u9fff]/.test(text)) {
    return Array.from(text).filter((ch) => ch.trim().length > 0);
  }
  return text.split(/\s+/).filter(Boolean);
}

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
};

export function Reveal({ text, className, as = "p" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll<HTMLElement>(".word-inner");
    const tween = gsap.fromTo(
      words,
      { yPercent: 110, opacity: 0.15, filter: "blur(7px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: /[\u3400-\u9fff]/.test(text) ? 0.018 : 0.045,
        scrollTrigger: { trigger: el, start: "top 86%" },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  const nodes = tokenize(text).map((part, index) => (
    <span className="mask" key={`${part}-${index}`}>
      <span className="word-inner">{part}</span>
    </span>
  ));
  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  if (as === "h1")
    return (
      <h1 ref={setRef} className={className}>
        {nodes}
      </h1>
    );
  if (as === "h2")
    return (
      <h2 ref={setRef} className={className}>
        {nodes}
      </h2>
    );
  return (
    <p ref={setRef} className={className}>
      {nodes}
    </p>
  );
}
