import type { Metadata } from "next";
import { PaperView } from "@/components/pages/PaperView";
import { getPaper, getPapers } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const { items } = await getPapers();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { item } = await getPaper(slug);
  return { title: item?.title ?? "Paper" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PaperView lang="en" slug={slug} />;
}
