import React, { useState } from 'react';
import { Truck, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData';

export default function ShippingToggle({ isShippingEnabled, setIsShippingEnabled }) {
  const [showRatesDetails, setShowRatesDetails] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div className="shipping-toggle-card">
        <div className="shipping-info">
          <div className="shipping-title">
            <Truck size={20} />
            <span>שקלל דמי משלוח עד הבית לפי תעריפי 2026</span>
          </div>
          <p className="shipping-desc">
            משקלל רפי פטור ממשלוח (חינם מעל ₪299/₪350), תעריף פריטים במקס אונליין ומשלוחי בסיס קבועים
          </p>
        </div>

        <label className="switch" title="הפעל או כבה שקלול משלוחים">
          <input
            type="checkbox"
            checked={isShippingEnabled}
            onChange={(e) => setIsShippingEnabled(e.target.checked)}
            aria-label="שקלל דמי משלוח לפי תעריפי 2026"
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* כפתור פתיחת פירוט תעריפי משלוח 2026 */}
      <button
        onClick={() => setShowRatesDetails(!showRatesDetails)}
        style={{
          background: 'none',
          border: 'none',
          color: '#64748b',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          alignSelf: 'flex-start',
          cursor: 'pointer',
          paddingInline: '0.5rem'
        }}
      >
        <Info size={13} />
        <span>פירוט תעריפי ומדיניות משלוחים 2026</span>
        {showRatesDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {showRatesDetails && (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '0.85rem 1rem',
            fontSize: '0.78rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            color: '#334155'
          }}
        >
          <div style={{ fontWeight: 700, color: '#0f172a', marginBlockEnd: '0.35rem' }}>
            מחירון ומדיניות משלוחים מעודכנים לשנת 2026:
          </div>
          {Object.values(STORES_METADATA).map((s) => (
            <div
              key={s.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.25rem',
                paddingBlock: '0.3rem',
                borderBlockEnd: '1px solid #f1f5f9'
              }}
            >
              <span style={{ fontWeight: 600 }}>{s.name}:</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>{s.deliveryNote}</span>
            </div>
          ))}
          <div style={{ fontSize: '0.73rem', color: '#64748b', marginBlockStart: '0.3rem' }}>
            💡 <strong>סניפים פיזיים:</strong> איסוף עצמי בחנויות (מקס סטוק, רמי לוי סטוק רמלוד/פרדס חנה, הסטוק) הנו ₪0.
          </div>
        </div>
      )}
    </div>
  );
}
