import React from 'react';
import { Sparkles, Share2, Store } from 'lucide-react';

export default function OptimalSplitCard({ optimalSplit, isShippingEnabled, setIsShippingEnabled }) {
  if (!optimalSplit || !optimalSplit.storeBreakdowns || optimalSplit.storeBreakdowns.length === 0) {
    return null;
  }

  const {
    savingsNis,
    savingsPercent,
    savingsVsHighest,
    savingsVsHighestPercent,
    grandTotal,
    totalItemsCost,
    totalShippingCost,
    storeBreakdowns,
    bestOneStopStoreName,
    bestOneStopGrandTotal,
    mostExpensiveStoreName
  } = optimalSplit;

  const handleShareWhatsApp = () => {
    let message = `🛒 *SmartBasket IL 2026 - פיצול קנייה אופטימלי בסופרמרקט*\n`;
    message += `💰 *חיסכון מול רשת יחידה:* ₪${savingsNis.toFixed(2)} (${savingsPercent}%)\n`;
    message += `🏷️ *עלות מוצרים נטו (ללא משלוח):* ₪${totalItemsCost.toFixed(2)}\n`;
    if (isShippingEnabled && totalShippingCost > 0) {
      message += `🚚 *דמי משלוח 2026:* ₪${totalShippingCost.toFixed(2)}\n`;
      message += `💳 *סה"כ כולל משלוח:* ₪${grandTotal.toFixed(2)}\n\n`;
    } else {
      message += `📍 *רכישה בסניפים / מחירי מדף*\n\n`;
    }

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
      <div className="split-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={22} className="text-emerald" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>פיצול קנייה אופטימלי (2 רשתות)</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="split-badge" style={{ background: '#059669', color: '#ffffff', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>
            {storeBreakdowns.length} רשתות מנצחות
          </span>
          <button
            onClick={handleShareWhatsApp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#25D366',
              color: '#ffffff',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.3rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Share2 size={14} />
            <span>שיתוף בוואטסאפ</span>
          </button>
        </div>
      </div>

      {/* באנר חיסכון מקסימלי עם הצגת מחיר רגיל ללא משלוח */}
      <div className="savings-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1rem', marginBlockEnd: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
            חיסכון בפיצול לעומת {bestOneStopStoreName || 'רשת יחידה'}:
          </span>
          <div className="savings-amount" style={{ fontSize: '1.75rem', fontWeight: 900, color: '#4ade80' }}>
            ₪{savingsNis.toFixed(2)}
          </div>
          <span className="savings-percent" style={{ fontSize: '0.82rem', color: '#86efac', fontWeight: 700 }}>
            חיסכון של {savingsPercent}% בסל הכולל!
          </span>
          {savingsVsHighest > savingsNis && (
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBlockStart: '0.2rem' }}>
              חיסכון של <strong>₪{savingsVsHighest.toFixed(2)} ({savingsVsHighestPercent}%)</strong> לעומת {mostExpensiveStoreName}!
            </div>
          )}
        </div>

        <div style={{ textAlign: 'left', minInlineSize: '140px' }}>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
            מחיר מוצרים (ללא משלוח):
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#38bdf8' }}>
            ₪{totalItemsCost.toFixed(2)}
          </div>
          {isShippingEnabled ? (
            <div style={{ fontSize: '0.78rem', color: '#6ee7b7', marginBlockStart: '0.15rem' }}>
              {totalShippingCost > 0 ? `+ ₪${totalShippingCost.toFixed(2)} משלוח = ₪${grandTotal.toFixed(2)}` : 'משלוח חינם!'}
            </div>
          ) : (
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              מחירי מדף בסניף (איסוף ₪0)
            </div>
          )}
        </div>
      </div>

      {/* פירוט הרשתות והמוצרים שהוקצו לכל רשת */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
        {storeBreakdowns.map((sb) => (
          <div
            key={sb.storeKey}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Store size={16} style={{ color: sb.store.color || '#38bdf8' }} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>{sb.store.name}</span>
              </div>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.15)', padding: '0.15rem 0.45rem', borderRadius: '6px', color: '#e2e8f0' }}>
                {sb.items.length} מוצרים
              </span>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBlockEnd: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>סכום מוצרים: ₪{sb.subtotal.toFixed(2)}</span>
              {isShippingEnabled && (
                <span>משלוח: ₪{sb.shipping.toFixed(2)}</span>
              )}
            </div>

            <div style={{ maxHeight: '160px', overflowY: 'auto', fontSize: '0.78rem', color: '#cbd5e1', paddingInlineEnd: '0.25rem' }}>
              {sb.items.map((it) => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBlock: '0.2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span>{it.quantity}x {it.name}</span>
                  <span style={{ fontWeight: 700, color: '#4ade80' }}>₪{it.assignedLineTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
