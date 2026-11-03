import { GROCERY_PRODUCTS } from "./groceryCatalogData.js";
import { STOCK_PRODUCTS } from "./stockCatalogData.js";

// נתוני רשתות ומוצרים מעודכנים לשנת 2026 - סופרמרקטים + רשתות סטוק וכלי בית

export const STORES_METADATA = {
  // ==========================================
  // רשתות מזון וסופרמרקטים מובילים בישראל
  // ==========================================
  rami_levy: {
    id: "rami_levy",
    name: "רמי לוי (שיווק השקמה / אונליין / סטוק)",
    shortName: "רמי לוי",
    color: "#0284c7",
    badgeColor: "bg-blue-600",
    sector: "food",
    sectorLabel: "סופרמרקט + סטוק ענק",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.9,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪35.90 קבוע (איסוף בסניף ₪0)",
    iconText: "רמי לוי"
  },
  shufersal: {
    id: "shufersal",
    name: "שופרסל (דיל / שלי / אונליין)",
    shortName: "שופרסל",
    color: "#059669",
    badgeColor: "bg-emerald-600",
    sector: "food",
    sectorLabel: "רשת מזון וסופרמרקט",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.0,
    freeDeliveryThreshold: 0,
    minOrder: 150,
    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף בסניף ₪0)",
    iconText: "שופרסל"
  },
  yohananof: {
    id: "yohananof",
    name: "סופרשוק יוחננוף",
    shortName: "יוחננוף",
    color: "#dc2626",
    badgeColor: "bg-red-600",
    sector: "food",
    sectorLabel: "רשת מזון ולואו-קוסט",
    type: "סניפים + אונליין",
    baseDeliveryFee: 32.0,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪32.00 (איסוף בסניף ₪0)",
    iconText: "יוחננוף"
  },
  carrefour: {
    id: "carrefour",
    name: "קרפור ישראל (Carrefour)",
    shortName: "קרפור",
    color: "#2563eb",
    badgeColor: "bg-blue-600",
    sector: "food",
    sectorLabel: "רשת מזון בינלאומית",
    type: "סניפים + אונליין",
    baseDeliveryFee: 34.0,
    freeDeliveryThreshold: 450,
    minOrder: 120,
    deliveryNote: "משלוח ₪34.00 (חינם מעל ₪450, איסוף ₪0)",
    iconText: "קרפור"
  },
  osher_ad: {
    id: "osher_ad",
    name: "אושר עד (סניפי דיסקאונט ומארזים)",
    shortName: "אושר עד",
    color: "#d97706",
    badgeColor: "bg-amber-600",
    sector: "food",
    sectorLabel: "דיסקאונט מארזי ענק",
    type: "סניפים בלבד",
    baseDeliveryFee: 0,
    freeDeliveryThreshold: 0,
    minOrder: 0,
    deliveryNote: "סניפים בלבד (ללא משלוח ישיר, איסוף ₪0)",
    iconText: "אושר עד"
  },
  victory: {
    id: "victory",
    name: "ויקטורי (סופרמרקט / אונליין)",
    shortName: "ויקטורי",
    color: "#7c3aed",
    badgeColor: "bg-purple-600",
    sector: "food",
    sectorLabel: "רשת סופרמרקטים",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.0,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף בסניף ₪0)",
    iconText: "ויקטורי"
  },

  // ==========================================
  // רשתות הסטוק והלואו-קוסט המובילות בישראל
  // ==========================================
  max_stock: {
    id: "max_stock",
    name: "מקס סטוק (סניפים פיזיים)",
    shortName: "מקס סטוק",
    color: "#e11d48",
    badgeColor: "bg-rose-600",
    sector: "stock",
    sectorLabel: "רשת סטוק וכלי בית",
    type: "סניפים בלבד (64 סניפים)",
    baseDeliveryFee: 0,
    freeDeliveryThreshold: 0,
    minOrder: 0,
    deliveryNote: "איסוף עצמי בסניף (₪0)",
    iconText: "מקס סטוק"
  },
  hastock: {
    id: "hastock",
    name: "הסטוק (רשת הסטוק)",
    shortName: "הסטוק",
    color: "#ea580c",
    badgeColor: "bg-orange-600",
    sector: "stock",
    sectorLabel: "רשת סטוק וכלי בית",
    type: "סניפים + משלוחים (51 סניפים)",
    baseDeliveryFee: 35.0,
    freeDeliveryThreshold: 350,
    minOrder: 50,
    deliveryNote: "משלוח עד הבית ₪35 (חינם מעל ₪350, איסוף ₪0)",
    iconText: "הסטוק"
  },
  max_stock_online: {
    id: "max_stock_online",
    name: "מקס סטוק אונליין",
    shortName: "מקס אונליין",
    color: "#9333ea",
    badgeColor: "bg-purple-600",
    sector: "stock",
    sectorLabel: "אתר ייעודי לריהוט וסטוק",
    type: "משלוחים בלבד",
    baseDeliveryFee: 99.0,
    perAdditionalItemFee: 70.0,
    freeDeliveryThreshold: 0,
    minOrder: 80,
    deliveryNote: "₪99 לפריט 1 + ₪70 לכל פריט נוסף (איסוף חינם קיסריה/אשדוד)",
    iconText: "מקס אונליין"
  },
  stock_online: {
    id: "stock_online",
    name: "סטוק אונליין (Stock Online)",
    shortName: "סטוק אונליין",
    color: "#10b981",
    badgeColor: "bg-emerald-600",
    sector: "stock",
    sectorLabel: "חנות מקוונת לבית ולסטוק",
    type: "חנות מקוונת בלבד",
    baseDeliveryFee: 70.0,
    freeDeliveryThreshold: 299,
    minOrder: 50,
    deliveryNote: "משלוח ₪70 (משלוח חינם מעל ₪299)",
    iconText: "סטוק Online"
  }
};

