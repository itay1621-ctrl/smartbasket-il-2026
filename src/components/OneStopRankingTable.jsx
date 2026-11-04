import React from 'react';
import { Store } from 'lucide-react';

export default function OneStopRankingTable({ rankings, isShippingEnabled }) {
  if (!rankings || rankings.length === 0) return null;

  const bestStore = rankings[0];
  const mostExpensive = rankings[rankings.length - 1];
  const maxSavings = bestStore && mostExpensive ? Math.max(0, mostExpensive.grandTotal - bestStore.grandTotal) : 0;
  const maxSavingsPercent = mostExpensive && mostExpensive.grandTotal > 0
    ? Math.round((maxSavings / mostExpensive.grandTotal) * 100)
    : 0;

  return (
    <div className="card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
            <Store size={18} className="text-blue" />
            <span>דירוג 7 רשתות הסופרמרקט (One-Stop Shop)</span>
          </h2>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            השוואת מחיר הסל המלא ברכישה מרוכזת מרשת אחת בלבד
          </span>
        </div>

        {maxSavings > 0 && (
          <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.35rem 0.75rem', borderRadius: '10px', fontSize: '0.8rem', color: '#065f46', fontWeight: 700 }}>
            🎉 חיסכון של ₪{maxSavings.toFixed(2)} ({maxSavingsPercent}%) בין {bestStore.store.shortName} ל{mostExpensive.store.shortName}!
          </div>
        )}
      </div>

      <div className="ranking-table-container">
        <table className="ranking-table" aria-label="טבלת דירוג 7 רשתות הסופרמרקטים">
          <thead>
            <tr>
              <th style={{ inlineSize: '40px', textAlign: 'center' }}>דירוג</th>
              <th>רשת סופרמרקט</th>
              <th>סוג ערוץ</th>
              <th>סכום מוצרים</th>
              <th>משלוח 2026</th>
              <th>סה״כ לתשלום</th>
              <th>כיסוי סל</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r, index) => {
              const isBest = index === 0;
              const rankClass = isBest ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-other';

              return (
                <tr
                  key={r.storeKey}
                  className={rankClass}
                  style={{
                    background: isBest ? '#f0fdf4' : index % 2 === 0 ? '#ffffff' : '#f8fafc',
                    fontWeight: isBest ? 700 : 400
                  }}
                >
                  <td style={{ textAlign: 'center' }}>
                    {isBest ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#eab308', color: '#ffffff', width: '26px', height: '26px', borderRadius: '9999px', fontWeight: 900, fontSize: '0.85rem' }}>
                        1
                      </span>
                    ) : (
                      <span style={{ color: '#64748b', fontWeight: 700 }}>{index + 1}</span>
                    )}
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '9999px',
                          background: r.store.color || '#2563eb'
                        }}
                      />
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{r.store.name}</span>
                      {isBest && (
                        <span style={{ fontSize: '0.68rem', background: '#22c55e', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '9999px', fontWeight: 800 }}>
                          המשתלם ביותר!
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.75rem', color: '#475569', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      {r.store.type}
                    </span>
                  </td>

                  <td style={{ fontWeight: 700 }}>
                    ₪{r.subtotal.toFixed(2)}
                  </td>

                  <td>
                    {isShippingEnabled ? (
                      r.storeKey === 'osher_ad' ? (
                        <span style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 700 }}>
                          סניף פיזי בלבד (₪0)
                        </span>
                      ) : r.shipping === 0 ? (
                        <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.8rem' }}>
                          חינם!
                        </span>
                      ) : (
                        <span style={{ color: '#475569', fontWeight: 600 }}>
                          ₪{r.shipping.toFixed(2)}
                        </span>
                      )
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                        ₪0 (מדף / איסוף)
                      </span>
                    )}
                  </td>

                  <td>
                    <span style={{ fontSize: '1.05rem', fontWeight: 900, color: isBest ? '#15803d' : '#0f172a' }}>
                      ₪{r.grandTotal.toFixed(2)}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <div style={{ width: '45px', height: '6px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${r.coveragePercent}%`, height: '100%', background: r.coveragePercent === 100 ? '#22c55e' : '#f59e0b' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: r.coveragePercent === 100 ? '#15803d' : '#d97706' }}>
                        {r.coveragePercent}% ({r.availableCount}/{r.totalItemsCount})
                      </span>
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
