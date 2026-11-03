// נתוני רשתות ומוצרים מעודכנים לשנת 2026 - כולל רשתות מזון וסופרמרקטים + רשתות סטוק וכלי בית

export const STORES_METADATA = {
  // ==========================================
  // רשתות מזון וסופרמרקטים מובילים בישראל
  // ==========================================
  rami_levy: {
    id: 'rami_levy',
    name: 'רמי לוי (שיווק השקמה / אונליין / סטוק)',
    shortName: 'רמי לוי',
    color: '#0284c7', // Sky Blue
    badgeColor: 'bg-blue-600',
    sector: 'food', // also hybrid stock
    sectorLabel: 'סופרמרקט + סטוק ענק',
    type: 'סניפים + אונליין',
    baseDeliveryFee: 35.9,
    freeDeliveryThreshold: 0, // ללא סף משלוח חינם בשנת 2026
    minOrder: 100,
    deliveryNote: 'משלוח עד הבית ₪35.90 קבוע (איסוף ₪0)',
    iconText: 'רמי לוי'
  },
  shufersal: {
    id: 'shufersal',
    name: 'שופרסל (דיל / אונליין)',
    shortName: 'שופרסל',
    color: '#059669', // Emerald Green
    badgeColor: 'bg-emerald-600',
    sector: 'food',
    sectorLabel: 'רשת מזון וסופרמרקט',
    type: 'סניפים + אונליין',
    baseDeliveryFee: 35.0,
    freeDeliveryThreshold: 0,
    minOrder: 150,
    deliveryNote: 'משלוח עד הבית ₪35.00 קבוע (איסוף ₪0)',
    iconText: 'שופרסל'
  },
  yohananof: {
    id: 'yohananof',
    name: 'סופרשוק יוחננוף',
    shortName: 'יוחננוף',
    color: '#dc2626', // Red
    badgeColor: 'bg-red-600',
    sector: 'food',
    sectorLabel: 'רשת מזון ולואו-קוסט',
    type: 'סניפים + אונליין',
    baseDeliveryFee: 32.0,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: 'משלוח עד הבית ₪32.00 (איסוף ₪0)',
    iconText: 'יוחננוף'
  },
  carrefour: {
    id: 'carrefour',
    name: 'קרפור ישראל (Carrefour)',
    shortName: 'קרפור',
    color: '#2563eb', // Royal Blue
    badgeColor: 'bg-blue-600',
    sector: 'food',
    sectorLabel: 'רשת מזון בינלאומית',
    type: 'סניפים + אונליין',
    baseDeliveryFee: 34.0,
    freeDeliveryThreshold: 450,
    minOrder: 120,
    deliveryNote: 'משלוח ₪34.00 (חינם מעל ₪450)',
    iconText: 'קרפור'
  },
  osher_ad: {
    id: 'osher_ad',
    name: 'אושר עד (סניפי דיסקאונט ומארזים)',
    shortName: 'אושר עד',
    color: '#d97706', // Amber
    badgeColor: 'bg-amber-600',
    sector: 'food',
    sectorLabel: 'דיסקאונט מארזי ענק',
    type: 'סניפים בלבד',
    baseDeliveryFee: 0,
    freeDeliveryThreshold: 0,
    minOrder: 0,
    deliveryNote: 'סניפים בלבד (ללא משלוח ישיר, איסוף ₪0)',
    iconText: 'אושר עד'
  },
  victory: {
    id: 'victory',
    name: 'ויקטורי (סופרמרקט / אונליין)',
    shortName: 'ויקטורי',
    color: '#7c3aed', // Purple
    badgeColor: 'bg-purple-600',
    sector: 'food',
    sectorLabel: 'רשת סופרמרקטים',
    type: 'סניפים + אונליין',
    baseDeliveryFee: 35.0,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: 'משלוח עד הבית ₪35.00 קבוע',
    iconText: 'ויקטורי'
  },

  // ==========================================
  // רשתות הסטוק והלואו-קוסט המובילות בישראל
  // ==========================================
  max_stock: {
    id: 'max_stock',
    name: 'מקס סטוק (סניפים פיזיים)',
    shortName: 'מקס סטוק',
    color: '#e11d48', // Crimson Red
    badgeColor: 'bg-rose-600',
    sector: 'stock',
    sectorLabel: 'רשת סטוק וכלי בית',
    type: 'סניפים בלבד (64 סניפים)',
    baseDeliveryFee: 0,
    freeDeliveryThreshold: 0,
    minOrder: 0,
    deliveryNote: 'איסוף עצמי בסניף (₪0)',
    iconText: 'מקס סטוק'
  },
  hastock: {
    id: 'hastock',
    name: 'הסטוק (רשת הסטוק)',
    shortName: 'הסטוק',
    color: '#ea580c', // Orange
    badgeColor: 'bg-orange-600',
    sector: 'stock',
    sectorLabel: 'רשת סטוק וכלי בית',
    type: 'סניפים + משלוחים (51 סניפים)',
    baseDeliveryFee: 35.0,
    freeDeliveryThreshold: 350,
    minOrder: 50,
    deliveryNote: 'משלוח עד הבית ₪35 (חינם מעל ₪350, איסוף ₪0)',
    iconText: 'הסטוק'
  },
  max_stock_online: {
    id: 'max_stock_online',
    name: 'מקס סטוק אונליין',
    shortName: 'מקס אונליין',
    color: '#9333ea', // Purple
    badgeColor: 'bg-purple-600',
    sector: 'stock',
    sectorLabel: 'אתר ייעודי לריהוט וסטוק',
    type: 'משלוחים בלבד',
    baseDeliveryFee: 99.0, // 99 ₪ לפריט ראשון + 70 ₪ לכל פריט נוסף
    perAdditionalItemFee: 70.0,
    freeDeliveryThreshold: 0,
    minOrder: 80,
    deliveryNote: '₪99 לפריט 1 + ₪70 לכל פריט נוסף (איסוף חינם קיסריה/אשדוד)',
    iconText: 'מקס אונליין'
  },
  stock_online: {
    id: 'stock_online',
    name: 'סטוק אונליין (Stock Online)',
    shortName: 'סטוק אונליין',
    color: '#10b981', // Emerald
    badgeColor: 'bg-emerald-600',
    sector: 'stock',
    sectorLabel: 'חנות מקוונת לבית ולסטוק',
    type: 'חנות מקוונת בלבד',
    baseDeliveryFee: 70.0,
    freeDeliveryThreshold: 299,
    minOrder: 50,
    deliveryNote: 'משלוח ₪70 (משלוח חינם מעל ₪299)',
    iconText: 'סטוק Online'
  }
};

