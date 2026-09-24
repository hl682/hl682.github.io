import type { Metadata } from "next";
import { ResearchView } from "@/components/pages/ResearchView";

export const metadata: Metadata = { title: "研究" };

export default function Page() {
  return <ResearchView lang="zh" />;
}
