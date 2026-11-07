// src/utils/basketOptimizer.js
import { STORES_METADATA } from '../data/mockStoresData.js';

// Cache for the active loaded supermarket catalog
let activeCatalog = [];

export function setActiveCatalog(catalog) {
  if (Array.isArray(catalog) && catalog.length > 0) {
    activeCatalog = catalog;
  }
}

export function getActiveCatalog() {
  return activeCatalog;
}

/**
 * מנרמל מחרוזת עברית להסרת סימני פיסוק, רווחים כפולים ואותיות יחס
 */
export function normalizeHebrew(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[,\.?!;:\-_/()\[\]"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * חילוץ כמות ושם מוצר משורת טקסט חופשית בעברית
 * לדוגמה: "2 חלב תנובה 3%" -> { quantity: 2, rawName: "חלב תנובה 3%" }
 */
export function parseHebrewLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // בדיקת מספר בתחילת השורה
  const leadingNumberMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*(?:x|X|\*|\s)?\s*(.+)$/);
  
  if (leadingNumberMatch) {
    const qty = parseFloat(leadingNumberMatch[1]) || 1;
    const rawName = leadingNumberMatch[2].trim();
    return { quantity: qty, rawName };
  }

  // מילים נפוצות לכמויות
  if (trimmed.startsWith('שני ') || trimmed.startsWith('שתי ')) {
    return { quantity: 2, rawName: trimmed.replace(/^(שני|שתי)\s+/, '') };
  }
  if (trimmed.startsWith('שלושה ') || trimmed.startsWith('שלוש ')) {
    return { quantity: 3, rawName: trimmed.replace(/^(שלושה|שלוש)\s+/, '') };
  }
  if (trimmed.startsWith('ארבעה ') || trimmed.startsWith('ארבע ')) {
    return { quantity: 4, rawName: trimmed.replace(/^(ארבעה|ארבע)\s+/, '') };
  }

  return { quantity: 1, rawName: trimmed };
}

/**
 * התאמת פריט טקסט לקטלוג הסופרמרקטים
 */
export function matchProductToCatalog(rawName, catalog = activeCatalog) {
  const normInput = normalizeHebrew(rawName);
  const products = catalog && catalog.length > 0 ? catalog : activeCatalog;

  if (products.length > 0) {
    // 1. התאמת ברקוד אם הקלט ספרתי בלבד
    if (/^\d{7,14}$/.test(rawName.trim())) {
      const byBarcode = products.find(p => p.barcode === rawName.trim());
      if (byBarcode) return byBarcode;
    }

    // 2. חיפוש מדויק או לפי כינויים (Aliases)
    for (const product of products) {
      if (normalizeHebrew(product.name) === normInput) {
        return product;
      }
      if (product.aliases && Array.isArray(product.aliases)) {
        for (const alias of product.aliases) {
          const normAlias = normalizeHebrew(alias);
          if (normInput.includes(normAlias) || normAlias.includes(normInput)) {
            return product;
          }
        }
      }
    }

    // 3. חיפוש התאמת מילים (Token matching)
    const inputTokens = normInput.split(' ').filter((t) => t.length > 1);
    let bestProduct = null;
    let bestScore = 0;

    for (const product of products) {
      const targetTokens = [
        ...normalizeHebrew(product.name).split(' '),
        ...(product.manufacturer ? normalizeHebrew(product.manufacturer).split(' ') : []),
        ...((product.aliases || []).flatMap((a) => normalizeHebrew(a).split(' ')))
      ];

      let matchCount = 0;
      for (const token of inputTokens) {
        if (targetTokens.some((t) => t === token || t.includes(token) || token.includes(t))) {
          matchCount++;
        }
      }

      if (matchCount > bestScore) {
        bestScore = matchCount;
        bestProduct = product;
      }
    }

    if (bestScore > 0 && bestProduct) {
      return bestProduct;
    }
  }

  // 4. יצירת מוצר דינמי במידה ולא נמצא בקטלוג
  const fallbackBasePrice = 14.90;
  return {
    id: 'custom_' + Math.random().toString(36).substring(2, 9),
    barcode: '729000' + Math.floor(1000000 + Math.random() * 9000000),
    name: rawName,
    manufacturer: 'כללי',
    category: 'canned_cooking',
    unit: 'יח׳',
    aliases: [rawName],
    prices: {
      rami_levy: Number((fallbackBasePrice * 0.98).toFixed(2)),
      osher_ad: Number((fallbackBasePrice * 0.96).toFixed(2)),
      yochananof: Number((fallbackBasePrice * 0.99).toFixed(2)),
      shufersal_deal: Number((fallbackBasePrice * 1.08).toFixed(2)),
      carrefour: Number((fallbackBasePrice * 1.04).toFixed(2)),
      victory: Number((fallbackBasePrice * 1.05).toFixed(2)),
      hazi_hinam: Number((fallbackBasePrice * 1.03).toFixed(2))
    },
    isCustom: true
  };
}

