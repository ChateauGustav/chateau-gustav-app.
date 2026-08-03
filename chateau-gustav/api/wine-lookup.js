const { identifyByText, getWineById } = require('../lib/wineApiClient');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { wineName, winery, vintage } = req.body || {};
  if (!wineName) {
    return res.status(400).json({ error: 'wineName is required' });
  }

  try {
    const query = [wineName, winery, vintage].filter(Boolean).join(' ');
    const identified = await identifyByText(query);

    if (!identified.wine || identified.confidence < 0.5) {
      // No confident match — return gracefully, app proceeds without enrichment
      return res.status(200).json({ enriched: false });
    }

    const details = await getWineById(identified.wine.id);

    return res.status(200).json({
      enriched: true,
      confidence: identified.confidence,
      criticScores: details.scores || [],
      priceRange: details.priceRange || null,
      grapes: details.grapes || [],
      body: details.body || null,
      acidity: details.acidity || null,
      suggestedPairings: details.pairings || [],
    });
  } catch (err) {
    console.error('WineAPI enrichment failed:', err.message);
    // Fail open — never break the user's scan because enrichment failed
    return res.status(200).json({ enriched: false });
  }
};
