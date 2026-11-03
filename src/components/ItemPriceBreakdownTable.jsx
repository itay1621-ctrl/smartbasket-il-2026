import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Check, X, Tag, Store } from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData';

export default function ItemPriceBreakdownTable({ parsedItems }) {
  const [openItems, setOpenItems] = useState({});
  const [breakdownSectorFilter, setBreakdownSectorFilter] = useState('all');

  if (!parsedItems || parsedItems.length === 0) return null;

  const toggleItem = (itemId) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleAll = () => {
    const allOpen = parsedItems.every((item) => openItems[item.id]);
    const newState = {};
    parsedItems.forEach((item) => {
      newState[item.id] = !allOpen;
    });
    setOpenItems(newState);
  };

  // סינון רשתות לפי בחירה
  const allStoreKeys = Object.keys(STORES_METADATA);
  const filteredStoreKeys = allStoreKeys.filter((key) => {
    if (breakdownSectorFilter === 'all') return true;
    return STORES_METADATA[key].sector === breakdownSectorFilter;
  });

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Layers size={18} className="text-blue" />
          <span>השוואה מפורטת פריט-אחר-פריט</span>
        </h2>
        <button
          onClick={toggleAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {parsedItems.every((item) => openItems[item.id]) ? 'סגור הכל' : 'פתח הכל'}
        </button>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBlockStart: '-0.5rem' }}>
        מציג מחירי מדף רגילים בחנויות ללא משלוח, כולל רשתות פיזיות ללא שירות אונליין:
      </p>

      {/* מתג סינון רשתות בהשוואה המפורטת */}
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBlockEnd: '0.5rem' }}>
        <button
          onClick={() => setBreakdownSectorFilter('all')}
          style={{
            paddingInline: '0.65rem',
            paddingBlock: '0.25rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: breakdownSectorFilter === 'all' ? '#2563eb' : '#cbd5e1',
            background: breakdownSectorFilter === 'all' ? '#2563eb' : '#f8fafc',
            color: breakdownSectorFilter === 'all' ? '#ffffff' : '#475569',
            cursor: 'pointer'
          }}
        >
          כל 10 הרשתות
        </button>
        <button
          onClick={() => setBreakdownSectorFilter('food')}
          style={{
            paddingInline: '0.65rem',
            paddingBlock: '0.25rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: breakdownSectorFilter === 'food' ? '#059669' : '#cbd5e1',
            background: breakdownSectorFilter === 'food' ? '#059669' : '#f8fafc',
            color: breakdownSectorFilter === 'food' ? '#ffffff' : '#475569',
            cursor: 'pointer'
          }}
        >
          רשתות מזון (שופרסל, רמי לוי, יוחננוף, קרפור, אושר עד, ויקטורי)
        </button>
        <button
          onClick={() => setBreakdownSectorFilter('stock')}
          style={{
            paddingInline: '0.65rem',
            paddingBlock: '0.25rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: breakdownSectorFilter === 'stock' ? '#e11d48' : '#cbd5e1',
            background: breakdownSectorFilter === 'stock' ? '#e11d48' : '#f8fafc',
            color: breakdownSectorFilter === 'stock' ? '#ffffff' : '#475569',
            cursor: 'pointer'
          }}
        >
          רשתות סטוק (מקס סטוק, הסטוק, מקס אונליין, סטוק אונליין)
        </button>
      </div>

      <div className="breakdown-accordion">
        {parsedItems.map((item) => {
          const isOpen = !!openItems[item.id];

          // מציאת המחיר הזול ביותר לפריט מתוך הרשתות המוצגות
          let minPrice = Infinity;
          let cheapestStoreKey = null;

          filteredStoreKeys.forEach((key) => {
            const price = item.prices ? item.prices[key] : null;
            const inStock = item.inStock ? item.inStock[key] : false;
            if (inStock && price !== null && price !== undefined && price < minPrice) {
              minPrice = price;
              cheapestStoreKey = key;
            }
          });

          return (
            <div key={item.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
              <div
                className="accordion-summary"
                onClick={() => toggleItem(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
              >
                <div className="item-main-info">
                  <span className="item-qty-tag">{item.quantity} {item.unit}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                      {item.name}
                    </div>
                    {item.originalText !== item.name && (
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                        זוהה מתוך: "{item.originalText}"
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {minPrice !== Infinity && (
                    <span className="lowest-price-pill">
                      <Tag size={11} />
                      <span>מחיר רגיל מ-₪{minPrice.toFixed(2)}</span>
                    </span>
                  )}
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {isOpen && (
                <div className="accordion-details">
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBlockEnd: '0.35rem' }}>
                    מחיר מדף רגיל בחנות (ללא משלוח) עבור {item.quantity} {item.unit}:
                  </div>

                  {filteredStoreKeys.map((key) => {
                    const store = STORES_METADATA[key];
                    const price = item.prices ? item.prices[key] : null;
                    const inStock = item.inStock ? item.inStock[key] : false;
                    const isAvailable = inStock && price !== null && price !== undefined;
                    const isCheapest = key === cheapestStoreKey;
                    const lineTotal = isAvailable ? price * item.quantity : 0;
                    const isPhysicalOnly = store.type && store.type.includes('סניפים בלבד');

                    return (
                      <div
                        key={key}
                        className={`store-price-row ${isCheapest ? 'is-cheapest' : ''}`}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                          <span className="store-dot" style={{ backgroundColor: store.color }}></span>
                          <span style={{ fontWeight: 600 }}>{store.name}</span>
                          
                          {/* תג סוג פעילות חנות: פיזי בלבד / אונליין */}
                          {isPhysicalOnly ? (
                            <span
                              style={{
                                fontSize: '0.65rem',
                                color: '#991b1b',
                                background: '#fee2e2',
                                border: '1px solid #fca5a5',
                                paddingInline: '0.35rem',
                                paddingBlock: '0.05rem',
                                borderRadius: '4px'
                              }}
                            >
                              🏪 סניף פיזי (ללא אונליין)
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: '0.65rem',
                                color: '#0369a1',
                                background: '#e0f2fe',
                                paddingInline: '0.35rem',
                                paddingBlock: '0.05rem',
                                borderRadius: '4px'
                              }}
                            >
                              {store.type}
                            </span>
                          )}

                          {isCheapest && <span className="badge-cheapest">הזול ביותר!</span>}
                        </div>

                        <div>
                          {isAvailable ? (
                            <div style={{ textAlign: 'left' }}>
                              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                                ₪{lineTotal.toFixed(2)}
                              </span>
                              {item.quantity > 1 && (
                                <span style={{ fontSize: '0.7rem', color: '#64748b', marginInlineStart: '0.35rem' }}>
                                  (₪{price.toFixed(2)} ליח׳)
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 500 }}>
                              {price === null ? 'לא משווק ברשת' : 'אזל מהמלאי'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
