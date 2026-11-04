// scripts/supermarketDataGenerator.cjs
/**
 * Israeli Supermarket Comprehensive 1,000+ Products Database Generator
 * Covers all 12 official supermarket departments:
 * 1. dairy_eggs (חלב וביצים)
 * 2. bakery (לחם ומאפים)
 * 3. produce (פירות וירקות)
 * 4. meat_fish (בשר עוף ודגים)
 * 5. frozen (קפואים)
 * 6. canned_cooking (שימורים ובישול)
 * 7. grains_pasta (דגנים ופסטות)
 * 8. snacks_sweets (חטיפים ומתוקים)
 * 9. beverages_alcohol (שתייה קלה ואלכוהול)
 * 10. coffee_tea (קפה ותה)
 * 11. baby_pharm (תינוקות ופארם)
 * 12. cleaning_disposable (ניקיון וחד-פעמי)
 */

function round1(v) {
  return Math.round(v * 10) / 10;
}

const CHAINS = ['rami_levy', 'osher_ad', 'yochananof', 'shufersal_deal', 'carrefour', 'victory', 'hazi_hinam'];

// Generates prices across all 7 chains
function calcPrices(base, isRegulated = false, seed = 1) {
  if (isRegulated) {
    const regPrice = Number(base.toFixed(2));
    return {
      rami_levy: regPrice,
      osher_ad: regPrice,
      yochananof: regPrice,
      shufersal_deal: regPrice,
      carrefour: regPrice,
      victory: regPrice,
      hazi_hinam: regPrice
    };
  }

  // Slight natural deterministic variance per item
  const j1 = ((seed * 7) % 11 - 5) / 100; // -0.05 to +0.05
  const j2 = ((seed * 13) % 9 - 4) / 100;

  return {
    osher_ad: Number(Math.max(1.0, round1(base * (0.94 + j1))).toFixed(2)),
    rami_levy: Number(Math.max(1.0, round1(base * (0.98 + j2))).toFixed(2)),
    yochananof: Number(Math.max(1.0, round1(base * (1.02 + j1 * 0.5))).toFixed(2)),
    carrefour: Number(Math.max(1.0, round1(base * (1.06 + j2 * 0.5))).toFixed(2)),
    victory: Number(Math.max(1.0, round1(base * (1.10 - j1 * 0.5))).toFixed(2)),
    shufersal_deal: Number(Math.max(1.0, round1(base * (1.14 + j1))).toFixed(2)),
    hazi_hinam: Number(Math.max(1.0, round1(base * (1.16 + j2))).toFixed(2))
  };
}

module.exports = {
  CHAINS,
  calcPrices,
  round1
};
