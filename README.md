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
- `src/lib/countries.ts`: the country catalogue, mirroring `plutus-hr-system` `app/compliance/multicountry.py` and `docs/countries/README.md`. Payroll is active in all six: Nigeria on its own rule versions, the other five on owner-approved engine rule sets with Tax Settings. Their VAT and withholding tax aren't approved.
- `src/components/sections/`: one file per section, shared across pages. Only the invoice instrument, role tabs, mobile nav and copy buttons are client components.
- `/docs`: the product documentation. `src/lib/docs.ts` holds every guide (steps, menu paths, roles, screenshots); `src/app/docs/` renders the index and one page per guide (`/docs/getting-started`, `/accounting`, `/inventory`, `/payroll`, `/people`, `/analytics`, `/desktop`). Screenshots are WebP files in `public/docs/screens`, taken from a local Cloud app filled with a fictional company. `scripts/docs-screens/` re-creates them; `npm test` checks each one exists at the size `docs.ts` declares. `/docs/tax-rules` shows every country's payroll rules (bands, contributions and levies, Tax Settings, sources) from `src/data/country-rules.json`, which `scripts/country-rules/export.py` writes from a `plutus-hr-system` checkout: re-run it whenever the app's rules change. Nothing in it is typed by hand.

## Before launch

- The new Cloud web app (`plutus-hr-system-frontend`) has no public deployment yet, so the Cloud buttons read "Request Cloud access" and go to the contact page. Once it is live, set `CLOUD_APP_URL` in `src/lib/site.ts` to its sign-in URL (ideally on a custom domain such as `app.plutusng.com`, without Vercel Deployment Protection in front of visitors); the buttons then read "Open Plutus Cloud".
- `LINKS.desktop` points to `releases/latest/download/<installer>` on `desktop_plutus_hr-frontend` (`Plutus-Technologies-Setup.exe`, `Plutus-Technologies-mac.dmg`, `Plutus-Technologies-linux.AppImage`). These links work once that repo has a published GitHub release carrying those files, and always serve the newest release.
- `LINKS.desktop` serves the latest `desktop_plutus_hr-frontend` release (`desktop-v0.1.0-build.54` or later as of November 2026). Since build 54 it has Tax Settings and payroll in all six countries, as well as Inventory, Analytics & Insights, Country Compliance, the country choice at sign-up, and the installer and update fixes on `/editions`; the Linux AppImage no longer needs libfuse2. `DESKTOP_DOWNLOADS_ENABLED` in `src/lib/site.ts` greys out every download button (the Cloud & Desktop page's three and the homepage's) if the release ever has to be pulled.
- VAT, CIT and the development levy are now in the statutory reference (§8 and §13). The small-company turnover limit is disputed: the Nigeria Tax Act as enacted says ₦50m, the Tax Administration Act and the reform committee say ₦100m. The site uses ₦100m by owner decision; revisit if the NRS rules otherwise.
- The feature map in `platform.tsx` mirrors the app's own Full Feature Map (`plutus-hr-system-frontend`, `src/lib/nav.ts`) as of 13 October 2026, including the new Inventory module. Update both together when screens are added.
- The docs describe the app after the accountant's review of 11 November 2026 (`plutus-hr-system` #69, `plutus-hr-system-frontend` #66, the matching Desktop pull requests): pay runs are checked, posted and paid from their own page; pay is entered per pay period; accounts are numbered by range; the balance sheet is vertical with a Profit and Loss Reserve; and fixed assets take a depreciation method, leases and a year-end run. Several screenshots (chart of accounts, statements, the New Employee form, pay runs) predate those screens and should be retaken.
- Add a real demo-request endpoint (Route Handler → email/CRM) before turning the contact block into a form.
- Re-confirm the tax-matrix deadlines against primary agency guidance.
