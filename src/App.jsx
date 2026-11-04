import React, { useState, useMemo, useEffect } from 'react';
import ModernHeader from './components/ModernHeader';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import DetailedPriceMatrixModal from './components/DetailedPriceMatrixModal';
import GeoBranchSelector from './components/GeoBranchSelector';
import { CATEGORIES } from './data/mockStoresData';
import { DEFAULT_REGION_ID } from './data/regionsData';
import {
  calculateOptimalSplit,
  calculateOneStopRankings,
  setActiveCatalog
} from './utils/basketOptimizer';
import {
  ShoppingBag,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export default function App() {
  const [catalog, setCatalog] = useState([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);

  // סל הקניות מנוהל כ-Array מובנה ומסונכרן למפתח חדש 'smartbasket_v3_cart'
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('smartbasket_v3_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved cart:', e);
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price_asc' | 'price_desc' | 'alpha_asc'
  const [displayLimit, setDisplayLimit] = useState(48);

  const [isShippingEnabled, setIsShippingEnabled] = useState(() => {
    try {
      return localStorage.getItem('smartbasket_v3_shipping') === 'true';
    } catch {
      return false;
    }
  });

  const [selectedRegionId, setSelectedRegionId] = useState(() => {
    try {
      return localStorage.getItem('smartbasket_v3_region') || DEFAULT_REGION_ID;
    } catch {
      return DEFAULT_REGION_ID;
    }
  });

  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);

  // טעינת קטלוג 1,035+ מוצרי הסופרמרקט
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

            // אם הסל ריק בהפעלה ראשונה, נטען סל התחלתי מגוון הכולל גבינה במשקל
            const savedCart = localStorage.getItem('smartbasket_v3_cart');
            if (!savedCart || JSON.parse(savedCart).length === 0) {
              const starterIds = [
                'dairy_eggs_1', // חלב 3%
                'dairy_eggs_2', // ביצים L
                'deli_01',      // גבינה צהובה עמק במשקל 100 גרם
                'deli_07',      // פטה כבשים במשקל
                'produce_1',    // עגבניות
                'produce_2',    // מלפפונים
                'meat_1',       // חזה עוף שניצל
                'canned_1'      // טונה
              ];
              const starterItems = data
                .filter(p => starterIds.includes(p.id))
                .map(p => ({ ...p, quantity: p.category === 'deli_cheese' ? 2 : 1 }));
              
              if (starterItems.length > 0) {
                setCart(starterItems);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Failed to fetch supermarket_catalog.json:', err);
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

  // שמירה ל-LocalStorage בכל שינוי בסל
  useEffect(() => {
    try {
      localStorage.setItem('smartbasket_v3_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('smartbasket_v3_shipping', String(isShippingEnabled));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [isShippingEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem('smartbasket_v3_region', selectedRegionId);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [selectedRegionId]);

  // איפוס מגבלת תצוגה בשינוי קטגוריה או חיפוש
  useEffect(() => {
    setDisplayLimit(48);
  }, [selectedCategory, searchTerm, sortBy]);

  // ==========================================
  // פונקציות טהורות ומדויקות לניהול הסל לפי product.id
  // ==========================================
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm('האם אתם בטוחים שברצונכם לרוקן את הסל?')) {
      setCart([]);
    }
  };

  const loadSampleBasket = () => {
    if (catalog.length === 0) return;
    const sampleIds = [
      'dairy_eggs_1', // חלב
      'dairy_eggs_2', // ביצים
      'deli_01',      // גבינת עמק במשקל
      'deli_05',      // בולגרית פיראוס במשקל
      'deli_23',      // זיתי קלמטה במשקל
      'produce_1',    // עגבניות
      'produce_2',    // מלפפונים
      'bakery_1',     // לחם אחיד
      'meat_1',       // חזה עוף
      'canned_1',     // טונה
      'coffee_1'      // קפה נמס
    ];
    const sampleItems = catalog
      .filter(p => sampleIds.includes(p.id))
      .map(p => ({ ...p, quantity: p.category === 'deli_cheese' ? 2 : 1 }));
    setCart(sampleItems);
  };

  // מפת כמויות מהירה לגישה ישירה מכרטיסי המוצרים
  const cartQuantityMap = useMemo(() => {
    const map = {};
    for (const item of cart) {
      map[item.id] = item.quantity;
    }
    return map;
  }, [cart]);

  // ספירת מוצרים לפי קטגוריה
  const categoryCounts = useMemo(() => {
    const counts = { all: catalog.length };
    for (const p of catalog) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [catalog]);

  // מחיר מינימלי למוצר
  const getMinPrice = (p) => {
    if (!p.prices) return 0;
    const vals = Object.values(p.prices).filter((v) => typeof v === 'number' && v > 0);
    return vals.length > 0 ? Math.min(...vals) : 0;
  };

  // סינון ומיון מוצרי הקטלוג
  const filteredAndSortedProducts = useMemo(() => {
    let result = catalog.filter((product) => {
      // סינון קטגוריה
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // סינון חיפוש
      if (searchTerm.trim()) {
        const term = searchTerm.trim().toLowerCase();
        const matchName = product.name && product.name.toLowerCase().includes(term);
        const matchMfg = product.manufacturer && product.manufacturer.toLowerCase().includes(term);
        const matchBarcode = product.barcode && product.barcode.includes(term);
        const matchAliases = product.aliases && product.aliases.some((a) => a.toLowerCase().includes(term));
        if (!matchName && !matchMfg && !matchBarcode && !matchAliases) return false;
      }

      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'price_asc') {
        return getMinPrice(a) - getMinPrice(b);
      }
      if (sortBy === 'price_desc') {
        return getMinPrice(b) - getMinPrice(a);
      }
      if (sortBy === 'alpha_asc') {
        return a.name.localeCompare(b.name, 'he');
      }
      // 'popular' - מוצרים שבסל קודם, אחריהם מעדנייה וגבינות במשקל
      const inA = cartQuantityMap[a.id] ? 1 : 0;
      const inB = cartQuantityMap[b.id] ? 1 : 0;
      if (inA !== inB) return inB - inA;
      if (a.category === 'deli_cheese' && b.category !== 'deli_cheese') return -1;
      if (b.category === 'deli_cheese' && a.category !== 'deli_cheese') return 1;
      return 0;
    });

    return result;
  }, [catalog, selectedCategory, searchTerm, sortBy, cartQuantityMap]);

  const visibleProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(0, displayLimit);
  }, [filteredAndSortedProducts, displayLimit]);

  // חישוב דירוגי סופרמרקטים ופיצול
  const oneStopRankings = useMemo(() => {
    return calculateOneStopRankings(cart, isShippingEnabled);
  }, [cart, isShippingEnabled]);

  const optimalSplit = useMemo(() => {
    return calculateOptimalSplit(cart, isShippingEnabled);
  }, [cart, isShippingEnabled]);

  const cartTotalCheapest = useMemo(() => {
    return oneStopRankings[0] ? oneStopRankings[0].grandTotal : 0;
  }, [oneStopRankings]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, it) => sum + (it.quantity || 1), 0);
  }, [cart]);

  return (
    <div className="smartbasket-app-root">
      {/* הדר עליון חכם */}
      <ModernHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isShippingEnabled={isShippingEnabled}
        setIsShippingEnabled={setIsShippingEnabled}
        cartCount={totalCartCount}
        cartTotal={cartTotalCheapest}
        onOpenMobileCart={() => setIsMobileCartOpen(true)}
      />

      {/* סרגל מחלקות וקטגוריות אופקי דביק */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* תוכן ראשי: פריסת 2 עמודות בדסקטופ (קטלוג + סל והשוואה) */}
      <main className="modern-main-content">
        <div className="main-layout-columns">
          {/* עמודה ימנית: קטלוג מוצרים וגריד */}
          <section className="catalog-primary-column">
            {/* כותרת תוצאות ומיון מהיר */}
            <div className="catalog-toolbar-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h2 className="catalog-results-heading">
                    {selectedCategory === 'all' ? '✨ כל המוצרים בסופרמרקטים' : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'מוצרים'}
                  </h2>
                  <span className="catalog-results-count">
                    נמצאו {filteredAndSortedProducts.length} מוצרים אמיתיים מ-7 הרשתות
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {cart.length === 0 && (
                    <button
                      type="button"
                      className="btn-sample-load"
                      onClick={loadSampleBasket}
                      title="טען סל סופרמרקט עשיר הכולל גבינות מעדנייה במשקל"
                    >
                      <Sparkles size={14} />
                      <span>טען סל מומלץ</span>
                    </button>
                  )}

                  <div className="sort-select-box">
                    <ArrowUpDown size={14} className="text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-dropdown"
                    >
                      <option value="popular">מומלץ / שבסל קודם</option>
                      <option value="price_asc">מחיר: מהזול ליקר</option>
                      <option value="price_desc">מחיר: מהיקר לזול</option>
                      <option value="alpha_asc">שם מוצר: א - ת</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* הודעת דגש למחלקת מעדנייה */}
              {selectedCategory === 'deli_cheese' && (
                <div className="deli-category-banner">
                  <span style={{ fontSize: '1.25rem' }}>🧀</span>
                  <div>
                    <strong>מחלקת מעדנייה וגבינות במשקל (לפי 100 גרם):</strong>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>
                      המחיר מוצג ל-100 גרם. בעת הוספת כמות (לדוגמה: 2 או 3) יוצג משקל כולל של 200 גרם או 300 גרם בסל!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* גריד כרטיסי המוצרים */}
            <div className="products-responsive-grid">
              {visibleProducts.map((product) => {
                const qty = cartQuantityMap[product.id] || 0;
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={qty}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                    onRemoveFromCart={removeFromCart}
                  />
                );
              })}
            </div>

            {/* כפתור טעינת מוצרים נוספים */}
            {visibleProducts.length < filteredAndSortedProducts.length && (
              <div className="load-more-section">
                <button
                  type="button"
                  className="btn-load-more"
                  onClick={() => setDisplayLimit((prev) => prev + 48)}
                >
                  <span>טען 48 מוצרים נוספים</span>
                  <span style={{ opacity: 0.75, fontSize: '0.8rem' }}>
                    (מוצגים {visibleProducts.length} מתוך {filteredAndSortedProducts.length})
                  </span>
                </button>
              </div>
            )}
          </section>

          {/* עמודה שמאלית (דסקטופ): פאנל הסל והשוואת הסופרמרקטים */}
          <aside className="cart-desktop-sidebar">
            <CartSidebar
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              onOpenMatrixModal={() => setIsMatrixModalOpen(true)}
              oneStopRankings={oneStopRankings}
              optimalSplit={optimalSplit}
              isShippingEnabled={isShippingEnabled}
            />
          </aside>
        </div>

        {/* בורר סניפים פיזיים ואיסוף עצמי בתחתית הדף */}
        <div style={{ marginTop: '2rem' }}>
          <GeoBranchSelector
            selectedRegionId={selectedRegionId}
            onSelectRegion={setSelectedRegionId}
            optimalStoreKeys={optimalSplit?.pair || []}
          />
        </div>
      </main>

      {/* באר סל צף למובייל (מוצג כשיש מוצרים בסל) */}
      {cart.length > 0 && (
        <div className="mobile-floating-cart-bar">
          <div className="mobile-cart-bar-inner">
            <div className="mobile-bar-info">
              <span className="mobile-bar-items-count">
                {totalCartCount} פריטים בסל
              </span>
              <span className="mobile-bar-cheapest-price">
                ₪{cartTotalCheapest.toFixed(2)}
                <small style={{ fontSize: '0.7rem', fontWeight: 600, marginInlineStart: '0.25rem' }}>
                  (הכי זול ב{oneStopRankings[0]?.store.shortName})
                </small>
              </span>
            </div>

            <button
              type="button"
              className="btn-open-mobile-cart"
              onClick={() => setIsMobileCartOpen(true)}
            >
              <ShoppingBag size={17} />
              <span>לסל ולהשוואה</span>
            </button>
          </div>
        </div>
      )}

      {/* מגירת סל נשלפת למובייל */}
      {isMobileCartOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileCartOpen(false)}>
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <CartSidebar
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              onOpenMatrixModal={() => {
                setIsMobileCartOpen(false);
                setIsMatrixModalOpen(true);
              }}
              oneStopRankings={oneStopRankings}
              optimalSplit={optimalSplit}
              isShippingEnabled={isShippingEnabled}
              onCloseMobileDrawer={() => setIsMobileCartOpen(false)}
            />
          </div>
        </div>
      )}

      {/* מודל השוואת מחירים מפורטת פריט-אחר-פריט */}
      <DetailedPriceMatrixModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
        cart={cart}
      />

      {/* פוטר שקיפות */}
      <footer className="modern-footer">
        <div>
          <strong>SmartBasket IL 2026</strong> • משווה מחירי הסופרמרקטים הרשמי בישראל
        </div>
        <div>
          השוואה מלאה בין 7 רשתות המזון: רמי לוי, אושר עד, יוחננוף, שופרסל דיל, קרפור היפר, ויקטורי, וחצי חינם.
        </div>
      </footer>
    </div>
  );
}
