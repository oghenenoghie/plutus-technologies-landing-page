import { NG_2026_1 } from "./ng-2026-1";

export type JournalLine = { side: "Dr" | "Cr"; code: string; account: string; amount: number };
export type Journal = { ref: string; lines: JournalLine[] };

export type InvoicePosting = {
  net: number;
  vat: number;
  total: number;
  wht: number;
  cash: number;
  journals: Journal[];
  debits: number;
  credits: number;
};

/** Sample chart of accounts used by the hero illustration. */
export const SAMPLE_ACCOUNTS = {
  bank: { code: "1010", account: "Bank" },
  receivable: { code: "1200", account: "Accounts receivable" },
  whtReceivable: { code: "1420", account: "WHT receivable" },
  vatOutput: { code: "2310", account: "VAT output" },
  revenue: { code: "4000", account: "Revenue" },
} as const;

const toKobo = (naira: number) => Math.round(naira * 100);

/**
 * One sales invoice and its receipt, posted double-entry in whole kobo, as the ledger stores money.
 * VAT is charged on the invoice value. The customer withholds WHT on the value excluding VAT, and
 * the amount withheld is held as a tax credit (WHT receivable) rather than written off.
 */
export function postSalesInvoice(net: number, whtRate: number, vatRate: number = NG_2026_1.vat.rate): InvoicePosting {
  const netK = toKobo(net);
  const vatK = Math.round(netK * vatRate);
  const totalK = netK + vatK;
  const whtK = Math.round(netK * whtRate);
  const cashK = totalK - whtK;

  const A = SAMPLE_ACCOUNTS;
  const line = (side: JournalLine["side"], a: { code: string; account: string }, kobo: number) => ({
    side,
    ...a,
    kobo,
  });

  const entries = [
    {
      ref: "Invoice",
      lines: [line("Dr", A.receivable, totalK), line("Cr", A.revenue, netK), line("Cr", A.vatOutput, vatK)],
    },
    {
      ref: "Receipt",
      lines: [line("Dr", A.bank, cashK), line("Dr", A.whtReceivable, whtK), line("Cr", A.receivable, totalK)],
    },
  ];

  let debitsK = 0;
  let creditsK = 0;
  const journals = entries.map((e) => ({
    ref: e.ref,
    lines: e.lines
      .filter((l) => l.kobo !== 0)
      .map(({ kobo, ...l }) => {
        if (l.side === "Dr") debitsK += kobo;
        else creditsK += kobo;
        return { ...l, amount: kobo / 100 };
      }),
  }));

  return {
    net: netK / 100,
    vat: vatK / 100,
    total: totalK / 100,
    wht: whtK / 100,
    cash: cashK / 100,
    journals,
    debits: debitsK / 100,
    credits: creditsK / 100,
  };
}
