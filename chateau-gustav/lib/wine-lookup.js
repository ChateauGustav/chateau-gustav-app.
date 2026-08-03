const BASE_URL = 'https://api.wineapi.io';
const TIMEOUT_MS = 4000; // fail fast — this must never block your core scan flow

async function wineApiFetch(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'X-API-Key': process.env.WINEAPI_KEY,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.status === 429) {
      throw new Error('WineAPI rate limit exceeded');
    }
    if (!res.ok) {
      throw new Error(`WineAPI error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

async function searchWines(query, limit = 5) {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  return wineApiFetch(`/wines/search?${params}`);
}

async function getWineById(id) {
  return wineApiFetch(`/wines/${id}`);
}

async function identifyByText(query) {
  return wineApiFetch('/identify/text', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
}

module.exports = { searchWines, getWineById, identifyByText };
