"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const studio = pathname.startsWith("/studio");
    document.body.classList.toggle("site-on", !studio);
    document.documentElement.lang = pathname.startsWith("/zh") ? "zh-Hans" : "en";
    if (studio) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [pathname]);

  return null;
}
