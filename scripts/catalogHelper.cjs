const fs = require('fs');
const path = require('path');

function r(val) {
  return Math.round(val * 10) / 10;
}

const STORES = ['rami_levy', 'shufersal', 'yohananof', 'carrefour', 'osher_ad', 'victory', 'max_stock', 'hastock', 'max_stock_online', 'stock_online'];

function buildProduct(item, isStock = false) {
  const prices = {};
  const inStock = {};
  const base = item.basePrice;

  if (item.regulated) {
    STORES.forEach(s => {
      const isFood = ['rami_levy', 'shufersal', 'yohananof', 'carrefour', 'osher_ad', 'victory'].includes(s);
      prices[s] = isFood ? base : null;
      inStock[s] = isFood;
    });
  } else if (!isStock && item.foodOnly) {
    prices.rami_levy = r(base);
    prices.shufersal = r(base * 1.22);
    prices.yohananof = r(base * 1.04);
    prices.carrefour = r(base * 1.08);
    prices.osher_ad = r(base * 0.95);
    prices.victory = r(base * 1.16);
    prices.max_stock = null;
    prices.hastock = null;
    prices.max_stock_online = null;
    prices.stock_online = null;
    STORES.forEach(s => {
      inStock[s] = prices[s] !== null;
    });
  } else if (!isStock && !item.foodOnly) {
    // Both carry it (supermarket + stock)
    prices.rami_levy = r(base);
    prices.shufersal = r(base * 1.22);
    prices.yohananof = r(base * 1.04);
    prices.carrefour = r(base * 1.08);
    prices.osher_ad = r(base * 0.95);
    prices.victory = r(base * 1.15);
    prices.max_stock = r(base * 0.96);
    prices.hastock = r(base * 1.04);
    prices.max_stock_online = r(base * 1.16);
    prices.stock_online = r(base * 1.25);
    STORES.forEach(s => {
      inStock[s] = true;
    });
  } else {
    // Stock item
    prices.rami_levy = r(base * 0.98);
    prices.shufersal = r(base * 1.35);
    prices.yohananof = r(base * 1.20);
    prices.carrefour = r(base * 1.25);
    prices.osher_ad = base > 100 ? null : r(base * 0.95);
    prices.victory = base > 100 ? null : r(base * 1.28);
    prices.max_stock = r(base);
    prices.hastock = r(base * 1.12);
    prices.max_stock_online = r(base * 1.35);
    prices.stock_online = r(base * 1.65);
    STORES.forEach(s => {
      inStock[s] = prices[s] !== null;
    });
  }

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    unit: item.unit,
    isRegulated: !!item.isRegulated,
    aliases: item.aliases || [item.name],
    prices,
    inStock
  };
}

module.exports = { buildProduct, r };
