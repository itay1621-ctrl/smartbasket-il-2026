import React from 'react';
import { Sparkles, TrendingDown, Share2, Check, AlertTriangle, ShieldAlert, Store, Truck } from 'lucide-react';

export default function OptimalSplitCard({ optimalSplit, isShippingEnabled, setIsShippingEnabled }) {
  if (!optimalSplit || optimalSplit.storeBreakdowns.length === 0) {
    return null;
  }

  const {
    savingsNis,
    savingsPercent,
    grandTotal,
    totalItemsCost,
    totalShippingCost,
    storeBreakdowns,
    bestOneStopStoreName,
    bestOneStopGrandTotal
  } = optimalSplit;

  const handleShareWhatsApp = () => {
    let message = `🛒 *SmartBasket IL 2026 - פיצול קנייה אופטימלי*\n`;
    message += `💰 *חיסכון כולל:* ₪${savingsNis.toFixed(2)} (${savingsPercent}%)\n`;
    message += `🏷️ *מחיר מוצרים נטו (ללא משלוח):* ₪${totalItemsCost.toFixed(2)}\n`;
    if (isShippingEnabled && totalShippingCost > 0) {
      message += `🚚 *דמי משלוח משוקללים:* ₪${totalShippingCost.toFixed(2)}\n`;
      message += `💳 *סה"כ כולל משלוח:* ₪${grandTotal.toFixed(2)}\n\n`;
    } else {
      message += `📍 *רכישה בסניפים / ללא משלוח*\n\n`;
    }

    storeBreakdowns.forEach((sb) => {
      const channelLabel = sb.store.type || '';
      message += `📍 *${sb.store.name}* (₪${sb.grandTotal.toFixed(2)} - ${channelLabel}):\n`;
      sb.items.forEach((item) => {
        message += ` • ${item.quantity}x ${item.name} - ₪${item.assignedLineTotal.toFixed(2)}\n`;
      });
      if (isShippingEnabled && sb.shipping > 0) {
        message += `   (דמי משלוח: ₪${sb.shipping.toFixed(2)})\n`;
      }
      message += `\n`;
    });

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="optimal-split-card" aria-label="כרטיס פיצול קנייה אופטימלי">
      <div className="split-header-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={22} className="text-emerald" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>פיצול קנייה אופטימלי</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="split-badge">
            <span>{storeBreakdowns.length} רשתות מומלצות</span>
          </span>
        </div>
      </div>

      {/* באנר חיסכון מקסימלי עם הצגה מפורשת של מחיר ללא משלוח */}
      <div className="savings-banner">
        <div className="savings-highlight">
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
            חיסכון מקסימלי לעומת {bestOneStopStoreName || 'רשת יחידה'}:
          </span>
          <div className="savings-amount">
            ₪{savingsNis.toFixed(2)}
          </div>
          <span className="savings-percent">
            חיסכון של {savingsPercent}% בסל הכולל!
          </span>
        </div>

        <div style={{ textAlign: 'left', minInlineSize: '130px' }}>
          <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
            מחיר רגיל ללא משלוח:
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#38bdf8' }}>
            ₪{totalItemsCost.toFixed(2)}
          </div>
          {isShippingEnabled ? (
            <div style={{ fontSize: '0.72rem', color: '#6ee7b7', marginBlockStart: '0.15rem' }}>
              {totalShippingCost > 0 ? `+ ₪${totalShippingCost.toFixed(2)} משלוח = ₪${grandTotal.toFixed(2)}` : 'משלוח חינם!'}
            </div>
          ) : (
            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              מחיר מדף / איסוף עצמי בסניף
            </div>
          )}
        </div>
      </div>

      {/* מתג מהיר למשלוח בתוך כרטיס הפיצול */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '0.5rem 0.85rem',
          marginBlockEnd: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#e2e8f0' }}>
          <Truck size={16} style={{ color: isShippingEnabled ? '#34d399' : '#94a3b8' }} />
          <span>אופציה לבחירת משלוח עד הבית (תעריפי 2026):</span>
        </div>
        <button
          onClick={() => setIsShippingEnabled(!isShippingEnabled)}
          style={{
            background: isShippingEnabled ? '#10b981' : 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            paddingInline: '0.75rem',
            paddingBlock: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {isShippingEnabled ? 'משלוח פעיל ✓' : 'הפעל שקלול משלוח'}
        </button>
      </div>

      {/* פירוט חלוקה לפי רשתות - כולל חברות סניפים פיזיים בלבד */}
      <div style={{ marginBlockEnd: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBlockEnd: '0.5rem' }}>
          חלוקת הקנייה המומלצת (כולל רשתות פיזיות ואונליין):
        </div>
        <div className="split-store-chips-grid">
          {storeBreakdowns.map((sb) => {
            const isPhysicalOnly = sb.store.type && sb.store.type.includes('סניפים בלבד');
            return (
              <div key={sb.storeKey} className="split-store-row">
                <div>
                  <div className="store-name-pill">
                    <span className="store-dot" style={{ backgroundColor: sb.store.color }}></span>
                    <span>{sb.store.name}</span>
                    {isPhysicalOnly && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#fca5a5',
                          paddingInline: '0.4rem',
                          paddingBlock: '0.1rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        סניף פיזי בלבד
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBlockStart: '0.2rem' }}>
                    {sb.items.map((it) => it.quantity + 'x ' + it.name).join(', ')}
                  </div>
                </div>
                <div style={{ textAlign: 'left', minInlineSize: '85px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#38bdf8' }}>
                    ₪{sb.subtotal.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {sb.items.length} {sb.items.length === 1 ? 'פריט' : 'פריטים'}
                    {isShippingEnabled && sb.shipping > 0 ? (
                      <span style={{ color: '#f59e0b', marginInlineStart: '0.25rem' }}>
                        (+₪{sb.shipping.toFixed(2)} משלוח)
                      </span>
                    ) : (
                      <span style={{ color: '#10b981', marginInlineStart: '0.25rem' }}>
                        (ללא משלוח)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* כרטיסיית פרוטוקול בדיקה בקופה */}
      <div
        className="checkout-protocol-banner"
        style={{
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '12px',
          padding: '0.85rem 1rem',
          marginBlockEnd: '1rem',
          color: '#fef3c7'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: '#f59e0b', fontSize: '0.85rem', marginBlockEnd: '0.35rem' }}>
          <ShieldAlert size={16} />
          <span>פרוטוקול בדיקה בקופה (חובה לפני יציאה מהסניף):</span>
        </div>
        <ul style={{ margin: 0, paddingInlineStart: '1.2rem', fontSize: '0.75rem', lineHeight: '1.6', color: '#fde68a' }}>
          <li>
            <strong>פתיחת אריזות מראות וזכוכית:</strong> חובה לפתוח ולבדוק מול הקופאי/ת שלמות של מראות, כוסות וקופסאות זכוכית עקב מדיניות <em>"אין אחריות על שבר לאחר יציאה מהחנות"</em> ברשתות הסטוק.
          </li>
          <li>
            <strong>בדיקת שקית ברגים ברהיטים:</strong> לוודא קיום שקית פרזול, רגליים והוראות הרכבה מלאות (ארונות נעליים, כוורות ושידות).
          </li>
          <li>
            <strong>שמירת קבלה מודפסת:</strong> לשמור קבלה פיזית / צילום קבלה ברור המאפשר החלפה תוך 14 יום.
          </li>
        </ul>
      </div>

      {/* כפתור שיתוף ב-WhatsApp */}
      <button className="action-share-btn" onClick={handleShareWhatsApp}>
        <Share2 size={18} />
        <span>שתף חלוקת סל אופטימלית ב-WhatsApp</span>
      </button>
    </div>
  );
}
