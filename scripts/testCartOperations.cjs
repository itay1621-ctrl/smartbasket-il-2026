// scripts/testCartOperations.cjs
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { calculateOneStopRankings, calculateOptimalSplit } = require('../src/utils/basketOptimizer.js');

const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/supermarket_catalog.json'), 'utf8'));

console.log(`Testing Cart Operations with ${catalog.length} products...`);

// Test items
const cheese100g = catalog.find(p => p.id === 'deli_01');
const milkItem = catalog.find(p => p.id === 'dairy_eggs_1');
const eggItem = catalog.find(p => p.id === 'dairy_eggs_2');

assert(cheese100g, 'Deli cheese deli_01 must exist');
assert(milkItem, 'Milk item dairy_eggs_1 must exist');
assert(eggItem, 'Egg item dairy_eggs_2 must exist');

// 1. addToCart
let cart = [];

function addToCart(product) {
  const idx = cart.findIndex(it => it.id === product.id);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + 1 };
  } else {
    cart.push({ ...product, quantity: 1 });
  }
}

function updateQuantity(productId, delta) {
  cart = cart
    .map(it => {
      if (it.id === productId) {
        const next = it.quantity + delta;
        return next > 0 ? { ...it, quantity: next } : null;
      }
      return it;
    })
    .filter(Boolean);
}

function removeFromCart(productId) {
  cart = cart.filter(it => it.id !== productId);
}

function clearCart() {
  cart = [];
}

// Add 3 products
addToCart(cheese100g);
addToCart(milkItem);
addToCart(eggItem);

assert.strictEqual(cart.length, 3, 'Cart should have 3 items');
assert.strictEqual(cart[0].id, 'deli_01');
assert.strictEqual(cart[0].quantity, 1);

// Increment cheese (quantity -> 2)
addToCart(cheese100g);
assert.strictEqual(cart.find(i => i.id === 'deli_01').quantity, 2, 'Cheese should have quantity 2');

// Increment cheese (quantity -> 3 = 300g)
updateQuantity('deli_01', 1);
assert.strictEqual(cart.find(i => i.id === 'deli_01').quantity, 3, 'Cheese should have quantity 3');

// Decrement cheese (quantity -> 2)
updateQuantity('deli_01', -1);
assert.strictEqual(cart.find(i => i.id === 'deli_01').quantity, 2, 'Cheese should have quantity 2');

// Decrement milk to 0 -> should be removed
assert.strictEqual(cart.find(i => i.id === 'dairy_eggs_1').quantity, 1);
updateQuantity('dairy_eggs_1', -1);
assert.strictEqual(cart.find(i => i.id === 'dairy_eggs_1'), undefined, 'Milk should be removed when qty becomes 0');
assert.strictEqual(cart.length, 2, 'Cart should now have 2 items');

// Remove egg via removeFromCart
removeFromCart('dairy_eggs_2');
assert.strictEqual(cart.find(i => i.id === 'dairy_eggs_2'), undefined, 'Egg should be removed');
assert.strictEqual(cart.length, 1, 'Cart should have 1 item remaining (cheese)');

// Remove cheese via removeFromCart
removeFromCart('deli_01');
assert.strictEqual(cart.length, 0, 'Cart should be completely empty');

// Re-add and clearCart
addToCart(cheese100g);
addToCart(milkItem);
assert.strictEqual(cart.length, 2);
clearCart();
assert.strictEqual(cart.length, 0, 'clearCart should empty the cart');

// Test Ranking and Optimal Split with Deli Cheese
cart = [
  { ...cheese100g, quantity: 3 }, // 300g cheese
  { ...milkItem, quantity: 2 },
  { ...eggItem, quantity: 1 }
];

const rankingsNoShipping = calculateOneStopRankings(cart, false);
assert.strictEqual(rankingsNoShipping.length, 7, 'Must rank all 7 chains');
rankingsNoShipping.forEach(r => {
  assert(r.grandTotal > 0, `Store ${r.storeKey} total must be > 0`);
  assert.strictEqual(r.shipping, 0, 'Shipping must be 0 when disabled');
  assert.strictEqual(r.coveragePercent, 100, 'Coverage must be 100%');
});

const rankingsWithShipping = calculateOneStopRankings(cart, true);
assert.strictEqual(rankingsWithShipping.find(r => r.storeKey === 'osher_ad').shipping, 0, 'Osher Ad shipping must be 0');
assert.strictEqual(rankingsWithShipping.find(r => r.storeKey === 'rami_levy').shipping, 35.90, 'Rami Levy shipping must be 35.90');

const split = calculateOptimalSplit(cart, false);
assert(split, 'Optimal split must return an object');
assert.strictEqual(split.pair.length, 2, 'Split must choose 2 stores');
assert(split.grandTotal <= rankingsNoShipping[0].grandTotal, 'Split total must be <= best single store');

// Test Club Promotions Engine
console.log('Testing Club Promotions Engine & Savings Calculations...');
const rankingsClubOn = calculateOneStopRankings(cart, false, true);
const rankingsClubOff = calculateOneStopRankings(cart, false, false);

assert.strictEqual(rankingsClubOn.length, 7);
assert.strictEqual(rankingsClubOff.length, 7);

// Check that club savings are tracked and that total with club is <= total without club
rankingsClubOn.forEach((r, idx) => {
  const offRank = rankingsClubOff.find(o => o.storeKey === r.storeKey);
  assert(offRank, `Matching store ${r.storeKey} must exist in club-off rankings`);
  assert(r.grandTotal <= offRank.grandTotal, `Club price for ${r.storeKey} (${r.grandTotal}) must be <= regular price (${offRank.grandTotal})`);
  assert(typeof r.clubSavingsTotal === 'number', 'clubSavingsTotal must be numeric');
  assert.strictEqual(Number((offRank.grandTotal - r.grandTotal).toFixed(2)), r.clubSavingsTotal, 'Savings must equal difference between regular and club price');
});

// Verify catalog contains clubPromotions field
assert(Array.isArray(cheese100g.clubPromotions), 'cheese100g must have clubPromotions array');
assert(cheese100g.clubPromotions.length > 0, 'cheese100g must have at least one club promo');
const promoSample = cheese100g.clubPromotions[0];
assert(promoSample.storeKey, 'Promotion must have storeKey');
assert(promoSample.clubName, 'Promotion must have clubName');
assert(typeof promoSample.originalPrice === 'number', 'Promotion must have numeric originalPrice');
assert(typeof promoSample.clubPrice === 'number', 'Promotion must have numeric clubPrice');
assert(typeof promoSample.savingsNis === 'number', 'Promotion must have numeric savingsNis');
assert(promoSample.savingsNis > 0, 'Promotion savingsNis must be positive');
assert(promoSample.description, 'Promotion must have description');

console.log('✅ ALL CART OPERATIONS & CLUB PROMOTIONS CALCULATIONS PASSED 100%!');
