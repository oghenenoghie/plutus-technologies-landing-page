const DESKTOP_RELEASE = "https://github.com/oghenenoghie/desktop_plutus_hr-frontend/releases/latest/download";

/**
 * Sign-in page of the Plutus Cloud web app (plutus-hr-system-frontend). It has no public deployment
 * yet, so the Cloud buttons send visitors to the demo request instead. Set this to the app's
 * sign-in URL once it is live, and the buttons go back to "Open Plutus Cloud".
 */
export const CLOUD_APP_URL: string | null = null;

/** Label for the Cloud buttons, matching where LINKS.cloud goes. */
export const CLOUD_CTA = CLOUD_APP_URL ? "Open Plutus Cloud" : "Request Cloud access";

/**
 * cloud: the Cloud app's sign-in page, or the contact page until it is deployed.
 * download: the Cloud & Desktop page, where visitors pick an installer for their OS.
 * desktop: installers attached to the latest public GitHub release of desktop_plutus_hr-frontend.
 * `releases/latest/download/<name>` always resolves to the newest release, so new builds need no
 * change here as long as the file names (electron-builder.yml `artifactName`) stay the same.
 */
/**
 * On since desktop_plutus_hr-frontend published its first release (desktop-v0.1.0-build.18) with the
 * installers below. Set to false to grey out the Windows/macOS/Linux buttons if the release is pulled.
 */
export const DESKTOP_DOWNLOADS_ENABLED = true;

export const LINKS = {
  cloud: CLOUD_APP_URL ?? "/contact",
  download: "/editions",
  contact: "/contact",
  desktop: {
    windows: `${DESKTOP_RELEASE}/Plutus-Technologies-Setup.exe`,
    mac: `${DESKTOP_RELEASE}/Plutus-Technologies-mac.dmg`,
    linux: `${DESKTOP_RELEASE}/Plutus-Technologies-linux.AppImage`,
  },
} as const;

export const SITE = {
  name: "Plutus Technologies",
  url: "https://www.plutusng.com",
  description:
    "The compliance-native accounting platform for Nigeria and Africa. Double-entry books with VAT, withholding tax, company income tax and the development levy from a versioned rule set, in Cloud and Desktop editions.",
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

/** One page per product area. Drives the home page cards, the footer and the sitemap. */
export const FEATURE_PAGES = [
  {
    href: "/accounting",
    title: "Accounting & tax",
    blurb: "Double-entry books with VAT, WHT, company income tax and the development levy calculated as entries post.",
    points: ["General ledger and chart of accounts", "Vendor bills and customer invoices", "VAT and WHT returns with schedules"],
  },
  {
    href: "/inventory",
    title: "Inventory",
    blurb: "Purchase orders to stocktakes, with every stock movement posted to the ledger at weighted-average cost.",
    points: ["Goods receipts against orders", "Lots, expiry and reorder suggestions", "Stock value reconciled to the GL"],
  },
  {
    href: "/analytics",
    title: "Analytics & Insights",
    isNew: true,
    blurb: "Ten dashboards computed on the server from payroll, HR, attendance and ledger records.",
    points: ["Executive overview and nine section views", "Every figure with its definition", "Drill down and export to CSV, XLSX or PDF"],
  },
  {
    href: "/payroll",
    title: "Payroll & HR",
    blurb: "Pay runs, statutory deductions and the people records payroll depends on, in the same system as the books.",
    points: ["PAYE, pension, NHF, NSITF and ITF", "Final settlement and simulation", "Leave, attendance and self-service"],
  },
  {
    href: "/countries",
    title: "Country compliance",
    isNew: true,
    blurb: "A catalogue of supported jurisdictions, each with its currency, tax authority and readiness.",
    points: ["Nigeria active", "Five more countries catalogued", "No rate used until it is sourced and approved"],
  },
  {
    href: "/editions",
    title: "Cloud & Desktop",
    blurb: "Run Plutus in the browser or fully offline on your own machine, on the same rule set.",
    points: ["Windows, macOS and Linux installers", "Updates install over the previous version", "Data stays on your machine"],
  },
] as const;

export const NAV = [
  { href: "/features", label: "Features" },
  { href: "/accounting", label: "Accounting" },
  { href: "/inventory", label: "Inventory" },
  { href: "/analytics", label: "Analytics" },
  { href: "/payroll", label: "Payroll & HR" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;
