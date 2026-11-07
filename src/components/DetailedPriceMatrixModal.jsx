import React from 'react';
import { X, Layers, Crown } from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData';

export default function DetailedPriceMatrixModal({
  isOpen,
  onClose,
  cart = [],
  isClubPromotionsEnabled = true
}) {
  if (!isOpen) return null;

  const storeKeys = Object.keys(STORES_METADATA);

  return (
    <div className="matrix-modal-backdrop" onClick={onClose}>
      <div className="matrix-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* כותרת המודל */}
        <div className="matrix-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} className="text-blue-600" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 className="matrix-modal-title">השוואת מחירים מלאה פריט-אחר-פריט</h3>
                {isClubPromotionsEnabled && (
                  <span className="matrix-club-badge-header">
                    <Crown size={12} className="text-amber-500" />
                    <span>כולל מחירי מועדון לקוחות</span>
                  </span>
                )}
              </div>
              <p className="matrix-modal-subtitle">
                מחירי מדף ומבצעי מועדון בכל 7 הרשתות עבור {cart.length} המוצרים שבסל שלך (המחיר הזול ביותר מסומן בירוק)
              </p>
            </div>
          </div>

          <button
            type="button"
            className="matrix-modal-close-btn"
            onClick={onClose}
            title="סגור חלון"
          >
            <X size={20} />
          </button>
        </div>

        {/* טבלת ההשוואה */}
        <div className="matrix-modal-table-container">
          <table className="matrix-table">
            <thead>
              <tr>
                <th style={{ minWidth: '190px', position: 'sticky', right: 0, backgroundColor: '#f8fafc', zIndex: 10, boxShadow: '-2px 0 5px rgba(0,0,0,0.05)' }}>מוצר וכמות</th>
                {storeKeys.map((sk) => {
                  const st = STORES_METADATA[sk];
                  return (
                    <th key={sk} style={{ textAlign: 'center', minWidth: '105px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                        <span style={{ color: st.color, fontWeight: 800 }}>{st.shortName}</span>
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{st.type}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                // מציאת מחיר מינימלי לפריט זה (תוך התחשבות במחירי מועדון אם דלוק)
                let minEffectivePrice = Infinity;
                storeKeys.forEach((key) => {
                  const regularP = item.prices ? item.prices[key] : null;
                  if (typeof regularP === 'number' && regularP > 0) {
                    let eff = regularP;
                    if (isClubPromotionsEnabled && Array.isArray(item.clubPromotions)) {
                      const promo = item.clubPromotions.find((p) => p.storeKey === key);
                      if (promo && typeof promo.clubPrice === 'number' && promo.clubPrice < eff) {
                        eff = promo.clubPrice;
                      }
                    }
                    if (eff < minEffectivePrice) {
                      minEffectivePrice = eff;
                    }
                  }
                });

                return (
                  <tr key={item.id}>
                    <td style={{ position: 'sticky', right: 0, backgroundColor: '#ffffff', zIndex: 5, boxShadow: '-2px 0 5px rgba(0,0,0,0.05)' }}>
                      <div className="matrix-item-info">
                        <span className="matrix-item-name">{item.name}</span>
                        <span className="matrix-item-meta">
                          {item.quantity} × {item.unit || 'יח׳'}
                          {item.manufacturer ? ` • ${item.manufacturer}` : ''}
                        </span>
                      </div>
                    </td>

                    {storeKeys.map((sk) => {
                      const regularP = item.prices ? item.prices[sk] : null;
                      let unitP = regularP;
                      let activePromo = null;

                      if (typeof regularP === 'number' && isClubPromotionsEnabled && Array.isArray(item.clubPromotions)) {
                        activePromo = item.clubPromotions.find((p) => p.storeKey === sk);
                        if (activePromo && typeof activePromo.clubPrice === 'number' && activePromo.clubPrice < regularP) {
                          unitP = activePromo.clubPrice;
                        } else {
                          activePromo = null;
                        }
                      }

                      const isCheapest = unitP === minEffectivePrice && unitP !== null && unitP !== Infinity;
                      const lineTotal = typeof unitP === 'number' ? unitP * item.quantity : null;

                      return (
                        <td
                          key={sk}
                          style={{
                            textAlign: 'center',
                            backgroundColor: isCheapest ? '#f0fdf4' : 'transparent',
                            borderInline: isCheapest ? '2px solid #22c55e' : 'none'
                          }}
                        >
                          {unitP ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              {activePromo ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                  <span
                                    style={{
                                      fontSize: '0.95rem',
                                      fontWeight: isCheapest ? 900 : 700,
                                      color: isCheapest ? '#15803d' : '#b45309'
                                    }}
                                  >
                                    👑 ₪{unitP.toFixed(2)}
                                  </span>
                                  <del style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                                    ₪{regularP.toFixed(2)}
                                  </del>
                                  <span
                                    style={{
                                      fontSize: '0.62rem',
                                      color: '#92400e',
                                      backgroundColor: '#fef3c7',
                                      padding: '0.05rem 0.25rem',
                                      borderRadius: '3px',
                                      marginTop: '0.1rem',
                                      whiteSpace: 'nowrap'
                                    }}
                                    title={activePromo.description}
                                  >
                                    {activePromo.clubName}
                                  </span>
                                </div>
                              ) : (
                                <span
                                  style={{
                                    fontSize: '0.95rem',
                                    fontWeight: isCheapest ? 900 : 600,
                                    color: isCheapest ? '#15803d' : '#0f172a'
                                  }}
                                >
                                  ₪{unitP.toFixed(2)}
                                </span>
                              )}

                              {item.quantity > 1 && lineTotal && (
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                  (סה"כ ₪{lineTotal.toFixed(2)})
                                </span>
                              )}

                              {isCheapest && (
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    color: '#15803d',
                                    background: '#dcfce7',
                                    padding: '0.1rem 0.35rem',
                                    borderRadius: '4px',
                                    marginTop: '0.15rem'
                                  }}
                                >
                                  הכי זול!
                                </span>
                              )}
                            </div>
                          ) : (
                            <span style={{ color: '#cbd5e1' }}>-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            {/* שורת סיכום כוללת לכל סופרמרקט */}
            <tfoot>
              <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #cbd5e1' }}>
                <td style={{ position: 'sticky', right: 0, backgroundColor: '#f8fafc', zIndex: 5, boxShadow: '-2px 0 5px rgba(0,0,0,0.05)', padding: '0.85rem 1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0f172a' }}>סה"כ לסל מלא:</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({cart.length} סוגי מוצרים)</span>
                  </div>
                </td>
                {storeKeys.map((sk) => {
                  let totalForStore = 0;
                  for (const it of cart) {
                    const regularP = it.prices ? it.prices[sk] : 0;
                    let eff = regularP;
                    if (isClubPromotionsEnabled && Array.isArray(it.clubPromotions)) {
                      const promo = it.clubPromotions.find((p) => p.storeKey === sk);
                      if (promo && typeof promo.clubPrice === 'number' && promo.clubPrice < regularP) {
                        eff = promo.clubPrice;
                      }
                    }
                    if (typeof eff === 'number') totalForStore += eff * it.quantity;
                  }

                  let minStoreTotal = Infinity;
                  let bestStoreKey = null;
                  storeKeys.forEach((k) => {
                    let sum = 0;
                    cart.forEach((it) => {
                      const regularP = it.prices ? it.prices[k] : 0;
                      let eff = regularP;
                      if (isClubPromotionsEnabled && Array.isArray(it.clubPromotions)) {
                        const promo = it.clubPromotions.find((p) => p.storeKey === k);
                        if (promo && typeof promo.clubPrice === 'number' && promo.clubPrice < regularP) {
                          eff = promo.clubPrice;
                        }
                      }
                      if (typeof eff === 'number') sum += eff * it.quantity;
                    });
                    if (sum > 0 && sum < minStoreTotal) {
                      minStoreTotal = sum;
                      bestStoreKey = k;
                    }
                  });

                  const isBestOverall = sk === bestStoreKey;

                  return (
                    <td
                      key={sk}
                      style={{
                        textAlign: 'center',
                        padding: '0.85rem 0.5rem',
                        backgroundColor: isBestOverall ? '#dcfce7' : 'transparent',
                        borderInline: isBestOverall ? '2px solid #22c55e' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: isBestOverall ? '#15803d' : '#0f172a' }}>
                          ₪{totalForStore.toFixed(2)}
                        </span>
                        {isBestOverall && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#15803d', background: '#bbf7d0', padding: '0.15rem 0.4rem', borderRadius: '4px', marginTop: '0.2rem' }}>
                            🏆 מקום 1
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* שורת חיסכון מועדון לקוחות */}
              {isClubPromotionsEnabled && (
                <tr style={{ backgroundColor: '#fffbeb', borderTop: '1px dashed #fde68a' }}>
                  <td style={{ position: 'sticky', right: 0, backgroundColor: '#fffbeb', zIndex: 5, boxShadow: '-2px 0 5px rgba(0,0,0,0.05)', padding: '0.65rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Crown size={14} className="text-amber-600" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400e' }}>חיסכון מועדון:</span>
                    </div>
                  </td>
                  {storeKeys.map((sk) => {
                    let storeSavings = 0;
                    for (const it of cart) {
                      const regularP = it.prices ? it.prices[sk] : 0;
                      if (Array.isArray(it.clubPromotions)) {
                        const promo = it.clubPromotions.find((p) => p.storeKey === sk);
                        if (promo && typeof promo.clubPrice === 'number' && promo.clubPrice < regularP) {
                          storeSavings += (regularP - promo.clubPrice) * it.quantity;
                        }
                      }
                    }

                    return (
                      <td key={sk} style={{ textAlign: 'center', padding: '0.65rem 0.5rem' }}>
                        {storeSavings > 0 ? (
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309' }}>
                            ₪{storeSavings.toFixed(2)}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>₪0.00</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              )}
            </tfoot>
          </table>
        </div>

        {/* פוטר סגירה */}
        <div className="matrix-modal-footer">
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            השוואת מחירי אמת מסונכרנת לפי חוק שקיפות המחירים ומבצעי מועדוני הלקוחות ברשתות המזון בישראל לשנת 2026
          </span>
          <button type="button" className="matrix-close-btn-styled" onClick={onClose}>
            סגור חלון
          </button>
        </div>
      </div>
    </div>
  );
}
