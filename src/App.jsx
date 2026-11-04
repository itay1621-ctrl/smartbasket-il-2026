import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import OrganizedBasketView from './components/OrganizedBasketView';
import ProductCatalogBrowser from './components/ProductCatalogBrowser';
import ShippingToggle from './components/ShippingToggle';
import OptimalSplitCard from './components/OptimalSplitCard';
import GeoBranchSelector from './components/GeoBranchSelector';
import OneStopRankingTable from './components/OneStopRankingTable';
import ItemPriceBreakdownTable from './components/ItemPriceBreakdownTable';
import { INITIAL_USER_LIST, STORES_METADATA } from './data/mockStoresData';
import { DEFAULT_REGION_ID } from './data/regionsData';
import {
  parseShoppingList,
  calculateOptimalSplit,
  calculateOneStopRankings,
  setActiveCatalog
} from './utils/basketOptimizer';
import {
  ShoppingBag,
  BookOpen,
  BarChart3,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // קטלוג הסופרמרקטים המלא (1,000+ מוצרים) נטען מ-supermarket_catalog.json
  const [catalog, setCatalog] = useState([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  // טעינה וסנכרון רשימת הקניות מ-LocalStorage לתמיכת Offline PWA מלאה
  const [rawText, setRawText] = useState(() => {
    try {
      const saved = localStorage.getItem('smartbasket_user_list');
      return saved !== null && saved.trim() !== '' ? saved : INITIAL_USER_LIST;
    } catch {
      return INITIAL_USER_LIST;
    }
  });

  // ברירת מחדל: מחיר רגיל ללא משלוח (איסוף עצמי בסניף / מחירי מדף בחנויות)
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

  // ניווט טאבים ראשי: 'basket' (הסל שלי) | 'catalog' (קטלוג ומיון) | 'comparison' (השוואת מחירים)
  const [activeTab, setActiveTab] = useState('basket');

  // טעינת קטלוג הסופרמרקטים מ-public/data/supermarket_catalog.json עם עליית האפליקציה
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setIsLoadingCatalog(true);
      try {
        const res = await fetch('./data/supermarket_catalog.json');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setCatalog(data);
            setActiveCatalog(data);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch supermarket_catalog.json dynamically, fallback active:', err);
      } finally {
        if (isMounted) {
          setIsLoadingCatalog(false);
        }
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

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

  // עיבוד רשימת המוצרים בזמן אמת מול הקטלוג הפעיל
  const parsedItems = useMemo(() => {
    return parseShoppingList(rawText, catalog);
  }, [rawText, catalog]);

  // חישוב פיצול קנייה אופטימלי (2 רשתות)
  const optimalSplit = useMemo(() => {
    return calculateOptimalSplit(parsedItems, isShippingEnabled);
  }, [parsedItems, isShippingEnabled]);

  // מזהי הרשתות שנבחרו בסל המפוצל האופטימלי
  const optimalStoreKeys = useMemo(() => {
    if (!optimalSplit || !optimalSplit.storeBreakdowns) return [];
    return optimalSplit.storeBreakdowns.map((sb) => sb.storeKey);
  }, [optimalSplit]);

  // חישוב דירוג קנייה מרוכזת (חנות יחידה מתוך 7 הרשתות)
  const oneStopRankings = useMemo(() => {
    return calculateOneStopRankings(parsedItems, isShippingEnabled);
  }, [parsedItems, isShippingEnabled]);

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
            <span>קטלוג סופרמרקטים</span>
            <span className="tab-badge-pill neutral">
              {catalog.length > 0 ? `${catalog.length}+` : 'טוען...'}
            </span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'comparison'}
            className={`tab-nav-item ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            <BarChart3 size={17} />
            <span>השוואת מחירים (7 רשתות)</span>
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
            catalog={catalog}
          />
        )}

        {/* טאב 2: קטלוג ומיון מוצרים - מעל 1,000 מוצרי סופרמרקט אמיתיים */}
        {activeTab === 'catalog' && (
          <ProductCatalogBrowser
            rawText={rawText}
            setRawText={setRawText}
            parsedItems={parsedItems}
            onSwitchToBasket={() => setActiveTab('basket')}
            onSwitchToComparison={() => setActiveTab('comparison')}
            catalog={catalog}
          />
        )}

        {/* טאב 3: השוואת מחירים בין 7 רשתות המזון בישראל */}
        {activeTab === 'comparison' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {parsedItems.length > 0 ? (
              <>
                {/* כפתור חזרה מהיר לעריכת הסל */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
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
                    השוואת אמת בין 7 רשתות המזון בישראל
                  </span>
                </div>

                {/* מתג שקלול דמי משלוח 2026 (כבוי כברירת מחדל לתצוגת מחיר רגיל) */}
                <ShippingToggle
                  isShippingEnabled={isShippingEnabled}
                  setIsShippingEnabled={setIsShippingEnabled}
                />

                {/* כרטיס פיצול קנייה אופטימלי (2 רשתות) */}
                <OptimalSplitCard
                  optimalSplit={optimalSplit}
                  isShippingEnabled={isShippingEnabled}
                  setIsShippingEnabled={setIsShippingEnabled}
                />

                {/* דירוג 7 רשתות הסופרמרקט (One-Stop Shop) */}
                <OneStopRankingTable
                  rankings={oneStopRankings}
                  isShippingEnabled={isShippingEnabled}
                />

                {/* השוואה מפורטת פריט-אחר-פריט לכל מוצר שנבחר */}
                <ItemPriceBreakdownTable parsedItems={parsedItems} />

                {/* בורר סניפים פיזיים ואיסוף עצמי */}
                <GeoBranchSelector
                  selectedRegionId={selectedRegionId}
                  onSelectRegion={setSelectedRegionId}
                  optimalStoreKeys={optimalStoreKeys}
                />
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
                  מעבר לקטלוג 1,000+ המוצרים לבחירה 📦
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
            <strong>SmartBasket IL 2026</strong> • משווה מחירי הסופרמרקטים הרשמי בישראל
          </div>
          <div>
            השוואת מחירים בין 7 רשתות המזון המובילות: <strong>רמי לוי שיווק השקמה, אושר עד, יוחננוף, שופרסל דיל, קרפור היפר, ויקטורי, וחצי חינם</strong>.
          </div>
          <div>
            מחירים רגילים בחנויות מוצגים כברירת מחדל ללא משלוח. תעריפי המשלוח לשנת 2026 ניתנים להפעלה בלחיצת כפתור.
          </div>
        </footer>
      </main>
    </div>
  );
}
