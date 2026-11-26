// api/detail.js
// Expands a single recommendation on demand:
//   mode "wineOptions" — specific wines for a pairing, with price tiers
//   mode "recipe"      — a recipe for a meal plus a grouped shopping list
// Runs on Vercel's servers. Holds the API key and rate-limits by IP, like pair.js.

import { checkRateLimit } from "../lib/pairings.js";

const SOMMELIER_SYSTEM =
  "You are an expert sommelier and home cook. Prices are always in USD ($). " +
  "Prices you give are estimates for a typical US retailer and vary by store and " +
  "vintage, so label them as estimates. Never claim live stock or current prices.";

function buildWineOptionsPrompt(i) {
  const budget = i.budget ? `Budget preference: ${i.budget} (USD).` : "";
  return `The user wants wines that pair with this dish:
- Pairing category: ${i.wine || "unspecified"}
- The dish: ${i.dish || "unspecified"}
${i.dishSummary ? `- Dish profile: ${i.dishSummary}` : ""}
${budget}

Name 3 specific, real wines (producer and bottling name where possible) that suit this pairing. Give each one a price tier in USD: "Under $20", "$20–$40", or "$40+". Use one wine per tier where possible.

Respond ONLY with valid JSON (no markdown, no backticks) in this exact structure:
{
  "options": [
    {
      "name": "Producer and wine name, vintage optional",
      "region": "Region, country",
      "priceTier": "Under $20",
      "estimatedPrice": "about $15",
      "why": "One sentence on why it suits the dish"
    }
  ],
  "note": "One sentence reminding the user that prices are estimates and vary by store."
}`;
}

function buildRecipePrompt(i) {
  return `Write a practical home recipe for:
- Dish: ${i.dish || "unspecified"}
${i.dishSummary ? `- Context: ${i.dishSummary}` : ""}
- Servings: 2

Respond ONLY with valid JSON (no markdown, no backticks) in this exact structure:
{
  "title": "Dish name",
  "servings": 2,
  "totalTime": "45 minutes",
  "ingredients": [
    { "item": "chicken thighs", "amount": "1 lb", "section": "Meat & Seafood" }
  ],
  "steps": ["Step one.", "Step two."],
  "shoppingList": [
    { "section": "Produce", "items": ["2 lemons", "1 bunch parsley"] }
  ],
  "note": "One practical tip about serving or the wine pairing."
}

Group the shoppingList by grocery store section (Produce, Meat & Seafood, Dairy, Pantry, Spices, Bakery, Frozen). Keep the ingredients list and the shopping list consistent. Assume pantry staples like salt, pepper, and oil are on hand, and leave them out of the shopping list.`;
}

async function callClaude(prompt, apiKey) {
  const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1600,
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
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON object found in Claude response: ${text.slice(0, 200)}`);
  return JSON.parse(jsonMatch[0]);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

  try {
    const { mode, inputs } = req.body || {};
    if (!mode || !inputs) {
      return res.status(400).json({ error: "Missing mode or inputs." });
    }

    let prompt;
    if (mode === "wineOptions") prompt = buildWineOptionsPrompt(inputs);
    else if (mode === "recipe") prompt = buildRecipePrompt(inputs);
    else return res.status(400).json({ error: "Unknown mode." });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Server is missing its API key." });
    }

    const result = await callClaude(prompt, apiKey);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Detail handler error:", err);
    return res.status(500).json({ error: "Something went wrong loading details." });
  }
}
