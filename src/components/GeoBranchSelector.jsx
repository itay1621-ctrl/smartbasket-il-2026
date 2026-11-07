import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { REGIONS_DATA, getRegionById } from '../data/regionsData';

export default function GeoBranchSelector({
  selectedRegionId = 'modiin_shfela',
  onSelectRegion,
  optimalStoreKeys = []
}) {
  const [filterOnlyOptimal, setFilterOnlyOptimal] = useState(true);
  const [expandedHoursId, setExpandedHoursId] = useState(null);

  const currentRegion = getRegionById(selectedRegionId);

  // בדיקה האם רשת של סניף נכללת ברשתות של הסל המפוצל
  const isBranchInOptimal = (branch) => {
    if (!optimalStoreKeys || optimalStoreKeys.length === 0) return true;
    return optimalStoreKeys.includes(branch.chain);
  };

  // סינון סניפים להצגה
  const branchesToDisplay = currentRegion.branches.filter((branch) => {
    if (!filterOnlyOptimal || optimalStoreKeys.length === 0) return true;
    return isBranchInOptimal(branch);
  });

  const toggleHours = (branchId) => {
    setExpandedHoursId((prev) => (prev === branchId ? null : branchId));
  };

  return (
    <div className="card" style={{ gap: '1.25rem' }} aria-label="בורר אזור וסניפים פיזיים">
      {/* כותרת אזור גיאוגרפי */}
      <div className="card-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <div className="card-title" style={{ fontSize: '1.05rem' }}>
            <MapPin size={20} className="text-primary" />
            <span>סניפים פיזיים ואיסוף עצמי (₪0 משלוח)</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginBlockStart: '0.2rem' }}>
            בחרו את האזור שלכם לצפייה בסניפים הקרובים לפיצול האופטימלי, כולל שעות פתיחה וניווט Waze ישיר
          </p>
        </div>
      </div>

      {/* בורר 3 אזורים גיאוגרפיים מרכזיים */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.5rem'
        }}
      >
        {REGIONS_DATA.map((region) => {
          const isSelected = region.id === selectedRegionId;
          return (
            <button
              key={region.id}
              onClick={() => onSelectRegion && onSelectRegion(region.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 0.85rem',
                borderRadius: '12px',
                border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                color: isSelected ? '#1d4ed8' : '#334155',
                cursor: 'pointer',
                textAlign: 'right',
                fontWeight: isSelected ? 700 : 500,
                transition: 'all 0.15s ease',
                boxShadow: isSelected ? '0 2px 8px rgba(37, 99, 235, 0.15)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{region.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', lineHeight: 1.2 }}>{region.name}</span>
                <span style={{ fontSize: '0.7rem', color: isSelected ? '#2563eb' : '#94a3b8' }}>
                  {region.branches.length} סניפים באזור
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* כפתורי סינון (סניפי הסל המומלצים מול כל הסניפים) */}
      {optimalStoreKeys && optimalStoreKeys.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            paddingBlock: '0.25rem',
            borderBlockStart: '1px solid #f1f5f9',
            paddingBlockStart: '0.75rem'
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>
            סניפים זמינים ב{currentRegion.name}:
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => setFilterOnlyOptimal(true)}
              style={{
                fontSize: '0.72rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: filterOnlyOptimal ? '#dbeafe' : '#f1f5f9',
                color: filterOnlyOptimal ? '#1d4ed8' : '#64748b'
              }}
            >
              <Sparkles size={12} />
              <span>לפי הסל המפוצל ({currentRegion.branches.filter(isBranchInOptimal).length})</span>
            </button>
            <button
              onClick={() => setFilterOnlyOptimal(false)}
              style={{
                fontSize: '0.72rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                backgroundColor: !filterOnlyOptimal ? '#dbeafe' : '#f1f5f9',
                color: !filterOnlyOptimal ? '#1d4ed8' : '#64748b'
              }}
            >
              <span>כל הסניפים ({currentRegion.branches.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* רשימת כרטיסיות סניפים */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.85rem'
        }}
      >
        {branchesToDisplay.length > 0 ? (
          branchesToDisplay.map((branch) => {
            const inOptimal = isBranchInOptimal(branch);
            const isHoursExpanded = expandedHoursId === branch.id;

            return (
              <div
                key={branch.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: inOptimal ? '1.5px solid #93c5fd' : '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  boxShadow: inOptimal ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* תגית הסל המפוצל אם רלוונטי */}
                {inOptimal && optimalStoreKeys.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      insetBlockStart: '0',
                      insetInlineEnd: '0',
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderBottomLeftRadius: '10px'
                    }}
                  >
                    מומלץ לסל שלך ✨
                  </div>
                )}

                <div>
                  {/* שם סניף ותגית רשת */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBlockEnd: '0.35rem' }}>
                    <span
                      style={{
                        backgroundColor: branch.chainColor,
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '6px'
                      }}
                    >
                      {branch.chainName}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{branch.city}</span>
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                    {branch.name}
                  </h3>

                  {/* כתובת */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.35rem',
                      fontSize: '0.78rem',
                      color: '#475569',
                      marginBlockStart: '0.4rem'
                    }}
                  >
                    <MapPin size={14} style={{ color: '#64748b', flexShrink: 0, marginTop: '2px' }} />
                    <span>{branch.address}</span>
                  </div>

                  {/* הערת סניף (אם יש) */}
                  {branch.notes && (
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: '#059669',
                        marginBlockStart: '0.35rem',
                        backgroundColor: '#f0fdf4',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #dcfce7'
                      }}
                    >
                      {branch.notes}
                    </div>
                  )}

                  {/* שעות פתיחה */}
                  <div style={{ marginBlockStart: '0.5rem' }}>
                    <button
                      onClick={() => toggleHours(branch.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        color: '#2563eb',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Clock size={13} />
                      <span>שעות פתיחה</span>
                      {isHoursExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    {isHoursExpanded ? (
                      <div
                        style={{
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '0.6rem',
                          marginBlockStart: '0.35rem',
                          fontSize: '0.75rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          color: '#334155'
                        }}
                      >
                        {branch.hours ? (
                          <>
                            <div><strong>א׳-ה׳:</strong> {branch.hours.weekdays}</div>
                            <div><strong>ו׳ וערבי חג:</strong> {branch.hours.friday}</div>
                            <div><strong>מוצ"ש:</strong> {branch.hours.saturday}</div>
                          </>
                        ) : (
                          (branch.hoursDisplay || '').split('|').map((part, pIdx) => (
                            <div key={pIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span>•</span>
                              <span>{part.trim()}</span>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.72rem', color: '#64748b', marginBlockStart: '0.15rem' }}>
                        {branch.hoursDisplay}
                      </div>
                    )}
                  </div>

                  {/* טלפון */}
                  {branch.phone && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginBlockStart: '0.35rem'
                      }}
                    >
                      <Phone size={13} />
                      <a
                        href={`tel:${branch.phone}`}
                        style={{ color: '#475569', textDecoration: 'none', direction: 'ltr' }}
                      >
                        {branch.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* כפתור ניווט ב-Waze */}
                <a
                  href={branch.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '10px',
                    boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
                    transition: 'transform 0.15s ease',
                    marginBlockStart: '0.5rem'
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
                  onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Navigation size={15} />
                  <span>ניווט ב-Waze לסניף</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            );
          })
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '1.5rem',
              color: '#64748b',
              fontSize: '0.85rem'
            }}
          >
            לא נמצאו סניפים התואמים את הסינון. לחצו על "כל הסניפים" לצפייה בכל סניפי האזור.
          </div>
        )}
      </div>
    </div>
  );
}
