// api/restaurant.js
// Restaurant mode: reads a wine list photo and recommends specific wines
// from that list for the user's dish. Only recommends wines actually
// visible on the list — never invents or guesses.

import { checkRateLimit } from "../lib/pairings.js";

function buildRestaurantPrompt(dish, preferences) {
  let prefNote = '';
  if (preferences) {
    const parts = [];
    if (preferences.favoriteGrapes?.length)
      parts.push(`Preferred grapes: ${preferences.favoriteGrapes.join(', ')}`);
    if (preferences.styles?.length)
      parts.push(`Preferred styles: ${preferences.styles.join(', ')}`);
    if (preferences.budget)
      parts.push(`Budget: ${preferences.budget} USD per bottle`);
    if (preferences.avoidGrapes?.length)
      parts.push(`Prefers to avoid: ${preferences.avoidGrapes.join(', ')}`);
    if (parts.length) prefNote = `\n\nGuest preferences (factor in where relevant): ${parts.join('. ')}.`;
  }

  return `You are a sommelier at this restaurant, looking at the wine list in this photograph.

The guest is ordering: ${dish}${prefNote}

Your job:
1. Read the wine list carefully — scan every wine, vintage, and price visible in the image
2. Identify the 3 wines from THIS specific list that pair best with the guest's dish
3. ONLY recommend wines you can actually read on this list. Never invent, guess, or substitute wines not shown.

If you can read the list but find fewer than 3 good matches, return however many you found.

Respond ONLY with valid JSON — no markdown, no backticks, no preamble:

{
  "found": true,
  "winesRead": <total number of distinct wines you identified on the list>,
  "recommendations": [
    {
      "name": "Wine name exactly as written on the list",
      "vintage": "Year as shown, or null",
      "price": "Price as shown on the list, or null",
      "type": "e.g. Red Burgundy, White Rioja, Champagne",
      "score": <pairing score 0-100>,
      "why": "2-3 sentences explaining why this specific wine works with the dish",
      "attributes": ["attribute1", "attribute2", "attribute3"]
    }
  ],
  "sommelierNote": "One practical tip — e.g. how to ask the sommelier, a serving suggestion, or which recommendation offers the best value",
  "budgetNote": "Optional note if there's a strong value pick on the list, otherwise null"
}

If the photo is too blurry, dark, or obscured to read reliably:
{"found": false, "unreadable": true, "message": "The wine list wasn't clear enough to read accurately. Try again with better lighting or flash on."}`;
}

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
      error: "You've made a lot of requests recently. Please wait a few minutes.",
    });
  }

  // ── Validate ──────────────────────────────────────────────────────
  const { imageData, mediaType, dish, preferences } = req.body || {};
  if (!imageData) return res.status(400).json({ error: "No image provided." });
  if (!dish || !dish.trim()) return res.status(400).json({ error: "Please describe what you're ordering." });

  const safeMediaType = ["image/jpeg", "image/png", "image/webp"].includes(mediaType)
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
        model: "claude-sonnet-4-6", // Sonnet for better vision accuracy on complex lists
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: safeMediaType, data: imageData },
              },
              { type: "text", text: buildRestaurantPrompt(dish, preferences) },
            ],
          },
        ],
      }),
    });

    if (!apiResponse.ok) {
      const err = await apiResponse.json().catch(() => ({}));
      console.error("Claude Vision error:", err);
      return res.status(500).json({ error: "Failed to read the wine list. Please try again." });
    }

    const data = await apiResponse.json();
    const text = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("");
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonMatch[0]);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Restaurant handler error:", err);
    return res.status(500).json({ error: "Something went wrong reading the list. Please try again." });
  }
}
