import React, { useState, useMemo } from 'react';
import {
  CATALOG_PRODUCTS,
  CATEGORIES,
  RENTAL_APARTMENT_BASKET,
  WEEKLY_GROCERY_BASKET,
  MEGA_COMBINED_BASKET
} from '../data/mockStoresData.js';
import {
  BookOpen,
  Search,
  Plus,
  Minus,
  Check,
  Home,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

export default function MasterProductCatalog({ rawText, setRawText, parsedItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // יצירת מפת כמויות נוכחית מהטקסט הגולמי
  const currentItemMap = useMemo(() => {
    const map = {};
    parsedItems.forEach((it) => {
      map[it.productId] = (map[it.productId] || 0) + it.quantity;
    });
    return map;
  }, [parsedItems]);

  // סינון מוצרים לפי קטגוריה וחיפוש
  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.aliases.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // הוספת מוצר או הגדלת כמות
  const handleToggleProduct = (product) => {
    const isCurrentlyIn = !!currentItemMap[product.id];
    if (isCurrentlyIn) {
      // הסרת המוצר מהטקסט
      const lines = rawText.split('\n').filter((line) => {
        const trimmed = line.trim();
        return trimmed && !trimmed.includes(product.name) && !product.aliases.some((a) => trimmed.includes(a));
      });
      setRawText(lines.join('\n'));
    } else {
      // הוספת המוצר לרשימה
      if (!rawText.trim()) {
        setRawText(product.name);
      } else {
        setRawText(rawText.trim() + '\n' + product.name);
      }
    }
  };

  const handleUpdateQty = (product, delta) => {
    const currentQty = currentItemMap[product.id] || 0;
    const newQty = Math.max(0, currentQty + delta);

    // מחיקת שורות קודמות של המוצר
    const remainingLines = rawText.split('\n').filter((line) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.includes(product.name) && !product.aliases.some((a) => trimmed.includes(a));
    });

    if (newQty > 0) {
      const newLine = newQty === 1 ? product.name : `${newQty} ${product.name}`;
      remainingLines.push(newLine);
    }

    setRawText(remainingLines.join('\n'));
  };

  const handleLoadRentalBasket = () => {
    const list = Array.isArray(RENTAL_APARTMENT_BASKET) ? RENTAL_APARTMENT_BASKET.join('\n') : RENTAL_APARTMENT_BASKET;
    setRawText(list);
    setIsOpen(true);
  };

  const handleLoadGroceryBasket = () => {
    const list = Array.isArray(WEEKLY_GROCERY_BASKET) ? WEEKLY_GROCERY_BASKET.join('\n') : WEEKLY_GROCERY_BASKET;
    setRawText(list);
    setIsOpen(true);
  };

  const handleLoadCombinedBasket = () => {
    const list = Array.isArray(MEGA_COMBINED_BASKET) ? MEGA_COMBINED_BASKET.join('\n') : MEGA_COMBINED_BASKET;
    setRawText(list);
    setIsOpen(true);
  };

  return (
    <div className="card" style={{ border: '2px solid #93c5fd', backgroundColor: '#f0f7ff' }}>
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookOpen size={20} className="text-blue" />
          <div>
            <h2 className="card-title" style={{ fontSize: '1.05rem', margin: 0 }}>
              קטלוג כל המוצרים ורשימות מוכנות מראש
            </h2>
            <div style={{ fontSize: '0.75rem', color: '#0369a1' }}>
              מעל 120 מוצרים: ביצים, חלב, גבינות, בשר, פירות וירקות, יבשים, ניקיון וסטוק מלא!
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            paddingInline: '0.9rem',
            paddingBlock: '0.4rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span>{isOpen ? 'סגור קטלוג' : 'פתח קטלוג מלא (' + CATALOG_PRODUCTS.length + ' מוצרים)'}</span>
          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>

      {/* כפתורי טעינת סלים מובנים בלחיצה אחת */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBlockStart: '0.25rem' }}>
        <button
          onClick={handleLoadRentalBasket}
          style={{
            flex: '1 1 200px',
            background: '#ffffff',
            border: '1.5px solid #3b82f6',
            borderRadius: '10px',
            padding: '0.6rem 0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            textAlign: 'right'
          }}
          title="טען את כל 27 פריטי סל המעבר לדירה"
        >
          <Home size={18} style={{ color: '#2563eb', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e3a8a' }}>
              סל מעבר דירה מלא (27 מוצרים)
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
              מטבח, אמבטיה, טקסטיל, ריהוט, DIY, תאורה
            </div>
          </div>
        </button>

        <button
          onClick={handleLoadGroceryBasket}
          style={{
            flex: '1 1 200px',
            background: '#ffffff',
            border: '1.5px solid #10b981',
            borderRadius: '10px',
            padding: '0.6rem 0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            textAlign: 'right'
          }}
          title="טען את כל מוצרי המזון והסופרמרקט"
        >
          <ShoppingBag size={18} style={{ color: '#059669', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#065f46' }}>
              סל סופר ומזון שבועי (8 מוצרים)
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
              שוקולית, קטשופ, חלב, ביצים, קפה, שמן, טחינה, טונה
            </div>
          </div>
        </button>

        <button
          onClick={handleLoadCombinedBasket}
          style={{
            flex: '1 1 180px',
            background: '#ffffff',
            border: '1.5px solid #f59e0b',
            borderRadius: '10px',
            padding: '0.6rem 0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            textAlign: 'right'
          }}
          title="טען את כל 35 המוצרים בקטלוג"
        >
          <Sparkles size={18} style={{ color: '#d97706', flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e' }}>
              סל משולב מלא (35 מוצרים)
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
              כל מוצרי הדירה + כל מוצרי המזון
            </div>
          </div>
        </button>
      </div>

      {/* תצוגה מורחבת של קטלוג המוצרים המלא */}
      {isOpen && (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            borderRadius: '14px',
            padding: '1rem',
            marginBlockStart: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          {/* חיפוש ופילטר קטגוריות */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  insetInlineStart: '10px',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                placeholder="חיפוש מהיר בקטלוג המוצרים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  inlineSize: '100%',
                  paddingInlineStart: '2.2rem',
                  paddingInlineEnd: '0.75rem',
                  paddingBlock: '0.45rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* צ'יפי קטגוריות לסינון */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBlock: '0.25rem' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  paddingInline: '0.65rem',
                  paddingBlock: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.id ? '#2563eb' : '#e2e8f0',
                  background: selectedCategory === cat.id ? '#2563eb' : '#f8fafc',
                  color: selectedCategory === cat.id ? '#ffffff' : '#334155',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <span>{cat.icon} </span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* רשימת המוצרים עם שליטת כמות וצ'קבוקס */}
          <div
            style={{
              maxBlockSize: '360px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              paddingInlineEnd: '0.25rem'
            }}
          >
            {filteredProducts.map((product) => {
              const qty = currentItemMap[product.id] || 0;
              const isInBasket = qty > 0;

              // מציאת מחיר מינימום מכל הרשתות
              const pricesList = Object.values(product.prices).filter((p) => p !== null && p > 0);
              const minPrice = pricesList.length > 0 ? Math.min(...pricesList) : null;

              return (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isInBasket ? '#93c5fd' : '#f1f5f9',
                    background: isInBasket ? '#eff6ff' : '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1 }}>
                    <input
                      type="checkbox"
                      checked={isInBasket}
                      onChange={() => handleToggleProduct(product)}
                      style={{ inlineSize: '18px', blockSize: '18px', cursor: 'pointer' }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: isInBasket ? 700 : 500,
                          color: '#0f172a'
                        }}
                      >
                        {product.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: '#64748b' }}>
                        <span>יחידה: {product.unit}</span>
                        {minPrice && (
                          <span style={{ color: '#16a34a', fontWeight: 600 }}>
                            החל מ-₪{minPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* כפתורי שליטת כמות +/- */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      onClick={() => handleUpdateQty(product, -1)}
                      disabled={qty === 0}
                      style={{
                        inlineSize: '24px',
                        blockSize: '24px',
                        borderRadius: '4px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: qty === 0 ? 'not-allowed' : 'pointer',
                        color: qty === 0 ? '#cbd5e1' : '#0f172a'
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      style={{
                        minInlineSize: '20px',
                        textAlign: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 700
                      }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => handleUpdateQty(product, 1)}
                      style={{
                        inlineSize: '24px',
                        blockSize: '24px',
                        borderRadius: '4px',
                        border: '1px solid #2563eb',
                        background: '#2563eb',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