/**
 * עיבוד רשימת קניות מלאה
 */
export function parseShoppingList(rawText, catalog = activeCatalog) {
  if (!rawText) return [];
  const lines = rawText.split('\n');
  const items = [];

  for (let i = 0; i < lines.length; i++) {
    const parsed = parseHebrewLine(lines[i]);
    if (!parsed || !parsed.rawName) continue;

    const matchedProduct = matchProductToCatalog(parsed.rawName, catalog);
    items.push({
      id: matchedProduct.id + '_' + i,
      productId: matchedProduct.id,
      barcode: matchedProduct.barcode,
      name: matchedProduct.name,
      manufacturer: matchedProduct.manufacturer,
      originalText: parsed.rawName,
      quantity: parsed.quantity,
      unit: matchedProduct.unit,
      category: matchedProduct.category,
      prices: matchedProduct.prices
    });
  }

  return items;
}

/**
 * חישוב דמי משלוח לסופרמרקט לפי סכום ביניים ותעריפי 2026
 * רמי לוי: 35.90 ₪
 * שופרסל דיל: 35.00 ₪
 * יוחננוף: 32.00 ₪
 * ויקטורי: 35.00 ₪
 * קרפור: 34.00 ₪ (חינם מעל 450 ₪)
 * חצי חינם: 35.00 ₪
 * אושר עד: 0 ₪ (סניף פיזי בלבד - אין משלוחים)
 * כאשר משלוח כבוי: 0 ₪ לכל הרשתות (מחירי מדף / איסוף עצמי בסניף)
 */
export function calculateStoreShipping(storeKey, subtotal, isShippingEnabled) {
  if (!isShippingEnabled || subtotal <= 0) return 0;

  switch (storeKey) {
    case 'osher_ad':
      return 0; // סניף פיזי בלבד
    case 'rami_levy':
      return 35.90;
    case 'shufersal_deal':
      return 35.00;
    case 'yochananof':
      return 32.00;
    case 'victory':
      return 35.00;
    case 'hazi_hinam':
      return 35.00;
    case 'carrefour':
      return subtotal >= 450 ? 0 : 34.00;
    default:
      return 35.00;
  }
}

/**
 * שליפת מבצע מועדון עבור פריט ברשת מסוימת
 */
export function getItemClubPromotion(item, storeKey) {
  if (!item || !Array.isArray(item.clubPromotions)) return null;
  return item.clubPromotions.find((p) => p.storeKey === storeKey) || null;
}

/**
 * שליפת מבצע המועדון המשתלם ביותר לפריט מבין כל הרשתות
 */
export function getBestClubPromotion(item) {
  if (!item || !Array.isArray(item.clubPromotions) || item.clubPromotions.length === 0) return null;
  return item.clubPromotions.reduce((best, curr) => {
    if (!best || (curr.savingsNis || 0) > (best.savingsNis || 0)) return curr;
    return best;
  }, null);
}

/**
 * דירוג 7 רשתות הסופרמרקט (One-Stop Shop)
 * תומך בשקלול מחירי מועדון לקוחות (isClubPromotionsEnabled) ודמי משלוח
 */
