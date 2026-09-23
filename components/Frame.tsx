import { Rail } from "./Rail";
import type { Chapter, Lang } from "@/lib/types";

type Props = {
  lang: Lang;
  chapters: Chapter[];
  children: React.ReactNode;
};

export function Frame({ lang, chapters, children }: Props) {
  return (
    <div className="frame">
      <Rail lang={lang} chapters={chapters} />
      <main id="content" className="main">
        {children}
      </main>
    </div>
  );
}
