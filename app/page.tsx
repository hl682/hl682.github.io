import type { Metadata } from "next";
import { HomeView } from "@/components/pages/HomeView";

export const metadata: Metadata = {
  title: "Haomin LUO",
  description: "One painted Cambridge court, split. Left is the academic walk. Right is the studio.",
};

export default function Page() {
  return <HomeView lang="en" />;
}