export function calculateOneStopRankings(parsedItems, isShippingEnabled, isClubPromotionsEnabled = true) {
  if (!parsedItems || parsedItems.length === 0) return [];

  const storeKeys = Object.keys(STORES_METADATA);

  const rankings = storeKeys.map((storeKey) => {
    const store = STORES_METADATA[storeKey];
    let subtotal = 0;
    let regularSubtotal = 0;
    let clubSavingsTotal = 0;
    let availableCount = 0;
    let totalQty = 0;
    const itemDetails = [];

    for (const item of parsedItems) {
      const regularPrice = item.prices ? item.prices[storeKey] : null;
      const isAvailable = typeof regularPrice === 'number' && regularPrice > 0;

      if (isAvailable) {
        let effectivePrice = regularPrice;
        let activeClubPromo = null;
        let itemClubSavings = 0;

        if (isClubPromotionsEnabled && Array.isArray(item.clubPromotions)) {
          activeClubPromo = item.clubPromotions.find((p) => p.storeKey === storeKey);
          if (activeClubPromo && typeof activeClubPromo.clubPrice === 'number' && activeClubPromo.clubPrice < regularPrice) {
            effectivePrice = activeClubPromo.clubPrice;
            itemClubSavings = (regularPrice - activeClubPromo.clubPrice) * item.quantity;
          }
        }

        const lineTotal = effectivePrice * item.quantity;
        const regularLineTotal = regularPrice * item.quantity;

        subtotal += lineTotal;
        regularSubtotal += regularLineTotal;
        clubSavingsTotal += itemClubSavings;
        availableCount++;
        totalQty += item.quantity;

        itemDetails.push({
          itemId: item.id,
          name: item.name,
          unitPrice: effectivePrice,
          regularUnitPrice: regularPrice,
          quantity: item.quantity,
          lineTotal,
          regularLineTotal,
          isAvailable: true,
          isClubDiscounted: !!activeClubPromo,
          clubPromo: activeClubPromo,
          clubSavings: itemClubSavings
        });
      } else {
        itemDetails.push({
          itemId: item.id,
          name: item.name,
          unitPrice: null,
          regularUnitPrice: null,
          quantity: item.quantity,
          lineTotal: 0,
          regularLineTotal: 0,
          isAvailable: false,
          isClubDiscounted: false,
          clubPromo: null,
          clubSavings: 0
        });
      }
    }

    const shipping = calculateStoreShipping(storeKey, subtotal, isShippingEnabled);
    const grandTotal = subtotal + shipping;
    const coveragePercent = Math.round((availableCount / parsedItems.length) * 100);

    return {
      storeKey,
      store,
      subtotal: Number(subtotal.toFixed(2)),
      regularSubtotal: Number(regularSubtotal.toFixed(2)),
      clubSavingsTotal: Number(clubSavingsTotal.toFixed(2)),
      hasClubSavings: clubSavingsTotal > 0.05,
      shipping,
      grandTotal: Number(grandTotal.toFixed(2)),
      availableCount,
      totalQty,
      totalItemsCount: parsedItems.length,
      coveragePercent,
      itemDetails
    };
  });

  // מיון: קודם כיסוי סל מלא, ולאחר מכן מחיר כולל נמוך יותר
  rankings.sort((a, b) => {
    if (a.coveragePercent !== b.coveragePercent) {
      return b.coveragePercent - a.coveragePercent;
    }
    return a.grandTotal - b.grandTotal;
  });

  return rankings;
}

/**
 * חישוב פיצול קנייה אופטימלי (Optimal 2-Store Split Basket)
 * מחפש את שילוב 2 הרשתות שנותן את הסל הזול ביותר, כולל מחירי מועדון ומשלוח כפול.
 */
