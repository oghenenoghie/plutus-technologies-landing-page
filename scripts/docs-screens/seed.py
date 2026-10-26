"""Fill a LOCAL Plutus API with a fictional organisation, Sample Trading Ltd, for the /docs screenshots.

Never point this at production: it signs up an organisation, creates users and employees, locks
nine pay runs and posts invoices, bills, journals and stock.

    uv run python <this file> state.json      # run from the plutus-hr-system checkout

Writes the ids capture.js needs to state.json.
"""

import calendar
import json
import sys

import httpx

API = "http://localhost:8000/api/v1"
PASSWORD = "Sample-pass-2026!"
ADMIN = "admin@example.com"

client = httpx.Client(timeout=60)
state: dict = {}


def call(method: str, route: str, data: object = None, token: str | None = None):
    token = token or state.get("token")
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    r = client.request(method, API + route, json=data, headers=headers)
    if r.status_code >= 300:
        sys.exit(f"{method} {route} -> {r.status_code} {r.text[:400]}")
    return r.json() if r.content else None


def email_for(name: str) -> str:
    return name.lower().replace(" ", ".") + "@example.com"


# 1. The organisation, its administrator and one user per role
state["org_id"] = call(
    "POST",
    "/organisation/signup",
    {
        "org_name": "Sample Trading Ltd",
        "org_address": "14 Sample Close, Ikeja, Lagos",
        "admin_email": ADMIN,
        "admin_password": PASSWORD,
        "country_code": "NG",
    },
)["org_id"]
state["token"] = call("POST", "/auth/login", {"identifier": ADMIN, "password": PASSWORD})["access_token"]
call("PUT", "/organisation", {"states_of_operation": ["Lagos", "FCT"], "default_pay_frequency": "monthly"})
for code, name, kind in [
    ("rent_expense", "Rent", "expense"),
    ("utilities_expense", "Utilities", "expense"),
    ("logistics_expense", "Logistics", "expense"),
    ("owner_capital", "Share Capital", "equity"),
]:
    call("POST", "/chart-of-accounts", {"code": code, "name": name, "type": kind})
for email, role in [
    ("accountant@example.com", "accountant"),
    ("payroll@example.com", "payroll_manager"),
    ("hr@example.com", "hr_manager"),
    ("auditor@example.com", "auditor"),
]:
    call("POST", "/memberships", {"email": email, "password": PASSWORD, "role": role})

