import type { Metadata } from "next";
import { NotesView } from "@/components/pages/NotesView";
import { getNotes } from "@/lib/content";

export const metadata: Metadata = { title: "实验笔记" };
export const revalidate = 60;

export default async function Page() {
  const { items, fromSeed } = await getNotes();
  return <NotesView lang="zh" items={items} fromSeed={fromSeed} />;
}