export const CATEGORIES = [
  { id: "all", name: "כל המוצרים (630+)", icon: "🛒" },
  { id: "dairy_eggs", name: "חלב, גבינות וביצים", icon: "🥛" },
  { id: "produce", name: "פירות, ירקות ועשבי תיבול", icon: "🍎" },
  { id: "meat_fish", name: "בשר, עוף, דגים וקפואים", icon: "🍗" },
  { id: "bakery", name: "לחם, מאפים ובצקים", icon: "🥖" },
  { id: "pantry", name: "מזווה, שימורים ושמנים", icon: "🥫" },
  { id: "spices_baking", name: "תבלינים ואפייה ביתית", icon: "🧂" },
  { id: "salads_dips", name: "סלטים מוכנים וממרחים", icon: "🥗" },
  { id: "snacks_drinks", name: "שתייה, קפה, אלכוהול וחטיפים", icon: "☕" },
  { id: "frozen_sweets", name: "גלידות וקינוחים קפואים", icon: "🍦" },
  { id: "baby", name: "מוצרי תינוקות", icon: "👶" },
  { id: "cleaning_bath", name: "ניקיון, כביסה ופארם", icon: "🧼" },
  { id: "disposable_party", name: "חד-פעמי, מנגל וחיות מחמד", icon: "🍽️" },
  { id: "kitchen", name: "כלי בית, בישול ואירוח", icon: "🍳" },
  { id: "furniture", name: "ריהוט, אחסון וארגון", icon: "🛋️" },
  { id: "diy", name: "כלי עבודה, חשמל ו-DIY", icon: "🔧" },
  { id: "decor", name: "טקסטיל, עיצוב ואמבטיה", icon: "💡" }
];

export const CATALOG_PRODUCTS = [...GROCERY_PRODUCTS, ...STOCK_PRODUCTS];

export const WEEKLY_GROCERY_BASKET = [
  "תבנית 12 ביצים L (פיקוח)",
  "חלב תנובה 3% בקרטון 1 ליטר (פיקוח)",
  "גבינה צהובה עמק תנובה 28% פרוסה 200 גרם",
  "קוטג׳ תנובה 5% 250 גרם",
  "גבינה לבנה תנובה 5% 250 גרם (פיקוח)",
  "לחם אחיד כהה פרוס 750 גרם (פיקוח)",
  "עגבניות חממה טריות (ק״ג)",
  "מלפפונים ירוקים טריים (ק״ג)",
  "בצל יבש מובחר (ק״ג)",
  "תפוחי אדמה לבנים בשקית (ק״ג)",
  "חזה עוף טרי פרוס לשניצל (ק״ג)",
  "אורז פרסי קלאסי סוגת 1 ק״ג",
  "פסטה ברילה (ספגטי / פנה) 500 גרם",
  "שמן קנולה מזוכך 1 ליטר",
  "קפה שחור קלוי וטחון עלית 100 גרם",
  "קפה נמס נסקפה טייסטרס צ׳ויס Nescafe 200 גרם",
  "נוזל לניקוי כלים פיירי Fairy לימון 650 מ״ל",
  "נייר טואלט לילי פרימיום דו-שכבתי 32 גלילים",
  "חטיף בוטנים במבה אסם 80 גרם",
  "טונה בהירה בשמן צמחי מארז רביעייה (4x140 גרם)"
];

