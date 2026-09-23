import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "Haomin LUO",
  description: "Two rooms: reinforcement learning, and the runway. A scroll catalogue.",
};

export default function Page() {
  return <HomeView lang="en" />;
}