# 2. Branches, departments and thirteen employees with reporting lines
branches = {
    name: call("POST", "/branches", {"name": name, "state": st, "address": address})["id"]
    for name, st, address in [
        ("Ikeja head office", "Lagos", "14 Sample Close, Ikeja"),
        ("Abuja branch", "FCT", "3 Sample Crescent, Wuse II"),
    ]
}
departments = {
    name: call("POST", "/departments", {"name": name})["id"]
    for name in ["Finance", "Sales", "Operations", "Warehouse", "Human Resources"]
}
PEOPLE = [
    # number, name, department, branch, job title, monthly gross (₦), gender
    ("ST-000", "Kemi Adewale", "Operations", "Ikeja head office", "Managing Director", 1_200_000, "female"),
    ("ST-001", "Adaeze Okafor", "Finance", "Ikeja head office", "Finance Manager", 650_000, "female"),
    ("ST-002", "Tunde Bakare", "Finance", "Ikeja head office", "Accountant", 420_000, "male"),
    ("ST-003", "Ngozi Eze", "Human Resources", "Ikeja head office", "HR Manager", 480_000, "female"),
    ("ST-004", "Ibrahim Musa", "Operations", "Abuja branch", "Operations Lead", 520_000, "male"),
    ("ST-005", "Funmilayo Adeyemi", "Sales", "Ikeja head office", "Sales Manager", 560_000, "female"),
    ("ST-006", "Chinedu Obi", "Sales", "Abuja branch", "Sales Executive", 300_000, "male"),
    ("ST-007", "Aisha Bello", "Sales", "Ikeja head office", "Sales Executive", 290_000, "female"),
    ("ST-008", "Segun Alabi", "Warehouse", "Ikeja head office", "Storekeeper", 220_000, "male"),
    ("ST-009", "Halima Yusuf", "Warehouse", "Abuja branch", "Storekeeper", 210_000, "female"),
    ("ST-010", "Emeka Nwosu", "Operations", "Ikeja head office", "Logistics Officer", 260_000, "male"),
    ("ST-011", "Bisola Ojo", "Finance", "Abuja branch", "Accounts Officer", 280_000, "female"),
    ("ST-012", "Yakubu Danjuma", "Operations", "Abuja branch", "Driver", 150_000, "male"),
]
employees: dict[str, str] = {}
for i, (number, name, dept, branch, title, monthly, gender) in enumerate(PEOPLE):
    gross = monthly * 100  # per pay period, in kobo: the engine reads pay components per period
    employees[number] = call(
        "POST",
        "/employees",
        {
            "employee_number": number,
            "full_name": name,
            "state_of_residence": "FCT" if branch == "Abuja branch" else "Lagos",
            "employment_type": "permanent",
            "date_of_joining": f"202{3 + i % 3}-0{1 + i % 9}-01",
            "basic_minor": gross * 50 // 100,
            "housing_minor": gross * 30 // 100,
            "transport_minor": gross * 20 // 100,
            "annual_rent_paid_minor": (1_200_000 + i * 150_000) * 100,
            "tin": f"2{i:07d}-0001",
            "job_title": title,
            "gender": gender,
            "email": email_for(name),
            "department_id": departments[dept],
            "branch_id": branches[branch],
            "pfa_name": "Sample PFA",
        },
    )["id"]
for report, manager in {
    "ST-001": "ST-000", "ST-003": "ST-000", "ST-004": "ST-000", "ST-005": "ST-000",
    "ST-002": "ST-001", "ST-011": "ST-001", "ST-006": "ST-005", "ST-007": "ST-005",
    "ST-008": "ST-004", "ST-009": "ST-004", "ST-010": "ST-004", "ST-012": "ST-004",
}.items():
    call("PATCH", f"/employees/{employees[report]}", {"manager_id": employees[manager]})
for dept, head in [
    ("Finance", "ST-001"), ("Human Resources", "ST-003"), ("Operations", "ST-004"),
    ("Sales", "ST-005"), ("Warehouse", "ST-004"),
]:
    call("PATCH", f"/departments/{departments[dept]}", {"manager_id": employees[head]})

# 3. Monthly pay runs, January to September 2026, each validated and locked
state["pay_runs"] = []
for month in range(1, 10):
    last = calendar.monthrange(2026, month)[1]
    run = call(
        "POST",
        "/pay-runs",
        {
            "period_start": f"2026-{month:02d}-01",
            "period_end": f"2026-{month:02d}-{last}",
            "frequency": "monthly",
            "employee_ids": list(employees.values()),
        },
    )
    call("POST", f"/pay-runs/{run['id']}/validate", {"override_variance": True})
    call("POST", f"/pay-runs/{run['id']}/lock")
    state["pay_runs"].append(run["id"])

# 4. Three leave requests made through self-service, one approved
requests = []
for number, kind, start, end, days, reason in [
    ("ST-006", "annual", "2026-11-09", "2026-11-13", 5, "Family visit to Enugu"),
    ("ST-008", "annual", "2026-12-21", "2026-12-31", 9, "End-of-year break"),
    ("ST-011", "sick", "2026-10-19", "2026-10-20", 2, "Medical appointment"),
]:
    email = email_for(next(p[1] for p in PEOPLE if p[0] == number))
    call("POST", f"/employees/{employees[number]}/create-login", {"email": email, "password": PASSWORD})
    token = call("POST", "/auth/login", {"identifier": email, "password": PASSWORD})["access_token"]
    body = {"leave_type": kind, "start_date": start, "end_date": end, "days": days, "reason": reason}
    requests.append(call("POST", "/leave-requests/me", body, token=token)["id"])
