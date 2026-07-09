// api/courses.js
// Multi-course pairing: takes a full dinner menu and returns a wine
// recommendation per course, sequencing advice, and host notes.

import { checkRateLimit } from "../lib/pairings.js";

function buildCoursesPrompt(courses, preferences) {
  const menu = courses
    .map((c) => `- ${c.label}: ${c.dish}`)
    .join("\n");

  let prefNote = "";
  if (preferences) {
    const parts = [];
    if (preferences.name) parts.push(`Guest name: ${preferences.name}`);
    if (preferences.favoriteGrapes?.length)
      parts.push(`Preferred grapes: ${preferences.favoriteGrapes.join(", ")}`);
    if (preferences.styles?.length)
      parts.push(`Preferred styles: ${preferences.styles.join(", ")}`);
    if (preferences.budget)
      parts.push(`Budget per bottle: ${preferences.budget} USD`);
    if (preferences.avoidGrapes?.length)
      parts.push(`Avoid: ${preferences.avoidGrapes.join(", ")}`);
    if (preferences.dietaryNotes)
      parts.push(preferences.dietaryNotes);
    if (parts.length)
      prefNote = `\n\nGuest preferences:\n${parts.join("\n")}`;
  }

  return `You are a sommelier planning the complete wine progression for a multi-course dinner.

The menu tonight:
${menu}${prefNote}

Recommend one wine per course that:
1. Pairs excellently with that specific course
2. Follows a logical stylistic progression (typically: sparkling or light whites → fuller whites or light reds → fuller reds → sweet or fortified)
3. Is practical to find and serve

Respond ONLY with valid JSON — no markdown, no backticks:
{
  "courses": [
    {
      "label": "Course label exactly as given",
      "dish": "Dish as described",
      "wine": "Specific grape, style, and ideally a producer/region recommendation",
      "why": "2 sentences on why this wine works with this specific dish",
      "serve": "Serving temperature in both °C and °F",
      "decant": "Yes / No and a brief reason, or null if not applicable",
      "attributes": ["attribute1", "attribute2", "attribute3"]
    }
  ],
  "progression": "2-3 sentences explaining how the wines flow as a sequence and why this order works stylistically",
  "versatileOption": "If one wine could gracefully bridge two or more courses, name it and explain why. Otherwise null.",
  "hostNote": "One practical tip for the host — when to open/decant each wine, serving order logistics, etc.",
  "sommelierNote": "One memorable, insightful sentence about this menu's pairing philosophy"
}`;
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
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }

  // ── Validate ──────────────────────────────────────────────────────
  const { courses, preferences } = req.body || {};
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ error: "Please fill in at least one course." });
  }
  const filled = courses.filter((c) => c.dish && c.dish.trim());
  if (filled.length === 0) {
    return res.status(400).json({ error: "Please describe at least one course." });
  }

  // ── Call Claude ───────────────────────────────────────────────────
  try {
    const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6", // Sonnet for nuanced multi-course reasoning
        max_tokens: 2000,
        messages: [{ role: "user", content: buildCoursesPrompt(filled, preferences) }],
      }),
    });

    if (!apiResponse.ok) {
      const err = await apiResponse.json().catch(() => ({}));
      console.error("Claude courses error:", err);
      return res.status(500).json({ error: "Failed to generate pairings. Please try again." });
    }

    const data = await apiResponse.json();
    const text = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("");
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonMatch[0]);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Courses handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
