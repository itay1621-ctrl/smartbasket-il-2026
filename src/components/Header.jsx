import React, { useState, useEffect } from 'react';
import { ShoppingBag, Download, CheckCircle2 } from 'lucide-react';

export default function Header() {
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
    <header className="app-header">
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="brand-icon" aria-hidden="true">
            <ShoppingBag size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 className="brand-title">SmartBasket IL</h1>
              <span className="year-tag">2026</span>
            </div>
            <p className="brand-subtitle">משווה הסלים והסטוק החכם בישראל</p>
          </div>
        </div>

        <div>
          {!isInstalled ? (
            <button
              className="pwa-install-btn"
              onClick={handleInstallClick}
              title="התקן כ-PWA למסך הבית"
            >
              <Download size={14} />
              <span>התקן PWA</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10b981', fontSize: '0.75rem', fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              <span>מותקן</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