call("POST", f"/leave-requests/{requests[2]}/approve")

# 5. Customers and invoices: five paid, three outstanding
customers = {
    name: call(
        "POST",
        "/customers",
        {"name": name, "contact_email": f"accounts@{name.split()[0].lower()}.example.com", "tin": f"3{i:07d}-0001"},
    )["id"]
    for i, name in enumerate(["Harbour Retail Ltd", "Crescent Hotels Ltd", "Greenfield Schools", "Riverside Clinics"])
}
for number, customer, issued, amount, paid in [
    ("INV-0001", "Harbour Retail Ltd", "2026-07-08", 4_850_000, True),
    ("INV-0002", "Crescent Hotels Ltd", "2026-07-22", 2_300_000, True),
    ("INV-0003", "Greenfield Schools", "2026-08-05", 3_150_000, True),
    ("INV-0004", "Harbour Retail Ltd", "2026-08-19", 5_400_000, True),
    ("INV-0005", "Riverside Clinics", "2026-09-03", 1_950_000, True),
    ("INV-0006", "Crescent Hotels Ltd", "2026-09-17", 2_750_000, False),
    ("INV-0007", "Harbour Retail Ltd", "2026-10-02", 6_100_000, False),
    ("INV-0008", "Greenfield Schools", "2026-10-14", 3_400_000, False),
]:
    y, m, d = issued.split("-")
    invoice = call(
        "POST",
        "/invoices",
        {
            "customer_id": customers[customer],
            "invoice_number": number,
            "issue_date": issued,
            "due_date": f"{y}-{int(m) + 1:02d}-{d}",
            "revenue_account_code": "revenue",
            "amount_minor": amount * 100,
            "description": "Supply of goods",
        },
    )
    call("POST", f"/invoices/{invoice['id']}/send")
    if paid:
        call("POST", f"/invoices/{invoice['id']}/pay")

# 6. Vendors and bills: four paid, two approved and outstanding
vendors = {
    name: call("POST", "/vendors", {"name": name})["id"]
    for name in ["Northgate Stationers", "Bluewater Logistics", "Keystone Properties", "Brightline Utilities"]
}
for number, vendor, dated, account, amount, vat, paid in [
    ("NS-1041", "Northgate Stationers", "2026-07-10", "contractor_expense", 380_000, 28_500, True),
    ("BL-2207", "Bluewater Logistics", "2026-07-25", "logistics_expense", 920_000, 69_000, True),
    ("KP-0907", "Keystone Properties", "2026-08-01", "rent_expense", 1_500_000, 0, True),
    ("BU-0831", "Brightline Utilities", "2026-08-31", "utilities_expense", 410_000, 30_750, True),
    ("BL-2290", "Bluewater Logistics", "2026-09-20", "logistics_expense", 1_050_000, 78_750, False),
    ("KP-1007", "Keystone Properties", "2026-10-01", "rent_expense", 1_500_000, 0, False),
]:
    y, m, d = dated.split("-")
    bill = call(
        "POST",
        "/bills",
        {
            "vendor_id": vendors[vendor],
            "bill_number": number,
            "bill_date": dated,
            "due_date": f"{y}-{int(m) + 1:02d}-{min(int(d), 28):02d}",
            "expense_account_code": account,
            "amount_minor": amount * 100,
            "vat_minor": vat * 100,
            "description": "Monthly charge",
        },
    )
    call("POST", f"/bills/{bill['id']}/approve")
    if paid:
        call("POST", f"/bills/{bill['id']}/pay")

