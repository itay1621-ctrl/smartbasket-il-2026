import { STORES_METADATA, CATALOG_PRODUCTS } from '../data/mockStoresData.js';

/**
 * מנרמל מחרוזת עברית להסרת סימני פיסוק, רווחים כפולים ואותיות יחס
 */
function normalizeHebrew(str) {
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
 * או "מארז 5 קופסאות" -> { quantity: 1, rawName: "מארז 5 קופסאות" }
 */
export function parseHebrewLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;

  // בדיקת מספר בתחילת השורה (כגון: "2 חלב", "3.5 עגבניות", "4x קפה")
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
 * התאמת פריט טקסט לקטלוג המוצרים של 2026
 */
export function matchProductToCatalog(rawName) {
  const normInput = normalizeHebrew(rawName);

  // 1. חיפוש מדויק או לפי כינויים (Aliases)
  for (const product of CATALOG_PRODUCTS) {
    if (normalizeHebrew(product.name) === normInput) {
      return product;
    }
    for (const alias of product.aliases) {
      const normAlias = normalizeHebrew(alias);
      if (normInput.includes(normAlias) || normAlias.includes(normInput)) {
        return product;
      }
    }
  }

  // 2. חיפוש התאמת מילים (Token matching)
  const inputTokens = normInput.split(' ').filter((t) => t.length > 1);
  let bestProduct = null;
  let bestScore = 0;

  for (const product of CATALOG_PRODUCTS) {
    const targetTokens = [
      ...normalizeHebrew(product.name).split(' '),
      ...product.aliases.flatMap((a) => normalizeHebrew(a).split(' '))
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

  // 3. יצירת מוצר דינמי במידה ולא נמצא בקטלוג המדויק
  // מציב מחירים סבירים ממוצעים כדי שההשוואה תעבוד על כל טקסט
  const fallbackBasePrice = 24.9;
  return {
    id: 'custom_' + Math.random().toString(36).substring(2, 9),
    name: rawName,
    category: 'kitchen',
    unit: 'יח׳',
    aliases: [rawName],
    prices: {
      rami_levy: Number((fallbackBasePrice * 1.15).toFixed(2)),
      max_stock: Number((fallbackBasePrice * 0.85).toFixed(2)),
      hastock: Number((fallbackBasePrice * 0.92).toFixed(2)),
      max_stock_online: Number((fallbackBasePrice * 0.89).toFixed(2)),
      stock_online: Number((fallbackBasePrice * 0.95).toFixed(2))
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    },
    isCustom: true
  };
}

/**
 * עיבוד רשימת קניות מלאה
 */
export function parseShoppingList(rawText) {
  if (!rawText) return [];
  const lines = rawText.split('\n');
  const items = [];

  for (let i = 0; i < lines.length; i++) {
    const parsed = parseHebrewLine(lines[i]);
    if (!parsed || !parsed.rawName) continue;

    const matchedProduct = matchProductToCatalog(parsed.rawName);
    items.push({
      id: matchedProduct.id + '_' + i,
      productId: matchedProduct.id,
      name: matchedProduct.name,
      originalText: parsed.rawName,
      quantity: parsed.quantity,
      unit: matchedProduct.unit,
      category: matchedProduct.category,
      prices: matchedProduct.prices,
      inStock: matchedProduct.inStock
    });
  }

  return items;
}

/**
 * חישוב דמי משלוח לרשת מסוימת לפי סכום ביניים, כמויות ותעריפי 2026
 * @param {string} storeKey - מזהה הרשת
 * @param {number} subtotal - סך ביניים של המוצרים
 * @param {boolean} isShippingEnabled - האם שקלול משלוחים פעיל
 * @param {number} itemsCount - מספר סוגי הפריטים השונים
 * @param {number} totalQty - כמות הפריטים הכוללת ביחידות
 */
export function calculateStoreShipping(storeKey, subtotal, isShippingEnabled, itemsCount = 1, totalQty = 1) {
  if (!isShippingEnabled || subtotal <= 0) return 0;
  const store = STORES_METADATA[storeKey];
  if (!store) return 0;

  // 1. מקס סטוק סניפים פיזיים - 0 ₪ (איסוף עצמי בסניף בלבד)
  if (storeKey === 'max_stock') {
    return 0;
  }

  // 2. מקס סטוק אונליין: 99 ₪ לפריט ראשון + 70 ₪ לכל פריט נוסף (ללא סף חינם עד הבית)
  // נוסחה: itemsCount > 0 ? 99 + (totalQuantity - 1) * 70 : 0
  if (storeKey === 'max_stock_online') {
    const qty = totalQty > 0 ? totalQty : (itemsCount > 0 ? itemsCount : 1);
    return itemsCount > 0 ? 99 + Math.max(0, qty - 1) * 70 : 0;
  }

  // 3. רמי לוי אונליין: 35.90 ₪ קבוע למשלוח (ללא סף משלוח חינם)
  if (storeKey === 'rami_levy') {
    return 35.9;
  }

  // 4. סטוק אונליין: 70 ₪, או משלוח חינם מעל 299 ₪
  if (storeKey === 'stock_online') {
    return subtotal >= 299 ? 0 : 70.0;
  }

  // 5. הסטוק (סניפים + משלוחים): 35 ₪ עד הבית, או חינם מעל 350 ₪ (איסוף עצמי בסניף 0 ₪)
  if (storeKey === 'hastock') {
    return subtotal >= 350 ? 0 : 35.0;
  }

  // בדיקת רף משלוח חינם כללי
  if (store.freeDeliveryThreshold > 0 && subtotal >= store.freeDeliveryThreshold) {
    return 0;
  }

  return store.baseDeliveryFee || 0;
}

/**
 * דירוג חנות יחידה (One-Stop Shop)
 */
export function calculateOneStopRankings(parsedItems, isShippingEnabled) {
  if (!parsedItems || parsedItems.length === 0) return [];

  const rankings = Object.keys(STORES_METADATA).map((storeKey) => {
    const store = STORES_METADATA[storeKey];
    let subtotal = 0;
    let availableCount = 0;
    let totalQty = 0;
    const missingItems = [];
    const itemDetails = [];

    for (const item of parsedItems) {
      const price = item.prices[storeKey];
      const isAvailable = item.inStock[storeKey] && price !== null && price !== undefined;

      if (isAvailable) {
        const lineTotal = price * item.quantity;
        subtotal += lineTotal;
        availableCount++;
        totalQty += item.quantity;
        itemDetails.push({
          itemId: item.id,
          name: item.name,
          unitPrice: price,
          quantity: item.quantity,
          lineTotal,
          isAvailable: true
        });
      } else {
        missingItems.push(item);
        itemDetails.push({
          itemId: item.id,
          name: item.name,
          unitPrice: null,
          quantity: item.quantity,
          lineTotal: 0,
          isAvailable: false
        });
      }
    }

    const shipping = calculateStoreShipping(storeKey, subtotal, isShippingEnabled, availableCount, totalQty);
    const grandTotal = subtotal + shipping;
    const coveragePercent = Math.round((availableCount / parsedItems.length) * 100);

    return {
      storeKey,
      store,
      subtotal,
      shipping,
      grandTotal,
      availableCount,
      totalQty,
      totalItemsCount: parsedItems.length,
      coveragePercent,
      missingItems,
      itemDetails
    };
  });

  // מיון: קודם כל לפי כיסוי מלא (כיסוי גבוה יותר), ושנית לפי מחיר כולל נמוך יותר
  rankings.sort((a, b) => {
    if (a.coveragePercent !== b.coveragePercent) {
      return b.coveragePercent - a.coveragePercent;
    }
    return a.grandTotal - b.grandTotal;
  });

  return rankings;
}

/**
 * חישוב פיצול קנייה אופטימלי (Optimal Split Basket)
 * מוצא את הרשת הזולה ביותר לכל פריט תוך שקלול עלויות משלוח
 */
export function calculateOptimalSplit(parsedItems, isShippingEnabled) {
  if (!parsedItems || parsedItems.length === 0) {
    return null;
  }

  // 1. שלב ראשון: מציאת החנות הזולה ביותר לכל פריט
  const itemAssignments = parsedItems.map((item) => {
    let lowestPrice = Infinity;
    let bestStoreKey = null;

    Object.keys(STORES_METADATA).forEach((storeKey) => {
      const price = item.prices[storeKey];
      const inStock = item.inStock[storeKey];
      if (inStock && price !== null && price !== undefined && price < lowestPrice) {
        lowestPrice = price;
        bestStoreKey = storeKey;
      }
    });

    return {
      item,
      bestStoreKey: bestStoreKey || 'rami_levy',
      unitPrice: lowestPrice !== Infinity ? lowestPrice : 0,
      lineTotal: (lowestPrice !== Infinity ? lowestPrice : 0) * item.quantity
    };
  });

  // 2. קיבוץ פריטים לפי רשתות
  const storeBaskets = {};
  itemAssignments.forEach((assignment) => {
    const key = assignment.bestStoreKey;
    if (!storeBaskets[key]) {
      storeBaskets[key] = {
        storeKey: key,
        store: STORES_METADATA[key],
        items: [],
        subtotal: 0
      };
    }
    storeBaskets[key].items.push({
      ...assignment.item,
      assignedPrice: assignment.unitPrice,
      assignedLineTotal: assignment.lineTotal
    });
    storeBaskets[key].subtotal += assignment.lineTotal;
  });

  // 3. חישוב דמי משלוח וסך הכל לכל רשת בסל המפוצל
  let totalItemsCost = 0;
  let totalShippingCost = 0;
  const storeBreakdowns = [];

  Object.values(storeBaskets).forEach((sb) => {
    const totalQty = sb.items.reduce((sum, it) => sum + (it.quantity || 1), 0);
    const shipping = calculateStoreShipping(
      sb.storeKey,
      sb.subtotal,
      isShippingEnabled,
      sb.items.length,
      totalQty
    );
    const total = sb.subtotal + shipping;

    totalItemsCost += sb.subtotal;
    totalShippingCost += shipping;

    storeBreakdowns.push({
      ...sb,
      totalQty,
      shipping,
      grandTotal: total
    });
  });

  const optimalGrandTotal = totalItemsCost + totalShippingCost;

  // 4. השוואה מול הרשת הטובה ביותר בקנייה מרוכזת (One-Stop Shop)
  const oneStopRankings = calculateOneStopRankings(parsedItems, isShippingEnabled);
  const bestOneStop = oneStopRankings[0] || { grandTotal: optimalGrandTotal };

  const savingsNis = Math.max(0, bestOneStop.grandTotal - optimalGrandTotal);
  const savingsPercent =
    bestOneStop.grandTotal > 0
      ? Math.min(99, Math.round((savingsNis / bestOneStop.grandTotal) * 100))
      : 0;

  return {
    itemAssignments,
    storeBreakdowns: storeBreakdowns.sort((a, b) => b.subtotal - a.subtotal),
    storesInvolvedCount: storeBreakdowns.length,
    totalItemsCost,
    totalShippingCost,
    grandTotal: optimalGrandTotal,
    bestOneStopGrandTotal: bestOneStop.grandTotal,
    bestOneStopStoreName: bestOneStop.store ? bestOneStop.store.name : '',
    savingsNis,
    savingsPercent
  };
}
