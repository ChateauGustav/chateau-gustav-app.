// lib/pairings.js
// The brains of the cost-saving layer. Order of operations in api/pair.js:
//   1. Curated lookup (free, instant, your expertise)
//   2. Cache lookup (free, instant, a repeat of a previous AI answer)
//   3. Claude (costs money — only for novel/specific queries)

import { CURATED } from "../data/curated-pairings.js";

const CACHE_VERSION = "cg-v1"; // bump this to invalidate all cached AI answers
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

// ── Normalization ────────────────────────────────────────────────────────
function norm(s) {
  return (s == null ? "" : String(s)).trim().toLowerCase().replace(/\s+/g, " ");
}

// ── Curated layer ──────────────────────────────────────────────────────────
// Food is keyed on the three biggest flavor drivers: protein|cut|sauce.
// Wine is keyed on grape.
function curatedKey(mode, inputs) {
  if (mode === "wine") return norm(inputs.grape);
  return [inputs.protein, inputs.cut, inputs.sauce].map(norm).join("|");
}

// A curated baseline answer is only honest when the user hasn't specified
// secondary attributes that would change the recommendation. If they have,
// we skip curated and let Claude account for them (then cache the result).
function isSpecificQuery(mode, inputs) {
  if (mode === "wine") {
    const sweet = norm(inputs.sweet);
    return Boolean(norm(inputs.region)) || sweet === "off-dry" || sweet === "sweet";
  }
  const spice = Number.isFinite(inputs.spice) ? inputs.spice : 1;
  return (
    Boolean(norm(inputs.side)) ||
    Boolean(norm(inputs.cuisine)) ||
    spice >= 2 ||
    Boolean(norm(inputs.budget))
  );
}

export function getCurated(mode, inputs) {
  if (isSpecificQuery(mode, inputs)) return null;
  const table = CURATED[mode] || {};
  const hit = table[curatedKey(mode, inputs)];
  return hit ? { ...hit, source: "curated" } : null;
}

// ── Cache layer (Vercel KV, optional & graceful) ────────────────────────────
// If KV isn't configured, caching is silently skipped and everything still
// works — you just pay for every non-curated query until you add KV.
function fullCacheKey(mode, inputs) {
  const parts =
    mode === "wine"
      ? [inputs.grape, inputs.region, inputs.body, inputs.acid, inputs.tannin, inputs.sweet, inputs.oak]
      : [inputs.protein, inputs.cut, inputs.sauce, inputs.side, inputs.cuisine, inputs.spice, inputs.budget];
  return `${CACHE_VERSION}:${mode}:${parts.map(norm).join("|")}`;
}

async function getKv() {
  if (!process.env.KV_REST_API_URL) return null; // KV not set up — skip
  try {
    const mod = await import("@vercel/kv");
    return mod.kv;
  } catch {
    return null; // package not installed — skip
  }
}

export async function getCached(mode, inputs) {
  const kv = await getKv();
  if (!kv) return null;
  try {
    const val = await kv.get(fullCacheKey(mode, inputs));
    return val ? { ...val, source: "cache" } : null;
  } catch (err) {
    console.error("Cache read failed (continuing):", err);
    return null;
  }
}

export async function setCached(mode, inputs, value) {
  const kv = await getKv();
  if (!kv) return;
  try {
    await kv.set(fullCacheKey(mode, inputs), value, { ex: CACHE_TTL_SECONDS });
  } catch (err) {
    console.error("Cache write failed (continuing):", err);
  }
}

// ── Rate limiting (protects your Anthropic bill from abuse) ────────────────
// Caps how many requests a single visitor (by IP) can make in a rolling
// window. This counts EVERY request, not just ones that reach Claude — that
// keeps the math simple and puts a hard ceiling on worst-case cost per IP:
// even if every single request happened to be a brand-new, never-cached
// question, one visitor still can't generate more than RATE_LIMIT_MAX_REQUESTS
// worth of AI calls per window.
//
// Fails OPEN: if Redis is unreachable or not configured, requests are
// allowed through rather than blocking everyone. A rate limiter going down
// should never be the reason your whole app goes down.
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 30; // per IP, per window

export async function checkRateLimit(ip) {
  const kv = await getKv();
  if (!kv) return { allowed: true }; // no Redis configured — skip limiting

  try {
    const key = `ratelimit:${ip || "unknown"}`;
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, RATE_LIMIT_WINDOW_SECONDS);
    }
    if (count > RATE_LIMIT_MAX_REQUESTS) {
      return { allowed: false };
    }
    return { allowed: true };
  } catch (err) {
    console.error("Rate limit check failed (allowing request):", err);
    return { allowed: true }; // fail open
  }
}
