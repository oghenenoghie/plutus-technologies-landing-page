/**
 * Nigeria statutory rule set NG-2026.1.
 *
 * Source: Plutus statutory reference (nigeria-statutory-compliance.md), Nigeria Tax Act 2025,
 * effective 1 January 2026. Stand-in for `packages/compliance` until the site can import the
 * engine's rule set directly, so the site and the engine share one source of truth.
 * Do not edit a figure here without a matching change to the statutory reference.
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
