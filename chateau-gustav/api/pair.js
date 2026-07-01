// api/pair.js
// Runs on Vercel's servers. Holds your API key, checks your own data first,
// and only calls Claude when nothing cheaper can answer.

import { getCurated, getCached, setCached, checkRateLimit } from "../lib/pairings.js";

const SOMMELIER_SYSTEM =
  "You are an expert sommelier with WSET Level 3 knowledge and a deep understanding " +
  "of flavor chemistry. You reason about how acidity, fat, umami, salt, sweetness, " +
  "tannin, alcohol, body, and spice interact between a dish and a wine. You go far " +
  "deeper than generic pairing charts — you distinguish a ribeye with chimichurri " +
  "from a filet with bearnaise, and you explain the 'why' clearly and concisely.";

function buildFoodPrompt(i) {
  const spiceMap = ["none", "low", "medium", "high", "very high"];
  const spice = spiceMap[i.spice] || "low";
  return `A user is eating:
- Protein: ${i.protein || "unspecified"}${i.cut ? ` (${i.cut})` : ""}
- Sauce: ${i.sauce || "none"}
- Side: ${i.side || "none specified"}
${i.cuisine ? `- Cuisine: ${i.cuisine}` : ""}
- Spice level: ${spice}
- Budget: ${i.budget || "no preference"}

Analyze the flavor chemistry of this specific dish and recommend the top 3 wine pairings.

Respond ONLY with valid JSON (no markdown, no backticks) in this exact structure:
{
  "dishSummary": "brief characterization of the dish's flavor profile",
  "pairings": [
    {
      "wine": "Specific wine name",
      "region": "Classic region or style",
      "score": 94,
      "why": "2-3 sentences tied to the specific dish components",
      "attributes": ["High acidity", "Citrus-driven", "Mineral finish"],
      "budgetNote": "optional price-range note"
    }
  ],
  "avoid": ["style to avoid", "another", "third"],
  "sommelierNote": "2-3 sentences of surprising, nuanced insight for this specific pairing."
}`;
}

function buildWinePrompt(i) {
  return `The user has a wine:
- Grape: ${i.grape || "unspecified"}
${i.region ? `- Region: ${i.region}` : ""}
- Body: ${i.body || "unknown"}
- Acidity: ${i.acid || "unknown"}
- Tannin: ${i.tannin || "unknown"}
- Sweetness: ${i.sweet || "unknown"}
- Oak: ${i.oak || "unknown"}

Based on its structure, recommend the top 3 food pairings and dishes to avoid.

Respond ONLY with valid JSON (no markdown, no backticks) in this exact structure:
{
  "wineSummary": "brief characterization of this wine's profile and structure",
  "pairings": [
    {
      "food": "Specific dish or food",
      "score": 96,
      "why": "2-3 sentences on the chemistry of why it works",
      "attributes": ["Cuts through fat", "Matches weight"]
    }
  ],
  "avoid": ["food to avoid", "another", "third"],
  "sommelierNote": "2-3 sentences about this wine's most underrated pairing or a common mistake."
}`;
}

async function callClaude(mode, inputs, apiKey) {
  const prompt = mode === "wine" ? buildWinePrompt(inputs) : buildFoodPrompt(inputs);

  const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      system: SOMMELIER_SYSTEM,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!apiResponse.ok) {
    const errText = await apiResponse.text();
    throw new Error(`Anthropic API ${apiResponse.status}: ${errText}`);
  }

  const data = await apiResponse.json();
  const text = (data.content || [])
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("");
  const clean = text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);
  parsed.source = "ai";
  return parsed;
}

export default async function handler(req, res) {
  // ── CORS ────────────────────────────────────────────────────────────
  // The website calls this from the same domain, so it never needed this
  // before. The native app's web content runs from a different origin
  // (capacitor://localhost on iOS, http://localhost on Android), so the
  // browser/WebView will silently block the response without this.
  // This endpoint has no auth and is already rate-limited, so a public
  // wildcard is reasonable here.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ── Rate limit (protects your Anthropic bill) ──────────────────────────
  // Vercel's edge sets the real client IP as the first entry in
  // x-forwarded-for, so this is trustworthy in this environment.
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const rate = await checkRateLimit(ip);
  if (!rate.allowed) {
    return res.status(429).json({
      error: "You've made a lot of searches recently. Please wait a few minutes and try again.",
    });
  }

  try {
    const { mode, inputs } = req.body || {};
    if (!mode || !inputs) {
      return res.status(400).json({ error: "Missing mode or inputs." });
    }

    // ── Layer 1: curated (free, instant) ──────────────────────────────────
    const curated = getCurated(mode, inputs);
    if (curated) return res.status(200).json(curated);

    // ── Layer 2: cache (free, instant) ────────────────────────────────────
    const cached = await getCached(mode, inputs);
    if (cached) return res.status(200).json(cached);

    // ── Layer 3: Claude (costs money) ─────────────────────────────────────
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Server is missing its API key." });
    }

    const result = await callClaude(mode, inputs, apiKey);

    // Store for next time so this exact query is free going forward.
    await setCached(mode, inputs, result);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Something went wrong generating pairings." });
  }
}
