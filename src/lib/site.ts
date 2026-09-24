/**
 * cloud: sign-in page of the Vercel production deployment (project `hr-payroll-wagebook`).
 * download: latest GitHub release of the Electron desktop build (desktop_plutus_hr-frontend).
 */
export const LINKS = {
  cloud: "https://hr-payroll-wagebook.vercel.app/login",
  download: "https://github.com/oghenenoghie/desktop_plutus_hr-frontend/releases/latest",
} as const;

export const SITE = {
  name: "Plutus Technologies",
  url: "https://www.plutusng.com",
  description:
    "The compliance-native HR and payroll platform for Nigeria and Africa. PAYE, pension, NHF, NHIS, NSITF, ITF and WHT from a versioned rule set, in Cloud and Desktop editions.",
} as const;

export const CONTACT = {
  email: "info@plutusng.com",
  phones: [
    { label: "Nigeria", display: "+234 708 750 1831", value: "+2347087501831" },
    { label: "Nigeria", display: "+234 707 837 1617", value: "+2347078371617" },
    { label: "United Kingdom", display: "+44 749 474 6783", value: "+447494746783" },
  ],
  web: { display: "www.plutusng.com", value: "https://www.plutusng.com" },
  offices: [
    {
      name: "Lagos",
      lines: ["Suite 2, Plot 925, 13th Road,", "6th Avenue, Festac Town,", "Lagos State, Nigeria"],
    },
    {
      name: "United Kingdom",
      lines: ["15 Tarmar Green, Grove Hill,", "Hemel Hempstead, Herts,", "United Kingdom HP2 6EP"],
    },
  ],
} as const;

export const NAV = [
  { href: "#product", label: "Product" },
  { href: "#compliance", label: "Compliance" },
  { href: "#editions", label: "Cloud & Desktop" },
  { href: "#roles", label: "Who it's for" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;
