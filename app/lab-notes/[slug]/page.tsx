import type { Metadata } from "next";
import { NoteView } from "@/components/pages/NoteView";
import { getNote, getNotes } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const { items } = await getNotes();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { item } = await getNote(slug);
  return { title: item?.title ?? "Lab note" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NoteView lang="en" slug={slug} />;
}
