import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import OrganizedBasketView from './components/OrganizedBasketView';
import ProductCatalogBrowser from './components/ProductCatalogBrowser';
import ShippingToggle from './components/ShippingToggle';
import OptimalSplitCard from './components/OptimalSplitCard';
import GeoBranchSelector from './components/GeoBranchSelector';
import OneStopRankingTable from './components/OneStopRankingTable';
import ItemPriceBreakdownTable from './components/ItemPriceBreakdownTable';
import { INITIAL_USER_LIST, CATALOG_PRODUCTS } from './data/mockStoresData';
import { DEFAULT_REGION_ID } from './data/regionsData';
import {
  parseShoppingList,
  calculateOptimalSplit,
  calculateOneStopRankings
} from './utils/basketOptimizer';
import {
  ShoppingBag,
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  // טעינה וסנכרון רשימת הקניות מ-LocalStorage לתמיכת Offline PWA מלאה
  const [rawText, setRawText] = useState(() => {
    try {
      const saved = localStorage.getItem('smartbasket_user_list');
      return saved !== null && saved.trim() !== '' ? saved : INITIAL_USER_LIST;
    } catch {
      return INITIAL_USER_LIST;
    }
  });

  // ברירת מחדל: מחיר רגיל ללא משלוח (איסוף עצמי / מחירי מדף בחנויות)
  const [isShippingEnabled, setIsShippingEnabled] = useState(() => {
    try {
      return localStorage.getItem('smartbasket_shipping_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const [selectedRegionId, setSelectedRegionId] = useState(() => {
    try {
      return localStorage.getItem('smartbasket_region') || DEFAULT_REGION_ID;
    } catch {
      return DEFAULT_REGION_ID;
    }
  });

  // סינון סקטור רשתות: כל הרשתות, רק מזון וסופרמרקטים, או רק רשתות סטוק
  const [sectorFilter, setSectorFilter] = useState('all');

  // ניווט טאבים ראשי: 'basket' (הסל שלי) | 'catalog' (קטלוג ומיון) | 'comparison' (השוואת מחירים)
  const [activeTab, setActiveTab] = useState('basket');

  // שמירה מתמשכת ל-LocalStorage בכל עדכון
  useEffect(() => {
    try {
      localStorage.setItem('smartbasket_user_list', rawText);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [rawText]);

  useEffect(() => {
    try {
      localStorage.setItem('smartbasket_shipping_enabled', String(isShippingEnabled));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [isShippingEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('smartbasket_region', selectedRegionId);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [selectedRegionId]);

  // עיבוד רשימת המוצרים בזמן אמת
  const parsedItems = useMemo(() => {
    return parseShoppingList(rawText);
  }, [rawText]);

  // חישוב פיצול קנייה אופטימלי
  const optimalSplit = useMemo(() => {
    return calculateOptimalSplit(parsedItems, isShippingEnabled, sectorFilter);
  }, [parsedItems, isShippingEnabled, sectorFilter]);

  // מזהי הרשתות שנבחרו בסל המפוצל האופטימלי
  const optimalStoreKeys = useMemo(() => {
    if (!optimalSplit || !optimalSplit.storeBreakdowns) return [];
    return optimalSplit.storeBreakdowns.map((sb) => sb.storeKey);
  }, [optimalSplit]);

  // חישוב דירוג קנייה מרוכזת (חנות יחידה)
  const oneStopRankings = useMemo(() => {
    return calculateOneStopRankings(parsedItems, isShippingEnabled, sectorFilter);
  }, [parsedItems, isShippingEnabled, sectorFilter]);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* סרגל טאבים ראשי מודרני ונעוץ בראש הדף */}
      <div className="tab-nav-wrapper">
        <div className="tab-nav-container" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'basket'}
            className={`tab-nav-item ${activeTab === 'basket' ? 'active' : ''}`}
            onClick={() => setActiveTab('basket')}
          >
            <ShoppingBag size={17} />
            <span>הסל שלי</span>
            {parsedItems.length > 0 && (
              <span className="tab-badge-pill primary">
                {parsedItems.length}
              </span>
            )}
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'catalog'}
            className={`tab-nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <BookOpen size={17} />
            <span>קטלוג ומיון</span>
            <span className="tab-badge-pill neutral">
              {CATALOG_PRODUCTS.length}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'comparison'}
            className={`tab-nav-item ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            <BarChart3 size={17} />
            <span>השוואת מחירים</span>
            {optimalSplit && optimalSplit.savingsVsSingle > 5 && (
              <span className="tab-badge-pill savings">
                חסוך ₪{Math.round(optimalSplit.savingsVsSingle)}
              </span>
            )}
          </button>
        </div>
      </div>

      <main className="app-container">
        {/* טאב 1: הסל שלי - רשימה מסודרת ונוחה */}
        {activeTab === 'basket' && (
          <OrganizedBasketView
            rawText={rawText}
            setRawText={setRawText}
            parsedItems={parsedItems}
            onSwitchToCatalog={() => setActiveTab('catalog')}
            onSwitchToComparison={() => setActiveTab('comparison')}
            optimalSplit={optimalSplit}
          />
        )}

        {/* טאב 2: קטלוג ומיון מוצרים - בחירה קלה מתוך 345 מוצרים עם מיון מלא */}
        {activeTab === 'catalog' && (
          <ProductCatalogBrowser
            rawText={rawText}
            setRawText={setRawText}
            parsedItems={parsedItems}
            onSwitchToBasket={() => setActiveTab('basket')}
            onSwitchToComparison={() => setActiveTab('comparison')}
          />
        )}

        {/* טאב 3: השוואת מחירים, פיצול אופטימלי ורשתות */}
        {activeTab === 'comparison' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {parsedItems.length > 0 ? (
              <>
                {/* כפתור חזרה מהיר לעריכת הסל */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => setActiveTab('basket')}
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '10px'
                    }}
                  >
                    <ArrowRight size={15} />
                    <span>חזרה לעריכת הסל ({parsedItems.length} פריטים)</span>
                  </button>

                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                    השוואת אמת בין 10 רשתות מזון וסטוק
                  </span>
                </div>

                {/* מתג שקלול דמי משלוח 2026 (כבוי כברירת מחדל לתצוגת מחיר רגיל) */}
                <ShippingToggle
                  isShippingEnabled={isShippingEnabled}
                  setIsShippingEnabled={setIsShippingEnabled}
                />

                {/* כרטיס פיצול קנייה אופטימלי עם הדגשת מחיר רגיל ללא משלוח ואופציית משלוח */}
                <OptimalSplitCard
                  optimalSplit={optimalSplit}
                  isShippingEnabled={isShippingEnabled}
                  setIsShippingEnabled={setIsShippingEnabled}
                />

                {/* בורר אזור גיאוגרפי וכרטיסיות סניפים קרובים (סופרמרקטים + סטוק פיזי) */}
                <GeoBranchSelector
                  selectedRegionId={selectedRegionId}
                  onSelectRegion={setSelectedRegionId}
                  optimalStoreKeys={optimalStoreKeys}
                />

                {/* טבלת דירוג חנות יחידה עם מתג סינון: מזון, סטוק או הכל */}
                <OneStopRankingTable
                  rankings={oneStopRankings}
                  isShippingEnabled={isShippingEnabled}
                  sectorFilter={sectorFilter}
                  setSectorFilter={setSectorFilter}
                />

                {/* טבלה מתקפלת להשוואת פריט-אחר-פריט בין כל 10 הרשתות (כולל רשתות פיזיות) */}
                <ItemPriceBreakdownTable parsedItems={parsedItems} />
              </>
            ) : (
              <div
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  color: '#64748b'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBlockEnd: '0.75rem' }}>📊</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
                  אין מוצרים להשוואה
                </div>
                <p style={{ fontSize: '0.85rem', marginBlockStart: '0.25rem', marginBlockEnd: '1.25rem' }}>
                  הוסיפו מוצרים מתוך הקטלוג או הסל כדי לראות את השוואת המחירים והחיסכון.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="btn btn-primary"
                  style={{ borderRadius: '12px', padding: '0.6rem 1.25rem' }}
                >
                  מעבר לקטלוג המוצרים לבחירה 📦
                </button>
              </div>
            )}
          </div>
        )}

        {/* הערות שקיפות ומתודולוגיה לשנת 2026 */}
        <footer
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#94a3b8',
            marginBlockStart: '1.5rem',
            lineHeight: 1.6
          }}
        >
          <div>
            <strong>SmartBasket IL 2026</strong> • משווה הסלים והסטוק החכם בישראל
          </div>
          <div>
            השוואת מחירים רוחבית: <strong>רשתות מזון</strong> (שופרסל, יוחננוף, רמי לוי, קרפור, אושר עד, ויקטורי) לצד <strong>רשתות סטוק וכלי בית</strong> (מקס סטוק, הסטוק, מקס אונליין, סטוק אונליין).
          </div>
          <div>
            מחירים רגילים בחנויות מוצגים כברירת מחדל. תעריפי המשלוח לשנת 2026 ניתנים להפעלה בלחיצת כפתור.
          </div>
        </footer>
      </main>
    </div>
  );
}
