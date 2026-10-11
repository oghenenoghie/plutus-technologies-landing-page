/**
 * Nigeria statutory rule set NG-2026.1.
 *
 * Source: Plutus statutory reference (nigeria-statutory-compliance.md), Nigeria Tax Act 2025,
 * effective 1 January 2026. Stand-in for `packages/compliance` until the site can import the
 * engine's rule set directly, so the site and the engine share one source of truth.
 * Do not edit a figure here without a matching change to the statutory reference.
 *
 * VAT is in §8 of the statutory reference; company income tax and the development levy are in §13.
 */

export type PayeBand = {
  /** Width of the band in naira. `null` means the band is open-ended. */
  width: number | null;
  rate: number;
};

export type Scheme = {
  name: string;
  base: string;
  rate: string;
  borneBy: "Employee" | "Employer" | "Both" | "Contractor";
  remitTo: string;
  deadline: string;
};

export type Tax = {
  name: string;
  base: string;
  rate: string;
  postsTo: string;
  remitTo: string;
  deadline: string;
};

export const NG_2026_1 = {
  version: "NG-2026.1",
  effectiveFrom: "2026-01-01",
  framework: "Nigeria Tax Act 2025, effective 1 January 2026",

  paye: {
    bands: [
      { width: 800_000, rate: 0 },
      { width: 2_200_000, rate: 0.15 },
      { width: 9_000_000, rate: 0.18 },
      { width: 13_000_000, rate: 0.21 },
      { width: 25_000_000, rate: 0.23 },
      { width: null, rate: 0.25 },
    ] satisfies PayeBand[],
  },

  rentRelief: { rate: 0.2, cap: 500_000 },
  pension: { employeeRate: 0.08, employerRate: 0.1 },
  nhf: { rate: 0.025 },

  vat: { rate: 0.075 },
  /** WHT is resolved by transaction category. These are the common rates, used for illustration only. */
  wht: { illustrativeRates: [0.05, 0.1] },
  cit: {
    rate: 0.3,
    /**
     * ₦100m turnover, the NTAA figure the reform committee says was intended, by owner decision.
     * NTA s.202 as enacted says ₦50m (statutory reference §13); revisit if the NRS rules otherwise.
     */
    smallCompany: { rate: 0, turnoverMax: 100_000_000, fixedAssetsMax: 250_000_000 },
  },
  developmentLevy: { rate: 0.04 },

  /** Business taxes the ledger calculates, posts and tracks. */
  taxes: [
    {
      name: "VAT",
      base: "Taxable supplies, less input VAT",
      rate: "7.5%",
      postsTo: "VAT output and VAT input",
      remitTo: "NRS",
      deadline: "21st of following month",
    },
    {
      name: "WHT",
      base: "Qualifying payments, excluding VAT",
      rate: "By category",
      postsTo: "WHT payable and WHT receivable",
      remitTo: "NRS / State IRS",
      deadline: "21st of following month",
    },
    {
      name: "CIT",
      base: "Assessable profits",
      rate: "0% small / 30%",
      postsTo: "Income tax payable",
      remitTo: "NRS",
      deadline: "Within 6 months of year end",
    },
    {
      name: "Development levy",
      base: "Assessable profits",
      rate: "4%",
      postsTo: "Development levy payable",
      remitTo: "NRS",
      deadline: "With the CIT return",
    },
    {
      name: "PAYE",
      base: "Employee chargeable income",
      rate: "0–25%",
      postsTo: "PAYE payable",
      remitTo: "State IRS of residence",
      deadline: "10th of following month",
    },
  ] satisfies Tax[],

  schemes: [
    {
      name: "PAYE",
      base: "Annual chargeable income, cumulative",
      rate: "0–25%",
      borneBy: "Employee",
      remitTo: "State IRS of residence",
      deadline: "10th of following month",
    },
    {
      name: "Pension",
      base: "Basic + housing + transport",
      rate: "8% / 10%",
      borneBy: "Both",
      remitTo: "Employee's PFA",
      deadline: "7 working days after payment",
    },
    {
      name: "NHF",
      base: "Basic salary",
      rate: "2.5%",
      borneBy: "Employee",
      remitTo: "FMBN",
      deadline: "Within 1 month of payment",
    },
    {
      name: "NHIS",
      base: "Per applicable scheme",
      rate: "Scheme rate",
      borneBy: "Both",
      remitTo: "State or federal scheme",
      deadline: "Per scheme",
    },
    {
      name: "NSITF",
      base: "Total monthly payroll",
      rate: "1%",
      borneBy: "Employer",
      remitTo: "NSITF",
      deadline: "Before 16th of following month",
    },
    {
      name: "ITF",
      base: "Annual payroll",
      rate: "1%",
      borneBy: "Employer",
      remitTo: "ITF",
      deadline: "On or before 1 April",
    },
    {
      name: "WHT",
      base: "Contractor and vendor payments",
      rate: "By category",
      borneBy: "Contractor",
      remitTo: "NRS / State IRS",
      deadline: "21st of following month",
    },
  ] satisfies Scheme[],
} as const;
