import { PageIntro } from "@/components/page-intro";
import { CountryCatalogue, CountryRules } from "@/components/sections/countries";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Country compliance",
    description:
      "Plutus runs payroll in Nigeria, Ghana, Kenya, Rwanda, The Gambia and Côte d'Ivoire, each on dated rules in its own currency, with the figures the sources leave open entered by each company.",
    path: "/countries",
  });
}

export default function CountriesPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Country compliance" isNew title="Payroll in six countries.">
        Nigeria runs on its own rule versions. Ghana, Kenya, Rwanda, The Gambia and Côte d&apos;Ivoire run on rule sets
        built from published sources, and each company enters the few figures those sources leave open. VAT and
        withholding tax for those five aren&apos;t approved yet.
      </PageIntro>
      <CountryCatalogue />
      <CountryRules />
    </main>
  );
}
