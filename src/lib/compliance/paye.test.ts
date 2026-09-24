import { describe, expect, it } from "vitest";
import { deriveIllustrativePaye, formatNaira, payeByBand } from "./paye";

describe("payeByBand (NG-2026.1)", () => {
  it("matches the golden worked example", () => {
    expect(payeByBand(3_162_000).total).toBeCloseTo(359_160, 6);
  });

  it("is zero at or below the ₦800,000 threshold, never negative", () => {
    expect(payeByBand(0).total).toBe(0);
    expect(payeByBand(800_000).total).toBe(0);
    expect(payeByBand(-50_000).total).toBe(0);
  });

  it.each([
    [800_000, 0],
    [3_000_000, 330_000],
    [12_000_000, 1_950_000],
    [25_000_000, 4_680_000],
    [50_000_000, 10_430_000],
  ])("applies marginal rates at the %i band edge", (income, tax) => {
    expect(payeByBand(income).total).toBeCloseTo(tax, 6);
    expect(payeByBand(income + 1).total).toBeGreaterThan(tax);
  });

  it("taxes income above ₦50m at 25%", () => {
    expect(payeByBand(50_000_100).total - payeByBand(50_000_000).total).toBeCloseTo(25, 6);
  });
});

describe("deriveIllustrativePaye", () => {
  it("reproduces the hero default state", () => {
    const d = deriveIllustrativePaye(6_000_000, 1_200_000);
    expect(d.pension).toBeCloseTo(480_000, 6);
    expect(d.nhf).toBeCloseTo(75_000, 6);
    expect(d.rentRelief).toBeCloseTo(240_000, 6);
    expect(d.chargeable).toBeCloseTo(5_205_000, 6);
    expect(formatNaira(d.annualPaye)).toBe("₦726,900");
    expect(formatNaira(d.monthlyPaye)).toBe("₦60,575");
  });

  it("caps rent relief at ₦500,000", () => {
    expect(deriveIllustrativePaye(6_000_000, 2_500_000).rentRelief).toBe(500_000);
    expect(deriveIllustrativePaye(6_000_000, 6_000_000).rentRelief).toBe(500_000);
    expect(deriveIllustrativePaye(6_000_000, 0).rentRelief).toBe(0);
  });
});
