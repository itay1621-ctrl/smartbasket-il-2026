import React, { useState, useMemo, useEffect } from 'react';
import {
  CATALOG_PRODUCTS,
  CATEGORIES
} from '../data/mockStoresData.js';
import {
  getBasketQuantityMap,
  updateProductQuantity,
  addProductToBasket
} from '../utils/basketHelpers.js';
import {
  Search,
  Plus,
  Minus,
  Check,
  ArrowUpDown,
  ShoppingBag,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function ProductCatalogBrowser({
  rawText,
  setRawText,
  parsedItems,
  onSwitchToBasket,
  onSwitchToComparison
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price_asc' | 'price_desc' | 'alpha_asc' | 'category'
  const [sectorType, setSectorType] = useState('all'); // 'all' | 'food' | 'stock'
  const [displayLimit, setDisplayLimit] = useState(48);

  useEffect(() => {
    setDisplayLimit(48);
  }, [selectedCategory, searchTerm, sortBy, sectorType]);

  // מפת כמויות מהטקסט הגולמי
  const qtyMap = useMemo(() => getBasketQuantityMap(rawText), [rawText]);

  // מחיר מינימלי למוצר
  const getMinPrice = (product) => {
    if (!product.prices) return 0;
    const vals = Object.values(product.prices).filter((p) => typeof p === 'number' && p > 0);
    return vals.length > 0 ? Math.min(...vals) : 0;
  };

  // מציאת קטגוריה
  const getCategoryInfo = (categoryId) => {
    const found = CATEGORIES.find((c) => c.id === categoryId);
    return found || { name: 'כללי', icon: '🛒' };
  };

  // ספירת מוצרים לפי קטגוריה
  const categoryCounts = useMemo(() => {
    const counts = { all: CATALOG_PRODUCTS.length };
    for (const p of CATALOG_PRODUCTS) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  // סינון ומיון מוצרים
  const sortedAndFilteredProducts = useMemo(() => {
    let result = CATALOG_PRODUCTS.filter((product) => {
      // סינון סקטור (מזון מול סטוק)
      if (sectorType === 'food' && ['kitchen', 'furniture', 'diy', 'decor'].includes(product.category)) {
        return false;
      }
      if (sectorType === 'stock' && ['dairy_eggs', 'produce', 'meat_fish', 'bakery', 'pantry', 'spices_baking', 'salads_dips', 'frozen_sweets'].includes(product.category)) {
        return false;
      }

      // סינון קטגוריה
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // סינון חיפוש
      if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        const matchName = product.name.toLowerCase().includes(term);
        const matchAliases = product.aliases && product.aliases.some((a) => a.toLowerCase().includes(term));
        if (!matchName && !matchAliases) return false;
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
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      // 'popular' - ברירת מחדל: מוצרים שנמצאים בסל קודם, אחר כך לפי מזהה
      const inBasketA = qtyMap[a.id] ? 1 : 0;
      const inBasketB = qtyMap[b.id] ? 1 : 0;
      if (inBasketA !== inBasketB) return inBasketB - inBasketA;
      return 0;
    });

    return result;
  }, [selectedCategory, searchTerm, sortBy, sectorType, qtyMap]);

  const handleUpdateQty = (product, delta) => {
    const current = qtyMap[product.id] || 0;
    const next = Math.max(0, current + delta);
    const updated = updateProductQuantity(rawText, product, next);
    setRawText(updated);
  };

  const handleAddOne = (product) => {
    const updated = addProductToBasket(rawText, product, 1);
    setRawText(updated);
  };

  // סך פריטים בסל
  const totalBasketItemsCount = parsedItems.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '5rem' }}>
      {/* כותרת קטלוג וסרגל בקרה עליון */}
      <div className="card" style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              קטלוג המוצרים המלא ({CATALOG_PRODUCTS.length} מוצרים)
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0' }}>
              סננו לפי קטגוריות ומיינו לפי מחיר או א-ב לבחירה מהירה ונוחה
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => setSectorType('all')}
              className={`btn ${sectorType === 'all' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
            >
              הכל
            </button>
            <button
              onClick={() => setSectorType('food')}
              className={`btn ${sectorType === 'food' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
            >
              🛒 רק סופרמרקט
            </button>
            <button
              onClick={() => setSectorType('stock')}
              className={`btn ${sectorType === 'stock' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '8px' }}
            >
              🛋️ רק סטוק וכלי בית
            </button>
          </div>
        </div>

        {/* שורת חיפוש + בורר מיון (Sort) */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* תיבת חיפוש */}
          <div style={{
            flex: '1 1 240px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '0.45rem 0.75rem'
          }}>
            <Search size={18} style={{ color: '#64748b', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="חיפוש מהיר בקטלוג (למשל: ביצים, גבינה צהובה, סיר, עגבניות...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                fontSize: '0.9rem',
                marginInlineStart: '0.5rem',
                width: '100%',
                fontFamily: 'inherit'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                ✕
              </button>
            )}
          </div>

          {/* בורר מיון (Sort dropdown / controls) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '0.45rem 0.75rem'
          }}>
            <ArrowUpDown size={16} style={{ color: '#2563eb' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>מיון:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#0f172a',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              <option value="popular">🌟 מומלץ / פופולריות</option>
              <option value="price_asc">💰 מחיר: מהנמוך לגבוה</option>
              <option value="price_desc">💎 מחיר: מהגבוה לנמוך</option>
              <option value="alpha_asc">🔤 שם מוצר: א׳ - ת׳</option>
              <option value="category">🏷️ לפי קטגוריה</option>
            </select>
          </div>
        </div>

        {/* סרגל קטגוריות בגלילה אופקית (Horizontal Category Chips) */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBlock: '0.75rem 0.25rem',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  whiteSpace: 'nowrap',
                  border: isSelected ? '1px solid #2563eb' : '1px solid #e2e8f0',
                  background: isSelected ? '#eff6ff' : '#ffffff',
                  color: isSelected ? '#1d4ed8' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span style={{
                  fontSize: '0.7rem',
                  opacity: 0.8,
                  background: isSelected ? '#dbeafe' : '#f1f5f9',
                  padding: '0.05rem 0.35rem',
                  borderRadius: '999px'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* תצוגת מספר תוצאות */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingInline: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
          מציג {sortedAndFilteredProducts.length} מוצרים בקטלוג
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            style={{ fontSize: '0.8rem', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            איפוס חיפוש
          </button>
        )}
      </div>

      {/* גריד כרטיסי מוצר */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '0.75rem'
      }}>
        {sortedAndFilteredProducts.slice(0, displayLimit).map((product) => {
          const inBasketQty = qtyMap[product.id] || 0;
          const cat = getCategoryInfo(product.category);
          const minP = getMinPrice(product);

          return (
            <div
              key={product.id}
              className="card"
              style={{
                padding: '0.85rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: inBasketQty > 0 ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                background: inBasketQty > 0 ? '#f0fdf4' : '#ffffff',
                borderRadius: '14px',
                transition: 'box-shadow 0.15s ease, border-color 0.15s ease'
              }}
            >
              <div>
                {/* קטגוריה ותגיות */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: '0.35rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </span>

                  {product.isRegulated && (
                    <span style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px'
                    }}>
                      פיקוח
                    </span>
                  )}
                </div>

                {/* שם המוצר */}
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  lineHeight: 1.35,
                  marginBlockEnd: '0.35rem'
                }}>
                  {product.name}
                </h3>

                {/* יחידה ומחיר */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBlockEnd: '0.75rem' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16a34a' }}>
                    ₪{minP.toFixed(2)}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    / {product.unit} (המחיר הזול ביותר)
                  </span>
                </div>
              </div>

              {/* כפתור הוספה / בורר כמויות */}
              <div style={{ borderBlockStart: '1px solid #f1f5f9', paddingBlockStart: '0.6rem' }}>
                {inBasketQty > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Check size={14} />
                      <span>בסל הקניות:</span>
                    </span>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#ffffff',
                      border: '1.5px solid #16a34a',
                      borderRadius: '8px',
                      padding: '2px'
                    }}>
                      <button
                        onClick={() => handleUpdateQty(product, -1)}
                        style={{
                          inlineSize: '28px',
                          blockSize: '28px',
                          border: 'none',
                          background: 'none',
                          color: '#16a34a',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '6px'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{
                        inlineSize: '28px',
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: '#0f172a'
                      }}>
                        {inBasketQty}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(product, 1)}
                        style={{
                          inlineSize: '28px',
                          blockSize: '28px',
                          border: 'none',
                          background: 'none',
                          color: '#16a34a',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '6px'
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddOne(product)}
                    className="btn btn-secondary"
                    style={{
                      width: '100%',
                      padding: '0.45rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                      color: '#2563eb',
                      borderColor: '#bfdbfe',
                      background: '#f8fafc'
                    }}
                  >
                    <Plus size={14} />
                    <span>הוסף לסל</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* כפתור טעינת מוצרים נוספים */}
      {sortedAndFilteredProducts.length > displayLimit && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBlock: '1.25rem' }}>
          <button
            onClick={() => setDisplayLimit((prev) => prev + 48)}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '12px'
            }}
          >
            הצג עוד 48 מוצרים (מוצגים {Math.min(displayLimit, sortedAndFilteredProducts.length)} מתוך {sortedAndFilteredProducts.length}) ⬇️
          </button>
          <button
            onClick={() => setDisplayLimit(sortedAndFilteredProducts.length)}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            הצג את כל {sortedAndFilteredProducts.length} המוצרים
          </button>
        </div>
      )}

      {/* סרגל סל צף בתחתית הדף במובייל ובמחשב */}
      {totalBasketItemsCount > 0 && (
        <div style={{
          position: 'fixed',
          insetInline: 0,
          insetBlockEnd: 0,
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          color: '#ffffff',
          padding: '0.75rem 1rem',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBlockStart: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.25)'
        }}>
          <div style={{ maxWidth: '768px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                background: '#2563eb',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                {totalBasketItemsCount}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  {totalBasketItemsCount} פריטים נבחרו בסל
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  מוכנים לבדיקת סלים וחיסכון
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={onSwitchToBasket}
                className="btn btn-secondary"
                style={{
                  fontSize: '0.85rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  border: 'none'
                }}
              >
                <span>הסל שלי</span>
              </button>

              <button
                onClick={onSwitchToComparison}
                className="btn btn-primary"
                style={{
                  fontSize: '0.85rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontWeight: 700
                }}
              >
                <span>השווה מחירים</span>
                <ArrowLeft size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