export const CATEGORIES = [
  { id: 'all', name: 'הכל', icon: '✨' },
  { id: 'food', name: 'מזון ומכולת', icon: '🍏' },
  { id: 'kitchen', name: 'מטבח', icon: '🍳' },
  { id: 'cleaning_bath', name: 'ניקיון ואמבטיה', icon: '🧼' },
  { id: 'textile', name: 'טקסטיל', icon: '🛏️' },
  { id: 'furniture', name: 'ריהוט ואחסון', icon: '🛋️' },
  { id: 'diy', name: 'כלי עבודה ו-DIY', icon: '🔧' },
  { id: 'decor', name: 'אקססוריז ותאורה', icon: '💡' }
];

export const CATALOG_PRODUCTS = [
  // ==========================================
  // קטגוריית מזון ומכולת (food)
  // ==========================================
  {
    id: 'p_shocolit',
    name: 'שוקולית עלית 500 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['שוקולית', 'שוקולית עלית', 'אבקת שוקולית', 'שוקו'],
    prices: {
      rami_levy: 14.90,
      shufersal: 14.90,
      yohananof: 14.50,
      carrefour: 14.90,
      osher_ad: 13.90,
      victory: 14.90,
      max_stock: 14.20,
      hastock: 14.20,
      max_stock_online: 14.50,
      stock_online: 15.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_ketchup_osem',
    name: 'קטשופ אסם עשיר 750 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['קטשופ אסם', 'קטשופ', 'קטשופ אוסם', 'בקבוק קטשופ'],
    prices: {
      rami_levy: 10.90,
      shufersal: 11.90,
      yohananof: 10.50,
      carrefour: 10.90,
      osher_ad: 9.90,
      victory: 11.50,
      max_stock: 10.90,
      hastock: 10.90,
      max_stock_online: 11.50,
      stock_online: 12.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_milk_tnuva',
    name: 'חלב תנובה 3% 1 ליטר',
    category: 'food',
    unit: 'יח׳',
    aliases: ['חלב', 'חלב תנובה', 'חלב 3%', 'תנובה', 'קרטון חלב'],
    prices: {
      rami_levy: 7.11,
      shufersal: 7.11,
      yohananof: 7.11,
      carrefour: 7.11,
      osher_ad: 7.11,
      victory: 7.11,
      max_stock: 6.90,
      hastock: 7.20,
      max_stock_online: 7.10,
      stock_online: null
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: false
    }
  },
  {
    id: 'p_eggs_l',
    name: 'ביצים גודל L (מארז 12)',
    category: 'food',
    unit: 'מארז',
    aliases: ['ביצים', 'ביצים L', 'תבנית ביצים', 'ביצי עוף'],
    prices: {
      rami_levy: 13.90,
      shufersal: 13.90,
      yohananof: 13.90,
      carrefour: 13.90,
      osher_ad: 13.50,
      victory: 13.90,
      max_stock: null,
      hastock: 14.50,
      max_stock_online: null,
      stock_online: null
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: false,
      hastock: true,
      max_stock_online: false,
      stock_online: false
    }
  },
  {
    id: 'p_black_coffee',
    name: 'קפה שחור עלית עם הל 100 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['קפה', 'קפה שחור', 'קפה עלית', 'קפה טורקי', 'קפה עם הל'],
    prices: {
      rami_levy: 9.90,
      shufersal: 10.50,
      yohananof: 8.90,
      carrefour: 9.90,
      osher_ad: 8.90,
      victory: 9.90,
      max_stock: 8.50,
      hastock: 8.90,
      max_stock_online: 8.90,
      stock_online: 9.50
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_canola_oil',
    name: 'שמן קנולה מזוכך 1 ליטר',
    category: 'food',
    unit: 'בקבוק',
    aliases: ['שמן', 'שמן קנולה', 'שמן לטיגון'],
    prices: {
      rami_levy: 8.90,
      shufersal: 9.90,
      yohananof: 8.50,
      carrefour: 8.90,
      osher_ad: 8.20,
      victory: 9.20,
      max_stock: 9.90,
      hastock: 9.50,
      max_stock_online: 9.90,
      stock_online: 10.90
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_tahini_raw',
    name: 'טחינה גולמית מובחרת 500 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['טחינה', 'טחינה גולמית', 'טחינה הר ברכה', 'טחינה אל ארז'],
    prices: {
      rami_levy: 13.90,
      shufersal: 14.90,
      yohananof: 12.90,
      carrefour: 13.50,
      osher_ad: 11.90,
      victory: 13.90,
      max_stock: 12.00,
      hastock: 12.90,
      max_stock_online: 12.50,
      stock_online: 13.50
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_tuna_4pack',
    name: 'שימורי טונה סטארקיסט במים/שמן (רביעייה)',
    category: 'food',
    unit: 'מארז',
    aliases: ['טונה', 'שימורי טונה', 'טונה רביעיה', 'סטארקיסט'],
    prices: {
      rami_levy: 22.90,
      shufersal: 24.90,
      yohananof: 21.90,
      carrefour: 22.90,
      osher_ad: 21.00,
      victory: 23.50,
      max_stock: 21.00,
      hastock: 21.90,
      max_stock_online: 21.90,
      stock_online: 23.50
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריית מטבח (kitchen) - סל מעבר דירה
  // ==========================================
  {
    id: 'p_pot_24',
    name: 'סיר בישול 24 ס״מ',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['סיר 24 ס"מ', 'סיר 24 ס״מ', 'סיר 24', 'סיר', 'סיר בישול', 'סיר נון סטיק'],
    prices: {
      rami_levy: 59.90,
      shufersal: 79.90,
      yohananof: 64.90,
      carrefour: 69.90,
      osher_ad: 54.90,
      victory: 69.90,
      max_stock: 69.00,
      hastock: 49.90,
      max_stock_online: 75.00,
      stock_online: 79.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_soteuse_28',
    name: 'סוטאז׳ 28 ס״מ עם מכסה',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['סוטאז\' 28 ס"מ', 'סוטאז\' 28', 'סוטאז 28', 'סוטאז\'', 'סוטאז', 'סיר סוטאז'],
    prices: {
      rami_levy: 69.90,
      shufersal: 89.90,
      yohananof: 74.90,
      carrefour: 79.90,
      osher_ad: 69.90,
      victory: 79.90,
      max_stock: 79.00,
      hastock: 69.90,
      max_stock_online: 85.00,
      stock_online: 89.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_pans_pair',
    name: 'זוג מחבתות נון-סטיק',
    category: 'kitchen',
    unit: 'מארז',
    aliases: ['זוג מחבתות', 'סט מחבתות', 'מחבתות', 'מחבת', 'מחבת נון סטיק'],
    prices: {
      rami_levy: 59.90,
      shufersal: 79.90,
      yohananof: 69.90,
      carrefour: 74.90,
      osher_ad: 64.90,
      victory: 75.00,
      max_stock: 84.00,
      hastock: 69.90,
      max_stock_online: 89.00,
      stock_online: 95.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_plates_12',
    name: 'סט 12 צלחות אוכל',
    category: 'kitchen',
    unit: 'סט',
    aliases: ['סט 12 צלחות', '12 צלחות', 'סט צלחות', 'צלחות אוכל', 'צלחות'],
    prices: {
      rami_levy: 29.90,
      shufersal: 49.90,
      yohananof: 35.00,
      carrefour: 42.00,
      osher_ad: 32.00,
      victory: 39.90,
      max_stock: 39.90,
      hastock: 49.90,
      max_stock_online: 45.00,
      stock_online: 49.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_cutlery_24',
    name: 'סט סכו״ם 24 חלקים',
    category: 'kitchen',
    unit: 'סט',
    aliases: ['סט סכו"ם 24 חלקים', 'סט סכו״ם 24 חלקים', 'סט סכו"ם', 'סט סכו״ם', 'סכו"ם 24 חלקים', 'סכו״ם', 'סכום'],
    prices: {
      rami_levy: 19.90,
      shufersal: 34.90,
      yohananof: 24.90,
      carrefour: 29.90,
      osher_ad: 19.90,
      victory: 29.90,
      max_stock: 20.90,
      hastock: 29.90,
      max_stock_online: 25.00,
      stock_online: 29.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_glasses_mugs',
    name: 'סט 6 כוסות שתייה + 6 מאגים',
    category: 'kitchen',
    unit: 'סט',
    aliases: ['6 כוסות + 6 מאגים', '6 כוסות ו-6 מאגים', 'כוסות ומאגים', 'סט כוסות ומאגים', 'כוסות', 'מאגים'],
    prices: {
      rami_levy: 39.80,
      shufersal: 54.90,
      yohananof: 44.90,
      carrefour: 49.90,
      osher_ad: 39.90,
      victory: 49.90,
      max_stock: 46.80,
      hastock: 49.90,
      max_stock_online: 49.00,
      stock_online: 55.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_dish_rack_2tier',
    name: 'מייבש כלים דו-קומתי',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['מייבש כלים דו-קומתי', 'מייבש כלים דו קומתי', 'מייבש כלים', 'מתקן כלים', 'מתקן ייבוש כלים'],
    prices: {
      rami_levy: 29.90,
      shufersal: 45.00,
      yohananof: 34.90,
      carrefour: 39.90,
      osher_ad: 29.90,
      victory: 39.90,
      max_stock: 30.00,
      hastock: 39.90,
      max_stock_online: 35.00,
      stock_online: 39.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_storage_strainer_utensils',
    name: '10 קופסאות אחסון + מסננת וששת',
    category: 'kitchen',
    unit: 'ערכה',
    aliases: ['10 קופסאות אחסון + מסננת וששת', 'קופסאות אחסון ומסננת וששת', '10 קופסאות אחסון', 'קופסאות אחסון', 'ששת ומסננת', 'מסננת וששת'],
    prices: {
      rami_levy: 32.80, // כולל מסננת ב-2.90 ₪
      shufersal: 59.90,
      yohananof: 42.00,
      carrefour: 49.90,
      osher_ad: 36.90,
      victory: 49.90,
      max_stock: 45.80,
      hastock: 49.90,
      max_stock_online: 49.00,
      stock_online: 52.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריית ניקיון ואמבטיה (cleaning_bath)
  // ==========================================
  {
    id: 'p_cleaning_kit',
    name: 'ערכת ניקיון מלאה דלי+מגב+סמרטוטים+חומרים',
    category: 'cleaning_bath',
    unit: 'ערכה',
    aliases: ['ערכת ניקיון מלאה', 'ערכת ניקיון', 'דלי ומגב', 'סט ניקיון', 'חומרי ניקוי ודלי'],
    prices: {
      rami_levy: 49.90,
      shufersal: 69.90,
      yohananof: 54.90,
      carrefour: 59.90,
      osher_ad: 46.90,
      victory: 59.90,
      max_stock: 59.40,
      hastock: 64.90,
      max_stock_online: 65.00,
      stock_online: 69.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_laundry_basket_pins',
    name: 'סל כביסה + אטבים + שקיות רשת',
    category: 'cleaning_bath',
    unit: 'ערכה',
    aliases: ['סל כביסה + אטבים + שקיות רשת', 'סל כביסה ואטבים', 'סל כביסה', 'אטבי כביסה'],
    prices: {
      rami_levy: 24.90,
      shufersal: 39.90,
      yohananof: 28.00,
      carrefour: 34.90,
      osher_ad: 24.90,
      victory: 32.00,
      max_stock: 26.80,
      hastock: 29.90,
      max_stock_online: 30.00,
      stock_online: 35.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_ocean_bath_accessories',
    name: 'אבזור אמבטיה ללא קידוח מסדרת OCEAN',
    category: 'cleaning_bath',
    unit: 'סט',
    aliases: ['אבזור אמבטיה ללא קידוח מסדרת OCEAN', 'אבזור אמבטיה ללא קידוח', 'אבזור אמבטיה ocean', 'מתלים לאמבטיה', 'מדף ואקום'],
    prices: {
      rami_levy: 54.90,
      shufersal: 79.90,
      yohananof: 62.00,
      carrefour: 69.90,
      osher_ad: null,
      victory: 69.90,
      max_stock: 62.50,
      hastock: 69.90,
      max_stock_online: 69.00,
      stock_online: 75.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: false,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_bath_entry_mats',
    name: 'שטיח אמבטיה + שטיח כניסה',
    category: 'cleaning_bath',
    unit: 'זוג',
    aliases: ['שטיח אמבטיה + שטיח כניסה', 'שטיח אמבטיה ושטיח כניסה', 'שטיח אמבטיה', 'שטיח כניסה'],
    prices: {
      rami_levy: 24.90,
      shufersal: 44.90,
      yohananof: 29.90,
      carrefour: 34.90,
      osher_ad: 24.90,
      victory: 35.00,
      max_stock: 26.80,
      hastock: 29.90,
      max_stock_online: 30.00,
      stock_online: 32.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריית טקסטיל (textile)
  // ==========================================
  {
    id: 'p_towels_set_body_face',
    name: '2 מגבות גוף + 2 פנים + מגבות מטבח',
    category: 'textile',
    unit: 'סט',
    aliases: ['2 מגבות גוף + 2 פנים + מגבות מטבח', 'סט מגבות מלא', 'מגבות גוף ופנים', 'מגבות גוף'],
    prices: {
      rami_levy: 59.90,
      shufersal: 89.90,
      yohananof: 72.00,
      carrefour: 79.90,
      osher_ad: 65.00,
      victory: 79.90,
      max_stock: 73.60,
      hastock: 69.60,
      max_stock_online: 79.00,
      stock_online: 85.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_bedding_pillows_set',
    name: 'סט מצעים זוגי + זוג כריות שינה',
    category: 'textile',
    unit: 'ערכה',
    aliases: ['סט מצעים זוגי + זוג כריות שינה', 'מצעים וכריות', 'סט מצעים זוגי', 'מצעים זוגיים'],
    prices: {
      rami_levy: 99.80,
      shufersal: 149.90,
      yohananof: 119.00,
      carrefour: 129.90,
      osher_ad: 109.00,
      victory: 129.90,
      max_stock: 119.80,
      hastock: 109.80,
      max_stock_online: 129.00,
      stock_online: 139.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריית ריהוט ואחסון (furniture)
  // ==========================================
  {
    id: 'p_coffee_tables_pair',
    name: 'שולחן סלון / זוג שולחנות קפה',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['שולחן סלון / זוג שולחנות קפה', 'שולחן סלון', 'זוג שולחנות קפה', 'שולחנות קפה'],
    prices: {
      rami_levy: 129.90,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 119.90,
      hastock: 149.90,
      max_stock_online: 200.00,
      stock_online: 599.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_cubes_shelf_6',
    name: 'כוורת 6 תאים / מעמד מדפים',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['כוורת 6 תאים / מעמד מדפים', 'כוורת 6 תאים', 'מעמד מדפים', 'כוורת'],
    prices: {
      rami_levy: 139.90,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 119.90,
      hastock: 159.90,
      max_stock_online: 180.00,
      stock_online: 199.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_shoes_closet_wood',
    name: 'ארון נעליים עץ מעוצב',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['ארון נעליים עץ', 'ארון נעליים', 'מעמד נעליים'],
    prices: {
      rami_levy: 219.00,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 200.00,
      hastock: 249.90,
      max_stock_online: 240.00,
      stock_online: 280.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_clothes_hanger_stand',
    name: 'מעמד תליית בגדים כפול מתכוונן',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['מעמד תליית בגדים', 'מתלה בגדים', 'קולב עומד'],
    prices: {
      rami_levy: 169.90,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 199.90,
      hastock: 179.90,
      max_stock_online: 220.00,
      stock_online: 230.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_side_tables_bamboo',
    name: 'זוג שידות צד + מעמד במבוק',
    category: 'furniture',
    unit: 'סט',
    aliases: ['זוג שידות צד + מעמד במבוק', 'זוג שידות צד', 'שידות צד', 'מעמד במבוק'],
    prices: {
      rami_levy: 199.70,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 179.70,
      hastock: 219.70,
      max_stock_online: 229.00,
      stock_online: 249.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריית כלי עבודה ו-DIY (diy)
  // ==========================================
  {
    id: 'p_hand_tools_kit',
    name: 'ערכת כלי עבודה ידניים מקיפה',
    category: 'diy',
    unit: 'ערכה',
    aliases: ['ערכת כלי עבודה ידניים', 'ערכת כלי עבודה', 'כלי עבודה', 'ערכת 12 כלים'],
    prices: {
      rami_levy: 29.90, // כולל ערכת 12 כלים ב-10 ₪
      shufersal: 49.90,
      yohananof: 39.90,
      carrefour: 44.90,
      osher_ad: 34.90,
      victory: 44.90,
      max_stock: 68.50,
      hastock: 79.90,
      max_stock_online: 75.00,
      stock_online: 79.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: true,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_cordless_drill',
    name: 'מברגה / מקדחה נטענת',
    category: 'diy',
    unit: 'יח׳',
    aliases: ['מברגה/מקדחה נטענת', 'מברגה נטענת', 'מקדחה נטענת', 'מברגה'],
    prices: {
      rami_levy: 59.90, // DeWalt בשיתוף עץ האורן
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 50.00, // גנרית 3.6V
      hastock: 69.90,
      max_stock_online: 69.00,
      stock_online: 79.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_paint_seal_kit',
    name: 'ערכת צביעה ואיטום לבית',
    category: 'diy',
    unit: 'ערכה',
    aliases: ['ערכת צביעה ואיטום', 'ערכת צביעה', 'מברשות ורולר צבע', 'איטום'],
    prices: {
      rami_levy: 44.90,
      shufersal: 64.90,
      yohananof: 52.00,
      carrefour: 59.90,
      osher_ad: null,
      victory: 59.90,
      max_stock: 56.80,
      hastock: 64.90,
      max_stock_online: 59.00,
      stock_online: 65.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: false,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריית אקססוריז ותאורה (decor)
  // ==========================================
  {
    id: 'p_body_mirror',
    name: 'מראת גוף גדולה מעוצבת',
    category: 'decor',
    unit: 'יח׳',
    aliases: ['מראת גוף', 'מראה עומדת', 'מראה גדולה', 'מראה'],
    prices: {
      rami_levy: 99.90,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 99.90,
      hastock: 119.90,
      max_stock_online: 129.00,
      stock_online: 149.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_carpet_120_180',
    name: 'שטיח סלון 120x180 ס״מ',
    category: 'decor',
    unit: 'יח׳',
    aliases: ['שטיח סלון 120x180', 'שטיח סלון', 'שטיח 120x180', 'שטיח'],
    prices: {
      rami_levy: 109.90,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 99.90,
      hastock: 129.90,
      max_stock_online: 120.00,
      stock_online: 135.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_curtains_rod_pair',
    name: 'זוג וילונות + מוט תלייה',
    category: 'decor',
    unit: 'סט',
    aliases: ['זוג וילונות + מוט', 'וילונות ומוט', 'זוג וילונות', 'וילון'],
    prices: {
      rami_levy: 59.80,
      shufersal: 89.90,
      yohananof: 69.90,
      carrefour: 74.90,
      osher_ad: null,
      victory: 74.90,
      max_stock: 61.70,
      hastock: 79.80,
      max_stock_online: 69.00,
      stock_online: 79.00
    },
    inStock: {
      rami_levy: true,
      shufersal: true,
      yohananof: true,
      carrefour: true,
      osher_ad: false,
      victory: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_artificial_tree_cushions',
    name: 'עץ מלאכותי + עציצים + כריות נוי',
    category: 'decor',
    unit: 'ערכה',
    aliases: ['עץ מלאכותי + עציצים + כריות נוי', 'עץ מלאכותי ועציצים', 'עציצים וכריות נוי', 'עץ מלאכותי'],
    prices: {
      rami_levy: 119.60,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 121.50,
      hastock: 139.60,
      max_stock_online: 135.00,
      stock_online: 145.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_lighting_package',
    name: 'חבילת תאורה 3 קנים + מנורת שולחן + נורות',
    category: 'decor',
    unit: 'ערכה',
    aliases: ['חבילת תאורה 3 קנים + מנורת שולחן + נורות', 'חבילת תאורה', 'גוף תאורה 3 קנים', 'מנורת שולחן ונורות'],
    prices: {
      rami_levy: 119.70,
      shufersal: null,
      yohananof: null,
      carrefour: null,
      osher_ad: null,
      victory: null,
      max_stock: 120.70,
      hastock: 149.70,
      max_stock_online: 139.00,
      stock_online: 159.00
    },
    inStock: {
      rami_levy: true,
      shufersal: false,
      yohananof: false,
      carrefour: false,
      osher_ad: false,
      victory: false,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  }
];

// ==========================================
// סלי קניות מוכנים מראש לטעינה מהירה
// ==========================================

// סל מלא של כל 27 פריטי מעבר לדירה שכורה
export const RENTAL_APARTMENT_BASKET = `סיר בישול 24 ס״מ
סוטאז׳ 28 ס״מ עם מכסה
זוג מחבתות נון-סטיק
סט 12 צלחות אוכל
סט סכו״ם 24 חלקים
סט 6 כוסות שתייה + 6 מאגים
מייבש כלים דו-קומתי
10 קופסאות אחסון + מסננת וששת
ערכת ניקיון מלאה דלי+מגב+סמרטוטים+חומרים
סל כביסה + אטבים + שקיות רשת
אבזור אמבטיה ללא קידוח מסדרת OCEAN
שטיח אמבטיה + שטיח כניסה
2 מגבות גוף + 2 פנים + מגבות מטבח
סט מצעים זוגי + זוג כריות שינה
שולחן סלון / זוג שולחנות קפה
כוורת 6 תאים / מעמד מדפים
ארון נעליים עץ מעוצב
מעמד תליית בגדים כפול מתכוונן
זוג שידות צד + מעמד במבוק
ערכת כלי עבודה ידניים מקיפה
מברגה / מקדחה נטענת
ערכת צביעה ואיטום לבית
מראת גוף גדולה מעוצבת
שטיח סלון 120x180 ס״מ
זוג וילונות + מוט תלייה
עץ מלאכותי + עציצים + כריות נוי
חבילת תאורה 3 קנים + מנורת שולחן + נורות`;

// סל מוצרי מזון וסופרמרקט שבועי
export const WEEKLY_GROCERY_BASKET = `שוקולית עלית 500 גרם
קטשופ אסם עשיר 750 גרם
2 חלב תנובה 3% 1 ליטר
ביצים גודל L (מארז 12)
קפה שחור עלית עם הל 100 גרם
שמן קנולה מזוכך 1 ליטר
טחינה גולמית מובחרת 500 גרם
שימורי טונה סטארקיסט במים/שמן (רביעייה)`;

// סל ברירת מחדל משולב
export const INITIAL_USER_LIST = `שוקולית עלית 500 גרם
קטשופ אסם עשיר 750 גרם
2 חלב תנובה 3% 1 ליטר
סיר בישול 24 ס״מ
זוג מחבתות נון-סטיק
סט 12 צלחות אוכל
ערכת ניקיון מלאה דלי+מגב+סמרטוטים+חומרים
סט מצעים זוגי + זוג כריות שינה
שולחן סלון / זוג שולחנות קפה
ערכת כלי עבודה ידניים מקיפה
מברגה / מקדחה נטענת
מראת גוף גדולה מעוצבת`;
