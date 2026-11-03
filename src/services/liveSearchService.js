/**
 * שירות חיפוש מוצרים חי מול ממשקי הסטוק והשקיפות (Live Search Service - 2026)
 * תומך בפרוקסי של Vite למניעת CORS מול MaxStock Online, Stock Online, ושקיפות מחירים רמי לוי
 */

import { CATALOG_PRODUCTS } from '../data/mockStoresData.js';

const DEFAULT_TIMEOUT_MS = 5000;

/**
 * פונקציית עזר להרצת fetch עם Timeout מובנה
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * המרת מחיר גולמי למספר עשרוני תקין
 */
function parseRawPrice(rawPrice) {
  if (rawPrice === null || rawPrice === undefined) return null;
  if (typeof rawPrice === 'number') return rawPrice;
  const cleaned = String(rawPrice).replace(/[^\d.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
}

/**
 * חיפוש חי באתר מקס סטוק אונליין
 * @param {string} query - מחרוזת חיפוש
 * @returns {Promise<Array>} רשימת מוצרים מנורמלת
 */
export async function searchMaxStock(query) {
  if (!query || !query.trim()) return [];

  const trimmed = query.trim();
  const url = `/api/maxstock/search/suggest.json?q=${encodeURIComponent(trimmed)}&resources[type]=product`;

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`MaxStock API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const products = data?.resources?.results?.products || [];

    return products.map((item, idx) => {
      const price = parseRawPrice(item.price);
      return {
        id: `maxstock_${item.id || idx}`,
        name: item.title,
        price: price,
        comparePrice: parseRawPrice(item.compare_at_price),
        storeId: 'max_stock_online',
        storeName: 'מקס סטוק אונליין',
        url: item.url ? `https://online.maxstock.co.il${item.url}` : null,
        imageUrl: item.image || item.featured_image?.url || null,
        inStock: item.available !== false,
        raw: item
      };
    });
  } catch (err) {
    console.warn(`[liveSearchService] searchMaxStock failed for "${trimmed}":`, err.message);
    return [];
  }
}

/**
 * חיפוש חי באתר סטוק אונליין (Stock Online)
 * @param {string} query - מחרוזת חיפוש
 * @returns {Promise<Array>} רשימת מוצרים מנורמלת
 */
export async function searchStockOnline(query) {
  if (!query || !query.trim()) return [];

  const trimmed = query.trim();
  const url = `/api/stockonline/search/suggest.json?q=${encodeURIComponent(trimmed)}&resources[type]=product`;

  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`StockOnline API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const products = data?.resources?.results?.products || [];

    return products.map((item, idx) => {
      const price = parseRawPrice(item.price);
      return {
        id: `stockonline_${item.id || idx}`,
        name: item.title,
        price: price,
        comparePrice: parseRawPrice(item.compare_at_price),
        storeId: 'stock_online',
        storeName: 'סטוק אונליין',
        url: item.url ? `https://stock-online.co.il${item.url}` : null,
        imageUrl: item.image || item.featured_image?.url || null,
        inStock: item.available !== false,
        raw: item
      };
    });
  } catch (err) {
    console.warn(`[liveSearchService] searchStockOnline failed for "${trimmed}":`, err.message);
    return [];
  }
}

/**
 * חיפוש בקטלוג הלוקאלי המובנה כ-Fallback
 * @param {string} query - מחרוזת חיפוש
 * @returns {Array} מוצרים תואמים מהקטלוג
 */
export function searchLocalCatalog(query) {
  if (!query || !query.trim()) return [];

  const normQuery = query.trim().toLowerCase();
  const tokens = normQuery.split(/\s+/).filter((t) => t.length > 1);

  return CATALOG_PRODUCTS.filter((prod) => {
    const normName = prod.name.toLowerCase();
    if (normName.includes(normQuery)) return true;

    // בדיקת כינויים
    if (prod.aliases && prod.aliases.some((a) => a.toLowerCase().includes(normQuery))) {
      return true;
    }

    // בדיקת מילים בודדות
    if (tokens.length > 0) {
      const matchTokens = tokens.filter((t) =>
        normName.includes(t) || prod.aliases?.some((a) => a.toLowerCase().includes(t))
      );
      if (matchTokens.length >= Math.ceil(tokens.length * 0.6)) {
        return true;
      }
    }

    return false;
  });
}

/**
 * חיפוש משולב חי עם מנגנון Fallback אוטומטי
 * קורא במקביל למקס סטוק אונליין ולסטוק אונליין, ובמקרה של חוסר תוצאות/שגיאה חוזר לקטלוג הלוקאלי
 * @param {string} query - מחרוזת חיפוש
 * @param {Object} options - אפשרויות חיפוש
 * @returns {Promise<Object>} תוצאות חיפוש מקיפות
 */
