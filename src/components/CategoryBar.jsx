import React from 'react';
import { CATEGORIES } from '../data/mockStoresData';

export default function CategoryBar({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {}
}) {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar-scroll" role="tablist" aria-label="סינון לפי מחלקה">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`category-pill-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span className="pill-name">{cat.name}</span>
              {count > 0 && (
                <span className="pill-count-badge">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
