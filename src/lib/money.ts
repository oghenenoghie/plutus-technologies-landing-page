/** Whole naira, as the ledger displays it: ₦ + en-NG grouping, no decimals. */
export function formatNaira(n: number): string {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export const pct = (rate: number) => `${+(rate * 100).toFixed(2)}%`;
