import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Catalogue")
    .items([
      S.listItem().title("Papers").child(S.documentTypeList("paper").title("Papers")),
      S.listItem().title("Lab notes").child(S.documentTypeList("labNote").title("Lab notes")),
      S.listItem().title("Reading room").child(S.documentTypeList("readingPiece").title("Reading room")),
      S.listItem().title("Runway").child(S.documentTypeList("runwayMedia").title("Runway")),
      S.listItem().title("Lens").child(S.documentTypeList("lensPhoto").title("Lens")),
      S.listItem().title("Videos").child(S.documentTypeList("videoPiece").title("Videos")),
      S.listItem().title("Comp card").child(S.documentTypeList("modelCard").title("Comp card")),
    ]);
