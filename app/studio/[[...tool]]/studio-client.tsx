"use client";

import dynamic from "next/dynamic";

const StudioApp = dynamic(() => import("./studio-app"), {
  ssr: false,
  loading: () => <p style={{ fontFamily: "sans-serif", padding: "2rem" }}>Opening the studio…</p>,
});

export function StudioClient() {
  return <StudioApp />;
}
