import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData.js';

export default function ItemPriceBreakdownTable({ parsedItems }) {
  const [openItems, setOpenItems] = useState({});

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

  const storeKeys = Object.keys(STORES_METADATA);

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
          <Layers size={18} className="text-blue" />
          <span>השוואה מפורטת פריט-אחר-פריט (7 רשתות)</span>
        </h2>
        <button
          onClick={toggleAll}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {parsedItems.every((item) => openItems[item.id]) ? 'סגור הכל' : 'פתח הכל'}
        </button>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBlockStart: '-0.25rem', marginBlockEnd: '0.75rem' }}>
        מציג מחירי מדף מלאים בכל 7 רשתות המזון. המחיר הזול ביותר בכל מוצר מסומן בירוק מודגש:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {parsedItems.map((item) => {
          const isOpen = !!openItems[item.id];

          // מציאת מחיר מינימלי עבור הפריט
          let minPrice = Infinity;
          let bestStoreKey = null;

          storeKeys.forEach((key) => {
            const p = item.prices ? item.prices[key] : null;
            if (typeof p === 'number' && p > 0 && p < minPrice) {
              minPrice = p;
              bestStoreKey = key;
            }
          });

          const bestStore = bestStoreKey ? STORES_METADATA[bestStoreKey] : null;

          return (
            <div
              key={item.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                background: '#ffffff',
                overflow: 'hidden'
              }}
            >
              {/* שורת סיכום הפריט */}
              <div
                onClick={() => toggleItem(item.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0.85rem',
                  cursor: 'pointer',
                  background: isOpen ? '#f8fafc' : '#ffffff',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '9999px',
                      background: '#f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#0f172a'
                    }}
                  >
                    {item.quantity}
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {item.manufacturer && <span>יצרן: {item.manufacturer} • </span>}
                      {item.barcode && <span>ברקוד: {item.barcode} • </span>}
                      <span>{item.unit}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {bestStore && minPrice !== Infinity && (
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>הכי זול ב-{bestStore.shortName}</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#16a34a' }}>
                        ₪{(minPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  )}

                  {isOpen ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
                </div>
              </div>

              {/* טבלת פירוט כל 7 הרשתות */}
              {isOpen && (
                <div style={{ padding: '0.75rem', borderTop: '1px solid #f1f5f9', background: '#fafafa' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '0.4rem'
                    }}
                  >
                    {storeKeys.map((sk) => {
                      const st = STORES_METADATA[sk];
                      const unitP = item.prices ? item.prices[sk] : null;
                      const isCheapest = unitP === minPrice;
                      const lineTotal = typeof unitP === 'number' ? unitP * item.quantity : null;

                      return (
                        <div
                          key={sk}
                          style={{
                            background: isCheapest ? '#dcfce7' : '#ffffff',
                            border: isCheapest ? '1.5px solid #22c55e' : '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '0.45rem',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: st.color, marginBlockEnd: '0.2rem' }}>
                            {st.shortName}
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 900, color: isCheapest ? '#15803d' : '#0f172a' }}>
                            {unitP ? `₪${unitP.toFixed(2)}` : '-'}
                          </div>
                          {item.quantity > 1 && lineTotal && (
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                              סה"כ: ₪{lineTotal.toFixed(2)}
                            </div>
                          )}
                          {isCheapest && (
                            <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#15803d', marginBlockStart: '0.15rem' }}>
                              ✓ הכי זול
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
