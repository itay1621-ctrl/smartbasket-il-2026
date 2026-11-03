const fs = require('fs');
const path = require('path');

const STORES = [
  'rami_levy', 'shufersal', 'yohananof', 'carrefour', 'osher_ad', 'victory',
  'max_stock', 'hastock', 'max_stock_online', 'stock_online'
];

const products = [
  // ==========================================
  // 1. מוצרי חלב וביצים (dairy_eggs)
  // ==========================================
  {
    id: 'p_eggs_l_12',
    name: 'תבנית 12 ביצים L (פיקוח)',
    category: 'dairy_eggs',
    unit: 'תבנית 12 יח׳',
    isRegulated: true,
    aliases: ['ביצים', 'ביצים L', 'תבנית ביצים', 'ביצים 12', 'ביצים גודל L'],
    prices: { rami_levy: 14.30, shufersal: 14.30, yohananof: 14.30, carrefour: 14.30, osher_ad: 14.30, victory: 14.30, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_eggs_xl_12',
    name: 'תבנית 12 ביצים XL',
    category: 'dairy_eggs',
    unit: 'תבנית 12 יח׳',
    aliases: ['ביצים XL', 'ביצים ענקיות', 'תבנית ביצים XL'],
    prices: { rami_levy: 15.90, shufersal: 16.90, yohananof: 15.90, carrefour: 16.50, osher_ad: 15.50, victory: 16.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_eggs_l_30',
    name: 'תבנית ענק 30 ביצים L',
    category: 'dairy_eggs',
    unit: 'תבנית 30 יח׳',
    aliases: ['תבנית 30 ביצים', '30 ביצים', 'קרטון ביצים 30', 'ביצים 30'],
    prices: { rami_levy: 33.90, shufersal: 36.90, yohananof: 34.50, carrefour: 35.90, osher_ad: 32.90, victory: 36.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_milk_3pct_carton',
    name: 'חלב תנובה 3% בקרטון 1 ליטר (פיקוח)',
    category: 'dairy_eggs',
    unit: 'ליטר',
    isRegulated: true,
    aliases: ['חלב', 'חלב 3%', 'חלב תנובה', 'קרטון חלב', 'חלב בקרטון'],
    prices: { rami_levy: 7.11, shufersal: 7.11, yohananof: 7.11, carrefour: 7.11, osher_ad: 7.11, victory: 7.11, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_milk_1pct_carton',
    name: 'חלב תנובה 1% בקרטון 1 ליטר (פיקוח)',
    category: 'dairy_eggs',
    unit: 'ליטר',
    isRegulated: true,
    aliases: ['חלב 1%', 'חלב דל שומן', 'חלב 1 אחוז'],
    prices: { rami_levy: 6.64, shufersal: 6.64, yohananof: 6.64, carrefour: 6.64, osher_ad: 6.64, victory: 6.64, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_milk_3pct_bag',
    name: 'חלב תנובה 3% בשקית 1 ליטר (פיקוח)',
    category: 'dairy_eggs',
    unit: 'ליטר',
    isRegulated: true,
    aliases: ['חלב בשקית', 'שקית חלב', 'חלב שקית 3%'],
    prices: { rami_levy: 5.94, shufersal: 5.94, yohananof: 5.94, carrefour: 5.94, osher_ad: 5.94, victory: 5.94, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_butter_tnuva_100g',
    name: 'חמאה תנובה 100 גרם (פיקוח)',
    category: 'dairy_eggs',
    unit: 'יח׳',
    isRegulated: true,
    aliases: ['חמאה', 'חמאה תנובה', 'חמאה 100 גרם', 'חמאה צהובה'],
    prices: { rami_levy: 4.44, shufersal: 4.44, yohananof: 4.44, carrefour: 4.44, osher_ad: 4.44, victory: 4.44, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cheese_emek_200g',
    name: 'גבינה צהובה עמק תנובה 28% פרוסה 200 גרם',
    category: 'dairy_eggs',
    unit: 'מארז',
    aliases: ['גבינה צהובה', 'עמק', 'גבינת עמק', 'צהובה 200 גרם', 'עמק 28%'],
    prices: { rami_levy: 13.90, shufersal: 15.90, yohananof: 14.50, carrefour: 14.90, osher_ad: 13.50, victory: 15.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cheese_noam_200g',
    name: 'גבינה צהובה נועם טרה 28% פרוסה 200 גרם',
    category: 'dairy_eggs',
    unit: 'מארז',
    aliases: ['גבינה נועם', 'נועם טרה', 'צהובה נועם'],
    prices: { rami_levy: 13.50, shufersal: 15.20, yohananof: 13.90, carrefour: 13.90, osher_ad: 12.90, victory: 14.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_white_cheese_5pct_250g',
    name: 'גבינה לבנה תנובה 5% 250 גרם (פיקוח)',
    category: 'dairy_eggs',
    unit: 'גביע',
    isRegulated: true,
    aliases: ['גבינה לבנה', 'גבינה לבנה 5%', 'לבנה תנובה', 'גבינה תנובה 250 גרם'],
    prices: { rami_levy: 5.43, shufersal: 5.43, yohananof: 5.43, carrefour: 5.43, osher_ad: 5.43, victory: 5.43, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_white_cheese_ski_250g',
    name: 'גבינה לבנה סקי שטראוס 5% 250 גרם',
    category: 'dairy_eggs',
    unit: 'גביע',
    aliases: ['גבינת סקי', 'סקי שטראוס', 'סקי 5%'],
    prices: { rami_levy: 5.90, shufersal: 6.50, yohananof: 5.90, carrefour: 6.20, osher_ad: 5.80, victory: 6.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cottage_5pct_250g',
    name: 'קוטג׳ תנובה 5% 250 גרם',
    category: 'dairy_eggs',
    unit: 'גביע',
    aliases: ['קוטג', 'קוטג׳', 'קוטג 5%', 'קוטג׳ תנובה', 'קוטג 250 גרם'],
    prices: { rami_levy: 6.90, shufersal: 7.20, yohananof: 6.90, carrefour: 7.00, osher_ad: 6.70, victory: 7.20, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cottage_9pct_250g',
    name: 'קוטג׳ תנובה 9% 250 גרם',
    category: 'dairy_eggs',
    unit: 'גביע',
    aliases: ['קוטג 9%', 'קוטג׳ 9%'],
    prices: { rami_levy: 6.90, shufersal: 7.40, yohananof: 6.90, carrefour: 7.10, osher_ad: 6.80, victory: 7.40, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cheese_napoleon_225g',
    name: 'גבינת שמנת נפוליאון תנובה 24% 225 גרם',
    category: 'dairy_eggs',
    unit: 'גביע',
    aliases: ['נפוליאון', 'גבינת שמנת', 'נפוליאון 24%', 'שמנת נפוליאון'],
    prices: { rami_levy: 12.90, shufersal: 14.50, yohananof: 12.90, carrefour: 13.50, osher_ad: 12.50, victory: 14.20, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cheese_bulgarian_250g',
    name: 'גבינה בולגרית פיראוס 5% 250 גרם',
    category: 'dairy_eggs',
    unit: 'מארז',
    aliases: ['בולגרית', 'גבינה בולגרית', 'בולגרית פיראוס', 'בולגרית 5%'],
    prices: { rami_levy: 14.90, shufersal: 16.90, yohananof: 14.90, carrefour: 15.50, osher_ad: 14.20, victory: 16.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_sour_cream_15pct',
    name: 'שמנת חמוצה תנובה 15% 200 מ״ל (פיקוח)',
    category: 'dairy_eggs',
    unit: 'גביע',
    isRegulated: true,
    aliases: ['שמנת חמוצה', 'שמנת 15%', 'שמנת תנובה'],
    prices: { rami_levy: 2.63, shufersal: 2.63, yohananof: 2.63, carrefour: 2.63, osher_ad: 2.63, victory: 2.63, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_whipping_cream_38pct',
    name: 'שמנת מתוקה להקצפה 38% השף הלבן 250 מ״ל',
    category: 'dairy_eggs',
    unit: 'מיכל',
    aliases: ['שמנת מתוקה', 'שמנת להקצפה', 'שמנת 38%', 'השף הלבן'],
    prices: { rami_levy: 7.90, shufersal: 8.90, yohananof: 7.90, carrefour: 8.20, osher_ad: 7.50, victory: 8.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_milky_chocolate',
    name: 'מעדן חלב מילקי שוקולד שטראוס 133 גרם',
    category: 'dairy_eggs',
    unit: 'גביע',
    aliases: ['מילקי', 'מילקי שוקולד', 'מעדן מילקי'],
    prices: { rami_levy: 3.20, shufersal: 3.50, yohananof: 3.20, carrefour: 3.30, osher_ad: 3.10, victory: 3.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_danone_bio_200g',
    name: 'יוגורט דנונה ביו שטראוס 3% 200 גרם',
    category: 'dairy_eggs',
    unit: 'גביע',
    aliases: ['יוגורט', 'דנונה', 'יוגורט דנונה', 'דנונה ביו'],
    prices: { rami_levy: 4.90, shufersal: 5.40, yohananof: 4.90, carrefour: 5.10, osher_ad: 4.60, victory: 5.40, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_choco_yotvata_1l',
    name: 'משקה שוקו יטבתה 1 ליטר בבקבוק',
    category: 'dairy_eggs',
    unit: 'בקבוק',
    aliases: ['שוקו', 'שוקו יטבתה', 'בקבוק שוקו', 'שוקו ליטר'],
    prices: { rami_levy: 9.90, shufersal: 11.90, yohananof: 10.50, carrefour: 10.90, osher_ad: 9.50, victory: 11.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },

  // ==========================================
  // 2. פירות וירקות טריים (produce)
  // ==========================================
  {
    id: 'p_tomatoes_kg',
    name: 'עגבניות חממה טריות (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['עגבניות', 'עגבניה', 'עגבניות חממה', 'קילו עגבניות'],
    prices: { rami_levy: 4.90, shufersal: 6.90, yohananof: 4.90, carrefour: 5.50, osher_ad: 4.50, victory: 6.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cherry_tomatoes_pack',
    name: 'עגבניות שרי מארז 500 גרם',
    category: 'produce',
    unit: 'מארז',
    aliases: ['עגבניות שרי', 'שרי', 'מארז שרי'],
    prices: { rami_levy: 5.90, shufersal: 7.90, yohananof: 5.90, carrefour: 6.50, osher_ad: 5.50, victory: 7.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_cucumbers_kg',
    name: 'מלפפונים ירוקים טריים (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['מלפפונים', 'מלפפון', 'קילו מלפפונים'],
    prices: { rami_levy: 4.90, shufersal: 6.50, yohananof: 4.90, carrefour: 5.20, osher_ad: 4.50, victory: 6.20, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_onions_dry_kg',
    name: 'בצל יבש מובחר (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['בצל', 'בצל יבש', 'קילו בצל', 'בצל צהוב'],
    prices: { rami_levy: 3.90, shufersal: 5.50, yohananof: 3.90, carrefour: 4.20, osher_ad: 3.50, victory: 5.00, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_potatoes_bag_kg',
    name: 'תפוחי אדמה לבנים בשקית (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['תפוחי אדמה', 'תפוח אדמה', 'תפו״א', 'שקית תפוחי אדמה'],
    prices: { rami_levy: 4.50, shufersal: 5.90, yohananof: 4.50, carrefour: 4.90, osher_ad: 4.20, victory: 5.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_red_peppers_kg',
    name: 'פלפל אדום מתוק - גמבה (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['פלפל אדום', 'גמבה', 'פלפלים', 'גמבות', 'קילו גמבה'],
    prices: { rami_levy: 7.90, shufersal: 10.90, yohananof: 7.90, carrefour: 8.90, osher_ad: 7.50, victory: 9.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_carrots_bag_kg',
    name: 'גזר טרי ארוז בשקית (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['גזר', 'שקית גזר', 'גזר ארוז', 'קילו גזר'],
    prices: { rami_levy: 3.90, shufersal: 4.90, yohananof: 3.90, carrefour: 4.20, osher_ad: 3.50, victory: 4.80, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_romaine_lettuce',
    name: 'חסה ערבית רעננה (יחידה)',
    category: 'produce',
    unit: 'יח׳',
    aliases: ['חסה', 'חסה ערבית', 'ראש חסה'],
    prices: { rami_levy: 4.90, shufersal: 6.90, yohananof: 4.90, carrefour: 5.50, osher_ad: 4.50, victory: 6.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_lemons_kg',
    name: 'לימונים עסיסיים טריים (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['לימון', 'לימונים', 'קילו לימון'],
    prices: { rami_levy: 6.90, shufersal: 8.90, yohananof: 6.90, carrefour: 7.50, osher_ad: 6.50, victory: 8.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_bananas_kg',
    name: 'בננות טריות (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['בננות', 'בננה', 'קילו בננות'],
    prices: { rami_levy: 6.90, shufersal: 8.90, yohananof: 6.90, carrefour: 7.50, osher_ad: 6.50, victory: 8.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_apples_hermon_kg',
    name: 'תפוחי עץ חרמון אדומים (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['תפוחים', 'תפוחי עץ', 'תפוח אדום', 'תפוחי חרמון'],
    prices: { rami_levy: 8.90, shufersal: 11.90, yohananof: 8.90, carrefour: 9.90, osher_ad: 8.50, victory: 11.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_avocado_kg',
    name: 'אבוקדו מובחר (ק״ג)',
    category: 'produce',
    unit: 'ק״ג',
    aliases: ['אבוקדו', 'קילו אבוקדו'],
    prices: { rami_levy: 9.90, shufersal: 13.90, yohananof: 9.90, carrefour: 11.50, osher_ad: 9.50, victory: 12.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },

  // ==========================================
  // 3. בשר, עוף, דגים וקפואים (meat_fish)
  // ==========================================
  {
    id: 'p_chicken_breast_schnitzel_kg',
    name: 'חזה עוף טרי פרוס לשניצל (ק״ג)',
    category: 'meat_fish',
    unit: 'ק״ג',
    aliases: ['חזה עוף', 'שניצל עוף', 'חזה עוף פרוס', 'שניצל טרי', 'עוף לשניצל'],
    prices: { rami_levy: 34.90, shufersal: 41.90, yohananof: 35.90, carrefour: 36.90, osher_ad: 33.90, victory: 39.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_chicken_thighs_kg',
    name: 'כרעיים עוף טרי (ק״ג)',
    category: 'meat_fish',
    unit: 'ק״ג',
    aliases: ['כרעיים', 'כרעיים עוף', 'שוקיים וירכיים עוף', 'עוף טרי'],
    prices: { rami_levy: 24.90, shufersal: 29.90, yohananof: 24.90, carrefour: 26.50, osher_ad: 23.90, victory: 28.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_ground_beef_fresh_kg',
    name: 'בשר בקר טחון טרי (ק״ג)',
    category: 'meat_fish',
    unit: 'ק״ג',
    aliases: ['בשר טחון', 'בקר טחון', 'בשר טחון טרי', 'קילו טחון'],
    prices: { rami_levy: 49.90, shufersal: 59.90, yohananof: 49.90, carrefour: 52.90, osher_ad: 48.90, victory: 56.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_salmon_fillet_kg',
    name: 'פילה סלמון נורווגי קפוא / טרי (ק״ג)',
    category: 'meat_fish',
    unit: 'ק״ג',
    aliases: ['סלמון', 'פילה סלמון', 'דג סלמון', 'סלמון נורווגי'],
    prices: { rami_levy: 59.90, shufersal: 69.90, yohananof: 59.90, carrefour: 64.90, osher_ad: 58.90, victory: 68.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_frozen_schnitzel_mamaof_700g',
    name: 'שניצל עוף אמיתי מאמא עוף 700 גרם',
    category: 'meat_fish',
    unit: 'מארז',
    aliases: ['מאמא עוף', 'שניצל קפוא', 'שניצל מאמא עוף', 'שניצל מוכן'],
    prices: { rami_levy: 29.90, shufersal: 36.90, yohananof: 29.90, carrefour: 32.90, osher_ad: 28.90, victory: 35.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_tuna_oil_4pack',
    name: 'טונה בהירה בשמן צמחי מארז רביעייה (4x140 גרם)',
    category: 'meat_fish',
    unit: 'מארז 4 יח׳',
    aliases: ['טונה', 'טונה בשמן', 'מארז טונה', 'שימורי טונה', 'רביעיית טונה'],
    prices: { rami_levy: 16.90, shufersal: 21.90, yohananof: 17.50, carrefour: 18.90, osher_ad: 16.50, victory: 20.90, max_stock: 17.90, hastock: 17.50, max_stock_online: 18.00, stock_online: 19.00 }
  },
  {
    id: 'p_tuna_water_4pack',
    name: 'טונה בהירה במים מארז רביעייה (4x140 גרם)',
    category: 'meat_fish',
    unit: 'מארז 4 יח׳',
    aliases: ['טונה במים', 'טונה דיאטטית'],
    prices: { rami_levy: 16.90, shufersal: 21.90, yohananof: 17.50, carrefour: 18.90, osher_ad: 16.50, victory: 20.90, max_stock: 17.90, hastock: 17.50, max_stock_online: 18.00, stock_online: 19.00 }
  },
  {
    id: 'p_frozen_peas_sunfrost_800g',
    name: 'אפונה ירוקה עדינה סנפרוסט 800 גרם',
    category: 'meat_fish',
    unit: 'שקית',
    aliases: ['סנפרוסט', 'אפונה סנפרוסט', 'אפונה עדינה', 'ירקות קפואים'],
    prices: { rami_levy: 14.90, shufersal: 18.90, yohananof: 15.50, carrefour: 16.50, osher_ad: 14.20, victory: 17.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_frozen_fries_tfugan_1kg',
    name: 'צ׳יפס קפוא תפוגן 1 ק״ג לתנור ולטיגון',
    category: 'meat_fish',
    unit: 'שקית',
    aliases: ['תפוגן', 'צ׳יפס תפוגן', 'ציפס קפוא', 'ציפס'],
    prices: { rami_levy: 11.90, shufersal: 14.90, yohananof: 11.90, carrefour: 12.50, osher_ad: 10.90, victory: 14.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },

  // ==========================================
  // 4. לחם ומאפים (bakery)
  // ==========================================
  {
    id: 'p_bread_standard_sliced_750g',
    name: 'לחם אחיד כהה פרוס 750 גרם (פיקוח)',
    category: 'bakery',
    unit: 'כיכר',
    isRegulated: true,
    aliases: ['לחם', 'לחם אחיד', 'לחם פרוס', 'לחם שחור', 'לחם כהה'],
    prices: { rami_levy: 7.91, shufersal: 7.91, yohananof: 7.91, carrefour: 7.91, osher_ad: 7.91, victory: 7.91, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_bread_whole_wheat_sliced',
    name: 'לחם 100% חיטה מלאה פרוס 750 גרם',
    category: 'bakery',
    unit: 'כיכר',
    aliases: ['לחם מלא', 'לחם חיטה מלאה', 'לחם קל', 'לחם דגנים'],
    prices: { rami_levy: 11.90, shufersal: 14.90, yohananof: 12.50, carrefour: 12.90, osher_ad: 11.50, victory: 14.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_challah_shabbat',
    name: 'חלת שבת קלועה מסורתית',
    category: 'bakery',
    unit: 'יח׳',
    aliases: ['חלה', 'חלת שבת', 'חלה קלועה', 'חלות לשבת'],
    prices: { rami_levy: 6.90, shufersal: 8.90, yohananof: 6.90, carrefour: 7.50, osher_ad: 6.50, victory: 8.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_pita_bread_10pack',
    name: 'פיתות טריות מארז 10 יחידות',
    category: 'bakery',
    unit: 'מארז 10 יח׳',
    aliases: ['פיתות', 'פיתה', 'מארז פיתות', 'שקית פיתות'],
    prices: { rami_levy: 8.90, shufersal: 11.90, yohananof: 8.90, carrefour: 9.50, osher_ad: 7.90, victory: 10.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_burger_buns_6pack',
    name: 'לחמניות המבורגר / אצבע מארז 6 יחידות',
    category: 'bakery',
    unit: 'מארז 6 יח׳',
    aliases: ['לחמניות', 'לחמנייה', 'לחמניות המבורגר'],
    prices: { rami_levy: 9.90, shufersal: 12.50, yohananof: 9.90, carrefour: 10.50, osher_ad: 8.90, victory: 12.00, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_tortillas_8pack',
    name: 'טורטיות חיטה איכותיות מארז 8 יחידות',
    category: 'bakery',
    unit: 'מארז 8 יח׳',
    aliases: ['טורטיות', 'טורטיה', 'מארז טורטיות'],
    prices: { rami_levy: 7.90, shufersal: 10.90, yohananof: 8.50, carrefour: 8.90, osher_ad: 7.50, victory: 10.50, max_stock: 7.90, hastock: 8.50, max_stock_online: 8.00, stock_online: 9.00 }
  },
  {
    id: 'p_rice_cakes_100g',
    name: 'פריכיות אורז מלא דקות 100 גרם',
    category: 'bakery',
    unit: 'חבילה',
    aliases: ['פריכיות', 'פריכיות אורז', 'פריכיות דקות'],
    prices: { rami_levy: 4.90, shufersal: 5.90, yohananof: 4.90, carrefour: 5.20, osher_ad: 4.50, victory: 5.90, max_stock: 3.90, hastock: 4.50, max_stock_online: 4.00, stock_online: 5.00 }
  },

  // ==========================================
  // 5. מזווה, בישול ויבשים (pantry)
  // ==========================================
  {
    id: 'p_rice_persian_sugat_1kg',
    name: 'אורז פרסי קלאסי סוגת 1 ק״ג',
    category: 'pantry',
    unit: 'ק״ג',
    aliases: ['אורז', 'אורז סוגת', 'אורז פרסי', 'קילו אורז'],
    prices: { rami_levy: 8.90, shufersal: 11.90, yohananof: 8.90, carrefour: 9.50, osher_ad: 7.90, victory: 10.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_pasta_barilla_500g',
    name: 'פסטה ברילה (ספגטי / פנה) 500 גרם',
    category: 'pantry',
    unit: 'חבילה',
    aliases: ['פסטה', 'ברילה', 'פסטה ברילה', 'ספגטי', 'פנה', 'מקרוני'],
    prices: { rami_levy: 5.90, shufersal: 7.90, yohananof: 5.90, carrefour: 6.50, osher_ad: 5.50, victory: 7.50, max_stock: 6.90, hastock: 7.00, max_stock_online: 7.00, stock_online: 7.50 }
  },
  {
    id: 'p_ptitim_osem_500g',
    name: 'פתיתים אפויים אסם 500 גרם',
    category: 'pantry',
    unit: 'שקית',
    aliases: ['פתיתים', 'פתיתים אסם', 'פתיתים אפויים', 'קוסקוס'],
    prices: { rami_levy: 4.90, shufersal: 6.50, yohananof: 4.90, carrefour: 5.50, osher_ad: 4.50, victory: 6.20, max_stock: 4.90, hastock: 5.50, max_stock_online: 5.00, stock_online: 6.00 }
  },
  {
    id: 'p_canola_oil_1l',
    name: 'שמן קנולה מזוכך 1 ליטר',
    category: 'pantry',
    unit: 'בקבוק',
    aliases: ['שמן', 'שמן קנולה', 'בקבוק שמן', 'שמן טיגון', 'שמן סויה'],
    prices: { rami_levy: 7.90, shufersal: 9.90, yohananof: 7.90, carrefour: 8.50, osher_ad: 7.50, victory: 9.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_olive_oil_extra_virgin_750ml',
    name: 'שמן זית כתית מעולה חמיצות עד 0.5% 750 מ״ל',
    category: 'pantry',
    unit: 'בקבוק',
    aliases: ['שמן זית', 'שמן זית כתית', 'שמן זית 750', 'בקבוק שמן זית'],
    prices: { rami_levy: 29.90, shufersal: 39.90, yohananof: 28.90, carrefour: 31.90, osher_ad: 27.90, victory: 36.90, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_sugar_white_sugat_1kg',
    name: 'סוכר לבן סוגת 1 ק״ג',
    category: 'pantry',
    unit: 'ק״ג',
    aliases: ['סוכר', 'סוכר לבן', 'קילו סוכר', 'סוכר סוגת'],
    prices: { rami_levy: 4.50, shufersal: 5.50, yohananof: 4.50, carrefour: 4.90, osher_ad: 4.20, victory: 5.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_salt_table_fine_1kg',
    name: 'מלח שולחן דק 1 ק״ג במלחייה / שקית',
    category: 'pantry',
    unit: 'ק״ג',
    aliases: ['מלח', 'מלח שולחן', 'מלח דק', 'קילו מלח'],
    prices: { rami_levy: 2.20, shufersal: 2.80, yohananof: 2.20, carrefour: 2.50, osher_ad: 2.00, victory: 2.80, max_stock: 2.00, hastock: 2.50, max_stock_online: 2.50, stock_online: 2.90 }
  },
  {
    id: 'p_flour_white_1kg',
    name: 'קמח לבן בהיר סוגת 1 ק״ג',
    category: 'pantry',
    unit: 'ק״ג',
    aliases: ['קמח', 'קמח לבן', 'קמח סוגת', 'קילו קמח'],
    prices: { rami_levy: 3.90, shufersal: 4.90, yohananof: 3.90, carrefour: 4.20, osher_ad: 3.50, victory: 4.80, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_tomato_paste_jachin_3pack',
    name: 'רסק עגבניות 28-30% יכין מארז שלישייה (3x100 גרם)',
    category: 'pantry',
    unit: 'מארז שלישייה',
    aliases: ['רסק', 'רסק עגבניות', 'שלישיית רסק', 'רסק יכין'],
    prices: { rami_levy: 6.90, shufersal: 8.90, yohananof: 6.90, carrefour: 7.50, osher_ad: 6.50, victory: 8.50, max_stock: 6.90, hastock: 7.50, max_stock_online: 7.00, stock_online: 7.90 }
  },
  {
    id: 'p_ketchup_osem_750g',
    name: 'קטשופ אסם ענק 750 גרם',
    category: 'pantry',
    unit: 'בקבוק',
    aliases: ['קטשופ', 'קטשופ אסם', 'בקבוק קטשופ'],
    prices: { rami_levy: 10.90, shufersal: 13.90, yohananof: 11.20, carrefour: 11.90, osher_ad: 10.50, victory: 13.50, max_stock: 11.50, hastock: 11.90, max_stock_online: 12.00, stock_online: 12.50 }
  },
  {
    id: 'p_mayo_telma_500g',
    name: 'מיונז אמיתי תלמה 500 גרם',
    category: 'pantry',
    unit: 'צנצנת',
    aliases: ['מיונז', 'מיונז תלמה', 'מיונז אמיתי'],
    prices: { rami_levy: 9.90, shufersal: 12.90, yohananof: 9.90, carrefour: 10.50, osher_ad: 9.50, victory: 12.50, max_stock: 10.90, hastock: 11.50, max_stock_online: 11.00, stock_online: 11.90 }
  },
  {
    id: 'p_corn_canned_jachin',
    name: 'תירס מתוק גרגירים יכין קופסת שימורים 550 גרם',
    category: 'pantry',
    unit: 'פחית',
    aliases: ['תירס', 'שימורי תירס', 'תירס מתוק', 'תירס יכין'],
    prices: { rami_levy: 5.50, shufersal: 6.90, yohananof: 5.50, carrefour: 5.90, osher_ad: 5.20, victory: 6.90, max_stock: 4.90, hastock: 5.50, max_stock_online: 5.00, stock_online: 5.90 }
  },
  {
    id: 'p_tahini_raw_500g',
    name: 'טחינה גולמית טהורה 100% שומשום (הר ברכה / אל ארז) 500 גרם',
    category: 'pantry',
    unit: 'צנצנת',
    aliases: ['טחינה', 'טחינה גולמית', 'טחינה אל ארז', 'טחינה הר ברכה', 'טחינה 500'],
    prices: { rami_levy: 11.90, shufersal: 15.90, yohananof: 12.50, carrefour: 12.90, osher_ad: 11.50, victory: 14.90, max_stock: 12.90, hastock: 13.50, max_stock_online: 13.00, stock_online: 14.00 }
  },
  {
    id: 'p_hashahar_spread_500g',
    name: 'ממרח שוקולד השחר העולה פרווה / חלבי 500 גרם',
    category: 'pantry',
    unit: 'מיכל',
    aliases: ['השחר', 'שוקולד השחר', 'ממרח השחר', 'ממרח שוקולד'],
    prices: { rami_levy: 11.90, shufersal: 14.50, yohananof: 11.90, carrefour: 12.50, osher_ad: 11.20, victory: 13.90, max_stock: 12.00, hastock: 12.50, max_stock_online: 12.50, stock_online: 13.00 }
  },
  {
    id: 'p_nutella_350g',
    name: 'ממרח אגוזי לוז וקקאו נוטלה 350 גרם',
    category: 'pantry',
    unit: 'צנצנת',
    aliases: ['נוטלה', 'שוקולד נוטלה', 'ממרח נוטלה'],
    prices: { rami_levy: 12.90, shufersal: 15.90, yohananof: 12.90, carrefour: 13.50, osher_ad: 12.50, victory: 15.50, max_stock: 12.90, hastock: 13.90, max_stock_online: 13.00, stock_online: 14.00 }
  },
  {
    id: 'p_cornflakes_telma_750g',
    name: 'קורנפלקס תלמה של אלופים 750 גרם',
    category: 'pantry',
    unit: 'אריזה',
    aliases: ['קורנפלקס', 'קורנפלקס תלמה', 'קורנפלקס אלופים', 'דגני בוקר'],
    prices: { rami_levy: 15.90, shufersal: 19.90, yohananof: 16.50, carrefour: 16.90, osher_ad: 14.90, victory: 18.90, max_stock: 16.90, hastock: 17.50, max_stock_online: 17.00, stock_online: 18.00 }
  },
  {
    id: 'p_kariyot_cereal_750g',
    name: 'דגני בוקר כריות במילוי קרם שוקולד תלמה 750 גרם',
    category: 'pantry',
    unit: 'אריזה',
    aliases: ['כריות', 'כריות תלמה', 'כריות שוקולד', 'דגני כריות'],
    prices: { rami_levy: 21.90, shufersal: 27.90, yohananof: 22.50, carrefour: 23.90, osher_ad: 19.90, victory: 26.90, max_stock: 22.90, hastock: 23.90, max_stock_online: 23.00, stock_online: 24.50 }
  },

  // ==========================================
  // 6. שתייה, קפה וחטיפים (snacks_drinks)
  // ==========================================
  {
    id: 'p_black_coffee_elite_100g',
    name: 'קפה שחור קלוי וטחון עלית 100 גרם',
    category: 'snacks_drinks',
    unit: 'שקית',
    aliases: ['קפה שחור', 'קפה עלית', 'קפה שחור עלית', 'קפה בוץ'],
    prices: { rami_levy: 5.90, shufersal: 7.50, yohananof: 5.90, carrefour: 6.50, osher_ad: 5.50, victory: 7.20, max_stock: 5.90, hastock: 6.50, max_stock_online: 6.00, stock_online: 6.90 }
  },
  {
    id: 'p_tasters_choice_200g',
    name: 'קפה נמס נסקפה טייסטרס צ׳ויס Nescafe 200 גרם',
    category: 'snacks_drinks',
    unit: 'צנצנת',
    aliases: ['טייסטרס צויס', 'טייסטרס צ׳ויס', 'נסקפה טייסטרס', 'קפה טייסטרס', 'נס קפה'],
    prices: { rami_levy: 24.90, shufersal: 33.90, yohananof: 25.90, carrefour: 27.90, osher_ad: 24.50, victory: 31.90, max_stock: 24.90, hastock: 26.00, max_stock_online: 25.00, stock_online: 28.00 }
  },
  {
    id: 'p_jacobs_kronung_200g',
    name: 'קפה נמס מיובש בהקפאה ג׳ייקובס קרוננג Jacobs 200 גרם',
    category: 'snacks_drinks',
    unit: 'צנצנת',
    aliases: ['גייקובס', 'ג׳ייקובס', 'קפה גייקובס', 'יעקובס'],
    prices: { rami_levy: 22.90, shufersal: 29.90, yohananof: 23.50, carrefour: 24.90, osher_ad: 22.50, victory: 28.90, max_stock: 23.90, hastock: 24.90, max_stock_online: 24.00, stock_online: 26.00 }
  },
  {
    id: 'p_wissotzky_classic_100tea',
    name: 'תה ויסוצקי קלאסי 100 שקיקים',
    category: 'snacks_drinks',
    unit: 'אריזה',
    aliases: ['תה', 'תה ויסוצקי', 'ויסוצקי קלאסי', '100 תה', 'שקיקי תה'],
    prices: { rami_levy: 14.90, shufersal: 19.90, yohananof: 15.50, carrefour: 16.50, osher_ad: 14.50, victory: 18.90, max_stock: 15.90, hastock: 16.90, max_stock_online: 16.00, stock_online: 17.50 }
  },
  {
    id: 'p_shocolit_500g',
    name: 'שוקולית עלית 500 גרם להכנת שוקו חם וקר',
    category: 'snacks_drinks',
    unit: 'אריזה',
    aliases: ['שוקולית', 'שוקולית עלית', 'אבקת שוקולית', 'שוקו אבקה'],
    prices: { rami_levy: 14.90, shufersal: 16.90, yohananof: 14.50, carrefour: 14.90, osher_ad: 13.90, victory: 16.50, max_stock: 14.20, hastock: 14.50, max_stock_online: 14.50, stock_online: 15.00 }
  },
  {
    id: 'p_water_sixpack_1_5l',
    name: 'שישיית מים מינרליים נביעות / עין גדי (6x1.5 ליטר)',
    category: 'snacks_drinks',
    unit: 'שישייה',
    aliases: ['מים', 'שישיית מים', 'מים מינרליים', 'נביעות', 'עין גדי'],
    prices: { rami_levy: 11.90, shufersal: 14.90, yohananof: 11.90, carrefour: 12.90, osher_ad: 10.90, victory: 14.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_coca_cola_1_5l',
    name: 'קוקה קולה קלאסי 1.5 ליטר',
    category: 'snacks_drinks',
    unit: 'בקבוק',
    aliases: ['קולה', 'קוקה קולה', 'בקבוק קולה', 'קולה 1.5'],
    prices: { rami_levy: 6.90, shufersal: 8.90, yohananof: 6.90, carrefour: 7.50, osher_ad: 6.50, victory: 8.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_coca_cola_zero_1_5l',
    name: 'קוקה קולה זירו Coca-Cola Zero 1.5 ליטר',
    category: 'snacks_drinks',
    unit: 'בקבוק',
    aliases: ['קולה זירו', 'זירו', 'קוקה קולה זירו'],
    prices: { rami_levy: 6.90, shufersal: 8.90, yohananof: 6.90, carrefour: 7.50, osher_ad: 6.50, victory: 8.50, max_stock: null, hastock: null, max_stock_online: null, stock_online: null }
  },
  {
    id: 'p_bamba_osem_80g',
    name: 'חטיף בוטנים במבה אסם 80 גרם',
    category: 'snacks_drinks',
    unit: 'שקית',
    aliases: ['במבה', 'במבה אסם', 'חטיף במבה', 'שקית במבה'],
    prices: { rami_levy: 3.90, shufersal: 4.90, yohananof: 3.90, carrefour: 4.20, osher_ad: 3.50, victory: 4.80, max_stock: 3.90, hastock: 4.00, max_stock_online: 4.00, stock_online: 4.50 }
  },
  {
    id: 'p_bisli_grill_70g',
    name: 'חטיף חיטה ביסלי גריל אסם 70 גרם',
    category: 'snacks_drinks',
    unit: 'שקית',
    aliases: ['ביסלי', 'ביסלי גריל', 'חטיף ביסלי'],
    prices: { rami_levy: 3.90, shufersal: 4.90, yohananof: 3.90, carrefour: 4.20, osher_ad: 3.50, victory: 4.80, max_stock: 3.90, hastock: 4.00, max_stock_online: 4.00, stock_online: 4.50 }
  },
  {
    id: 'p_tapuchips_classic_50g',
    name: 'חטיף תפוחי אדמה תפוצ׳יפס קלאסי עלית 50 גרם',
    category: 'snacks_drinks',
    unit: 'שקית',
    aliases: ['תפוציפס', 'תפוצ׳יפס', 'ציפס עלית', 'תפוחי אדמה חטיף'],
    prices: { rami_levy: 3.90, shufersal: 4.90, yohananof: 3.90, carrefour: 4.20, osher_ad: 3.50, victory: 4.80, max_stock: 3.50, hastock: 3.90, max_stock_online: 4.00, stock_online: 4.50 }
  },
  {
    id: 'p_petit_beurre_osem_500g',
    name: 'ביסקוויט פטיבר קלאסי אסם 500 גרם',
    category: 'snacks_drinks',
    unit: 'אריזה',
    aliases: ['פטיבר', 'פטי בר', 'עוגיות פטיבר', 'ביסקוויטים'],
    prices: { rami_levy: 9.90, shufersal: 12.50, yohananof: 9.90, carrefour: 10.50, osher_ad: 9.20, victory: 12.00, max_stock: 9.50, hastock: 9.90, max_stock_online: 10.00, stock_online: 10.90 }
  },
  {
    id: 'p_chocolate_parah_milk_100g',
    name: 'טבלת שוקולד חלב פרה עלית 100 גרם',
    category: 'snacks_drinks',
    unit: 'טבלה',
    aliases: ['שוקולד פרה', 'שוקולד חלב', 'חפיסת שוקולד', 'שוקולד עלית'],
    prices: { rami_levy: 4.90, shufersal: 5.90, yohananof: 4.90, carrefour: 5.20, osher_ad: 4.50, victory: 5.80, max_stock: 4.50, hastock: 4.90, max_stock_online: 5.00, stock_online: 5.50 }
  },

  // ==========================================
  // 7. חומרי ניקיון וטיפוח (cleaning_bath)
  // ==========================================
  {
    id: 'p_fairy_dish_soap_650ml',
    name: 'נוזל לניקוי כלים פיירי Fairy לימון 650 מ״ל',
    category: 'cleaning_bath',
    unit: 'בקבוק',
    aliases: ['פיירי', 'נוזל כלים', 'סבון כלים', 'פיירי לימון', 'נוזל לניקוי כלים'],
    prices: { rami_levy: 8.90, shufersal: 11.90, yohananof: 8.90, carrefour: 9.50, osher_ad: 8.50, victory: 11.50, max_stock: 8.90, hastock: 9.50, max_stock_online: 9.50, stock_online: 10.00 }
  },
  {
    id: 'p_ariel_laundry_gel_2_5l',
    name: 'ג׳ל כביסה מרוכז אריאל Ariel 2.5 ליטר',
    category: 'cleaning_bath',
    unit: 'מיכל',
    aliases: ['ג׳ל כביסה', 'גיל כביסה', 'אריאל כביסה', 'נוזל כביסה אריאל'],
    prices: { rami_levy: 29.90, shufersal: 39.90, yohananof: 31.90, carrefour: 34.90, osher_ad: 28.90, victory: 38.90, max_stock: 29.90, hastock: 32.90, max_stock_online: 32.00, stock_online: 35.00 }
  },
  {
    id: 'p_ariel_pods_35',
    name: 'קפסולות לכביסה אריאל Ariel All-in-1 מארז 35 יח׳',
    category: 'cleaning_bath',
    unit: 'קופסה',
    aliases: ['קפסולות כביסה', 'קפסולות אריאל', 'טבליות כביסה'],
    prices: { rami_levy: 29.90, shufersal: 37.90, yohananof: 29.90, carrefour: 32.90, osher_ad: 28.50, victory: 36.90, max_stock: 28.90, hastock: 31.90, max_stock_online: 30.00, stock_online: 34.00 }
  },
  {
    id: 'p_badin_fabric_softener_1l',
    name: 'מרכך כביסה מרוכז בדין אקסטרה 1 ליטר',
    category: 'cleaning_bath',
    unit: 'בקבוק',
    aliases: ['בדין', 'מרכך כביסה', 'מרכך בדין', 'מרכך מרוכז'],
    prices: { rami_levy: 9.90, shufersal: 13.90, yohananof: 9.90, carrefour: 10.90, osher_ad: 9.50, victory: 12.90, max_stock: 9.90, hastock: 10.90, max_stock_online: 11.00, stock_online: 12.00 }
  },
  {
    id: 'p_sano_bleach_4l',
    name: 'אקונומיקה מבושמת סנו ז׳אוול 4 ליטר',
    category: 'cleaning_bath',
    unit: 'גלון',
    aliases: ['אקונומיקה', 'סנו זאוול', 'סנו ז׳אוול', 'אקונומיקה 4 ליטר'],
    prices: { rami_levy: 10.90, shufersal: 14.90, yohananof: 10.90, carrefour: 11.90, osher_ad: 9.90, victory: 13.90, max_stock: 10.50, hastock: 11.50, max_stock_online: 12.00, stock_online: 13.00 }
  },
  {
    id: 'p_sano_forte_plus',
    name: 'מסיר שומנים ורב-שימושי סנו פורטה פלוס 750 מ״ל',
    category: 'cleaning_bath',
    unit: 'מתז',
    aliases: ['סנו פורטה', 'מסיר שומנים', 'פורטה פלוס', 'סנו'],
    prices: { rami_levy: 11.90, shufersal: 14.90, yohananof: 11.90, carrefour: 12.50, osher_ad: 10.90, victory: 14.50, max_stock: 10.90, hastock: 11.90, max_stock_online: 12.00, stock_online: 13.00 }
  },
  {
    id: 'p_toilet_paper_lily_32',
    name: 'נייר טואלט לילי פרימיום דו-שכבתי 32 גלילים',
    category: 'cleaning_bath',
    unit: 'חבילה 32 גלילים',
    aliases: ['נייר טואלט', 'לילי', 'נייר טואלט לילי', '32 גלילים', 'טואלט'],
    prices: { rami_levy: 29.90, shufersal: 39.90, yohananof: 31.90, carrefour: 34.90, osher_ad: 28.90, victory: 38.90, max_stock: 29.90, hastock: 32.90, max_stock_online: 32.00, stock_online: 36.00 }
  },
  {
    id: 'p_paper_towels_nikol_6',
    name: 'מגבות נייר למטבח ניקול ענק 6 גלילים כפולים',
    category: 'cleaning_bath',
    unit: 'מארז 6 יח׳',
    aliases: ['מגבות נייר', 'נייר מטבח', 'ניקול', 'גלילי נייר'],
    prices: { rami_levy: 12.90, shufersal: 16.90, yohananof: 12.90, carrefour: 13.90, osher_ad: 11.90, victory: 15.90, max_stock: 12.50, hastock: 13.50, max_stock_online: 13.50, stock_online: 15.00 }
  },
  {
    id: 'p_trash_bags_sano_sushi_60',
    name: 'שקיות אשפה גדולות במיוחד עם שרוך סנו סושי 60 יח׳',
    category: 'cleaning_bath',
    unit: 'גליל',
    aliases: ['שקיות אשפה', 'שקיות זבל', 'שקיות שרוך', 'סנו סושי'],
    prices: { rami_levy: 13.90, shufersal: 17.90, yohananof: 13.90, carrefour: 14.90, osher_ad: 12.90, victory: 16.90, max_stock: 12.90, hastock: 13.90, max_stock_online: 14.00, stock_online: 15.00 }
  },
  {
    id: 'p_finish_dishwasher_tabs_70',
    name: 'טבליות למדיח כלים פיניש Finish All-in-1 מארז 70 יח׳',
    category: 'cleaning_bath',
    unit: 'מארז',
    aliases: ['טבליות למדיח', 'פיניש', 'קפסולות למדיח', 'סבון למדיח', 'טבליות פיניש'],
    prices: { rami_levy: 39.90, shufersal: 54.90, yohananof: 41.90, carrefour: 44.90, osher_ad: 38.90, victory: 49.90, max_stock: 39.90, hastock: 43.90, max_stock_online: 42.00, stock_online: 46.00 }
  },
  {
    id: 'p_colgate_toothpaste_75ml',
    name: 'משחת שיניים קולגייט טוטאל Colgate Total 75 מ״ל',
    category: 'cleaning_bath',
    unit: 'שפופרת',
    aliases: ['קולגייט', 'משחת שיניים', 'קולגייט טוטאל'],
    prices: { rami_levy: 9.90, shufersal: 14.90, yohananof: 9.90, carrefour: 11.50, osher_ad: 9.20, victory: 13.90, max_stock: 8.90, hastock: 9.90, max_stock_online: 10.00, stock_online: 11.00 }
  },
  {
    id: 'p_oral_b_toothbrush_2pack',
    name: 'מברשת שיניים אורל-בי Oral-B זוג מארז חיסכון',
    category: 'cleaning_bath',
    unit: 'מארז זוג',
    aliases: ['מברשת שיניים', 'אורל בי', 'מברשות שיניים'],
    prices: { rami_levy: 12.90, shufersal: 16.90, yohananof: 12.90, carrefour: 13.90, osher_ad: 11.90, victory: 15.90, max_stock: 9.90, hastock: 11.90, max_stock_online: 11.00, stock_online: 13.00 }
  },
  {
    id: 'p_shampoo_head_shoulders_500ml',
    name: 'שמפו נגד קשקשים הד אנד שולדרס 500 מ״ל',
    category: 'cleaning_bath',
    unit: 'בקבוק',
    aliases: ['שמפו', 'הד אנד שולדרס', 'שמפו קשקשים', 'שמפו לשיער'],
    prices: { rami_levy: 16.90, shufersal: 22.90, yohananof: 17.50, carrefour: 18.90, osher_ad: 15.90, victory: 21.90, max_stock: 16.90, hastock: 17.90, max_stock_online: 18.00, stock_online: 19.50 }
  },
  {
    id: 'p_body_wash_dove_700ml',
    name: 'תחליב רחצה מזין דאב / פינוק 700 מ״ל',
    category: 'cleaning_bath',
    unit: 'בקבוק',
    aliases: ['תחליב רחצה', 'סבון גוף', 'סבון דאב', 'פינוק', 'דאב'],
    prices: { rami_levy: 9.90, shufersal: 13.90, yohananof: 9.90, carrefour: 11.50, osher_ad: 9.50, victory: 12.90, max_stock: 8.90, hastock: 9.90, max_stock_online: 10.00, stock_online: 11.50 }
  },
  {
    id: 'p_deodorant_rexona_rollon',
    name: 'דאודורנט רול-און רקסונה Rexona 50 מ״ל',
    category: 'cleaning_bath',
    unit: 'יח׳',
    aliases: ['דאודורנט', 'רקסונה', 'דאודורנט רול און'],
    prices: { rami_levy: 10.90, shufersal: 14.90, yohananof: 11.20, carrefour: 12.00, osher_ad: 10.50, victory: 14.20, max_stock: 9.90, hastock: 10.90, max_stock_online: 11.00, stock_online: 12.00 }
  },
  {
    id: 'p_hand_soap_liquid_500ml',
    name: 'סבון ידיים נוזלי נקה 7 עם משאבה 500 מ״ל',
    category: 'cleaning_bath',
    unit: 'בקבוק משאבה',
    aliases: ['סבון ידיים', 'סבון נוזלי', 'נקה 7'],
    prices: { rami_levy: 5.90, shufersal: 7.90, yohananof: 5.90, carrefour: 6.50, osher_ad: 5.50, victory: 7.50, max_stock: 4.90, hastock: 5.50, max_stock_online: 5.50, stock_online: 6.50 }
  },
  {
    id: 'p_cleaning_kit_rental',
    name: 'ערכת ניקיון מלאה לדירה (דלי שטיפה + מגב סיליקון + מטאטא ויעה + 5 מטליות מיקרופייבר)',
    category: 'cleaning_bath',
    unit: 'ערכה',
    aliases: ['ערכת ניקיון', 'דלי ומגב', 'מטאטא ויעה', 'ערכת ניקיון מלאה'],
    prices: { rami_levy: 49.90, shufersal: 69.90, yohananof: 59.90, carrefour: 64.90, osher_ad: 52.00, victory: 68.00, max_stock: 59.40, hastock: 64.90, max_stock_online: 65.00, stock_online: 75.00 }
  },
  {
    id: 'p_laundry_basket_accessories',
    name: 'סל כביסה מתקפל + מארז 48 אטבי כביסה + 3 שקיות רשת לכביסה עדינה',
    category: 'cleaning_bath',
    unit: 'סט',
    aliases: ['סל כביסה', 'אטבי כביסה', 'שקיות כביסה'],
    prices: { rami_levy: 24.90, shufersal: 34.90, yohananof: 29.90, carrefour: 32.00, osher_ad: 26.00, victory: 34.00, max_stock: 26.80, hastock: 29.90, max_stock_online: 35.00, stock_online: 42.00 }
  },
  {
    id: 'p_bathroom_ocean_set',
    name: 'אבזור אמבטיה ללא קידוח סדרת OCEAN (מתקן ואקום למברשות, מעמד סבון, ווים כפולים)',
    category: 'cleaning_bath',
    unit: 'סט',
    aliases: ['אבזור אמבטיה', 'סדרת OCEAN', 'ללא קידוח', 'אמבטיה'],
    prices: { rami_levy: 54.90, shufersal: 74.90, yohananof: 64.90, carrefour: 68.00, osher_ad: 58.00, victory: 72.00, max_stock: 62.50, hastock: 69.90, max_stock_online: 79.00, stock_online: 89.00 }
  },
  {
    id: 'p_bathroom_mats_duo',
    name: 'שטיח אמבטיה ספוג זיכרון נגד החלקה + שטיח כניסה לבית',
    category: 'cleaning_bath',
    unit: 'זוג',
    aliases: ['שטיח אמבטיה', 'שטיח כניסה', 'שטיח ספוג זיכרון'],
    prices: { rami_levy: 24.90, shufersal: 36.90, yohananof: 29.90, carrefour: 32.00, osher_ad: 26.00, victory: 35.00, max_stock: 26.80, hastock: 29.90, max_stock_online: 39.00, stock_online: 49.00 }
  },

  // ==========================================
  // 8. כלי מטבח ואירוח (kitchen)
  // ==========================================
  {
    id: 'p_pot_24cm',
    name: 'סיר נירוסטה / נון סטיק 24 ס״מ עם מכסה זכוכית',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['סיר', 'סיר 24', 'סיר 24 ס״מ', 'סיר נירוסטה'],
    prices: { rami_levy: 59.90, shufersal: 79.90, yohananof: 69.90, carrefour: 74.90, osher_ad: 62.00, victory: 79.00, max_stock: 69.00, hastock: 49.90, max_stock_online: 89.00, stock_online: 99.00 }
  },
  {
    id: 'p_sautoir_28cm',
    name: 'סוטאז׳ רחב 28 ס״מ Non-Stick לבישול וצלייה',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['סוטאז', 'סוטאז׳', 'סוטאז 28', 'סוטאז 28 ס״מ'],
    prices: { rami_levy: 69.90, shufersal: 89.90, yohananof: 79.90, carrefour: 84.90, osher_ad: 72.00, victory: 89.00, max_stock: 79.00, hastock: 69.90, max_stock_online: 99.00, stock_online: 119.00 }
  },
  {
    id: 'p_pans_pair_20_24',
    name: 'זוג מחבתות Non-Stick קוטר 20 ס״מ + 24 ס״מ',
    category: 'kitchen',
    unit: 'זוג',
    aliases: ['מחבת', 'מחבתות', 'זוג מחבתות'],
    prices: { rami_levy: 59.90, shufersal: 89.90, yohananof: 74.90, carrefour: 79.90, osher_ad: 65.00, victory: 89.00, max_stock: 84.00, hastock: 69.90, max_stock_online: 95.00, stock_online: 129.00 }
  },
  {
    id: 'p_dinner_set_12pcs',
    name: 'סט 12 צלחות אוכל פורצלן / אופל (4 מנות עיקריות, 4 עמוקות, 4 קינוח)',
    category: 'kitchen',
    unit: 'סט 12 חלקים',
    aliases: ['צלחות', 'סט צלחות', 'סט 12 צלחות', 'צלחות אוכל'],
    prices: { rami_levy: 29.90, shufersal: 59.90, yohananof: 45.00, carrefour: 49.90, osher_ad: 39.00, victory: 59.00, max_stock: 39.90, hastock: 49.90, max_stock_online: 59.00, stock_online: 79.00 }
  },
  {
    id: 'p_cutlery_set_24pcs',
    name: 'סט סכו״ם נירוסטה 24 חלקים מלא (6 סכינים, 6 מזלגות, 6 כפות, 6 כפיות)',
    category: 'kitchen',
    unit: 'סט 24 חלקים',
    aliases: ['סכום', 'סכו״ם', 'סט סכו״ם', 'סט סכום 24'],
    prices: { rami_levy: 19.90, shufersal: 39.90, yohananof: 29.90, carrefour: 34.90, osher_ad: 25.00, victory: 39.00, max_stock: 20.90, hastock: 29.90, max_stock_online: 39.00, stock_online: 49.00 }
  },
  {
    id: 'p_glasses_mugs_12pcs',
    name: 'מארז 6 כוסות שתייה קרה מזכוכית + 6 מאגים קרמיקה לקפה',
    category: 'kitchen',
    unit: 'סט 12 כוסות',
    aliases: ['כוסות', 'מאגים', '6 כוסות', 'כוסות שתייה'],
    prices: { rami_levy: 39.80, shufersal: 59.90, yohananof: 49.90, carrefour: 52.00, osher_ad: 42.00, victory: 59.00, max_stock: 46.80, hastock: 49.90, max_stock_online: 59.00, stock_online: 69.00 }
  },
  {
    id: 'p_dish_drying_rack',
    name: 'מייבש כלים דו-קומתי מודרני ממתכת בציפוי אל-חלד עם מגש ניקוז',
    category: 'kitchen',
    unit: 'יח׳',
    aliases: ['מייבש כלים', 'מתקן ייבוש כלים', 'מייבש כלים דו קומתי'],
    prices: { rami_levy: 29.90, shufersal: 49.90, yohananof: 39.90, carrefour: 42.00, osher_ad: 34.00, victory: 49.00, max_stock: 30.00, hastock: 39.90, max_stock_online: 49.00, stock_online: 69.00 }
  },
  {
    id: 'p_storage_boxes_utensils',
    name: 'מארז 10 קופסאות אחסון מזון הרמטיות + מסננת נירוסטה וסט 5 כלי ששת',
    category: 'kitchen',
    unit: 'סט משולב',
    aliases: ['קופסאות אחסון', 'ששת', 'מסננת', 'כלי מטבח'],
    prices: { rami_levy: 32.80, shufersal: 59.90, yohananof: 45.00, carrefour: 49.90, osher_ad: 38.00, victory: 59.00, max_stock: 45.80, hastock: 49.90, max_stock_online: 59.00, stock_online: 79.00 }
  },

  // ==========================================
  // 9. ריהוט ואחסון (furniture)
  // ==========================================
  {
    id: 'p_coffee_tables_pair',
    name: 'שולחן סלון מודרני / זוג שולחנות קפה עגולים בסגנון סקנדינבי',
    category: 'furniture',
    unit: 'יח׳ / זוג',
    aliases: ['שולחן סלון', 'שולחנות קפה', 'שולחן קפה', 'שולחן עגול'],
    prices: { rami_levy: 129.90, shufersal: 179.90, yohananof: 149.90, carrefour: 169.00, osher_ad: null, victory: null, max_stock: 119.90, hastock: 149.90, max_stock_online: 200.00, stock_online: 599.00 }
  },
  {
    id: 'p_storage_cube_6',
    name: 'כוורת 6 תאים מודולרית / מעמד מדפים לאחסון ספרים וחפצים',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['כוורת', 'כוורת 6 תאים', 'מעמד מדפים', 'מדפים'],
    prices: { rami_levy: 139.90, shufersal: 199.90, yohananof: 169.90, carrefour: 179.00, osher_ad: null, victory: null, max_stock: 119.90, hastock: 159.90, max_stock_online: 219.00, stock_online: 349.00 }
  },
  {
    id: 'p_shoe_cabinet_wood',
    name: 'ארון נעליים מעץ 3 תאים מתקפלים דמוי אלון / לבן',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['ארון נעליים', 'מעמד נעליים', 'ארון נעליים עץ'],
    prices: { rami_levy: 219.00, shufersal: 299.00, yohananof: 259.00, carrefour: 279.00, osher_ad: null, victory: null, max_stock: 200.00, hastock: 249.90, max_stock_online: 289.00, stock_online: 449.00 }
  },
  {
    id: 'p_clothes_hanger_rack',
    name: 'מעמד מתכת נייד על גלגלים לתליית בגדים + מדף נעליים תחתון',
    category: 'furniture',
    unit: 'יח׳',
    aliases: ['מעמד תליית בגדים', 'מתלה בגדים', 'קולב עומד'],
    prices: { rami_levy: 169.90, shufersal: 229.00, yohananof: 189.90, carrefour: 199.00, osher_ad: null, victory: null, max_stock: 199.90, hastock: 179.90, max_stock_online: 229.00, stock_online: 299.00 }
  },
  {
    id: 'p_bedside_tables_pair',
    name: 'זוג שידות צד למיטה עם מגירה + מעמד מדפי במבוק',
    category: 'furniture',
    unit: 'זוג + מעמד',
    aliases: ['שידות צד', 'שידת לילה', 'זוג שידות לילה', 'מעמד במבוק'],
    prices: { rami_levy: 199.70, shufersal: 269.00, yohananof: 229.00, carrefour: 249.00, osher_ad: null, victory: null, max_stock: 179.70, hastock: 219.70, max_stock_online: 259.00, stock_online: 399.00 }
  },

  // ==========================================
  // 10. כלי עבודה ו-DIY (diy)
  // ==========================================
  {
    id: 'p_hand_tools_kit',
    name: 'ערכת כלי עבודה ידניים מלאה בארגז (פטיש, פלייר, מפתח שבדי, מטר, קאטר, סט מברגים ודיבלים)',
    category: 'diy',
    unit: 'ארגז כלים',
    aliases: ['כלי עבודה', 'ארגז כלים', 'ערכת כלי עבודה', 'פטיש ומברג'],
    prices: { rami_levy: 29.90, shufersal: 79.90, yohananof: 59.90, carrefour: 69.90, osher_ad: 49.00, victory: 69.00, max_stock: 68.50, hastock: 79.90, max_stock_online: 89.00, stock_online: 119.00 }
  },
  {
    id: 'p_cordless_drill_screwdriver',
    name: 'מברגה / מקדחה נטענת 12V כוללת סוללה ומטען מהיר',
    category: 'diy',
    unit: 'יח׳',
    aliases: ['מברגה', 'מברגה נטענת', 'מקדחה', 'מברגה DeWalt'],
    prices: { rami_levy: 59.90, shufersal: 119.00, yohananof: 89.90, carrefour: 99.00, osher_ad: null, victory: null, max_stock: 50.00, hastock: 69.90, max_stock_online: 99.00, stock_online: 149.00 }
  },
  {
    id: 'p_painting_sealing_kit',
    name: 'ערכת צביעה ואיטום (רולר, מברשת, מסקינטייפ, שפכטל, שפכטל אמריקאי 1 ק״ג, אקדח סיליקון וסיליקון לבן)',
    category: 'diy',
    unit: 'ערכה מלאה',
    aliases: ['ערכת צביעה', 'סיליקון', 'שפכטל', 'צבע לבית', 'איטום'],
    prices: { rami_levy: 44.90, shufersal: 79.90, yohananof: 59.90, carrefour: 65.00, osher_ad: null, victory: null, max_stock: 56.80, hastock: 64.90, max_stock_online: 79.00, stock_online: 99.00 }
  },

  // ==========================================
  // 11. טקסטיל, מראות, תאורה ועיצוב (decor)
  // ==========================================
  {
    id: 'p_towels_bundle_7pcs',
    name: '2 מגבות גוף גדולות 100% כותנה + 2 מגבות פנים + 3 מגבות מטבח איכותיות',
    category: 'decor',
    unit: 'מארז 7 מגבות',
    aliases: ['מגבות', 'מגבות גוף', 'מגבות פנים', 'מגבות מטבח', 'סט מגבות'],
    prices: { rami_levy: 59.90, shufersal: 99.90, yohananof: 79.90, carrefour: 84.90, osher_ad: 69.00, victory: 89.00, max_stock: 73.60, hastock: 69.60, max_stock_online: 89.00, stock_online: 119.00 }
  },
  {
    id: 'p_bedding_double_pillows',
    name: 'סט מצעים זוגי 100% כותנה / מיקרופייבר יוקרתי + זוג כריות שינה אורתופדיות',
    category: 'decor',
    unit: 'סט מצעים + 2 כריות',
    aliases: ['מצעים', 'סט מצעים', 'כריות שינה', 'מצעים זוגיים'],
    prices: { rami_levy: 99.80, shufersal: 149.90, yohananof: 129.90, carrefour: 139.00, osher_ad: 109.00, victory: 149.00, max_stock: 119.80, hastock: 109.80, max_stock_online: 139.00, stock_online: 189.00 }
  },
  {
    id: 'p_full_length_mirror',
    name: 'מראת גוף עומדת עם מסגרת דקה מודרנית (פרוטוקול פתיחה ובדיקת שבר בקופה!)',
    category: 'decor',
    unit: 'יח׳',
    aliases: ['מראה', 'מראת גוף', 'מראה עומדת', 'מראה גדולה'],
    prices: { rami_levy: 99.90, shufersal: 149.90, yohananof: 129.90, carrefour: 139.00, osher_ad: null, victory: null, max_stock: 99.90, hastock: 119.90, max_stock_online: 159.00, stock_online: 249.00 }
  },
  {
    id: 'p_living_room_rug_120_180',
    name: 'שטיח סלון מודרני גיאומטרי קל לניקוי 120x180 ס״מ',
    category: 'decor',
    unit: 'יח׳',
    aliases: ['שטיח', 'שטיח סלון', 'שטיח 120x180'],
    prices: { rami_levy: 109.90, shufersal: 169.90, yohananof: 139.90, carrefour: 149.00, osher_ad: null, victory: null, max_stock: 99.90, hastock: 129.90, max_stock_online: 169.00, stock_online: 299.00 }
  },
  {
    id: 'p_curtains_pair_rod',
    name: 'זוג וילונות הצללה לסלון / חדר שינה + מוט תלייה טלסקופי',
    category: 'decor',
    unit: 'סט וילונות + מוט',
    aliases: ['וילון', 'וילונות', 'זוג וילונות', 'מוט וילון'],
    prices: { rami_levy: 59.80, shufersal: 99.90, yohananof: 79.90, carrefour: 84.90, osher_ad: null, victory: null, max_stock: 61.70, hastock: 79.80, max_stock_online: 99.00, stock_online: 139.00 }
  },
  {
    id: 'p_artificial_plant_decor',
    name: 'עץ מלאכותי דקורטיבי בוגונוויליה/פיקוס + 3 עציצים סוקולנטים + 2 כריות נוי לסלון',
    category: 'decor',
    unit: 'חבילת סטיילינג',
    aliases: ['עציץ', 'עץ מלאכותי', 'כריות נוי', 'אקססוריז לבית'],
    prices: { rami_levy: 119.60, shufersal: 179.90, yohananof: 149.90, carrefour: 159.00, osher_ad: null, victory: null, max_stock: 121.50, hastock: 139.60, max_stock_online: 169.00, stock_online: 249.00 }
  },
  {
    id: 'p_lighting_package',
    name: 'חבילת תאורה מלאה: שנדליר 3 קנים + מנורת שולחן מודרנית + מארז 6 נורות LED חסכוניות',
    category: 'decor',
    unit: 'מארז תאורה',
    aliases: ['תאורה', 'מנורה', 'נורות LED', 'שנדליר'],
    prices: { rami_levy: 119.70, shufersal: 189.90, yohananof: 159.90, carrefour: 169.00, osher_ad: null, victory: null, max_stock: 120.70, hastock: 149.70, max_stock_online: 179.00, stock_online: 279.00 }
  }
];

// יצירת מפת מלאי inStock לכל מוצר
products.forEach(p => {
  p.inStock = {};
  STORES.forEach(s => {
    p.inStock[s] = p.prices[s] !== null && p.prices[s] !== undefined;
  });
});

console.log('Total catalog products built:', products.length);

const weeklyGroceryList = [
  'תבנית 12 ביצים L (פיקוח)',
  'חלב תנובה 3% בקרטון 1 ליטר (פיקוח)',
  'גבינה צהובה עמק תנובה 28% פרוסה 200 גרם',
  'קוטג׳ תנובה 5% 250 גרם',
  'גבינה לבנה תנובה 5% 250 גרם (פיקוח)',
  'לחם אחיד כהה פרוס 750 גרם (פיקוח)',
  'עגבניות חממה טריות (ק״ג)',
  'מלפפונים ירוקים טריים (ק״ג)',
  'בצל יבש מובחר (ק״ג)',
  'תפוחי אדמה לבנים בשקית (ק״ג)',
  'חזה עוף טרי פרוס לשניצל (ק״ג)',
  'אורז פרסי קלאסי סוגת 1 ק״ג',
  'פסטה ברילה (ספגטי / פנה) 500 גרם',
  'שמן קנולה מזוכך 1 ליטר',
  'קפה שחור קלוי וטחון עלית 100 גרם',
  'קפה נמס נסקפה טייסטרס צ׳ויס Nescafe 200 גרם',
  'נוזל לניקוי כלים פיירי Fairy לימון 650 מ״ל',
  'נייר טואלט לילי פרימיום דו-שכבתי 32 גלילים',
  'חטיף בוטנים במבה אסם 80 גרם',
  'טונה בהירה בשמן צמחי מארז רביעייה (4x140 גרם)'
];

const rentalApartmentList = [
  'סיר נירוסטה / נון סטיק 24 ס״מ עם מכסה זכוכית',
  'סוטאז׳ רחב 28 ס״מ Non-Stick לבישול וצלייה',
  'זוג מחבתות Non-Stick קוטר 20 ס״מ + 24 ס״מ',
  'סט 12 צלחות אוכל פורצלן / אופל (4 מנות עיקריות, 4 עמוקות, 4 קינוח)',
  'סט סכו״ם נירוסטה 24 חלקים מלא (6 סכינים, 6 מזלגות, 6 כפות, 6 כפיות)',
  'מארז 6 כוסות שתייה קרה מזכוכית + 6 מאגים קרמיקה לקפה',
  'מייבש כלים דו-קומתי מודרני ממתכת בציפוי אל-חלד עם מגש ניקוז',
  'מארז 10 קופסאות אחסון מזון הרמטיות + מסננת נירוסטה וסט 5 כלי ששת',
  'ערכת ניקיון מלאה לדירה (דלי שטיפה + מגב סיליקון + מטאטא ויעה + 5 מטליות מיקרופייבר)',
  'סל כביסה מתקפל + מארז 48 אטבי כביסה + 3 שקיות רשת לכביסה עדינה',
  'אבזור אמבטיה ללא קידוח סדרת OCEAN (מתקן ואקום למברשות, מעמד סבון, ווים כפולים)',
  'שטיח אמבטיה ספוג זיכרון נגד החלקה + שטיח כניסה לבית',
  '2 מגבות גוף גדולות 100% כותנה + 2 מגבות פנים + 3 מגבות מטבח איכותיות',
  'סט מצעים זוגי 100% כותנה / מיקרופייבר יוקרתי + זוג כריות שינה אורתופדיות',
  'שולחן סלון מודרני / זוג שולחנות קפה עגולים בסגנון סקנדינבי',
  'כוורת 6 תאים מודולרית / מעמד מדפים לאחסון ספרים וחפצים',
  'ארון נעליים מעץ 3 תאים מתקפלים דמוי אלון / לבן',
  'מעמד מתכת נייד על גלגלים לתליית בגדים + מדף נעליים תחתון',
  'זוג שידות צד למיטה עם מגירה + מעמד מדפי במבוק',
  'ערכת כלי עבודה ידניים מלאה בארגז (פטיש, פלייר, מפתח שבדי, מטר, קאטר, סט מברגים ודיבלים)',
  'מברגה / מקדחה נטענת 12V כוללת סוללה ומטען מהיר',
  'ערכת צביעה ואיטום (רולר, מברשת, מסקינטייפ, שפכטל, שפכטל אמריקאי 1 ק״ג, אקדח סיליקון וסיליקון לבן)',
  'מראת גוף עומדת עם מסגרת דקה מודרנית (פרוטוקול פתיחה ובדיקת שבר בקופה!)',
  'שטיח סלון מודרני גיאומטרי קל לניקוי 120x180 ס״מ',
  'זוג וילונות הצללה לסלון / חדר שינה + מוט תלייה טלסקופי',
  'עץ מלאכותי דקורטיבי בוגונוויליה/פיקוס + 3 עציצים סוקולנטים + 2 כריות נוי לסלון',
  'חבילת תאורה מלאה: שנדליר 3 קנים + מנורת שולחן מודרנית + מארז 6 נורות LED חסכוניות'
];

const headerPart = '// נתוני רשתות ומוצרים מעודכנים לשנת 2026 - סופרמרקטים + רשתות סטוק וכלי בית\n\n' +
'export const STORES_METADATA = {\n' +
'  // ==========================================\n' +
'  // רשתות מזון וסופרמרקטים מובילים בישראל\n' +
'  // ==========================================\n' +
'  rami_levy: {\n' +
'    id: "rami_levy",\n' +
'    name: "רמי לוי (שיווק השקמה / אונליין / סטוק)",\n' +
'    shortName: "רמי לוי",\n' +
'    color: "#0284c7",\n' +
'    badgeColor: "bg-blue-600",\n' +
'    sector: "food",\n' +
'    sectorLabel: "סופרמרקט + סטוק ענק",\n' +
'    type: "סניפים + אונליין",\n' +
'    baseDeliveryFee: 35.9,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 100,\n' +
'    deliveryNote: "משלוח עד הבית ₪35.90 קבוע (איסוף בסניף ₪0)",\n' +
'    iconText: "רמי לוי"\n' +
'  },\n' +
'  shufersal: {\n' +
'    id: "shufersal",\n' +
'    name: "שופרסל (דיל / שלי / אונליין)",\n' +
'    shortName: "שופרסל",\n' +
'    color: "#059669",\n' +
'    badgeColor: "bg-emerald-600",\n' +
'    sector: "food",\n' +
'    sectorLabel: "רשת מזון וסופרמרקט",\n' +
'    type: "סניפים + אונליין",\n' +
'    baseDeliveryFee: 35.0,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 150,\n' +
'    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף בסניף ₪0)",\n' +
'    iconText: "שופרסל"\n' +
'  },\n' +
'  yohananof: {\n' +
'    id: "yohananof",\n' +
'    name: "סופרשוק יוחננוף",\n' +
'    shortName: "יוחננוף",\n' +
'    color: "#dc2626",\n' +
'    badgeColor: "bg-red-600",\n' +
'    sector: "food",\n' +
'    sectorLabel: "רשת מזון ולואו-קוסט",\n' +
'    type: "סניפים + אונליין",\n' +
'    baseDeliveryFee: 32.0,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 100,\n' +
'    deliveryNote: "משלוח עד הבית ₪32.00 (איסוף בסניף ₪0)",\n' +
'    iconText: "יוחננוף"\n' +
'  },\n' +
'  carrefour: {\n' +
'    id: "carrefour",\n' +
'    name: "קרפור ישראל (Carrefour)",\n' +
'    shortName: "קרפור",\n' +
'    color: "#2563eb",\n' +
'    badgeColor: "bg-blue-600",\n' +
'    sector: "food",\n' +
'    sectorLabel: "רשת מזון בינלאומית",\n' +
'    type: "סניפים + אונליין",\n' +
'    baseDeliveryFee: 34.0,\n' +
'    freeDeliveryThreshold: 450,\n' +
'    minOrder: 120,\n' +
'    deliveryNote: "משלוח ₪34.00 (חינם מעל ₪450, איסוף ₪0)",\n' +
'    iconText: "קרפור"\n' +
'  },\n' +
'  osher_ad: {\n' +
'    id: "osher_ad",\n' +
'    name: "אושר עד (סניפי דיסקאונט ומארזים)",\n' +
'    shortName: "אושר עד",\n' +
'    color: "#d97706",\n' +
'    badgeColor: "bg-amber-600",\n' +
'    sector: "food",\n' +
'    sectorLabel: "דיסקאונט מארזי ענק",\n' +
'    type: "סניפים בלבד",\n' +
'    baseDeliveryFee: 0,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 0,\n' +
'    deliveryNote: "סניפים בלבד (ללא משלוח ישיר, איסוף ₪0)",\n' +
'    iconText: "אושר עד"\n' +
'  },\n' +
'  victory: {\n' +
'    id: "victory",\n' +
'    name: "ויקטורי (סופרמרקט / אונליין)",\n' +
'    shortName: "ויקטורי",\n' +
'    color: "#7c3aed",\n' +
'    badgeColor: "bg-purple-600",\n' +
'    sector: "food",\n' +
'    sectorLabel: "רשת סופרמרקטים",\n' +
'    type: "סניפים + אונליין",\n' +
'    baseDeliveryFee: 35.0,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 100,\n' +
'    deliveryNote: "משלוח עד הבית ₪35.00 קבוע (איסוף בסניף ₪0)",\n' +
'    iconText: "ויקטורי"\n' +
'  },\n' +
'\n' +
'  // ==========================================\n' +
'  // רשתות הסטוק והלואו-קוסט המובילות בישראל\n' +
'  // ==========================================\n' +
'  max_stock: {\n' +
'    id: "max_stock",\n' +
'    name: "מקס סטוק (סניפים פיזיים)",\n' +
'    shortName: "מקס סטוק",\n' +
'    color: "#e11d48",\n' +
'    badgeColor: "bg-rose-600",\n' +
'    sector: "stock",\n' +
'    sectorLabel: "רשת סטוק וכלי בית",\n' +
'    type: "סניפים בלבד (64 סניפים)",\n' +
'    baseDeliveryFee: 0,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 0,\n' +
'    deliveryNote: "איסוף עצמי בסניף (₪0)",\n' +
'    iconText: "מקס סטוק"\n' +
'  },\n' +
'  hastock: {\n' +
'    id: "hastock",\n' +
'    name: "הסטוק (רשת הסטוק)",\n' +
'    shortName: "הסטוק",\n' +
'    color: "#ea580c",\n' +
'    badgeColor: "bg-orange-600",\n' +
'    sector: "stock",\n' +
'    sectorLabel: "רשת סטוק וכלי בית",\n' +
'    type: "סניפים + משלוחים (51 סניפים)",\n' +
'    baseDeliveryFee: 35.0,\n' +
'    freeDeliveryThreshold: 350,\n' +
'    minOrder: 50,\n' +
'    deliveryNote: "משלוח עד הבית ₪35 (חינם מעל ₪350, איסוף ₪0)",\n' +
'    iconText: "הסטוק"\n' +
'  },\n' +
'  max_stock_online: {\n' +
'    id: "max_stock_online",\n' +
'    name: "מקס סטוק אונליין",\n' +
'    shortName: "מקס אונליין",\n' +
'    color: "#9333ea",\n' +
'    badgeColor: "bg-purple-600",\n' +
'    sector: "stock",\n' +
'    sectorLabel: "אתר ייעודי לריהוט וסטוק",\n' +
'    type: "משלוחים בלבד",\n' +
'    baseDeliveryFee: 99.0,\n' +
'    perAdditionalItemFee: 70.0,\n' +
'    freeDeliveryThreshold: 0,\n' +
'    minOrder: 80,\n' +
'    deliveryNote: "₪99 לפריט 1 + ₪70 לכל פריט נוסף (איסוף חינם קיסריה/אשדוד)",\n' +
'    iconText: "מקס אונליין"\n' +
'  },\n' +
'  stock_online: {\n' +
'    id: "stock_online",\n' +
'    name: "סטוק אונליין (Stock Online)",\n' +
'    shortName: "סטוק אונליין",\n' +
'    color: "#10b981",\n' +
'    badgeColor: "bg-emerald-600",\n' +
'    sector: "stock",\n' +
'    sectorLabel: "חנות מקוונת לבית ולסטוק",\n' +
'    type: "חנות מקוונת בלבד",\n' +
'    baseDeliveryFee: 70.0,\n' +
'    freeDeliveryThreshold: 299,\n' +
'    minOrder: 50,\n' +
'    deliveryNote: "משלוח ₪70 (משלוח חינם מעל ₪299)",\n' +
'    iconText: "סטוק Online"\n' +
'  }\n' +
'};\n\n' +
'export const CATEGORIES = [\n' +
'  { id: "all", name: "הכל", icon: "🛒" },\n' +
'  { id: "dairy_eggs", name: "חלב וביצים", icon: "🥛" },\n' +
'  { id: "produce", name: "פירות וירקות", icon: "🍎" },\n' +
'  { id: "meat_fish", name: "בשר ודגים", icon: "🍗" },\n' +
'  { id: "bakery", name: "לחם ומאפים", icon: "🥖" },\n' +
'  { id: "pantry", name: "מזווה ושימורים", icon: "🥫" },\n' +
'  { id: "snacks_drinks", name: "שתייה וחטיפים", icon: "☕" },\n' +
'  { id: "cleaning_bath", name: "ניקיון וטיפוח", icon: "🧼" },\n' +
'  { id: "kitchen", name: "מטבח ואירוח", icon: "🍳" },\n' +
'  { id: "furniture", name: "ריהוט ואחסון", icon: "🛋️" },\n' +
'  { id: "diy", name: "כלי עבודה ו-DIY", icon: "🔧" },\n' +
'  { id: "decor", name: "אקססוריז ועיצוב", icon: "💡" }\n' +
'];\n\n' +
'export const CATALOG_PRODUCTS = ' + JSON.stringify(products, null, 2) + ';\n\n' +
'export const WEEKLY_GROCERY_BASKET = ' + JSON.stringify(weeklyGroceryList, null, 2) + ';\n\n' +
'export const RENTAL_APARTMENT_BASKET = ' + JSON.stringify(rentalApartmentList, null, 2) + ';\n\n' +
'export const MEGA_COMBINED_BASKET = [\n  ...WEEKLY_GROCERY_BASKET,\n  ...RENTAL_APARTMENT_BASKET\n];\n\n' +
'export const INITIAL_USER_LIST = WEEKLY_GROCERY_BASKET.join("\\n");\n';

fs.writeFileSync(path.join(__dirname, '../src/data/mockStoresData.js'), headerPart, 'utf8');
console.log('Done generating full mockStoresData.js!');
