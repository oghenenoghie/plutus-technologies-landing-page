# Plutus Technologies — marketing site

Public site for plutusng.com, which sells the Plutus accounting platform (double-entry books with VAT, WHT, CIT and the development levy, plus payroll as a module) in **Cloud** and **Desktop** editions.
Next.js App Router, Tailwind CSS v4 and shadcn/ui conventions, using the letterhead brand (black, gold, serif wordmark).

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # invoice posting golden tests (NG-2026.1)
npm run typecheck
npm run build
```

## Where things live

- `src/app/globals.css`: brand tokens (light and dark) mapped into the Tailwind theme
- `src/lib/compliance/`: rule set `NG-2026.1` and the invoice posting (VAT, WHT, balanced journals) used by the hero instrument. This stands in for `packages/compliance` until the site can import the engine's rule set directly.
- `src/lib/site.ts`: contact details, navigation and the `LINKS` for the Cloud app and Desktop download
- `src/app/`: one route per page. `/` (home), `/features`, `/accounting`, `/inventory`, `/analytics`, `/payroll`, `/countries`, `/editions`, `/pricing` and `/contact`, each with its own `generateMetadata()`, plus `sitemap.ts`. The utility bar, header and footer live in `layout.tsx`.
- `src/lib/site.ts`: `FEATURE_PAGES` drives the home page cards, the footer and the sitemap; `NAV` is the header menu.
- `src/lib/countries.ts`: the country catalogue, mirroring `plutus-hr-system` `app/compliance/multicountry.py`.
- `src/components/sections/`: one file per section, shared across pages. Only the invoice instrument, role tabs, mobile nav and copy buttons are client components.

## Before launch

- The new Cloud web app (`plutus-hr-system-frontend`) has no public deployment yet, so the Cloud buttons read "Request Cloud access" and go to the contact page. Once it is live, set `CLOUD_APP_URL` in `src/lib/site.ts` to its sign-in URL (ideally on a custom domain such as `app.plutusng.com`, without Vercel Deployment Protection in front of visitors); the buttons then read "Open Plutus Cloud".
- `LINKS.desktop` points to `releases/latest/download/<installer>` on `desktop_plutus_hr-frontend` (`Plutus-Technologies-Setup.exe`, `Plutus-Technologies-mac.dmg`, `Plutus-Technologies-linux.AppImage`). These links work once that repo has a published GitHub release carrying those files, and always serve the newest release.
- `LINKS.desktop` serves the latest `desktop_plutus_hr-frontend` release. `desktop-v0.1.0-build.36` includes Inventory and the installer and update fixes on `/editions`, but not Analytics & Insights or Country Compliance (merged 24 October 2026); they reach Desktop users with the next release.
- VAT, CIT and the development levy are now in the statutory reference (§8 and §13). The small-company turnover limit is disputed: the Nigeria Tax Act as enacted says ₦50m, the Tax Administration Act and the reform committee say ₦100m. The site uses ₦100m by owner decision; revisit if the NRS rules otherwise.
- The feature map in `platform.tsx` mirrors the app's own Full Feature Map (`plutus-hr-system-frontend`, `src/lib/nav.ts`) as of 13 October 2026, including the new Inventory module. Update both together when screens are added.
- Add a real demo-request endpoint (Route Handler → email/CRM) before turning the contact block into a form.
- Re-confirm the tax-matrix deadlines against primary agency guidance.
