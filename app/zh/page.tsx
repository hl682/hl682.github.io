import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "罗昊旻",
  description: "同一幅剑桥学院油画，左右两种笔法。左边走进学术，右边走进影棚。",
};

export default function Page() {
  return <HomeView lang="zh" />;
}
