import type { Metadata } from "next";
import { ReadingView } from "@/components/pages/ReadingView";
import { getReading } from "@/lib/content";

export const metadata: Metadata = { title: "阅读室" };
export const revalidate = 60;

export default async function Page() {
  const { items, fromSeed } = await getReading();
  return <ReadingView lang="zh" items={items} fromSeed={fromSeed} />;
}
