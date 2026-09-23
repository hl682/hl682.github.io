import type { Metadata } from "next";
import { PapersView } from "@/components/pages/PapersView";
import { getPapers } from "@/lib/content";

export const metadata: Metadata = { title: "论文" };
export const revalidate = 60;

export default async function Page() {
  const { items, fromSeed } = await getPapers();
  return <PapersView lang="zh" items={items} fromSeed={fromSeed} />;
}
