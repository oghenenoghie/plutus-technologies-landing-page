import { NG_2026_1, type PayeBand } from "./ng-2026-1";

export type BandSlice = { rate: number; income: number; tax: number };

/** PAYE on annual chargeable income, summed band by band at marginal rates. */
export function payeByBand(
  chargeable: number,
  bands: readonly PayeBand[] = NG_2026_1.paye.bands,
): { slices: BandSlice[]; total: number } {
  let rest = Math.max(0, chargeable);
  const slices = bands.map((band) => {
    const income = band.width === null ? rest : Math.min(rest, band.width);
    rest -= income;
    return { rate: band.rate, income, tax: income * band.rate };
  });
  return { slices, total: slices.reduce((sum, s) => sum + s.tax, 0) };
}

/** Pay split the hero illustration assumes. The engine reads each employee's real components. */
export const ILLUSTRATIVE_SPLIT = { basic: 0.5, housing: 0.3, transport: 0.2 } as const;

export type Derivation = {
  gross: number;
  pension: number;
  nhf: number;
  rentRelief: number;
  chargeable: number;
  slices: BandSlice[];
  annualPaye: number;
  monthlyPaye: number;
};

/** The hero instrument's derivation, from annual gross and annual rent. */
export function deriveIllustrativePaye(gross: number, rent: number): Derivation {
  const { pension: pensionRule, nhf: nhfRule, rentRelief: reliefRule } = NG_2026_1;
  const { basic, housing, transport } = ILLUSTRATIVE_SPLIT;

  const pension = gross * (basic + housing + transport) * pensionRule.employeeRate;
  const nhf = gross * basic * nhfRule.rate;
  const rentRelief = Math.min(rent * reliefRule.rate, reliefRule.cap);
  const chargeable = Math.max(0, gross - pension - nhf - rentRelief);
  const { slices, total } = payeByBand(chargeable);

  return {
    gross,
    pension,
    nhf,
    rentRelief,
    chargeable,
    slices,
    annualPaye: total,
    monthlyPaye: total / 12,
  };
}

export function formatNaira(n: number): string {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}
