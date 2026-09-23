import Link from "next/link";
import { Frame } from "@/components/Frame";

export default function NotFound() {
  return (
    <Frame lang="en" chapters={[{ id: "missing", index: "00", label: "Missing" }]}>
      <header className="page-head" id="missing">
        <p className="kicker ledger">00 — Missing</p>
        <h1 className="display display-lg">This plate is not in the catalogue.</h1>
        <p className="quiet" style={{ marginTop: "1.2rem" }}>
          <Link href="/">Return to the index</Link>
          {" · "}
          <Link href="/zh">中文</Link>
        </p>
      </header>
    </Frame>
  );
}