export async function searchLiveProducts(query, options = {}) {
  const { includeLocalFallback = true } = options;

  if (!query || !query.trim()) {
    return {
      query: '',
      liveResults: [],
      localFallback: [],
      fallbackUsed: false,
      sources: { max_stock_online: [], stock_online: [] }
    };
  }

  // הפעלה מקבילה של החיפושים החיים
  const [maxStockRes, stockOnlineRes] = await Promise.allSettled([
    searchMaxStock(query),
    searchStockOnline(query)
  ]);

  const maxStockList = maxStockRes.status === 'fulfilled' ? maxStockRes.value : [];
  const stockOnlineList = stockOnlineRes.status === 'fulfilled' ? stockOnlineRes.value : [];

  const liveResults = [...maxStockList, ...stockOnlineList];
  const hasLiveResults = liveResults.length > 0;

  let localFallback = [];
  if (!hasLiveResults && includeLocalFallback) {
    localFallback = searchLocalCatalog(query);
  }

  return {
    query: query.trim(),
    timestamp: new Date().toISOString(),
    liveResults,
    fallbackUsed: !hasLiveResults,
    localFallback,
    sources: {
      max_stock_online: maxStockList,
      stock_online: stockOnlineList
    }
  };
}

/**
 * מפרסר קבצי שקיפות מחירים בפורמט XML (חוק שקיפות המחירים ברשתות המזון בישראל)
 * פורמט: קבצי Prices / PriceFull של רמי לוי, שופרסל, יוחננוף וכד'
 * @param {string} xmlString - תוכן ה-XML
 * @returns {Array<Object>} רשימת פריטים מפורסרת
 */
export function parsePriceTransparencyXml(xmlString) {
  if (!xmlString || typeof xmlString !== 'string') return [];

  const items = [];

  // בדיקה אם קיים DOMParser (בדפדפן)
  if (typeof window !== 'undefined' && window.DOMParser) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      const itemNodes = doc.querySelectorAll('Item, Product');

      itemNodes.forEach((node) => {
        const itemCode = node.querySelector('ItemCode, ItemId')?.textContent?.trim() || '';
        const itemName = node.querySelector('ItemName, ItemDesc')?.textContent?.trim() || '';
        const priceStr = node.querySelector('ItemPrice, Price')?.textContent?.trim() || '0';
        const unit = node.querySelector('UnitOfMeasure, Unit')?.textContent?.trim() || 'יח׳';
        const manufacturer = node.querySelector('ManufacturerName, Manufacturer')?.textContent?.trim() || '';
        const updateDate = node.querySelector('PriceUpdateDate, UpdateDate')?.textContent?.trim() || '';

        const price = parseFloat(priceStr);
        if (itemName) {
          items.push({
            itemCode,
            itemName,
            price: isNaN(price) ? 0 : price,
            unit,
            manufacturer,
            updateDate
          });
        }
      });

      if (items.length > 0) return items;
    } catch (e) {
      console.warn('[liveSearchService] DOMParser XML parsing failed, falling back to regex:', e);
    }
  }

  // Fallback: פרסור מבוסס ביטויים רגולריים אם אין DOMParser או שנכשל
  const itemBlockRegex = /<(Item|Product)[\s\S]*?<\/\1>/gi;
  let match;

  while ((match = itemBlockRegex.exec(xmlString)) !== null) {
    const block = match[0];
    const extractTag = (tag) => {
      const r = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
      const m = block.match(r);
      return m ? m[1].trim() : '';
    };

    const itemCode = extractTag('ItemCode') || extractTag('ItemId');
    const itemName = extractTag('ItemName') || extractTag('ItemDesc');
    const priceStr = extractTag('ItemPrice') || extractTag('Price');
    const unit = extractTag('UnitOfMeasure') || extractTag('Unit') || 'יח׳';
    const manufacturer = extractTag('ManufacturerName') || extractTag('Manufacturer');
    const updateDate = extractTag('PriceUpdateDate') || extractTag('UpdateDate');

    if (itemName) {
      const price = parseFloat(priceStr);
      items.push({
        itemCode,
        itemName,
        price: isNaN(price) ? 0 : price,
        unit,
        manufacturer,
        updateDate
      });
    }
  }

  return items;
}

/**
 * מפרסר קבצי או תגובות שקיפות מחירים בפורמט JSON
 * מתאים ל-API של רמי לוי אונליין / שקיפות מחירים
 * @param {Object|string} jsonData - אובייקט JSON או מחרוזת
 * @returns {Array<Object>} רשימת פריטים מפורסרת ומנורמלת
 */
export function parsePriceTransparencyJson(jsonData) {
  if (!jsonData) return [];

  let data = jsonData;
  if (typeof jsonData === 'string') {
    try {
      data = JSON.parse(jsonData);
    } catch (e) {
      console.warn('[liveSearchService] Failed to parse JSON string:', e);
      return [];
    }
  }

  // טיפול במבנים שונים אפשריים (items, products, results, או מערך ישיר)
  const list = Array.isArray(data)
    ? data
    : data.items || data.products || data.data || data.results || [];

  return list.map((item) => {
    const price = parseRawPrice(
      item.ItemPrice ?? item.price ?? item.price_final ?? item.sale_price
    );

    return {
      itemCode: String(item.ItemCode ?? item.id ?? item.barcode ?? ''),
      itemName: String(item.ItemName ?? item.name ?? item.title ?? ''),
      price: price || 0,
      unit: String(item.UnitOfMeasure ?? item.unit ?? 'יח׳'),
      manufacturer: String(item.ManufacturerName ?? item.manufacturer ?? ''),
      updateDate: String(item.PriceUpdateDate ?? item.updated_at ?? '')
    };
  }).filter((i) => i.itemName.length > 0);
}
