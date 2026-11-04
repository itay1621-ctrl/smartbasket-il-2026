import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Truck, Download, CheckCircle2, X } from 'lucide-react';

export default function ModernHeader({
  searchTerm,
  setSearchTerm,
  isShippingEnabled,
  setIsShippingEnabled,
  cartCount,
  cartTotal,
  onOpenMobileCart
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('להתקנת האפליקציה במסך הבית:\nבדפדפן כרום: לחץ על תפריט 3 הנקודות ובחר "התקן אפליקציה"\nבספארי ב-iOS: לחץ על כפתור השיתוף ובחר "הוסף למסך הבית"');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <header className="modern-header">
      <div className="header-inner">
        {/* לוגו ומיתוג */}
        <div className="header-brand">
          <div className="brand-logo-icon">
            <ShoppingBag size={22} className="text-white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="brand-name">SmartBasket</span>
              <span className="brand-badge-year">2026</span>
            </div>
            <p className="brand-tagline">משווה מחירי הסופרמרקטים הרשמי בישראל</p>
          </div>
        </div>

        {/* שורת חיפוש מרכזית מודרנית */}
        <div className="header-search-container">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            className="modern-search-input"
            placeholder="חיפוש מהיר: חלב, גבינה צהובה במשקל, עגבניות, עוף, קפה, פיירי..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="נקה חיפוש"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* פקדי צד עליונים: מתג משלוח, כפתור סל מהיר, כפתור התקנה */}
        <div className="header-actions">
          {/* מתג מהיר למשלוח עד הבית */}
          <button
            type="button"
            className={`shipping-quick-pill ${isShippingEnabled ? 'shipping-on' : 'shipping-off'}`}
            onClick={() => setIsShippingEnabled(!isShippingEnabled)}
            title="שקלל דמי משלוח עד הבית"
          >
            <Truck size={16} />
            <div style={{ textAlign: 'right', lineHeight: 1.15 }}>
              <span style={{ fontSize: '0.72rem', display: 'block', opacity: 0.85 }}>
                {isShippingEnabled ? 'משלוח עד הבית' : 'מחירי מדף בסניף'}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                {isShippingEnabled ? '₪35.90 מופעל' : '₪0 איסוף עצמי'}
              </span>
            </div>
          </button>

          {/* כפתור סל צף למובייל/טאבלט */}
          <button
            type="button"
            className="mobile-cart-toggle-btn"
            onClick={onOpenMobileCart}
            title="פתח את הסל שלי"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="cart-counter-bubble">{cartCount}</span>
            )}
            <span className="mobile-cart-btn-price">
              {cartCount > 0 ? `₪${cartTotal.toFixed(2)}` : 'סל ריק'}
            </span>
          </button>

          {/* התקנת PWA */}
          {!isInstalled ? (
            <button
              type="button"
              className="pwa-header-btn"
              onClick={handleInstallClick}
              title="התקן אפליקציה למסך הבית"
            >
              <Download size={15} />
              <span className="pwa-btn-text">התקן</span>
            </button>
          ) : (
            <span className="pwa-installed-tag">
              <CheckCircle2 size={15} />
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
