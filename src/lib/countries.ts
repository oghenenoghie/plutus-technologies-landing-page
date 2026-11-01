/**
 * Country catalogue, mirroring plutus-hr-system `app/compliance/multicountry.py` and
 * `docs/countries/README.md` (31 October 2026).
 *
 * Payroll is active in all six. Nigeria runs on its own rule versions (NG-2026.1). The other five
 * run on the country rule engine, on rule sets Plutus Technologies approved on 27 October 2026 from
 * published sources, without a local tax adviser's review; each organisation enters the figures the
 * sources didn't settle under Tax Settings. Their VAT, withholding tax and corporate tax aren't
 * approved, and the engine refuses them.
 */
export type Country = {
  code: string;
  name: string;
  currency: string;
  authority: string;
  /** The payroll rule sets in force, and from when where it isn't the whole of 2026. */
  payroll: string;
  /** Business taxes the app calculates for this country, if any. */
  businessTax: { approved: boolean; label: string };
};

export const COUNTRIES: Country[] = [
  {
    code: "NG",
    name: "Nigeria",
    currency: "NGN",
    authority: "Nigeria Revenue Service and the state tax authorities",
    payroll: "NG-2026.1",
    businessTax: { approved: true, label: "Withholding tax on NG-2026.1" },
  },
  {
    code: "GH",
    name: "Ghana",
    currency: "GHS",
    authority: "Ghana Revenue Authority",
    payroll: "GH-2026.2, from 1 September 2026",
    businessTax: { approved: false, label: "Not approved yet" },
  },
  {
    code: "KE",
    name: "Kenya",
    currency: "KES",
    authority: "Kenya Revenue Authority",
    payroll: "KE-2026.1, from 1 February 2026",
    businessTax: { approved: false, label: "Not approved yet" },
  },
  {
    code: "RW",
    name: "Rwanda",
    currency: "RWF",
    authority: "Rwanda Revenue Authority",
    payroll: "RW-2026.1, and RW-2027.1 from 1 January 2027",
    businessTax: { approved: false, label: "Not approved yet" },
  },
  {
    code: "GM",
    name: "The Gambia",
    currency: "GMD",
    authority: "Gambia Revenue Authority",
    payroll: "GM-2026.1",
    businessTax: { approved: false, label: "Not approved yet" },
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    currency: "XOF",
    authority: "Direction Générale des Impôts",
    payroll: "CI-2026.1",
    businessTax: { approved: false, label: "Not approved yet" },
  },
];
