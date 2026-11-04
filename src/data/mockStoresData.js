// src/data/mockStoresData.js
// נתוני 7 רשתות הסופרמרקטים המובילות בישראל בלבד לשנת 2026

export const STORES_METADATA = {
  rami_levy: {
    id: "rami_levy",
    name: "רמי לוי שיווק השקמה",
    shortName: "רמי לוי",
    color: "#0284c7",
    badgeColor: "bg-sky-600",
    sector: "supermarket",
    sectorLabel: "רשת מזון וסופרמרקט",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.90,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪35.90 קבוע (איסוף עצמי בסניף ₪0)",
    iconText: "רמי לוי"
  },
  osher_ad: {
    id: "osher_ad",
    name: "אושר עד",
    shortName: "אושר עד",
    color: "#d97706",
    badgeColor: "bg-amber-600",
    sector: "supermarket",
    sectorLabel: "דיסקאונט ומארזים",
    type: "סניפים פיזיים בלבד",
    baseDeliveryFee: 0,
    freeDeliveryThreshold: 0,
    minOrder: 0,
    deliveryNote: "סניף פיזי בלבד (ללא שירות משלוחים, איסוף ₪0)",
    iconText: "אושר עד"
  },
  yochananof: {
    id: "yochananof",
    name: "יוחננוף",
    shortName: "יוחננוף",
    color: "#dc2626",
    badgeColor: "bg-red-600",
    sector: "supermarket",
    sectorLabel: "רשת סופרמרקטים",
    type: "סניפים + אונליין",
    baseDeliveryFee: 32.00,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪32.00 (איסוף עצמי בסניף ₪0)",
    iconText: "יוחננוף"
  },
  shufersal_deal: {
    id: "shufersal_deal",
    name: "שופרסל דיל / אונליין",
    shortName: "שופרסל דיל",
    color: "#059669",
    badgeColor: "bg-emerald-600",
    sector: "supermarket",
    sectorLabel: "רשת מזון ארצית",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.00,
    freeDeliveryThreshold: 0,
    minOrder: 150,
    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף עצמי בסניף ₪0)",
    iconText: "שופרסל"
  },
  carrefour: {
    id: "carrefour",
    name: "קרפור היפר",
    shortName: "קרפור",
    color: "#2563eb",
    badgeColor: "bg-blue-600",
    sector: "supermarket",
    sectorLabel: "רשת בינלאומית",
    type: "סניפים + אונליין",
    baseDeliveryFee: 34.00,
    freeDeliveryThreshold: 450,
    minOrder: 120,
    deliveryNote: "משלוח ₪34.00 (חינם מעל ₪450, איסוף בסניף ₪0)",
    iconText: "קרפור"
  },
  victory: {
    id: "victory",
    name: "ויקטורי",
    shortName: "ויקטורי",
    color: "#7c3aed",
    badgeColor: "bg-purple-600",
    sector: "supermarket",
    sectorLabel: "רשת סופרמרקטים",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.00,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף עצמי בסניף ₪0)",
    iconText: "ויקטורי"
  },
  hazi_hinam: {
    id: "hazi_hinam",
    name: "חצי חינם",
    shortName: "חצי חינם",
    color: "#16a34a",
    badgeColor: "bg-green-600",
    sector: "supermarket",
    sectorLabel: "רשת מזון גדולה",
    type: "סניפים + אונליין",
    baseDeliveryFee: 35.00,
    freeDeliveryThreshold: 0,
    minOrder: 100,
    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף עצמי בסניף ₪0)",
    iconText: "חצי חינם"
  }
};

export const SUPERMARKET_CHAINS = Object.keys(STORES_METADATA);

// 14 מחלקות סופרמרקט רשמיות
export const CATEGORIES = [
  { id: "all", name: "הכל (1,035+ מוצרים)", icon: "✨" },
  { id: "deli_cheese", name: "מעדנייה וגבינות במשקל", icon: "🧀" },
  { id: "dairy_eggs", name: "חלב וביצים", icon: "🥛" },
  { id: "produce", name: "פירות וירקות", icon: "🍅" },
  { id: "meat_fish", name: "בשר ודגים", icon: "🍗" },
  { id: "bakery", name: "לחם ומאפים", icon: "🥖" },
  { id: "canned_cooking", name: "מזווה ובישול", icon: "🍝" },
  { id: "grains_pasta", name: "דגנים ופסטות", icon: "🌾" },
  { id: "frozen", name: "קפואים", icon: "❄️" },
  { id: "snacks_sweets", name: "חטיפים ומתוקים", icon: "🍫" },
  { id: "beverages_alcohol", name: "שתייה", icon: "🥤" },
  { id: "coffee_tea", name: "קפה ותה", icon: "☕" },
  { id: "baby_pharm", name: "תינוקות ופארם", icon: "👶" },
  { id: "cleaning_disposable", name: "ניקיון ופארם", icon: "🧼" }
];

export const INITIAL_USER_LIST = [
  "חלב תנובה 3% בקרטון 1 ליטר (פיקוח)",
  "תבנית 12 ביצים L (פיקוח)",
  "גבינה לבנה תנובה 5% 250 גרם (פיקוח)",
  "קוטג׳ תנובה 5% 250 גרם",
  "גבינה צהובה עמק תנובה 28% פרוסה 200 גרם",
  "לחם אחיד כהה פרוס 750 גרם (פיקוח)",
  "עגבניות חממה טריות (ק״ג)",
  "מלפפונים ירוקים טריים (ק״ג)",
  "בצל יבש מובחר (ק״ג)",
  "תפוחי אדמה לבנים בשקית (ק״ג)",
  "חזה עוף טרי פרוס לשניצל (ק״ג)",
  "אורז פרסי קלאסי סוגת 1 ק״ג",
  "פסטה ספגטי מס' 5 ברילה 500 גרם",
  "שמן קנולה מזוכך 1 ליטר",
  "קפה שחור קלוי וטחון עלית 100 גרם",
  "קפה נמס נסקפה טייסטרס צ׳ויס Nescafe 200 גרם",
  "נוזל לניקוי כלים פיירי Fairy לימון 650 מ״ל",
  "נייר טואלט לילי פרימיום דו-שכבתי 32 גלילים",
  "חטיף בוטנים במבה אסם 80 גרם",
  "טונה בהירה בשמן צמחי מארז רביעייה (4x140 גרם)"
].join("\n");
