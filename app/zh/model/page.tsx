import type { Metadata } from "next";
import { ModelStudio } from "@/components/pages/ModelStudio";
import { getModelCard, getVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "模特",
  description: "油画影棚：姿势、闪光、模卡。未知的尺寸保持空白。",
};

export default async function Page() {
  const [card, videos] = await Promise.all([getModelCard(), getVideos()]);
  const reels = videos.items.filter((video) => video.kind === "runway" || video.kind === "model");
  return <ModelStudio lang="zh" card={card.item} fromSeed={card.fromSeed} videos={reels.length ? reels : videos.items} />;
}
