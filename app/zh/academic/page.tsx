import type { Metadata } from "next";
import { AcademicTour } from "@/components/pages/AcademicTour";
import { getPapers } from "@/lib/content";

export const metadata: Metadata = {
  title: "学术",
  description: "黑袍穿过庭院、草坪与回廊，进入放着论文的图书馆。",
};

export default async function Page() {
  const { items } = await getPapers();
  return <AcademicTour lang="zh" papers={items} />;
}
