/**
 * The product documentation at /docs: one guide per area of the app, each a list of sections.
 *
 * Every step, label and menu path was checked against plutus-hr-system-frontend and plutus-hr-system
 * (October 2026). Screenshots are in public/docs/screens. They were taken from a local build of the
 * Cloud app, with a fictional organisation ("Sample Trading Ltd") and sample figures, at 1440×900.
 * The control a step points at is outlined in gold.
 *
 * In step and point text, **double asterisks** mark a label exactly as it appears in the app.
 */

export type Role =
  | "admin"
  | "payroll_manager"
  | "accountant"
  | "hr_manager"
  | "manager"
  | "department_manager"
  | "auditor"
  | "employee";

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Super Admin",
  payroll_manager: "Payroll Manager",
  accountant: "Accountant",
  hr_manager: "HR Manager",
  manager: "Manager",
  department_manager: "Department Manager",
  auditor: "Auditor",
  employee: "Employee",
};

export interface DocShot {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface DocSection {
  id: string;
  title: string;
  /** Sidebar path in the app, from the top-level group down to the screen. */
  where?: string[];
  /** Roles that can make the changes described (others may only read, or not see the screen). */
  roles?: Role[];
  intro?: string;
  steps?: string[];
  points?: string[];
  note?: string;
  shots?: DocShot[];
}

export interface DocGuide {
  slug: string;
  title: string;
  summary: string;
  description: string;
  /** Screenshot for the guide's card on /docs, when its first one says little at card size. */
  cover?: string;
  sections: DocSection[];
}

// Pixel sizes of the WebP files. Everything else is 1600×1000.
const SIZES: Record<string, [number, number]> = {
  dashboard: [1600, 844],
  "payroll-derivation": [1090, 950],
};

function shot(name: string, alt: string, caption: string): DocShot {
  const [width, height] = SIZES[name] ?? [1600, 1000];
  return { src: `/docs/screens/${name}.webp`, width, height, alt, caption };
}

const BOOKS: Role[] = ["admin", "payroll_manager", "accountant"];

export const DOC_GUIDES: DocGuide[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    summary: "Create a workspace, set up your company, add your team and find your way around.",
    description:
      "Create a Plutus workspace, set up your company's statutory details, add users with the right roles and turn on two-step sign-in.",
    cover: "dashboard",
    sections: [
      {
        id: "create-workspace",
        title: "Create your workspace",
        intro: "A workspace is your organisation in Plutus. Whoever creates it becomes its Super Admin.",
        steps: [
          "On the sign-in page, choose **Set up your workspace**.",
          "Enter your company name and address, and choose your country. The country sets your currency and the tax rules Plutus applies.",
          "Enter your work email and a password of at least 8 characters, then choose **Create workspace**.",
        ],
        note: "Sign-up only offers countries whose tax rules have been approved. Today that is Nigeria. The other countries in the catalogue are listed as not yet available.",
        shots: [shot("signup", "The Set up your workspace form", "Sign-up asks for the company, its country, and your email and password.")],
      },
      {
        id: "sign-in",
        title: "Sign in",
        steps: [
          "Enter your email. Employees can use the login code on their employee record instead.",
          "Enter your password and choose **Sign in**.",
          "If you have turned on two-step sign-in, enter the 6-digit code from your authenticator app and choose **Verify code**.",
        ],
        note: "If your email belongs to more than one organisation, choose **Belong to multiple organisations?** and enter the organisation ID.",
        shots: [shot("login", "The Plutus sign-in page", "One sign-in page for every role.")],
      },
      {
        id: "company-setup",
        title: "Set up your company",
        where: ["Company Info", "Setup & Onboarding"],
        roles: ["admin"],
        steps: [
          "Check the **Country** panel shows the right country and currency. It can change only until the organisation has its first pay run or posted journal.",
          "Under **Statutory registration**, enter your RC number, company TIN and company address. They appear on payslips, statutory filings and generated documents.",
          "Under **States of operation**, choose the Nigerian states you employ staff in.",
          "Under **Onboarding defaults**, set the default pay frequency and pension fund administrator. New-hire forms start from these; existing employees are never changed.",
        ],
        shots: [shot("setup", "The Setup & Onboarding page", "Country, statutory registration and onboarding defaults on one page.")],
      },
      {
        id: "users-and-roles",
        title: "Add users and choose their roles",
        where: ["Company Info", "Permissions"],
        roles: ["admin"],
        steps: [
          "Choose **New User**, then enter their email, role and an initial password.",
          "To change someone's role, select them, pick the new role and choose **Update Role**. It takes effect the next time they sign in.",
          "Under **Effective Permissions**, grant or revoke a single permission on top of the role. **Reset to Default** removes the override.",
        ],
        points: [
          "**Super Admin**: everything, including company setup, users and permissions.",
          "**Payroll Manager** and **Accountant**: the same access, covering payroll, accounting and inventory.",
          "**HR Manager**: every employee record, but never pay figures.",
          "**Manager**: their direct reports. **Department Manager**: the departments they head.",
          "**Auditor**: read-only everywhere, with pay figures masked.",
          "**Employee**: their own payslips, leave, expenses and documents in self-service.",
        ],
        shots: [shot("permissions", "The Permissions page with a member selected", "Pick a member to see their role and every permission it grants.")],
      },
      {
        id: "two-step-sign-in",
        title: "Turn on two-step sign-in",
        where: ["Company Info", "Security"],
        roles: ["admin", "payroll_manager", "accountant"],
        intro: "Two-step sign-in (MFA) is optional for every role. You need an authenticator app on your phone, such as Google Authenticator, Authy or 1Password.",
        steps: [
          "Choose **Enable MFA**.",
          "Add the secret Plutus shows to your authenticator app.",
          "Enter the 6-digit code the app generates to confirm. From then on, signing in asks for a code after your password.",
        ],
        shots: [shot("security", "The Security & Access page", "Multi-factor authentication, roles and the audit log in one place.")],
      },
      {
        id: "find-your-way",
        title: "Find your way around",
        where: ["Overview"],
        intro: "The sidebar groups every screen by area. You only see the screens your role can open.",
        points: [
          "**Overview**: the dashboard and your notifications.",
          "**Analytics & Insights**: ten dashboards and custom reports.",
          "**HR**: workforce, requests and time, and company policies.",
          "**Accounts**: payroll, payables and receivables, and financial information.",
          "**Inventory**: stock, operations, stock control and setup.",
          "**Company Info**: setup, integrations, approval workflows, permissions and security.",
        ],
        shots: [
          shot(
            "dashboard",
            "The Overview dashboard",
            "Active employees, outstanding statutory liability, pending requests, cash, payables, receivables and the last pay run.",
          ),
        ],
      },
    ],
  },
  {
    slug: "accounting",
    title: "Accounting",
    summary: "Accounts, invoices, bills, journals, bank reconciliation, statements and the lock date.",
    description:
      "How to set up the chart of accounts, invoice customers, record vendor bills, post journals, reconcile the bank and close a period in Plutus.",
    sections: [
      {
        id: "chart-of-accounts",
        title: "Chart of accounts",
        where: ["Accounts", "Financial Information", "General Ledger", "Chart of Accounts"],
        roles: BOOKS,
        intro:
          "Plutus starts you with the accounts payroll, tax, receivables, payables and fixed assets post to, marked **Default**. Inventory adds its own accounts when you switch it on.",
        steps: ["Choose **New Account**.", "Enter a code and a name, and choose the type: asset, liability, equity, revenue or expense."],
        shots: [shot("chart-of-accounts", "The Chart of Accounts", "Default accounts are seeded for you; add your own beside them.")],
      },
      {
        id: "invoices",
        title: "Invoice customers",
        where: ["Accounts", "Payables & Receivables", "Customers"],
        roles: BOOKS,
        steps: [
          "Add the customer first: **Customer List**, then **New Customer**, with their name, contact email and phone, and TIN.",
          "Choose **New Customer Invoice**. Pick the customer and enter the invoice number, issue date, due date, revenue account, amount and a description.",
          "Choose **Send** to issue it. This posts the amount to Accounts Receivable.",
          "When the customer pays, choose **Mark Paid**.",
        ],
        points: [
          "**Credit Note** reduces an issued invoice; **Void** cancels it.",
          "**PDF** downloads the invoice and **Email** sends it.",
          "**Recurring** sets up invoices that repeat on a schedule.",
        ],
        shots: [shot("invoices", "The Customers page listing invoices", "Each invoice's status, with the actions that apply to it.")],
      },
      {
        id: "bills",
        title: "Record and pay vendor bills",
        where: ["Accounts", "Payables & Receivables", "Vendors"],
        roles: BOOKS,
        steps: [
          "Add the vendor first: **Vendor List**, then **New Vendor**.",
          "Choose **New Vendor Bill**. Enter the vendor, bill number, bill date, due date, expense account, amount and any VAT.",
          "Choose the **WHT Category**: None, Goods or Services. Plutus works out the withholding tax.",
          "If the bill is for stock you have received, link it to the goods receipt.",
          "Choose **Approve** to post it to Accounts Payable, then **Mark Paid** when you pay it.",
        ],
        note: "Net payable is the amount plus VAT, less withholding tax. Each bill keeps a **History** of what happened to it.",
        shots: [shot("bills", "The Vendors page listing bills", "VAT and withholding tax show under each bill's net payable.")],
      },
      {
        id: "journals",
        title: "General ledger and journal entries",
        where: ["Accounts", "Financial Information", "General Ledger"],
        roles: BOOKS,
        intro: "The trial balance lists every account with its debits, credits and balance. Payroll, invoices, bills and inventory post here on their own.",
        steps: [
          "Choose **New Journal Entry** and enter a description.",
          "Add a line for each account, with the side (debit or credit) and the amount.",
          "Post it. Plutus refuses an entry until total debits equal total credits.",
        ],
        shots: [shot("general-ledger", "The General Ledger trial balance", "Every posting from payroll, WHT and manual journal entries.")],
      },
      {
        id: "bank-reconciliation",
        title: "Reconcile the bank",
        where: ["Accounts", "Financial Information", "Bank Reconciliation"],
        roles: BOOKS,
        steps: [
          "Choose **New Bank Account** and enter the bank name, account number, account name and the ledger account it maps to.",
          "Choose **Add Statement Line** for each line on your bank statement: the date, description, money in or out, and amount.",
          "Choose **Match** to pair a statement line with the ledger entry of the same amount.",
        ],
        note: "The bank balance, ledger balance and difference update as you match. When every line is matched, both lists read “Nothing outstanding”.",
        shots: [shot("bank-reconciliation", "The Bank Reconciliation page", "Unmatched statement lines on the left, unmatched ledger entries on the right.")],
      },
      {
        id: "statements",
        title: "Profit and loss, and the balance sheet",
        where: ["Accounts", "Financial Information", "Profit and Loss Account"],
        roles: BOOKS,
        intro: "Both statements are computed live from the general ledger, so they always match it.",
        steps: [
          "For the profit and loss account, choose the **From** and **To** dates.",
          "For the balance sheet (under **Balance Sheet**), choose the **As of** date.",
          "Choose **PDF** to download either statement, or **Email** to send it.",
        ],
        shots: [
          shot("financial-statements", "The Profit and Loss Account", "Revenue and expenses by account for the dates you choose."),
          shot("balance-sheet", "The Balance Sheet", "Assets against liabilities and equity at a point in time."),
        ],
      },
      {
        id: "lock-date",
        title: "Close a period with the lock date",
        where: ["Accounts", "Financial Information", "Accounting Settings"],
        roles: ["admin", "accountant"],
        steps: [
          "Choose the date in **Lock the books up to**.",
          "Choose **Save lock date**. Nothing can then be posted on or before it: no journals, bills, invoices, payroll or inventory documents.",
        ],
        note: "Only a Super Admin or an Accountant can change the lock date. On the same page, **Statutory remittances** decides whether marking a statutory liability as remitted also posts the payment.",
        shots: [shot("accounting-settings", "The Accounting Settings page", "The lock date, and whether statutory remittances post to the ledger.")],
      },
    ],
  },
  {
    slug: "inventory",
    title: "Inventory",
    summary: "Items and warehouses, purchase orders, receiving, issues, transfers, counts and reports.",
    description:
      "How to switch on Plutus Inventory, set up items and warehouses, raise purchase orders, receive goods, move stock and read the stock reports.",
    sections: [
      {
        id: "switch-on",
        title: "Switch on inventory",
        where: ["Inventory", "Setup", "Inventory Settings"],
        roles: BOOKS,
        steps: [
          "Choose **Switch on**.",
          "Under **Operations**, set the receiving tolerance, which documents need approval, and the limit above which stock gains need approval.",
        ],
        points: [
          "Stock is valued at weighted-average cost: one average per item across all warehouses.",
          "Receipts, issues, adjustments and transit losses post balanced journals to the general ledger. Plutus adds the inventory accounts to your chart for you.",
          "Switching inventory off hides it but keeps every record.",
        ],
        shots: [shot("inventory-settings", "The Inventory Settings page", "The module status, costing method and the ledger accounts inventory posts to.")],
      },
      {
        id: "items-and-warehouses",
        title: "Items and warehouses",
        where: ["Inventory", "Stock", "Items"],
        roles: BOOKS,
        steps: [
          "Under **Warehouses**, choose **New Warehouse** and enter a code and a name. Add a branch and address if you like.",
          "Under **Items**, choose **New Item**. Enter the SKU, name, type, base unit and category.",
          "Set the reorder level, default cost and preferred vendor, and switch on lot and expiry tracking if you need it.",
          "Choose **Units** on an item to add alternative units, such as a box of 12.",
        ],
        shots: [shot("inventory-items", "The Items list", "Stock on hand, average cost and value for every item; out-of-stock items are flagged.")],
      },
      {
        id: "purchase-orders",
        title: "Raise a purchase order",
        where: ["Inventory", "Operations", "Purchase Orders"],
        roles: BOOKS,
        steps: [
          "Choose **New Purchase Order**. Pick the vendor and enter the order date, expected delivery and the warehouse to deliver to.",
          "Add a line for each item, with the quantity, unit, unit price, and any discount or tax.",
          "Choose **Save draft**, then **Submit for approval**.",
          "Once it is approved, choose **Issue to vendor**.",
        ],
        note: "An order posts nothing to the ledger; it is a commitment. If the rest of an order will not arrive, choose **Close short**.",
        shots: [shot("inventory-po-new", "The New Purchase Order form", "Price, discount and tax per line, with the order total below.")],
      },
      {
        id: "receive-goods",
        title: "Receive goods",
        where: ["Inventory", "Operations", "Purchase Orders"],
        roles: BOOKS,
        steps: [
          "Open the issued order and choose **Receive goods**.",
          "The quantities start at what is outstanding. Change them if less arrived, and give a reason for anything you reject.",
          "Enter the lot and expiry date for tracked items.",
          "Choose **Save draft**, then **Post receipt**. The stock goes into the warehouse, and its value is accrued as goods received not invoiced.",
          "When the vendor's bill arrives, record it and link it to the goods receipt. That clears the accrual.",
        ],
        shots: [
          shot("inventory-po", "An issued purchase order", "Receive goods opens a receipt with the outstanding quantities filled in."),
          shot("inventory-grn", "A posted goods receipt", "Accepted and rejected quantities, lots and expiry dates, and the value accrued."),
        ],
      },
      {
        id: "issues-and-transfers",
        title: "Issue and transfer stock",
        where: ["Inventory", "Operations", "Stock Issues"],
        roles: [...BOOKS, "department_manager"],
        steps: [
          "To use stock, choose a new stock issue. Enter the warehouse, department and purpose, and the items and quantities.",
          "Choose **Save draft**, then **Submit for approval**. Once approved, choose **Post issue**. The stock leaves the warehouse and its cost goes to the category's expense account.",
          "To move stock between warehouses, create a transfer under **Stock Transfers** and save it. Once it is approved (if your settings ask for approval), choose **Dispatch**. The stock is in transit until the other warehouse receives it.",
          "At the destination, choose **Receive at** that warehouse and confirm the quantities. A shortfall needs a reason.",
        ],
        note: "Department managers can request stock for the departments they head.",
        shots: [shot("inventory-movements", "The Stock Movements ledger", "Every receipt, issue and transfer, append-only. Mistakes are reversed, never edited.")],
      },
      {
        id: "counts-and-adjustments",
        title: "Count stock and make adjustments",
        where: ["Inventory", "Stock Control", "Stocktakes"],
        roles: BOOKS,
        steps: [
          "Choose the warehouse and **Create stocktake**, then **Start count**. Plutus snapshots what it expects to find.",
          "Enter the counted quantities and save them, then choose **Submit**.",
          "After approval, choose **Post**. Differences post as gains or losses.",
          "For a one-off change, use **Stock Adjustments** with a reason: opening balance, found, damage, expiry, loss, write-off or correction.",
        ],
        note: "Write-offs, and gains above the limit you set, need approval before they post.",
      },
      {
        id: "stock-and-reports",
        title: "Check stock and run reports",
        where: ["Inventory", "Stock", "Stock on Hand"],
        roles: [...BOOKS, "auditor"],
        points: [
          "**Stock on Hand** shows each item by warehouse, flags anything at or below its reorder level, and lists lots by expiry.",
          "**Inventory Reports** has valuation, movements, adjustments and variances, expiring stock, and orders outstanding. Each downloads as CSV or PDF.",
          "The valuation report puts the stock value beside the inventory account in the general ledger, with the difference.",
          "**Inventory Overview** reconciles the stock ledger with the general ledger for stock value and goods received not invoiced.",
        ],
        shots: [
          shot("inventory-stock", "The Stock on Hand page", "Quantity and value per item and warehouse, with low stock flagged."),
          shot("inventory-reports", "The stock valuation report", "Stock value and the inventory account agree, so the report shows Reconciled."),
          shot("inventory", "The Inventory Overview", "Headline figures and the ledger reconciliation."),
        ],
      },
    ],
  },
  {
    slug: "payroll",
    title: "Payroll",
    summary: "Statutory rules, pay runs, payslips and how each figure is derived, reports and the calculator.",
    description:
      "How Plutus runs payroll: the statutory rule set, starting a pay run, reading payslips and their derivation, payroll reports and the PAYE calculator.",
    sections: [
      {
        id: "rules",
        title: "The statutory rules",
        where: ["Accounts", "Payroll", "Compliance Engine"],
        roles: [...BOOKS, "auditor"],
        intro:
          "The Compliance Engine lists the rules every pay run uses: PAYE, pension, NHF, NSITF, ITF and WHT, with each one's base, rate, authority and deadline, and the PAYE bands. They carry a rule version, such as NG-2026.1.",
        note: "Before your first pay run, make sure each employee has their pay components, state of residence, TIN and pension details. See People & HR.",
        shots: [shot("compliance", "The Compliance Engine page", "Statutory schemes and PAYE bands for the current rule version.")],
      },
      {
        id: "start-a-pay-run",
        title: "Start a pay run",
        where: ["Accounts", "Payroll", "Payroll Runs"],
        roles: BOOKS,
        steps: [
          "Choose **New Pay Run**.",
          "Enter the period start and end, and the frequency: monthly, weekly or biweekly.",
          "Choose the run type: Regular, Bonus, 13th Month, Arrears or Off-cycle.",
          "Choose who is in it: all active employees, or specific employees.",
          "To pay one-off taxable amounts this time only, such as overtime or a bonus, tick **Add one-off amounts** and enter them.",
          "Choose **Create Pay Run**.",
        ],
        note: "The run is created as a draft, and its employees are fixed at that moment. Someone hired later can't join a run that nobody reviewed them against.",
        shots: [
          shot("payroll", "The Payroll Runs list", "Each run's period, employees, gross and net pay, and status."),
          shot("payroll-new", "The New Pay Run form", "Period, run type, the employees in scope and any one-off earnings."),
        ],
      },
      {
        id: "pay-run-statuses",
        title: "Pay run statuses",
        intro: "The Payroll Runs list shows where each run is:",
        points: [
          "**Draft**: created, with its employees fixed. Nothing is calculated or posted yet.",
          "**Validated**: checked against the previous run, with unusual changes flagged.",
          "**Locked**: payslips are calculated and stored, and the payroll journal is posted. A locked run can't be edited.",
          "**Reversed**: undone by a compensating journal.",
        ],
      },
      {
        id: "payslips",
        title: "Read payslips and their derivation",
        where: ["Accounts", "Payroll", "Payroll Runs"],
        roles: [...BOOKS, "auditor"],
        steps: [
          "Choose **View** on a run to see every payslip, with gross pay, PAYE and net pay.",
          "Choose **how?** on a payslip to see how each figure was worked out.",
          "Choose **PDF** to download the payslip. Its delivery status shows beside the breakdown, with **Resend Payslip**.",
        ],
        note: "PAYE is cumulative over the tax year. Plutus taxes the year-to-date chargeable income and subtracts the PAYE already withheld, so a pay rise or a missed month is handled properly.",
        shots: [
          shot("payroll-run", "A locked pay run with its payslips", "Gross, PAYE and net for every employee in the run."),
          shot(
            "payroll-derivation",
            "A payslip's derivation",
            "Gross pay, pension, NHF, rent relief and cumulative chargeable income, then PAYE and net pay.",
          ),
        ],
      },
      {
        id: "reverse",
        title: "Reverse a pay run",
        where: ["Accounts", "Payroll", "Payroll Runs"],
        roles: BOOKS,
        steps: [
          "Open the locked run and choose **Reverse Pay Run**.",
          "Plutus posts a compensating journal and marks the run **Reversed**.",
          "If the run's statutory liabilities have already been filed or remitted, Plutus warns you first. Choose **Reverse Anyway** only if you mean it.",
        ],
      },
      {
        id: "reports",
        title: "Payroll reports",
        where: ["Accounts", "Payroll", "Payroll Reports"],
        roles: [...BOOKS, "auditor"],
        points: [
          "**Payroll Register**: for a pay run you choose, every employee's gross, employee and employer pension, NHF, PAYE, loan, benefit and union dues deductions, and net pay.",
          "**PAYE by State**: the number of employees and the total PAYE for each state.",
          "**Annual Tax Reconciliation**: for a tax year, each employee's TIN, gross pay, pension, NHF, PAYE and number of payslips, with their certificate.",
        ],
        shots: [shot("payroll-reports", "The Payroll Register", "Every deduction for every employee in the chosen run.")],
      },
      {
        id: "calculator",
        title: "Check a figure with the PAYE calculator",
        where: ["Accounts", "Payroll", "PAYE Calculator"],
        roles: [...BOOKS, "auditor"],
        steps: ["Enter an annual gross pay and the annual rent paid.", "Choose **Calculate** to see each step, from the component split to tax by band."],
        note: "The calculator assumes a 50/30/20 basic, housing and transport split. A real payslip uses each employee's own pay components.",
        shots: [shot("calculator", "The PAYE Calculator", "Every figure shown step by step, from the same rules the engine uses.")],
      },
      {
        id: "countries",
        title: "Country compliance",
        where: ["Accounts", "Payroll", "Country Compliance"],
        roles: [...BOOKS, "auditor"],
        intro:
          "The catalogue lists every country Plutus supports, with its currency, tax authority and status. Payroll runs only where a country's rules are approved. Today that is Nigeria. Your organisation's country is set in Setup & Onboarding.",
        points: [
          "**Active**: the rules are approved, and payroll and tax calculations run.",
          "**Draft**: the rules are written up with their sources and wait for review by a tax adviser in that country.",
          "**Awaiting review**: the adviser is checking them.",
          "**Setup required**: nothing is drafted yet.",
        ],
        note: "A country's rules can go live only when every rule cites the law or the tax authority's own publication, a tax adviser has reviewed them, and someone other than the person who prepared them has approved them.",
        shots: [shot("countries", "The Country Compliance catalogue", "Nigeria is active; the other five are drafts awaiting approved rules.")],
      },
    ],
  },
  {
    slug: "people",
    title: "People & HR",
    summary: "Employee records, self-service logins, departments, the org chart and leave.",
    description: "How to add employees, give them self-service access, organise departments and approve leave in Plutus.",
    sections: [
      {
        id: "add-employees",
        title: "Add employees",
        where: ["HR", "Workforce", "Employees"],
        roles: BOOKS,
        steps: [
          "Choose **New Employee**.",
          "Under **Identity & Employment**, enter the employee number, full name, state of residence, employment type and date of joining. Add their job title, manager and branch.",
          "Under **Pay Components**, enter the basic, housing and transport pay and any other earnings for one pay period, as shown on the record and payslips. Add the annual rent they pay, for rent relief.",
          "Under **Statutory & Compliance**, enter their TIN, pension fund administrator, RSA PIN and NHF number.",
          "Choose **Create Employee**. To add many people at once, use **Bulk Import** and paste a CSV with the same columns.",
        ],
        note: "The form labels the pay fields “Annual”, but Plutus uses them as the amounts for each pay period. For someone paid monthly, enter their monthly basic, housing and transport.",
        shots: [
          shot("employee-new", "The New Employee form", "Every field feeds TIN checks, PAYE, pension and NHF."),
          shot("employees", "The Employees directory", "Department, state, type, TIN status and pay per period for each employee."),
        ],
      },
      {
        id: "employee-records",
        title: "Employee records and logins",
        where: ["HR", "Workforce", "Employees"],
        roles: BOOKS,
        steps: [
          "Choose **View** on an employee to open their record. Its tabs are Overview, History, Checklist, Probation and Documents.",
          "Choose **Create Login** to give them self-service access. They can sign in with their email or the login code on their record.",
          "Use **Edit Details** for changes and **Offboard** when they leave.",
        ],
        points: [
          "**Mask Salary** on the Employees list hides an employee's pay from their manager.",
          "**Bank Account** stores the account their net pay goes to.",
          "With a login, employees see their payslips, leave balance and requests, expenses, loans, benefits, attendance and documents.",
        ],
        shots: [shot("employee-detail", "An employee record", "Employment details and compensation per period on the Overview tab.")],
      },
      {
        id: "structure",
        title: "Departments and the org chart",
        where: ["HR", "Workforce", "Departments"],
        points: [
          "**Departments** lists each department and its head. A Department Manager sees only the departments they head.",
          "**Org Chart** draws reporting lines from each employee's manager.",
          "**Branches** and **Job Grades** sit beside them under Workforce.",
        ],
        shots: [shot("org-chart", "The Org Chart", "Reporting lines built from each employee's manager.")],
      },
      {
        id: "leave",
        title: "Approve leave",
        where: ["HR", "Requests & Time", "Leave"],
        steps: [
          "Employees request annual, sick, maternity, paternity or unpaid leave from self-service.",
          "Requests appear here as **Pending**. Choose **Approve** or **Reject**.",
          "Choose **History** to see every decision on a request.",
        ],
        shots: [shot("leave", "The Leave & Attendance page", "Pending requests with Approve and Reject; approved ones keep their history.")],
      },
    ],
  },
  {
    slug: "analytics",
    title: "Analytics & Insights",
    summary: "Ten dashboards, filters you can share, drill-down to the records, and exports.",
    description:
      "How to use Plutus Analytics & Insights: the ten dashboards, filters, figure definitions, drill-down to source records and CSV, XLSX or PDF exports.",
    sections: [
      {
        id: "dashboards",
        title: "The dashboards",
        where: ["Analytics & Insights", "Executive Overview"],
        roles: ["admin", "payroll_manager", "accountant", "hr_manager", "department_manager", "auditor"],
        intro:
          "Ten pages: Executive Overview, Workforce, Payroll, Attendance, Leave, Recruitment, Performance, Tax & Compliance, Financial and Custom Reports. Tabs across the top move between them.",
        points: [
          "Every figure is computed on the server from the same records the rest of Plutus holds. Payroll figures use locked runs only.",
          "The (i) beside a figure shows its definition.",
          "A period with no records shows no figure, rather than zero.",
          "Each role sees the sections its access allows. Department Managers see only their departments.",
        ],
        shots: [shot("analytics-payroll", "The Payroll Analytics page", "Payroll cost, gross and net pay, deductions and contributions, with the filters outlined.")],
      },
      {
        id: "filters",
        title: "Filter and share a view",
        steps: [
          "Choose the period, and what to compare it with: the previous period or the same period last year.",
          "Narrow it by department, location, employment type, status, payroll status or country.",
          "Copy the address to share the view. Filters are kept in the address, and they carry across the tabs.",
        ],
      },
      {
        id: "drill-down",
        title: "Drill down to the records",
        steps: [
          "On any chart, switch between **Chart** and **Table**.",
          "Choose **Records** to open the rows behind a figure.",
          "Use **CSV**, **XLSX** or **PDF** at the top of the page to export the section.",
        ],
      },
      {
        id: "custom-reports",
        title: "Custom reports",
        where: ["Analytics & Insights", "Custom Reports"],
        roles: ["admin", "payroll_manager", "accountant", "hr_manager", "auditor"],
        intro:
          "Download any dashboard, or the records behind it, as CSV, XLSX or PDF. Each file uses the filters you set, and Plutus records who downloaded it.",
        shots: [shot("analytics-reports", "The Custom Reports page", "Summaries and record lists, each downloadable in three formats.")],
      },
    ],
  },
  {
    slug: "desktop",
    title: "Plutus Desktop",
    summary: "Install the offline edition on Windows, macOS or Linux, start it and update it.",
    description:
      "How to install Plutus Desktop on Windows, macOS or Linux, what happens on first start, how updates install, and where your data is kept.",
    sections: [
      {
        id: "install",
        title: "Install",
        steps: [
          "Download the installer for your computer from the Cloud & Desktop page: Windows (.exe), macOS (.dmg) or Linux (.AppImage).",
          "Windows: run the installer. macOS: open the .dmg and drag Plutus Technologies to Applications. Linux: make the AppImage executable and open it.",
          "If Windows SmartScreen or macOS warns about the app the first time, confirm that you want to open it.",
        ],
        note: "The Linux AppImage opens on Ubuntu 22.04 and later without extra libraries.",
      },
      {
        id: "first-start",
        title: "First start",
        steps: [
          "Plutus opens a startup window straight away and shows each step: starting the database, updating your data and opening the app.",
          "The first start after an install or update takes longer. On Windows, an antivirus scan of new files can add a few minutes.",
          "When the app opens, create your workspace and sign in as described in Getting started.",
        ],
        note: "If something stops Plutus from starting, it says so in a message rather than closing.",
      },
      {
        id: "updates",
        title: "Updates and your data",
        points: [
          "Plutus Desktop runs its own database on your computer. It needs no internet connection, and your data stays on your machine.",
          "To update, download the new installer and run it. It installs over the previous version and keeps your data.",
          "On Windows, the installer stops a running Plutus before replacing it.",
          "Since build 42 (October 2026), Desktop has every screen in these guides, including Analytics & Insights, Country Compliance and the choice of country at sign-up. If you installed an earlier build, update to get them.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): DocGuide | undefined {
  return DOC_GUIDES.find((g) => g.slug === slug);
}

/** The screenshot on a guide's card on /docs: its cover, or else its first screenshot. */
export function guideCover(guide: DocGuide): DocShot | undefined {
  const shots = guide.sections.flatMap((s) => s.shots ?? []);
  return shots.find((s) => s.src === `/docs/screens/${guide.cover}.webp`) ?? shots[0];
}
