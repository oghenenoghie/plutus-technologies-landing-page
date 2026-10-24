/**
 * Country catalogue, mirroring plutus-hr-system `app/compliance/multicountry.py` (October 2026).
 * Only Nigeria has approved, effective-dated rules. The other countries are catalogued and refused
 * by the engine until their rules are sourced from the tax authority, reviewed and approved.
 */
export type Readiness = "Active" | "Setup required";

export type Country = {
  code: string;
  name: string;
  currency: string;
  authority: string;
  readiness: Readiness;
  /** Target date from the product roadmap, where one has been set. */
  planned?: string;
};

export const TAX_MODULES = ["VAT", "Withholding tax", "Corporate tax", "Employment tax"] as const;

export const COUNTRIES: Country[] = [
  { code: "NG", name: "Nigeria", currency: "NGN", authority: "Nigeria Revenue Service and the state tax authorities", readiness: "Active" },
  { code: "GH", name: "Ghana", currency: "GHS", authority: "Ghana Revenue Authority", readiness: "Setup required", planned: "Q1 2027" },
  { code: "KE", name: "Kenya", currency: "KES", authority: "Kenya Revenue Authority", readiness: "Setup required", planned: "Q3 2027" },
  { code: "RW", name: "Rwanda", currency: "RWF", authority: "Rwanda Revenue Authority", readiness: "Setup required" },
  { code: "GM", name: "The Gambia", currency: "GMD", authority: "Gambia Revenue Authority", readiness: "Setup required" },
  { code: "CI", name: "Côte d'Ivoire", currency: "XOF", authority: "Direction Générale des Impôts", readiness: "Setup required" },
];
