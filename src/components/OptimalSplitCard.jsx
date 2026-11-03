import React from 'react';
import { Sparkles, TrendingDown, Share2, Check, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function OptimalSplitCard({ optimalSplit, isShippingEnabled }) {
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
    message += `💳 *סה"כ לתשלום:* ₪${grandTotal.toFixed(2)}\n\n`;

    storeBreakdowns.forEach((sb) => {
      message += `📍 *${sb.store.name}* (₪${sb.grandTotal.toFixed(2)}):\n`;
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
        <span className="split-badge">
          <span>{storeBreakdowns.length} רשתות</span>
        </span>
      </div>

      {/* באנר חיסכון מקסימלי */}
      <div className="savings-banner">
        <div className="savings-highlight">
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
            חיסכון מקסימלי לעומת {bestOneStopStoreName || 'חנות יחידה'}:
          </span>
          <div className="savings-amount">
            ₪{savingsNis.toFixed(2)}
          </div>
          <span className="savings-percent">
            חיסכון של {savingsPercent}% בסל הכולל!
          </span>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>סל מפוצל:</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            ₪{grandTotal.toFixed(2)}
          </div>
          {isShippingEnabled && (
            <div style={{ fontSize: '0.7rem', color: '#6ee7b7' }}>
              {totalShippingCost > 0 ? `כולל ₪${totalShippingCost.toFixed(2)} משלוח` : 'משלוח חינם!'}
            </div>
          )}
        </div>
      </div>

      {/* פירוט חלוקה לפי רשתות */}
      <div style={{ marginBlockEnd: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBlockEnd: '0.5rem' }}>
          חלוקת הקנייה המומלצת לחסכון מקסימלי:
        </div>
        <div className="split-store-chips-grid">
          {storeBreakdowns.map((sb) => (
            <div key={sb.storeKey} className="split-store-row">
              <div>
                <div className="store-name-pill">
                  <span className="store-dot" style={{ backgroundColor: sb.store.color }}></span>
                  <span>{sb.store.name}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBlockStart: '0.2rem' }}>
                  {sb.items.map((it) => it.quantity + 'x ' + it.name).join(', ')}
                </div>
              </div>
              <div style={{ textAlign: 'left', minInlineSize: '75px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#38bdf8' }}>
                  ₪{sb.grandTotal.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                  {sb.items.length} {sb.items.length === 1 ? 'פריט' : 'פריטים'}
                  {isShippingEnabled && sb.shipping > 0 && ` + משלוח`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* כרטיסיית אזהרה מודגשת: פרוטוקול בדיקה בקופה */}
      <div
        className="checkout-protocol-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(180, 83, 9, 0.22) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.45)',
          borderRadius: '16px',
          padding: '1rem',
          marginBlockEnd: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} style={{ color: '#fbbf24', flexShrink: 0 }} />
          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fef3c7' }}>
            פרוטוקול בדיקה בקופה (חובה בעת רכישה פיזית)
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.78rem', color: '#fde68a', lineHeight: 1.5 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
            <span style={{ flexShrink: 0, fontSize: '0.95rem' }}>⚠️</span>
            <span>
              <strong style={{ color: '#ffffff' }}>פתיחת אריזות מראות וזכוכית:</strong> יש לפתוח מול הקופאי/ת ולבדוק שלמות לפני יציאה מהחנות עקב מדיניות "אין אחריות על שבר" במקס סטוק.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
            <span style={{ flexShrink: 0, fontSize: '0.95rem' }}>🔩</span>
            <span>
              <strong style={{ color: '#ffffff' }}>בדיקת שקית ברגים ברהיטים:</strong> לוודא קיום שקית פרזול מלאה, הוראות הרכבה וברגים לפני עזיבת הסניף.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
            <span style={{ flexShrink: 0, fontSize: '0.95rem' }}>🧾</span>
            <span>
              <strong style={{ color: '#ffffff' }}>שמירת קבלה מודפסת:</strong> לשמור קבלה פיזית / צילום קבלה ברור עבור החלפה או החזרה תוך 14 יום.
            </span>
          </div>
        </div>
      </div>

      {/* כפתור שיתוף ב-WhatsApp */}
      <button className="action-share-btn" onClick={handleShareWhatsApp}>
        <Share2 size={18} />
        <span>שתף חלוקת סל אופטימלית ב-WhatsApp</span>
      </button>
    </div>
  );
}
