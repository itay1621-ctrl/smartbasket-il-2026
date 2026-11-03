import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MasterProductCatalog from './components/MasterProductCatalog';
import ShoppingListInput from './components/ShoppingListInput';
import ShippingToggle from './components/ShippingToggle';
import OptimalSplitCard from './components/OptimalSplitCard';
import GeoBranchSelector from './components/GeoBranchSelector';
import OneStopRankingTable from './components/OneStopRankingTable';
import ItemPriceBreakdownTable from './components/ItemPriceBreakdownTable';
import { INITIAL_USER_LIST } from './data/mockStoresData';
import { DEFAULT_REGION_ID } from './data/regionsData';
import {
  parseShoppingList,
  calculateOptimalSplit,
  calculateOneStopRankings
} from './utils/basketOptimizer';

export default function App() {
  const [rawText, setRawText] = useState(INITIAL_USER_LIST);
  // ברירת מחדל: מחיר רגיל ללא משלוח (איסוף עצמי / מחירי מדף בחנויות)
  const [isShippingEnabled, setIsShippingEnabled] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState(DEFAULT_REGION_ID);
  // סינון סקטור רשתות: כל הרשתות, רק מזון וסופרמרקטים, או רק רשתות סטוק
  const [sectorFilter, setSectorFilter] = useState('all');

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

      <main className="app-container">
        {/* קטלוג כל המוצרים המלא וסלים מוכנים מראש לבחירה (סל מעבר דירה 27 מוצרים, סל סופר 8 מוצרים) */}
        <MasterProductCatalog
          rawText={rawText}
          setRawText={setRawText}
          parsedItems={parsedItems}
        />

        {/* שלב 1: אזור הזנת רשימת הקניות החכמה + צ'יפים של קטגוריות */}
        <ShoppingListInput
          rawText={rawText}
          setRawText={setRawText}
          parsedCount={parsedItems.length}
        />

        {/* שלב 2: מתג שקלול דמי משלוח 2026 (כבוי כברירת מחדל לתצוגת מחיר רגיל) */}
        <ShippingToggle
          isShippingEnabled={isShippingEnabled}
          setIsShippingEnabled={setIsShippingEnabled}
        />

        {/* שלב 3: לוח השוואה (Comparison Dashboard) */}
        {parsedItems.length > 0 ? (
          <>
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
            <div style={{ fontSize: '2.5rem', marginBlockEnd: '0.75rem' }}>🛒</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
              רשימת הקניות שלכם ריקה
            </div>
            <p style={{ fontSize: '0.85rem', marginBlockStart: '0.25rem' }}>
              פתחו את "קטלוג כל המוצרים" למעלה לבחירת פריטים או לחצו על סל מוכן מראש.
            </p>
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
