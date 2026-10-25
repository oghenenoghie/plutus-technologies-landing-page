# Documentation screenshots

The screenshots on `/docs` (in `public/docs/screens`) come from a local Plutus Cloud app filled with a fictional company, **Sample Trading Ltd**. Re-take them when the app's screens change.

Everything here runs against local services only. Never point it at production: `seed.py` signs up an organisation, locks pay runs and posts to the ledger.

1. **API and database.** In a `plutus-hr-system` checkout, start PostgreSQL, create an empty database and start the API on port 8000, connected as an ordinary role. The steps are in `plutus-hr-system-frontend/e2e/README.md`. Set `SCHEDULER_ENABLED=false`, and a long `JWT_ACCESS_TTL_MINUTES` (such as 720) so the session outlasts the capture.
2. **The app.** In `plutus-hr-system-frontend`:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1 npm run build
   npx next start -p 3100   # the API allows this origin by default
   ```

3. **Sample data.** From the `plutus-hr-system` checkout, so its virtual environment supplies `httpx`:

   ```bash
   uv run python /path/to/this/folder/seed.py state.json
   ```

4. **Screenshots.** `capture.js` needs the `playwright` package and its Chromium:

   ```bash
   node capture.js state.json out/
   python3 to-webp.py out/ ../../public/docs/screens
   ```

5. Run `npm test`. It checks every screenshot `src/lib/docs.ts` names exists, at the size it declares.

The dates in the sample data are fixed (January to October 2026), but some screens show the day the data was posted, which is the day you run `seed.py`.
