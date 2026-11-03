import React, { useState, useMemo } from 'react';
import Header from './components/Header';
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
  const [isShippingEnabled, setIsShippingEnabled] = useState(true);
  const [selectedRegionId, setSelectedRegionId] = useState(DEFAULT_REGION_ID);

  // עיבוד רשימת המוצרים בזמן אמת
  const parsedItems = useMemo(() => {
    return parseShoppingList(rawText);
  }, [rawText]);

  // חישוב פיצול קנייה אופטימלי
  const optimalSplit = useMemo(() => {
    return calculateOptimalSplit(parsedItems, isShippingEnabled);
  }, [parsedItems, isShippingEnabled]);

  // מזהי הרשתות שנבחרו בסל המפוצל האופטימלי
  const optimalStoreKeys = useMemo(() => {
    if (!optimalSplit || !optimalSplit.storeBreakdowns) return [];
    return optimalSplit.storeBreakdowns.map((sb) => sb.storeKey);
  }, [optimalSplit]);

  // חישוב דירוג קנייה מרוכזת (חנות יחידה)
  const oneStopRankings = useMemo(() => {
    return calculateOneStopRankings(parsedItems, isShippingEnabled);
  }, [parsedItems, isShippingEnabled]);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main className="app-container">
        {/* שלב 1: אזור הזנת רשימת הקניות החכמה + צ'יפים של 5 קטגוריות */}
        <ShoppingListInput
          rawText={rawText}
          setRawText={setRawText}
          parsedCount={parsedItems.length}
        />

        {/* שלב 2: מתג שקלול דמי משלוח 2026 */}
        <ShippingToggle
          isShippingEnabled={isShippingEnabled}
          setIsShippingEnabled={setIsShippingEnabled}
        />

        {/* שלב 3: לוח השוואה (Comparison Dashboard) */}
        {parsedItems.length > 0 ? (
          <>
            {/* כרטיס פיצול קנייה אופטימלי עם חיסכון ב-₪ וב-% */}
            <OptimalSplitCard
              optimalSplit={optimalSplit}
              isShippingEnabled={isShippingEnabled}
            />

            {/* בורר אזור גיאוגרפי וכרטיסיות סניפים קרובים לפי הפיצול האופטימלי */}
            <GeoBranchSelector
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
              optimalStoreKeys={optimalStoreKeys}
            />

            {/* טבלת דירוג חנות יחידה (One-Stop Shop) */}
            <OneStopRankingTable
              rankings={oneStopRankings}
              isShippingEnabled={isShippingEnabled}
            />

            {/* טבלה מתקפלת להשוואת פריט-אחר-פריט בין 5 הרשתות */}
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
              הקלידו מוצרים בתיבת הטקסט או לחצו על "סל לדוגמה" כדי להתחיל בהשוואה מיידית.
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
            השוואת מחירים רוחבית: רמי לוי שיווק השקמה/אונליין, מקס סטוק, הסטוק, מקס סטוק אונליין, סטוק אונליין.
          </div>
          <div>
            התעריפים והמבצעים מעודכנים לשנת 2026. דמי המשלוח מחושבים לפי מדיניות הרשתות הרשמית.
          </div>
        </footer>
      </main>
    </div>
  );
}
