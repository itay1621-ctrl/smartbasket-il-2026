import React from 'react';
import { Plus, Minus, Trash2, Scale } from 'lucide-react';
import { STORES_METADATA } from '../data/mockStoresData';

export default function ProductCard({
  product,
  quantity = 0,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart
}) {
  // חישוב מחיר מינימלי, מקסימלי והרשת הזולה ביותר
  const prices = product.prices || {};
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let cheapestStoreKey = 'rami_levy';

  for (const [key, val] of Object.entries(prices)) {
    if (typeof val === 'number' && val > 0) {
      if (val < minPrice) {
        minPrice = val;
        cheapestStoreKey = key;
      }
      if (val > maxPrice) {
        maxPrice = val;
      }
    }
  }

  const cheapestStore = STORES_METADATA[cheapestStoreKey] || { shortName: 'רמי לוי', color: '#0284c7' };
  const hasRange = maxPrice > minPrice && minPrice !== Infinity;
  const isWeightItem = product.isWeight || product.category === 'deli_cheese';
  const isDeli100g = product.category === 'deli_cheese' || product.weightStep === 100 || (product.unit && product.unit.includes('100 גרם'));
  const isKg = !isDeli100g && (product.isWeight || (product.unit && (product.unit.includes('ק"ג') || product.unit.includes('ק״ג'))));

  // תצוגת משקל כאשר הפריט בסל
  const renderInCartWeight = () => {
    if (isDeli100g) {
      const totalG = quantity * 100;
      if (totalG >= 1000) {
        return `${(totalG / 1000).toFixed(1)} ק״ג (${quantity} × 100 ג׳)`;
      }
      return `${totalG} גרם (${quantity} × 100 ג׳)`;
    }
    if (isKg) {
      return `${quantity} ק״ג בסל`;
    }
    return `${quantity} ${product.unit || 'יח׳'} בסל`;
  };

  return (
    <div className={`modern-product-card ${quantity > 0 ? 'card-in-cart' : ''}`}>
      {/* תגיות עליונות: יצרן ומשקל מעדנייה */}
      <div className="card-top-badges">
        <span className="mfg-pill">
          {product.manufacturer || 'סופרמרקט'}
        </span>
        {isWeightItem && (
          <span className="weight-deli-badge" title="מוצר הנמכר במשקל במעדנייה">
            <Scale size={12} />
            <span>במשקל</span>
          </span>
        )}
      </div>

      {/* שם מוצר ויחידת מידה */}
      <div className="product-info-block">
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>
        <div className="product-meta-row">
          <span className="product-unit-text">{product.unit || 'יחידה'}</span>
          {product.barcode && (
            <span className="product-barcode-text">#{product.barcode.slice(-6)}</span>
          )}
        </div>
      </div>

      {/* תצוגת מחירים ורשת זולה ביותר */}
      <div className="product-price-section">
        <div className="price-label-row">
          <span className="price-start-label">החל מ:</span>
          {hasRange && (
            <span className="price-range-badge">עד ₪{maxPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="main-price-row">
          <span className="cheapest-price-number">
            ₪{minPrice !== Infinity ? minPrice.toFixed(2) : '-'}
          </span>
          {isDeli100g && (
            <span className="per-weight-label">ל-100ג׳</span>
          )}
          {isKg && (
            <span className="per-weight-label">לק״ג</span>
          )}
        </div>

        <div className="cheapest-store-pill" style={{ borderColor: `${cheapestStore.color}30` }}>
          <span className="store-dot" style={{ backgroundColor: cheapestStore.color }} />
          <span>הכי זול ב{cheapestStore.shortName}</span>
        </div>
      </div>

      {/* אזור פעולה אינטראקטיבי: הוספה או בורר כמות */}
      <div className="card-action-footer">
        {quantity === 0 ? (
          <button
            type="button"
            className="btn-add-to-cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <Plus size={16} />
            <span>הוסף לסל</span>
          </button>
        ) : (
          <div className="card-stepper-container">
            {/* כפתור הפחתה */}
            <button
              type="button"
              className="stepper-btn stepper-btn-minus"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product.id, -1);
              }}
              title={quantity === 1 ? 'הסר מהסל' : 'הפחת כמות'}
            >
              <Minus size={15} />
            </button>

            {/* כמות ותצוגת משקל */}
            <div className="stepper-count-display">
              <span className="stepper-qty-num">{quantity}</span>
              {isWeightItem && (
                <span className="stepper-weight-sub">{renderInCartWeight()}</span>
              )}
            </div>

            {/* כפתור הוספה */}
            <button
              type="button"
              className="stepper-btn stepper-btn-plus"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateQuantity(product.id, 1);
              }}
              title="הגדל כמות"
            >
              <Plus size={15} />
            </button>

            {/* כפתור מחיקה מיידית (פח אשפה) */}
            <button
              type="button"
              className="card-quick-trash-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFromCart(product.id, e);
              }}
              title="הסר מוצר זה מהסל"
            >
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
