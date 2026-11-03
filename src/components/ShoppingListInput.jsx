import React, { useState } from 'react';
import { CATEGORIES, CATALOG_PRODUCTS, INITIAL_USER_LIST } from '../data/mockStoresData';
import { Edit3, Plus, RotateCcw, Sparkles } from 'lucide-react';

export default function ShoppingListInput({ rawText, setRawText, parsedCount }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // סינון מוצרים להצעות מהירות לפי קטגוריה שנבחרה
  const filteredProducts =
    selectedCategory === 'all'
      ? CATALOG_PRODUCTS.slice(0, 8)
      : CATALOG_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddProduct = (productName) => {
    if (!rawText.trim()) {
      setRawText(productName);
    } else {
      setRawText(rawText.trim() + '\n' + productName);
    }
  };

  const handleResetToSample = () => {
    setRawText(INITIAL_USER_LIST);
  };

  const handleClear = () => {
    setRawText('');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Edit3 size={18} className="text-blue" />
          <span>רשימת קניות חכמה</span>
        </h2>
        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
          {parsedCount} פריטים זוהו
        </span>
      </div>

      {/* קטגוריות ראשיות (Category Chips) */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBlockEnd: '0.35rem' }}>
          הוספה מהירה לפי קטגוריה:
        </div>
        <div className="chips-container" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={selectedCategory === cat.id}
              className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* הצעות לפריטים פופולריים לפי הקטגוריה שנבחרה */}
      <div>
        <div className="suggestions-slider" aria-label="מוצרים פופולריים להוספה">
          {filteredProducts.map((p) => (
            <button
              key={p.id}
              className="suggestion-pill"
              onClick={() => handleAddProduct(p.name)}
              title={`לחץ להוספת ${p.name}`}
            >
              <Plus size={12} />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* אזור טקסט חופשי בעברית */}
      <div className="textarea-wrapper">
        <textarea
          className="list-textarea"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={`הקלד או הדבק מוצרים בעברית (פריט אחד בכל שורה)...
לדוגמה:
2 חלב תנובה 3%
מארז קופסאות זכוכית
מקדחה נטענת 18V
שידת לילה לחדר שינה
מארז חולצות בייסיק`}
          rows={5}
          aria-label="הזנת רשימת מוצרים בעברית"
        />
        <div className="textarea-footer">
          <span>תומך בכמויות חופשיות: "2 חלב", "מארז גרביים", "3x מחבת"</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleResetToSample}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}
              title="טען סל דוגמה עשיר"
            >
              <RotateCcw size={12} />
              <span>סל לדוגמה</span>
            </button>
            <button
              onClick={handleClear}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              נקה הכל
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
