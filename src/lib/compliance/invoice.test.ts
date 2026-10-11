import { describe, expect, it } from "vitest";
import { formatNaira } from "../money";
import { postSalesInvoice } from "./invoice";
import { NG_2026_1 } from "./ng-2026-1";

describe("postSalesInvoice (NG-2026.1)", () => {
  it("reproduces the hero default state", () => {
    const p = postSalesInvoice(2_400_000, 0.05);
    expect(p.vat).toBe(180_000);
    expect(p.total).toBe(2_580_000);
    expect(p.wht).toBe(120_000);
    expect(p.cash).toBe(2_460_000);
    expect(formatNaira(p.debits)).toBe("₦5,160,000");
    expect(p.credits).toBe(p.debits);
  });

  it("charges VAT at the rule-set rate of 7.5%", () => {
    expect(NG_2026_1.vat.rate).toBe(0.075);
    expect(postSalesInvoice(1_000_000, 0).vat).toBe(75_000);
  });

  it("withholds WHT on the value excluding VAT", () => {
    const p = postSalesInvoice(1_000_000, 0.1);
    expect(p.wht).toBe(100_000);
    expect(p.cash).toBe(975_000);
  });

  it("posts no WHT line when nothing is withheld", () => {
    const p = postSalesInvoice(1_000_000, 0);
    const accounts = p.journals.flatMap((j) => j.lines.map((l) => l.account));
    expect(accounts).not.toContain("WHT receivable");
    expect(p.cash).toBe(p.total);
  });

  it.each([
    [100_000, 0],
    [1_234.57, 0.05],
    [2_400_000, 0.1],
    [19_999_999.99, 0.05],
  ])("balances every journal for %d at WHT %d", (net, wht) => {
    const p = postSalesInvoice(net, wht);
    for (const j of p.journals) {
      const dr = j.lines.filter((l) => l.side === "Dr").reduce((s, l) => s + Math.round(l.amount * 100), 0);
      const cr = j.lines.filter((l) => l.side === "Cr").reduce((s, l) => s + Math.round(l.amount * 100), 0);
      expect(dr).toBe(cr);
    }
    expect(p.debits).toBe(p.credits);
    for (const l of p.journals.flatMap((j) => j.lines)) {
      expect(l.amount * 100).toBeCloseTo(Math.round(l.amount * 100), 6);
    }
  });
});
