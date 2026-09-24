import type { Metadata } from "next";
import { ReadingPieceView } from "@/components/pages/ReadingPieceView";
import { getReading, getReadingPiece } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  const { items } = await getReading();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { item } = await getReadingPiece(slug);
  return { title: item?.title ?? "Reading" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ReadingPieceView lang="en" slug={slug} />;
}
