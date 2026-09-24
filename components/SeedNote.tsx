import type { Lang } from "@/lib/types";

export function SeedNote({ fromSeed, lang }: { fromSeed: boolean; lang: Lang }) {
  if (!fromSeed) return null;
  return (
    <p className="ledger seed-note">
      {lang === "zh"
        ? "以下为占位。在 /studio 发布该栏目后，这里只显示你上传的内容。"
        : "Seeded plates. Publish this collection in /studio and these give way to what you upload."}
    </p>
  );
}
