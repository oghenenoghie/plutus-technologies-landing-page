// Screenshots of a LOCAL Plutus Cloud app, filled by seed.py, for the website's /docs pages.
//
//   node capture.js state.json out/            # every screen
//   node capture.js state.json out/ leave,bills  # just these
//
// Captures at 1440×900 and device scale 2. The control a doc step points at gets a gold outline.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.APP_URL ?? "http://localhost:3100";
const [stateFile, outDir, only] = process.argv.slice(2);
const state = JSON.parse(fs.readFileSync(stateFile, "utf8"));
const lastRun = state.pay_runs[state.pay_runs.length - 1];

async function mark(locator) {
  await locator.first().evaluate((el) => {
    el.style.outline = "3px solid #DEA12F";
    el.style.outlineOffset = "3px";
  });
}
const button = (p, name) => p.getByRole("button", { name, exact: true });
const pickSecond = async (p, index) => {
  await p.locator("main select").first().selectOption({ index });
  await p.waitForTimeout(1500);
};

// [file name, route, options]. `act` runs before the shot; `clip` returns the area to keep.
const SHOTS = [
  ["signup", "/signup", { anon: true }],
  ["login", "/login", { anon: true }],
  ["dashboard", "/dashboard", {
    clip: async (p) => {
      const card = p.getByText("Last Completed Pay Run").locator("xpath=ancestor::section[1] | ancestor::div[contains(@class,'rounded')][1]");
      const box = await card.first().boundingBox();
      return { x: 0, y: 0, width: 1440, height: Math.ceil(box.y + box.height + 24) };
    },
  }],
  ["setup", "/setup"],
  ["permissions", "/permissions", { act: async (p) => { await pickSecond(p, 2); await mark(button(p, "New User")); } }],
  ["security", "/security", { act: (p) => mark(button(p, "Enable MFA")) }],
  ["chart-of-accounts", "/general-ledger/chart-of-accounts", { act: (p) => mark(button(p, "New Account")) }],
  ["invoices", "/invoices", { act: (p) => mark(button(p, "New Customer Invoice")) }],
  ["bills", "/bills", { act: (p) => mark(button(p, "New Vendor Bill")) }],
  ["general-ledger", "/general-ledger", { act: (p) => mark(button(p, "New Journal Entry")) }],
  ["bank-reconciliation", "/bank-reconciliation", { act: (p) => mark(button(p, "Match")) }],
  ["financial-statements", "/financial-statements"],
  ["balance-sheet", "/balance-sheet"],
  ["accounting-settings", "/accounting-settings", { act: (p) => mark(p.locator("main input[type=date]")) }],
  ["inventory-settings", "/inventory/settings"],
  ["inventory", "/inventory"],
  ["inventory-items", "/inventory/items", { act: (p) => mark(button(p, "New Item")) }],
  ["inventory-po-new", "/inventory/purchase-orders/new", { act: (p) => p.locator("#po-item-0").waitFor() }],
  ["inventory-po", `/inventory/purchase-orders/${state.po_open}`, { act: (p) => mark(p.getByRole("link", { name: "Receive goods", exact: true })) }],
  ["inventory-grn", `/inventory/goods-receipts/${state.grn}`],
  ["inventory-stock", "/inventory/stock"],
  ["inventory-movements", "/inventory/movements"],
  ["inventory-reports", "/inventory/reports"],
  ["employees", "/employees", { act: (p) => mark(button(p, "New Employee")) }],
  ["employee-new", "/employees/new"],
  ["employee-detail", "/employees", {
    act: async (p) => {
      await button(p, "View").first().click();
      await p.waitForURL(/employees\/[0-9a-f-]{36}/);
      await p.waitForLoadState("networkidle");
      await p.waitForTimeout(1200);
    },
  }],
  ["org-chart", "/org-chart"],
  ["leave", "/leave", { act: (p) => mark(button(p, "Approve")) }],
  ["payroll", "/payroll", { act: (p) => mark(button(p, "New Pay Run")) }],
  ["payroll-new", "/payroll/new"],
  ["payroll-run", `/payroll/${lastRun}`],
  // Only the breakdown panel: beside it, a local API shows payslip email as not configured.
  ["payroll-derivation", `/payroll/${lastRun}`, {
    act: async (p) => {
      await p.setViewportSize({ width: 1440, height: 1000 });
      await p.getByRole("button", { name: /how\?/ }).first().click();
      await p.waitForTimeout(800);
    },
    clip: async () => ({ x: 305, y: 460, width: 545, height: 475 }),
  }],
  ["payroll-reports", "/payroll-reports", { act: (p) => pickSecond(p, 1) }],
  ["compliance", "/compliance"],
  ["countries", "/compliance/countries"],
  ["calculator", "/calculator", { act: async (p) => { await button(p, "Calculate").click(); await p.waitForTimeout(1200); } }],
  ["analytics-payroll", "/analytics/payroll", {
    act: (p) => mark(p.locator("main select").first().locator("xpath=ancestor::div[contains(@class,'flex') or contains(@class,'grid')][1]")),
  }],
  ["analytics-reports", "/analytics/reports"],
];

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const options = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" };
  const anon = await browser.newContext(options);
  const signedIn = await browser.newContext(options);
  const login = await signedIn.newPage();
  await login.goto(BASE + "/login");
  await login.fill("#identifier", "admin@example.com");
  await login.fill("#password", "Sample-pass-2026!");
  await login.click('button[type="submit"]');
  await login.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30000 });
  await login.close();

  let failed = 0;
  for (const [name, route, o = {}] of SHOTS) {
    if (only && !only.split(",").includes(name)) continue;
    const page = await (o.anon ? anon : signedIn).newPage();
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(1200);
      if (o.act) await o.act(page);
      await page.mouse.move(0, 0);
      await page.screenshot({ path: path.join(outDir, `${name}.png`), clip: o.clip ? await o.clip(page) : undefined });
      console.log("ok", name);
    } catch (e) {
      failed += 1;
      console.log("FAILED", name, e.message.split("\n")[0]);
    }
    await page.close();
  }
  await browser.close();
  process.exitCode = failed ? 1 : 0;
})();
