// scripts/data_spices_salads_snacks.cjs
// Departments:
// 6. spices_baking (תבלינים ואפייה ביתית)
// 7. salads_dips (סלטים מוכנים וממרחי מקרר)
// 8. snacks_drinks (שתייה קלה, חמה, חטיפים וממתקים)
// 9. frozen_sweets (גלידות וקינוחים קפואים)

const { buildProduct } = require('./catalogHelper.cjs');

const rawSpicesBaking = [
  // תבלינים ומלחים
  { id: 'salt_table_reg', name: 'מלח שולחן מעולה מלח הארץ 1 ק"ג', category: 'spices_baking', unit: '1 ק"ג', basePrice: 2.50, regulated: true, aliases: ['מלח', 'מלח בישול', 'מלח שולחן', 'מלח הארץ'] },
  { id: 'salt_sea_coarse', name: 'מלח ים גס מלח הארץ 1 ק"ג', category: 'spices_baking', unit: '1 ק"ג', basePrice: 4.90, foodOnly: true, aliases: ['מלח גס', 'מלח ים', 'מלח לבישול גס'] },
  { id: 'salt_himalaya', name: 'מלח הימלאיה ורוד דק 500 גרם', category: 'spices_baking', unit: '500 גרם', basePrice: 9.90, foodOnly: false, aliases: ['מלח הימלאיה', 'מלח ורוד', 'הימלאיה'] },
  { id: 'sugar_white_sugat', name: 'סוכר לבן סוגת 1 ק"ג', category: 'spices_baking', unit: '1 ק"ג', basePrice: 4.90, foodOnly: true, aliases: ['סוכר', 'סוכר לבן', 'סוכר סוגת'] },
  { id: 'sugar_demerara', name: 'סוכר חום דמררה סוגת 1 ק"ג', category: 'spices_baking', unit: '1 ק"ג', basePrice: 11.90, foodOnly: true, aliases: ['סוכר חום', 'דמררה', 'סוכר דמררה'] },
  { id: 'sugar_dark_brown', name: 'סוכר חום כהה טבעי סוגת 1 ק"ג', category: 'spices_baking', unit: '1 ק"ג', basePrice: 13.90, foodOnly: true, aliases: ['סוכר חום כהה', 'סוכר לעוגות'] },
  { id: 'sugar_powder', name: 'אבקת סוכר סוגת 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 3.50, foodOnly: true, aliases: ['אבקת סוכר', 'סוכר פודרה'] },
  { id: 'baking_powder', name: 'אבקת אפייה אסם מארז 10 שקיות (100 גרם)', category: 'spices_baking', unit: 'מארז 100 גרם', basePrice: 4.90, foodOnly: true, aliases: ['אבקת אפייה', 'אבקת אפיה', 'אפייה'] },
  { id: 'vanilla_sugar', name: 'סוכר וניל אסם מארז 10 שקיות (100 גרם)', category: 'spices_baking', unit: 'מארז 100 גרם', basePrice: 4.90, foodOnly: true, aliases: ['סוכר וניל', 'וניל'] },
  { id: 'baking_soda', name: 'סודה לשתייה סוגת 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 3.20, foodOnly: false, aliases: ['סודה לשתייה', 'סודה לשתיה', 'סודה'] },
  { id: 'yeast_dry', name: 'שמרים יבשים איכותיים שמרית 500 גרם', category: 'spices_baking', unit: '500 גרם', basePrice: 14.90, foodOnly: true, aliases: ['שמרים יבשים', 'שמרים', 'שמרית יבשים'] },
  { id: 'yeast_fresh', name: 'שמרית גרגירי שמרים טריים 50 גרם', category: 'spices_baking', unit: '50 גרם', basePrice: 5.20, foodOnly: true, aliases: ['שמרית', 'שמרים טריים'] },
  { id: 'vanilla_extract', name: 'תמצית וניל איכותית מקורמיק 50 מ"ל', category: 'spices_baking', unit: '50 מ"ל', basePrice: 13.90, foodOnly: true, aliases: ['תמצית וניל', 'וניל נוזלי', 'וניל מקורמיק'] },
  { id: 'cocoa_powder_elite', name: 'קקאו מובחר לאפייה עלית 150 גרם', category: 'spices_baking', unit: '150 גרם', basePrice: 11.90, foodOnly: true, aliases: ['קקאו', 'קקאו עלית', 'אבקת קקאו'] },
  { id: 'chocolate_chips_dark', name: 'שוקולד צ\'יפס מריר לאפייה כרמית 300 גרם', category: 'spices_baking', unit: '300 גרם', basePrice: 12.90, foodOnly: false, aliases: ['שוקולד צ\'יפס', 'שוקולד צ\'יפס מריר', 'נטיפי שוקולד'] },
  { id: 'chocolate_chips_white', name: 'שוקולד צ\'יפס לבן לאפייה כרמית 300 גרם', category: 'spices_baking', unit: '300 גרם', basePrice: 13.90, foodOnly: false, aliases: ['שוקולד צ\'יפס לבן', 'נטיפי שוקולד לבן'] },
  { id: 'instant_pudding_vanilla', name: 'אינסטנט פודינג וניל צרפתי אסם 80 גרם', category: 'spices_baking', unit: '80 גרם', basePrice: 5.90, foodOnly: true, aliases: ['פודינג וניל', 'אינסטנט פודינג', 'פודינג אסם'] },
  { id: 'instant_pudding_chocolate', name: 'אינסטנט פודינג שוקולד עשיר אסם 80 גרם', category: 'spices_baking', unit: '80 גרם', basePrice: 5.90, foodOnly: true, aliases: ['פודינג שוקולד', 'אינסטנט פודינג שוקולד'] },
  { id: 'cornstarch_sugat', name: 'קורנפלור עמילן תירס טהור סוגת 500 גרם', category: 'spices_baking', unit: '500 גרם', basePrice: 7.90, foodOnly: true, aliases: ['קורנפלור', 'עמילן תירס'] },
  { id: 'gelatin_powder', name: 'ג\'לטין טהור כשר לאפייה 50 גרם', category: 'spices_baking', unit: '50 גרם', basePrice: 8.50, foodOnly: true, aliases: ['ג\'לטין', 'אבקת ג\'לטין'] },
  { id: 'bread_crumbs_gold', name: 'פירורית פירורי לחם מוזהבים קלאסיים אסם 350 גרם', category: 'spices_baking', unit: '350 גרם', basePrice: 8.90, foodOnly: true, aliases: ['פירורי לחם', 'פירורית', 'פירורי לחם זהב'] },
  { id: 'panko_crumbs', name: 'פירורי לחם פנקו יפניים מאסטר שף 300 גרם', category: 'spices_baking', unit: '300 גרם', basePrice: 9.90, foodOnly: true, aliases: ['פנקו', 'פירורי פנקו', 'פנקו יפני'] },
  { id: 'chicken_soup_powder', name: 'אבקת מרק עוף אמיתי ללא מונוסודיום אסם 400 גרם', category: 'spices_baking', unit: '400 גרם', basePrice: 15.90, foodOnly: true, aliases: ['מרק עוף', 'אבקת מרק עוף', 'מרק אסם'] },
  { id: 'onion_soup_powder', name: 'אבקת מרק בצל אסם 400 גרם', category: 'spices_baking', unit: '400 גרם', basePrice: 15.90, foodOnly: true, aliases: ['מרק בצל', 'אבקת מרק בצל'] },
  { id: 'paprika_sweet_oil', name: 'פפריקה מתוקה בשמן תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 7.90, foodOnly: true, aliases: ['פפריקה מתוקה', 'פפריקה בשמן', 'פפריקה'] },
  { id: 'paprika_hot', name: 'פפריקה חריפה מובחרת תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 7.90, foodOnly: true, aliases: ['פפריקה חריפה', 'פפריקה פיקנטית'] },
  { id: 'paprika_smoked', name: 'פפריקה מעושנת ספרדית מובחרת 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 9.90, foodOnly: true, aliases: ['פפריקה מעושנת', 'מעושנת'] },
  { id: 'cumin_ground', name: 'כמון טחון מובחר תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['כמון', 'כמון טחון'] },
  { id: 'turmeric_ground', name: 'כורכום טחון טהור תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['כורכום', 'כורכום טחון'] },
  { id: 'black_pepper_ground', name: 'פלפל שחור טחון דק תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 10.90, foodOnly: true, aliases: ['פלפל שחור', 'פלפל טחון'] },
  { id: 'black_pepper_coarse', name: 'פלפל שחור גרוס במטחנה תבליני מימון 80 גרם', category: 'spices_baking', unit: '80 גרם', basePrice: 13.90, foodOnly: true, aliases: ['פלפל שחור גרוס', 'מטחנת פלפל'] },
  { id: 'garlic_granulated', name: 'שום גבישי יבש תבליני מימון 120 גרם', category: 'spices_baking', unit: '120 גרם', basePrice: 9.90, foodOnly: true, aliases: ['שום גבישי', 'שום יבש', 'אבקת שום'] },
  { id: 'oregano_dry', name: 'אורגנו מיובש תבליני מימון 40 גרם', category: 'spices_baking', unit: '40 גרם', basePrice: 6.90, foodOnly: true, aliases: ['אורגנו', 'אורגנו יבש'] },
  { id: 'zaatar_blend', name: 'זעתר אסלי עם שומשום תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['זעתר', 'תבלין זעתר', 'זעתר עם שומשום'] },
  { id: 'chicken_grill_spice', name: 'תערובת גריל עוף עשירה תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['גריל עוף', 'תבלין גריל', 'תבלין לעוף'] },
  { id: 'shawarma_spice', name: 'תבלין שווארמה מובחר תבליני מימון 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['תבלין שווארמה', 'שווארמה פרגיות'] },
  { id: 'steak_montreal_spice', name: 'תבלין לסטייק מונטריאול מקורמיק 120 גרם', category: 'spices_baking', unit: '120 גרם', basePrice: 15.90, foodOnly: true, aliases: ['תבלין לסטייק', 'מונטריאול', 'תבלין בשר'] },
  { id: 'cinnamon_ground', name: 'קינמון טחון טהור תבליני מימון 80 גרם', category: 'spices_baking', unit: '80 גרם', basePrice: 7.90, foodOnly: true, aliases: ['קינמון', 'קינמון טחון'] },
  { id: 'curry_madras', name: 'אבקת קארי מדראס הודית 100 גרם', category: 'spices_baking', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['קארי', 'אבקת קארי'] },
  { id: 'nutmeg_ground', name: 'אגוז מוסקט טחון 50 גרם', category: 'spices_baking', unit: '50 גרם', basePrice: 9.90, foodOnly: true, aliases: ['אגוז מוסקט', 'מוסקט'] },
  { id: 'honey_jar_yad', name: 'דבש טהור מפרחי בר יד מרדכי 350 גרם', category: 'spices_baking', unit: '350 גרם', basePrice: 19.90, foodOnly: true, aliases: ['דבש', 'דבש יד מרדכי', 'דבש טהור'] },
  { id: 'honey_squeezer', name: 'דבש טהור לחיץ יד מרדכי 400 גרם', category: 'spices_baking', unit: '400 גרם', basePrice: 24.90, foodOnly: true, aliases: ['דבש לחיץ', 'דבש בבקבוק'] },
  { id: 'silan_pure_tamar', name: 'סילאן טבעי 100% תמרים ללא תוספת סוכר יד מרדכי 400 גרם', category: 'spices_baking', unit: '400 גרם', basePrice: 15.90, foodOnly: true, aliases: ['סילאן', 'סילאן טבעי', 'סילאן ללא סוכר', 'סילאן יד מרדכי'] },
  { id: 'vinegar_synthetic', name: 'חומץ שולחן סינתטי 5% 1 ליטר', category: 'spices_baking', unit: '1 ליטר', basePrice: 4.50, foodOnly: true, aliases: ['חומץ', 'חומץ רגיל', 'חומץ 5%'] },
  { id: 'apple_cider_vinegar', name: 'חומץ תפוחים אורגני טבעי 500 מ"ל', category: 'spices_baking', unit: '500 מ"ל', basePrice: 14.90, foodOnly: true, aliases: ['חומץ תפוחים', 'חומץ תפוחים טבעי'] },
  { id: 'balsamic_vinegar', name: 'חומץ בלסמי מודנה מובחר 500 מ"ל', category: 'spices_baking', unit: '500 מ"ל', basePrice: 17.90, foodOnly: true, aliases: ['בלסמי', 'חומץ בלסמי'] }
];

const rawSaladsDips = [
  // סלטים וממרחי מקרר
  { id: 'hummus_achla_1kg', name: 'חומוס אחלה שטראוס 1 ק"ג', category: 'salads_dips', unit: '1 ק"ג', basePrice: 14.90, foodOnly: true, aliases: ['חומוס אחלה', 'חומוס 1 ק"ג', 'חומוס שטראוס'] },
  { id: 'hummus_tzabar_abu_gosh', name: 'חומוס אבו גוש צבר 650 גרם', category: 'salads_dips', unit: '650 גרם', basePrice: 13.90, foodOnly: true, aliases: ['חומוס צבר', 'חומוס אבו גוש', 'חומוס'] },
  { id: 'hummus_tzabar_pine_nuts', name: 'חומוס עם גרגרים וצנובר צבר 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 11.90, foodOnly: true, aliases: ['חומוס צנובר', 'חומוס עם גרגרים'] },
  { id: 'tahini_green_achla', name: 'טחינה ירוקה עם פטרוזיליה אחלה 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 11.90, foodOnly: true, aliases: ['טחינה ירוקה', 'טחינה מוכנה', 'טחינה אחלה'] },
  { id: 'eggplant_mayo_achla', name: 'סלט חציל במיונז אחלה שטראוס 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 12.90, foodOnly: true, aliases: ['חציל במיונז', 'חצילים במיונז', 'חציל אחלה'] },
  { id: 'eggplant_grilled_tzabar', name: 'חציל על האש על גחלים צבר 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 12.90, foodOnly: true, aliases: ['חציל על האש', 'חציל גחלים', 'חציל קלוי'] },
  { id: 'eggplant_tahini_achla', name: 'סלט חציל בטחינה אחלה 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 12.90, foodOnly: true, aliases: ['חציל בטחינה', 'בבא גנוש'] },
  { id: 'matbucha_achla', name: 'מטבוחה מבושלת בסגנון ביתי אחלה 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 12.90, foodOnly: true, aliases: ['מטבוחה', 'מטבוחה אחלה', 'סלט מטבוחה'] },
  { id: 'turkish_salad_tzabar', name: 'סלט טורקי פיקנטי צבר 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 11.90, foodOnly: true, aliases: ['סלט טורקי', 'טורקי צבר'] },
  { id: 'cabbage_mayo_achla', name: 'סלט כרוב לבן במיונז אחלה 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 10.90, foodOnly: true, aliases: ['כרוב במיונז', 'קולסלואו', 'סלט כרוב במיונז'] },
  { id: 'cabbage_red_mayo', name: 'סלט כרוב אדום במיונז צבר 400 גרם', category: 'salads_dips', unit: '400 גרם', basePrice: 10.90, foodOnly: true, aliases: ['כרוב אדום במיונז', 'כרוב סגול'] },
  { id: 'egg_salad_tzabar', name: 'סלט ביצים מובחר צבר 300 גרם', category: 'salads_dips', unit: '300 גרם', basePrice: 13.90, foodOnly: true, aliases: ['סלט ביצים', 'ביצים במיונז'] },
  { id: 'tabbouleh_salad', name: 'סלט טבולה עם בורגול ופטרוזיליה צבר 350 גרם', category: 'salads_dips', unit: '350 גרם', basePrice: 12.90, foodOnly: true, aliases: ['טבולה', 'סלט טבולה'] },
  { id: 'guacamole_fresh', name: 'סלט גוואקמולי אבוקדו עשיר 250 גרם', category: 'salads_dips', unit: '250 גרם', basePrice: 14.90, foodOnly: true, aliases: ['גוואקמולי', 'סלט אבוקדו', 'ממרח אבוקדו'] },
  { id: 'schug_green_yemenite', name: 'סחוג ירוק תימני חריף אסלי אחלה 200 גרם', category: 'salads_dips', unit: '200 גרם', basePrice: 9.90, foodOnly: true, aliases: ['סחוג ירוק', 'סחוג', 'סחוג חריף'] },
  { id: 'schug_red', name: 'סחוג אדום לוהט תבליני מימון 200 גרם', category: 'salads_dips', unit: '200 גרם', basePrice: 9.90, foodOnly: true, aliases: ['סחוג אדום', 'סחוג'] },
  { id: 'amba_sauce', name: 'עמבה הודית אסלית משובחת 300 גרם', category: 'salads_dips', unit: '300 גרם', basePrice: 9.90, foodOnly: true, aliases: ['עמבה', 'רוטב עמבה'] },
  { id: 'chrain_beetroot', name: 'חזרת חריפה עם סלק אדום 250 גרם', category: 'salads_dips', unit: '250 גרם', basePrice: 8.90, foodOnly: true, aliases: ['חזרת', 'חזרת עם סלק', 'חזרת אדומה'] },
  { id: 'pesto_basil_olivia', name: 'ממרח פסטו בזיליקום איטלקי אוליביה 180 גרם', category: 'salads_dips', unit: '180 גרם', basePrice: 15.90, foodOnly: true, aliases: ['פסטו', 'ממרח פסטו', 'פסטו בזיליקום'] },
  { id: 'sundried_tomato_spread', name: 'ממרח עגבניות מיובשות עשיר אוליביה 180 גרם', category: 'salads_dips', unit: '180 גרם', basePrice: 15.90, foodOnly: true, aliases: ['ממרח עגבניות מיובשות', 'עגבניות מיובשות'] },
  { id: 'tapenade_olives', name: 'טפנד זיתים שחורים קלמטה אוליביה 180 גרם', category: 'salads_dips', unit: '180 גרם', basePrice: 15.90, foodOnly: true, aliases: ['טפנד', 'ממרח זיתים', 'טפנד זיתים'] },
  { id: 'garlic_dill_sauce', name: 'רוטב שום ושמיר אסם 290 מ"ל', category: 'salads_dips', unit: '290 מ"ל', basePrice: 11.90, foodOnly: true, aliases: ['רוטב שום', 'רוטב שום שמיר', 'רוטב לסלט'] },
  { id: 'thousand_islands_sauce', name: 'רוטב אלף האיים קלאסי אסם 290 מ"ל', category: 'salads_dips', unit: '290 מ"ל', basePrice: 11.90, foodOnly: true, aliases: ['רוטב אלף האיים', 'אלף האיים'] },
  { id: 'caesar_dressing', name: 'רוטב קיסר עשיר לסלט הלמנס 250 מ"ל', category: 'salads_dips', unit: '250 מ"ל', basePrice: 14.90, foodOnly: true, aliases: ['רוטב קיסר', 'קיסר לסלט'] },
  { id: 'mayo_hellmanns_real', name: 'מיונז אמיתי הולנדי הלמנס צנצנת 780 גרם', category: 'salads_dips', unit: '780 גרם', basePrice: 16.90, foodOnly: true, aliases: ['מיונז', 'הלמנס', 'מיונז הלמנס', 'מיונז אמיתי'] },
  { id: 'mayo_hellmanns_squeeze', name: 'מיונז אמיתי בבקבוק לחיץ הלמנס 420 גרם', category: 'salads_dips', unit: '420 גרם', basePrice: 14.90, foodOnly: true, aliases: ['מיונז לחיץ', 'הלמנס לחיץ'] },
  { id: 'mayo_telma_light', name: 'מיונז לייט מופחת שומן תלמה 500 גרם', category: 'salads_dips', unit: '500 גרם', basePrice: 12.90, foodOnly: true, aliases: ['מיונז לייט', 'מיונז תלמה'] },
  { id: 'mustard_dijon_grain', name: 'חרדל דיז\'ון גרגרים צרפתי בורנייה 210 גרם', category: 'salads_dips', unit: '210 גרם', basePrice: 12.90, foodOnly: true, aliases: ['חרדל דיז\'ון', 'חרדל גרגרים', 'חרדל צרפתי'] },
  { id: 'mustard_yellow_telma', name: 'חרדל קלאסי בבקבוק לחיץ תלמה 250 גרם', category: 'salads_dips', unit: '250 גרם', basePrice: 7.90, foodOnly: true, aliases: ['חרדל', 'חרדל תלמה', 'חרדל צהוב'] }
];

const rawSnacksDrinks = [
  // שתייה קלה ומוגזת
  { id: 'coca_cola_1_5l', name: 'קוקה קולה בקבוק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['קולה', 'קוקה קולה', 'קולה רגיל'] },
  { id: 'coca_cola_zero_1_5l', name: 'קוקה קולה זירו בקבוק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['קולה זירו', 'זירו', 'קוקה קולה זירו'] },
  { id: 'coca_cola_zero_pack6', name: 'מארז שישיית קוקה קולה זירו 1.5 ליטר * 6', category: 'snacks_drinks', unit: 'שישייה (6*1.5L)', basePrice: 42.90, foodOnly: true, aliases: ['שישיית קולה זירו', 'שישיית זירו', 'מארז קולה'] },
  { id: 'coca_cola_cans_pack', name: 'מארז 8 פחיות קוקה קולה זירו 330 מ"ל', category: 'snacks_drinks', unit: 'מארז 8 פחיות', basePrice: 32.90, foodOnly: true, aliases: ['פחיות קולה זירו', 'פחיות זירו', 'פחיות קולה'] },
  { id: 'sprite_1_5l', name: 'ספרייט בקבוק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['ספרייט', 'ספרייט רגיל'] },
  { id: 'sprite_zero_1_5l', name: 'ספרייט זירו ליים בקבוק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['ספרייט זירו', 'זירו ליים'] },
  { id: 'fanta_orange_1_5l', name: 'פנטה אורנג\' בקבוק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['פנטה', 'פנטה תפוזים'] },
  { id: 'fuze_tea_peach_1_5l', name: 'פיוז טי תה קר אפרסק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['פיוז טי', 'תה קר', 'פיוז טי אפרסק'] },
  { id: 'fuze_tea_zero_1_5l', name: 'פיוז טי זירו תה קר אפרסק ללא סוכר 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 8.50, foodOnly: true, aliases: ['פיוז טי זירו', 'תה קר זירו'] },
  { id: 'water_neviot_pack6', name: 'מארז שישיית מים מינרליים טבעיים נביעות 1.5 ליטר * 6', category: 'snacks_drinks', unit: 'שישייה (6*1.5L)', basePrice: 13.90, foodOnly: true, aliases: ['מים', 'שישיית מים', 'נביעות', 'מים מינרליים'] },
  { id: 'water_ein_gedi_pack6', name: 'מארז שישיית מים מינרליים עין גדי 1.5 ליטר * 6', category: 'snacks_drinks', unit: 'שישייה (6*1.5L)', basePrice: 12.90, foodOnly: true, aliases: ['מים עין גדי', 'עין גדי'] },
  { id: 'soda_kinley_pack6', name: 'מארז שישיית סודה קינלי קלאסית 1.5 ליטר * 6', category: 'snacks_drinks', unit: 'שישייה (6*1.5L)', basePrice: 21.90, foodOnly: true, aliases: ['סודה', 'שישיית סודה', 'קינלי'] },
  { id: 'schweppes_light_carbonated', name: 'שוופס מוגז עדין בטעם תפוח 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 7.90, foodOnly: true, aliases: ['שוופס מוגז עדין', 'מוגז עדין', 'שוופס תפוח'] },
  { id: 'prigat_orange_fresh_2l', name: 'מיץ תפוזים סחוט טרי פריגת 2 ליטר', category: 'snacks_drinks', unit: '2 ליטר', basePrice: 22.90, foodOnly: true, aliases: ['מיץ תפוזים', 'פריגת תפוזים', 'תפוזים סחוט'] },
  { id: 'prigat_apple_clear_1_5l', name: 'משקה קל תפוחים צלול פריגת 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 7.90, foodOnly: true, aliases: ['פריגת תפוחים', 'מיץ תפוחים'] },
  { id: 'tapuzina_grapefruit_1_5l', name: 'תפוזינה אשכוליות בקבוק 1.5 ליטר', category: 'snacks_drinks', unit: '1.5 ליטר', basePrice: 7.50, foodOnly: true, aliases: ['תפוזינה', 'תפוזינה אשכוליות'] },
  { id: 'choc_milk_yotvata_1l', name: 'שוקו יטבתה מפנק בקבוק 1 ליטר', category: 'snacks_drinks', unit: '1 ליטר', basePrice: 11.90, foodOnly: true, aliases: ['שוקו', 'שוקו יטבתה', 'שוקו 1 ליטר'] },
  { id: 'choc_milk_bags_pack6', name: 'מארז 6 שקיות שוקו יטבתה 225 מ"ל', category: 'snacks_drinks', unit: 'מארז 6 שקיות', basePrice: 15.90, foodOnly: true, aliases: ['שקיות שוקו', 'שוקו שקית'] },
  
  // אלכוהול ויינות
  { id: 'beer_goldstar_pack6', name: 'מארז שישיית בירה גולדסטאר בקבוק 330 מ"ל * 6', category: 'snacks_drinks', unit: 'שישייה (6*330ml)', basePrice: 34.90, foodOnly: true, aliases: ['בירה גולדסטאר', 'גולדסטאר', 'שישיית בירה'] },
  { id: 'beer_heineken_pack6', name: 'מארז שישיית בירה היינקן פרימיום 330 מ"ל * 6', category: 'snacks_drinks', unit: 'שישייה (6*330ml)', basePrice: 39.90, foodOnly: true, aliases: ['היינקן', 'בירה היינקן'] },
  { id: 'beer_corona_pack6', name: 'מארז שישיית בירה קורונה אקסטרה 355 מ"ל * 6', category: 'snacks_drinks', unit: 'שישייה (6*355ml)', basePrice: 42.90, foodOnly: true, aliases: ['קורונה', 'בירה קורונה'] },
  { id: 'wine_hermon_red', name: 'יין אדום הר חרמון יקבי רמת הגולן 750 מ"ל', category: 'snacks_drinks', unit: '750 מ"ל', basePrice: 39.90, foodOnly: true, aliases: ['הר חרמון אדום', 'יין אדום', 'חרמון אדום'] },
  { id: 'wine_hermon_white', name: 'יין לבן הר חרמון יקבי רמת הגולן 750 מ"ל', category: 'snacks_drinks', unit: '750 מ"ל', basePrice: 39.90, foodOnly: true, aliases: ['הר חרמון לבן', 'יין לבן', 'חרמון לבן'] },
  { id: 'wine_yarden_cabernet', name: 'יין ירדן קברנה סוביניון יקבי רמת הגולן 750 מ"ל', category: 'snacks_drinks', unit: '750 מ"ל', basePrice: 119.90, foodOnly: true, aliases: ['ירדן קברנה', 'קברנה סוביניון ירדן', 'יין פרימיום'] },
  { id: 'tirosh_carmel_1l', name: 'מיץ ענבים תירוש כרמל מקורי 1 ליטר', category: 'snacks_drinks', unit: '1 ליטר', basePrice: 19.90, foodOnly: true, aliases: ['תירוש', 'תירוש כרמל', 'מיץ ענבים לקידוש'] },

  // קפה ותה
  { id: 'coffee_turkish_elite_200g', name: 'קפה שחור טורקי עלית קלאסי 200 גרם', category: 'snacks_drinks', unit: '200 גרם', basePrice: 12.90, foodOnly: true, aliases: ['קפה שחור', 'קפה טורקי', 'קפה עלית'] },
  { id: 'coffee_turkish_cardamom', name: 'קפה טורקי עם הל מובחר עלית 100 גרם', category: 'snacks_drinks', unit: '100 גרם', basePrice: 8.90, foodOnly: true, aliases: ['קפה עם הל', 'טורקי עם הל'] },
  { id: 'coffee_tasters_choice_200g', name: 'קפה נמס מגורען טסטרס צ\'ויס נסטלה 200 גרם', category: 'snacks_drinks', unit: '200 גרם', basePrice: 32.90, foodOnly: true, aliases: ['טסטרס צ\'ויס', 'קפה נמס מגורען', 'נס קפה טסטרס צ\'ויס', 'קפה נמס נסקפה טייסטרס צ׳ויס Nescafe 200 גרם', 'נסקפה טייסטרס צ\'ויס'] },
  { id: 'coffee_jacobs_kronung', name: 'קפה נמס מגורען יעקובס קרונונג 200 גרם', category: 'snacks_drinks', unit: '200 גרם', basePrice: 28.90, foodOnly: true, aliases: ['יעקובס', 'קפה יעקובס'] },
  { id: 'coffee_instant_elite_tin', name: 'קפה נמס קלאסי עלית פחית 200 גרם', category: 'snacks_drinks', unit: '200 גרם', basePrice: 15.90, foodOnly: true, aliases: ['נס קפה עלית', 'קפה נמס עלית', 'פחית נס קפה'] },
  { id: 'nespresso_capsules_pack10', name: 'מארז 10 קפסולות קפה לקולקציית לור L\'OR אספרסו', category: 'snacks_drinks', unit: 'מארז 10 קפסולות', basePrice: 17.90, foodOnly: true, aliases: ['קפסולות קפה', 'קפסולות לור', 'קפסולות נספרסו'] },
  { id: 'tea_wissotzky_classic_100', name: 'תה ויסוצקי קלאסי 100 שקיקים', category: 'snacks_drinks', unit: '100 שקיקים', basePrice: 19.90, foodOnly: true, aliases: ['תה ויסוצקי', 'תה קלאסי', 'תה 100 שקיקים'] },
  { id: 'tea_wissotzky_green_lemon', name: 'תה ירוק עם לימונית ולואיזה ויסוצקי 25 שקיקים', category: 'snacks_drinks', unit: '25 שקיקים', basePrice: 15.90, foodOnly: true, aliases: ['תה ירוק', 'תה לימונית לואיזה', 'ויסוצקי ירוק'] },
  { id: 'tea_chamomile_wissotzky', name: 'תה בבונג קמומיל מרגיע ויסוצקי 25 שקיקים', category: 'snacks_drinks', unit: '25 שקיקים', basePrice: 15.90, foodOnly: true, aliases: ['תה קמומיל', 'בבונג', 'תה מרגיע'] },

  // חטיפים מלוחים
  { id: 'bamba_osem_80g', name: 'חטיף בוטנים במבה אסם קלאסי 80 גרם', category: 'snacks_drinks', unit: '80 גרם', basePrice: 4.90, foodOnly: true, aliases: ['במבה', 'במבה אסם', 'במבה 80 גרם'] },
  { id: 'bamba_nougat_60g', name: 'במבה במילוי קרם נוגט אסם 60 גרם', category: 'snacks_drinks', unit: '60 גרם', basePrice: 4.90, foodOnly: true, aliases: ['במבה נוגט', 'במבה ממולאת נוגט'] },
  { id: 'bissli_grill_70g', name: 'חטיף חיטה ביסלי גריל אסם 70 גרם', category: 'snacks_drinks', unit: '70 גרם', basePrice: 4.90, foodOnly: true, aliases: ['ביסלי גריל', 'ביסלי'] },
  { id: 'bissli_bbq_70g', name: 'חטיף ביסלי ברביקיו אסם 70 גרם', category: 'snacks_drinks', unit: '70 גרם', basePrice: 4.90, foodOnly: true, aliases: ['ביסלי ברביקיו', 'ביסלי'] },
  { id: 'bissli_onion_70g', name: 'חטיף ביסלי בצל אסם 70 גרם', category: 'snacks_drinks', unit: '70 גרם', basePrice: 4.90, foodOnly: true, aliases: ['ביסלי בצל', 'ביסלי'] },
  { id: 'tapuchips_classic_50g', name: 'חטיף תפוחי אדמה תפוצ\'יפס קלאסי עלית 50 גרם', category: 'snacks_drinks', unit: '50 גרם', basePrice: 4.90, foodOnly: true, aliases: ['תפוצ\'יפס', 'צ\'יפס עלית', 'תפוציפס'] },
  { id: 'doritos_spicy_sour_70g', name: 'חטיף תירס דוריטוס חמוץ חריף עלית 70 גרם', category: 'snacks_drinks', unit: '70 גרם', basePrice: 4.90, foodOnly: true, aliases: ['דוריטוס', 'דוריטוס חמוץ חריף'] },
  { id: 'apropos_osem_50g', name: 'חטיף תירס פריך אפרופו אסם 50 גרם', category: 'snacks_drinks', unit: '50 גרם', basePrice: 4.90, foodOnly: true, aliases: ['אפרופו', 'אפרופו אסם'] },
  { id: 'pretzels_sesame_300g', name: 'בייגלה שמיניות עם שומשום בייגל בייגל 300 גרם', category: 'snacks_drinks', unit: '300 גרם', basePrice: 9.90, foodOnly: true, aliases: ['בייגלה', 'בייגלה עם שומשום', 'שמיניות בייגלה'] },
  { id: 'popcorn_microwave_pack3', name: 'פופקורן למיקרוגל בטעם חמאה אסם מארז שלישייה', category: 'snacks_drinks', unit: 'מארז 3 שקיות', basePrice: 12.90, foodOnly: true, aliases: ['פופקורן', 'פופקורן למיקרו'] },

  // שוקולדים, עוגיות וממתקים
  { id: 'choc_para_milk_100g', name: 'שוקולד פרה חלב קלאסי עלית 100 גרם', category: 'snacks_drinks', unit: '100 גרם', basePrice: 5.90, foodOnly: true, aliases: ['שוקולד פרה', 'שוקולד חלב', 'שוקולד פרה חלב'] },
  { id: 'choc_para_dark_60', name: 'שוקולד פרה מריר 60% מוצקי קקאו עלית 100 גרם', category: 'snacks_drinks', unit: '100 גרם', basePrice: 6.90, foodOnly: true, aliases: ['שוקולד מריר', 'שוקולד פרה מריר'] },
  { id: 'choc_lindt_85', name: 'שוקולד פרימיום לינדט אקסלנס 85% מריר 100 גרם', category: 'snacks_drinks', unit: '100 גרם', basePrice: 14.90, foodOnly: true, aliases: ['לינדט', 'שוקולד לינדט', 'לינדט 85%'] },
  { id: 'nutella_jar_750g', name: 'ממרח אגוזי לוז וקקאו נוטלה 750 גרם', category: 'snacks_drinks', unit: '750 גרם', basePrice: 28.90, foodOnly: true, aliases: ['נוטלה', 'ממרח נוטלה', 'נוטלה 750'] },
  { id: 'spread_hashachar_haoleh', name: 'ממרח קקאו מובחר השחר העולה 500 גרם', category: 'snacks_drinks', unit: '500 גרם', basePrice: 13.90, foodOnly: true, aliases: ['השחר העולה', 'שוקולד השחר', 'ממרח השחר'] },
  { id: 'oreo_original_154g', name: 'עוגיות סנדוויץ\' במילוי קרם וניל אוראו 154 גרם', category: 'snacks_drinks', unit: '154 גרם', basePrice: 7.90, foodOnly: true, aliases: ['אוראו', 'עוגיות אוראו'] },
  { id: 'milka_choco_grain', name: 'עוגיות שיבולת שועל בציפוי שוקולד מילקה 126 גרם', category: 'snacks_drinks', unit: '126 גרם', basePrice: 9.90, foodOnly: true, aliases: ['עוגיות מילקה', 'מילקה'] },
  { id: 'wafers_chocolate_man_500g', name: 'ופלים פריכים במילוי קרם שוקולד מן 500 גרם', category: 'snacks_drinks', unit: '500 גרם', basePrice: 10.90, foodOnly: true, aliases: ['ופלים מן', 'ופלים שוקולד', 'בפלות'] },
  { id: 'ad_chatzot_biscuits', name: 'ביסקוויטים בציפוי שוקולד חלב עד חצות עלית 200 גרם', category: 'snacks_drinks', unit: '200 גרם', basePrice: 12.90, foodOnly: true, aliases: ['עד חצות', 'עוגיות עד חצות', 'ביסקוויט שוקולד'] },
  { id: 'kinder_bueno_pack3', name: 'אצבעות ופלים שוקולד קינדר בואנו מארז שלישייה', category: 'snacks_drinks', unit: 'מארז 3 יחידות', basePrice: 14.90, foodOnly: true, aliases: ['קינדר בואנו', 'קינדר'] },
  { id: 'mentos_fruit_roll', name: 'סוכריות לעיסה מנטוס בטעמי פירות רול', category: 'snacks_drinks', unit: 'יחידה', basePrice: 3.90, foodOnly: true, aliases: ['מנטוס', 'מנטוס פירות'] },
  { id: 'gum_orbit_spearmint', name: 'מסטיק ללא סוכר אורביט ירוק מנטה עדינה קופסה 66 גרם', category: 'snacks_drinks', unit: 'קופסה 66 גרם', basePrice: 12.90, foodOnly: true, aliases: ['מסטיק אורביט', 'אורביט ירוק', 'אורביט'] }
];

const rawFrozenSweets = [
  // גלידות, שלגונים וקפואים מתוקים
  { id: 'ice_cream_cremissimo_vanilla', name: 'גלידה משפחתית קרמיסימו וניל צרפתי שטראוס 1.33 ליטר', category: 'frozen_sweets', unit: '1.33 ליטר', basePrice: 21.90, foodOnly: true, aliases: ['קרמיסימו', 'גלידה וניל', 'קרמיסימו וניל', 'גלידה משפחתית'] },
  { id: 'ice_cream_cremissimo_choc_vanilla', name: 'גלידה משפחתית קרמיסימו שוקולד לבן וניל שטראוס 1.33 ליטר', category: 'frozen_sweets', unit: '1.33 ליטר', basePrice: 21.90, foodOnly: true, aliases: ['קרמיסימו שוקולד וניל', 'גלידת שוקולד'] },
  { id: 'ben_jerry_cookie_dough', name: 'גלידת בצק עוגיות בן אנד ג\'ריס 473 מ"ל', category: 'frozen_sweets', unit: '473 מ"ל', basePrice: 24.90, foodOnly: true, aliases: ['בן אנד ג\'ריס', 'בן אנד גריס עוגיות', 'בצק עוגיות'] },
  { id: 'ben_jerry_fudge_brownie', name: 'גלידת פאדג\' בראוניז שוקולד בן אנד ג\'ריס 473 מ"ל', category: 'frozen_sweets', unit: '473 מ"ל', basePrice: 24.90, foodOnly: true, aliases: ['בן אנד ג\'ריס בראוניז', 'פאדג בראוניז'] },
  { id: 'magnum_classic_pack4', name: 'מארז שלגוני מגנום קלאסי בציפוי שוקולד חלב שטראוס רביעייה', category: 'frozen_sweets', unit: 'מארז 4 יח\'', basePrice: 29.90, foodOnly: true, aliases: ['מגנום', 'שלגון מגנום', 'מגנום קלאסי'] },
  { id: 'magnum_almonds_pack4', name: 'מארז שלגוני מגנום שקדים בציפוי שוקולד ושקדים שטראוס רביעייה', category: 'frozen_sweets', unit: 'מארז 4 יח\'', basePrice: 29.90, foodOnly: true, aliases: ['מגנום שקדים', 'מגנום'] },
  { id: 'mini_cone_strauss_pack12', name: 'מארז מיני טילונים וניל שוקולד שטראוס 12 יחידות', category: 'frozen_sweets', unit: 'מארז 12 יח\'', basePrice: 29.90, foodOnly: true, aliases: ['מיני טילון', 'טילונים', 'טילון שטראוס'] },
  { id: 'ice_bag_2kg', name: 'שקית קוביות קרח ממים מסוננים 2 ק"ג', category: 'frozen_sweets', unit: 'שקית 2 ק"ג', basePrice: 9.90, foodOnly: true, aliases: ['קרח', 'קוביות קרח', 'שקית קרח'] },
  { id: 'frozen_strawberries_1kg', name: 'תות שדה קפוא לשייקים סנפרוסט 1 ק"ג', category: 'frozen_sweets', unit: '1 ק"ג', basePrice: 29.90, foodOnly: true, aliases: ['תות קפוא', 'פירות קפואים לשייק', 'תותים קפואים'] },
  { id: 'frozen_mango_1kg', name: 'קוביות מנגו קפואות פרימיום סנפרוסט 1 ק"ג', category: 'frozen_sweets', unit: '1 ק"ג', basePrice: 32.90, foodOnly: true, aliases: ['מנגו קפוא', 'מנגו לשייק'] },
  { id: 'frozen_mixed_berries_1kg', name: 'תערובת פירות יער קפואים מובחרים 1 ק"ג', category: 'frozen_sweets', unit: '1 ק"ג', basePrice: 34.90, foodOnly: true, aliases: ['פירות יער קפואים', 'פירות יער לשייק'] }
];

const allSpicesSaladsSnacks = [
  ...rawSpicesBaking.map(item => buildProduct(item, false)),
  ...rawSaladsDips.map(item => buildProduct(item, false)),
  ...rawSnacksDrinks.map(item => buildProduct(item, false)),
  ...rawFrozenSweets.map(item => buildProduct(item, false))
];

module.exports = allSpicesSaladsSnacks;
