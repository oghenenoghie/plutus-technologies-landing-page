# Plutus Technologies — marketing site

Public site for plutusng.com, which sells the Plutus HR & payroll platform in **Cloud** and **Desktop** editions.
Next.js App Router, Tailwind CSS v4 and shadcn/ui conventions, using the letterhead brand (black, gold, serif wordmark).

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # PAYE golden tests (NG-2026.1)
npm run typecheck
npm run build
```

## Where things live

- `src/app/globals.css`: brand tokens (light and dark) mapped into the Tailwind theme
- `src/lib/compliance/`: rule set `NG-2026.1` and the PAYE derivation used by the hero instrument. This stands in for `packages/compliance` until the site can import the engine's rule set directly.
- `src/lib/site.ts`: contact details, navigation and the `LINKS` for the Cloud app and Desktop download
- `src/components/sections/`: one file per page section, in page order. Only the PAYE instrument, role tabs, mobile nav and copy buttons are client components.

## Before launch

- Set `LINKS.cloud` and `LINKS.download` in `src/lib/site.ts`. They currently point to the editions section.
- Confirm which of the 27 modules are live and which are roadmap. The feature map currently says "in scope".
- Add a real demo-request endpoint (Route Handler → email/CRM) before turning the contact block into a form.
- Re-confirm the scheme-matrix deadlines against primary agency guidance.
