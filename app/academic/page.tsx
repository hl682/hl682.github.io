import type { Metadata } from "next";
import { AcademicTour } from "@/components/pages/AcademicTour";
import { getPapers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Academic",
  description: "A painted walk in a black Cambridge gown, from the court to the library of papers.",
};

export default async function Page() {
  const { items } = await getPapers();
  return <AcademicTour lang="en" papers={items} />;
}
