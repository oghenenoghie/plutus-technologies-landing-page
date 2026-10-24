import { PageIntro } from "@/components/page-intro";
import { Contact } from "@/components/sections/contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Contact",
    description: "Book a demo of Plutus, or talk to our Lagos and United Kingdom offices about Cloud and Desktop licensing.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Contact" title="Talk to Plutus Technologies.">
        Book a demo, ask about licensing, or get help choosing between Cloud and Desktop.
      </PageIntro>
      <Contact />
    </main>
  );
}
