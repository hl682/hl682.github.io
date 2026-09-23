import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "罗昊旻",
  description: "两间屋子：强化学习，以及秀场。一份可滚动的目录。",
};

export default function Page() {
  return <HomeView lang="zh" />;
}
