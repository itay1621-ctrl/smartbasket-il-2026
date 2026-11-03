// נתוני רשתות ומוצרים מעודכנים לשנת 2026 - מאגר הייחוס המלא למעבר לדירה שכורה ומוצרי צריכה שוטפים

export const STORES_METADATA = {
  rami_levy: {
    id: 'rami_levy',
    name: 'רמי לוי (שיווק השקמה / אונליין)',
    shortName: 'רמי לוי',
    color: '#0284c7', // Blue
    badgeColor: 'bg-blue-600',
    type: 'היברידי (סניפים + אונליין)',
    baseDeliveryFee: 35.9,
    freeDeliveryThreshold: 0, // ללא סף משלוח חינם בשנת 2026
    minOrder: 100,
    deliveryNote: 'משלוח עד הבית ₪35.90 קבוע (ללא סף חינם)',
    iconText: 'רמי לוי'
  },
  max_stock: {
    id: 'max_stock',
    name: 'מקס סטוק (סניפים פיזיים)',
    shortName: 'מקס סטוק',
    color: '#e11d48', // Red
    badgeColor: 'bg-rose-600',
    type: 'סניפים בלבד',
    baseDeliveryFee: 0, // In-store pickup by default
    freeDeliveryThreshold: 0,
    minOrder: 0,
    deliveryNote: 'איסוף עצמי בסניף (₪0)',
    iconText: 'מקס'
  },
  hastock: {
    id: 'hastock',
    name: 'הסטוק (סניפים + משלוחים)',
    shortName: 'הסטוק',
    color: '#ea580c', // Orange
    badgeColor: 'bg-orange-600',
    type: 'סניפים + משלוחים',
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
    type: 'אתר ייעודי למשלוחים',
    baseDeliveryFee: 99.0, // 99 ₪ לפריט ראשון + 70 ₪ לכל פריט נוסף
    perAdditionalItemFee: 70.0,
    freeDeliveryThreshold: 0, // ללא סף משלוח חינם במשלוח עד הבית
    minOrder: 80,
    deliveryNote: '₪99 לפריט 1 + ₪70 לכל פריט נוסף (איסוף חינם קיסריה/אשדוד)',
    iconText: 'מקס אונליין'
  },
  stock_online: {
    id: 'stock_online',
    name: 'סטוק אונליין (Stock Online)',
    shortName: 'סטוק אונליין',
    color: '#059669', // Emerald
    badgeColor: 'bg-emerald-600',
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
  { id: 'kitchen', name: 'מטבח', icon: '🍳' },
  { id: 'cleaning_bath', name: 'ניקיון ואמבטיה', icon: '🧼' },
  { id: 'textile', name: 'טקסטיל', icon: '🛏️' },
  { id: 'furniture', name: 'ריהוט ואחסון', icon: '🛋️' },
  { id: 'diy', name: 'כלי עבודה ו-DIY', icon: '🔧' },
  { id: 'decor', name: 'אקססוריז ותאורה', icon: '💡' },
  { id: 'food', name: 'מזון ומכולת', icon: '🍏' }
];

export const CATALOG_PRODUCTS = [
  // ==========================================
  // קטגוריה 1: מטבח (kitchen) - 8 פריטים
  // ==========================================
  {
    id: 'p_pot_24',
    name: 'סיר בישול 24 ס״מ',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['סיר 24 ס"מ', 'סיר 24 ס״מ', 'סיר 24', 'סיר', 'סיר בישול', 'סיר נון סטיק'],
    prices: {
      max_stock: 69.00,
      hastock: 49.90,
      rami_levy: 59.90,
      max_stock_online: 75.00,
      stock_online: 79.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 79.00,
      hastock: 69.90,
      rami_levy: 69.90,
      max_stock_online: 85.00,
      stock_online: 89.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 84.00,
      hastock: 69.90,
      rami_levy: 59.90,
      max_stock_online: 89.00,
      stock_online: 95.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 39.90,
      hastock: 49.90,
      rami_levy: 29.90,
      max_stock_online: 45.00,
      stock_online: 49.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 20.90,
      hastock: 29.90,
      rami_levy: 19.90,
      max_stock_online: 25.00,
      stock_online: 29.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 46.80,
      hastock: 49.90,
      rami_levy: 39.80,
      max_stock_online: 49.00,
      stock_online: 55.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 30.00,
      hastock: 39.90,
      rami_levy: 29.90,
      max_stock_online: 35.00,
      stock_online: 39.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
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
      max_stock: 45.80,
      hastock: 49.90,
      rami_levy: 32.80, // כולל מסננת ב-2.90 ₪ ברמי לוי
      max_stock_online: 49.00,
      stock_online: 52.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריה 2: ניקיון ואמבטיה (cleaning_bath) - 4 פריטים
  // ==========================================
  {
    id: 'p_cleaning_kit_full',
    name: 'ערכת ניקיון מלאה דלי+מגב+סמרטוטים+חומרי ניקוי',
    category: 'cleaning_bath',
    unit: 'ערכה',
    aliases: ['ערכת ניקיון מלאה דלי+מגב+סמרטוטים+חומרי ניקוי', 'ערכת ניקיון מלאה', 'ערכת ניקיון', 'דלי ומגב', 'חומרי ניקוי', 'דלי שטיפה ומגב'],
    prices: {
      max_stock: 59.40,
      hastock: 64.90,
      rami_levy: 49.90,
      max_stock_online: 65.00,
      stock_online: 69.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_laundry_kit',
    name: 'סל כביסה + אטבים + שקיות רשת',
    category: 'cleaning_bath',
    unit: 'ערכה',
    aliases: ['סל כביסה + אטבים + שקיות רשת', 'סל כביסה', 'אטבי כביסה', 'שקיות רשת לכביסה', 'סל כביסה ואטבים'],
    prices: {
      max_stock: 26.80,
      hastock: 29.90,
      rami_levy: 24.90,
      max_stock_online: 30.00,
      stock_online: 35.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_ocean_bath_accessories',
    name: 'אבזור אמבטיה ללא קידוח מסדרת OCEAN',
    category: 'cleaning_bath',
    unit: 'סט',
    aliases: ['אבזור אמבטיה ללא קידוח מסדרת OCEAN', 'אבזור אמבטיה ללא קידוח', 'אביזרי אמבטיה ocean', 'סדרת ocean', 'מדף אמבטיה ללא קידוח', 'מתלה אמבטיה ללא קידוח'],
    prices: {
      max_stock: 62.50,
      hastock: 69.90,
      rami_levy: 54.90,
      max_stock_online: 69.00,
      stock_online: 75.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_bath_entry_mats',
    name: 'שטיח אמבטיה + שטיח כניסה',
    category: 'cleaning_bath',
    unit: 'סט',
    aliases: ['שטיח אמבטיה + שטיח כניסה', 'שטיח אמבטיה', 'שטיח כניסה', 'שטיחון אמבטיה', 'שטיח כניסה לבית'],
    prices: {
      max_stock: 26.80,
      hastock: 29.90,
      rami_levy: 24.90,
      max_stock_online: 30.00,
      stock_online: 32.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריה 3: טקסטיל (textile) - 2 פריטים
  // ==========================================
  {
    id: 'p_towels_bundle',
    name: '2 מגבות גוף + 2 פנים + מגבות מטבח',
    category: 'textile',
    unit: 'מארז',
    aliases: ['2 מגבות גוף + 2 פנים + מגבות מטבח', '2 מגבות גוף', 'מגבות גוף ופנים', 'סט מגבות', 'מגבות גוף', 'מגבות פנים', 'מגבות מטבח'],
    prices: {
      max_stock: 73.60,
      hastock: 69.60,
      rami_levy: 59.90,
      max_stock_online: 79.00,
      stock_online: 85.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_bedding_pillows_bundle',
    name: 'סט מצעים זוגי + זוג כריות שינה',
    category: 'textile',
    unit: 'סט',
    aliases: ['סט מצעים זוגי + זוג כריות שינה', 'סט מצעים זוגי', 'מצעים זוגיים', 'כריות שינה', 'סט מצעים וכריות', 'מצעים וכריות'],
    prices: {
      max_stock: 119.80,
      hastock: 109.80,
      rami_levy: 99.80,
      max_stock_online: 129.00,
      stock_online: 139.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריה 4: ריהוט ואחסון (furniture) - 5 פריטים
  // ==========================================
  {
    id: 'p_coffee_tables',
    name: 'שולחן סלון / זוג שולחנות קפה',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['שולחן סלון / זוג שולחנות קפה', 'שולחן סלון', 'זוג שולחנות קפה', 'שולחנות קפה', 'שולחן קפה', 'שולחן סלון קטן'],
    prices: {
      max_stock: 119.90,
      hastock: 149.90,
      rami_levy: 129.90,
      max_stock_online: 200.00,
      stock_online: 599.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_cube_shelf_6',
    name: 'כוורת 6 תאים / מעמד מדפים',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['כוורת 6 תאים / מעמד מדפים', 'כוורת 6 תאים', 'מעמד מדפים', 'כוורת', 'כוורת אחסון', 'מדפים'],
    prices: {
      max_stock: 119.90,
      hastock: 159.90,
      rami_levy: 139.90,
      max_stock_online: 180.00,
      stock_online: 199.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_shoe_cabinet_wood',
    name: 'ארון נעליים עץ',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['ארון נעליים עץ', 'ארון נעליים', 'מעמד נעליים', 'שידת נעליים'],
    prices: {
      max_stock: 200.00,
      hastock: 249.90,
      rami_levy: 219.00,
      max_stock_online: 240.00,
      stock_online: 280.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_clothes_hanger_stand',
    name: 'מעמד תליית בגדים',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['מעמד תליית בגדים', 'סטנד בגדים', 'מתלה בגדים', 'קולב עומד', 'מתקן תליית בגדים'],
    prices: {
      max_stock: 199.90,
      hastock: 179.90,
      rami_levy: 169.90,
      max_stock_online: 220.00,
      stock_online: 230.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_side_tables_bamboo',
    name: 'זוג שידות צד + מעמד במבוק',
    category: 'furniture',
    unit: 'סט',
    aliases: ['זוג שידות צד + מעמד במבוק', 'זוג שידות צד', 'שידות צד', 'מעמד במבוק', 'שידת לילה', 'שידות לילה'],
    prices: {
      max_stock: 179.70,
      hastock: 219.70,
      rami_levy: 199.70,
      max_stock_online: 229.00,
      stock_online: 249.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריה 5: כלי עבודה ו-DIY (diy) - 3 פריטים
  // ==========================================
  {
    id: 'p_hand_tools_kit',
    name: 'ערכת כלי עבודה ידניים',
    category: 'diy',
    unit: 'ערכה',
    aliases: ['ערכת כלי עבודה ידניים', 'ערכת כלי עבודה', 'כלי עבודה ידניים', 'כלי עבודה', 'ארגז כלים', 'סט כלי עבודה'],
    prices: {
      max_stock: 68.50,
      hastock: 79.90,
      rami_levy: 29.90, // כולל ערכת 12 כלים ב-10 ₪ ברמי לוי
      max_stock_online: 75.00,
      stock_online: 79.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_cordless_drill',
    name: 'מברגה/מקדחה נטענת',
    category: 'diy',
    unit: 'יח׳',
    aliases: ['מברגה/מקדחה נטענת', 'מברגה נטענת', 'מקדחה נטענת', 'מברגה', 'מקדחה'],
    prices: {
      max_stock: 50.00, // גנרית 3.6V במקס סטוק
      hastock: 69.90,
      rami_levy: 59.90, // עבור DeWalt בשיתוף עץ האורן
      max_stock_online: 69.00,
      stock_online: 79.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_paint_seal_kit',
    name: 'ערכת צביעה ואיטום',
    category: 'diy',
    unit: 'ערכה',
    aliases: ['ערכת צביעה ואיטום', 'ערכת צביעה', 'צביעה ואיטום', 'רולר ומברשות', 'סיליקון איטום'],
    prices: {
      max_stock: 56.80,
      hastock: 64.90,
      rami_levy: 44.90,
      max_stock_online: 59.00,
      stock_online: 65.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // קטגוריה 6: אקססוריז ותאורה / עיצוב הבית (decor) - 5 פריטים
  // ==========================================
  {
    id: 'p_full_length_mirror',
    name: 'מראת גוף',
    category: 'decor',
    unit: 'יח׳',
    aliases: ['מראת גוף', 'מראה עומדת', 'מראת קיר', 'מראה גדולה', 'מראה'],
    prices: {
      max_stock: 99.90,
      hastock: 119.90,
      rami_levy: 99.90,
      max_stock_online: 129.00,
      stock_online: 149.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_living_rug_120x180',
    name: 'שטיח סלון 120x180',
    category: 'decor',
    unit: 'יח׳',
    aliases: ['שטיח סלון 120x180', 'שטיח סלון', 'שטיח 120x180', 'שטיח לסלון', 'שטיח'],
    prices: {
      max_stock: 99.90,
      hastock: 129.90,
      rami_levy: 109.90,
      max_stock_online: 120.00,
      stock_online: 135.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_curtains_rod_pair',
    name: 'זוג וילונות + מוט',
    category: 'decor',
    unit: 'סט',
    aliases: ['זוג וילונות + מוט', 'זוג וילונות ומוט', 'וילונות ומוט', 'וילונות', 'זוג וילונות', 'מוט וילון'],
    prices: {
      max_stock: 61.70,
      hastock: 79.80,
      rami_levy: 59.80,
      max_stock_online: 69.00,
      stock_online: 79.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_decor_plants_cushions',
    name: 'עץ מלאכותי + עציצים + כריות נוי',
    category: 'decor',
    unit: 'סט',
    aliases: ['עץ מלאכותי + עציצים + כריות נוי', 'עץ מלאכותי', 'עציצים וכריות נוי', 'כריות נוי', 'עציצים', 'דקורציה'],
    prices: {
      max_stock: 121.50,
      hastock: 139.60,
      rami_levy: 119.60,
      max_stock_online: 135.00,
      stock_online: 145.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_lighting_package',
    name: 'חבילת תאורה 3 קנים + מנורת שולחן + נורות',
    category: 'decor',
    unit: 'חבילה',
    aliases: ['חבילת תאורה 3 קנים + מנורת שולחן + נורות', 'חבילת תאורה', 'גוף תאורה 3 קנים', 'מנורת שולחן', 'תאורה ונורות'],
    prices: {
      max_stock: 120.70,
      hastock: 149.70,
      rami_levy: 119.70,
      max_stock_online: 139.00,
      stock_online: 159.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },

  // ==========================================
  // מוצרי מזון בסיסיים (food)
  // ==========================================
  {
    id: 'p_shokolit',
    name: 'שוקולית עלית 500 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['שוקולית עלית', 'שוקולית', 'אבקת שוקולית', 'עלית שוקולית'],
    prices: {
      max_stock: 14.20,
      hastock: 14.20,
      rami_levy: 14.90,
      max_stock_online: 14.50,
      stock_online: 15.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_ketchup_osem',
    name: 'קטשופ אסם עשיר 750 גרם',
    category: 'food',
    unit: 'בקבוק',
    aliases: ['קטשופ אסם', 'קטשופ', 'קטשופ אוסם', 'אסם קטשופ'],
    prices: {
      max_stock: 10.90,
      hastock: 10.90,
      rami_levy: 10.90,
      max_stock_online: 11.50,
      stock_online: 12.00
    },
    inStock: {
      max_stock: true,
      hastock: true,
      rami_levy: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_milk',
    name: 'חלב תנובה 3% 1 ליטר',
    category: 'food',
    unit: 'יח׳',
    aliases: ['חלב', 'חלב תנובה', 'חלב 3%', 'תנובה', 'קרטון חלב'],
    prices: {
      rami_levy: 7.11,
      max_stock: 6.90,
      hastock: 7.20,
      max_stock_online: 7.10,
      stock_online: 7.50
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_eggs',
    name: 'ביצים גודל L (מארז 12)',
    category: 'food',
    unit: 'מארז',
    aliases: ['ביצים', 'ביצים L', 'תבנית ביצים', 'ביצי עוף'],
    prices: {
      rami_levy: 13.90,
      max_stock: 13.50,
      hastock: 14.50,
      max_stock_online: 14.00,
      stock_online: null
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: false
    }
  },
  {
    id: 'p_coffee',
    name: 'קפה שחור עלית עם הל 100 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['קפה', 'קפה שחור', 'קפה עלית', 'קפה טורקי', 'קפה עם הל'],
    prices: {
      rami_levy: 9.90,
      max_stock: 8.50,
      hastock: 8.90,
      max_stock_online: 8.90,
      stock_online: 9.50
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_oil',
    name: 'שמן קנולה מזוכך 1 ליטר',
    category: 'food',
    unit: 'בקבוק',
    aliases: ['שמן', 'שמן קנולה', 'שמן לטיגון'],
    prices: {
      rami_levy: 8.90,
      max_stock: 9.90,
      hastock: 9.50,
      max_stock_online: 9.90,
      stock_online: 10.90
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_tahini',
    name: 'טחינה גולמית מובחרת 500 גרם',
    category: 'food',
    unit: 'יח׳',
    aliases: ['טחינה', 'טחינה גולמית', 'טחינה הר ברכה', 'טחינה אל ארז'],
    prices: {
      rami_levy: 13.90,
      max_stock: 12.00,
      hastock: 12.90,
      max_stock_online: 12.50,
      stock_online: 13.50
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  },
  {
    id: 'p_tuna',
    name: 'שימורי טונה סטארקיסט (רביעייה)',
    category: 'food',
    unit: 'מארז',
    aliases: ['טונה', 'שימורי טונה', 'טונה רביעיה', 'סטארקיסט'],
    prices: {
      rami_levy: 22.90,
      max_stock: 21.00,
      hastock: 21.90,
      max_stock_online: 21.90,
      stock_online: 23.50
    },
    inStock: {
      rami_levy: true,
      max_stock: true,
      hastock: true,
      max_stock_online: true,
      stock_online: true
    }
  }
];

export const INITIAL_USER_LIST = `סיר 24 ס"מ
סוטאז' 28 ס"מ
זוג מחבתות
סט 12 צלחות
סט סכו"ם 24 חלקים
ערכת ניקיון מלאה דלי+מגב+סמרטוטים+חומרי ניקוי
סט מצעים זוגי + זוג כריות שינה
שולחן סלון / זוג שולחנות קפה
מברגה/מקדחה נטענת
מראת גוף
שוקולית עלית
חלב תנובה 3%`;
