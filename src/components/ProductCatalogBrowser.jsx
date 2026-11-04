import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES, STORES_METADATA } from '../data/mockStoresData.js';
import {
  getBasketQuantityMap,
  updateProductQuantity
} from '../utils/basketHelpers.js';
import {
  Search,
  Plus,
  Minus,
  ArrowUpDown,
  ShoppingBag
} from 'lucide-react';

export default function ProductCatalogBrowser({
  rawText,
  setRawText,
  parsedItems,
  onSwitchToBasket,
  onSwitchToComparison,
  catalog = []
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price_asc' | 'price_desc' | 'alpha_asc'
  const [displayLimit, setDisplayLimit] = useState(50);

  useEffect(() => {
    setDisplayLimit(50);
  }, [selectedCategory, searchTerm, sortBy]);

  // מפת כמויות מהטקסט הגולמי
  const qtyMap = useMemo(() => getBasketQuantityMap(rawText), [rawText]);

  // מחיר מינימלי למוצר
  const getMinPrice = (product) => {
    if (!product.prices) return 0;
    const vals = Object.values(product.prices).filter((p) => typeof p === 'number' && p > 0);
    return vals.length > 0 ? Math.min(...vals) : 0;
  };

  const getMaxPrice = (product) => {
    if (!product.prices) return 0;
    const vals = Object.values(product.prices).filter((p) => typeof p === 'number' && p > 0);
    return vals.length > 0 ? Math.max(...vals) : 0;
  };

  // מציאת קטגוריה
  const getCategoryInfo = (categoryId) => {
    const found = CATEGORIES.find((c) => c.id === categoryId);
    return found || { name: 'כללי', icon: '🛒' };
  };

  // ספירת מוצרים לפי קטגוריה
  const categoryCounts = useMemo(() => {
    const counts = { all: catalog.length };
    for (const p of catalog) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [catalog]);

  // סינון ומיון מוצרים
  const sortedAndFilteredProducts = useMemo(() => {
    let result = catalog.filter((product) => {
      // סינון קטגוריה
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // סינון חיפוש: שם מוצר, מותג/יצרן, ברקוד, כינויים
      if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        const matchName = product.name && product.name.toLowerCase().includes(term);
        const matchMfg = product.manufacturer && product.manufacturer.toLowerCase().includes(term);
        const matchBarcode = product.barcode && product.barcode.includes(term);
        const matchAliases = product.aliases && product.aliases.some((a) => a.toLowerCase().includes(term));
        if (!matchName && !matchMfg && !matchBarcode && !matchAliases) return false;
      }

      return true;
    });

    // מיון לפי בחירת המשתמש
    result.sort((a, b) => {
      if (sortBy === 'price_asc') {
        return getMinPrice(a) - getMinPrice(b);
      }
      if (sortBy === 'price_desc') {
        return getMinPrice(b) - getMinPrice(a);
      }
      if (sortBy === 'alpha_asc') {
        return a.name.localeCompare(b.name, 'he');
      }
      // 'popular' - ברירת מחדל: מוצרים שנמצאים בסל קודם
      const inBasketA = qtyMap[a.id] ? 1 : 0;
      const inBasketB = qtyMap[b.id] ? 1 : 0;
      if (inBasketA !== inBasketB) return inBasketB - inBasketA;
      return 0;
    });

    return result;
  }, [catalog, selectedCategory, searchTerm, sortBy, qtyMap]);

  const handleUpdateQty = (product, delta) => {
    const current = qtyMap[product.id] || 0;
    const next = Math.max(0, current + delta);
    const updated = updateProductQuantity(rawText, product, next);
    setRawText(updated);
  };

  const handleQuickAdd = (product) => {
    handleUpdateQty(product, 1);
  };

  const visibleProducts = useMemo(() => {
    return sortedAndFilteredProducts.slice(0, displayLimit);
  }, [sortedAndFilteredProducts, displayLimit]);

  const totalBasketItemsCount = useMemo(() => {
    return Object.values(qtyMap).reduce((sum, q) => sum + q, 0);
  }, [qtyMap]);

  const storeKeys = Object.keys(STORES_METADATA);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* סרגל עליון: חיפוש מהיר וסיכום */}
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>🛒 קטלוג סופרמרקטים בישראל</span>
              <span style={{ fontSize: '0.75rem', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>
                {catalog.length} מוצרים אמיתיים
              </span>
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0 0' }}>
              השוואת מחירים מדויקת מול 7 רשתות המזון בישראל לפי ברקוד EAN-13 ויצרן
            </p>
          </div>

          {totalBasketItemsCount > 0 && (
            <button
              onClick={onSwitchToBasket}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '12px'
              }}
            >
              <ShoppingBag size={16} />
              <span>לסל שלי ({totalBasketItemsCount})</span>
            </button>
          )}
        </div>

        {/* שורת חיפוש */}
        <div style={{ position: 'relative', marginBlockEnd: '0.75rem' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              insetInlineStart: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}
          />
          <input
            type="text"
            className="input-field"
            style={{
              paddingInlineStart: '2.5rem',
              fontSize: '0.95rem',
              borderRadius: '12px',
              width: '100%',
              boxSizing: 'border-box'
            }}
            placeholder="חיפוש מיידי לפי שם מוצר, מותג (תנובה, אסם, שטראוס...), או ברקוד 729..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                insetInlineEnd: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* בחירת מחלקות (12 מחלקות סופרמרקט) */}
        <div
          style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            paddingBlockEnd: '0.4rem',
            scrollbarWidth: 'thin'
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  paddingInline: '0.75rem',
                  paddingBlock: '0.4rem',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 800 : 600,
                  borderRadius: '9999px',
                  border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                  background: isSelected ? '#0284c7' : '#ffffff',
                  color: isSelected ? '#ffffff' : '#334155',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    paddingInline: '0.35rem',
                    borderRadius: '9999px',
                    background: isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#64748b'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* שורת סינון ומיון נוסף */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBlockStart: '0.75rem',
            paddingBlockStart: '0.75rem',
            borderTop: '1px solid #f1f5f9',
            fontSize: '0.8rem',
            color: '#64748b',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div>
            נמצאו <strong>{sortedAndFilteredProducts.length}</strong> מוצרים
            {selectedCategory !== 'all' && ` במחלקת ${getCategoryInfo(selectedCategory).name}`}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={14} />
            <span>מיון:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                fontSize: '0.8rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                fontWeight: 600
              }}
            >
              <option value="popular">מומלץ / בסל שלי קודם</option>
              <option value="price_asc">מחיר: מהזול ליקר</option>
              <option value="price_desc">מחיר: מהיקר לזול</option>
              <option value="alpha_asc">שם מוצר: א - ת</option>
            </select>
          </div>
        </div>
      </div>

      {/* רשת כרטיסי המוצרים (Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.75rem'
        }}
      >
        {visibleProducts.map((product) => {
          const qty = qtyMap[product.id] || 0;
          const minPrice = getMinPrice(product);
          const maxPrice = getMaxPrice(product);
          const catInfo = getCategoryInfo(product.category);

          // מציאת הרשת הזולה ביותר למוצר זה
          let cheapestStoreKey = 'rami_levy';
          let cheapestPrice = Infinity;
          if (product.prices) {
            for (const [sk, pr] of Object.entries(product.prices)) {
              if (typeof pr === 'number' && pr < cheapestPrice) {
                cheapestPrice = pr;
                cheapestStoreKey = sk;
              }
            }
          }
          const cheapestStore = STORES_METADATA[cheapestStoreKey];

          return (
            <div
              key={product.id}
              style={{
                background: qty > 0 ? '#f0fdf4' : '#ffffff',
                borderRadius: '14px',
                border: qty > 0 ? '2px solid #22c55e' : '1px solid #e2e8f0',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
                boxShadow: qty > 0 ? '0 4px 12px rgba(34, 197, 94, 0.12)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                {/* תגיות: מחלקה ויצרן */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.4rem', fontSize: '0.7rem' }}>
                  <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>{catInfo.icon}</span>
                    <span>{catInfo.name}</span>
                  </span>
                  <span style={{ fontWeight: 700, color: '#0369a1', background: '#e0f2fe', padding: '0.15rem 0.4rem', borderRadius: '6px' }}>
                    {product.manufacturer || 'יצרן ישראלי'}
                  </span>
                </div>

                {/* שם מוצר */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0', lineHeight: 1.35 }}>
                  {product.name}
                </h3>

                {/* ברקוד ויחידת מידה */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: '#94a3b8', marginBlockEnd: '0.6rem' }}>
                  <span>{product.unit}</span>
                  <span>•</span>
                  <span style={{ fontFamily: 'monospace' }}>{product.barcode}</span>
                </div>

                {/* תצוגת טווח מחירים והרשת הזולה ביותר */}
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '0.4rem 0.6rem',
                    marginBlockEnd: '0.6rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>החל מ:</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#16a34a' }}>
                      ₪{minPrice.toFixed(2)}
                    </div>
                  </div>
                  {cheapestStore && (
                    <div style={{ textAlign: 'left', fontSize: '0.7rem' }}>
                      <div style={{ color: '#64748b' }}>הכי זול ב:</div>
                      <span
                        style={{
                          fontWeight: 700,
                          color: cheapestStore.color,
                          background: '#ffffff',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          display: 'inline-block'
                        }}
                      >
                        {cheapestStore.shortName}
                      </span>
                    </div>
                  )}
                </div>

                {/* מחירים ב-7 הרשתות */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.25rem',
                    fontSize: '0.68rem',
                    marginBlockEnd: '0.75rem',
                    background: '#ffffff',
                    border: '1px solid #f1f5f9',
                    borderRadius: '6px',
                    padding: '0.3rem'
                  }}
                >
                  {storeKeys.map((sk) => {
                    const st = STORES_METADATA[sk];
                    const price = product.prices ? product.prices[sk] : null;
                    const isCheapest = price === minPrice;
                    return (
                      <div
                        key={sk}
                        style={{
                          textAlign: 'center',
                          padding: '0.2rem',
                          borderRadius: '4px',
                          background: isCheapest ? '#dcfce7' : '#f8fafc',
                          color: isCheapest ? '#15803d' : '#475569',
                          fontWeight: isCheapest ? 800 : 500
                        }}
                      >
                        <div style={{ color: '#94a3b8', fontSize: '0.62rem' }}>{st.shortName}</div>
                        <div>₪{price ? price.toFixed(2) : '-'}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* כפתורי הוספה / שינוי כמות */}
              <div>
                {qty === 0 ? (
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.45rem',
                      fontSize: '0.85rem',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Plus size={16} />
                    <span>הוסף לסל</span>
                  </button>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#22c55e',
                      borderRadius: '10px',
                      padding: '0.25rem 0.5rem',
                      color: '#ffffff'
                    }}
                  >
                    <button
                      onClick={() => handleUpdateQty(product, -1)}
                      style={{
                        background: 'rgba(255,255,255,0.25)',
                        border: 'none',
                        color: '#ffffff',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={16} />
                    </button>

                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                      {qty} בסל
                    </div>

                    <button
                      onClick={() => handleUpdateQty(product, 1)}
                      style={{
                        background: 'rgba(255,255,255,0.25)',
                        border: 'none',
                        color: '#ffffff',
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* כפתור טעינת עוד 50 מוצרים */}
      {visibleProducts.length < sortedAndFilteredProducts.length && (
        <div style={{ textAlign: 'center', marginBlockStart: '1rem', marginBlockEnd: '1.5rem' }}>
          <button
            onClick={() => setDisplayLimit((prev) => prev + 50)}
            className="btn btn-secondary"
            style={{
              padding: '0.75rem 2rem',
              fontSize: '0.95rem',
              fontWeight: 800,
              borderRadius: '12px'
            }}
          >
            טען 50 מוצרים נוספים (מוצגים {visibleProducts.length} מתוך {sortedAndFilteredProducts.length})
          </button>
        </div>
      )}
    </div>
  );
}
