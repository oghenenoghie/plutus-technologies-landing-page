"""Export every country's payroll rules from a plutus-hr-system checkout, for the /docs/tax-rules
page: Nigeria's rule version (NG-2026.1), and the engine rule sets of Ghana, Kenya, Rwanda,
The Gambia and Côte d'Ivoire.

    cd ../plutus-hr-system
    PYTHONPATH=. uv run python ../plutus-technologies-landing-page/scripts/country-rules/export.py \
        ../plutus-technologies-landing-page/src/data/country-rules.json

Every figure comes from the app's own rule set templates (app/compliance/engine/countries), built
the way the Tax Settings screen builds them. Each Tax Setting is then varied on its own, and every
figure it changes is recorded with the values the setting's options give it, or as entered by the
company when the setting has no fixed options. The page shows those instead of a placeholder.
"""

import json
import subprocess
import sys
from dataclasses import asdict

from app.api.v1.tax_settings import _paragraphs, _rules_out
from app.compliance.engine.countries import TEMPLATES
from app.compliance.engine.settings import SettingKind, _bounds, display_setting
from app.compliance.multicountry import get_country_profile
from app.compliance.versions.ng_2026_1 import NG_2026_1
from app.domain.money import minor_units_exponent

LINE_FIELDS = (
    "base",
    "rate_ppm",
    "amount_minor",
    "base_floor_minor",
    "base_ceiling_minor",
    "amount_floor_minor",
    "amount_cap_minor",
    "applies_to",
    "tax_deductible",
    "due",
)


def build(template, values):
    try:
        return template.build(values)
    except Exception:  # a combination the template refuses
        return None


def snapshot(rule_set) -> dict:
    """The figures the page shows: income tax, then each line by code."""
    out = _rules_out(rule_set).model_dump()
    rules = {c.code: c for c in rule_set.contributions}
    lines = {
        line["code"]: {
            **line,
            "base_floor_minor": rules[line["code"]].base_floor_minor if line["code"] in rules else 0,
            "tax_deduction_group": rules[line["code"]].tax_deduction_group if line["code"] in rules else None,
        }
        for line in out["lines"]
    }
    tax = rule_set.income_tax
    income_tax = {
        **out["income_tax"],
        "band_rounding": tax.band_rounding.value,
        "taxable": sorted(c.value for c in tax.taxable_categories),
        "deduction_caps": [asdict(cap) for cap in tax.deduction_caps],
        "reliefs": [
            {"code": r.code, "fact": r.fact.value, "rate_ppm": r.rate_ppm, "cap_minor": r.cap_minor, "source": r.source}
            for r in tax.reliefs
        ],
    }
    return {"income_tax": income_tax, "lines": lines}


def figures(snap: dict) -> dict[str, object]:
    """Flatten a snapshot to {figure id: value}, the unit dependencies are tracked in."""
    flat: dict[str, object] = {}
    tax = snap["income_tax"]
    for i, band in enumerate(tax["bands"]):
        flat[f"tax.band.{i}.up_to_minor"] = band["up_to_minor"]
        flat[f"tax.band.{i}.rate_ppm"] = band["rate_ppm"]
    flat["tax.band_count"] = len(tax["bands"])
    flat["tax.due"] = tax["due"]
    for code, line in snap["lines"].items():
        flat[f"line.{code}.present"] = True
        for field in LINE_FIELDS:
            flat[f"line.{code}.{field}"] = line[field]
    return flat


def trial_values(spec, current: str) -> tuple[list[str], bool]:
    """Values to try for a setting, and whether they are its fixed options."""
    if spec.kind is SettingKind.CHOICE or len(spec.options) > 1:
        return [o.value for o in spec.options], True
    # A free entry, or a single suggested figure the company confirms: nudge it to see what moves.
    low, high = _bounds(spec)
    tries = {current, str(int(current) + 1)}
    if low is not None:
        tries.add(str(low))
    if high is not None:
        tries.add(str(high))
    return sorted(tries), bool(spec.options)


