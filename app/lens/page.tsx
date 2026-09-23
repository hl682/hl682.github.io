import type { Metadata } from "next";
import { LensView } from "@/components/pages/LensView";
import { getLens } from "@/lib/content";

export const metadata: Metadata = { title: "Lens" };
export const revalidate = 60;

export default async function Page() {
  const { items, fromSeed } = await getLens();
  return <LensView lang="en" items={items} fromSeed={fromSeed} />;
}
