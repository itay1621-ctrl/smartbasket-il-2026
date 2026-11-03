/**
 * עזרי ניהול סל הקניות וסנכרון בין הרשימה הויזואלית לטקסט הגולמי
 */
import { CATALOG_PRODUCTS } from '../data/mockStoresData.js';
import { parseHebrewLine, matchProductToCatalog } from './basketOptimizer.js';

export function getBasketQuantityMap(rawText) {
  if (!rawText) return {};
  const map = {};
  const lines = rawText.split('\n');
  for (const line of lines) {
    const parsed = parseHebrewLine(line);
    if (!parsed || !parsed.rawName) continue;
    const prod = matchProductToCatalog(parsed.rawName);
    if (prod && prod.id) {
      map[prod.id] = (map[prod.id] || 0) + parsed.quantity;
    }
  }
  return map;
}

export function updateProductQuantity(rawText, product, newQty) {
  const lines = (rawText || '').split('\n').filter(l => l.trim().length > 0);
  const remainingLines = [];
  let found = false;

  for (const line of lines) {
    const parsed = parseHebrewLine(line);
    if (!parsed) continue;
    const matched = matchProductToCatalog(parsed.rawName);
    if (matched && matched.id === product.id) {
      if (!found && newQty > 0) {
        // שומרים את השורה המעודכנת
        const formatted = newQty === 1 ? product.name : `${newQty} ${product.name}`;
        remainingLines.push(formatted);
        found = true;
      }
      // דילוג על שורות כפולות ישנות של אותו מוצר
    } else {
      remainingLines.push(line);
    }
  }

  // אם המוצר לא היה ברשימה ויש כמות חיובית, נוסיף אותו
  if (!found && newQty > 0) {
    const formatted = newQty === 1 ? product.name : `${newQty} ${product.name}`;
    remainingLines.push(formatted);
  }

  return remainingLines.join('\n');
}

export function addProductToBasket(rawText, product, qtyToAdd = 1) {
  const qtyMap = getBasketQuantityMap(rawText);
  const currentQty = qtyMap[product.id] || 0;
  return updateProductQuantity(rawText, product, currentQty + qtyToAdd);
}

export function removeProductFromBasket(rawText, product) {
  return updateProductQuantity(rawText, product, 0);
}
