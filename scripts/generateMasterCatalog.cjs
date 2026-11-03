const fs = require('fs');
const path = require('path');

function r(val) {
  return Math.round(val * 10) / 10;
}

// 1. GROCERY PRODUCTS LIST
const rawGrocery = [
  // חלב וביצים
  { id: 'p_eggs_l_12', name: 'תבנית 12 ביצים L (פיקוח)', category: 'dairy_eggs', unit: 'תבנית 12 יח׳', isRegulated: true, aliases: ['ביצים', 'ביצים L', 'תבנית ביצים', 'ביצים 12'], basePrice: 14.30, foodOnly: true, regulated: true },
  { id: 'p_eggs_xl_12', name: 'תבנית 12 ביצים XL', category: 'dairy_eggs', unit: 'תבנית 12 יח׳', aliases: ['ביצים XL', 'ביצים ענקיות'], basePrice: 15.90, foodOnly: true },
  { id: 'p_eggs_l_30', name: 'תבנית ענק 30 ביצים L', category: 'dairy_eggs', unit: 'תבנית 30 יח׳', aliases: ['30 ביצים', 'תבנית 30 ביצים'], basePrice: 33.90, foodOnly: true },
  { id: 'p_eggs_free_range', name: 'ביצי חופש L תבנית 12 יח׳', category: 'dairy_eggs', unit: 'תבנית 12 יח׳', aliases: ['ביצי חופש', 'ביצים אורגניות'], basePrice: 19.90, foodOnly: true },
  { id: 'p_milk_3pct_carton', name: 'חלב תנובה 3% בקרטון 1 ליטר (פיקוח)', category: 'dairy_eggs', unit: 'ליטר', isRegulated: true, aliases: ['חלב', 'חלב 3%', 'קרטון חלב'], basePrice: 7.11, foodOnly: true, regulated: true },
  { id: 'p_milk_1pct_carton', name: 'חלב תנובה 1% בקרטון 1 ליטר (פיקוח)', category: 'dairy_eggs', unit: 'ליטר', isRegulated: true, aliases: ['חלב 1%', 'חלב דל שומן'], basePrice: 6.64, foodOnly: true, regulated: true },
  { id: 'p_milk_3pct_bag', name: 'חלב תנובה 3% בשקית 1 ליטר (פיקוח)', category: 'dairy_eggs', unit: 'ליטר', isRegulated: true, aliases: ['חלב בשקית', 'שקית חלב'], basePrice: 5.94, foodOnly: true, regulated: true },
  { id: 'p_milk_lactose_free', name: 'חלב דל לקטוז 3% תנובה 1 ליטר', category: 'dairy_eggs', unit: 'ליטר', aliases: ['דל לקטוז', 'חלב ללא לקטוז'], basePrice: 8.90, foodOnly: true },
  { id: 'p_soya_milk_tnuva', name: 'משקה סויה תנובה ביו תוספת סידן 1 ליטר', category: 'dairy_eggs', unit: 'ליטר', aliases: ['חלב סויה', 'סויה תנובה'], basePrice: 8.90, foodOnly: true },
  { id: 'p_oat_milk_alpro', name: 'משקה שיבולת שועל אלפרו Alpro 1 ליטר', category: 'dairy_eggs', unit: 'ליטר', aliases: ['חלב שיבולת שועל', 'אלפרו'], basePrice: 11.90, foodOnly: true },
  { id: 'p_almond_milk_alpro', name: 'משקה שקדים ללא סוכר אלפרו 1 ליטר', category: 'dairy_eggs', unit: 'ליטר', aliases: ['חלב שקדים', 'אלפרו שקדים'], basePrice: 11.90, foodOnly: true },
  { id: 'p_butter_tnuva_100g', name: 'חמאה תנובה 100 גרם (פיקוח)', category: 'dairy_eggs', unit: 'יח׳', isRegulated: true, aliases: ['חמאה', 'חמאה תנובה', 'חמאה 100 גרם'], basePrice: 4.44, foodOnly: true, regulated: true },
  { id: 'p_butter_lurpak_200g', name: 'חמאת לורפאק Lurpak מלוחה 200 גרם', category: 'dairy_eggs', unit: 'יח׳', aliases: ['לורפאק', 'חמאת לורפאק'], basePrice: 14.90, foodOnly: true },
  { id: 'p_cheese_emek_200g', name: 'גבינה צהובה עמק 28% תנובה פרוסה 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['גבינה צהובה', 'עמק', 'צהובה 200 גרם'], basePrice: 13.90, foodOnly: true },
  { id: 'p_cheese_emek_grated_500g', name: 'גבינה צהובה עמק מגוררת לפיצה וטוסט 500 גרם', category: 'dairy_eggs', unit: 'שקית', aliases: ['צהובה מגוררת', 'עמק מגוררת', 'גבינה לפיצה'], basePrice: 28.90, foodOnly: true },
  { id: 'p_cheese_noam_200g', name: 'גבינה צהובה נועם טרה פרוסה 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['נועם טרה', 'גבינה נועם'], basePrice: 13.50, foodOnly: true },
  { id: 'p_cheese_gouda_200g', name: 'גבינת גאודה הולנדית מיושנת פרוסה 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['גאודה', 'גבינת גאודה'], basePrice: 16.90, foodOnly: true },
  { id: 'p_cheese_parmesan_100g', name: 'גבינת פרמז׳ן איטלקית מגוררת 100 גרם', category: 'dairy_eggs', unit: 'שקית', aliases: ['פרמזן', 'פרמז׳ן'], basePrice: 13.90, foodOnly: true },
  { id: 'p_cheese_mozzarella_200g', name: 'גבינת מוצרלה פרסקה / מגוררת 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['מוצרלה', 'גבינת מוצרלה'], basePrice: 14.90, foodOnly: true },
  { id: 'p_white_cheese_5pct_250g', name: 'גבינה לבנה תנובה 5% 250 גרם (פיקוח)', category: 'dairy_eggs', unit: 'גביע', isRegulated: true, aliases: ['גבינה לבנה', 'גבינה לבנה 5%'], basePrice: 5.43, foodOnly: true, regulated: true },
  { id: 'p_white_cheese_9pct_250g', name: 'גבינה לבנה תנובה 9% 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['גבינה לבנה 9%'], basePrice: 6.20, foodOnly: true },
  { id: 'p_white_cheese_ski_250g', name: 'גבינה לבנה סקי שטראוס 5% 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['סקי', 'סקי שטראוס'], basePrice: 5.90, foodOnly: true },
  { id: 'p_cottage_5pct_250g', name: 'קוטג׳ תנובה 5% 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['קוטג', 'קוטג׳', 'קוטג 5%'], basePrice: 6.90, foodOnly: true },
  { id: 'p_cottage_9pct_250g', name: 'קוטג׳ תנובה 9% 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['קוטג 9%'], basePrice: 6.90, foodOnly: true },
  { id: 'p_cheese_napoleon_225g', name: 'גבינת שמנת נפוליאון 24% 225 גרם (טבעי/שום שמיר)', category: 'dairy_eggs', unit: 'גביע', aliases: ['נפוליאון', 'גבינת שמנת'], basePrice: 12.90, foodOnly: true },
  { id: 'p_cheese_philadelphia_200g', name: 'גבינת שמנת פילדלפיה Philadelphia 200 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['פילדלפיה', 'גבינת פילדלפיה'], basePrice: 14.90, foodOnly: true },
  { id: 'p_labaneh_piraues_250g', name: 'לאבנה אסלית פיראוס 9% עם שמן זית וזעתר 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['לאבנה', 'לבנה פיראוס'], basePrice: 11.90, foodOnly: true },
  { id: 'p_cheese_bulgarian_250g', name: 'גבינה בולגרית פיראוס 5% 250 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['בולגרית', 'גבינה בולגרית'], basePrice: 14.90, foodOnly: true },
  { id: 'p_cheese_feta_sheep_250g', name: 'גבינת פטה כבשים פיראוס 16% 250 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['פטה', 'גבינת פטה'], basePrice: 17.90, foodOnly: true },
  { id: 'p_cheese_halloumi_200g', name: 'גבינת חלומי קפריסאית לטיגון וצלייה 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['חלומי', 'גבינת חלומי'], basePrice: 16.90, foodOnly: true },
  { id: 'p_cheese_ricotta_gad_250g', name: 'גבינת ריקוטה פרסקה 5% מחלב בקר גד 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['ריקוטה', 'גבינת ריקוטה'], basePrice: 11.90, foodOnly: true },
  { id: 'p_cheese_tzfatit_gad_200g', name: 'גבינה צפתית מעודנת 5% גד 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['צפתית', 'גבינה צפתית'], basePrice: 13.90, foodOnly: true },
  { id: 'p_cheese_mascarpone_gad', name: 'גבינת מסקרפונה איטלקית לעוגות וטירמיסו גד 250 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['מסקרפונה'], basePrice: 16.90, foodOnly: true },
  { id: 'p_cheese_gilboa_tnuva_200g', name: 'גבינה צהובה גלבוע 22% תנובה פרוסה 200 גרם', category: 'dairy_eggs', unit: 'מארז', aliases: ['גלבוע', 'גבינת גלבוע'], basePrice: 13.90, foodOnly: true },
  { id: 'p_actimel_strawberry_8pack', name: 'אקטימל יוגורט פרוביוטי תות שטראוס מארז 8 בקבוקונים', category: 'dairy_eggs', unit: 'מארז 8 יח׳', aliases: ['אקטימל', 'אקטימל תות'], basePrice: 17.90, foodOnly: true },
  { id: 'p_pro_yogurt_tnuva_20g', name: 'יוגורט מועשר בחלבון GO תנובה 20 גרם חלבון', category: 'dairy_eggs', unit: 'גביע', aliases: ['יוגורט פרו', 'גו תנובה', 'יוגורט חלבון'], basePrice: 6.90, foodOnly: true },
  { id: 'p_sour_cream_15pct', name: 'שמנת חמוצה תנובה 15% 200 מ״ל (פיקוח)', category: 'dairy_eggs', unit: 'גביע', isRegulated: true, aliases: ['שמנת חמוצה', 'שמנת 15%'], basePrice: 2.63, foodOnly: true, regulated: true },
  { id: 'p_sour_cream_27pct', name: 'שמנת חמוצה של פעם תנובה 27% 200 מ״ל', category: 'dairy_eggs', unit: 'גביע', aliases: ['שמנת של פעם', 'שמנת 27%'], basePrice: 4.90, foodOnly: true },
  { id: 'p_whipping_cream_38pct', name: 'שמנת מתוקה להקצפה 38% השף הלבן 250 מ״ל', category: 'dairy_eggs', unit: 'מיכל', aliases: ['שמנת מתוקה', 'שמנת להקצפה'], basePrice: 7.90, foodOnly: true },
  { id: 'p_cooking_cream_15pct', name: 'שמנת לבישול 15% השף הלבן 250 מ״ל', category: 'dairy_eggs', unit: 'מיכל', aliases: ['שמנת לבישול'], basePrice: 6.90, foodOnly: true },
  { id: 'p_danone_bio_200g', name: 'יוגורט דנונה ביו שטראוס 3% 200 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['יוגורט', 'דנונה'], basePrice: 4.90, foodOnly: true },
  { id: 'p_greek_yogurt_yoplait', name: 'יוגורט יווני יופלה 7% שומן 150 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['יוגורט יווני', 'יופלה יווני'], basePrice: 5.50, foodOnly: true },
  { id: 'p_muller_simply_fruit', name: 'יוגורט מולר סימפלי פירות Muller 150 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['מולר', 'יוגורט מולר'], basePrice: 5.20, foodOnly: true },
  { id: 'p_milky_chocolate', name: 'מעדן חלב מילקי שוקולד שטראוס 133 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['מילקי', 'מילקי שוקולד'], basePrice: 3.20, foodOnly: true },
  { id: 'p_dani_chocolate_pudding', name: 'מעדן שוקולד דני שטראוס 125 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['דני', 'מעדן דני'], basePrice: 2.90, foodOnly: true },
  { id: 'p_gamadim_straw_banana', name: 'מעדן גמדים תות בננה שטראוס 100 גרם', category: 'dairy_eggs', unit: 'גביע', aliases: ['גמדים', 'מעדן גמדים'], basePrice: 3.10, foodOnly: true },
  { id: 'p_choco_yotvata_1l', name: 'משקה שוקו יטבתה 1 ליטר בבקבוק', category: 'dairy_eggs', unit: 'בקבוק', aliases: ['שוקו', 'שוקו יטבתה'], basePrice: 9.90, foodOnly: true },

  // פירות וירקות טריים
  { id: 'p_tomatoes_kg', name: 'עגבניות חממה טריות (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['עגבניות', 'עגבניה', 'קילו עגבניות'], basePrice: 4.90, foodOnly: true },
  { id: 'p_cherry_tomatoes_pack', name: 'עגבניות שרי אשכולות מארז 500 גרם', category: 'produce', unit: 'מארז', aliases: ['עגבניות שרי', 'שרי'], basePrice: 5.90, foodOnly: true },
  { id: 'p_maggie_tomatoes_kg', name: 'עגבניות מגי פרימיום בטעם עשיר (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['עגבניות מגי', 'מגי'], basePrice: 11.90, foodOnly: true },
  { id: 'p_cucumbers_kg', name: 'מלפפונים ירוקים טריים (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['מלפפונים', 'מלפפון'], basePrice: 4.90, foodOnly: true },
  { id: 'p_baby_cucumbers_pack', name: 'מלפפוני בייבי קראנץ׳ מארז 500 גרם', category: 'produce', unit: 'מארז', aliases: ['מלפפון בייבי', 'בייבי קראנץ'], basePrice: 7.90, foodOnly: true },
  { id: 'p_onions_dry_kg', name: 'בצל יבש מובחר (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['בצל', 'בצל יבש'], basePrice: 3.90, foodOnly: true },
  { id: 'p_red_onions_kg', name: 'בצל סגול מתוק (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['בצל סגול'], basePrice: 5.90, foodOnly: true },
  { id: 'p_potatoes_bag_kg', name: 'תפוחי אדמה לבנים בשקית (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['תפוחי אדמה', 'תפוח אדמה', 'תפו״א'], basePrice: 4.50, foodOnly: true },
  { id: 'p_red_potatoes_kg', name: 'תפוחי אדמה אדומים גורמה (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['תפוח אדמה אדום'], basePrice: 5.50, foodOnly: true },
  { id: 'p_sweet_potato_kg', name: 'בטטה כתומה מובחרת (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['בטטה', 'בטטות'], basePrice: 7.90, foodOnly: true },
  { id: 'p_red_peppers_kg', name: 'פלפל אדום מתוק - גמבה (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['פלפל אדום', 'גמבה', 'פלפלים'], basePrice: 7.90, foodOnly: true },
  { id: 'p_yellow_peppers_kg', name: 'פלפל צהוב עסיסי (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['פלפל צהוב'], basePrice: 8.90, foodOnly: true },
  { id: 'p_hot_peppers_kg', name: 'פלפל ירוק חריף טרי (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['פלפל חריף', 'ירוק חריף'], basePrice: 8.90, foodOnly: true },
  { id: 'p_carrots_bag_kg', name: 'גזר טרי ארוז בשקית (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['גזר', 'שקית גזר'], basePrice: 3.90, foodOnly: true },
  { id: 'p_zucchini_kg', name: 'קישואים ירוקים טריים (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['קישוא', 'קישואים'], basePrice: 5.90, foodOnly: true },
  { id: 'p_eggplant_kg', name: 'חציל בלדי / חממה טרי (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['חציל', 'חצילים'], basePrice: 5.90, foodOnly: true },
  { id: 'p_white_cabbage_kg', name: 'כרוב לבן טרי (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['כרוב', 'כרוב לבן'], basePrice: 3.50, foodOnly: true },
  { id: 'p_red_cabbage_kg', name: 'כרוב סגול (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['כרוב אדום', 'כרוב סגול'], basePrice: 4.50, foodOnly: true },
  { id: 'p_romaine_lettuce', name: 'חסה ערבית רעננה (יחידה)', category: 'produce', unit: 'יח׳', aliases: ['חסה', 'חסה ערבית'], basePrice: 4.90, foodOnly: true },
  { id: 'p_salanova_lettuce_pack', name: 'חסה סלנובה / עלי בייבי שטופים מארז', category: 'produce', unit: 'מארז', aliases: ['עלי בייבי', 'סלנובה'], basePrice: 7.90, foodOnly: true },
  { id: 'p_parsley_bunch', name: 'פטרוזיליה רעננה צרור', category: 'produce', unit: 'צרור', aliases: ['פטרוזיליה', 'ירק'], basePrice: 2.90, foodOnly: true },
  { id: 'p_coriander_bunch', name: 'כוסברה רעננה צרור', category: 'produce', unit: 'צרור', aliases: ['כוסברה'], basePrice: 2.90, foodOnly: true },
  { id: 'p_dill_bunch', name: 'שמיר רענן צרור', category: 'produce', unit: 'צרור', aliases: ['שמיר'], basePrice: 2.90, foodOnly: true },
  { id: 'p_mint_bunch', name: 'נענע רעננה לתה ולסלט צרור', category: 'produce', unit: 'צרור', aliases: ['נענע', 'נענע לתה'], basePrice: 2.90, foodOnly: true },
  { id: 'p_scallions_bunch', name: 'בצל ירוק רענן צרור', category: 'produce', unit: 'צרור', aliases: ['בצל ירוק'], basePrice: 3.50, foodOnly: true },
  { id: 'p_garlic_net_pack', name: 'שום יבש מובחר מארז רשת (4-5 ראשים)', category: 'produce', unit: 'רשת', aliases: ['שום', 'ראשי שום'], basePrice: 6.90, foodOnly: true },
  { id: 'p_ginger_root_kg', name: 'שורש ג׳ינג׳ר טרי מובחר (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['ג׳ינג׳ר', 'זנגביל'], basePrice: 19.90, foodOnly: true },
  { id: 'p_champignon_mushrooms', name: 'פטריות שמפיניון טריות סלסילה 250 גרם', category: 'produce', unit: 'סלסילה', aliases: ['פטריות', 'שמפיניון'], basePrice: 7.90, foodOnly: true },
  { id: 'p_portobello_mushrooms', name: 'פטריות פורטובלו בשרניות סלסילה', category: 'produce', unit: 'סלסילה', aliases: ['פורטובלו', 'פטריות פורטובלו'], basePrice: 9.90, foodOnly: true },
  { id: 'p_lemons_kg', name: 'לימונים עסיסיים טריים (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['לימון', 'לימונים'], basePrice: 6.90, foodOnly: true },
  { id: 'p_bananas_kg', name: 'בננות טריות (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['בננות', 'בננה'], basePrice: 6.90, foodOnly: true },
  { id: 'p_apples_hermon_kg', name: 'תפוחי עץ חרמון אדומים (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['תפוחים', 'תפוחי עץ', 'תפוח אדום'], basePrice: 8.90, foodOnly: true },
  { id: 'p_apples_granny_smith_kg', name: 'תפוחי עץ גרני סמית ירוקים (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['תפוח ירוק', 'גרני סמית'], basePrice: 9.90, foodOnly: true },
  { id: 'p_apples_pink_lady_kg', name: 'תפוחי עץ פינק ליידי פרימיום (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['פינק ליידי'], basePrice: 11.90, foodOnly: true },
  { id: 'p_avocado_kg', name: 'אבוקדו מובחר (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['אבוקדו'], basePrice: 9.90, foodOnly: true },
  { id: 'p_oranges_kg', name: 'תפוזים טריים לאכילה ולמיץ (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['תפוזים', 'תפוז'], basePrice: 5.90, foodOnly: true },
  { id: 'p_clementines_kg', name: 'קלמנטינות מתוקות (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['קלמנטינות', 'קלמנטינה'], basePrice: 6.90, foodOnly: true },
  { id: 'p_strawberries_pack', name: 'תות שדה ישראלי מובחר מארז 500 גרם', category: 'produce', unit: 'מארז', aliases: ['תותים', 'תות שדה'], basePrice: 14.90, foodOnly: true },
  { id: 'p_broccoli_fresh', name: 'ברוקולי טרי רענן מובחר (יחידה)', category: 'produce', unit: 'יח׳', aliases: ['ברוקולי'], basePrice: 8.90, foodOnly: true },
  { id: 'p_cauliflower_fresh', name: 'כרובית לבנה טרייה ויפה (יחידה)', category: 'produce', unit: 'יח׳', aliases: ['כרובית'], basePrice: 8.90, foodOnly: true },
  { id: 'p_beets_vacuum_500g', name: 'סלק אדום מבושל באריזת ואקום 500 גרם', category: 'produce', unit: 'מארז', aliases: ['סלק', 'סלק מבושל'], basePrice: 6.90, foodOnly: true },
  { id: 'p_grapes_seedless_box', name: 'ענבים ירוקים ללא חרצנים מתוקים סלסילה 500 גרם', category: 'produce', unit: 'סלסילה', aliases: ['ענבים', 'ענבים ירוקים', 'ענבים ללא גרעינים'], basePrice: 12.90, foodOnly: true },
  { id: 'p_watermelon_mini', name: 'אבטיח אישי מתוק על הסכין (יחידה)', category: 'produce', unit: 'יח׳', aliases: ['אבטיח', 'אבטיח אישי'], basePrice: 14.90, foodOnly: true },
  { id: 'p_melon_galia', name: 'מלון גליה מתוק וריחני (יחידה)', category: 'produce', unit: 'יח׳', aliases: ['מלון', 'מלון גליה'], basePrice: 9.90, foodOnly: true },
  { id: 'p_pears_spolona_kg', name: 'אגסים מובחרים (ק״ג)', category: 'produce', unit: 'ק״ג', aliases: ['אגסים', 'אגס'], basePrice: 9.90, foodOnly: true },

  // בשר, עוף, דגים וקפואים
  { id: 'p_chicken_breast_schnitzel_kg', name: 'חזה עוף טרי פרוס לשניצל (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['חזה עוף', 'שניצל עוף', 'חזה עוף פרוס'], basePrice: 34.90, foodOnly: true },
  { id: 'p_chicken_thighs_kg', name: 'כרעיים עוף טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['כרעיים', 'כרעיים עוף'], basePrice: 24.90, foodOnly: true },
  { id: 'p_chicken_drumsticks_kg', name: 'שוקיים עוף טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['שוקיים', 'פולקע'], basePrice: 26.90, foodOnly: true },
  { id: 'p_whole_chicken_kg', name: 'עוף שלם טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['עוף שלם'], basePrice: 18.90, foodOnly: true },
  { id: 'p_chicken_wings_kg', name: 'כנפיים עוף טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['כנפיים', 'כנפי עוף'], basePrice: 14.90, foodOnly: true },
  { id: 'p_chicken_fillet_kg', name: 'פילה עוף טרי מובחר (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['פילה עוף'], basePrice: 38.90, foodOnly: true },
  { id: 'p_ground_beef_fresh_kg', name: 'בשר בקר טחון טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['בשר טחון', 'בקר טחון'], basePrice: 49.90, foodOnly: true },
  { id: 'p_beef_stew_goulash_kg', name: 'בקר טרי לצלי וגולאש מס׳ 5 (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['בשר לצלי', 'גולאש', 'צלי מס 5'], basePrice: 69.90, foodOnly: true },
  { id: 'p_entrecote_fresh_kg', name: 'סטייק אנטריקוט בקר טרי מיושן (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['אנטריקוט', 'סטייק אנטריקוט'], basePrice: 129.90, foodOnly: true },
  { id: 'p_salmon_fillet_kg', name: 'פילה סלמון נורווגי טרי / קפוא (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['סלמון', 'פילה סלמון'], basePrice: 59.90, foodOnly: true },
  { id: 'p_tilapia_fillet_kg', name: 'פילה אמנון (מושט) קפוא ללא עצמות (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['אמנון', 'מושט', 'פילה אמנון'], basePrice: 29.90, foodOnly: true },
  { id: 'p_denis_fish_kg', name: 'דג דניס שלם טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['דניס', 'דג דניס'], basePrice: 54.90, foodOnly: true },
  { id: 'p_frozen_schnitzel_mamaof_700g', name: 'שניצל עוף אמיתי מאמא עוף 700 גרם', category: 'meat_fish', unit: 'מארז', aliases: ['מאמא עוף', 'שניצל קפוא'], basePrice: 29.90, foodOnly: true },
  { id: 'p_corn_schnitzel_tivall_750g', name: 'שניצל תירס צמחוני טבעול 750 גרם', category: 'meat_fish', unit: 'אריזה', aliases: ['שניצל תירס', 'טבעול'], basePrice: 27.90, foodOnly: true },
  { id: 'p_burgers_frozen_tivonvil_8pcs', name: 'המבורגר בקר קפוא טיבון ויל 8 יח׳', category: 'meat_fish', unit: 'מארז', aliases: ['המבורגר', 'המבורגר קפוא'], basePrice: 24.90, foodOnly: true },
  { id: 'p_hotdogs_zoglobaek_400g', name: 'נקניקיות עוף זוגלובק 400 גרם', category: 'meat_fish', unit: 'חבילה', aliases: ['נקניקיות', 'נקניקיות זוגלובק'], basePrice: 9.90, foodOnly: true },
  { id: 'p_pastrami_turkey_zoglobaek', name: 'פסטרמה הודו בדבש זוגלובק 400 גרם', category: 'meat_fish', unit: 'מארז', aliases: ['פסטרמה', 'פסטרמה הודו'], basePrice: 19.90, foodOnly: true },
  { id: 'p_puff_pastry_maadanot_1kg', name: 'בצק עלים מרודד קפוא מעדנות 1 ק״ג', category: 'meat_fish', unit: 'חבילה', aliases: ['בצק עלים', 'מעדנות'], basePrice: 16.90, foodOnly: true },
  { id: 'p_malawach_maadanot_700g', name: 'מלוואח תימני מסורתי מעדנות 700 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['מלוואח', 'מלוח'], basePrice: 14.90, foodOnly: true },
  { id: 'p_jachnun_maadanot_1kg', name: 'ג׳חנון תימני קפוא מעדנות 1 ק״ג', category: 'meat_fish', unit: 'שקית', aliases: ['גחנון', 'ג׳חנון'], basePrice: 18.90, foodOnly: true },
  { id: 'p_bourekas_cheese_800g', name: 'בורקס גבינה / תפו״א מעדנות 800 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['בורקס', 'בורקס גבינה'], basePrice: 17.90, foodOnly: true },
  { id: 'p_tuna_oil_4pack', name: 'טונה בהירה בשמן צמחי מארז רביעייה (4x140 גרם)', category: 'meat_fish', unit: 'מארז 4 יח׳', aliases: ['טונה', 'טונה בשמן', 'מארז טונה'], basePrice: 16.90, foodOnly: false },
  { id: 'p_tuna_water_4pack', name: 'טונה בהירה במים מארז רביעייה (4x140 גרם)', category: 'meat_fish', unit: 'מארז 4 יח׳', aliases: ['טונה במים'], basePrice: 16.90, foodOnly: false },
  { id: 'p_frozen_peas_sunfrost_800g', name: 'אפונה ירוקה עדינה סנפרוסט 800 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['סנפרוסט', 'אפונה סנפרוסט'], basePrice: 14.90, foodOnly: true },
  { id: 'p_frozen_green_beans_800g', name: 'שעועית ירוקה עדינה סנפרוסט 800 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['שעועית ירוקה', 'שעועית סנפרוסט'], basePrice: 14.90, foodOnly: true },
  { id: 'p_chicken_pargiyot_kg', name: 'סטייק פרגיות עוף טרי מובחר (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['פרגיות', 'פרגית', 'סטייק פרגיות'], basePrice: 59.90, foodOnly: true },
  { id: 'p_ground_chicken_fresh_kg', name: 'בשר עוף והודו טחון טרי (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['עוף טחון', 'הודו טחון'], basePrice: 34.90, foodOnly: true },
  { id: 'p_asado_beef_ribs_kg', name: 'אסאדו בקר טרי עם עצם לקדירה ולמנגל (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['אסאדו', 'בשר אסאדו', 'בקר עם עצם'], basePrice: 59.90, foodOnly: true },
  { id: 'p_kebab_oriental_beef_kg', name: 'קבב מזרחי בקר מובחר מוכן לצלייה (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['קבב', 'קבב מזרחי', 'קבב בקר'], basePrice: 44.90, foodOnly: true },
  { id: 'p_merguez_sausages_kg', name: 'נקניקיות מרגז פיקנטיות בקר (ק״ג)', category: 'meat_fish', unit: 'ק״ג', aliases: ['מרגז', 'נקניקיות מרגז'], basePrice: 49.90, foodOnly: true },
  { id: 'p_frozen_fries_tfugan_1kg', name: 'צ׳יפס קפוא תפוגן לתנור 1 ק״ג', category: 'meat_fish', unit: 'שקית', aliases: ['צ׳יפס תפוגן', 'ציפס קפוא'], basePrice: 11.90, foodOnly: true },
  { id: 'p_frozen_stirfry_sunfrost', name: 'לקט ירקות להקפצה סיני סנפרוסט 800 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['לקט להקפצה', 'ירקות מוקפצים'], basePrice: 15.90, foodOnly: true },
  { id: 'p_frozen_soup_mix_sunfrost', name: 'לקט ירקות כפרי למרק סנפרוסט 800 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['לקט למרק', 'סנפרוסט למרק'], basePrice: 14.90, foodOnly: true },
  { id: 'p_frozen_pizza_family_maadanot', name: 'פיצה משפחתית קלאסית מעדנות עם 100% גבינה 500 גרם', category: 'meat_fish', unit: 'קופסה', aliases: ['פיצה', 'פיצה קפואה', 'פיצה מעדנות'], basePrice: 18.90, foodOnly: true },
  { id: 'p_falafel_balls_maadanot', name: 'כדורי פלאפל מוכנים לחימום מעדנות 500 גרם', category: 'meat_fish', unit: 'שקית', aliases: ['פלאפל', 'כדורי פלאפל'], basePrice: 14.90, foodOnly: true },

  // לחם ומאפים
  { id: 'p_bread_standard_dark_750g', name: 'לחם אחיד כהה פרוס 750 גרם (פיקוח)', category: 'bakery', unit: 'כיכר', isRegulated: true, aliases: ['לחם', 'לחם אחיד', 'לחם פרוס'], basePrice: 7.91, foodOnly: true, regulated: true },
  { id: 'p_bread_standard_white_750g', name: 'לחם אחיד לבן פרוס 750 גרם (פיקוח)', category: 'bakery', unit: 'כיכר', isRegulated: true, aliases: ['לחם לבן', 'לחם לבן פרוס'], basePrice: 7.91, foodOnly: true, regulated: true },
  { id: 'p_bread_whole_wheat_sliced', name: 'לחם 100% חיטה מלאה פרוס 750 גרם', category: 'bakery', unit: 'כיכר', aliases: ['לחם מלא', 'חיטה מלאה'], basePrice: 11.90, foodOnly: true },
  { id: 'p_bread_sourdough_artisan', name: 'לחם מחמצת קראסט ארטיזנל כפרי', category: 'bakery', unit: 'כיכר', aliases: ['לחם מחמצת', 'מחמצת'], basePrice: 16.90, foodOnly: true },
  { id: 'p_challah_shabbat', name: 'חלת שבת קלועה מסורתית', category: 'bakery', unit: 'יח׳', aliases: ['חלה', 'חלת שבת', 'חלה קלועה'], basePrice: 6.90, foodOnly: true },
  { id: 'p_challah_sweet', name: 'חלה מתוקה עגולה לשבת ולחג', category: 'bakery', unit: 'יח׳', aliases: ['חלה מתוקה'], basePrice: 7.90, foodOnly: true },
  { id: 'p_pita_bread_10pack', name: 'פיתות טריות מארז 10 יחידות', category: 'bakery', unit: 'מארז 10 יח׳', aliases: ['פיתות', 'פיתה', 'מארז פיתות'], basePrice: 8.90, foodOnly: true },
  { id: 'p_pita_spelt_6pack', name: 'פיתות כוסמין 100% מארז 6 יחידות', category: 'bakery', unit: 'מארז 6 יח׳', aliases: ['פיתות כוסמין'], basePrice: 12.90, foodOnly: true },
  { id: 'p_pita_mini_cocktail_15pack', name: 'מיני פיתות קוקטייל לילדים ולאירוח מארז 15 יח׳', category: 'bakery', unit: 'מארז 15 יח׳', aliases: ['מיני פיתות', 'פיתות קוקטייל'], basePrice: 9.90, foodOnly: true },
  { id: 'p_laffa_iraqi_5pack', name: 'לאפה עיראקית טרייה מארז 5 יחידות', category: 'bakery', unit: 'מארז 5 יח׳', aliases: ['לאפה', 'לאפות'], basePrice: 9.90, foodOnly: true },
  { id: 'p_bagel_toast_sesame_4pack', name: 'בייגל טוסט ירושלמי עם שומשום מארז 4 יח׳', category: 'bakery', unit: 'מארז 4 יח׳', aliases: ['בייגל טוסט', 'בייגל ירושלמי'], basePrice: 11.90, foodOnly: true },
  { id: 'p_burger_buns_6pack', name: 'לחמניות המבורגר / אצבע מארז 6 יחידות', category: 'bakery', unit: 'מארז 6 יח׳', aliases: ['לחמניות', 'לחמניות המבורגר'], basePrice: 9.90, foodOnly: true },
  { id: 'p_finger_buns_8pack', name: 'לחמניות אצבע לילדים לבית הספר מארז 8 יח׳', category: 'bakery', unit: 'מארז 8 יח׳', aliases: ['לחמניות אצבע', 'לחמניות לילדים'], basePrice: 10.90, foodOnly: true },
  { id: 'p_tortillas_8pack', name: 'טורטיות חיטה איכותיות מארז 8 יחידות', category: 'bakery', unit: 'מארז 8 יח׳', aliases: ['טורטיות', 'טורטיה'], basePrice: 7.90, foodOnly: false },
  { id: 'p_rice_cakes_100g', name: 'פריכיות אורז מלא דקות 100 גרם', category: 'bakery', unit: 'חבילה', aliases: ['פריכיות', 'פריכיות אורז'], basePrice: 4.90, foodOnly: false },
  { id: 'p_patit_crackers_250g', name: 'פתית קרקרים דגנים מלאים 250 גרם', category: 'bakery', unit: 'אריזה', aliases: ['פתית', 'קרקרים'], basePrice: 9.90, foodOnly: false },
  { id: 'p_breadcrumbs_golden_400g', name: 'פירורי לחם מוזהבים מתובלים לשניצל 400 גרם', category: 'bakery', unit: 'שקית', aliases: ['פירורי לחם', 'פירורי לחם לשניצל'], basePrice: 6.90, foodOnly: false },
  { id: 'p_rugelach_chocolate_500g', name: 'רוגלך שוקולד פרימיום טריים מארז 500 גרם', category: 'bakery', unit: 'קופסה', aliases: ['רוגלך', 'רוגעלך'], basePrice: 16.90, foodOnly: true },
  { id: 'p_yeast_cake_chocolate_elite', name: 'עוגת שמרים שוקולד עשירה עלית 400 גרם', category: 'bakery', unit: 'אריזה', aliases: ['עוגת שמרים', 'עוגת שמרים עלית'], basePrice: 14.90, foodOnly: true },
  { id: 'p_marble_cake_osem', name: 'עוגת הבית שיש שוקולד-וניל אסם 350 גרם', category: 'bakery', unit: 'אריזה', aliases: ['עוגת הבית', 'עוגת שיש אסם'], basePrice: 12.90, foodOnly: true },
  { id: 'p_croissant_butter_4pack', name: 'קרואסון חמאה צרפתי מארז 4 יחידות', category: 'bakery', unit: 'מארז 4 יח׳', aliases: ['קרואסון', 'קרואסונים'], basePrice: 14.90, foodOnly: true },

  // מזווה, שימורים ושמנים
  { id: 'p_rice_persian_sugat_1kg', name: 'אורז פרסי קלאסי סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['אורז', 'אורז פרסי', 'אורז סוגת'], basePrice: 8.90, foodOnly: true },
  { id: 'p_rice_jasmine_1kg', name: 'אורז יסמין תאילנדי מובחר סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['אורז יסמין', 'יסמין'], basePrice: 9.90, foodOnly: true },
  { id: 'p_rice_basmati_1kg', name: 'אורז בסמטי הודי ארוך סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['אורז בסמטי', 'בסמטי'], basePrice: 11.90, foodOnly: true },
  { id: 'p_pasta_barilla_500g', name: 'פסטה ברילה (ספגטי / פנה / פוזילי) 500 גרם', category: 'pantry', unit: 'חבילה', aliases: ['פסטה', 'ברילה', 'ספגטי', 'פנה'], basePrice: 5.90, foodOnly: false },
  { id: 'p_pasta_osem_500g', name: 'פסטה אסם צורות / מסולסלת 500 גרם', category: 'pantry', unit: 'שקית', aliases: ['פסטה אסם', 'מקרוני אסם'], basePrice: 4.90, foodOnly: false },
  { id: 'p_lasagna_barilla_500g', name: 'דפי לזניה ברילה Barilla Lasagne 500 גרם', category: 'pantry', unit: 'אריזה', aliases: ['לזניה', 'דפי לזניה'], basePrice: 12.90, foodOnly: false },
  { id: 'p_ptitim_osem_500g', name: 'פתיתים אפויים אסם 500 גרם', category: 'pantry', unit: 'שקית', aliases: ['פתיתים', 'פתיתים אסם'], basePrice: 4.90, foodOnly: false },
  { id: 'p_couscous_osem_350g', name: 'קוסקוס מהיר הכנה דק / בינוני אסם 350 גרם', category: 'pantry', unit: 'שקית', aliases: ['קוסקוס', 'קוסקוס אסם'], basePrice: 5.90, foodOnly: false },
  { id: 'p_quinoa_sugat_500g', name: 'קינואה לבנה איכותית סוגת 500 גרם', category: 'pantry', unit: 'שקית', aliases: ['קינואה', 'קינואה לבנה'], basePrice: 11.90, foodOnly: true },
  { id: 'p_lentils_green_500g', name: 'עדשים ירוקות סוגת 500 גרם', category: 'pantry', unit: 'שקית', aliases: ['עדשים', 'עדשים ירוקות'], basePrice: 6.90, foodOnly: true },
  { id: 'p_lentils_red_500g', name: 'עדשים אדומות מובחרות סוגת 500 גרם', category: 'pantry', unit: 'שקית', aliases: ['עדשים אדומות'], basePrice: 7.90, foodOnly: true },
  { id: 'p_canola_oil_1l', name: 'שמן קנולה מזוכך 1 ליטר', category: 'pantry', unit: 'בקבוק', aliases: ['שמן', 'שמן קנולה', 'שמן טיגון'], basePrice: 7.90, foodOnly: true },
  { id: 'p_olive_oil_extra_virgin_750ml', name: 'שמן זית כתית מעולה חמיצות עד 0.5% 750 מ״ל', category: 'pantry', unit: 'בקבוק', aliases: ['שמן זית', 'שמן זית כתית', 'כתית מעולה'], basePrice: 29.90, foodOnly: true },
  { id: 'p_sugar_white_sugat_1kg', name: 'סוכר לבן סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['סוכר', 'סוכר לבן'], basePrice: 4.50, foodOnly: true },
  { id: 'p_sugar_demerara_1kg', name: 'סוכר חום דמררה סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['סוכר חום', 'דמררה'], basePrice: 8.90, foodOnly: true },
  { id: 'p_salt_table_fine_1kg', name: 'מלח שולחן דק 1 ק״ג במלחייה / שקית', category: 'pantry', unit: 'ק״ג', aliases: ['מלח', 'מלח שולחן'], basePrice: 2.20, foodOnly: false },
  { id: 'p_flour_white_1kg', name: 'קמח לבן בהיר סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['קמח', 'קמח לבן'], basePrice: 3.90, foodOnly: true },
  { id: 'p_flour_self_raising_1kg', name: 'קמח תופח מאליו אסם 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['קמח תופח'], basePrice: 5.90, foodOnly: true },
  { id: 'p_flour_spelt_1kg', name: 'קמח כוסמין מלא 100% סוגת 1 ק״ג', category: 'pantry', unit: 'ק״ג', aliases: ['קמח כוסמין'], basePrice: 11.90, foodOnly: true },
  { id: 'p_tomato_paste_jachin_3pack', name: 'רסק עגבניות 28-30% יכין שלישייה (3x100 גרם)', category: 'pantry', unit: 'מארז שלישייה', aliases: ['רסק', 'רסק עגבניות'], basePrice: 6.90, foodOnly: false },
  { id: 'p_mutti_polpa_400g', name: 'עגבניות מרוסקות דק Mutti Polpa 400 גרם', category: 'pantry', unit: 'פחית', aliases: ['מוטי', 'עגבניות מוטי', 'פולפה'], basePrice: 6.90, foodOnly: false },
  { id: 'p_ketchup_osem_750g', name: 'קטשופ אסם ענק 750 גרם', category: 'pantry', unit: 'בקבוק', aliases: ['קטשופ', 'קטשופ אסם'], basePrice: 10.90, foodOnly: false },
  { id: 'p_ketchup_heinz_700g', name: 'קטשופ היינץ Heinz לחיץ 700 גרם', category: 'pantry', unit: 'בקבוק', aliases: ['היינץ', 'קטשופ היינץ'], basePrice: 12.90, foodOnly: false },
  { id: 'p_mayo_telma_500g', name: 'מיונז אמיתי תלמה 500 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['מיונז', 'מיונז תלמה'], basePrice: 9.90, foodOnly: false },
  { id: 'p_mayo_hellmanns_400g', name: 'מיונז הלמנס Hellmanns מקורי 400 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['הלמנס', 'מיונז הלמנס'], basePrice: 11.90, foodOnly: false },
  { id: 'p_mustard_dijon_200g', name: 'חרדל דיז׳ון איכותי חלק / גרגירים 200 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['חרדל', 'דיזון'], basePrice: 8.90, foodOnly: false },
  { id: 'p_soy_sauce_kikkoman_250ml', name: 'רוטב סויה יפני טבעי קיקומן Kikkoman 250 מ״ל', category: 'pantry', unit: 'בקבוק', aliases: ['סויה', 'קיקומן'], basePrice: 14.90, foodOnly: false },
  { id: 'p_sweet_chili_sauce_700ml', name: 'רוטב צ׳ילי מתוק תאילנדי אסם 700 מ״ל', category: 'pantry', unit: 'בקבוק', aliases: ['צ׳ילי מתוק', 'רוטב צלי'], basePrice: 9.90, foodOnly: false },
  { id: 'p_silan_pure_dates_900g', name: 'סילאן תמרים טבעי 100% תמרים ללא סוכר 900 גרם', category: 'pantry', unit: 'לחיץ', aliases: ['סילאן', 'סילאן טבעי'], basePrice: 13.90, foodOnly: false },
  { id: 'p_honey_yad_mordechai_500g', name: 'דבש דבורים טהור יד מרדכי 500 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['דבש', 'יד מרדכי'], basePrice: 19.90, foodOnly: true },
  { id: 'p_corn_canned_jachin', name: 'תירס מתוק גרגירים יכין פחית 550 גרם', category: 'pantry', unit: 'פחית', aliases: ['תירס', 'שימורי תירס'], basePrice: 5.50, foodOnly: false },
  { id: 'p_chickpeas_canned_jachin', name: 'גרגירי חומוס מבושלים יכין 550 גרם', category: 'pantry', unit: 'פחית', aliases: ['חומוס שימורים', 'גרגירי חומוס'], basePrice: 5.50, foodOnly: false },
  { id: 'p_tahini_raw_500g', name: 'טחינה גולמית טהורה 100% שומשום (הר ברכה / אל ארז) 500 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['טחינה', 'טחינה גולמית', 'אל ארז'], basePrice: 11.90, foodOnly: false },
  { id: 'p_hashahar_spread_500g', name: 'ממרח שוקולד השחר העולה 500 גרם', category: 'pantry', unit: 'מיכל', aliases: ['השחר', 'שוקולד השחר'], basePrice: 11.90, foodOnly: false },
  { id: 'p_nutella_350g', name: 'ממרח אגוזי לוז וקקאו נוטלה 350 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['נוטלה', 'שוקולד נוטלה'], basePrice: 12.90, foodOnly: false },
  { id: 'p_peanut_butter_skippy', name: 'חמאת בוטנים סקיפי Skippy עם שברי בוטנים 462 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['סקיפי', 'חמאת בוטנים'], basePrice: 16.90, foodOnly: false },
  { id: 'p_lotus_spread_400g', name: 'ממרח עוגיות לוטוס Biscoff מקורי 400 גרם', category: 'pantry', unit: 'צנצנת', aliases: ['לוטוס', 'ממרח לוטוס'], basePrice: 14.90, foodOnly: false },
  { id: 'p_teriyaki_sauce_300ml', name: 'רוטב טריאקי סמיך יפני אסם 300 מ״ל', category: 'pantry', unit: 'בקבוק', aliases: ['טריאקי', 'רוטב טריאקי'], basePrice: 11.90, foodOnly: false },
  { id: 'p_thousand_island_dressing', name: 'רוטב אלף האיים קלאסי לסלט אסם 600 מ״ל', category: 'pantry', unit: 'לחיץ', aliases: ['אלף האיים', 'רוטב אלף האיים'], basePrice: 12.90, foodOnly: false },
  { id: 'p_garlic_mayo_dressing', name: 'רוטב שום עשיר לסלט ולטוסט אסם 600 מ״ל', category: 'pantry', unit: 'לחיץ', aliases: ['רוטב שום', 'שום לסלט'], basePrice: 12.90, foodOnly: false },
  { id: 'p_olives_green_pitted', name: 'זיתים ירוקים חרוזים ללא גלעין בית השיטה 560 גרם', category: 'pantry', unit: 'פחית', aliases: ['זיתים', 'זיתים ירוקים', 'זיתים חרוזים'], basePrice: 6.90, foodOnly: false },
  { id: 'p_pickles_in_salt_7_9', name: 'מלפפונים חמוצים במלח 7-9 מובחרים בית השיטה 560 גרם', category: 'pantry', unit: 'פחית', aliases: ['מלפפונים חמוצים', 'חמוצים במלח', 'מלפפונים במלח'], basePrice: 6.50, foodOnly: false },
  { id: 'p_pickles_in_vinegar_7_9', name: 'מלפפונים חמוצים בחומץ 7-9 בית השיטה 560 גרם', category: 'pantry', unit: 'פחית', aliases: ['חמוצים בחומץ', 'מלפפון חמוץ בחומץ'], basePrice: 6.50, foodOnly: false },
  { id: 'p_mushrooms_sliced_canned', name: 'פטריות חתוכות משומרות יכין פחית 400 גרם', category: 'pantry', unit: 'פחית', aliases: ['פטריות שימורים', 'שימורי פטריות'], basePrice: 5.50, foodOnly: false },
  { id: 'p_sunflower_oil_1l', name: 'שמן חמניות מזוכך לטיגון ולאפייה 1 ליטר', category: 'pantry', unit: 'בקבוק', aliases: ['שמן חמניות'], basePrice: 7.90, foodOnly: true },

  // שתייה, חטיפים וקפה
  { id: 'p_black_coffee_elite_100g', name: 'קפה שחור קלוי וטחון עלית 100 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['קפה שחור', 'קפה עלית'], basePrice: 5.90, foodOnly: false },
  { id: 'p_tasters_choice_200g', name: 'קפה נמס נסקפה טייסטרס צ׳ויס Nescafe 200 גרם', category: 'snacks_drinks', unit: 'צנצנת', aliases: ['טייסטרס צויס', 'טייסטרס צ׳ויס', 'נס קפה'], basePrice: 24.90, foodOnly: false },
  { id: 'p_jacobs_kronung_200g', name: 'קפה נמס מיובש בהקפאה ג׳ייקובס קרוננג Jacobs 200 גרם', category: 'snacks_drinks', unit: 'צנצנת', aliases: ['גייקובס', 'ג׳ייקובס'], basePrice: 22.90, foodOnly: false },
  { id: 'p_nespresso_capsules_lor_10', name: 'מארז 10 קפסולות קפה LOR תואמות נספרסו', category: 'snacks_drinks', unit: 'מארז 10 יח׳', aliases: ['קפסולות קפה', 'נספרסו', 'קפסולות נספרסו'], basePrice: 14.90, foodOnly: false },
  { id: 'p_wissotzky_classic_100tea', name: 'תה ויסוצקי קלאסי 100 שקיקים', category: 'snacks_drinks', unit: 'אריזה', aliases: ['תה', 'תה ויסוצקי', '100 תה'], basePrice: 14.90, foodOnly: false },
  { id: 'p_green_tea_lemon_wissotzky', name: 'תה ירוק לימונית לואיזה ויסוצקי 25 שקיקים', category: 'snacks_drinks', unit: 'קופסה', aliases: ['תה ירוק', 'לימונית לואיזה'], basePrice: 13.90, foodOnly: false },
  { id: 'p_shocolit_500g', name: 'שוקולית עלית 500 גרם להכנת שוקו חם וקר', category: 'snacks_drinks', unit: 'אריזה', aliases: ['שוקולית', 'שוקולית עלית', 'שוקו'], basePrice: 14.90, foodOnly: false },
  { id: 'p_cornflakes_telma_750g', name: 'קורנפלקס תלמה של אלופים 750 גרם', category: 'snacks_drinks', unit: 'אריזה', aliases: ['קורנפלקס', 'קורנפלקס תלמה', 'דגני בוקר'], basePrice: 15.90, foodOnly: false },
  { id: 'p_kariyot_cereal_750g', name: 'דגני בוקר כריות במילוי קרם שוקולד תלמה 750 גרם', category: 'snacks_drinks', unit: 'אריזה', aliases: ['כריות', 'כריות תלמה'], basePrice: 21.90, foodOnly: false },
  { id: 'p_quaker_oats_500g', name: 'שיבולת שועל להכנת דייסה קוואקר 500 גרם', category: 'snacks_drinks', unit: 'מיכל', aliases: ['קוואקר', 'שיבולת שועל'], basePrice: 9.90, foodOnly: false },
  { id: 'p_water_sixpack_1_5l', name: 'שישיית מים מינרליים נביעות / עין גדי (6x1.5 ליטר)', category: 'snacks_drinks', unit: 'שישייה', aliases: ['מים', 'שישיית מים', 'נביעות'], basePrice: 11.90, foodOnly: true },
  { id: 'p_coca_cola_1_5l', name: 'קוקה קולה קלאסי 1.5 ליטר', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['קולה', 'קוקה קולה'], basePrice: 6.90, foodOnly: true },
  { id: 'p_coca_cola_zero_1_5l', name: 'קוקה קולה זירו Coca-Cola Zero 1.5 ליטר', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['קולה זירו', 'זירו'], basePrice: 6.90, foodOnly: true },
  { id: 'p_sprite_zero_1_5l', name: 'ספרייט זירו Sprite Zero 1.5 ליטר', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['ספרייט', 'ספרייט זירו'], basePrice: 6.90, foodOnly: true },
  { id: 'p_fuze_tea_peach_1_5l', name: 'פיוז טי Fuze Tea אפרסק 1.5 ליטר', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['פיוז טי', 'תה קר'], basePrice: 6.90, foodOnly: true },
  { id: 'p_orange_juice_prigat_2l', name: 'מיץ תפוזים סחוט טבעי פריגת 2 ליטר', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['מיץ תפוזים', 'פריגת תפוזים'], basePrice: 16.90, foodOnly: true },
  { id: 'p_beer_goldstar_6pack', name: 'שישיית בירה גולדסטאר Goldstar בקבוק 330 מ״ל', category: 'snacks_drinks', unit: 'שישייה', aliases: ['בירה', 'גולדסטאר', 'שישיית בירה'], basePrice: 32.90, foodOnly: true },
  { id: 'p_wine_hermon_golan_750ml', name: 'יין אדום חרמון הר גולן יקבי רמת הגולן 750 מ״ל', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['יין', 'יין אדום', 'חרמון אדום'], basePrice: 34.90, foodOnly: true },
  { id: 'p_bamba_osem_80g', name: 'חטיף בוטנים במבה אסם 80 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['במבה', 'במבה אסם'], basePrice: 3.90, foodOnly: false },
  { id: 'p_bamba_nougat_60g', name: 'במבה במילוי קרם נוגט אסם 60 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['במבה נוגט'], basePrice: 4.20, foodOnly: false },
  { id: 'p_bisli_grill_70g', name: 'חטיף חיטה ביסלי גריל אסם 70 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['ביסלי', 'ביסלי גריל'], basePrice: 3.90, foodOnly: false },
  { id: 'p_tapuchips_classic_50g', name: 'חטיף תפוחי אדמה תפוצ׳יפס קלאסי עלית 50 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['תפוציפס', 'תפוצ׳יפס'], basePrice: 3.90, foodOnly: false },
  { id: 'p_doritos_spicy_sour_70g', name: 'חטיף תירס דוריטוס חמוץ חריף עלית 70 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['דוריטוס'], basePrice: 4.50, foodOnly: false },
  { id: 'p_petit_beurre_osem_500g', name: 'ביסקוויט פטיבר קלאסי אסם 500 גרם', category: 'snacks_drinks', unit: 'אריזה', aliases: ['פטיבר', 'פטי בר'], basePrice: 9.90, foodOnly: false },
  { id: 'p_oreo_cookies_154g', name: 'עוגיות סנדוויץ׳ שוקולד אוריאו Oreo 154 גרם', category: 'snacks_drinks', unit: 'חבילה', aliases: ['אוריאו', 'עוגיות אוריאו'], basePrice: 6.90, foodOnly: false },
  { id: 'p_chocolate_parah_milk_100g', name: 'טבלת שוקולד חלב פרה עלית 100 גרם', category: 'snacks_drinks', unit: 'טבלה', aliases: ['שוקולד פרה', 'שוקולד עלית'], basePrice: 4.90, foodOnly: false },
  { id: 'p_chocolate_lindt_70pct', name: 'שוקולד מריר מעולה 70% לינדט Lindt Excellence 100 גרם', category: 'snacks_drinks', unit: 'טבלה', aliases: ['לינדט', 'שוקולד לינדט'], basePrice: 13.90, foodOnly: false },
  { id: 'p_pesek_zman_bar', name: 'חטיף ופל פסק זמן שוקולד חלב עלית 45 גרם', category: 'snacks_drinks', unit: 'יח׳', aliases: ['פסק זמן', 'חטיף פסק זמן'], basePrice: 4.20, foodOnly: false },
  { id: 'p_kif_kef_bar', name: 'חטיף כיף כף אצבעות ופל מצופה שוקולד עלית 45 גרם', category: 'snacks_drinks', unit: 'יח׳', aliases: ['כיף כף'], basePrice: 4.20, foodOnly: false },
  { id: 'p_taami_bar', name: 'חטיף שוקולד טעמי קרמל ונוגט פצפוצי אורז עלית 40 גרם', category: 'snacks_drinks', unit: 'יח׳', aliases: ['טעמי', 'חטיף טעמי'], basePrice: 4.20, foodOnly: false },
  { id: 'p_bisli_onion_70g', name: 'חטיף חיטה ביסלי בצל אסם 70 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['ביסלי בצל'], basePrice: 3.90, foodOnly: false },
  { id: 'p_bisli_bbq_70g', name: 'חטיף חיטה ביסלי ברביקיו אסם 70 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['ביסלי ברביקיו'], basePrice: 3.90, foodOnly: false },
  { id: 'p_pretzels_sesame_300g', name: 'בייגלה שמיניות אפוי עם שומשום אסם 300 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['בייגלה', 'בייגלה אסם', 'בייגלה שומשום'], basePrice: 8.90, foodOnly: false },
  { id: 'p_pretzels_flat_shtuach', name: 'בייגלה שטוחים מלוח אפוי אסם 300 גרם', category: 'snacks_drinks', unit: 'שקית', aliases: ['שטוחים', 'בייגלה שטוחים'], basePrice: 8.90, foodOnly: false },
  { id: 'p_lotus_biscuits_250g', name: 'עוגיות לוטוס Biscoff קרמל מקוריות 250 גרם', category: 'snacks_drinks', unit: 'חבילה', aliases: ['עוגיות לוטוס', 'לוטוס עוגיות'], basePrice: 9.90, foodOnly: false },
  { id: 'p_fanta_orange_1_5l', name: 'פאנטה מוגז בטעם תפוזים Fanta 1.5 ליטר', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['פנטה', 'פאנטה'], basePrice: 6.90, foodOnly: true },
  { id: 'p_soda_tempo_sixpack', name: 'שישיית מי סודה טמפו מוגזים 1.5 ליטר', category: 'snacks_drinks', unit: 'שישייה', aliases: ['סודה', 'שישיית סודה', 'מי סודה'], basePrice: 13.90, foodOnly: true },
  { id: 'p_grape_juice_tirosh_1l', name: 'מיץ ענבים תירוש כרמל מזרחי 1 ליטר לקידוש', category: 'snacks_drinks', unit: 'בקבוק', aliases: ['תירוש', 'מיץ ענבים תירוש', 'יין לקידוש'], basePrice: 17.90, foodOnly: true },

  // מוצרי תינוקות
  { id: 'p_huggies_diapers_size4', name: 'חיתולי האגיס Huggies Extra Care מידה 4 (44 חיתולים)', category: 'baby', unit: 'חבילה', aliases: ['חיתולים', 'האגיס', 'טיטולים', 'האגיס מידה 4'], basePrice: 39.90, foodOnly: false },
  { id: 'p_huggies_diapers_size3', name: 'חיתולי האגיס Huggies Extra Care מידה 3 (52 חיתולים)', category: 'baby', unit: 'חבילה', aliases: ['האגיס מידה 3'], basePrice: 39.90, foodOnly: false },
  { id: 'p_huggies_diapers_size5', name: 'חיתולי האגיס Huggies Extra Care מידה 5 (38 חיתולים)', category: 'baby', unit: 'חבילה', aliases: ['האגיס מידה 5'], basePrice: 39.90, foodOnly: false },
  { id: 'p_pampers_diapers_size4', name: 'חיתולי פמפרס פרימיום קר מידה 4 מארז חודשי', category: 'baby', unit: 'חבילה', aliases: ['פמפרס', 'פמפרס מידה 4'], basePrice: 42.90, foodOnly: false },
  { id: 'p_huggies_wipes_4pack', name: 'מגבונים לחים לתינוק האגיס מארז רביעייה (4x64 מגבונים)', category: 'baby', unit: 'מארז 4 יח׳', aliases: ['מגבונים', 'מגבונים לחים', 'מגבוני האגיס'], basePrice: 16.90, foodOnly: false },
  { id: 'p_materna_gold_step1', name: 'תרכובת מזון לתינוק מטרנה גולד שלב 1 700 גרם', category: 'baby', unit: 'קופסה', aliases: ['מטרנה', 'מטרנה שלב 1'], basePrice: 54.90, foodOnly: true },
  { id: 'p_materna_gold_step2', name: 'תרכובת מזון לתינוק מטרנה גולד שלב 2 700 גרם', category: 'baby', unit: 'קופסה', aliases: ['מטרנה שלב 2'], basePrice: 54.90, foodOnly: true },
  { id: 'p_similac_gold_step1', name: 'תרכובת מזון לתינוק סימילאק גולד שלב 1 800 גרם', category: 'baby', unit: 'קופסה', aliases: ['סימילאק', 'סימילאק שלב 1'], basePrice: 84.90, foodOnly: true },
  { id: 'p_similac_gold_step2', name: 'תרכובת מזון לתינוק סימילאק גולד שלב 2 800 גרם', category: 'baby', unit: 'קופסה', aliases: ['סימילאק שלב 2'], basePrice: 84.90, foodOnly: true },
  { id: 'p_nutrilon_step1', name: 'תרכובת מזון לתינוק נוטרילון שלב 1 800 גרם', category: 'baby', unit: 'קופסה', aliases: ['נוטרילון', 'נוטרילון שלב 1'], basePrice: 69.90, foodOnly: true },
  { id: 'p_gerber_puree_apple_banana', name: 'מחית פירות גרבר Gerber שלב 2 תפוח ובננה 130 גרם', category: 'baby', unit: 'צנצנת', aliases: ['גרבר', 'מחית גרבר'], basePrice: 5.90, foodOnly: true },
  { id: 'p_materna_oat_porridge', name: 'דייסת שיבולת שועל לתינוק מטרנה 200 גרם', category: 'baby', unit: 'אריזה', aliases: ['דייסת מטרנה', 'דייסה לתינוק'], basePrice: 12.90, foodOnly: true },
  { id: 'p_mam_baby_bottle_260ml', name: 'בקבוק הזנה לתינוק מאמ MAM אנטי קוליק 260 מ״ל', category: 'baby', unit: 'יח׳', aliases: ['בקבוק מאמ', 'בקבוק לתינוק'], basePrice: 34.90, foodOnly: false },
  { id: 'p_mam_pacifiers_pair', name: 'מוצצי סיליקון מאמ MAM זוג לגילאי 6+ חודשים', category: 'baby', unit: 'זוג', aliases: ['מוצצים', 'מוצצי מאמ'], basePrice: 29.90, foodOnly: false },
  { id: 'p_johnsons_baby_shampoo', name: 'שמפו ואל-דמע לתינוק ג׳ונסונס בייבי 500 מ״ל', category: 'baby', unit: 'בקבוק', aliases: ['שמפו לתינוק', 'גונסונס'], basePrice: 14.90, foodOnly: false },
  { id: 'p_sudocrem_125g', name: 'קרם החתלה טיפולי לתינוק סודוקרם Sudocrem 125 גרם', category: 'baby', unit: 'צנצנת', aliases: ['סודוקרם', 'קרם החתלה'], basePrice: 27.90, foodOnly: false },

  // ניקיון וטיפוח לבית ולגוף
  { id: 'p_fairy_dish_soap_650ml', name: 'נוזל לניקוי כלים פיירי Fairy לימון 650 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['פיירי', 'נוזל כלים'], basePrice: 8.90, foodOnly: false },
  { id: 'p_fairy_dish_soap_1_5l', name: 'נוזל לניקוי כלים פיירי Fairy חסכוני 1.5 ליטר', category: 'cleaning_bath', unit: 'בקבוק ענק', aliases: ['פיירי גדול', 'פיירי ליטר וחצי'], basePrice: 17.90, foodOnly: false },
  { id: 'p_ariel_laundry_gel_2_5l', name: 'ג׳ל כביסה מרוכז אריאל Ariel 2.5 ליטר', category: 'cleaning_bath', unit: 'מיכל', aliases: ['ג׳ל כביסה', 'אריאל כביסה'], basePrice: 29.90, foodOnly: false },
  { id: 'p_persil_laundry_gel_2_5l', name: 'ג׳ל כביסה פרסיל Persil Deep Clean 2.5 ליטר', category: 'cleaning_bath', unit: 'מיכל', aliases: ['פרסיל', 'ג׳ל פרסיל'], basePrice: 29.90, foodOnly: false },
  { id: 'p_ariel_pods_35', name: 'קפסולות לכביסה אריאל Ariel All-in-1 מארז 35 יח׳', category: 'cleaning_bath', unit: 'קופסה', aliases: ['קפסולות כביסה', 'קפסולות אריאל'], basePrice: 29.90, foodOnly: false },
  { id: 'p_badin_fabric_softener_1l', name: 'מרכך כביסה מרוכז בדין אקסטרה 1 ליטר', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['בדין', 'מרכך כביסה'], basePrice: 9.90, foodOnly: false },
  { id: 'p_lenor_fabric_softener_900ml', name: 'מרכך כביסה מרוכז לנור Lenor בניחוח יוקרתי 900 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['לנור', 'מרכך לנור'], basePrice: 11.90, foodOnly: false },
  { id: 'p_sano_bleach_4l', name: 'אקונומיקה מבושמת סנו ז׳אוול 4 ליטר', category: 'cleaning_bath', unit: 'גלון', aliases: ['אקונומיקה', 'סנו זאוול'], basePrice: 10.90, foodOnly: false },
  { id: 'p_sano_floor_wash_2l', name: 'נוזל שטיפת רצפות סנו פלור מבושם בניחוח מרכך 2 ליטר', category: 'cleaning_bath', unit: 'גלון', aliases: ['נוזל רצפות', 'סנו פלור'], basePrice: 14.90, foodOnly: false },
  { id: 'p_sano_forte_plus', name: 'מסיר שומנים ורב-שימושי סנו פורטה פלוס 750 מ״ל', category: 'cleaning_bath', unit: 'מתז', aliases: ['סנו פורטה', 'מסיר שומנים'], basePrice: 11.90, foodOnly: false },
  { id: 'p_astonish_multipurpose_750ml', name: 'תרסיס ניקוי רב-תכליתי אסטוניש Astonish 750 מ״ל', category: 'cleaning_bath', unit: 'מתז', aliases: ['אסטוניש'], basePrice: 10.90, foodOnly: false },
  { id: 'p_domestos_toilet_cleaner', name: 'ג׳ל חיטוי וניקוי אסלות דומסטוס Domestos 750 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['דומסטוס', 'ניקוי אסלות'], basePrice: 9.90, foodOnly: false },
  { id: 'p_toilet_paper_lily_32', name: 'נייר טואלט לילי פרימיום דו-שכבתי 32 גלילים', category: 'cleaning_bath', unit: 'חבילה 32 גלילים', aliases: ['נייר טואלט', 'לילי', '32 גלילים'], basePrice: 29.90, foodOnly: false },
  { id: 'p_paper_towels_nikol_6', name: 'מגבות נייר למטבח ניקול ענק 6 גלילים כפולים', category: 'cleaning_bath', unit: 'מארז 6 יח׳', aliases: ['מגבות נייר', 'נייר מטבח'], basePrice: 12.90, foodOnly: false },
  { id: 'p_trash_bags_sano_sushi_60', name: 'שקיות אשפה גדולות במיוחד עם שרוך סנו סושי 60 יח׳', category: 'cleaning_bath', unit: 'גליל', aliases: ['שקיות אשפה', 'שקיות זבל'], basePrice: 13.90, foodOnly: false },
  { id: 'p_baking_paper_nikol_50', name: 'נייר אפייה איכותי non-stick ניקול מארז 50 יח׳', category: 'cleaning_bath', unit: 'חבילה', aliases: ['נייר אפייה'], basePrice: 9.90, foodOnly: false },
  { id: 'p_aluminum_foil_nikol_30m', name: 'רדיד אלומיניום עבה במיוחד ניקול 30 מטר', category: 'cleaning_bath', unit: 'גליל', aliases: ['נייר כסף', 'רדיד אלומיניום'], basePrice: 13.90, foodOnly: false },
  { id: 'p_finish_dishwasher_tabs_70', name: 'טבליות למדיח כלים פיניש Finish All-in-1 מארז 70 יח׳', category: 'cleaning_bath', unit: 'מארז', aliases: ['טבליות למדיח', 'פיניש'], basePrice: 39.90, foodOnly: false },
  { id: 'p_fairy_platinum_pods_65', name: 'קפסולות למדיח פיירי פלטינום Fairy Platinum 65 יח׳', category: 'cleaning_bath', unit: 'מארז', aliases: ['פיירי פלטינום', 'קפסולות פיירי'], basePrice: 44.90, foodOnly: false },
  { id: 'p_colgate_toothpaste_75ml', name: 'משחת שיניים קולגייט טוטאל Colgate Total 75 מ״ל', category: 'cleaning_bath', unit: 'שפופרת', aliases: ['קולגייט', 'משחת שיניים'], basePrice: 9.90, foodOnly: false },
  { id: 'p_sensodyne_toothpaste_75ml', name: 'משחת שיניים סנסודיין לשיניים רגישות 75 מ״ל', category: 'cleaning_bath', unit: 'שפופרת', aliases: ['סנסודיין'], basePrice: 17.90, foodOnly: false },
  { id: 'p_oral_b_toothbrush_2pack', name: 'מברשת שיניים אורל-בי Oral-B זוג מארז חיסכון', category: 'cleaning_bath', unit: 'מארז זוג', aliases: ['מברשת שיניים', 'אורל בי'], basePrice: 12.90, foodOnly: false },
  { id: 'p_listerine_mouthwash_500ml', name: 'שטיפת פה ליסטרין Listerine Cool Mint 500 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['ליסטרין', 'מי פה'], basePrice: 19.90, foodOnly: false },
  { id: 'p_shampoo_head_shoulders_500ml', name: 'שמפו נגד קשקשים הד אנד שולדרס 500 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['שמפו', 'הד אנד שולדרס'], basePrice: 16.90, foodOnly: false },
  { id: 'p_shampoo_pinuk_700ml', name: 'שמפו פינוק קלאסי לכל המשפחה 700 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['שמפו פינוק', 'פינוק'], basePrice: 9.90, foodOnly: false },
  { id: 'p_body_wash_dove_700ml', name: 'תחליב רחצה מזין דאב / פינוק 700 מ״ל', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['תחליב רחצה', 'סבון גוף', 'דאב'], basePrice: 9.90, foodOnly: false },
  { id: 'p_deodorant_rexona_rollon', name: 'דאודורנט רול-און רקסונה Rexona 50 מ״ל', category: 'cleaning_bath', unit: 'יח׳', aliases: ['דאודורנט', 'רקסונה'], basePrice: 10.90, foodOnly: false },
  { id: 'p_hand_soap_liquid_500ml', name: 'סבון ידיים נוזלי נקה 7 עם משאבה 500 מ״ל', category: 'cleaning_bath', unit: 'משאבה', aliases: ['סבון ידיים', 'נקה 7'], basePrice: 5.90, foodOnly: false },
  { id: 'p_microfiber_cloths_5pack', name: 'מטליות מיקרופייבר רב-תכליתיות לניקוי מארז 5 יח׳', category: 'cleaning_bath', unit: 'מארז 5 יח׳', aliases: ['סמרטוטים', 'מטליות מיקרופייבר', 'סחבות'], basePrice: 9.90, foodOnly: false },
  { id: 'p_magic_sponge_6pack', name: 'ספוג הפלא לניקוי כתמים עקשניים מארז 6 יח׳', category: 'cleaning_bath', unit: 'מארז 6 יח׳', aliases: ['ספוג הפלא', 'ספוגיות הפלא'], basePrice: 7.90, foodOnly: false },
  { id: 'p_cling_film_wrap_30m', name: 'ניילון נצמד נצמדון איכותי ניקול 30 מטר', category: 'cleaning_bath', unit: 'גליל', aliases: ['ניילון נצמד', 'נצמדון'], basePrice: 9.90, foodOnly: false },
  { id: 'p_ziploc_bags_sandwich_60', name: 'שקיות זיפר לסנדוויצ׳ים ולאחסון מזון מארז 60 יח׳', category: 'cleaning_bath', unit: 'קופסה', aliases: ['שקיות אוכל', 'שקיות זיפר', 'שקיות סנדוויץ'], basePrice: 11.90, foodOnly: false },
  { id: 'p_drain_cleaner_sano_1l', name: 'נוזל לפתיחת סתימות ביוב סנו דרנו 1 ליטר', category: 'cleaning_bath', unit: 'בקבוק', aliases: ['סנו דרנו', 'פתיחת סתימות'], basePrice: 14.90, foodOnly: false },
  { id: 'p_air_freshener_glade_300ml', name: 'מטהר אוויר אירוסול ספריי גלייד Glade 300 מ״ל', category: 'cleaning_bath', unit: 'מיכל', aliases: ['מטהר אוויר', 'ספריי ריח'], basePrice: 8.90, foodOnly: false },
  { id: 'p_toilet_rimblock_bref_3pack', name: 'סבוני אסלה תלויים בריף Bref Power Aktiv שלישייה', category: 'cleaning_bath', unit: 'מארז 3 יח׳', aliases: ['סבון אסלה', 'ביפלוקס', 'בריף'], basePrice: 14.90, foodOnly: false },
  { id: 'p_always_ultra_pads', name: 'פדים היגייניים אולוויז אולטרה קוואטרו Always 28 יח׳', category: 'cleaning_bath', unit: 'חבילה', aliases: ['תחבושות', 'אולוויז', 'תחבושות היגייניות'], basePrice: 17.90, foodOnly: false },
  { id: 'p_gillette_mach3_razor', name: 'מכשיר גילוח ג׳ילט מאך 3 ידית + 2 סכינים Gillette', category: 'cleaning_bath', unit: 'מארז', aliases: ['סכין גילוח', 'גילט מאך 3', 'ג׳ילט'], basePrice: 34.90, foodOnly: false },
  { id: 'p_gillette_shaving_gel_200ml', name: 'ג׳ל גילוח לעור רגיש ג׳ילט סדרה קלאסית 200 מ״ל', category: 'cleaning_bath', unit: 'מיכל', aliases: ['גל גילוח', 'ג׳ל גילוח', 'קצף גילוח'], basePrice: 12.90, foodOnly: false },
  { id: 'p_dental_floss_oral_b_50m', name: 'חוט דנטלי בטעם מנטה אורל-בי Oral-B 50 מטר', category: 'cleaning_bath', unit: 'יח׳', aliases: ['חוט דנטלי', 'אורל בי חוט דנטלי'], basePrice: 11.90, foodOnly: false }
];

// 2. STOCK & HOME PRODUCTS LIST
const rawStock = [
  // מטבח ובישול
  { id: 'p_pot_24cm', name: 'סיר נירוסטה / נון סטיק 24 ס״מ עם מכסה זכוכית', category: 'kitchen', unit: 'יח׳', aliases: ['סיר', 'סיר 24'], basePrice: 59.90 },
  { id: 'p_pot_soup_28cm', name: 'סיר מרק ענק 28 ס״מ 9 ליטר נירוסטה', category: 'kitchen', unit: 'יח׳', aliases: ['סיר מרק', 'סיר גדול'], basePrice: 89.90 },
  { id: 'p_sautoir_28cm', name: 'סוטאז׳ רחב 28 ס״מ Non-Stick לבישול וצלייה', category: 'kitchen', unit: 'יח׳', aliases: ['סוטאז', 'סוטאז׳', 'סוטאז 28'], basePrice: 69.90 },
  { id: 'p_pan_frying_24cm', name: 'מחבת טיגון עמוקה Non-Stick קוטר 24 ס״מ', category: 'kitchen', unit: 'יח׳', aliases: ['מחבת', 'מחבת 24'], basePrice: 39.90 },
  { id: 'p_pans_pair_20_24', name: 'זוג מחבתות Non-Stick קוטר 20 ס״מ + 24 ס״מ', category: 'kitchen', unit: 'זוג', aliases: ['זוג מחבתות'], basePrice: 59.90 },
  { id: 'p_baking_tray_roaster', name: 'תבנית אפייה מלבנית Non-Stick לתנור ולעוגות', category: 'kitchen', unit: 'יח׳', aliases: ['תבנית אפייה', 'תבנית לתנור'], basePrice: 24.90 },
  { id: 'p_dinner_set_12pcs', name: 'סט 12 צלחות אוכל פורצלן / אופל (מנות עיקריות, עמוקות, קינוח)', category: 'kitchen', unit: 'סט 12 חלקים', aliases: ['צלחות', 'סט צלחות', 'סט 12 צלחות'], basePrice: 29.90 },
  { id: 'p_cutlery_set_24pcs', name: 'סט סכו״ם נירוסטה 24 חלקים מלא (סכינים, מזלגות, כפות, כפיות)', category: 'kitchen', unit: 'סט 24 חלקים', aliases: ['סכום', 'סכו״ם', 'סט סכו״ם'], basePrice: 19.90 },
  { id: 'p_chef_knives_set_6pcs', name: 'סט 6 סכיני מטבח ושף חדות עם מעמד מגנטי', category: 'kitchen', unit: 'סט סכינים', aliases: ['סכיני שף', 'סכינים למטבח'], basePrice: 49.90 },
  { id: 'p_cutting_board_bamboo', name: 'קרש חיתוך עץ במבוק טבעי עבה 30x40 ס״מ', category: 'kitchen', unit: 'יח׳', aliases: ['קרש חיתוך', 'בוצ׳ר'], basePrice: 24.90 },
  { id: 'p_peeler_victorinox', name: 'קולפן ירקות שוויצרי ארגונומי מקורי', category: 'kitchen', unit: 'יח׳', aliases: ['קולפן', 'קולפן ירקות'], basePrice: 14.90 },
  { id: 'p_glasses_mugs_12pcs', name: 'מארז 6 כוסות שתייה קרה מזכוכית + 6 מאגים קרמיקה לקפה', category: 'kitchen', unit: 'סט 12 כוסות', aliases: ['כוסות', 'מאגים'], basePrice: 39.80 },
  { id: 'p_wine_glasses_6pack', name: 'מארז 6 כוסות יין זכוכית קריסטל אלגנטיות', category: 'kitchen', unit: 'מארז 6 יח׳', aliases: ['כוסות יין'], basePrice: 29.90 },
  { id: 'p_dish_drying_rack', name: 'מייבש כלים דו-קומתי מודרני ממתכת בציפוי אל-חלד עם מגש ניקוז', category: 'kitchen', unit: 'יח׳', aliases: ['מייבש כלים', 'מתקן ייבוש כלים'], basePrice: 29.90 },
  { id: 'p_storage_boxes_utensils', name: 'מארז 10 קופסאות אחסון מזון הרמטיות + מסננת נירוסטה וסט 5 כלי ששת', category: 'kitchen', unit: 'סט משולב', aliases: ['קופסאות אחסון', 'ששת', 'מסננת'], basePrice: 32.80 },
  { id: 'p_electric_kettle_stainless', name: 'קומקום חשמלי מהיר מנירוסטה 1.7 ליטר', category: 'kitchen', unit: 'יח׳', aliases: ['קומקום', 'קומקום חשמלי'], basePrice: 49.90 },
  { id: 'p_lemon_squeezer_metal', name: 'מסחטת לימון ידנית מתכת איכותית', category: 'kitchen', unit: 'יח׳', aliases: ['מסחטת לימון', 'מסחטה ידנית'], basePrice: 19.90 },
  { id: 'p_manual_vegetable_chopper', name: 'קוצץ ירקות ידני מהיר עם חוט משיכה 500 מ״ל', category: 'kitchen', unit: 'יח׳', aliases: ['קוצץ ירקות', 'קוצץ ידני'], basePrice: 24.90 },
  { id: 'p_can_opener_stainless', name: 'פותחן שימורים מקצועי מנירוסטה עם מנגנון גלגלת', category: 'kitchen', unit: 'יח׳', aliases: ['פותחן שימורים', 'פותחן קופסאות'], basePrice: 14.90 },
  { id: 'p_garlic_press_metal', name: 'כותש שום נירוסטה כבד ארגונומי', category: 'kitchen', unit: 'יח׳', aliases: ['כותש שום', 'מכותש שום'], basePrice: 16.90 },
  { id: 'p_thermal_mug_stainless', name: 'כוס תרמית נירוסטה שומרת חום וקור 500 מ״ל לרכב ולמשרד', category: 'kitchen', unit: 'יח׳', aliases: ['כוס תרמית', 'תרמוס אישי'], basePrice: 29.90 },
  { id: 'p_water_bottle_insulated', name: 'בקבוק מים רב-פעמי מנירוסטה שומר קור 24 שעות 750 מ״ל', category: 'kitchen', unit: 'יח׳', aliases: ['בקבוק מים', 'בקבוק שתייה'], basePrice: 29.90 },
  { id: 'p_mixing_bowl_stainless_5l', name: 'קערת ערבוב נירוסטה עמוקה 5 ליטר לאפייה ולסלט', category: 'kitchen', unit: 'יח׳', aliases: ['קערת ערבוב', 'קערת נירוסטה'], basePrice: 19.90 },
  { id: 'p_glass_bowls_set_3', name: 'סט 3 קערות זכוכית עמידות עם מכסי סיליקון הרמטיים', category: 'kitchen', unit: 'סט 3 יח׳', aliases: ['קערות זכוכית'], basePrice: 34.90 },

  // ריהוט ואחסון
  { id: 'p_coffee_tables_pair', name: 'שולחן סלון מודרני / זוג שולחנות קפה עגולים בסגנון סקנדינבי', category: 'furniture', unit: 'יח׳ / זוג', aliases: ['שולחן סלון', 'שולחנות קפה', 'שולחן קפה'], basePrice: 119.90 },
  { id: 'p_storage_cube_6', name: 'כוורת 6 תאים מודולרית / מעמד מדפים לאחסון ספרים וחפצים', category: 'furniture', unit: 'יח׳', aliases: ['כוורת', 'כוורת 6 תאים', 'מעמד מדפים'], basePrice: 119.90 },
  { id: 'p_shoe_cabinet_wood', name: 'ארון נעליים מעץ 3 תאים מתקפלים דמוי אלון / לבן', category: 'furniture', unit: 'יח׳', aliases: ['ארון נעליים', 'מעמד נעליים'], basePrice: 200.00 },
  { id: 'p_clothes_hanger_rack', name: 'מעמד מתכת נייד על גלגלים לתליית בגדים + מדף נעליים תחתון', category: 'furniture', unit: 'יח׳', aliases: ['מעמד תליית בגדים', 'מתלה בגדים'], basePrice: 169.90 },
  { id: 'p_bedside_tables_pair', name: 'זוג שידות צד למיטה עם מגירה + מעמד מדפי במבוק', category: 'furniture', unit: 'זוג + מעמד', aliases: ['שידות צד', 'שידת לילה'], basePrice: 179.70 },
  { id: 'p_computer_desk_100x60', name: 'שולחן כתיבה ועבודה מודרני עם רגלי מתכת 100x60 ס״מ', category: 'furniture', unit: 'יח׳', aliases: ['שולחן כתיבה', 'שולחן מחשב'], basePrice: 199.90 },
  { id: 'p_office_chair_ergonomic', name: 'כיסא עבודה ומחשב ארגונומי עם גלגלים ותמיכת גב', category: 'furniture', unit: 'יח׳', aliases: ['כיסא משרדי', 'כיסא מחשב'], basePrice: 199.90 },
  { id: 'p_storage_box_plastic_60l', name: 'ארגז פלסטיק שקוף 60 ליטר עם מכסה נעילה וגלגלים', category: 'furniture', unit: 'יח׳', aliases: ['ארגז פלסטיק', 'קופסת אחסון גדולה'], basePrice: 29.90 },
  { id: 'p_velvet_hangers_30pack', name: 'מארז 30 קולבי קטיפה דקים ומונעי החלקה לבגדים', category: 'furniture', unit: 'מארז 30 יח׳', aliases: ['קולבים', 'קולבי קטיפה'], basePrice: 29.90 },

  // כלי עבודה ו-DIY
  { id: 'p_hand_tools_kit', name: 'ערכת כלי עבודה ידניים מלאה בארגז (פטיש, פלייר, מפתח שבדי, מטר, קאטר, סט מברגים ודיבלים)', category: 'diy', unit: 'ארגז כלים', aliases: ['כלי עבודה', 'ארגז כלים', 'ערכת כלי עבודה'], basePrice: 29.90 },
  { id: 'p_cordless_drill_screwdriver', name: 'מברגה / מקדחה נטענת 12V כוללת סוללה ומטען מהיר', category: 'diy', unit: 'יח׳', aliases: ['מברגה', 'מברגה נטענת', 'מקדחה'], basePrice: 50.00 },
  { id: 'p_drill_bits_set_32pcs', name: 'סט 32 ביטים ומקדחי מתכת, עץ ובטון למברגה באריזת נשיאה', category: 'diy', unit: 'סט ביטים', aliases: ['ביטים', 'סט ביטים'], basePrice: 19.90 },
  { id: 'p_painting_sealing_kit', name: 'ערכת צביעה ואיטום (רולר, מברשת, מסקינטייפ, שפכטל, שפכטל אמריקאי 1 ק״ג, אקדח סיליקון וסיליקון לבן)', category: 'diy', unit: 'ערכה מלאה', aliases: ['ערכת צביעה', 'סיליקון', 'שפכטל'], basePrice: 44.90 },
  { id: 'p_super_glue_combo', name: 'דבק מהיר סופר גלו + דבק מונטאז׳ חזק לקירות', category: 'diy', unit: 'סט דבקים', aliases: ['סופר גלו', 'דבק מגע'], basePrice: 14.90 },
  { id: 'p_aluminum_ladder_3steps', name: 'סולם אלומיניום ביתי 3 שלבים בטיחותי וקל משקל', category: 'diy', unit: 'יח׳', aliases: ['סולם', 'סולם ביתי'], basePrice: 79.90 },

  // טקסטיל ועיצוב
  { id: 'p_towels_bundle_7pcs', name: '2 מגבות גוף גדולות 100% כותנה + 2 מגבות פנים + 3 מגבות מטבח איכותיות', category: 'decor', unit: 'מארז 7 מגבות', aliases: ['מגבות', 'מגבות גוף', 'סט מגבות'], basePrice: 59.90 },
  { id: 'p_bedding_double_pillows', name: 'סט מצעים זוגי 100% כותנה / מיקרופייבר יוקרתי + זוג כריות שינה אורתופדיות', category: 'decor', unit: 'סט מצעים + 2 כריות', aliases: ['מצעים', 'סט מצעים', 'כריות שינה'], basePrice: 99.80 },
  { id: 'p_duvet_quilt_double', name: 'שמיכת פוך חורפית זוגית מיקרופייבר היפואלרגנית קלת משקל', category: 'decor', unit: 'יח׳', aliases: ['שמיכת פוך', 'פוך זוגי'], basePrice: 79.90 },
  { id: 'p_fleece_throw_blanket', name: 'כרבולית פליז נעימה ומפנקת לסלון 130x170 ס״מ', category: 'decor', unit: 'יח׳', aliases: ['כרבולית', 'שמיכת פליז'], basePrice: 19.90 },
  { id: 'p_full_length_mirror', name: 'מראת גוף עומדת עם מסגרת דקה מודרנית (פרוטוקול פתיחה ובדיקת שבר בקופה!)', category: 'decor', unit: 'יח׳', aliases: ['מראה', 'מראת גוף', 'מראה עומדת'], basePrice: 99.90 },
  { id: 'p_round_wall_mirror_60cm', name: 'מראת קיר עגולה בקוטר 60 ס״מ עם מסגרת מתכת שחורה', category: 'decor', unit: 'יח׳', aliases: ['מראה עגולה', 'מראת קיר'], basePrice: 69.90 },
  { id: 'p_living_room_rug_120_180', name: 'שטיח סלון מודרני גיאומטרי קל לניקוי 120x180 ס״מ', category: 'decor', unit: 'יח׳', aliases: ['שטיח', 'שטיח סלון'], basePrice: 99.90 },
  { id: 'p_hallway_runner_rug', name: 'שטיח ראנר למסדרון ולמטבח עם גב גומי מונע החלקה 60x180 ס״מ', category: 'decor', unit: 'יח׳', aliases: ['שטיח ראנר', 'ראנר למטבח'], basePrice: 49.90 },
  { id: 'p_curtains_pair_rod', name: 'זוג וילונות הצללה לסלון / חדר שינה + מוט תלייה טלסקופי', category: 'decor', unit: 'סט וילונות + מוט', aliases: ['וילון', 'וילונות', 'מוט וילון'], basePrice: 59.80 },
  { id: 'p_artificial_plant_decor', name: 'עץ מלאכותי דקורטיבי בוגונוויליה/פיקוס + 3 עציצים סוקולנטים + 2 כריות נוי לסלון', category: 'decor', unit: 'חבילת סטיילינג', aliases: ['עציץ', 'עץ מלאכותי', 'כריות נוי'], basePrice: 119.60 },
  { id: 'p_lighting_package', name: 'חבילת תאורה מלאה: שנדליר 3 קנים + מנורת שולחן מודרנית + מארז 6 נורות LED חסכוניות', category: 'decor', unit: 'מארז תאורה', aliases: ['תאורה', 'מנורה', 'נורות LED', 'שנדליר'], basePrice: 119.70 },

  // ניקיון ואמבטיה של סטוק
  { id: 'p_cleaning_kit_rental', name: 'ערכת ניקיון מלאה לדירה (דלי שטיפה + מגב סיליקון + מטאטא ויעה + 5 מטליות מיקרופייבר)', category: 'cleaning_bath', unit: 'ערכה', aliases: ['ערכת ניקיון', 'דלי ומגב', 'מטאטא ויעה'], basePrice: 49.90 },
  { id: 'p_laundry_basket_accessories', name: 'סל כביסה מתקפל + מארז 48 אטבי כביסה + 3 שקיות רשת לכביסה עדינה', category: 'cleaning_bath', unit: 'סט', aliases: ['סל כביסה', 'אטבי כביסה'], basePrice: 24.90 },
  { id: 'p_bathroom_ocean_set', name: 'אבזור אמבטיה ללא קידוח סדרת OCEAN (מתקן ואקום למברשות, מעמד סבון, ווים כפולים)', category: 'cleaning_bath', unit: 'סט', aliases: ['אבזור אמבטיה', 'סדרת OCEAN', 'ללא קידוח'], basePrice: 54.90 },
  { id: 'p_bathroom_mats_duo', name: 'שטיח אמבטיה ספוג זיכרון נגד החלקה + שטיח כניסה לבית', category: 'cleaning_bath', unit: 'זוג', aliases: ['שטיח אמבטיה', 'שטיח כניסה'], basePrice: 24.90 },
  { id: 'p_doormat_welcome', name: 'שטיחון סף כניסה לבית "ברוכים הבאים" סיבי קוקוס עבים', category: 'decor', unit: 'יח׳', aliases: ['שטיח כניסה', 'שטיח סף', 'ברוכים הבאים'], basePrice: 29.90 },
  { id: 'p_scented_candle_glass', name: 'נר ריחני בצנצנת זכוכית יוקרתית וניל-פצ׳ולי', category: 'decor', unit: 'יח׳', aliases: ['נר ריחני', 'נר'], basePrice: 19.90 },
  { id: 'p_reed_diffuser_200ml', name: 'מפיץ ריח מקלות יוקרתי לבית 200 מ״ל', category: 'decor', unit: 'יח׳', aliases: ['מפיץ ריח', 'דיפיוזר'], basePrice: 24.90 },
  { id: 'p_laundry_basket_plastic_60l', name: 'סל כביסה פלסטיק ענק מאוורר 60 ליטר עם מכסה וידיות', category: 'cleaning_bath', unit: 'יח׳', aliases: ['סל כביסה פלסטיק', 'סל כביסה 60 ליטר'], basePrice: 39.90 },
  { id: 'p_toilet_brush_silicone', name: 'מברשת אסלה סיליקון גמישה והיגיינית עם מעמד צף לקיר', category: 'cleaning_bath', unit: 'יח׳', aliases: ['מברשת אסלה', 'מברשת סיליקון'], basePrice: 19.90 }
];

const STORES = ['rami_levy', 'shufersal', 'yohananof', 'carrefour', 'osher_ad', 'victory', 'max_stock', 'hastock', 'max_stock_online', 'stock_online'];

function buildProduct(item, isStock = false) {
  const prices = {};
  const inStock = {};
  const base = item.basePrice;

  if (item.regulated) {
    STORES.forEach(s => {
      const isFood = ['rami_levy', 'shufersal', 'yohananof', 'carrefour', 'osher_ad', 'victory'].includes(s);
      prices[s] = isFood ? base : null;
      inStock[s] = isFood;
    });
  } else if (!isStock && item.foodOnly) {
    prices.rami_levy = r(base);
    prices.shufersal = r(base * 1.22);
    prices.yohananof = r(base * 1.04);
    prices.carrefour = r(base * 1.08);
    prices.osher_ad = r(base * 0.95);
    prices.victory = r(base * 1.16);
    prices.max_stock = null;
    prices.hastock = null;
    prices.max_stock_online = null;
    prices.stock_online = null;
    STORES.forEach(s => {
      inStock[s] = prices[s] !== null;
    });
  } else if (!isStock && !item.foodOnly) {
    // Both supermarket and stock carry it (e.g. coffee, snacks, cleaners)
    prices.rami_levy = r(base);
    prices.shufersal = r(base * 1.22);
    prices.yohananof = r(base * 1.04);
    prices.carrefour = r(base * 1.08);
    prices.osher_ad = r(base * 0.95);
    prices.victory = r(base * 1.15);
    prices.max_stock = r(base * 0.96);
    prices.hastock = r(base * 1.04);
    prices.max_stock_online = r(base * 1.16);
    prices.stock_online = r(base * 1.25);
    STORES.forEach(s => {
      inStock[s] = true;
    });
  } else {
    // Stock item
    prices.rami_levy = r(base * 0.98); // Rami Levy Stock
    prices.shufersal = r(base * 1.35);
    prices.yohananof = r(base * 1.20);
    prices.carrefour = r(base * 1.25);
    prices.osher_ad = base > 100 ? null : r(base * 0.95);
    prices.victory = base > 100 ? null : r(base * 1.28);
    prices.max_stock = r(base);
    prices.hastock = r(base * 1.12);
    prices.max_stock_online = r(base * 1.35);
    prices.stock_online = r(base * 1.65);
    STORES.forEach(s => {
      inStock[s] = prices[s] !== null;
    });
  }

  return {
    id: item.id,
    name: item.name,
    category: item.category,
    unit: item.unit,
    isRegulated: !!item.isRegulated,
    aliases: item.aliases || [item.name],
    prices,
    inStock
  };
}

const groceryProducts = rawGrocery.map(item => buildProduct(item, false));
const stockProducts = rawStock.map(item => buildProduct(item, true));

console.log('Built grocery products:', groceryProducts.length);
console.log('Built stock products:', stockProducts.length);
console.log('Total catalog items:', groceryProducts.length + stockProducts.length);

fs.writeFileSync(path.join(__dirname, '../src/data/groceryCatalogData.js'), 'export const GROCERY_PRODUCTS = ' + JSON.stringify(groceryProducts) + ';\n', 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/stockCatalogData.js'), 'export const STOCK_PRODUCTS = ' + JSON.stringify(stockProducts) + ';\n', 'utf8');

console.log('Files successfully written to disk!');
