import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "罗昊旻",
  description: "一幅画：左边是晨雾中的学院与黑袍，石拱门后是影棚与套装。",
};

export default function Page() {
  return <HomeView lang="zh" />;
}
