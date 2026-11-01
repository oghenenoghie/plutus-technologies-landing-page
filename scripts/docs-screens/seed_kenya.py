"""Add a fictional Kenyan organisation, Sample Trading Kenya Ltd, to a LOCAL Plutus API for the
/docs screenshots of Tax Settings and engine-country payslips. Run it after seed.py.

Never point this at production: it signs up an organisation, enters its Tax Settings and locks
eight pay runs.

    uv run python <this file> state.json      # run from the plutus-hr-system checkout

Adds the ids capture.js needs to state.json.
"""

import calendar
import json
import sys

import httpx

API = "http://localhost:8000/api/v1"
PASSWORD = "Sample-pass-2026!"
ADMIN = "admin-ke@example.com"

client = httpx.Client(timeout=60)
with open(sys.argv[1]) as f:
    state = json.load(f)
token = ""


def call(method: str, route: str, data: object = None):
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    r = client.request(method, API + route, json=data, headers=headers)
    if r.status_code >= 300:
        sys.exit(f"{method} {route} -> {r.status_code} {r.text[:400]}")
    return r.json() if r.content else None


state["ke_org_id"] = call(
    "POST",
    "/organisation/signup",
    {
        "org_name": "Sample Trading Kenya Ltd",
        "org_address": "21 Sample Road, Westlands, Nairobi",
        "admin_email": ADMIN,
        "admin_password": PASSWORD,
        "country_code": "KE",
    },
)["org_id"]
token = call("POST", "/auth/login", {"identifier": ADMIN, "password": PASSWORD})["access_token"]

# Kenya's rule set (KE-2026.1, from 1 February 2026) leaves three figures to each organisation.
call(
    "POST",
    "/compliance/tax-settings",
    {
        "effective_from": "2026-02-01",
        "values": {"nssf_tax_deductible": "yes", "nita_applies": "yes", "nita_due_day": "10"},
        "note": "Confirmed with our payroll adviser",
    },
)

department = call("POST", "/departments", {"name": "Operations"})["id"]
employees = []
for i, (name, title, monthly) in enumerate(
    [
        ("Wanjiru Kamau", "Country Manager", 480_000),
        ("Otieno Ochieng", "Accountant", 210_000),
        ("Achieng Odhiambo", "Sales Executive", 140_000),
        ("Kiprop Cheruiyot", "Storekeeper", 85_000),
        ("Njeri Mwangi", "Logistics Officer", 95_000),
    ]
):
    gross = monthly * 100  # per pay period, in cents
    employees.append(
        call(
            "POST",
            "/employees",
            {
                "employee_number": f"KE-{i + 1:03d}",
                "full_name": name,
                "state_of_residence": "Nairobi",
                "employment_type": "permanent",
                "date_of_joining": f"202{4 + i % 2}-0{1 + i}-01",
                "basic_minor": gross * 60 // 100,
                "housing_minor": gross * 25 // 100,
                "transport_minor": gross * 15 // 100,
                "tin": f"A00{i}123456Z",
                "job_title": title,
                "department_id": department,
                "is_expatriate": False,
            },
        )["id"]
    )

# Monthly pay runs, February to September 2026, each validated and locked
state["ke_pay_runs"] = []
for month in range(2, 10):
    last = calendar.monthrange(2026, month)[1]
    run = call(
        "POST",
        "/pay-runs",
        {
            "period_start": f"2026-{month:02d}-01",
            "period_end": f"2026-{month:02d}-{last}",
            "frequency": "monthly",
            "employee_ids": employees,
        },
    )
    call("POST", f"/pay-runs/{run['id']}/validate", {"override_variance": True})
    call("POST", f"/pay-runs/{run['id']}/lock")
    state["ke_pay_runs"].append(run["id"])

with open(sys.argv[1], "w") as f:
    json.dump(state, f, indent=2)
print("Seeded Sample Trading Kenya Ltd:", state["ke_org_id"])
