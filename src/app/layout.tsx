import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, IBM_Plex_Mono, Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { IconSprite } from "@/components/icons";
import { SITE } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["600"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-nunito" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFCFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0D0F" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-NG"
      className={`${cinzel.variable} ${cormorant.variable} ${nunito.variable} ${plexMono.variable}`}
    >
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