export function calculateOptimalSplit(parsedItems, isShippingEnabled, isClubPromotionsEnabled = true) {
  if (!parsedItems || parsedItems.length === 0) {
    return null;
  }

  const storeKeys = Object.keys(STORES_METADATA);
  const oneStopRankings = calculateOneStopRankings(parsedItems, isShippingEnabled, isClubPromotionsEnabled);
  const bestOneStop = oneStopRankings[0];
  const mostExpensiveOneStop = oneStopRankings[oneStopRankings.length - 1];

  let bestSplit = null;
  let minGrandTotal = Infinity;

  // בדיקת כל זוגות הרשתות (Combinations of 2 stores)
  for (let i = 0; i < storeKeys.length; i++) {
    for (let j = i + 1; j < storeKeys.length; j++) {
      const s1 = storeKeys[i];
      const s2 = storeKeys[j];

      let subtotal1 = 0;
      let subtotal2 = 0;
      let splitClubSavings = 0;
      const items1 = [];
      const items2 = [];
      const assignments = [];

      for (const item of parsedItems) {
        let p1 = item.prices ? item.prices[s1] : Infinity;
        let p2 = item.prices ? item.prices[s2] : Infinity;
        let regularP1 = p1;
        let regularP2 = p2;

        if (isClubPromotionsEnabled && Array.isArray(item.clubPromotions)) {
          const promo1 = item.clubPromotions.find((p) => p.storeKey === s1);
          if (promo1 && typeof promo1.clubPrice === 'number' && promo1.clubPrice < p1) {
            p1 = promo1.clubPrice;
          }
          const promo2 = item.clubPromotions.find((p) => p.storeKey === s2);
          if (promo2 && typeof promo2.clubPrice === 'number' && promo2.clubPrice < p2) {
            p2 = promo2.clubPrice;
          }
        }

        if (p1 <= p2) {
          const lineTotal = p1 * item.quantity;
          subtotal1 += lineTotal;
          if (regularP1 > p1) {
            splitClubSavings += (regularP1 - p1) * item.quantity;
          }
          items1.push({ ...item, assignedPrice: p1, assignedLineTotal: lineTotal });
          assignments.push({ item, bestStoreKey: s1, unitPrice: p1, lineTotal });
        } else {
          const lineTotal = p2 * item.quantity;
          subtotal2 += lineTotal;
          if (regularP2 > p2) {
            splitClubSavings += (regularP2 - p2) * item.quantity;
          }
          items2.push({ ...item, assignedPrice: p2, assignedLineTotal: lineTotal });
          assignments.push({ item, bestStoreKey: s2, unitPrice: p2, lineTotal });
        }
      }

      const shipping1 = calculateStoreShipping(s1, subtotal1, isShippingEnabled);
      const shipping2 = calculateStoreShipping(s2, subtotal2, isShippingEnabled);
      const totalItemsCost = subtotal1 + subtotal2;
      const totalShippingCost = (items1.length > 0 ? shipping1 : 0) + (items2.length > 0 ? shipping2 : 0);
      const grandTotal = totalItemsCost + totalShippingCost;

      if (grandTotal < minGrandTotal) {
        minGrandTotal = grandTotal;

        const storeBreakdowns = [];
        if (items1.length > 0) {
          storeBreakdowns.push({
            storeKey: s1,
            store: STORES_METADATA[s1],
            items: items1,
            subtotal: subtotal1,
            shipping: shipping1,
            grandTotal: subtotal1 + shipping1,
            totalQty: items1.reduce((sum, it) => sum + (it.quantity || 1), 0)
          });
        }
        if (items2.length > 0) {
          storeBreakdowns.push({
            storeKey: s2,
            store: STORES_METADATA[s2],
            items: items2,
            subtotal: subtotal2,
            shipping: shipping2,
            grandTotal: subtotal2 + shipping2,
            totalQty: items2.reduce((sum, it) => sum + (it.quantity || 1), 0)
          });
        }

        bestSplit = {
          pair: [s1, s2],
          itemAssignments: assignments,
          storeBreakdowns: storeBreakdowns.sort((a, b) => b.subtotal - a.subtotal),
          storesInvolvedCount: storeBreakdowns.length,
          totalItemsCost: Number(totalItemsCost.toFixed(2)),
          totalShippingCost: Number(totalShippingCost.toFixed(2)),
          grandTotal: Number(grandTotal.toFixed(2)),
          clubSavingsTotal: Number(splitClubSavings.toFixed(2)),
          hasClubSavings: splitClubSavings > 0.05
        };
      }
    }
  }

  if (!bestSplit) {
    return null;
  }

  // חיסכון מול הרשת הבודדת הטובה ביותר (One-Stop)
  const savingsVsSingle = bestOneStop ? Math.max(0, bestOneStop.grandTotal - bestSplit.grandTotal) : 0;
  const savingsVsSinglePercent = bestOneStop && bestOneStop.grandTotal > 0
    ? Math.round((savingsVsSingle / bestOneStop.grandTotal) * 100)
    : 0;

  // חיסכון מול הרשת היקרה ביותר
  const savingsVsHighest = mostExpensiveOneStop ? Math.max(0, mostExpensiveOneStop.grandTotal - bestSplit.grandTotal) : 0;
  const savingsVsHighestPercent = mostExpensiveOneStop && mostExpensiveOneStop.grandTotal > 0
    ? Math.round((savingsVsHighest / mostExpensiveOneStop.grandTotal) * 100)
    : 0;

  return {
    ...bestSplit,
    bestOneStopStoreName: bestOneStop ? bestOneStop.store.name : '',
    bestOneStopGrandTotal: bestOneStop ? bestOneStop.grandTotal : bestSplit.grandTotal,
    mostExpensiveStoreName: mostExpensiveOneStop ? mostExpensiveOneStop.store.name : '',
    mostExpensiveGrandTotal: mostExpensiveOneStop ? mostExpensiveOneStop.grandTotal : 0,
    savingsNis: savingsVsSingle,
    savingsPercent: savingsVsSinglePercent,
    savingsVsSingle,
    savingsVsSinglePercent,
    savingsVsHighest,
    savingsVsHighestPercent
  };
}
