import { PageIntro } from "@/components/page-intro";
import { CountryCatalogue, CountryRules } from "@/components/sections/countries";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Country compliance",
    description:
      "Plutus is live in Nigeria. Ghana, Kenya, Rwanda, The Gambia and Côte d'Ivoire are catalogued and go live as their tax rules are sourced and approved.",
    path: "/countries",
  });
}

export default function CountriesPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Country compliance" isNew title="Nigeria today. More countries as their rules are approved.">
        Plutus keeps a catalogue of the jurisdictions it supports, each with its currency, tax authority and readiness.
        Nigeria is live; five more are catalogued and are not yet available.
      </PageIntro>
      <CountryCatalogue />
      <CountryRules />
    </main>
  );
}
