import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Search,
  Sparkles,
  Edit3,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import {
  CATEGORIES,
  INITIAL_USER_LIST
} from '../data/mockStoresData.js';
import {
  getBasketQuantityMap,
  updateProductQuantity,
  addProductToBasket,
  removeProductFromBasket
} from '../utils/basketHelpers.js';

export default function OrganizedBasketView({
  rawText,
  setRawText,
  parsedItems,
  onSwitchToCatalog,
  onSwitchToComparison,
  optimalSplit,
  catalog = []
}) {
  const [quickSearch, setQuickSearch] = useState('');
  const [showRawEditor, setShowRawEditor] = useState(false);

  // מפת כמויות
  const qtyMap = useMemo(() => getBasketQuantityMap(rawText), [rawText]);

  // סינון הצעות לחיפוש מהיר מתוך הקטלוג המלא
  const quickSearchResults = useMemo(() => {
    if (!quickSearch.trim()) return [];
    const term = quickSearch.trim().toLowerCase();
    return catalog.filter((p) => {
      const matchName = p.name && p.name.toLowerCase().includes(term);
      const matchMfg = p.manufacturer && p.manufacturer.toLowerCase().includes(term);
      const matchBarcode = p.barcode && p.barcode.includes(term);
      const matchAlias = p.aliases && p.aliases.some((a) => a.toLowerCase().includes(term));
      return matchName || matchMfg || matchBarcode || matchAlias;
    }).slice(0, 6);
  }, [quickSearch, catalog]);

  // מציאת קטגוריה לפי ID
  const getCategoryInfo = (categoryId) => {
    const found = CATEGORIES.find((c) => c.id === categoryId);
    return found || { name: 'כללי', icon: '🛒' };
  };

  // חישוב מחיר מינימלי למוצר
  const getMinPrice = (item) => {
    if (!item.prices) return 0;
    const vals = Object.values(item.prices).filter((p) => typeof p === 'number' && p > 0);
    return vals.length > 0 ? Math.min(...vals) : 0;
  };

  // סה"כ מחיר מוערך (בסיס)
  const estimatedMinTotal = useMemo(() => {
    return parsedItems.reduce((acc, it) => {
      const minP = getMinPrice(it);
      return acc + minP * it.quantity;
    }, 0);
  }, [parsedItems]);

  const handleUpdateQty = (item, delta) => {
    const current = item.quantity;
    const next = Math.max(0, current + delta);
    const updated = updateProductQuantity(rawText, item, next);
    setRawText(updated);
  };

  const handleRemoveItem = (item) => {
    const updated = removeProductFromBasket(rawText, item);
    setRawText(updated);
  };

  const handleQuickAdd = (product) => {
    const updated = addProductToBasket(rawText, product, 1);
    setRawText(updated);
    setQuickSearch('');
  };

  const handleClearBasket = () => {
    if (parsedItems.length === 0) return;
    if (window.confirm('האם אתם בטוחים שברצונכם לרוקן את הסל?')) {
      setRawText('');
    }
  };

  const handleLoadSample = (sampleText) => {
    setRawText(sampleText);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* סרגל עליון: סיכום מהיר וסל שבועי */}
      <div className="card" style={{ padding: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                רשימת הקניות שלי (סופרמרקט)
              </h2>
              <span style={{
                background: '#e0f2fe',
                color: '#0284c7',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: '999px'
              }}>
                {parsedItems.length} מוצרים
              </span>
            </div>
            {parsedItems.length > 0 && (
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0' }}>
                מחיר בסיס זול ביותר לסל: <strong style={{ color: '#0f172a' }}>₪{estimatedMinTotal.toFixed(2)}</strong>
                {optimalSplit && optimalSplit.savingsVsSingle > 0 && (
                  <span style={{ color: '#16a34a', marginInlineStart: '0.5rem', fontWeight: 700 }}>
                    (חיסכון של ₪{optimalSplit.savingsVsSingle.toFixed(2)} בפיצול 2 רשתות!)
                  </span>
                )}
              </p>
            )}
          </div>

          {parsedItems.length > 0 && (
            <button
              onClick={onSwitchToComparison}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.1rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: '12px'
              }}
            >
              <span>השווה מחירים עכשיו</span>
              <ArrowLeft size={16} />
            </button>
          )}
        </div>

        {/* כפתורי סלים מוכנים מראש */}
        <div style={{ marginBlockStart: '0.9rem', borderBlockStart: '1px solid #f1f5f9', paddingBlockStart: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBlockEnd: '0.4rem' }}>
            טעינת סל מוכן:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              onClick={() => handleLoadSample(INITIAL_USER_LIST)}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '10px' }}
            >
              <span>🛒</span>
              <span>סל סופרמרקט שבועי בסיסי (20 פריטי יסוד)</span>
            </button>
            {parsedItems.length > 0 && (
              <button
                onClick={handleClearBasket}
                className="btn btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', borderRadius: '10px', color: '#ef4444', borderColor: '#fecaca' }}
              >
                <Trash2 size={13} />
                <span>רוקן סל</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* תיבת חיפוש והוספה מהירה של מוצר מתוך 1,000+ מוצרים */}
      <div className="card" style={{ padding: '0.9rem 1.1rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Search size={18} style={{ color: '#64748b' }} />
          <input
            type="text"
            className="input-text"
            style={{ flex: 1, border: 'none', padding: '0.4rem 0', fontSize: '0.95rem', outline: 'none' }}
            placeholder="הוסף מוצר במהירות (הקלד: חלב, גבינה צהובה, עגבניות, עוף, קפה, פיירי...)"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
          />
          {quickSearch && (
            <button
              onClick={() => setQuickSearch('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* תוצאות חיפוש מהיר נפתחות */}
        {quickSearchResults.length > 0 && (
          <div style={{
            position: 'absolute',
            insetInlineStart: 0,
            insetInlineEnd: 0,
            insetBlockStart: '100%',
            background: '#ffffff',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            zIndex: 40,
            marginBlockStart: '4px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '0.5rem 0.75rem', background: '#f8fafc', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
              מוצרים תואמים בקטלוג הסופרמרקטים (לחצו להוספה):
            </div>
            {quickSearchResults.map((prod) => {
              const inQty = qtyMap[prod.id] || 0;
              const cat = getCategoryInfo(prod.category);
              const minP = getMinPrice(prod);
              return (
                <div
                  key={prod.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.9rem',
                    borderBlockEnd: '1px solid #f1f5f9',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>{prod.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {prod.manufacturer ? `${prod.manufacturer} • ` : ''}
                        {prod.unit} • החל מ-₪{minP.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(prod)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem', borderRadius: '8px' }}
                  >
                    <Plus size={14} />
                    <span>{inQty > 0 ? `הוסף עוד (${inQty} בסל)` : 'הוסף'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* רשימת המוצרים המסודרת */}
      {parsedItems.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingInline: '0.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>
              פריטים בסל הקניות ({parsedItems.length}):
            </span>
            <button
              onClick={onSwitchToCatalog}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>+ הוסף עוד מ-1,000+ מוצרי הקטלוג</span>
            </button>
          </div>

          {parsedItems.map((item) => {
            const cat = getCategoryInfo(item.category);
            const minP = getMinPrice(item);
            const lineTotal = minP * item.quantity;

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  transition: 'transform 0.1s ease'
                }}
              >
                {/* פרטי המוצר */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      inlineSize: '40px',
                      blockSize: '40px',
                      borderRadius: '10px',
                      background: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}
                  >
                    {cat.icon}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#0f172a',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.15rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {item.manufacturer ? `${item.manufacturer} • ` : ''}
                        {item.unit}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                        החל מ-₪{minP.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* שליטה בכמות ומחיר שורה */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'left', minWidth: '55px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                      ₪{lineTotal.toFixed(2)}
                    </div>
                    {item.quantity > 1 && (
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        {item.quantity} × ₪{minP.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '2px'
                  }}>
                    <button
                      onClick={() => handleUpdateQty(item, -1)}
                      style={{
                        inlineSize: '28px',
                        blockSize: '28px',
                        border: 'none',
                        background: 'none',
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px'
                      }}
                      title="הפחת כמות"
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{
                      inlineSize: '24px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: '#0f172a'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQty(item, 1)}
                      style={{
                        inlineSize: '28px',
                        blockSize: '28px',
                        border: 'none',
                        background: 'none',
                        color: '#475569',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px'
                      }}
                      title="הגדל כמות"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    title="מחק מוצר מהסל"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* מצב סל ריק */
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            color: '#64748b'
          }}
        >
          <div style={{ fontSize: '3rem', marginBlockEnd: '0.75rem' }}>🛒</div>
          <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBlockEnd: '0.4rem' }}>
            סל הקניות שלכם ריק
          </h3>
          <p style={{ fontSize: '0.9rem', maxWidth: '380px', marginInline: 'auto', marginBlockEnd: '1.5rem' }}>
            בחרו מוצרים מתוך קטלוג 1,000+ המוצרים או טענו סל סופר שבועי בלחיצה כדי להתחיל להשוות מחירים ולחסוך!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={onSwitchToCatalog}
              className="btn btn-primary"
              style={{ padding: '0.7rem 1.25rem', fontSize: '0.95rem', borderRadius: '12px' }}
            >
              <span>פתח קטלוג מוצרים לבחירה 📦</span>
            </button>
            <button
              onClick={() => handleLoadSample(INITIAL_USER_LIST)}
              className="btn btn-secondary"
              style={{ padding: '0.7rem 1.25rem', fontSize: '0.95rem', borderRadius: '12px' }}
            >
              <span>טען סל סופרמרקט שבועי לדוגמה 🛒</span>
            </button>
          </div>
        </div>
      )}

      {/* אזור עריכת טקסט חופשי */}
      <div className="card" style={{ padding: '0.85rem 1.1rem' }}>
        <button
          onClick={() => setShowRawEditor(!showRawEditor)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            color: '#475569',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Edit3 size={15} className="text-blue" />
            <span>הדבק או ערוך רשימה כטקסט חופשי (נוח להעתקה מוואטסאפ)</span>
          </div>
          {showRawEditor ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showRawEditor && (
          <div style={{ marginBlockStart: '0.75rem' }}>
            <textarea
              className="list-textarea"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="הדבק כאן רשימת קניות, שורה לכל מוצר (לדוגמה: 2 חלב תנובה, עגבניות, חזה עוף)..."
              rows={6}
              style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem', borderRadius: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem', fontSize: '0.75rem', color: '#64748b' }}>
              <span>ניתן לציין כמויות: "2 חלב", "מארז טונה", "3x פסטה"</span>
            </div>
          </div>
        )}
      </div>

      {/* כפתור תחתון גדול להמשך להשוואה */}
      {parsedItems.length > 0 && (
        <div style={{ marginBlockStart: '0.5rem' }}>
          <button
            onClick={onSwitchToComparison}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
            }}
          >
            <span>המשך להשוואת מחירים בין 7 הרשתות ({parsedItems.length} מוצרים)</span>
            <ArrowLeft size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
