import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "Haomin LUO",
  description: "One painting: a misty Cambridge court on the left, a photo studio through the arch on the right.",
};

export default function Page() {
  return <HomeView lang="en" />;
}
