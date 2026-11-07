import React from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Trophy,
  Scale,
  Table,
  Crown
} from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData';

export default function CartSidebar({
  cart = [],
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onOpenMatrixModal,
  oneStopRankings = [],
  optimalSplit = null,
  isShippingEnabled,
  isClubPromotionsEnabled = true,
  onCloseMobileDrawer
}) {
  const totalItemsCount = cart.reduce((sum, it) => sum + (it.quantity || 1), 0);
  const bestStore = oneStopRankings[0] || null;
  const worstStore = oneStopRankings[oneStopRankings.length - 1] || null;

  // חישוב חיסכון מול הרשת היקרה ביותר
  const maxSavingsNis = bestStore && worstStore ? Math.max(0, worstStore.grandTotal - bestStore.grandTotal) : 0;
  const maxSavingsPercent = worstStore && worstStore.grandTotal > 0
    ? Math.round((maxSavingsNis / worstStore.grandTotal) * 100)
    : 0;

  // תצוגת משקל לפריט
  const formatItemWeight = (item) => {
    const isWeight = item.isWeight || item.category === 'deli_cheese';
    if (!isWeight) return `${item.quantity} ${item.unit || 'יח׳'}`;
    const step = item.weightStep || 100;
    if (step === 100) {
      const totalG = item.quantity * 100;
      if (totalG >= 1000) {
        return `${(totalG / 1000).toFixed(1)} ק״ג (${item.quantity} × 100 ג׳)`;
      }
      return `${totalG} גרם (${item.quantity} × 100 ג׳)`;
    }
    return `${item.quantity} ק״ג`;
  };

  return (
    <div className="cart-sidebar-container">
      {/* כותרת הסל וכפתור רוקן סל */}
      <div className="cart-header-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="cart-header-icon-box">
              <ShoppingBag size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="cart-title">הסל שלי</h2>
              <span className="cart-items-counter">
                {cart.length} סוגי מוצרים ({totalItemsCount} יחידות)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {cart.length > 0 && (
              <button
                type="button"
                className="btn-clear-cart"
                onClick={onClearCart}
                title="רוקן את כל המוצרים מהסל"
              >
                <Trash2 size={14} />
                <span>רוקן סל</span>
              </button>
            )}

            {onCloseMobileDrawer && (
              <button
                type="button"
                className="btn-close-drawer"
                onClick={onCloseMobileDrawer}
                title="סגור חלון"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* רשימת המוצרים שבסל */}
      <div className="cart-items-scroll-area">
        {cart.length === 0 ? (
          <div className="empty-cart-view">
            <div className="empty-cart-emoji">🛒</div>
            <h4 className="empty-cart-title">סל הקניות ריק</h4>
            <p className="empty-cart-text">
              לחצו על <strong>"+ הוסף לסל"</strong> בכל כרטיס מוצר כדי להשוות מחירים בין 7 הסופרמרקטים!
            </p>
          </div>
        ) : (
          <div className="cart-items-list">
            {cart.map((item) => {
              // מציאת המחיר הזול ביותר לפריט זה
              const prices = item.prices || {};
              let minPrice = Infinity;
              for (const p of Object.values(prices)) {
                if (typeof p === 'number' && p > 0 && p < minPrice) {
                  minPrice = p;
                }
              }
              const lineTotal = minPrice !== Infinity ? minPrice * item.quantity : 0;
              const isWeight = item.isWeight || item.category === 'deli_cheese';

              return (
                <div key={item.id} className="cart-item-row">
                  {/* פרטי המוצר */}
                  <div className="cart-item-details">
                    <div className="cart-item-name" title={item.name}>
                      {item.name}
                    </div>

                    <div className="cart-item-meta">
                      <span className="cart-weight-badge">
                        {isWeight && <Scale size={11} />}
                        <span>{formatItemWeight(item)}</span>
                      </span>
                      {item.manufacturer && (
                        <span className="cart-mfg-text">• {item.manufacturer}</span>
                      )}
                      {isClubPromotionsEnabled && Array.isArray(item.clubPromotions) && item.clubPromotions.length > 0 && (
                        <span className="cart-club-tag" title={item.clubPromotions[0].description}>
                          👑 {item.clubPromotions[0].clubName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* מחיר שורה */}
                  <div className="cart-item-price-box">
                    <span className="cart-line-total">₪{lineTotal.toFixed(2)}</span>
                    {item.quantity > 1 && (
                      <span className="cart-unit-price">
                        {minPrice.toFixed(2)} ₪ ליח׳
                      </span>
                    )}
                  </div>

                  {/* בורר כמות וכפתור מחיקה מהיר */}
                  <div className="cart-item-stepper-wrap">
                    <button
                      type="button"
                      className="cart-btn-stepper cart-btn-minus"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(item.id, -1);
                      }}
                      title={item.quantity === 1 ? 'הסר מוצר מהסל' : 'הפחת כמות'}
                    >
                      {item.quantity === 1 ? <Trash2 size={13} className="text-red-500" /> : <Minus size={13} />}
                    </button>

                    <span className="cart-qty-number">{item.quantity}</span>

                    <button
                      type="button"
                      className="cart-btn-stepper cart-btn-plus"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(item.id, 1);
                      }}
                      title="הגדל כמות"
                    >
                      <Plus size={13} />
                    </button>

                    {/* כפתור פח אשפה אדום למחיקה ישירה */}
                    <button
                      type="button"
                      className="cart-btn-trash-direct"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromCart(item.id, e);
                      }}
                      title="מחק מוצר זה מהסל"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* אזור השוואת סופרמרקטים חי (מוצג כשיש מוצרים בסל) */}
      {cart.length > 0 && bestStore && (
        <div className="supermarket-comparison-section">
          {/* כרטיס הסופרמרקט המנצח (הזול ביותר) */}
          <div className="winner-supermarket-card">
            <div className="winner-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Trophy size={18} className="text-amber-500" />
                <span className="winner-crown-text">הסופרמרקט המשתלם ביותר לסל שלך:</span>
              </div>
              <span className="winner-tag-pill">מקום 1 🏆</span>
            </div>

            <div className="winner-store-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="winner-store-dot" style={{ backgroundColor: bestStore.store.color }} />
                <span className="winner-store-name">{bestStore.store.name}</span>
              </div>
              <div className="winner-total-price">
                ₪{bestStore.grandTotal.toFixed(2)}
              </div>
            </div>

            {/* באנר חיסכון מקסימלי */}
            {maxSavingsNis > 0 && (
              <div className="winner-savings-banner">
                <Sparkles size={16} className="text-emerald-500" />
                <span>
                  חיסכון של <strong>₪{maxSavingsNis.toFixed(2)} ({maxSavingsPercent}%)</strong> לעומת {worstStore ? worstStore.store.shortName : 'הרשת היקרה ביותר'}!
                </span>
              </div>
            )}

            {/* באנר חיסכון מועדון לקוחות */}
            {isClubPromotionsEnabled && bestStore.clubSavingsTotal > 0 && (
              <div className="winner-club-savings-banner">
                <Crown size={15} className="text-amber-500" />
                <span>
                  חיסכון מועדון לקוחות ({bestStore.store.shortName}): <strong>₪{bestStore.clubSavingsTotal.toFixed(2)}</strong> בסל זה!
                </span>
              </div>
            )}
          </div>

          {/* כרטיס פיצול אופטימלי (אם קיים חיסכון בפיצול 2 רשתות) */}
          {optimalSplit && optimalSplit.savingsVsSingle > 1 && (
            <div className="split-savings-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={16} className="text-sky-500" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0369a1' }}>
                    רוצים לחסוך עוד יותר?
                  </span>
                </div>
                <span className="split-savings-tag">
                  עוד ₪{optimalSplit.savingsVsSingle.toFixed(2)} חיסכון!
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#0284c7', margin: '0.2rem 0 0' }}>
                פיצול בין <strong>{optimalSplit.storeBreakdowns.map(sb => sb.store.shortName).join(' + ')}</strong> מביא את הסל ל-<strong>₪{optimalSplit.grandTotal.toFixed(2)}</strong>!
              </p>
            </div>
          )}

          {/* טבלת דירוג 7 הרשתות עם פסים ויזואליים */}
          <div className="supermarkets-ranking-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                דירוג 7 הרשתות (סל מלא):
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                {isShippingEnabled ? 'כולל משלוח' : 'מחירי מדף בחנות'}
                {isClubPromotionsEnabled ? ' • מחירי מועדון' : ''}
              </span>
            </div>

            <div className="ranking-bars-list">
              {oneStopRankings.map((r, idx) => {
                const isBest = idx === 0;
                // חישוב רוחב יחסי של המחיר
                const lowestPrice = bestStore.grandTotal;
                const ratio = lowestPrice > 0 ? (r.grandTotal / lowestPrice) : 1;
                const barPercent = Math.min(100, Math.max(65, Math.round((lowestPrice / r.grandTotal) * 100)));

                return (
                  <div key={r.storeKey} className={`ranking-store-row ${isBest ? 'best-rank-row' : ''}`}>
                    <div className="ranking-store-meta">
                      <span className="rank-number-circle">{idx + 1}</span>
                      <span className="rank-store-name">{r.store.shortName}</span>
                    </div>

                    <div className="ranking-bar-wrapper">
                      <div
                        className="ranking-bar-fill"
                        style={{
                          width: `${barPercent}%`,
                          backgroundColor: isBest ? '#10b981' : idx === 1 ? '#0ea5e9' : '#94a3b8'
                        }}
                      />
                    </div>

                    <div className="ranking-price-box">
                      <span className="rank-final-price">₪{r.grandTotal.toFixed(2)}</span>
                      {isClubPromotionsEnabled && r.clubSavingsTotal > 0 && (
                        <span className="rank-club-savings-tag" title={`חיסכון מועדון ${r.store.shortName}: ₪${r.clubSavingsTotal.toFixed(2)}`}>
                          👑 -₪{r.clubSavingsTotal.toFixed(0)} מועדון
                        </span>
                      )}
                      {isShippingEnabled && r.shipping > 0 && (
                        <span className="rank-shipping-note">+{r.shipping.toFixed(0)}₪ משלוח</span>
                      )}
                      {r.storeKey === 'osher_ad' && isShippingEnabled && (
                        <span className="rank-shipping-note text-amber-600">סניף פיזי</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* כפתור פתיחת טבלת השוואה מפורטת מוצר-מול-מוצר */}
          <button
            type="button"
            className="btn-open-matrix-table"
            onClick={onOpenMatrixModal}
          >
            <Table size={16} />
            <span>צפה בטבלת השוואת מחירים מפורטת פריט-אחר-פריט</span>
          </button>
        </div>
      )}
    </div>
  );
}
