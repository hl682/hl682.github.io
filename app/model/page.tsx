import type { Metadata } from "next";
import { ModelStudio } from "@/components/pages/ModelStudio";
import { getModelCard, getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Model",
  description: "A painted photo studio: poses, flash, a comp card, and measurements left blank until they are known.",
};

export default async function Page() {
  const [card, videos] = await Promise.all([getModelCard(), getVideos()]);
  const reels = videos.items.filter((video) => video.kind === "runway" || video.kind === "model");
  return <ModelStudio lang="en" card={card.item} fromSeed={card.fromSeed} videos={reels.length ? reels : videos.items} />;
}
