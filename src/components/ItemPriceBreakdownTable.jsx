import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Check, X, Tag } from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData';

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
        לחצו על פריט לצפייה בהשוואת מחירים רוחבית בין 5 הרשתות וזיהוי הרשת הזולה ביותר:
      </p>

      <div className="breakdown-accordion">
        {parsedItems.map((item) => {
          const isOpen = !!openItems[item.id];

          // מציאת המחיר הזול ביותר לפריט
          let minPrice = Infinity;
          let cheapestStoreKey = null;

          storeKeys.forEach((key) => {
            const price = item.prices[key];
            if (item.inStock[key] && price !== null && price !== undefined && price < minPrice) {
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
                      <span>החל מ-₪{minPrice.toFixed(2)}</span>
                    </span>
                  )}
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {isOpen && (
                <div className="accordion-details">
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBlockEnd: '0.25rem' }}>
                    השוואת מחירים ברשתות (עבור {item.quantity} {item.unit}):
                  </div>

                  {storeKeys.map((key) => {
                    const store = STORES_METADATA[key];
                    const price = item.prices[key];
                    const inStock = item.inStock[key];
                    const isAvailable = inStock && price !== null && price !== undefined;
                    const isCheapest = key === cheapestStoreKey;
                    const lineTotal = isAvailable ? price * item.quantity : 0;

                    return (
                      <div
                        key={key}
                        className={`store-price-row ${isCheapest ? 'is-cheapest' : ''}`}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span className="store-dot" style={{ backgroundColor: store.color }}></span>
                          <span style={{ fontWeight: 600 }}>{store.name}</span>
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
                              {price === null ? 'לא קיים ברשת' : 'אזל מהמלאי'}
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
