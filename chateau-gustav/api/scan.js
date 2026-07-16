// api/scan.js
// Accepts a base64-encoded wine label photo from the mobile app,
// sends it to Claude Vision, and returns structured wine information.
// Same CORS and rate-limiting patterns as pair.js.

import { checkRateLimit } from "../lib/pairings.js";

const SCAN_PROMPT = `You are an expert sommelier examining a wine label photograph.

Analyze this wine label carefully and respond ONLY with valid JSON — no markdown, no backticks, no preamble.

If you can identify a wine label, use this structure:
{
  "found": true,
  "name": "Full wine name as it appears on the label",
  "producer": "Winery or producer name",
  "vintage": "Year as a string, or null if not visible",
  "grape": "Primary grape varietal or blend",
  "region": "Region and country",
  "appellation": "Specific appellation or designation if visible, otherwise null",
  "style": "Red, White, Rosé, Sparkling, or Dessert",
  "alcohol": "ABV percentage if visible, otherwise null",
  "tastingNotes": "2–3 sentences describing the expected taste and aroma profile of this specific wine",
  "serveTemp": "Recommended serving temperature as a short phrase, e.g. 16–18°C / 61–64°F",
  "decant": "Yes or No, followed by a brief reason",
  "pairings": ["Food pairing 1", "Food pairing 2", "Food pairing 3"],
  "sommelierNote": "One memorable, insightful sentence about this wine's character or story",
  "grapeNormalized": "The grape varietal name in lowercase, matching the app's wine list if possible — e.g. cabernet sauvignon, pinot noir, champagne / sparkling",
  "drinkingWindow": "The range of years during which this wine is best enjoyed, e.g. '2024–2030', or 'Drink now', or 'Best after 2027'. Base this on the grape, region, producer reputation, and vintage if visible. If genuinely unknown, return null.",
  "peakDate": "The year or short range when this wine will be at its absolute best, e.g. '2026–2028'. If the wine is already past peak or best drunk now, say so. If unknown, return null.",
  "peakYear": "A single 4-digit integer (not a string) for the year this wine hits its peak — the middle of the peakDate range if it's a range, or the single year if it's specific. If the wine is already past peak or should be drunk now, use the current year. If truly unknown, use null (not a string, not 0).",
  "agingAdvice": "1–2 sentences explaining this wine's aging potential — whether to cellar it, open it now, or that the window is closing."
}

If this is NOT a wine label, or you genuinely cannot read enough of the label to identify it, respond with:
{"found": false, "message": "Brief, friendly explanation of what you see or why you couldn't identify it"}

Never guess wildly. If the vintage or appellation is not legible, return null for those fields.`;

export default async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Rate limit ────────────────────────────────────────────────────
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const rate = await checkRateLimit(ip);
  if (!rate.allowed) {
    return res.status(429).json({
      error: "You've made a lot of requests recently. Please wait a few minutes and try again.",
    });
  }

  // ── Validate body ─────────────────────────────────────────────────
  const { imageData, mediaType } = req.body || {};
  if (!imageData) return res.status(400).json({ error: "No image data provided." });

  const safeMediaType = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mediaType)
    ? mediaType
    : "image/jpeg";

  // ── Call Claude Vision ────────────────────────────────────────────
  try {
    const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 800,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: safeMediaType,
                  data: imageData,
                },
              },
              {
                type: "text",
                text: SCAN_PROMPT,
              },
            ],
          },
        ],
      }),
    });

    if (!apiResponse.ok) {
      const err = await apiResponse.json().catch(() => ({}));
      console.error("Claude Vision API error:", err);
      return res.status(500).json({ error: "Failed to analyze the image. Please try again." });
    }

    const data = await apiResponse.json();
    const text = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Scan handler error:", err);
    return res.status(500).json({ error: "Something went wrong analyzing the label. Please try again." });
  }
}
