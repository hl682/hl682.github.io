import type { Metadata } from "next";
import { ReadingView } from "@/components/pages/ReadingView";
import { getReading } from "@/lib/content";

export const metadata: Metadata = { title: "Reading room" };
export const revalidate = 60;

export default async function Page() {
  const { items, fromSeed } = await getReading();
  return <ReadingView lang="en" items={items} fromSeed={fromSeed} />;
}
