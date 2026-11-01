/**
 * Every country's payroll rules, exported from plutus-hr-system by scripts/country-rules/export.py
 * into src/data/country-rules.json. Nothing here is typed by hand: re-run the export when the
 * app's rules change. This file only describes the data and formats it for /docs/tax-rules.
 */
import data from "@/data/country-rules.json";

/** Values a figure can take under one Tax Setting's options, or null when the company types it in. */
export type Variants = Record<string, (string | number | boolean | null)[] | null>;

export type RuleLine = {
  code: string;
  name: string;
  kind: "employee_contribution" | "employer_contribution" | "payroll_levy" | "tax_credit";
  authority: string;
  base: string;
  rate_ppm: number | null;
  amount_minor: number | null;
  base_floor_minor: number;
  base_ceiling_minor: number | null;
  amount_floor_minor: number | null;
  amount_cap_minor: number | null;
  applies_to: string;
  tax_deductible: boolean;
  tax_deduction_group: string | null;
  due: string;
  source: string;
  variable: Record<string, Variants>;
};

export type TaxSetting = {
  key: string;
  label: string;
  help: string;
  kind: "percent" | "amount" | "day" | "choice";
  options: { label: string; source: string; display: string }[];
  minimum: string | null;
  maximum: string | null;
  required_when: { key: string; value: string } | null;
  affects: string[];
};

export type RuleSet = {
  id: string;
  country: string;
  country_name: string;
  currency: string;
  exponent: number;
  effective_from: string;
  effective_to: string | null;
  tax_year_start_month: number;
  frequencies: string[];
  approval: { basis: string; approved_by: string | null; approved_on: string | null; reviewed_by: string | null };
  summary: string[];
  income_tax: {
    code: string;
    name: string;
    authority: string;
    method: string;
    bands: { up_to_minor: number | null; rate_ppm: number }[];
    due: string;
    source: string;
    deduction_caps: { group: string; cap_minor: number | null }[];
    variable: Record<string, Variants>;
  };
  lines: RuleLine[];
  settings: TaxSetting[];
  sources: { id: string; title: string; reference: string; official: boolean }[];
};

export type NigeriaRules = {
  id: string;
  effective_from: string;
  paye: {
    bands: { up_to_minor: number | null; rate_ppm: number }[];
    tax_free_threshold_minor: number;
    rent_relief_rate_ppm: number;
    rent_relief_cap_minor: number;
    authority: string;
    due_day_of_following_month: number;
  };
  pension: { employee_rate_ppm: number; employer_rate_ppm: number; authority: string; due_working_days_after_payment: number };
  nhf: { rate_ppm: number; authority: string; due_days_after_payment: number };
  nsitf: { rate_ppm: number; authority: string; due_day_of_following_month: number };
  itf: { rate_ppm: number; authority: string; due_month: number; due_day: number };
  wht: { categories: { category: string; rate_ppm: number }[]; authority: string; due_day_of_following_month: number };
};

export const COUNTRY_RULES = {
  source: data.source,
  nigeria: data.nigeria as unknown as NigeriaRules,
  ruleSets: data.rule_sets as unknown as RuleSet[],
};

export function ruleSetsFor(country: string): RuleSet[] {
  return COUNTRY_RULES.ruleSets.filter((r) => r.country === country);
}

export function percent(ppm: number): string {
  return `${Number((ppm / 10_000).toFixed(4))}%`;
}

export function money(minor: number, currency: string, exponent: number): string {
  const value = minor / 10 ** exponent;
  const whole = Number.isInteger(value);
  const text = value.toLocaleString("en-GB", {
    minimumFractionDigits: whole ? 0 : exponent,
    maximumFractionDigits: exponent,
  });
  return currency === "NGN" ? `₦${text}` : `${currency} ${text}`;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function monthName(month: number): string {
  return MONTHS[month - 1];
}

export function ordinal(n: number): string {
  const suffix = n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
}

export const KIND_LABEL: Record<RuleLine["kind"], string> = {
  employee_contribution: "Employee",
  employer_contribution: "Employer",
  payroll_levy: "Employer levy",
  tax_credit: "Tax credit",
};

/** Whether any setting behind a figure is typed in by the company rather than chosen from options. */
export function enteredFreely(variants: Variants | undefined): boolean {
  return !!variants && Object.values(variants).some((v) => v === null);
}

/** Every value a figure can take across the settings that move it, without repeats or gaps. */
export function possibleValues<T>(variants: Variants | undefined): T[] {
  const out: T[] = [];
  for (const values of Object.values(variants ?? {})) {
    for (const v of values ?? []) if (v !== null && !out.includes(v as T)) out.push(v as T);
  }
  return out;
}
