import { PageIntro } from "@/components/page-intro";
import { DesktopDetails } from "@/components/sections/desktop-details";
import { Editions } from "@/components/sections/editions";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Cloud & Desktop",
    description:
      "Run Plutus in the browser or fully offline on your own machine. Desktop installers for Windows, macOS and Linux.",
    path: "/editions",
  });
}

export default function EditionsPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Cloud & Desktop" title="Online, or entirely on your own machine.">
        Both editions run the same ledger, tax engine and rule set. Choose by where your financial data needs to live and
        how your office connects.
      </PageIntro>
      <Editions />
      <DesktopDetails />
    </main>
  );
}
