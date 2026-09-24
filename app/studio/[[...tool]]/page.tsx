import type { Metadata, Viewport } from "next";
import { StudioClient } from "./studio-client";

export const metadata: Metadata = {
  title: "Studio — Haomin LUO",
  referrer: "same-origin",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <StudioClient />;
}
