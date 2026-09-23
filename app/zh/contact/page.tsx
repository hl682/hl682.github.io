import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";

export const metadata: Metadata = { title: "联系" };

export default function Page() {
  return <ContactView lang="zh" />;
}
