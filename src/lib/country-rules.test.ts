import { describe, expect, it } from "vitest";
import { COUNTRIES } from "./countries";
import { COUNTRY_RULES, money, percent, ruleSetsFor } from "./country-rules";

describe("country tax rules (exported from plutus-hr-system)", () => {
  it("covers every country in the catalogue", () => {
    expect(COUNTRY_RULES.nigeria.id).toBe("NG-2026.1");
    for (const c of COUNTRIES.filter((c) => c.code !== "NG")) {
      expect(ruleSetsFor(c.code).length, c.code).toBeGreaterThan(0);
      for (const rs of ruleSetsFor(c.code)) expect(c.payroll, rs.id).toContain(rs.id);
    }
  });

  it("cites a listed source for every line and every income tax rule", () => {
    for (const rs of COUNTRY_RULES.ruleSets) {
      const ids = new Set(rs.sources.map((s) => s.id));
      expect(ids.has(rs.income_tax.source), `${rs.id} income tax`).toBe(true);
      for (const line of rs.lines) expect(ids.has(line.source), `${rs.id} ${line.code}`).toBe(true);
    }
  });

  it("ties every Tax Setting to a figure it changes, and every changing figure to a setting", () => {
    for (const rs of COUNTRY_RULES.ruleSets) {
      const keys = new Set(rs.settings.map((s) => s.key));
      for (const s of rs.settings) expect(s.affects.length, `${rs.id} ${s.key}`).toBeGreaterThan(0);
      const variable = [rs.income_tax.variable, ...rs.lines.map((l) => l.variable)];
      for (const fields of variable)
        for (const by of Object.values(fields)) for (const key of Object.keys(by)) expect(keys.has(key), `${rs.id} ${key}`).toBe(true);
    }
  });

  it("formats rates and amounts as the app shows them", () => {
    expect(percent(27_500)).toBe("2.75%");
    expect(percent(3_000)).toBe("0.3%");
    expect(money(10_800_000, "KES", 2)).toBe("KES 108,000");
    expect(money(383_333, "GMD", 2)).toBe("GMD 3,833.33");
    expect(money(3_375_000, "XOF", 0)).toBe("XOF 3,375,000");
    expect(money(80_000_000, "NGN", 2)).toBe("₦800,000");
  });
});
