import React from 'react';
import { Store, Award, CheckCircle, AlertTriangle, Filter } from 'lucide-react';

export default function OneStopRankingTable({
  rankings,
  isShippingEnabled,
  sectorFilter,
  setSectorFilter
}) {
  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Store size={18} className="text-blue" />
          <span>קנייה מרוכזת (One-Stop Shop)</span>
        </h2>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
          השוואה בין כל הרשתות מהזולה ליקרה
        </span>
      </div>

      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBlockStart: '-0.5rem' }}>
        מציאת הרשת המשתלמת ביותר אם תרצו לרכוש את כל המוצרים ממקום אחד בלבד:
      </p>

      {/* מתג סינון סקטור רשתות: כל הרשתות / רק סופרמרקטים / רק רשתות סטוק */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBlockEnd: '0.5rem' }}>
        <button
          onClick={() => setSectorFilter('all')}
          style={{
            paddingInline: '0.75rem',
            paddingBlock: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: sectorFilter === 'all' ? '#2563eb' : '#cbd5e1',
            background: sectorFilter === 'all' ? '#2563eb' : '#f8fafc',
            color: sectorFilter === 'all' ? '#ffffff' : '#475569',
            cursor: 'pointer'
          }}
        >
          ✨ כל הרשתות (מזון + סטוק)
        </button>
        <button
          onClick={() => setSectorFilter('food')}
          style={{
            paddingInline: '0.75rem',
            paddingBlock: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: sectorFilter === 'food' ? '#059669' : '#cbd5e1',
            background: sectorFilter === 'food' ? '#059669' : '#f8fafc',
            color: sectorFilter === 'food' ? '#ffffff' : '#475569',
            cursor: 'pointer'
          }}
        >
          🍏 רשתות מזון וסופרמרקטים (שופרסל, רמי לוי, יוחננוף, קרפור, אושר עד, ויקטורי)
        </button>
        <button
          onClick={() => setSectorFilter('stock')}
          style={{
            paddingInline: '0.75rem',
            paddingBlock: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            borderRadius: '9999px',
            border: '1px solid',
            borderColor: sectorFilter === 'stock' ? '#e11d48' : '#cbd5e1',
            background: sectorFilter === 'stock' ? '#e11d48' : '#f8fafc',
            color: sectorFilter === 'stock' ? '#ffffff' : '#475569',
            cursor: 'pointer'
          }}
        >
          🍳 רשתות סטוק וכלי בית (מקס סטוק, הסטוק, מקס אונליין, סטוק אונליין)
        </button>
      </div>

      <div className="ranking-table-container">
        <table className="ranking-table" aria-label="טבלת דירוג חנות יחידה">
          <thead>
            <tr>
              <th style={{ inlineSize: '36px' }}>דירוג</th>
              <th>רשת קמעונאית</th>
              <th>סוג רשת</th>
              <th>סכום ביניים</th>
              <th>משלוח 2026</th>
              <th>סה״כ לתשלום</th>
              <th>כיסוי סל</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r, index) => {
              const rankClass =
                index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-other';

              const isFood = r.store.sector === 'food';

              return (
                <tr key={r.storeKey}>
                  <td>
                    <span className={`rank-badge ${rankClass}`}>{index + 1}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{r.store.name}</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{r.store.type}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        paddingInline: '0.45rem',
                        paddingBlock: '0.15rem',
                        borderRadius: '6px',
                        background: isFood ? '#ecfdf5' : '#fff1f2',
                        color: isFood ? '#047857' : '#be123c',
                        border: `1px solid ${isFood ? '#a7f3d0' : '#fecdd3'}`
                      }}
                    >
                      {r.store.sectorLabel}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>₪{r.subtotal.toFixed(2)}</span>
                  </td>
                  <td>
                    {!isShippingEnabled ? (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>לא שוקלל</span>
                    ) : r.shipping === 0 ? (
                      <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.75rem' }}>חינם!</span>
                    ) : (
                      <span style={{ color: '#d97706', fontWeight: 600 }}>₪{r.shipping.toFixed(2)}</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          color: index === 0 ? '#16a34a' : '#0f172a'
                        }}
                      >
                        ₪{r.grandTotal.toFixed(2)}
                      </span>
                      {index === 0 && (
                        <span style={{ fontSize: '0.65rem', color: '#16a34a', fontWeight: 700 }}>
                          הזול ביותר
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: r.coveragePercent === 100 ? '#16a34a' : '#e11d48',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem'
                        }}
                      >
                        {r.coveragePercent === 100 ? (
                          <CheckCircle size={12} />
                        ) : (
                          <AlertTriangle size={12} />
                        )}
                        {r.availableCount}/{r.totalItemsCount} ({r.coveragePercent}%)
                      </span>
                      <div className="coverage-bar-wrapper">
                        <div
                          className="coverage-bar-fill"
                          style={{
                            inlineSize: `${r.coveragePercent}%`,
                            backgroundColor: r.coveragePercent === 100 ? '#10b981' : '#f59e0b'
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