# 7. Opening capital, a bank account and a statement, three lines of it matched
call(
    "POST",
    "/general-ledger/journal-entries",
    {
        "description": "Opening share capital",
        "lines": [
            {"account_code": "cash", "debit_minor": 25_000_000_00, "description": "Capital paid in"},
            {"account_code": "owner_capital", "credit_minor": 25_000_000_00},
        ],
    },
)
bank = call(
    "POST",
    "/company-bank-accounts",
    {
        "bank_name": "Sample Bank",
        "account_number": "0000012345",
        "account_name": "Sample Trading Ltd - Operating",
        "chart_account_code": "cash",
    },
)["id"]
for dated, description, amount in [
    ("2026-07-15", "Harbour Retail Ltd - INV-0001", 4_850_000),
    ("2026-07-30", "Crescent Hotels Ltd - INV-0002", 2_300_000),
    ("2026-08-12", "Northgate Stationers - NS-1041", -408_500),
    ("2026-08-20", "Greenfield Schools - INV-0003", 3_150_000),
    ("2026-09-02", "Keystone Properties - KP-0907", -1_500_000),
    ("2026-09-30", "Bank charges", -7_500),
]:
    call(
        "POST",
        f"/company-bank-accounts/{bank}/statement-lines",
        {"statement_date": dated, "description": description, "amount_minor": amount * 100},
    )
reconciliation = call("GET", f"/company-bank-accounts/{bank}/reconciliation")
ledger = reconciliation["unmatched_ledger_entries"]
for line in reconciliation["unmatched_statement_lines"]:
    if not any(ref in line["description"] for ref in ("NS-1041", "INV-0003", "KP-0907")):
        continue
    for entry in ledger:
        if (entry.get("debit_minor") or 0) - (entry.get("credit_minor") or 0) == line["amount_minor"]:
            call("POST", f"/company-bank-accounts/{bank}/statement-lines/{line['id']}/match", {"ledger_entry_id": entry["id"]})
            ledger.remove(entry)
            break

# 8. Inventory: two warehouses, five items, a received order, an open order, a draft, an issue and a transfer
call("PUT", "/inventory/settings", {"enabled": True})
pieces = next(u["id"] for u in call("GET", "/inventory/units") if u["code"] == "PCS")
categories = {
    name: call("POST", "/inventory/categories", {"name": name})["id"]
    for name in ["Packaged foods", "Beverages", "Office supplies"]
}
warehouses = {
    code: call("POST", "/inventory/warehouses", {"code": code, "name": name, "address": address})["id"]
    for code, name, address in [
        ("LAG-01", "Ikeja main store", "14 Sample Close, Ikeja"),
        ("ABJ-01", "Abuja branch store", "3 Sample Crescent, Wuse II"),
    ]
}
supplier = call("POST", "/vendors", {"name": "Savannah Foods Wholesale"})["id"]
items: dict[str, tuple[str, bool]] = {}
for sku, name, category, cost, reorder, lots in [
    ("RICE-50", "Parboiled rice, 50 kg bag", "Packaged foods", 78_000, 20, False),
    ("OIL-25", "Vegetable oil, 25 L keg", "Packaged foods", 54_000, 15, True),
    ("SUGAR-50", "Granulated sugar, 50 kg bag", "Packaged foods", 61_000, 10, False),
    ("WATER-12", "Table water, carton of 12", "Beverages", 2_400, 100, True),
    ("PAPER-A4", "A4 paper, 80gsm (ream)", "Office supplies", 5_000, 20, False),
]:
    item = call(
        "POST",
        "/inventory/items",
        {
            "sku": sku,
            "name": name,
            "item_type": "stock",
            "base_unit_id": pieces,
            "category_id": categories[category],
            "reorder_level": reorder,
            "default_cost_minor": cost * 100,
            "preferred_vendor_id": supplier,
            "track_lots": lots,
            "track_expiry": lots,
        },
    )
    items[sku] = (item["id"], lots)


