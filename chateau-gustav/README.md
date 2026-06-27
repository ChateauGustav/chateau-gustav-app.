# Château Gustav — Wine Pairing

Intelligent wine pairing built on flavor chemistry, not lookup tables.

## How it's wired

```
Browser (public/index.html)
        │  POST /api/pair  { mode, inputs }
        ▼
Serverless function (api/pair.js)  ← your API key lives here, safely
        │
        ├─ 1. Curated lookup   (data/curated-pairings.js)  → free, instant, YOUR expertise
        ├─ 2. Cache lookup     (Vercel KV, optional)        → free, instant, a repeat answer
        └─ 3. Claude           (api.anthropic.com)          → costs money, only when needed
```

The browser never sees your API key. Most common queries never reach Claude at all.

---

## The three layers (why this saves money)

Every search hits the cheapest layer that can answer it:

1. **Curated** — `data/curated-pairings.js` holds hand-curated pairings keyed on the
   biggest flavor drivers (protein + cut + sauce, or grape). These return instantly,
   cost nothing, and are where *your* WSET palate becomes the product. This is the moat.
   It's served only when the query is "clean" — if a user adds a distinguishing detail
   (high spice, a specific cuisine, a named region), the request falls through to Claude
   so the answer actually reflects what they asked.

2. **Cache** — the first time Claude answers a novel query, the result is stored. The next
   identical query is then free. Uses Vercel KV (optional — see below). Without it,
   everything still works; you just pay for every non-curated query.

3. **Claude** — only called for genuinely new or highly specific queries.

Result label is returned in `source` ("curated" | "cache" | "ai"). Curated results show a
subtle "Curated by Château Gustav" badge in the UI.

---

## Get it running (about 15 minutes)

### 1. Get an Anthropic API key
- https://console.anthropic.com → create account → add payment → create key (`sk-ant-...`)

### 2. Install tools (one time)
Install Node.js LTS from https://nodejs.org, then:
```bash
npm install -g vercel
```

### 3. Install project dependencies
From inside the project folder:
```bash
npm install
```

### 4. Run locally
```bash
cp .env.example .env
# paste your real key after ANTHROPIC_API_KEY=
vercel dev
```
Open the local URL (usually http://localhost:3000) and test. Try the curated combos
(e.g. Beef → Ribeye → Chimichurri) — they should return instantly with the gold badge.

### 5. Deploy
```bash
vercel
vercel env add ANTHROPIC_API_KEY    # or add it in the dashboard
vercel --prod
```
You get a public URL like `chateau-gustav.vercel.app`.

---

## Turning on the cache (optional but recommended)

The cache uses Vercel KV. To enable it:

1. In your Vercel project dashboard → **Storage** → create a **KV** database.
2. Connect it to the project. Vercel automatically adds the `KV_REST_API_URL` and related
   environment variables.
3. Redeploy. That's it — `lib/pairings.js` detects KV automatically.

If you skip this, the app runs fine; it just calls Claude for every non-curated query
instead of remembering past answers.

---

## What each file does

| File | Purpose |
|------|---------|
| `public/index.html` | The front end — what users see and interact with |
| `api/pair.js` | Backend. Checks curated → cache → Claude, in that order |
| `lib/pairings.js` | Lookup logic: normalization, curated matching, cache read/write |
| `data/curated-pairings.js` | **Your curated pairings.** Edit and expand this — it's the moat |
| `.env.example` | Template for your local key |
| `package.json` | Project metadata, dependencies, scripts |

---

## Growing your moat

`data/curated-pairings.js` is the most valuable file in the project. The more high-quality
pairings you add there, the cheaper the app runs AND the more it reflects your taste rather
than a generic model. The entries shipped are a SEED built on classic principles — review
them with your own palate, fix anything you'd pour differently, and keep adding.

To add a food pairing, add a key `"protein|cut|sauce"` (lowercase, matching the dropdowns)
with a complete response object. To add a wine, key it on `"grape"`. Copy an existing entry
as a template. Redeploy with `vercel --prod` after changes.

---

## Watch your costs

- Set a **usage cap** in the Anthropic console so a runaway bill is impossible.
- Add **rate limiting** before promoting a public link (Vercel middleware can cap requests
  per visitor) — otherwise a bot can spend your money on layer-3 calls.
- The bigger your curated set and the longer the cache runs, the fewer paid calls you make.

---

## Changing the sommelier's voice

The personality lives in `SOMMELIER_SYSTEM` at the top of `api/pair.js`. Edit it to shift
tone or depth, then `vercel --prod`. Bump `CACHE_VERSION` in `lib/pairings.js` if you want
to invalidate old cached answers after a big prompt change.
