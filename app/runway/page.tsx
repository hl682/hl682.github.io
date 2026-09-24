import type { Metadata } from "next";
import { RunwayView } from "@/components/pages/RunwayView";
import { getRunway, getVideos } from "@/lib/content";

export const metadata: Metadata = { title: "Runway" };
export const revalidate = 60;

export default async function Page() {
  const [runway, videos] = await Promise.all([getRunway(), getVideos()]);
  return <RunwayView lang="en" items={runway.items} videos={videos.items} fromSeed={runway.fromSeed} />;
}