def issued_order(warehouse: str, dated: str, lines: list[tuple[str, int, int]], reference: str) -> dict:
    order = call(
        "POST",
        "/inventory/purchase-orders",
        {
            "vendor_id": supplier,
            "warehouse_id": warehouses[warehouse],
            "order_date": dated,
            "expected_date": dated,
            "vendor_reference": reference,
            "lines": [{"item_id": items[s][0], "quantity": q, "unit_price_minor": p * 100} for s, q, p in lines],
        },
    )
    call("POST", f"/inventory/purchase-orders/{order['id']}/submit")
    call("POST", f"/inventory/purchase-orders/{order['id']}/approve", {"comment": "Within budget"})
    call("POST", f"/inventory/purchase-orders/{order['id']}/issue")
    return call("GET", f"/inventory/purchase-orders/{order['id']}")


received = issued_order(
    "LAG-01",
    "2026-09-05",
    [("RICE-50", 60, 78_000), ("OIL-25", 40, 54_000), ("SUGAR-50", 30, 61_000), ("WATER-12", 400, 2_400)],
    "SFW-5521",
)
receipt_lines = []
for line in received["lines"]:
    sku = next(s for s, (item_id, _) in items.items() if item_id == line["item_id"])
    receipt_line = {"po_line_id": line["id"], "accepted_quantity": line["quantity"]}
    if items[sku][1]:
        receipt_line |= {"lot_number": f"LOT-{sku[:3]}-0926", "expiry_date": "2027-09-30"}
    receipt_lines.append(receipt_line)
receipt = call(
    "POST",
    "/inventory/goods-receipts",
    {
        "purchase_order_id": received["id"],
        "warehouse_id": warehouses["LAG-01"],
        "receipt_date": "2026-09-08",
        "supplier_reference": "DN-88213",
        "lines": receipt_lines,
    },
)
call("POST", f"/inventory/goods-receipts/{receipt['id']}/post")
state["grn"] = receipt["id"]
state["po_open"] = issued_order("ABJ-01", "2026-10-20", [("RICE-50", 25, 79_500), ("WATER-12", 200, 2_450)], "SFW-5604")["id"]
call(
    "POST",
    "/inventory/purchase-orders",
    {
        "vendor_id": vendors["Northgate Stationers"],
        "warehouse_id": warehouses["LAG-01"],
        "order_date": "2026-10-24",
        "lines": [{"item_id": items["PAPER-A4"][0], "quantity": 40, "unit_price_minor": 5_000_00}],
    },
)

issue = call(
    "POST",
    "/inventory/issues",
    {
        "warehouse_id": warehouses["LAG-01"],
        "issue_date": "2026-09-15",
        "purpose": "Samples for retail trade fair",
        "lines": [{"item_id": items["WATER-12"][0], "quantity": 40}, {"item_id": items["RICE-50"][0], "quantity": 2}],
    },
)
call("POST", f"/inventory/issues/{issue['id']}/submit")
if call("GET", f"/inventory/issues/{issue['id']}")["status"] != "approved":
    call("POST", f"/inventory/issues/{issue['id']}/approve", {"comment": "Approved"})
call("POST", f"/inventory/issues/{issue['id']}/post")

transfer = call(
    "POST",
    "/inventory/transfers",
    {
        "from_warehouse_id": warehouses["LAG-01"],
        "to_warehouse_id": warehouses["ABJ-01"],
        "transfer_date": "2026-09-22",
        "notes": "Restock Abuja",
        "lines": [{"item_id": items["RICE-50"][0], "quantity": 15}, {"item_id": items["SUGAR-50"][0], "quantity": 8}],
    },
)
call("POST", f"/inventory/transfers/{transfer['id']}/submit")
call("POST", f"/inventory/transfers/{transfer['id']}/dispatch", {"dispatch_date": "2026-09-22"})
lines = call("GET", f"/inventory/transfers/{transfer['id']}")["lines"]
call(
    "POST",
    f"/inventory/transfers/{transfer['id']}/receive",
    {
        "receipt_date": "2026-09-24",
        "lines": [{"line_id": l["id"], "received_quantity_base": l.get("quantity_base") or l["quantity"]} for l in lines],
    },
)

with open(sys.argv[1], "w") as f:
    json.dump(state, f, indent=2)
print("Seeded Sample Trading Ltd:", state["org_id"])
