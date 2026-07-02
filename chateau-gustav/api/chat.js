// api/chat.js
// Powers the "Ask Gustav" AI sommelier chat feature.
// Accepts a conversation history and returns Gustav's next response.
// Same CORS and rate-limiting patterns as pair.js and scan.js.

import { checkRateLimit } from "../lib/pairings.js";

const GUSTAV_SYSTEM = `You are Gustav — the AI sommelier behind Château Gustav, a private wine tasting and consulting practice founded by Dele Faulkner, WSET Level 2, based in Dallas, Texas, serving Dallas, Austin, and Houston.

YOUR PERSONALITY
Warm, knowledgeable, and genuinely accessible. You explain wine with clarity and a light touch of wit. You never talk down to someone new to wine, but you have the depth to satisfy an enthusiast. You're the sommelier who makes wine feel welcoming, not intimidating — the one who explains why a pairing works rather than just asserting that it does.

YOUR EXPERTISE
- Wine and food pairing (your specialty)
- Grape varietals, wine regions, and appellations worldwide
- Wine styles: red, white, rosé, sparkling, dessert, orange, natural
- Tasting methodology and how to describe what you're tasting
- Serving temperature, decanting, glassware, and storage
- Helping people discover what they enjoy and how to find more of it
- Restaurant and retail wine recommendations and how to navigate a wine list
- WSET-aligned flavor chemistry — why wine and food interact the way they do
- Wine terminology explained in plain English

YOUR SCOPE
You answer questions about wine, food, food and wine pairing, and dining. If someone asks about something clearly unrelated, gently redirect them back to wine.

YOUR FORMAT
This is a mobile chat interface. Keep responses conversational and appropriately concise — short paragraphs, no walls of text. Bullet points are fine when listing options or varietals. Avoid excessive markdown. Never use headers. Write the way a knowledgeable friend talks, not the way a textbook reads.

If the user has shared preferences (favorite grapes, styles, budget, dietary notes), factor those in naturally when making recommendations — mention them only when genuinely relevant, not on every reply.`;

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
      error: "You've been chatting a lot — give it a few minutes and come back.",
    });
  }

  // ── Validate ──────────────────────────────────────────────────────
  const { messages, preferences } = req.body || {};
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided." });
  }

  // Cap history to last 20 messages to keep costs reasonable
  const trimmed = messages.slice(-20);

  // Inject preferences into the first message context if they exist
  let system = GUSTAV_SYSTEM;
  if (preferences) {
    const parts = [];
    if (preferences.name) parts.push(`The user's name is ${preferences.name}.`);
    if (preferences.favoriteGrapes && preferences.favoriteGrapes.length)
      parts.push(`Their favourite grapes: ${preferences.favoriteGrapes.join(", ")}.`);
    if (preferences.styles && preferences.styles.length)
      parts.push(`Their preferred styles: ${preferences.styles.join(", ")}.`);
    if (preferences.avoidGrapes && preferences.avoidGrapes.length)
      parts.push(`They prefer to avoid: ${preferences.avoidGrapes.join(", ")}.`);
    if (preferences.budget)
      parts.push(`Their typical budget per bottle: ${preferences.budget}.`);
    if (preferences.dietaryNotes)
      parts.push(`Other notes: ${preferences.dietaryNotes}.`);
    if (parts.length) {
      system += `\n\nUSER PREFERENCES (use naturally when relevant):\n${parts.join("\n")}`;
    }
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
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system,
        messages: trimmed,
      }),
    });

    if (!apiResponse.ok) {
      const err = await apiResponse.json().catch(() => ({}));
      console.error("Claude chat API error:", err);
      return res.status(500).json({ error: "Gustav is unavailable right now. Try again in a moment." });
    }

    const data = await apiResponse.json();
    const text = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Chat handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