def export(template) -> dict:
    profile = get_country_profile(template.country)
    base_values = template.preview_values()
    rule_set = template.build(base_values)
    base = snapshot(rule_set)
    base_flat = figures(base)

    # figure id -> {setting key: [values under that setting's options] or None (entered freely)}
    variable: dict[str, dict[str, list | None]] = {}
    extra_lines: dict[str, dict] = {}
    for spec in template.settings:
        tries, fixed = trial_values(spec, base_values[spec.key])
        seen: dict[str, list] = {}
        for value in tries:
            other = build(template, {**base_values, spec.key: value})
            if other is None:
                continue
            snap = snapshot(other)
            for code, line in snap["lines"].items():
                if code not in base["lines"]:
                    extra_lines.setdefault(code, line)
            flat = figures(snap)
            for key in set(base_flat) | set(flat):
                if key.startswith("line.") and not key.endswith(".present"):
                    # A line's figures are compared only where the line exists; its presence is its own figure.
                    if not flat.get(f"line.{key.split('.')[1]}.present"):
                        continue
                seen.setdefault(key, [])
                v = flat.get(key, False if key.endswith(".present") else None)
                if v not in seen[key]:
                    seen[key].append(v)
        for key, values in seen.items():
            if key.startswith("line.") and not key.endswith(".present") and key not in base_flat:
                values = values if len(values) > 1 else []  # a line only some settings add: keep what moves
            if len(values) > 1 or (values and values[0] != base_flat.get(key)):
                if len(spec.options) == 1:
                    # One suggested figure: show it, as the company confirms it rather than chooses.
                    values = [base_flat.get(key)]
                variable.setdefault(key, {})[spec.key] = values if fixed else None

    def var(prefix: str) -> dict:
        return {k[len(prefix):]: v for k, v in variable.items() if k.startswith(prefix)}

    lines = [
        {**line, "variable": var(f"line.{code}.")}
        for code, line in list(base["lines"].items()) + list(extra_lines.items())
    ]

    settings = []
    for spec in template.settings:
        low, high = _bounds(spec)
        free = spec.kind is not SettingKind.CHOICE and not spec.options
        affected = sorted({k.split(".")[1] if k.startswith("line.") else "income tax" for k, v in variable.items() if spec.key in v})
        settings.append(
            {
                "key": spec.key,
                "label": spec.label,
                "help": " ".join(spec.help.split()),
                "kind": spec.kind.value,
                "options": [
                    {
                        "label": o.label,
                        "source": o.source,
                        "display": display_setting(spec, o.value, currency=profile.currency),
                    }
                    for o in spec.options
                ],
                "minimum": display_setting(spec, str(low), currency=profile.currency) if free and low is not None else None,
                "maximum": display_setting(spec, str(high), currency=profile.currency) if free and high is not None else None,
                "required_when": {"key": spec.required_when[0], "value": spec.required_when[1]} if spec.required_when else None,
                "affects": affected,
            }
        )

    approval = rule_set.approval
    return {
        "id": template.id,
        "country": template.country,
        "country_name": profile.name,
        "currency": profile.currency,
        "exponent": minor_units_exponent(profile.currency),
        "effective_from": template.effective_from.isoformat(),
        "effective_to": template.effective_to.isoformat() if template.effective_to else None,
        "tax_year_start_month": rule_set.tax_year_start_month,
        "frequencies": sorted(f.value for f in rule_set.frequencies),
        "approval": {
            "basis": approval.basis.value,
            "approved_by": approval.approved_by,
            "approved_on": approval.approved_on.isoformat() if approval.approved_on else None,
            "reviewed_by": approval.reviewed_by,
        },
        "summary": _paragraphs(template.summary),
        "income_tax": {**base["income_tax"], "variable": var("tax.")},
        "lines": lines,
        "settings": settings,
        "sources": [
            {"id": s.id, "title": s.title, "reference": s.reference, "official": s.official}
            for s in rule_set.sources
        ],
    }


commit = subprocess.run(["git", "rev-parse", "--short", "HEAD"], capture_output=True, text=True).stdout.strip()
data = {
    "source": {"repository": "plutus-hr-system", "commit": commit},
    # Nigeria runs on its own rule version, the one the Compliance Engine screen shows.
    "nigeria": NG_2026_1.model_dump(mode="json"),
    "rule_sets": [export(t) for t in TEMPLATES],
}
with open(sys.argv[1], "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"Exported {len(data['rule_sets'])} rule sets from plutus-hr-system {commit}")
