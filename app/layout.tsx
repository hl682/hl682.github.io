import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./styles/haomin-fonts.css";
import "./globals.css";
import "./styles/journey.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haominluo.com"),
  title: {
    default: "Haomin LUO",
    template: "%s — Haomin LUO",
  },
  description:
    "PhD candidate in engineering at Cambridge, and a high-fashion model. A painted court that opens onto a library and a studio.",
  authors: [{ name: "Haomin LUO" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="site-on">
        <a className="skip" href="#content">
          Skip
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