export const RENTAL_APARTMENT_BASKET = [
  "סיר נירוסטה / נון סטיק 24 ס״מ עם מכסה זכוכית",
  "סוטאז׳ רחב 28 ס״מ Non-Stick לבישול וצלייה",
  "זוג מחבתות Non-Stick קוטר 20 ס״מ + 24 ס״מ",
  "סט 12 צלחות אוכל פורצלן / אופל (4 מנות עיקריות, 4 עמוקות, 4 קינוח)",
  "סט סכו״ם נירוסטה 24 חלקים מלא (6 סכינים, 6 מזלגות, 6 כפות, 6 כפיות)",
  "מארז 6 כוסות שתייה קרה מזכוכית + 6 מאגים קרמיקה לקפה",
  "מייבש כלים דו-קומתי מודרני ממתכת בציפוי אל-חלד עם מגש ניקוז",
  "מארז 10 קופסאות אחסון מזון הרמטיות + מסננת נירוסטה וסט 5 כלי ששת",
  "ערכת ניקיון מלאה לדירה (דלי שטיפה + מגב סיליקון + מטאטא ויעה + 5 מטליות מיקרופייבר)",
  "סל כביסה מתקפל + מארז 48 אטבי כביסה + 3 שקיות רשת לכביסה עדינה",
  "אבזור אמבטיה ללא קידוח סדרת OCEAN (מתקן ואקום למברשות, מעמד סבון, ווים כפולים)",
  "שטיח אמבטיה ספוג זיכרון נגד החלקה + שטיח כניסה לבית",
  "2 מגבות גוף גדולות 100% כותנה + 2 מגבות פנים + 3 מגבות מטבח איכותיות",
  "סט מצעים זוגי 100% כותנה / מיקרופייבר יוקרתי + זוג כריות שינה אורתופדיות",
  "שולחן סלון מודרני / זוג שולחנות קפה עגולים בסגנון סקנדינבי",
  "כוורת 6 תאים מודולרית / מעמד מדפים לאחסון ספרים וחפצים",
  "ארון נעליים מעץ 3 תאים מתקפלים דמוי אלון / לבן",
  "מעמד מתכת נייד על גלגלים לתליית בגדים + מדף נעליים תחתון",
  "זוג שידות צד למיטה עם מגירה + מעמד מדפי במבוק",
  "ערכת כלי עבודה ידניים מלאה בארגז (פטיש, פלייר, מפתח שבדי, מטר, קאטר, סט מברגים ודיבלים)",
  "מברגה / מקדחה נטענת 12V כוללת סוללה ומטען מהיר",
  "ערכת צביעה ואיטום (רולר, מברשת, מסקינטייפ, שפכטל, שפכטל אמריקאי 1 ק״ג, אקדח סיליקון וסיליקון לבן)",
  "מראת גוף עומדת עם מסגרת דקה מודרנית (פרוטוקול פתיחה ובדיקת שבר בקופה!)",
  "שטיח סלון מודרני גיאומטרי קל לניקוי 120x180 ס״מ",
  "זוג וילונות הצללה לסלון / חדר שינה + מוט תלייה טלסקופי",
  "עץ מלאכותי דקורטיבי בוגונוויליה/פיקוס + 3 עציצים סוקולנטים + 2 כריות נוי לסלון",
  "חבילת תאורה מלאה: שנדליר 3 קנים + מנורת שולחן מודרנית + מארז 6 נורות LED חסכוניות"
];

export const MEGA_COMBINED_BASKET = [
  ...WEEKLY_GROCERY_BASKET,
  ...RENTAL_APARTMENT_BASKET
];

export const INITIAL_USER_LIST = WEEKLY_GROCERY_BASKET.join("\n");
