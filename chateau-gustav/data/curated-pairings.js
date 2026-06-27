// data/curated-pairings.js
// ─────────────────────────────────────────────────────────────────────────
// THIS IS YOUR MOAT. Every entry here is served instantly and for free —
// no AI call, no cost. It's also where your WSET expertise lives and where
// Château Gustav's house style becomes the product.
//
// These are a SEED set built on classic sommelier principles. You — the
// actual certified palate — should review, correct, and expand them so they
// reflect your taste, not a generic default. Add as many as you like.
//
// FOOD KEYS  → "protein|cut|sauce"  (all lowercase, matching the dropdowns)
// WINE KEYS  → "grape"              (lowercase)
//
// Each value is a complete response object, the same shape the AI returns,
// so the front end renders curated and AI results identically.
// ─────────────────────────────────────────────────────────────────────────

export const CURATED = {
  food: {
    "beef|ribeye|chimichurri": {
      dishSummary:
        "A fatty, charred ribeye cut by bright, garlicky, herb-and-vinegar chimichurri — richness meeting acidity and green freshness.",
      pairings: [
        {
          wine: "Malbec",
          region: "Mendoza, Argentina",
          score: 95,
          why: "The native pairing for a reason. Malbec's plush dark fruit stands up to the marbling, while its freshness echoes the chimichurri's vinegar and parsley.",
          attributes: ["Juicy dark fruit", "Soft tannin", "Matches richness"],
          budgetNote: "Excellent values in the $18–$30 range.",
        },
        {
          wine: "Cabernet Franc",
          region: "Loire Valley, France",
          score: 90,
          why: "Its herbal, peppery streak is a mirror to the chimichurri rather than a contrast, and the moderate tannin keeps the fat in check without overwhelming the beef.",
          attributes: ["Herbaceous", "Bright acidity", "Medium body"],
        },
        {
          wine: "Côtes du Rhône",
          region: "Rhône Valley, France",
          score: 87,
          why: "A Grenache-Syrah blend brings garrigue and spice that flatter the herbs, with enough structure for the char.",
          attributes: ["Spice-driven", "Savory", "Food-friendly"],
        },
      ],
      avoid: ["Delicate Pinot Grigio", "Heavily oaked Chardonnay", "Light rosé"],
      sommelierNote:
        "The instinct is Cabernet, but big Cabernet tannin collides with the vinegar in chimichurri and turns metallic. Match the sauce, not just the protein — that's the whole thesis of pairing well.",
      source: "curated",
    },

    "beef|filet|béarnaise": {
      dishSummary:
        "A lean, tender filet under rich, buttery, tarragon-laced béarnaise — finesse and fat rather than bold char.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 93,
          why: "Filet is the most delicate cut, so it wants elegance over power. Burgundy's silk and red-fruit lift complement the tenderness and cut gently through the buttery sauce.",
          attributes: ["Silky", "Red fruit", "Elegant"],
        },
        {
          wine: "Merlot",
          region: "Saint-Émilion / Pomerol, France",
          score: 90,
          why: "Right Bank Bordeaux offers plush texture and supple tannin that flatters a lean cut without bullying it, with savory notes that meet the tarragon.",
          attributes: ["Plush", "Supple tannin", "Savory"],
        },
        {
          wine: "Châteauneuf-du-Pape",
          region: "Rhône Valley, France",
          score: 86,
          why: "For something richer, its warmth and herb-tinged depth echo the béarnaise while staying smooth enough for filet.",
          attributes: ["Warm spice", "Herbal", "Full but smooth"],
        },
      ],
      avoid: ["Young, firm Cabernet Sauvignon", "High-tannin Nebbiolo", "Sauvignon Blanc"],
      sommelierNote:
        "Filet with béarnaise is the classic case where most apps still say Cabernet and most sommeliers say no. The cut is lean and the sauce is delicate — firm tannin makes both taste thin. Reach for finesse.",
      source: "curated",
    },

    "beef|strip|peppercorn": {
      dishSummary:
        "A robust New York strip with a sharp, spicy peppercorn crust — assertive meat, assertive seasoning.",
      pairings: [
        {
          wine: "Syrah / Shiraz",
          region: "Northern Rhône or Barossa",
          score: 94,
          why: "Syrah's signature black-pepper note is a direct flavor bridge to the peppercorn crust, and its full body matches the strip's chew.",
          attributes: ["Black pepper", "Full body", "Savory"],
        },
        {
          wine: "Cabernet Sauvignon",
          region: "Napa Valley or Bordeaux",
          score: 90,
          why: "Here the classic answer works: a strip has the fat and structure to stand up to firm Cabernet tannin, and the dark fruit tames the pepper's heat.",
          attributes: ["Structured", "Dark fruit", "Firm tannin"],
        },
        {
          wine: "Malbec",
          region: "Cahors, France",
          score: 86,
          why: "A more rustic, tannic Malbec brings dark fruit and earth that hold up to the aggressive seasoning.",
          attributes: ["Rustic", "Dark fruit", "Earthy"],
        },
      ],
      avoid: ["Light whites", "Delicate Pinot Noir", "Off-dry styles"],
      sommelierNote:
        "Peppercorn is the tell. When pepper is front and center, Syrah beats Cabernet because it agrees with the dish instead of fighting it.",
      source: "curated",
    },

    "pork|smoked / bbq|bbq / smoky": {
      dishSummary:
        "Smoke, sweet-tangy bark, and rendered fat — the defining trio of American barbecue pork.",
      pairings: [
        {
          wine: "Zinfandel",
          region: "Lodi or Sonoma, California",
          score: 94,
          why: "Zin's jammy, brambly fruit and gentle sweetness mirror the BBQ glaze, while its warmth rides alongside the smoke instead of fighting it.",
          attributes: ["Jammy fruit", "Hint of sweetness", "Bold"],
          budgetNote: "Great bottles in the $15–$25 range.",
        },
        {
          wine: "Off-Dry Riesling",
          region: "Mosel, Germany or Finger Lakes",
          score: 92,
          why: "A touch of sweetness tames smoke and any chili heat, and bright acidity slices cleanly through the fat — the contrarian pick that genuinely shines.",
          attributes: ["Off-dry", "High acidity", "Cuts fat"],
        },
        {
          wine: "Grenache",
          region: "Spain or Southern Rhône",
          score: 88,
          why: "Soft, spicy, and red-fruited, Grenache flatters the sweet bark without adding harsh tannin to an already rich plate.",
          attributes: ["Soft tannin", "Red fruit", "Spice"],
        },
      ],
      avoid: ["High-tannin young Cabernet", "Delicate Pinot Grigio", "Oaky Chardonnay"],
      sommelierNote:
        "Most people reach for a big tannic red with BBQ, but smoke plus firm tannin reads as bitter and ashy. The pros' secret is a little residual sugar — that off-dry Riesling will surprise everyone at the table.",
      source: "curated",
    },

    "salmon|grilled|lemon butter": {
      dishSummary:
        "Rich, oily salmon with smoky grill char, brightened by tangy lemon butter — fatty fish that wants acid and freshness.",
      pairings: [
        {
          wine: "Sauvignon Blanc",
          region: "Sancerre or Marlborough",
          score: 93,
          why: "Zesty citrus and high acidity echo the lemon and cut through the fish's natural oil, keeping each bite clean.",
          attributes: ["Citrus-driven", "High acidity", "Crisp"],
        },
        {
          wine: "Unoaked Chardonnay",
          region: "Chablis, France",
          score: 91,
          why: "Mineral, lean, and bright, Chablis matches the weight of salmon without oak getting in the way of the lemon butter.",
          attributes: ["Mineral", "Medium body", "Clean finish"],
        },
        {
          wine: "Albariño",
          region: "Rías Baixas, Spain",
          score: 88,
          why: "Saline and peachy with snappy acidity, it brings a coastal freshness that loves grilled fish.",
          attributes: ["Saline", "Stone fruit", "Refreshing"],
        },
      ],
      avoid: ["Heavily oaked Chardonnay", "Big reds", "Sweet wines"],
      sommelierNote:
        "Salmon is fatty enough to take a light red — a chilled Pinot Noir works beautifully if you'd rather drink red. But with lemon butter in play, acidity is the priority, and these whites deliver it.",
      source: "curated",
    },

    "chicken|roasted|herb crust": {
      dishSummary:
        "Golden roast chicken with a savory herb crust — comforting, moderately rich, herb-forward.",
      pairings: [
        {
          wine: "Chardonnay",
          region: "Mâconnais or Russian River",
          score: 92,
          why: "Roast chicken is Chardonnay's natural partner; gentle oak and body match the crisp skin and savory herbs without overwhelming the bird.",
          attributes: ["Medium body", "Subtle oak", "Savory"],
        },
        {
          wine: "Pinot Noir",
          region: "Burgundy or Oregon",
          score: 90,
          why: "Light enough not to dominate, with earthy red fruit that flatters the herbs and roasted character.",
          attributes: ["Red fruit", "Earthy", "Versatile"],
        },
        {
          wine: "Viognier",
          region: "Condrieu or California",
          score: 85,
          why: "Aromatic and full-textured, it picks up the herbs and adds a floral lift to the dish.",
          attributes: ["Aromatic", "Floral", "Full texture"],
        },
      ],
      avoid: ["Tannic young reds", "Very sweet wines"],
      sommelierNote:
        "Roast chicken is the great chameleon — it's the dish to pour whatever you most want to drink. Lean white if the herbs lead, light red if the skin and fat do.",
      source: "curated",
    },

    "lamb|roasted|herb crust": {
      dishSummary:
        "Herb-crusted roast lamb — gamey, rich, and aromatic, with a savory herbal crust.",
      pairings: [
        {
          wine: "Cabernet Sauvignon",
          region: "Bordeaux or Napa",
          score: 93,
          why: "Lamb's fat and gaminess are exactly what firm Cabernet tannin needs; the wine softens and the meat tastes richer. A genuine textbook match.",
          attributes: ["Structured", "Dark fruit", "Classic"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 91,
          why: "Peppery and savory, Syrah picks up the herb crust and complements lamb's wild edge.",
          attributes: ["Peppery", "Savory", "Full body"],
        },
        {
          wine: "Rioja Reserva",
          region: "Rioja, Spain",
          score: 89,
          why: "Tempranillo with age brings leather, dried herb, and supple tannin — Spain's classic answer to roast lamb.",
          attributes: ["Leather", "Dried herb", "Smooth"],
        },
      ],
      avoid: ["Light whites", "Delicate rosé", "Low-tannin reds"],
      sommelierNote:
        "Lamb is one of the few proteins where the big-Cabernet reflex is right — its fat and gaminess actually need the tannin. Add a touch of rosemary or mint and the herbal reds sing.",
      source: "curated",
    },

    "tuna|raw / crudo|": {
      dishSummary:
        "Clean, lean raw tuna — delicate, slightly metallic, dependent on freshness and subtle seasoning.",
      pairings: [
        {
          wine: "Dry Rosé",
          region: "Provence, France",
          score: 91,
          why: "Light, dry, and red-fruited, Provençal rosé has just enough presence for tuna's richness without overpowering its delicacy.",
          attributes: ["Delicate", "Dry", "Refreshing"],
        },
        {
          wine: "Grüner Veltliner",
          region: "Austria",
          score: 89,
          why: "Its white-pepper snap and citrus keep raw fish lively and clean.",
          attributes: ["White pepper", "Citrus", "Crisp"],
        },
        {
          wine: "Champagne",
          region: "Champagne, France",
          score: 88,
          why: "Brut bubbles and high acidity refresh the palate between bites of fatty raw tuna.",
          attributes: ["Sparkling", "High acidity", "Elegant"],
        },
      ],
      avoid: ["Oaky whites", "Tannic reds", "Sweet wines"],
      sommelierNote:
        "With crudo, the wine's job is to stay out of the way. Anything oaky or tannic clashes with raw fish and turns it metallic — keep it light, dry, and high-acid.",
      source: "curated",
    },

    "duck|roasted|mushroom / truffle": {
      dishSummary:
        "Rich roast duck with earthy mushroom and truffle — deep, savory, umami-driven.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 94,
          why: "Duck and Pinot is one of the great classic marriages; the wine's earthiness and red fruit meet the truffle and the duck fat with perfect weight.",
          attributes: ["Earthy", "Red fruit", "Silky"],
        },
        {
          wine: "Nebbiolo",
          region: "Barolo / Barbaresco, Italy",
          score: 90,
          why: "Its truffle and rose aromatics are uncanny with mushroom dishes, and the firm acidity cuts the duck's richness.",
          attributes: ["Truffle notes", "High acidity", "Structured"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 86,
          why: "For a bolder match, Syrah's savory, smoky depth flatters roasted duck and earthy fungi.",
          attributes: ["Savory", "Smoky", "Full body"],
        },
      ],
      avoid: ["Light, crisp whites", "Sweet wines", "Simple rosé"],
      sommelierNote:
        "Truffle craves earth in the glass. Old-World Pinot and Nebbiolo have that forest-floor quality; New-World fruit bombs tend to talk over it.",
      source: "curated",
    },

    "pasta||tomato-based": {
      dishSummary:
        "Tomato-driven pasta — high acidity, herbal, savory, often with a touch of sweetness from the tomato.",
      pairings: [
        {
          wine: "Sangiovese",
          region: "Chianti, Tuscany",
          score: 94,
          why: "The rule is to match the sauce's acidity, and Chianti's bright acid and savory cherry are built for tomato. A regional match made over centuries.",
          attributes: ["High acidity", "Tart cherry", "Savory"],
        },
        {
          wine: "Barbera",
          region: "Piedmont, Italy",
          score: 90,
          why: "Low tannin and juicy acidity make it endlessly food-friendly with tomato sauces.",
          attributes: ["Juicy", "Low tannin", "Bright"],
        },
        {
          wine: "Montepulciano d'Abruzzo",
          region: "Abruzzo, Italy",
          score: 87,
          why: "Soft, dark-fruited, and easygoing, it's a great-value partner for weeknight red sauce.",
          attributes: ["Soft", "Dark fruit", "Value"],
        },
      ],
      avoid: ["Oaky Chardonnay", "High-tannin Cabernet", "Sweet wines"],
      sommelierNote:
        "Tomato is deceptively acidic. A low-acid wine next to it tastes flat and flabby — which is why high-acid Italian reds, bred alongside the cuisine, never miss.",
      source: "curated",
    },

    "chicken|fried|": {
      dishSummary:
        "Crispy, salty, rich fried chicken — crunch and fat begging to be cut.",
      pairings: [
        {
          wine: "Champagne / Sparkling",
          region: "Champagne or quality Crémant",
          score: 93,
          why: "The famous high-low pairing: bubbles and racing acidity scrub the palate clean between salty, greasy bites. Pure refreshment.",
          attributes: ["Sparkling", "High acidity", "Cuts fat"],
        },
        {
          wine: "Off-Dry Riesling",
          region: "Mosel or Finger Lakes",
          score: 90,
          why: "A whisper of sweetness loves salt and crunch, and the acidity keeps it from feeling heavy.",
          attributes: ["Off-dry", "Crisp", "Balances salt"],
        },
        {
          wine: "Unoaked Chardonnay",
          region: "Chablis or cool-climate",
          score: 85,
          why: "Lean and bright, it matches the chicken's weight while keeping things fresh.",
          attributes: ["Lean", "Bright", "Clean"],
        },
      ],
      avoid: ["Tannic reds", "Heavily oaked whites"],
      sommelierNote:
        "Fried chicken and Champagne is the pairing that converts skeptics. Salt and fat plus bubbles and acid is one of the most satisfying contrasts in all of food and wine.",
      source: "curated",
    },

    "scallops|pan-seared|lemon butter": {
      dishSummary:
        "Sweet, delicate seared scallops with a caramelized crust and bright lemon butter.",
      pairings: [
        {
          wine: "Chablis",
          region: "Burgundy, France",
          score: 93,
          why: "Unoaked, mineral Chardonnay matches the scallops' sweetness and delicacy while the acidity lifts the lemon butter.",
          attributes: ["Mineral", "Crisp", "Elegant"],
        },
        {
          wine: "Champagne",
          region: "Champagne, France",
          score: 91,
          why: "Brut bubbles flatter the sweet sear and refresh the richness of the butter.",
          attributes: ["Sparkling", "Fine", "High acidity"],
        },
        {
          wine: "Albariño",
          region: "Rías Baixas, Spain",
          score: 87,
          why: "Saline minerality and stone fruit make a coastal match for sweet shellfish.",
          attributes: ["Saline", "Stone fruit", "Fresh"],
        },
      ],
      avoid: ["Red wine", "Oaky Chardonnay", "Sweet wines"],
      sommelierNote:
        "Scallops are subtly sweet, so the wine should be dry but never austere. A bone-dry, high-acid white can make them taste oddly bitter — Chablis hits the sweet spot of dry-but-generous.",
      source: "curated",
    },

    "beef|braised|au jus / red wine": {
      dishSummary:
        "Slow-braised beef in a deep red-wine jus — fall-apart tender, intensely savory, and rich with collagen and reduction.",
      pairings: [
        {
          wine: "Syrah",
          region: "Northern Rhône, France",
          score: 94,
          why: "Braising builds savory umami depth that Syrah's smoky, peppery body meets head-on, while the wine's acidity lifts the heavy jus.",
          attributes: ["Savory depth", "Full body", "Smoky"],
        },
        {
          wine: "Cabernet Sauvignon",
          region: "Napa or Bordeaux",
          score: 91,
          why: "The gelatin and fat of braised beef are exactly what firm Cabernet tannin needs to soften and shine.",
          attributes: ["Structured", "Dark fruit", "Tannin meets fat"],
        },
        {
          wine: "Zinfandel",
          region: "California",
          score: 87,
          why: "Jammy, bold, and slightly sweet, Zin flatters the reduction's concentrated richness.",
          attributes: ["Jammy", "Bold", "Warm"],
        },
      ],
      avoid: ["Light whites", "Delicate Pinot Grigio", "Crisp rosé"],
      sommelierNote:
        "Braised dishes are about concentrated, slow-built flavor — they want a wine with equal weight and savory depth, not a fruity crowd-pleaser that gets steamrolled.",
      source: "curated",
    },

    "beef|grilled|bbq / smoky": {
      dishSummary:
        "Char-grilled beef glazed in sweet-smoky barbecue — caramelized crust, smoke, and rendered fat.",
      pairings: [
        {
          wine: "Zinfandel",
          region: "Lodi or Sonoma, California",
          score: 93,
          why: "Zin's jammy fruit and gentle sweetness mirror the BBQ glaze while its bold body matches the char.",
          attributes: ["Jammy fruit", "Hint of sweetness", "Bold"],
        },
        {
          wine: "Malbec",
          region: "Mendoza, Argentina",
          score: 90,
          why: "Smoky, dark-fruited, and smooth, Malbec is built for the grill and handles the smoke without turning harsh.",
          attributes: ["Smoky", "Dark fruit", "Soft tannin"],
        },
        {
          wine: "Syrah / Shiraz",
          region: "Barossa, Australia",
          score: 88,
          why: "Ripe Shiraz brings sweet spice and power that ride alongside barbecue's intensity.",
          attributes: ["Sweet spice", "Full body", "Ripe"],
        },
      ],
      avoid: ["Crisp light whites", "Delicate Pinot Noir", "High-tannin young Cabernet"],
      sommelierNote:
        "Smoke and firm tannin fight each other and turn bitter. Reach for ripe, fruit-forward reds — they read as sweet against the smoke instead of clashing with it.",
      source: "curated",
    },

    "lamb|grilled|herb crust": {
      dishSummary:
        "Herb-crusted grilled lamb chops — gamey, charred, and aromatic with rosemary and garlic.",
      pairings: [
        {
          wine: "Syrah",
          region: "Northern Rhône, France",
          score: 93,
          why: "Peppery and savory, Syrah picks up the herb crust and grill char while complementing lamb's wild edge.",
          attributes: ["Peppery", "Savory", "Full body"],
        },
        {
          wine: "Cabernet Sauvignon",
          region: "Bordeaux or Napa",
          score: 91,
          why: "Lamb's fat and gaminess are exactly what big tannin needs — a textbook structural match.",
          attributes: ["Structured", "Dark fruit", "Classic"],
        },
        {
          wine: "Tempranillo (Rioja)",
          region: "Rioja, Spain",
          score: 88,
          why: "Leather, dried herb, and supple tannin make aged Rioja Spain's classic answer to lamb.",
          attributes: ["Leather", "Dried herb", "Smooth"],
        },
      ],
      avoid: ["Light whites", "Delicate rosé", "Low-tannin reds"],
      sommelierNote:
        "Lamb is one of the few proteins where reaching for a big red is genuinely right — the gaminess and fat actively need that tannin to balance.",
      source: "curated",
    },

    "pork|roasted|": {
      dishSummary:
        "Simple roast pork — mildly sweet, tender, moderately rich, a blank canvas that rewards versatility.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy or Oregon",
          score: 91,
          why: "Light, earthy, and fruity, Pinot flatters pork's mild sweetness without overwhelming it.",
          attributes: ["Red fruit", "Earthy", "Versatile"],
        },
        {
          wine: "Riesling",
          region: "Alsace or Germany",
          score: 90,
          why: "Pork loves orchard fruit and acidity; Riesling's apple and lift are a natural, especially with any sweet or fruit element.",
          attributes: ["Orchard fruit", "High acidity", "Lifting"],
        },
        {
          wine: "Barbera",
          region: "Piedmont, Italy",
          score: 86,
          why: "Juicy, low-tannin, and bright, it's an easygoing red that won't bully a delicate roast.",
          attributes: ["Juicy", "Low tannin", "Bright"],
        },
      ],
      avoid: ["High-tannin Cabernet", "Heavily oaked reds"],
      sommelierNote:
        "Pork is the diplomat of proteins — it works with both light reds and aromatic whites, so pour to the sauce and sides more than the meat itself.",
      source: "curated",
    },

    "shrimp|pan-seared|lemon butter": {
      dishSummary:
        "Garlicky shrimp scampi in lemon butter — sweet shellfish, bright citrus, and richness to cut.",
      pairings: [
        {
          wine: "Sauvignon Blanc",
          region: "Sancerre or Marlborough",
          score: 92,
          why: "Zesty citrus echoes the lemon and the high acidity slices through the butter, keeping the dish lively.",
          attributes: ["Citrus-driven", "High acidity", "Crisp"],
        },
        {
          wine: "Albariño",
          region: "Rías Baixas, Spain",
          score: 91,
          why: "Saline minerality is tailor-made for shrimp, with stone fruit that flatters the garlic and butter.",
          attributes: ["Saline", "Stone fruit", "Fresh"],
        },
        {
          wine: "Vermentino",
          region: "Sardinia or Liguria, Italy",
          score: 87,
          why: "Coastal, herbaceous, and bright, it's a Mediterranean natural with garlicky shellfish.",
          attributes: ["Herbaceous", "Coastal", "Bright"],
        },
      ],
      avoid: ["Red wine", "Oaky Chardonnay", "Sweet wines"],
      sommelierNote:
        "Garlic and butter want acidity above all — a crisp, citrusy white acts like the squeeze of lemon the dish is already asking for.",
      source: "curated",
    },

    "lobster|poached|lemon butter": {
      dishSummary:
        "Butter-poached lobster — sweet, luxurious, and rich, the most decadent shellfish there is.",
      pairings: [
        {
          wine: "Oaked Chardonnay",
          region: "Côte de Beaune or Napa",
          score: 94,
          why: "This is the indulgent like-with-like match: the wine's creamy, buttery texture mirrors the poached lobster and rich butter beautifully.",
          attributes: ["Buttery", "Full texture", "Luxurious"],
        },
        {
          wine: "Champagne",
          region: "Champagne, France",
          score: 92,
          why: "Brut bubbles and acidity refresh the palate between rich bites — the celebratory contrast pairing.",
          attributes: ["Sparkling", "High acidity", "Elegant"],
        },
        {
          wine: "Viognier",
          region: "Condrieu, France",
          score: 86,
          why: "Aromatic and full-textured, it brings florals and body that flatter sweet lobster.",
          attributes: ["Aromatic", "Full texture", "Floral"],
        },
      ],
      avoid: ["Tannic reds", "Light crisp whites", "Sweet wines"],
      sommelierNote:
        "Lobster is rich enough to take a fuller white — this is the rare seafood where oak is welcome. With a leaner preparation, swap to Chablis or Champagne instead.",
      source: "curated",
    },

    "halibut|pan-seared|lemon butter": {
      dishSummary:
        "Delicate seared halibut with lemon butter — lean, sweet white fish that rewards a light, precise touch.",
      pairings: [
        {
          wine: "White Burgundy",
          region: "Côte de Beaune, France",
          score: 92,
          why: "Restrained Chardonnay matches halibut's delicacy with elegance, its subtle texture meeting the butter without overwhelming the fish.",
          attributes: ["Elegant", "Subtle", "Mineral"],
        },
        {
          wine: "Albariño",
          region: "Rías Baixas, Spain",
          score: 89,
          why: "Bright and saline, it keeps lean white fish fresh and echoes the lemon.",
          attributes: ["Saline", "Bright", "Fresh"],
        },
        {
          wine: "Sauvignon Blanc",
          region: "Loire Valley, France",
          score: 87,
          why: "Citrus and crisp acidity lift the dish without competing with the fish's mild flavor.",
          attributes: ["Citrus", "Crisp", "Light"],
        },
      ],
      avoid: ["Red wine", "Heavily oaked whites", "Bold aromatic wines"],
      sommelierNote:
        "Lean white fish is fragile — the wine should whisper, not shout. Anything too oaky, sweet, or aromatic will simply bury the halibut.",
      source: "curated",
    },

    "duck|pan-seared|au jus / red wine": {
      dishSummary:
        "Crisp-skinned seared duck breast in a red-wine jus — rich, savory, with rendered fat and a meaty depth.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 94,
          why: "The benchmark duck pairing: earthiness and acidity cut the fat while red fruit flatters the savory meat and jus.",
          attributes: ["Earthy", "Red fruit", "Cuts richness"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 89,
          why: "For a bolder match, Syrah's savory, peppery depth stands up to crisp duck skin and reduction.",
          attributes: ["Peppery", "Savory", "Full body"],
        },
        {
          wine: "Barolo (Nebbiolo)",
          region: "Piedmont, Italy",
          score: 86,
          why: "High acidity and firm structure slice through the fat, with aromatics that deepen the savory dish.",
          attributes: ["High acidity", "Structured", "Aromatic"],
        },
      ],
      avoid: ["Light crisp whites", "Sweet wines", "Simple rosé"],
      sommelierNote:
        "Duck sits between red-meat richness and poultry delicacy, which is why Pinot — with body but also acidity — is its perfect structural partner.",
      source: "curated",
    },

    "tuna|pan-seared|miso / soy glaze": {
      dishSummary:
        "Seared rare ahi with a savory-sweet miso-soy glaze — meaty fish, umami, and a touch of caramelized sweetness.",
      pairings: [
        {
          wine: "Pinot Noir (chilled)",
          region: "Oregon or Burgundy",
          score: 91,
          why: "Tuna is meaty enough for a light red; lightly chilled Pinot's red fruit and acidity meet the umami glaze without overpowering the fish.",
          attributes: ["Light red", "Red fruit", "Serve chilled"],
        },
        {
          wine: "Dry Rosé",
          region: "Provence, France",
          score: 89,
          why: "Crisp and delicate, rosé bridges the fish's richness and the glaze's sweetness gracefully.",
          attributes: ["Dry", "Delicate", "Versatile"],
        },
        {
          wine: "Grüner Veltliner",
          region: "Austria",
          score: 86,
          why: "Its white-pepper snap and citrus cut through soy's salt and keep the dish fresh.",
          attributes: ["White pepper", "Citrus", "Crisp"],
        },
      ],
      avoid: ["Tannic reds", "Oaky Chardonnay", "Big, jammy wines"],
      sommelierNote:
        "Umami glazes make tannin taste metallic, so even with 'meaty' tuna, skip the bold reds. A chilled light red or a crisp rosé is the move.",
      source: "curated",
    },

    "pasta||cream sauce": {
      dishSummary:
        "Rich, creamy pasta — Alfredo or carbonara style — coating, savory, and fatty.",
      pairings: [
        {
          wine: "Chardonnay",
          region: "Mâconnais or cool-climate California",
          score: 91,
          why: "A rounder white matches the cream's weight, and its acidity keeps a heavy dish from feeling cloying.",
          attributes: ["Round texture", "Matches weight", "Balancing acidity"],
        },
        {
          wine: "Pinot Grigio",
          region: "Northern Italy",
          score: 87,
          why: "Crisp and neutral, it refreshes the palate between rich, creamy bites.",
          attributes: ["Crisp", "Clean", "Refreshing"],
        },
        {
          wine: "Franciacorta / Sparkling",
          region: "Lombardy, Italy",
          score: 86,
          why: "Bubbles and acidity scrub away the fat — a classic trick with creamy pasta.",
          attributes: ["Sparkling", "Cuts fat", "High acidity"],
        },
      ],
      avoid: ["Tannic reds", "Heavily oaked, low-acid whites"],
      sommelierNote:
        "Cream needs acidity to stay from feeling heavy. The instinct toward a big buttery white can actually double down on the richness — keep some freshness in the glass.",
      source: "curated",
    },

    "turkey|roasted|herb crust": {
      dishSummary:
        "Herb-roasted turkey — mild, savory, and lean, the centerpiece of a holiday table with many side flavors in play.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Oregon or Burgundy",
          score: 92,
          why: "Light, fruity, and food-friendly, Pinot flatters turkey and flexes across the parade of holiday sides.",
          attributes: ["Versatile", "Red fruit", "Food-friendly"],
        },
        {
          wine: "Beaujolais (Gamay)",
          region: "Beaujolais, France",
          score: 90,
          why: "Bright, juicy, and low-tannin, it's the easygoing crowd-pleaser built for a table of mixed dishes.",
          attributes: ["Juicy", "Low tannin", "Crowd-pleaser"],
        },
        {
          wine: "Riesling",
          region: "Alsace or Germany",
          score: 87,
          why: "Aromatic and high-acid, it handles cranberry's sweetness and the spread of savory sides with ease.",
          attributes: ["Aromatic", "High acidity", "Flexible"],
        },
      ],
      avoid: ["Big tannic Cabernet", "Heavily oaked Chardonnay"],
      sommelierNote:
        "Thanksgiving is really a side-dish pairing problem, not a turkey one. Pick a flexible, high-acid, low-tannin wine that bends around cranberry, stuffing, and gravy alike.",
      source: "curated",
    },

    "vegetarian|roasted|mushroom / truffle": {
      dishSummary:
        "Earthy roasted mushrooms or truffle pasta — deeply umami, savory, and satisfying without meat.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy or Oregon",
          score: 93,
          why: "Pinot's forest-floor earthiness is a direct echo of mushrooms and truffle — the vegetarian match that drinks like a luxury.",
          attributes: ["Earthy mirror", "Red fruit", "Silky"],
        },
        {
          wine: "Nebbiolo",
          region: "Piedmont, Italy",
          score: 90,
          why: "Its truffle and rose aromatics are uncanny with earthy fungi, with acidity to keep things lively.",
          attributes: ["Truffle notes", "High acidity", "Aromatic"],
        },
        {
          wine: "Oaked Chardonnay",
          region: "Burgundy",
          score: 86,
          why: "For a white, a rounder Chardonnay matches the dish's richness and umami depth.",
          attributes: ["Round", "Savory", "Full"],
        },
      ],
      avoid: ["Crisp neutral whites", "Sweet wines", "Light rosé"],
      sommelierNote:
        "Umami-rich vegetarian dishes can carry a serious red — don't assume meatless means a light wine. Earth wants earth in the glass.",
      source: "curated",
    },

    "chicken|grilled|": {
      dishSummary:
        "Simple grilled chicken — lean, lightly charred, and mild, an everyday canvas for an easy pour.",
      pairings: [
        {
          wine: "Dry Rosé",
          region: "Provence, France",
          score: 90,
          why: "Light, fresh, and versatile, rosé suits grilled chicken's mild char on any warm evening.",
          attributes: ["Fresh", "Versatile", "Light"],
        },
        {
          wine: "Sauvignon Blanc",
          region: "Loire or New Zealand",
          score: 88,
          why: "Crisp citrus and herbal lift keep lean grilled chicken bright and lively.",
          attributes: ["Citrus", "Crisp", "Herbal"],
        },
        {
          wine: "Light Pinot Noir",
          region: "Burgundy or cool-climate",
          score: 86,
          why: "If you'd rather drink red, a light Pinot has the delicacy not to overpower the bird.",
          attributes: ["Light red", "Red fruit", "Delicate"],
        },
      ],
      avoid: ["Big tannic reds", "Heavily oaked whites"],
      sommelierNote:
        "Plain grilled chicken takes its cue from the marinade and sides — pour to those. On its own, keep it light, fresh, and uncomplicated.",
      source: "curated",
    },

    "cheese||": {
      dishSummary:
        "A mixed cheese board — a spectrum of salt, fat, funk, and texture from fresh to aged and blue.",
      pairings: [
        {
          wine: "Champagne / Sparkling",
          region: "Champagne or quality Crémant",
          score: 91,
          why: "Acidity and bubbles cut through fat and salt across nearly every cheese, making sparkling the safest single choice for a varied board.",
          attributes: ["Cuts fat", "High acidity", "Versatile"],
        },
        {
          wine: "Off-Dry Riesling",
          region: "Mosel or Alsace",
          score: 89,
          why: "A touch of sweetness flatters salty, pungent, and blue cheeses where dry reds struggle.",
          attributes: ["Off-dry", "High acidity", "Flexible"],
        },
        {
          wine: "Tawny Port",
          region: "Douro, Portugal",
          score: 87,
          why: "The classic blue-cheese partner — sweet, nutty richness against salty funk is a timeless contrast.",
          attributes: ["Sweet", "Nutty", "Rich"],
        },
      ],
      avoid: ["Big tannic reds (clash with many cheeses)", "Very dry, lean whites with blues"],
      sommelierNote:
        "The 'red wine and cheese' default is a myth — tannin fights most cheeses. Sparkling and off-dry whites are far more reliable across a varied board, and Port owns the blues.",
      source: "curated",
    },

    "beef|ribeye|": {
      dishSummary:
        "A simply seasoned, well-marbled ribeye — charred crust, abundant fat, and pure beefy richness with nothing to distract from it.",
      pairings: [
        {
          wine: "Cabernet Sauvignon",
          region: "Napa Valley or Bordeaux",
          score: 95,
          why: "The classic for good reason: a fatty ribeye has exactly the marbling and protein that firm Cabernet tannin needs to soften, and each makes the other taste richer.",
          attributes: ["Firm tannin", "Tannin meets fat", "Full body"],
        },
        {
          wine: "Malbec",
          region: "Mendoza, Argentina",
          score: 90,
          why: "Plush, dark-fruited, and smooth, Malbec is the friendlier steak red — bold enough for the fat, softer on the tannin.",
          attributes: ["Plush", "Dark fruit", "Soft tannin"],
        },
        {
          wine: "Brunello di Montalcino",
          region: "Tuscany, Italy",
          score: 87,
          why: "For an Old-World turn, Sangiovese's structure and savory cherry cut the fat with bright acidity.",
          attributes: ["Structured", "High acidity", "Savory"],
        },
      ],
      avoid: ["Light whites", "Delicate Pinot Grigio", "Crisp rosé"],
      sommelierNote:
        "A plain ribeye is the one dish where the big-Cabernet reflex is simply correct — the fat demands tannin. Add a sauce, though, and the calculus changes entirely.",
      source: "curated",
    },

    "beef|strip|au jus / red wine": {
      dishSummary:
        "A New York strip in a glossy red-wine jus — firm, lean-edged beef with a savory, reduction-rich sauce.",
      pairings: [
        {
          wine: "Cabernet Sauvignon",
          region: "Bordeaux or Napa",
          score: 93,
          why: "The strip's structure and the concentrated jus both stand up to firm Cabernet, and the wine's dark fruit deepens the savory reduction.",
          attributes: ["Structured", "Dark fruit", "Savory"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 90,
          why: "Peppery and savory, Syrah echoes the reduction's depth and adds a smoky lift.",
          attributes: ["Peppery", "Savory", "Full body"],
        },
        {
          wine: "Bordeaux Blend",
          region: "Bordeaux, France",
          score: 88,
          why: "A classic claret has the savory, structured profile built for steak in a wine sauce.",
          attributes: ["Classic", "Balanced", "Structured"],
        },
      ],
      avoid: ["Light whites", "Sweet wines", "Delicate rosé"],
      sommelierNote:
        "When the sauce is literally made of red wine, pour something in the same savory, structured family — it's a continuation of the dish, not a contrast.",
      source: "curated",
    },

    "chicken|pan-seared|lemon butter": {
      dishSummary:
        "Chicken piccata — pan-seared cutlets in a bright lemon-butter-caper sauce. Tangy, savory, and light.",
      pairings: [
        {
          wine: "Sauvignon Blanc",
          region: "Loire Valley or California",
          score: 92,
          why: "Zesty citrus mirrors the lemon and capers while the acidity cuts the butter, keeping the dish crisp.",
          attributes: ["Citrus-driven", "High acidity", "Crisp"],
        },
        {
          wine: "Pinot Grigio",
          region: "Northern Italy",
          score: 89,
          why: "Light and clean, it refreshes against the tangy sauce without competing with the delicate chicken.",
          attributes: ["Light", "Clean", "Refreshing"],
        },
        {
          wine: "Vermentino",
          region: "Italy",
          score: 86,
          why: "Herbaceous and bright, it picks up the lemon and savory capers nicely.",
          attributes: ["Herbaceous", "Bright", "Coastal"],
        },
      ],
      avoid: ["Oaky Chardonnay", "Red wine", "Sweet wines"],
      sommelierNote:
        "Lemon and capers push the dish toward bright acidity — match it with an equally zesty white, and skip the oak that would smother the delicate sauce.",
      source: "curated",
    },

    "salmon|pan-seared|miso / soy glaze": {
      dishSummary:
        "Seared salmon under a savory-sweet miso-soy glaze — rich, oily fish with caramelized umami depth.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Oregon or Burgundy",
          score: 92,
          why: "Salmon's fat and the umami glaze invite a light red; Pinot's red fruit and acidity meet both without overpowering the fish.",
          attributes: ["Light red", "Red fruit", "Cuts richness"],
        },
        {
          wine: "Dry Rosé",
          region: "Provence, France",
          score: 89,
          why: "Crisp and delicate, rosé bridges the rich fish and the sweet-savory glaze with ease.",
          attributes: ["Dry", "Delicate", "Versatile"],
        },
        {
          wine: "Gewürztraminer (off-dry)",
          region: "Alsace, France",
          score: 85,
          why: "A touch of sweetness and exotic spice flatter the miso glaze's umami and any ginger or chili.",
          attributes: ["Off-dry", "Aromatic", "Spice match"],
        },
      ],
      avoid: ["Tannic reds", "Oaky Chardonnay", "Very dry, austere whites"],
      sommelierNote:
        "Miso and soy bring umami that turns tannin metallic, so even with rich salmon, lean toward a light red, a rosé, or an off-dry white rather than anything big and grippy.",
      source: "curated",
    },

    "pork|grilled|bbq / smoky": {
      dishSummary:
        "Grilled pork glazed in sweet-smoky barbecue — caramelized char, smoke, and a touch of sweetness over lean-to-moderate fat.",
      pairings: [
        {
          wine: "Zinfandel",
          region: "California",
          score: 93,
          why: "Jammy fruit and gentle sweetness mirror the BBQ glaze while the wine's body matches the grill char.",
          attributes: ["Jammy", "Hint of sweetness", "Bold"],
        },
        {
          wine: "Off-Dry Riesling",
          region: "Germany or Finger Lakes",
          score: 91,
          why: "A whisper of sweetness tames smoke and any chili heat while bright acidity slices the richness — the contrarian winner.",
          attributes: ["Off-dry", "High acidity", "Cuts fat"],
        },
        {
          wine: "Grenache",
          region: "Spain or Southern Rhône",
          score: 87,
          why: "Soft, spicy, and red-fruited, it flatters the sweet glaze without harsh tannin.",
          attributes: ["Soft tannin", "Red fruit", "Spice"],
        },
      ],
      avoid: ["High-tannin Cabernet", "Oaky Chardonnay", "Delicate Pinot Grigio"],
      sommelierNote:
        "As with all barbecue, the secret is fruit and a touch of sweetness against the smoke — firm tannin just reads as bitter and ashy next to a glaze.",
      source: "curated",
    },

    "shrimp|grilled|": {
      dishSummary:
        "Simply grilled shrimp — sweet, smoky-charred shellfish with a clean, light profile.",
      pairings: [
        {
          wine: "Albariño",
          region: "Rías Baixas, Spain",
          score: 92,
          why: "Saline minerality and bright acidity are tailor-made for sweet, charred shrimp — it tastes of the coast.",
          attributes: ["Saline", "Bright", "Fresh"],
        },
        {
          wine: "Dry Rosé",
          region: "Provence, France",
          score: 89,
          why: "Light and crisp, rosé flatters grilled shellfish on any warm evening without overpowering it.",
          attributes: ["Dry", "Light", "Versatile"],
        },
        {
          wine: "Verdejo",
          region: "Rueda, Spain",
          score: 86,
          why: "Zesty and herbaceous, it keeps grilled shrimp lively and refreshing.",
          attributes: ["Zesty", "Herbaceous", "Crisp"],
        },
      ],
      avoid: ["Red wine", "Oaky whites", "Sweet wines"],
      sommelierNote:
        "Plain grilled shrimp is delicate and a touch sweet — keep the wine light, dry, and high-acid so it lifts the shellfish instead of burying it.",
      source: "curated",
    },

    "pasta||mushroom / truffle": {
      dishSummary:
        "Truffle or wild-mushroom pasta — earthy, savory, and deeply umami, with luxurious aromatic depth.",
      pairings: [
        {
          wine: "Nebbiolo",
          region: "Piedmont, Italy",
          score: 93,
          why: "Barolo and Barbaresco carry an uncanny truffle-and-rose aromatic that mirrors the dish, with acidity to keep the richness lively.",
          attributes: ["Truffle notes", "High acidity", "Aromatic"],
        },
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 91,
          why: "Forest-floor earthiness echoes the mushrooms while the wine's delicacy keeps the pasta elegant.",
          attributes: ["Earthy mirror", "Silky", "Red fruit"],
        },
        {
          wine: "Oaked Chardonnay",
          region: "Burgundy",
          score: 87,
          why: "For a white, a round, savory Chardonnay matches the dish's richness and umami weight.",
          attributes: ["Round", "Savory", "Full"],
        },
      ],
      avoid: ["Crisp neutral whites", "Sweet wines", "Light rosé"],
      sommelierNote:
        "Truffle craves earth in the glass — Old-World Nebbiolo and Burgundy carry that forest-floor quality, while bright, fruity New-World wines tend to talk over it.",
      source: "curated",
    },

    "vegetarian||tomato-based": {
      dishSummary:
        "A tomato-driven vegetarian dish — eggplant parmesan or similar — savory, acidic, herbal, with melted cheese and rich red sauce.",
      pairings: [
        {
          wine: "Sangiovese",
          region: "Chianti, Tuscany",
          score: 93,
          why: "The wine's bright acidity matches the tomato and cuts the cheese, exactly as it does with meat-based red sauce.",
          attributes: ["High acidity", "Tart cherry", "Savory"],
        },
        {
          wine: "Barbera",
          region: "Piedmont, Italy",
          score: 90,
          why: "Juicy and low-tannin, it stays food-friendly against the acidic sauce and melted cheese.",
          attributes: ["Juicy", "Low tannin", "Bright"],
        },
        {
          wine: "Montepulciano d'Abruzzo",
          region: "Abruzzo, Italy",
          score: 86,
          why: "Soft and dark-fruited, it's an easy, great-value partner for a hearty baked tomato dish.",
          attributes: ["Soft", "Dark fruit", "Value"],
        },
      ],
      avoid: ["Oaky Chardonnay", "High-tannin Cabernet", "Sweet wines"],
      sommelierNote:
        "Match the sauce, not the absence of meat — a tomato-based vegetarian dish wants the same high-acid Italian reds that any red sauce does.",
      source: "curated",
    },

    "vegetarian|grilled|": {
      dishSummary:
        "Grilled vegetables — smoky char on eggplant, zucchini, peppers, and onion, with natural sweetness and savory depth.",
      pairings: [
        {
          wine: "Dry Rosé",
          region: "Provence or Spain",
          score: 90,
          why: "Fresh and versatile, rosé flatters the smoky char and natural sweetness of grilled veg without overwhelming them.",
          attributes: ["Fresh", "Versatile", "Light"],
        },
        {
          wine: "Grenache",
          region: "Southern Rhône or Spain",
          score: 88,
          why: "Soft, red-fruited, and spicy, it adds warmth that meets the caramelized char with gentle tannin.",
          attributes: ["Soft tannin", "Red fruit", "Spice"],
        },
        {
          wine: "Sauvignon Blanc",
          region: "Loire Valley",
          score: 86,
          why: "Herbaceous and crisp, it picks up the green, garden notes and keeps the plate bright.",
          attributes: ["Herbaceous", "Crisp", "Green notes"],
        },
      ],
      avoid: ["Big tannic reds", "Heavily oaked whites", "Sweet wines"],
      sommelierNote:
        "Grilled vegetables sit between sweet and savory with a smoky edge — a dry rosé or a soft, spicy red handles that range far better than anything heavy or tannic.",
      source: "curated",
    },

    "lamb|braised|au jus / red wine": {
      dishSummary:
        "Braised lamb shank in red-wine jus — fall-off-the-bone, intensely savory and gamey, with a deep, glossy reduction.",
      pairings: [
        {
          wine: "Syrah",
          region: "Northern Rhône, France",
          score: 94,
          why: "Slow-braised lamb's savory depth meets Syrah's peppery, smoky power, while the reduction echoes the wine's own dark intensity.",
          attributes: ["Savory depth", "Peppery", "Full body"],
        },
        {
          wine: "Cabernet Sauvignon",
          region: "Bordeaux or Napa",
          score: 91,
          why: "The gelatin and gaminess of braised lamb are exactly what firm Cabernet needs to soften and shine.",
          attributes: ["Structured", "Dark fruit", "Tannin meets fat"],
        },
        {
          wine: "Tempranillo (Rioja Reserva)",
          region: "Rioja, Spain",
          score: 89,
          why: "Leather and dried herb in aged Rioja flatter the gamey, herbal richness of slow-cooked lamb.",
          attributes: ["Leather", "Dried herb", "Smooth"],
        },
      ],
      avoid: ["Light whites", "Crisp rosé", "Low-tannin reds"],
      sommelierNote:
        "Braised lamb is the maximal version of the lamb-and-big-red rule — the longer the cook and the deeper the jus, the bolder and more savory the wine can be.",
      source: "curated",
    },

    "duck|roasted|au jus / red wine": {
      dishSummary:
        "Roast duck in red-wine jus — crisp skin, rich rendered fat, and a savory, glossy reduction.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 94,
          why: "The benchmark duck pairing: earthiness and acidity cut the fat while red fruit deepens the savory jus.",
          attributes: ["Earthy", "Red fruit", "Cuts richness"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 90,
          why: "For a bolder match, Syrah's savory, peppery depth stands up to crisp duck and rich reduction.",
          attributes: ["Peppery", "Savory", "Full body"],
        },
        {
          wine: "Nebbiolo",
          region: "Piedmont, Italy",
          score: 87,
          why: "High acidity and firm structure slice through the duck fat, with aromatics that lift the savory dish.",
          attributes: ["High acidity", "Structured", "Aromatic"],
        },
      ],
      avoid: ["Light crisp whites", "Sweet wines", "Simple rosé"],
      sommelierNote:
        "Duck with a red-wine jus is practically a recipe for Pinot Noir — body to match the richness, acidity to cut the fat, and earth to echo the savory sauce.",
      source: "curated",
    },

    "lobster|grilled|": {
      dishSummary:
        "Grilled lobster — sweet, smoky-charred shellfish, rich and luxurious with a hint of the grill.",
      pairings: [
        {
          wine: "Oaked Chardonnay",
          region: "Burgundy or California",
          score: 92,
          why: "Rich, sweet lobster meets the wine's creamy, full texture in a luxurious like-with-like match, with the char adding depth.",
          attributes: ["Buttery", "Full texture", "Luxurious"],
        },
        {
          wine: "Champagne",
          region: "Champagne, France",
          score: 91,
          why: "Brut bubbles and bright acidity refresh the palate between rich, smoky bites — the celebratory choice.",
          attributes: ["Sparkling", "High acidity", "Elegant"],
        },
        {
          wine: "Viognier",
          region: "Condrieu, France",
          score: 86,
          why: "Aromatic and round, it brings floral lift and body that flatter sweet grilled lobster.",
          attributes: ["Aromatic", "Round", "Floral"],
        },
      ],
      avoid: ["Tannic reds", "Light crisp whites", "Sweet wines"],
      sommelierNote:
        "Lobster is rich enough to welcome oak — one of the few shellfish where a full Chardonnay shines. The grill char only deepens the case for a wine with real texture.",
      source: "curated",
    },

    "beef|ribeye|peppercorn": {
      dishSummary:
        "Ribeye au poivre — a fatty, marbled steak under a sharp, spicy cracked-peppercorn crust.",
      pairings: [
        {
          wine: "Syrah",
          region: "Northern Rhône, France",
          score: 95,
          why: "Syrah's signature black-pepper note bridges directly to the crust, and its full body easily matches a fatty ribeye.",
          attributes: ["Black pepper", "Full body", "Savory"],
        },
        {
          wine: "Cabernet Sauvignon",
          region: "Napa or Bordeaux",
          score: 92,
          why: "Ribeye's marbling is exactly what firm Cabernet tannin needs, and dark fruit tempers the pepper's bite.",
          attributes: ["Structured", "Dark fruit", "Tannin meets fat"],
        },
        {
          wine: "Malbec",
          region: "Mendoza, Argentina",
          score: 88,
          why: "Plush and dark-fruited, Malbec handles both the fat and the spice with a smoother profile.",
          attributes: ["Plush", "Dark fruit", "Soft tannin"],
        },
      ],
      avoid: ["Light whites", "Delicate Pinot Noir", "Off-dry styles"],
      sommelierNote:
        "When pepper is the loudest thing on the plate, Syrah edges out Cabernet — it agrees with the spice instead of fighting it.",
      source: "curated",
    },

    "beef|filet|mushroom / truffle": {
      dishSummary:
        "A tender filet crowned with earthy mushrooms or truffle — lean, refined, and deeply savory.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 94,
          why: "The filet wants finesse, and Burgundy's silky red fruit plus forest-floor earthiness is an uncanny echo of the truffle.",
          attributes: ["Silky", "Earthy mirror", "Elegant"],
        },
        {
          wine: "Barolo (Nebbiolo)",
          region: "Piedmont, Italy",
          score: 91,
          why: "Nebbiolo's truffle and rose aromatics are tailor-made for earthy fungi, with acidity to lift the dish.",
          attributes: ["Truffle notes", "High acidity", "Aromatic"],
        },
        {
          wine: "Merlot",
          region: "Saint-Émilion, France",
          score: 87,
          why: "Plush and supple, Right Bank Merlot flatters a lean cut while its earthiness meets the mushrooms.",
          attributes: ["Plush", "Supple", "Earthy"],
        },
      ],
      avoid: ["Young, firm Cabernet", "Crisp light whites", "Sweet wines"],
      sommelierNote:
        "Truffle plus a delicate cut is a finesse problem, not a power one. Earthy, aromatic reds with gentle tannin let both the filet and the truffle speak.",
      source: "curated",
    },

    "chicken|roasted|cream sauce": {
      dishSummary:
        "Roast chicken in a rich cream sauce — comforting, savory, and coating, with real weight on the palate.",
      pairings: [
        {
          wine: "Chardonnay",
          region: "Burgundy or California",
          score: 92,
          why: "A rounder Chardonnay matches the cream's richness, while its acidity keeps the dish from feeling heavy — a like-with-like classic.",
          attributes: ["Round texture", "Matches weight", "Balancing acidity"],
        },
        {
          wine: "Viognier",
          region: "Condrieu or California",
          score: 87,
          why: "Aromatic and full-bodied, it stands up to the sauce and adds a floral lift.",
          attributes: ["Aromatic", "Full body", "Floral"],
        },
        {
          wine: "Champagne",
          region: "Champagne, France",
          score: 85,
          why: "If you'd rather contrast than match, bubbles and acidity scrub the cream from the palate.",
          attributes: ["Sparkling", "Cuts fat", "High acidity"],
        },
      ],
      avoid: ["Tannic reds", "Lean, austere whites"],
      sommelierNote:
        "Cream needs either matching body or cutting acidity. A rich white does the first job; sparkling does the second — both beat a tannic red, which the sauce will mute.",
      source: "curated",
    },

    "chicken|grilled|bbq / smoky": {
      dishSummary:
        "Grilled BBQ chicken — smoky char and sweet-tangy sauce over lean, mild meat.",
      pairings: [
        {
          wine: "Zinfandel",
          region: "California",
          score: 91,
          why: "Jammy and gently sweet, Zin mirrors the barbecue sauce and brings enough body for the char.",
          attributes: ["Mirrors glaze", "Bold", "Fruit-forward"],
        },
        {
          wine: "Rosé",
          region: "Provence or Spain",
          score: 89,
          why: "Fresh and fruity, rosé keeps a casual grilled plate light and works with the sweet-smoky sauce.",
          attributes: ["Fresh", "Versatile", "Light"],
        },
        {
          wine: "Grenache",
          region: "Southern Rhône",
          score: 86,
          why: "Soft red fruit and warm spice flatter the glaze without overpowering lean chicken.",
          attributes: ["Soft tannin", "Spice", "Red fruit"],
        },
      ],
      avoid: ["Big tannic reds", "Heavily oaked whites"],
      sommelierNote:
        "BBQ chicken is lighter than BBQ pork or beef, so you can drop to a rosé — match the sauce's sweetness, but respect how lean the meat underneath is.",
      source: "curated",
    },

    "scallops|pan-seared|": {
      dishSummary:
        "Simply seared scallops — sweet, delicate, with a caramelized crust and clean flavor.",
      pairings: [
        {
          wine: "Chablis",
          region: "Burgundy, France",
          score: 92,
          why: "Mineral, unoaked Chardonnay matches the scallops' sweetness and delicacy without anything getting in the way.",
          attributes: ["Mineral", "Crisp", "Elegant"],
        },
        {
          wine: "Champagne",
          region: "Champagne, France",
          score: 90,
          why: "Fine bubbles and acidity flatter the sweet sear and keep the palate fresh.",
          attributes: ["Sparkling", "Fine", "High acidity"],
        },
        {
          wine: "Albariño",
          region: "Rías Baixas, Spain",
          score: 87,
          why: "Saline and stone-fruited, a coastal match for sweet shellfish.",
          attributes: ["Saline", "Stone fruit", "Fresh"],
        },
      ],
      avoid: ["Red wine", "Oaky Chardonnay", "Sweet wines"],
      sommelierNote:
        "Scallops are subtly sweet, so the wine should be dry but never austere — bone-dry and aggressive can make them taste bitter. Aim for dry-but-generous.",
      source: "curated",
    },

    "beef|braised|mushroom / truffle": {
      dishSummary:
        "Beef bourguignon style — beef braised low and slow with mushrooms and red wine, deeply savory and tender.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Burgundy, France",
          score: 93,
          why: "The dish is built on Burgundy, so the wine is its natural partner — earthy, silky, with acidity to cut the rich braise.",
          attributes: ["Earthy", "Silky", "Cuts richness"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 90,
          why: "Savory and smoky, Syrah meets the umami depth of slow-braised beef and mushrooms.",
          attributes: ["Savory", "Smoky", "Full body"],
        },
        {
          wine: "Barolo (Nebbiolo)",
          region: "Piedmont, Italy",
          score: 88,
          why: "Firm acidity slices through the braise while truffle aromatics deepen the mushroom notes.",
          attributes: ["High acidity", "Aromatic", "Structured"],
        },
      ],
      avoid: ["Light crisp whites", "Sweet wines", "Simple rosé"],
      sommelierNote:
        "When a dish is cooked in a wine, that wine — or its grape — is almost always the safest pour. Burgundy braise, Burgundy in the glass.",
      source: "curated",
    },

    "lamb|braised|tomato-based": {
      dishSummary:
        "Slow-braised lamb ragù — gamey, rich, and savory, simmered with tomato and herbs.",
      pairings: [
        {
          wine: "Sangiovese",
          region: "Tuscany, Italy",
          score: 93,
          why: "High acidity matches the tomato while the wine's savory cherry and herb flatter the gamey lamb — the Italian table answer.",
          attributes: ["Acid match", "Savory", "Herbal"],
        },
        {
          wine: "Syrah",
          region: "Northern Rhône",
          score: 89,
          why: "Peppery and full-bodied, Syrah meets the lamb's richness and the sauce's depth.",
          attributes: ["Peppery", "Full body", "Savory"],
        },
        {
          wine: "Nebbiolo",
          region: "Piedmont, Italy",
          score: 87,
          why: "Its acidity cuts the rich ragù while structure stands up to slow-cooked lamb.",
          attributes: ["High acidity", "Structured", "Aromatic"],
        },
      ],
      avoid: ["Oaky low-acid whites", "Delicate light reds", "Sweet wines"],
      sommelierNote:
        "Tomato demands acidity and lamb demands savory depth — high-acid Italian reds satisfy both at once, which is why they own the ragù.",
      source: "curated",
    },

    "tuna|grilled|": {
      dishSummary:
        "A grilled tuna steak — meaty, charred, and firm, the steak of the sea.",
      pairings: [
        {
          wine: "Rosé",
          region: "Provence, France",
          score: 90,
          why: "Light, dry, and crisp, rosé has just enough presence for tuna's richness without overpowering its clean flavor.",
          attributes: ["Dry", "Delicate", "Refreshing"],
        },
        {
          wine: "Pinot Noir (chilled)",
          region: "Burgundy or Oregon",
          score: 89,
          why: "Tuna is meaty enough for a light red; chilled Pinot's red fruit and acidity complement the char.",
          attributes: ["Light red", "Red fruit", "Serve chilled"],
        },
        {
          wine: "Grenache",
          region: "Southern Rhône",
          score: 85,
          why: "Soft and red-fruited, a light Grenache can work with grilled tuna's heartier texture.",
          attributes: ["Soft tannin", "Red fruit", "Spice"],
        },
      ],
      avoid: ["Big tannic reds", "Oaky Chardonnay", "Sweet wines"],
      sommelierNote:
        "Tuna is the one fish that takes a red — but only a light, low-tannin one, ideally chilled. Treat it more like a light meat than a delicate fillet.",
      source: "curated",
    },

    "shrimp|fried|": {
      dishSummary:
        "Crispy fried or tempura shrimp — light, crunchy, salty, with sweet shellfish inside.",
      pairings: [
        {
          wine: "Champagne / Sparkling",
          region: "Champagne or quality Crémant",
          score: 92,
          why: "Bubbles and high acidity scrub away the fry and salt between bites — the textbook move for anything crispy.",
          attributes: ["Sparkling", "Cuts grease", "High acidity"],
        },
        {
          wine: "Grüner Veltliner",
          region: "Austria",
          score: 89,
          why: "Crisp, peppery, and citrusy, it keeps fried shellfish bright and refreshing.",
          attributes: ["Crisp", "Citrus", "White pepper"],
        },
        {
          wine: "Prosecco",
          region: "Veneto, Italy",
          score: 86,
          why: "Frothy and fresh, a casual sparkling that lifts light fried bites.",
          attributes: ["Frothy", "Fresh", "Easy"],
        },
      ],
      avoid: ["Tannic reds", "Heavily oaked whites", "Sweet wines"],
      sommelierNote:
        "Fried plus bubbles is one of the most reliable contrasts in pairing — the acidity and effervescence reset your palate against the oil every single time.",
      source: "curated",
    },

    "salmon|grilled|": {
      dishSummary:
        "Plain grilled salmon — rich, oily fish with smoky char and no sauce to complicate it.",
      pairings: [
        {
          wine: "Pinot Noir",
          region: "Oregon or Burgundy",
          score: 91,
          why: "Salmon is the fish that takes a red — its fat is enough for Pinot's light tannin, and the acidity keeps each bite clean.",
          attributes: ["Light red", "Red fruit", "Cuts richness"],
        },
        {
          wine: "Rosé",
          region: "Provence, France",
          score: 88,
          why: "Dry and fresh, rosé bridges the oily fish and smoky char on a warm evening.",
          attributes: ["Dry", "Fresh", "Versatile"],
        },
        {
          wine: "Unoaked Chardonnay",
          region: "Chablis, France",
          score: 87,
          why: "Mineral and bright, it matches salmon's weight while keeping things lean and clean.",
          attributes: ["Mineral", "Medium body", "Crisp"],
        },
      ],
      avoid: ["Heavily oaked whites", "Big tannic reds", "Sweet wines"],
      sommelierNote:
        "Grilled salmon is the gateway to red wine with fish — chill a light Pinot slightly and it works beautifully, char and all.",
      source: "curated",
    },

    "pork|braised|": {
      dishSummary:
        "Slow-braised pork — carnitas or shoulder style, tender, rich, savory, and lightly sweet.",
      pairings: [
        {
          wine: "Grenache",
          region: "Spain or Southern Rhône",
          score: 91,
          why: "Soft, spicy, and red-fruited, Grenache flatters slow-braised pork's richness without harsh tannin.",
          attributes: ["Soft tannin", "Red fruit", "Spice"],
        },
        {
          wine: "Zinfandel",
          region: "California",
          score: 89,
          why: "Jammy and bold, it stands up to the rich, savory-sweet meat with ease.",
          attributes: ["Jammy", "Bold", "Warm"],
        },
        {
          wine: "Barbera",
          region: "Piedmont, Italy",
          score: 86,
          why: "Bright acidity cuts the richness while low tannin keeps it food-friendly.",
          attributes: ["High acidity", "Low tannin", "Juicy"],
        },
      ],
      avoid: ["Big tannic Cabernet", "Delicate light whites"],
      sommelierNote:
        "Braised pork is rich but not heavy in tannin-demanding fat the way beef is — soft, spicy reds with good acidity flatter it far better than a structured Cabernet.",
      source: "curated",
    },
  },

  wine: {
    "cabernet sauvignon": {
      wineSummary:
        "Full-bodied and structured, with firm tannin, dark cassis and black cherry fruit, and often cedar or tobacco from oak. Built for rich, fatty food.",
      pairings: [
        {
          food: "Ribeye steak",
          score: 96,
          why: "The benchmark pairing. Fat and protein soften Cabernet's firm tannin, and the wine makes the marbled beef taste even richer.",
          attributes: ["Tannin meets fat", "Matches weight"],
        },
        {
          food: "Herb-crusted lamb",
          score: 93,
          why: "Lamb's gaminess and fat are exactly what big tannin needs, and herbs echo the wine's savory side.",
          attributes: ["Gamey richness", "Savory match"],
        },
        {
          food: "Aged cheddar",
          score: 88,
          why: "Sharp, crystalline aged cheddar stands up to the wine's power and complements its dark fruit.",
          attributes: ["Bold flavor", "Salt and fat"],
        },
      ],
      avoid: ["Delicate white fish", "Light salads", "Very spicy dishes"],
      sommelierNote:
        "Cabernet's reputation as the all-purpose steak wine is mostly right — but only for fatty, robust cuts. Pour it with lean filet, vinegary sauces, or spice and the tannin turns harsh and metallic.",
      source: "curated",
    },

    "pinot noir": {
      wineSummary:
        "Light- to medium-bodied with high acidity, soft tannin, red-fruit and earthy, forest-floor notes. The great food chameleon.",
      pairings: [
        {
          food: "Roast duck",
          score: 95,
          why: "A timeless match — the wine's earthiness and acidity cut duck's richness while its red fruit flatters the savory meat.",
          attributes: ["Cuts richness", "Earthy harmony"],
        },
        {
          food: "Grilled salmon",
          score: 92,
          why: "One of the rare reds that works with fish; salmon's fat is enough for Pinot's light tannin and its acidity keeps things clean.",
          attributes: ["Light tannin", "Fatty fish"],
        },
        {
          food: "Mushroom risotto",
          score: 90,
          why: "Pinot's forest-floor character is a direct echo of earthy mushrooms.",
          attributes: ["Earthy mirror", "Umami"],
        },
      ],
      avoid: ["Heavily spiced BBQ", "Big blue cheeses", "Bold tannic dishes"],
      sommelierNote:
        "When in doubt at a mixed table, Pinot Noir is the safest red on the list — its acidity and gentle tannin make it agree with more dishes than almost anything else.",
      source: "curated",
    },

    "sauvignon blanc": {
      wineSummary:
        "Light-bodied, bone-dry, high-acid, with zesty citrus, green herb, and sometimes grassy or tropical notes. Built for acid and freshness.",
      pairings: [
        {
          food: "Goat cheese",
          score: 96,
          why: "The classic Loire match. The wine's acidity and herbal snap cut the cheese's tang and richness perfectly.",
          attributes: ["Acid vs. tang", "Herbal harmony"],
        },
        {
          food: "Oysters",
          score: 92,
          why: "Bright citrus and minerality lift briny shellfish like a squeeze of lemon.",
          attributes: ["Citrus lift", "Saline match"],
        },
        {
          food: "Herbed roast chicken",
          score: 88,
          why: "Green, herbaceous notes flatter herb seasoning while acidity keeps the dish fresh.",
          attributes: ["Herb echo", "Refreshing"],
        },
      ],
      avoid: ["Heavy cream sauces", "Red meat", "Rich, oaky dishes"],
      sommelierNote:
        "Think of Sauvignon Blanc as a squeeze of lemon in a glass — it belongs wherever you'd reach for citrus, and it clashes wherever you wouldn't.",
      source: "curated",
    },

    "syrah / shiraz": {
      wineSummary:
        "Full-bodied with a signature black-pepper note, dark fruit, smoke, and savory, meaty depth. Bold and structured.",
      pairings: [
        {
          food: "Peppercorn steak",
          score: 95,
          why: "Syrah's natural pepper note is a direct bridge to a peppercorn crust, and its body matches a robust cut.",
          attributes: ["Pepper bridge", "Full body"],
        },
        {
          food: "Smoked brisket",
          score: 92,
          why: "Smoke and savory depth in the wine ride alongside barbecue's smoke and fat.",
          attributes: ["Smoke harmony", "Bold match"],
        },
        {
          food: "Braised lamb",
          score: 90,
          why: "Rich, slow-cooked lamb meets Syrah's savory power and dark fruit.",
          attributes: ["Savory depth", "Matches richness"],
        },
      ],
      avoid: ["Delicate fish", "Light salads", "Subtle dishes"],
      sommelierNote:
        "Whenever black pepper is a real player on the plate, Syrah beats Cabernet — it agrees with the seasoning instead of fighting it.",
      source: "curated",
    },

    "champagne / sparkling": {
      wineSummary:
        "High-acid and effervescent, from bone-dry Brut to off-dry, with citrus, apple, and often toasty, brioche notes. A palate-scrubbing all-rounder.",
      pairings: [
        {
          food: "Fried chicken",
          score: 94,
          why: "The famous high-low match — bubbles and acidity cut through salt and grease for pure refreshment.",
          attributes: ["Cuts fat", "Refreshes palate"],
        },
        {
          food: "Oysters",
          score: 93,
          why: "Brisk acidity and minerality are a coastal natural with briny raw shellfish.",
          attributes: ["Saline match", "High acidity"],
        },
        {
          food: "Salty snacks & canapés",
          score: 90,
          why: "Salt and bubbles are one of the great contrasts; Champagne makes anything fried or salted taste lighter.",
          attributes: ["Salt contrast", "Versatile"],
        },
      ],
      avoid: ["Heavy red meat", "Very sweet desserts (unless demi-sec)"],
      sommelierNote:
        "Champagne is the most underrated food wine on earth. People save it for toasts, but its acidity and bubbles make it one of the most versatile partners at any table — especially with anything salty or fried.",
      source: "curated",
    },

    "malbec": {
      wineSummary:
        "Full-bodied with plush dark fruit, soft-to-medium tannin, and notes of plum, blackberry, and cocoa. Approachable and rich.",
      pairings: [
        {
          food: "Grilled red meat",
          score: 95,
          why: "Argentina's asado wine — its juicy fruit and smooth tannin are made for charred, fatty beef.",
          attributes: ["Matches char", "Soft tannin"],
        },
        {
          food: "Steak with chimichurri",
          score: 93,
          why: "The native pairing; the wine's freshness echoes the herb-and-vinegar sauce while its body handles the beef.",
          attributes: ["Regional match", "Fruit and freshness"],
        },
        {
          food: "Beef empanadas",
          score: 88,
          why: "Savory, spiced beef in pastry is a comfortable, classic partner for Malbec's dark fruit.",
          attributes: ["Savory", "Easy match"],
        },
      ],
      avoid: ["Delicate seafood", "Light salads", "Subtle white-fish dishes"],
      sommelierNote:
        "Malbec is the crowd-pleasing steak wine — softer and fruitier than Cabernet, so it's friendlier with a wider range of preparations and easier for a table that doesn't love grippy tannin.",
      source: "curated",
    },

    "riesling": {
      wineSummary:
        "Light-bodied, intensely aromatic, with razor acidity and styles from bone-dry to lusciously sweet. Lime, green apple, and a signature mineral or petrol note.",
      pairings: [
        {
          food: "Spicy Thai or Szechuan",
          score: 95,
          why: "Off-dry Riesling is the great spice tamer — a touch of sweetness cools chili heat while acidity keeps it refreshing.",
          attributes: ["Tames spice", "High acidity"],
        },
        {
          food: "Pork with apple",
          score: 91,
          why: "Riesling's orchard fruit and acidity are a natural with pork and anything sweet-savory.",
          attributes: ["Fruit harmony", "Cuts richness"],
        },
        {
          food: "Fried chicken",
          score: 89,
          why: "A whisper of sweetness loves salt and crunch; acidity keeps it from feeling heavy.",
          attributes: ["Balances salt", "Crisp"],
        },
      ],
      avoid: ["Rare red meat", "Bitter greens", "Heavy tannic dishes"],
      sommelierNote:
        "Riesling is the secret weapon for spicy food — far better than a tannic red, which amplifies heat. Just check the sweetness level: off-dry for spice, bone-dry for delicate seafood.",
      source: "curated",
    },

    "chardonnay": {
      wineSummary:
        "Medium- to full-bodied; style swings on oak. Unoaked is crisp, mineral, and apple-driven; oaked is rich, buttery, and toasty. This profile assumes a moderately oaked style.",
      pairings: [
        {
          food: "Roast chicken",
          score: 93,
          why: "Chardonnay's body and gentle oak match crisp skin and savory meat without overwhelming it — a benchmark pairing.",
          attributes: ["Matches weight", "Savory"],
        },
        {
          food: "Lobster with butter",
          score: 92,
          why: "Rich, buttery shellfish meets the wine's creamy texture in a luxurious, like-with-like match.",
          attributes: ["Buttery harmony", "Full texture"],
        },
        {
          food: "Seared scallops",
          score: 88,
          why: "Sweet, caramelized scallops pair with Chardonnay's roundness; choose a leaner style to keep it fresh.",
          attributes: ["Sweet sear", "Round texture"],
        },
      ],
      avoid: ["Spicy dishes", "Light vinaigrette salads", "Delicate raw fish (if oaked)"],
      sommelierNote:
        "Always ask oaked or unoaked first — they're almost different wines. Oaked Chardonnay wants butter and roast; unoaked (Chablis) wants oysters and lemon. Matching the wrong style is the most common Chardonnay mistake.",
      source: "curated",
    },

    "nebbiolo": {
      wineSummary:
        "Full-bodied, pale in color but powerful, with high acidity, firm tannin, and aromas of tar, rose, cherry, and truffle. Demands rich, savory food.",
      pairings: [
        {
          food: "Truffle dishes",
          score: 95,
          why: "Nebbiolo's signature truffle and forest-floor aromatics are an uncanny echo of the real thing — a regional Piedmontese marriage.",
          attributes: ["Truffle mirror", "Earthy"],
        },
        {
          food: "Braised beef (brasato)",
          score: 93,
          why: "Slow-braised beef has the richness and gelatin to tame the firm tannin and savor the wine's depth.",
          attributes: ["Tames tannin", "Rich match"],
        },
        {
          food: "Aged hard cheese",
          score: 88,
          why: "Nutty, crystalline aged cheeses complement the structure and acidity.",
          attributes: ["Salt and fat", "Structure match"],
        },
      ],
      avoid: ["Light fish", "Spicy food", "Delicate dishes"],
      sommelierNote:
        "Nebbiolo is deceptive — it looks pale and delicate but hits with serious tannin and acid. It needs equally serious, fatty, savory food; it will overpower anything subtle.",
      source: "curated",
    },

    "albariño": {
      wineSummary:
        "Light-bodied, high-acid, and saline, with stone fruit, citrus, and a distinctly coastal minerality. A seafood specialist.",
      pairings: [
        {
          food: "Grilled shellfish",
          score: 95,
          why: "Albariño's salinity and acidity are tailor-made for shrimp, scallops, and clams — it tastes like the sea.",
          attributes: ["Saline match", "High acidity"],
        },
        {
          food: "Ceviche",
          score: 92,
          why: "Bright citrus in the wine echoes the lime cure and keeps raw fish lively.",
          attributes: ["Citrus echo", "Fresh"],
        },
        {
          food: "Grilled white fish",
          score: 89,
          why: "Light enough not to dominate, with stone fruit that flatters simply prepared fish.",
          attributes: ["Delicate", "Stone fruit"],
        },
      ],
      avoid: ["Red meat", "Cream sauces", "Heavy, rich dishes"],
      sommelierNote:
        "If you're eating anything from the sea and want to play it safe, Albariño almost never misses — it's practically engineered for shellfish.",
      source: "curated",
    },

    "merlot": {
      wineSummary:
        "Medium- to full-bodied with soft, supple tannin, plush plum and black cherry fruit, and a smooth, approachable texture. The gentle counterpart to Cabernet.",
      pairings: [
        {
          food: "Roast chicken",
          score: 91,
          why: "Merlot's softness and round fruit flatter savory roast poultry without the grip of a bigger red.",
          attributes: ["Soft tannin", "Plush fruit"],
        },
        {
          food: "Pork tenderloin",
          score: 90,
          why: "Mild, slightly sweet pork meets Merlot's plummy fruit in a comfortable, crowd-pleasing match.",
          attributes: ["Smooth match", "Fruit-forward"],
        },
        {
          food: "Mushroom dishes",
          score: 88,
          why: "Earthy notes in Merlot complement mushrooms, and the supple tannin keeps things easy.",
          attributes: ["Earthy", "Approachable"],
        },
      ],
      avoid: ["Very spicy food", "Delicate raw fish", "Bitter greens"],
      sommelierNote:
        "Merlot is Cabernet with the sharp edges sanded off — reach for it when a table wants red wine but not a tannic workout. It's the easy yes.",
      source: "curated",
    },

    "zinfandel": {
      wineSummary:
        "Full-bodied and high in alcohol, with jammy blackberry and bramble fruit, sweet baking spice, and a touch of perceived sweetness. Bold and exuberant.",
      pairings: [
        {
          food: "BBQ ribs",
          score: 95,
          why: "Zin's jammy fruit and gentle sweetness are a direct mirror to sweet-smoky barbecue sauce — the all-American match.",
          attributes: ["Mirrors glaze", "Bold"],
        },
        {
          food: "Burgers",
          score: 90,
          why: "Big, fruity, and casual, Zin is built for a juicy, char-grilled burger.",
          attributes: ["Casual", "Fruit-forward"],
        },
        {
          food: "Smoked sausages",
          score: 88,
          why: "Spice and smoke in the food meet Zin's brambly warmth and baking spice.",
          attributes: ["Spice harmony", "Warm"],
        },
      ],
      avoid: ["Delicate fish", "Light salads", "Subtle dishes"],
      sommelierNote:
        "Zinfandel is the barbecue wine. Its fruit reads almost sweet against smoke and spice, which is exactly why it works where tannic reds turn bitter.",
      source: "curated",
    },

    "tempranillo": {
      wineSummary:
        "Medium- to full-bodied with moderate tannin, savory red and dark fruit, and signature leather, tobacco, and dried-herb notes — especially with age (Rioja). Earthy and food-loving.",
      pairings: [
        {
          food: "Grilled lamb",
          score: 93,
          why: "Spain's classic pairing — leather and dried herb in the wine echo grilled lamb's savory, herbal richness.",
          attributes: ["Savory match", "Earthy"],
        },
        {
          food: "Chorizo & cured meats",
          score: 91,
          why: "Smoky, paprika-spiced charcuterie is a regional natural with Tempranillo's savory fruit.",
          attributes: ["Regional", "Smoky harmony"],
        },
        {
          food: "Manchego",
          score: 88,
          why: "Nutty Spanish sheep's-milk cheese complements the wine's savory, leathery depth.",
          attributes: ["Nutty", "Salt and fat"],
        },
      ],
      avoid: ["Delicate fish", "Light salads", "Very spicy dishes"],
      sommelierNote:
        "Tempranillo is built for the Spanish table — anything grilled, cured, or savory. Aged Rioja in particular drinks like leather and dried herbs, which is magic with lamb.",
      source: "curated",
    },

    "sangiovese": {
      wineSummary:
        "Medium-bodied with high acidity, firm-ish tannin, and tart cherry, herb, and savory tomato-leaf notes. Italy's table-wine backbone.",
      pairings: [
        {
          food: "Tomato-based pasta",
          score: 95,
          why: "High acidity in the wine matches the acidity of tomato — the centuries-old regional rule that never misses.",
          attributes: ["Acid match", "Savory cherry"],
        },
        {
          food: "Margherita pizza",
          score: 91,
          why: "Bright, savory, and food-friendly, it cuts the cheese and complements the tomato in one move.",
          attributes: ["Bright", "Cuts richness"],
        },
        {
          food: "Grilled sausage",
          score: 88,
          why: "Savory, herby sausage meets Sangiovese's tart fruit and acidity nicely.",
          attributes: ["Savory", "Herbal"],
        },
      ],
      avoid: ["Oaky low-acid whites", "Delicate fish", "Sweet dishes"],
      sommelierNote:
        "Sangiovese was bred alongside Italian food, so it reflexively works with tomato, herbs, and savory dishes. The high acidity that feels tart on its own is exactly what the cuisine needs.",
      source: "curated",
    },

    "grenache": {
      wineSummary:
        "Medium- to full-bodied with soft tannin, high alcohol, and ripe red-berry fruit with white pepper and warm spice. Generous and easygoing.",
      pairings: [
        {
          food: "Grilled lamb",
          score: 92,
          why: "Grenache's ripe red fruit and warm spice flatter lamb's richness while the soft tannin keeps it smooth.",
          attributes: ["Ripe fruit", "Warm spice"],
        },
        {
          food: "Barbecue & stews",
          score: 90,
          why: "Hearty, slow-cooked dishes meet Grenache's body and spice without needing aggressive tannin.",
          attributes: ["Hearty match", "Soft tannin"],
        },
        {
          food: "Roasted vegetables",
          score: 86,
          why: "Caramelized, savory roasted veg pair with the wine's red fruit and spice.",
          attributes: ["Savory", "Spice"],
        },
      ],
      avoid: ["Delicate fish", "Light, crisp salads"],
      sommelierNote:
        "Grenache gives you red-wine warmth and spice without a tannic bite, which makes it a friendly pick for hearty, rustic food and tables that find Cabernet too grippy.",
      source: "curated",
    },

    "barbera": {
      wineSummary:
        "Medium-bodied with very high acidity, low tannin, and juicy dark-cherry fruit. One of the most food-friendly reds there is.",
      pairings: [
        {
          food: "Tomato-based pasta",
          score: 93,
          why: "Searing acidity and low tannin make Barbera effortless with tomato sauce — bright, juicy, and refreshing.",
          attributes: ["High acidity", "Low tannin"],
        },
        {
          food: "Pizza",
          score: 90,
          why: "Its juicy fruit and acidity cut cheese and grease while staying casual and easy.",
          attributes: ["Juicy", "Cuts richness"],
        },
        {
          food: "Charcuterie",
          score: 87,
          why: "Bright acidity refreshes the palate against salty, fatty cured meats.",
          attributes: ["Refreshing", "Versatile"],
        },
      ],
      avoid: ["Heavily oaked rich dishes", "Very delicate fish"],
      sommelierNote:
        "Barbera is the everyday Italian red — low tannin and high acid mean it almost never fights the food. When unsure with a savory, tomato-y, or cheesy plate, it's a safe pour.",
      source: "curated",
    },

    "montepulciano": {
      wineSummary:
        "Medium- to full-bodied with soft tannin, dark plum and black-cherry fruit, and an easygoing, rustic character. Excellent value.",
      pairings: [
        {
          food: "Hearty red-sauce pasta",
          score: 92,
          why: "Soft and dark-fruited, it's a comfortable partner for rich, meaty tomato sauces.",
          attributes: ["Soft", "Dark fruit"],
        },
        {
          food: "Pizza & calzone",
          score: 89,
          why: "Easygoing and food-friendly, it handles cheese, tomato, and cured-meat toppings with ease.",
          attributes: ["Casual", "Versatile"],
        },
        {
          food: "Grilled vegetables",
          score: 85,
          why: "Smoky char on vegetables meets the wine's mellow dark fruit.",
          attributes: ["Mellow", "Savory"],
        },
      ],
      avoid: ["Delicate seafood", "Light salads"],
      sommelierNote:
        "Montepulciano d'Abruzzo is the great-value weeknight red — soft, dark, and forgiving. It won't dazzle a sommelier, but it'll never let down a plate of pasta.",
      source: "curated",
    },

    "pinot grigio": {
      wineSummary:
        "Light-bodied, crisp, and dry, with subtle green-apple, pear, and citrus notes and a clean, neutral finish. Refreshing and unobtrusive.",
      pairings: [
        {
          food: "Light seafood",
          score: 90,
          why: "Crisp and neutral, it lets delicate fish and shellfish shine while keeping things fresh.",
          attributes: ["Crisp", "Clean"],
        },
        {
          food: "Antipasti & salads",
          score: 88,
          why: "Light and zippy, it's the easy aperitivo white for fresh, simple starters.",
          attributes: ["Light", "Refreshing"],
        },
        {
          food: "Fried calamari",
          score: 87,
          why: "Bright acidity cuts the fry and refreshes the palate between bites.",
          attributes: ["Cuts grease", "Zippy"],
        },
      ],
      avoid: ["Red meat", "Rich cream sauces", "Bold spiced dishes"],
      sommelierNote:
        "Pinot Grigio's strength is staying out of the way — it's a refresher, not a statement. Don't ask it to stand up to anything rich; ask it to keep light food light.",
      source: "curated",
    },

    "viognier": {
      wineSummary:
        "Full-bodied and intensely aromatic, with peach, apricot, honeysuckle, and a round, almost oily texture. Low acidity, big perfume.",
      pairings: [
        {
          food: "Spiced or aromatic chicken",
          score: 91,
          why: "Viognier's florals and stone fruit flatter fragrant spices and herbs without clashing.",
          attributes: ["Aromatic", "Stone fruit"],
        },
        {
          food: "Mild Thai or Indian curry",
          score: 89,
          why: "Its body and perfume stand up to fragrant, mildly spiced dishes where lighter whites would vanish.",
          attributes: ["Full body", "Floral"],
        },
        {
          food: "Lobster",
          score: 87,
          why: "Rich, sweet shellfish meets the wine's round texture and aromatic lift.",
          attributes: ["Round", "Luxurious"],
        },
      ],
      avoid: ["Red meat", "High-tannin pairings", "Very acidic dishes"],
      sommelierNote:
        "Viognier is all perfume and texture but low on acidity, so it shines with aromatic, gently spiced food — and falters where you'd want a wine to cut and refresh.",
      source: "curated",
    },

    "gewürztraminer": {
      wineSummary:
        "Full-bodied and exotically aromatic, with lychee, rose, and ginger-spice notes, often off-dry, with low acidity. Unmistakable and polarizing.",
      pairings: [
        {
          food: "Spicy Asian dishes",
          score: 93,
          why: "Its off-dry sweetness and exotic spice are a famous match for fragrant, spicy Thai, Chinese, and Indian food.",
          attributes: ["Tames spice", "Exotic aromatics"],
        },
        {
          food: "Munster cheese",
          score: 90,
          why: "The Alsatian classic — pungent washed-rind cheese meets the wine's perfume and richness head-on.",
          attributes: ["Regional", "Bold match"],
        },
        {
          food: "Foie gras",
          score: 88,
          why: "Rich, fatty foie gras is balanced by the wine's aromatic sweetness and body.",
          attributes: ["Rich", "Off-dry balance"],
        },
      ],
      avoid: ["Delicate, subtle dishes", "High-acid food", "Plain grilled fish"],
      sommelierNote:
        "Gewürztraminer is a specialist, not a generalist — its lychee-and-rose perfume overwhelms subtle food but conquers fragrant spice and pungent cheese like nothing else.",
      source: "curated",
    },

    "grüner veltliner": {
      wineSummary:
        "Light- to medium-bodied, dry, and high-acid, with green apple, citrus, and a signature white-pepper and herb note. Austria's crisp, food-friendly white.",
      pairings: [
        {
          food: "Asparagus & green vegetables",
          score: 92,
          why: "One of the few wines that handles notoriously wine-unfriendly asparagus — its herbal, peppery edge meets the vegetable's green bitterness.",
          attributes: ["Veg-friendly", "Herbal"],
        },
        {
          food: "Wiener schnitzel",
          score: 90,
          why: "Bright acidity cuts the fried richness — the Austrian regional pairing.",
          attributes: ["Cuts grease", "Regional"],
        },
        {
          food: "Sushi & sashimi",
          score: 88,
          why: "Clean, citrusy, and peppery, it complements raw fish without overpowering it.",
          attributes: ["Clean", "Citrus"],
        },
      ],
      avoid: ["Red meat", "Heavy cream sauces", "Bold tannic pairings"],
      sommelierNote:
        "Grüner is a secret weapon for hard-to-pair foods — asparagus, artichoke, and green herbs that defeat most wines. When a dish 'has no wine,' reach for Grüner.",
      source: "curated",
    },

    "rosé": {
      wineSummary:
        "Light-bodied, dry, and crisp, with red-berry and citrus notes and refreshing acidity. The great warm-weather all-rounder.",
      pairings: [
        {
          food: "Charcuterie",
          score: 91,
          why: "Crisp acidity and light red fruit refresh the palate against salty, fatty cured meats.",
          attributes: ["Refreshing", "Versatile"],
        },
        {
          food: "Salade Niçoise",
          score: 89,
          why: "A Provençal natural — rosé's freshness ties together tuna, olives, egg, and vegetables.",
          attributes: ["Regional", "Light"],
        },
        {
          food: "Grilled shrimp",
          score: 88,
          why: "Light and dry, it flatters sweet grilled shellfish without overpowering it.",
          attributes: ["Delicate", "Fresh"],
        },
      ],
      avoid: ["Heavy braised red meat", "Rich, tannic dishes"],
      sommelierNote:
        "Dry rosé is the most versatile bottle for a mixed, casual table — it splits the difference between white's freshness and red's fruit, so it pleases nearly everyone.",
      source: "curated",
    },

    "prosecco": {
      wineSummary:
        "Light-bodied, off-dry to dry sparkling, with fresh pear, apple, and floral notes and soft, frothy bubbles. Easygoing and aperitif-friendly.",
      pairings: [
        {
          food: "Aperitivo & light bites",
          score: 90,
          why: "Frothy, fruity, and low-intensity, Prosecco is built for the pre-dinner spread of olives, nuts, and small bites.",
          attributes: ["Aperitif", "Light"],
        },
        {
          food: "Prosciutto & melon",
          score: 89,
          why: "Salty-sweet starters meet Prosecco's fruit and gentle fizz beautifully.",
          attributes: ["Salt-sweet", "Refreshing"],
        },
        {
          food: "Fried appetizers",
          score: 87,
          why: "Bubbles and acidity cut through fried, salty bites and keep the palate fresh.",
          attributes: ["Cuts grease", "Bright"],
        },
      ],
      avoid: ["Heavy red meat", "Rich braised dishes", "Bold spicy mains"],
      sommelierNote:
        "Prosecco is softer and fruitier than Champagne — think aperitivo, not main course. It's the start-of-the-evening pour, perfect for light, salty, fried, or fruity bites.",
      source: "curated",
    },

    "orange wine": {
      wineSummary:
        "Skin-contact white with grippy tannin, savory and nutty notes, dried fruit, and a bold, sometimes funky character. Structured like a red but made from white grapes.",
      pairings: [
        {
          food: "Fermented & funky dishes",
          score: 91,
          why: "Orange wine's savory, oxidative character meets miso, kimchi, and aged cheese where conventional wines fall apart.",
          attributes: ["Savory", "Funk-friendly"],
        },
        {
          food: "Moroccan & Middle Eastern tagines",
          score: 89,
          why: "Its tannic grip and dried-fruit notes flatter spiced, savory-sweet stews and ras el hanout.",
          attributes: ["Spice match", "Structured"],
        },
        {
          food: "Mild curry",
          score: 86,
          why: "The texture and savory depth stand up to fragrant, spiced dishes that overwhelm lighter whites.",
          attributes: ["Bold", "Textured"],
        },
      ],
      avoid: ["Delicate raw fish", "Light salads", "Subtle, refined dishes"],
      sommelierNote:
        "Orange wine drinks like a white with the structure of a red, so treat it like a light red at the table. It's the go-to for bold, funky, fermented, and heavily spiced foods that defeat normal whites.",
      source: "curated",
    },
  },
};
