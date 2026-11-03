// scripts/data_baby_cleaning_disposable.cjs
// Departments:
// 10. baby (מוצרי תינוקות)
// 11. cleaning_bath (ניקיון, כביסה ופארם)
// 12. disposable_party (חד-פעמי, מנגל, חיות מחמד ואירוח)

const { buildProduct } = require('./catalogHelper.cjs');

const rawBaby = [
  // חיתולים ומגבונים
  { id: 'huggies_freedom_3', name: 'חיתולי האגיס פרידום דריי מידה 3 (4-9 ק"ג) 52 חיתולים', category: 'baby', unit: 'אריזה (52 יח\')', basePrice: 44.90, foodOnly: false, aliases: ['חיתולים האגיס', 'האגיס מידה 3', 'חיתולי האגיס 3', 'טיטולים'] },
  { id: 'huggies_freedom_4', name: 'חיתולי האגיס פרידום דריי מידה 4 (7-14 ק"ג) 46 חיתולים', category: 'baby', unit: 'אריזה (46 יח\')', basePrice: 44.90, foodOnly: false, aliases: ['האגיס 4', 'האגיס מידה 4', 'חיתולים 4', 'טיטולים האגיס'] },
  { id: 'huggies_freedom_5', name: 'חיתולי האגיס פרידום דריי מידה 5 (11-20 ק"ג) 40 חיתולים', category: 'baby', unit: 'אריזה (40 יח\')', basePrice: 44.90, foodOnly: false, aliases: ['האגיס 5', 'האגיס מידה 5', 'חיתולים 5'] },
  { id: 'huggies_extra_care_4', name: 'חיתולי האגיס אקסטרה קר פרימיום מידה 4 (44 חיתולים)', category: 'baby', unit: 'אריזה (44 יח\')', basePrice: 49.90, foodOnly: false, aliases: ['האגיס אקסטרה קר', 'אקסטרה קר 4'] },
  { id: 'pampers_premium_3', name: 'חיתולי פמפרס פרימיום קר מידה 3 (60 חיתולים)', category: 'baby', unit: 'אריזה (60 יח\')', basePrice: 47.90, foodOnly: false, aliases: ['פמפרס', 'פמפרס 3', 'פמפרס פרימיום'] },
  { id: 'pampers_premium_4', name: 'חיתולי פמפרס פרימיום קר מידה 4 (52 חיתולים)', category: 'baby', unit: 'אריזה (52 יח\')', basePrice: 47.90, foodOnly: false, aliases: ['פמפרס 4', 'פמפרס מידה 4'] },
  { id: 'pampers_pants_5', name: 'חיתולי מכנסוני פמפרס פנטס מידה 5 (38 חיתולים)', category: 'baby', unit: 'אריזה (38 יח\')', basePrice: 44.90, foodOnly: false, aliases: ['פמפרס פנטס', 'מכנסוני פמפרס', 'פנטס 5'] },
  { id: 'wipes_huggies_pack4', name: 'מגבונים לחים לתינוק האגיס ללא בישום מארז רביעייה (4*64 יח\')', category: 'baby', unit: 'מארז 4 חבילות', basePrice: 19.90, foodOnly: false, aliases: ['מגבונים', 'מגבוני האגיס', 'מגבונים ללא בישום', 'מגבונים לחים'] },
  { id: 'wipes_fresh_ones_pack4', name: 'מגבונים לחים לתינוק פרש וואנס עם אלוורה מארז רביעייה (4*72 יח\')', category: 'baby', unit: 'מארז 4 חבילות', basePrice: 16.90, foodOnly: false, aliases: ['מגבוני פרש וואנס', 'פרש וואנס', 'מגבונים בזול'] },

  // תמ"ל, דייסות ומזון תינוקות
  { id: 'materna_gold_step1', name: 'מטרנה גולד תרכובת מזון לתינוקות שלב 1 (700 גרם)', category: 'baby', unit: '700 גרם', basePrice: 59.90, foodOnly: false, aliases: ['מטרנה 1', 'מטרנה שלב 1', 'מטרנה גולד 1', 'תמ"ל'] },
  { id: 'materna_gold_step2', name: 'מטרנה גולד תרכובת מזון לתינוקות שלב 2 (700 גרם)', category: 'baby', unit: '700 גרם', basePrice: 59.90, foodOnly: false, aliases: ['מטרנה 2', 'מטרנה שלב 2', 'מטרנה גולד 2'] },
  { id: 'materna_gold_step3', name: 'מטרנה גולד תרכובת מזון לתינוקות שלב 3 (700 גרם)', category: 'baby', unit: '700 גרם', basePrice: 59.90, foodOnly: false, aliases: ['מטרנה 3', 'מטרנה שלב 3', 'מטרנה גולד 3'] },
  { id: 'similac_gold_step1', name: 'סימילאק גולד תרכובת מזון שלב 1 (800 גרם)', category: 'baby', unit: '800 גרם', basePrice: 84.90, foodOnly: false, aliases: ['סימילאק 1', 'סימילאק שלב 1', 'סימילאק גולד'] },
  { id: 'similac_gold_step2', name: 'סימילאק גולד תרכובת מזון שלב 2 (800 גרם)', category: 'baby', unit: '800 גרם', basePrice: 84.90, foodOnly: false, aliases: ['סימילאק 2', 'סימילאק שלב 2'] },
  { id: 'similac_gold_step3', name: 'סימילאק גולד תרכובת מזון שלב 3 (800 גרם)', category: 'baby', unit: '800 גרם', basePrice: 84.90, foodOnly: false, aliases: ['סימילאק 3', 'סימילאק שלב 3'] },
  { id: 'nutrilon_step1', name: 'נוטרילון תרכובת מזון לתינוקות שלב 1 (800 גרם)', category: 'baby', unit: '800 גרם', basePrice: 69.90, foodOnly: false, aliases: ['נוטרילון 1', 'נוטרילון שלב 1'] },
  { id: 'nutrilon_step2', name: 'נוטרילון תרכובת מזון לתינוקות שלב 2 (800 גרם)', category: 'baby', unit: '800 גרם', basePrice: 69.90, foodOnly: false, aliases: ['נוטרילון 2', 'נוטרילון שלב 2'] },
  { id: 'cereal_baby_materna', name: 'דייסת דגנים מעורבים מועשרת מטרנה 200 גרם', category: 'baby', unit: '200 גרם', basePrice: 13.90, foodOnly: true, aliases: ['דייסה לתינוק', 'דייסת מטרנה', 'דייסת דגנים'] },
  { id: 'gerber_apple_banana', name: 'מחית פירות גרבר בטעם תפוח ובננה 190 גרם', category: 'baby', unit: '190 גרם', basePrice: 7.90, foodOnly: true, aliases: ['גרבר', 'גרבר תפוח בננה', 'מחית גרבר'] },
  { id: 'gerber_carrot_sweetpot', name: 'מחית ירקות גרבר בטעם גזר ובטטה 190 גרם', category: 'baby', unit: '190 גרם', basePrice: 7.90, foodOnly: true, aliases: ['גרבר גזר בטטה', 'גרבר ירקות'] },

  // טיפוח, בקבוקים ומוצצים
  { id: 'baby_bottle_mam_260', name: 'בקבוק הזנה אנטי-קוליק מאמ MAM נפח 260 מ"ל', category: 'baby', unit: 'יחידה', basePrice: 39.90, foodOnly: false, aliases: ['בקבוק מאמ', 'בקבוק תינוק', 'בקבוק MAM'] },
  { id: 'pacifiers_mam_silicone', name: 'זוג מוצצי סיליקון מאמ MAM לגילאי 6-16 חודשים', category: 'baby', unit: 'זוג מוצצים', basePrice: 34.90, foodOnly: false, aliases: ['מוצצים מאמ', 'מוצץ', 'מוצצי MAM'] },
  { id: 'sudocrem_jar_125g', name: 'משחת החתלה טיפולית לתינוק סודוקרם 125 גרם', category: 'baby', unit: '125 גרם', basePrice: 27.90, foodOnly: false, aliases: ['סודוקרם', 'משחה להחתלה', 'משחת החתלה'] },
  { id: 'baby_pasta_cream', name: 'משחת החתלה בייבי פסטה עם שמן זית כצט 100 גרם', category: 'baby', unit: '100 גרם', basePrice: 16.90, foodOnly: false, aliases: ['בייבי פסטה', 'משחת בייבי פסטה'] },
  { id: 'shampoo_baby_dr_fischer', name: 'שמפו אל-דמע לתינוק סנסטיב ד"ר פישר 1 ליטר', category: 'baby', unit: '1 ליטר', basePrice: 21.90, foodOnly: false, aliases: ['שמפו לתינוק', 'אל דמע', 'ד"ר פישר לתינוק'] },
  { id: 'soap_baby_dr_fischer', name: 'אל-סבון טיפולי עדין לתינוק ד"ר פישר 1 ליטר', category: 'baby', unit: '1 ליטר', basePrice: 21.90, foodOnly: false, aliases: ['סבון לתינוק', 'אל סבון תינוק'] }
];

const rawCleaningBath = [
  // כלים ומדיח
  { id: 'fairy_dish_soap_650ml', name: 'נוזל מרוכז לניקוי כלים פיירי בניחוח תפוח 650 מ"ל', category: 'cleaning_bath', unit: '650 מ"ל', basePrice: 11.90, foodOnly: false, aliases: ['פיירי', 'נוזל כלים', 'סבון כלים', 'פיירי ירוק'] },
  { id: 'fairy_dish_soap_1_2l', name: 'נוזל מרוכז לניקוי כלים פיירי מקסי מקורי 1.2 ליטר', category: 'cleaning_bath', unit: '1.2 ליטר', basePrice: 19.90, foodOnly: false, aliases: ['פיירי ענק', 'פיירי 1.2 ליטר', 'נוזל כלים פיירי'] },
  { id: 'sano_spark_dish_soap', name: 'נוזל כלים מבריק סנו ספארק לימון 1 ליטר', category: 'cleaning_bath', unit: '1 ליטר', basePrice: 10.90, foodOnly: false, aliases: ['סנו ספארק', 'נוזל כלים סנו'] },
  { id: 'finish_dishwasher_tabs_80', name: 'טבליות למדיח כלים פיניש קוואנטום אול-אין-1 מארז 80 טבליות', category: 'cleaning_bath', unit: 'מארז 80 טבליות', basePrice: 59.90, foodOnly: false, aliases: ['פיניש', 'טבליות למדיח', 'פיניש קוואנטום', 'קפסולות למדיח'] },
  { id: 'fairy_platinum_tabs_65', name: 'קפסולות למדיח כלים פיירי פלטינום פלוס מארז 65 יחידות', category: 'cleaning_bath', unit: 'מארז 65 קפסולות', basePrice: 64.90, foodOnly: false, aliases: ['פיירי פלטינום', 'קפסולות פיירי למדיח'] },
  { id: 'finish_salt_1_5kg', name: 'מלח מיוחד למדיח כלים פיניש 1.5 ק"ג', category: 'cleaning_bath', unit: '1.5 ק"ג', basePrice: 11.90, foodOnly: false, aliases: ['מלח למדיח', 'מלח פיניש'] },
  { id: 'finish_rinse_aid_400ml', name: 'נוזל הברקה למדיח כלים פיניש 400 מ"ל', category: 'cleaning_bath', unit: '400 מ"ל', basePrice: 14.90, foodOnly: false, aliases: ['נוזל הברקה', 'מבריק למדיח'] },

  // כביסה ומרככים
  { id: 'ariel_laundry_gel_3l', name: 'ג\'ל כביסה מרוכז בניחוח הר אדום אריאל 3 ליטר (60 כביסות)', category: 'cleaning_bath', unit: '3 ליטר', basePrice: 39.90, foodOnly: false, aliases: ['ג\'ל כביסה אריאל', 'אריאל', 'נוזל כביסה אריאל', 'חומר כביסה'] },
  { id: 'persil_laundry_gel_3l', name: 'ג\'ל כביסה מרוכז דיפ קלין פרסיל 3 ליטר (60 כביסות)', category: 'cleaning_bath', unit: '3 ליטר', basePrice: 39.90, foodOnly: false, aliases: ['פרסיל', 'ג\'ל כביסה פרסיל', 'נוזל כביסה פרסיל'] },
  { id: 'ariel_pods_pack50', name: 'קפסולות לכביסה אריאל אול-אין-1 פודס מארז 50 קפסולות', category: 'cleaning_bath', unit: 'מארז 50 קפסולות', basePrice: 54.90, foodOnly: false, aliases: ['קפסולות אריאל', 'אריאל פודס', 'קפסולות כביסה'] },
  { id: 'badeen_softener_blue_1l', name: 'מרכך כביסה מרוכז בדין כחול קלאסי 1 ליטר (40 כביסות)', category: 'cleaning_bath', unit: '1 ליטר', basePrice: 14.90, foodOnly: false, aliases: ['בדין כחול', 'מרכך כביסה', 'מרכך בדין'] },
  { id: 'lenor_softener_gold', name: 'מרכך כביסה מרוכז פרימיום זהב לנור 900 מ"ל', category: 'cleaning_bath', unit: '900 מ"ל', basePrice: 16.90, foodOnly: false, aliases: ['לנור', 'מרכך לנור', 'לנור זהב'] },
  { id: 'sano_maxima_perfume_spray', name: 'מבבשם כביסה ובדים מרוכז סנו מקסימה Blue Blossom נפח 750 מ"ל', category: 'cleaning_bath', unit: '750 מ"ל', basePrice: 16.90, foodOnly: false, aliases: ['מבשם כביסה', 'סנו מקסימה', 'מבשם בדים'] },

  // ניקיון הבית, רצפות ואסלות
  { id: 'bleach_sano_javel_4l', name: 'אקונומיקה סמיכה מבושמת בניחוח לימון סנו ז\'אוול 4 ליטר', category: 'cleaning_bath', unit: '4 ליטר', basePrice: 13.90, foodOnly: false, aliases: ['אקונומיקה', 'סנו ז\'אוול', 'אקונומיקה 4 ליטר'] },
  { id: 'floor_cleaner_sano_floor', name: 'נוזל לניקוי והברקת רצפות סנו פלור בניחוח מלון מרענן 2 ליטר', category: 'cleaning_bath', unit: '2 ליטר', basePrice: 19.90, foodOnly: false, aliases: ['סנו פלור', 'נוזל רצפות', 'חומר שטיפת רצפה'] },
  { id: 'floor_cleaner_ritzpaz_lavender', name: 'נוזל שטיפת רצפות ריצפז פרש בניחוח לבנדר 2 ליטר', category: 'cleaning_bath', unit: '2 ליטר', basePrice: 16.90, foodOnly: false, aliases: ['ריצפז', 'נוזל רצפות ריצפז', 'חומר לרצפה'] },
  { id: 'sano_forte_degreaser', name: 'מסיר שומנים שרופים קר סנו פורטה פלוס 750 מ"ל', category: 'cleaning_bath', unit: '750 מ"ל', basePrice: 16.90, foodOnly: false, aliases: ['סנו פורטה', 'מסיר שומנים', 'פורטה פלוס'] },
  { id: 'astonish_bathroom_spray', name: 'מסיר אבנית ועובש לאמבטיה ולמקלחון אסטוניש 750 מ"ל', category: 'cleaning_bath', unit: '750 מ"ל', basePrice: 13.90, foodOnly: false, aliases: ['אסטוניש', 'מסיר אבנית', 'חומר לאמבטיה'] },
  { id: 'domestos_toilet_gel', name: 'ג\'ל סמיך ומחטא לניקוי אסלות דומסטוס בניחוח אורנים 750 מ"ל', category: 'cleaning_bath', unit: '750 מ"ל', basePrice: 12.90, foodOnly: false, aliases: ['דומסטוס', 'מנקה אסלות', 'חומר לשירותים'] },
  { id: 'bref_toilet_block_pack3', name: 'כדוריות סבון לאסלה ברף כוח אקטיבי מארז שלישייה (3*50 גרם)', category: 'cleaning_bath', unit: 'מארז שלישייה', basePrice: 19.90, foodOnly: false, aliases: ['סבון אסלה', 'כדוריות ברף', 'ברף לאסלה'] },
  { id: 'sano_clear_glass_spray', name: 'תרסיס לניקוי חלונות ומראות סנו קליר כחול 1 ליטר', category: 'cleaning_bath', unit: '1 ליטר', basePrice: 11.90, foodOnly: false, aliases: ['סנו קליר', 'מנקה חלונות', 'ספריי חלונות'] },
  { id: 'sano_wipes_999_pack50', name: 'מטליות לחות לניקוי כללי סנו 999 מארז 50 מטליות', category: 'cleaning_bath', unit: 'מארז 50 יח\'', basePrice: 9.90, foodOnly: false, aliases: ['סנו 999', 'מגבוני ניקוי', 'מטליות לחות לניקוי'] },
  { id: 'microfiber_cloths_pack5', name: 'מטליות מיקרופייבר רב-פעמיות לניקוי יבש ורטוב מארז 5 מטליות', category: 'cleaning_bath', unit: 'מארז 5 יח\'', basePrice: 14.90, foodOnly: false, aliases: ['סמרטוט מיקרופייבר', 'מטליות מיקרופייבר', 'מטליות ניקוי'] },
  { id: 'magic_eraser_pack10', name: 'ספוג הפלא לניקוי כתמים קשים וקירות מארז 10 ספוגים', category: 'cleaning_bath', unit: 'מארז 10 יח\'', basePrice: 12.90, foodOnly: false, aliases: ['ספוג הפלא', 'ספוג פלא'] },
  { id: 'scotch_brite_pack6', name: 'כריות קרצוף סקוטש ברייט מקוריות מארז 6 יחידות', category: 'cleaning_bath', unit: 'מארז 6 יח\'', basePrice: 14.90, foodOnly: false, aliases: ['סקוטש', 'ספוג לכלים', 'סקוטש ברייט'] },

  // מוצרי נייר ואשפה
  { id: 'toilet_paper_lily_32', name: 'נייר טואלט איכותי דו-שכבתי לילי פסטל 32 גלילים', category: 'cleaning_bath', unit: 'מארז 32 גלילים', basePrice: 38.90, foodOnly: false, aliases: ['נייר טואלט', 'לילי 32', 'נייר טואלט לילי', 'טישו'] },
  { id: 'toilet_paper_shmura_32', name: 'נייר טואלט תלת-שכבתי מפנק שמורת טבע מוזהב 32 גלילים', category: 'cleaning_bath', unit: 'מארז 32 גלילים', basePrice: 42.90, foodOnly: false, aliases: ['שמורת טבע 32', 'נייר טואלט שמורת טבע'] },
  { id: 'wet_wipes_toilet_pack4', name: 'מגבוני נייר טואלט לח נשטף באסלה לילי מארז רביעייה (4*40 יח\')', category: 'cleaning_bath', unit: 'מארז 4 חבילות', basePrice: 17.90, foodOnly: false, aliases: ['מגבונים לאסלה', 'מגבוני שירותים', 'נייר טואלט לח'] },
  { id: 'paper_towels_nicole_pack6', name: 'מגבות נייר ענקיות למטבח ניקול מארז 6 גלילים כפולים', category: 'cleaning_bath', unit: 'מארז 6 גלילים', basePrice: 21.90, foodOnly: false, aliases: ['נייר סופג', 'מגבות נייר', 'ניקול', 'נייר מטבח'] },
  { id: 'trash_bags_sano_sushi_xl', name: 'שקיות אשפה ענקיות וחזקות עם שרוך סנו סושי 75*90 ס"מ (50 שקיות)', category: 'cleaning_bath', unit: 'גליל 50 שקיות', basePrice: 22.90, foodOnly: false, aliases: ['שקיות אשפה', 'שקיות זבל', 'שקיות עם שרוך', 'שקיות סנו'] },
  { id: 'trash_bags_kitchen_roll', name: 'שקיות אשפה לפח מטבח עם שרוך נשלף 60 יחידות', category: 'cleaning_bath', unit: 'גליל 60 שקיות', basePrice: 14.90, foodOnly: false, aliases: ['שקיות לפח', 'שקיות אשפה למטבח'] },
  { id: 'trash_bags_small_10l', name: 'שקיות לפח שירותים וחדרי שינה 10 ליטר מארז 100 שקיות', category: 'cleaning_bath', unit: 'מארז 100 שקיות', basePrice: 9.90, foodOnly: false, aliases: ['שקיות קטנות', 'שקיות לפח שירותים'] },

  // היגיינה אישית, פארם וטואלטיקה
  { id: 'toothpaste_colgate_total', name: 'משחת שיניים קולגייט טוטאל 12 הלבנה מתקדמת 75 מ"ל', category: 'cleaning_bath', unit: '75 מ"ל', basePrice: 14.90, foodOnly: false, aliases: ['משחת שיניים', 'קולגייט', 'קולגייט טוטאל'] },
  { id: 'toothpaste_sensodyne_repair', name: 'משחת שיניים להקלה ברגישות סנסודיין ריפייר & פרוטקט 75 מ"ל', category: 'cleaning_bath', unit: '75 מ"ל', basePrice: 22.90, foodOnly: false, aliases: ['סנסודיין', 'משחת שיניים סנסודיין'] },
  { id: 'toothpaste_parodontax', name: 'משחת שיניים להגנה על החניכיים פארודונטקס אוריג\'ינל 75 מ"ל', category: 'cleaning_bath', unit: '75 מ"ל', basePrice: 21.90, foodOnly: false, aliases: ['פארודונטקס', 'משחת שיניים לחניכיים'] },
  { id: 'toothbrush_oralb_duo', name: 'מברשות שיניים אורל-בי פרו אקספרט מדיום מארז זוגי', category: 'cleaning_bath', unit: 'מארז זוג', basePrice: 18.90, foodOnly: false, aliases: ['מברשת שיניים', 'אורל בי', 'מברשות שיניים'] },
  { id: 'mouthwash_listerine_500ml', name: 'שטיפת פה מרעננת ליסטרין קולמינט 500 מ"ל', category: 'cleaning_bath', unit: '500 מ"ל', basePrice: 19.90, foodOnly: false, aliases: ['ליסטרין', 'מי פה', 'שטיפת פה'] },
  { id: 'shampoo_head_shoulders_600', name: 'שמפו נגד קשקשים קלאסיק קלין הד אנד שולדרס 600 מ"ל', category: 'cleaning_bath', unit: '600 מ"ל', basePrice: 24.90, foodOnly: false, aliases: ['הד אנד שולדרס', 'שמפו קשקשים', 'שמפו נגד קשקשים'] },
  { id: 'shampoo_havai_700ml', name: 'שמפו הוואי קלאסי לשיער רגיל עד יבש 700 מ"ל', category: 'cleaning_bath', unit: '700 מ"ל', basePrice: 11.90, foodOnly: false, aliases: ['שמפו הוואי', 'שמפו', 'הוואי'] },
  { id: 'conditioner_havai_700ml', name: 'מרכך שיער הוואי קלאסי 700 מ"ל', category: 'cleaning_bath', unit: '700 מ"ל', basePrice: 11.90, foodOnly: false, aliases: ['מרכך הוואי', 'מרכך שיער', 'קונדישנר'] },
  { id: 'shampoo_pinuk_700ml', name: 'שמפו פינוק קלאסי לשיער רגיל 700 מ"ל', category: 'cleaning_bath', unit: '700 מ"ל', basePrice: 11.90, foodOnly: false, aliases: ['שמפו פינוק', 'פינוק'] },
  { id: 'body_wash_dove_700ml', name: 'תחליב רחצה עשיר בלחות דאב אוריג\'ינל 700 מ"ל', category: 'cleaning_bath', unit: '700 מ"ל', basePrice: 15.90, foodOnly: false, aliases: ['סבון דאב', 'תחליב רחצה דאב', 'דאב נוזלי'] },
  { id: 'body_wash_palmolive_700ml', name: 'תחליב רחצה פלמוליב ארומה תרפי מרגיע 700 מ"ל', category: 'cleaning_bath', unit: '700 מ"ל', basePrice: 13.90, foodOnly: false, aliases: ['פלמוליב', 'סבון גוף פלמוליב', 'סבון רחצה'] },
  { id: 'liquid_soap_neka7_refill', name: 'אל סבון נוזלי לידיים מילוי חסכוני נקה 7 בניחוח קמומיל 1 ליטר', category: 'cleaning_bath', unit: '1 ליטר', basePrice: 9.90, foodOnly: false, aliases: ['סבון ידיים', 'סבון נוזלי', 'נקה 7', 'מילוי סבון'] },
  { id: 'soap_bar_dove_pack4', name: 'סבון מוצק קרם לחות דאב מארז 4 יחידות (4*100 גרם)', category: 'cleaning_bath', unit: 'מארז 4 סבונים', basePrice: 17.90, foodOnly: false, aliases: ['סבון מוצק', 'דאב מוצק', 'סבון דאב'] },
  { id: 'deo_rexona_roll_on_men', name: 'דאודורנט רול-און אנטיפרספירנט לגבר רקסונה קובלט 50 מ"ל', category: 'cleaning_bath', unit: '50 מ"ל', basePrice: 12.90, foodOnly: false, aliases: ['דאודורנט רקסונה', 'דאודורנט לגבר', 'רקסונה'] },
  { id: 'deo_axe_body_spray', name: 'דאודורנט ספריי לגבר אקס דארק טמפטיישן 150 מ"ל', category: 'cleaning_bath', unit: '150 מ"ל', basePrice: 14.90, foodOnly: false, aliases: ['דאודורנט אקס', 'ספריי אקס', 'אקס'] },
  { id: 'deo_dove_roll_on_women', name: 'דאודורנט רול-און דאב אוריג\'ינל לטיפוח העור לאישה 50 מ"ל', category: 'cleaning_bath', unit: '50 מ"ל', basePrice: 12.90, foodOnly: false, aliases: ['דאודורנט דאב', 'דאודורנט לאישה'] },
  { id: 'razors_gillette_blue3_pack8', name: 'סכיני גילוח חד-פעמיים ג\'ילט בלו 3 פלוס מארז 8 סכינים', category: 'cleaning_bath', unit: 'מארז 8 סכינים', basePrice: 29.90, foodOnly: false, aliases: ['סכיני גילוח', 'ג\'ילט בלו 3', 'סכיני גילוח חד פעמיים'] },
  { id: 'razor_gillette_fusion5_handle', name: 'ידית גילוח ג\'ילט פיוז\'ן 5 פרוגלייד + 2 סכינים', category: 'cleaning_bath', unit: 'מארז ידית+2', basePrice: 59.90, foodOnly: false, aliases: ['ג\'ילט פיוז\'ן', 'סכין גילוח ג\'ילט', 'פיוז\'ן 5'] },
  { id: 'shaving_gel_gillette_fusion', name: 'ג\'ל גילוח מרגיע לעור רגיש ג\'ילט פיוז\'ן 200 מ"ל', category: 'cleaning_bath', unit: '200 מ"ל', basePrice: 16.90, foodOnly: false, aliases: ['ג\'ל גילוח', 'קצף גילוח', 'ג\'ילט ג\'ל'] },
  { id: 'always_ultra_night_pads', name: 'תחבושות היגייניות אולוויז אולטרה לילה עם כנפיים מארז 20 יחידות', category: 'cleaning_bath', unit: 'מארז 20 יח\'', basePrice: 18.90, foodOnly: false, aliases: ['אולוויז', 'תחבושות היגייניות', 'אולוויז לילה'] },
  { id: 'tampons_tampax_super', name: 'טמפונים טמפקס קומפקס סופר עם מוליך פלסטיק מארז 32 יחידות', category: 'cleaning_bath', unit: 'מארז 32 יח\'', basePrice: 28.90, foodOnly: false, aliases: ['טמפונים', 'טמפקס', 'טמפקס סופר'] },
  { id: 'cotton_buds_pack300', name: 'קיסמי צמר גפן מכותנה טהורה לניקוי עדין 300 יחידות', category: 'cleaning_bath', unit: 'קופסה 300 יח\'', basePrice: 6.90, foodOnly: false, aliases: ['קיסמי אוזניים', 'מקלות אוזניים', 'צמר גפן לאוזניים'] },
  { id: 'alcogel_500ml_pump', name: 'ג\'ל אלכוג\'ל 70% לחיטוי ידיים עם משאבה ד"ר פישר 500 מ"ל', category: 'cleaning_bath', unit: '500 מ"ל', basePrice: 14.90, foodOnly: false, aliases: ['אלכוג\'ל', 'ג\'ל לחיטוי ידיים', 'חיטוי ידיים'] }
];

const rawDisposableParty = [
  // כלים חד פעמיים ואירוח
  { id: 'plates_disposable_cane_50', name: 'צלחות חד-פעמיות מתכלות מקנה סוכר קוטר 23 ס"מ (50 צלחות)', category: 'disposable_party', unit: 'מארז 50 יח\'', basePrice: 16.90, foodOnly: false, aliases: ['צלחות חד פעמיות', 'צלחות מתכלות', 'צלחות קנה סוכר', 'צלחות'] },
  { id: 'bowls_disposable_cane_50', name: 'קעריות מרק חד-פעמיות מתכלות מקנה סוכר 350 מ"ל (50 קעריות)', category: 'disposable_party', unit: 'מארז 50 יח\'', basePrice: 14.90, foodOnly: false, aliases: ['קערות חד פעמיות', 'מרקיות חד פעמי', 'קעריות מתכלות'] },
  { id: 'cups_hot_coffee_paper_50', name: 'כוסות קרטון עבות לשתייה חמה 8oz דופן כפולה מארז 50 כוסות', category: 'disposable_party', unit: 'מארז 50 יח\'', basePrice: 12.90, foodOnly: false, aliases: ['כוסות לשתייה חמה', 'כוסות קרטון', 'כוסות קפה חד פעמי'] },
  { id: 'cups_cold_plastic_100', name: 'כוסות פלסטיק שקופות לשתייה קרה 200 מ"ל שרוול 100 כוסות', category: 'disposable_party', unit: 'שרוול 100 יח\'', basePrice: 6.90, foodOnly: false, aliases: ['כוסות חד פעמיות', 'כוסות שתייה קרה', 'כוסות פלסטיק'] },
  { id: 'cutlery_disposable_pack60', name: 'סט סכו"ם חד-פעמי קשיח שקוף מהודר 60 חלקים (20 מזלג, 20 סכין, 20 כף)', category: 'disposable_party', unit: 'מארז 60 חלקים', basePrice: 12.90, foodOnly: false, aliases: ['סכו"ם חד פעמי', 'סכו"ם פלסטיק', 'מזלגות חד פעמי'] },
  { id: 'napkins_table_pack100', name: 'מפיות שולחן לבנות איכותיות דו-שכבתיות 100 מפיות', category: 'disposable_party', unit: 'מארז 100 יח\'', basePrice: 5.90, foodOnly: false, aliases: ['מפיות', 'מפיות נייר', 'מפיות שולחן'] },
  { id: 'tablecloth_roll_10m', name: 'מפת שולחן חד-פעמית עבה בגליל 10 מטר * 1.20 מטר', category: 'disposable_party', unit: 'גליל 10 מטר', basePrice: 9.90, foodOnly: false, aliases: ['מפה חד פעמית', 'מפה בגליל', 'מפת שולחן'] },
  { id: 'aluminum_pans_medium_pack10', name: 'תבניות אלומיניום חד-פעמיות בינוניות R2 מארז 10 תבניות', category: 'disposable_party', unit: 'מארז 10 תבניות', basePrice: 11.90, foodOnly: false, aliases: ['תבניות אלומיניום', 'תבניות חד פעמיות', 'תבניות בינוניות'] },
  { id: 'aluminum_pans_giant_pack5', name: 'תבניות אלומיניום ענקיות מלבניות לאפייה ולתנור מארז 5 תבניות', category: 'disposable_party', unit: 'מארז 5 תבניות', basePrice: 12.90, foodOnly: false, aliases: ['תבניות ענקיות', 'תבניות אלומיניום ענקיות'] },

  // אריזה למטבח: נייר כסף, נצמד, נייר אפייה
  { id: 'aluminum_foil_sano_30m', name: 'רדיד אלומיניום עבה במיוחד סנו סושי 30 ס"מ * 30 מטר', category: 'disposable_party', unit: 'גליל 30 מטר', basePrice: 19.90, foodOnly: false, aliases: ['נייר כסף', 'רדיד אלומיניום', 'נייר אלומיניום'] },
  { id: 'cling_film_sano_cutter', name: 'ניילון נצמד עמיד עם חותכן סליידר סנו סושי 30 מטר', category: 'disposable_party', unit: 'גליל 30 מטר', basePrice: 14.90, foodOnly: false, aliases: ['ניילון נצמד', 'נצמד עם חותכן', 'ניילון לאוכל'] },
  { id: 'baking_paper_sheets_pack50', name: 'דפי נייר אפייה איכותיים נון-סטיק חתוכים מראש מארז 50 דפים', category: 'disposable_party', unit: 'מארז 50 דפים', basePrice: 11.90, foodOnly: false, aliases: ['נייר אפייה', 'דפי אפייה', 'נייר אפיה'] },

  // מנגל ופחמים
  { id: 'charcoal_citrus_bag_3kg', name: 'שק פחמי עץ הדרים איכותיים לבערה ארוכה 3 ק"ג', category: 'disposable_party', unit: 'שק 3 ק"ג', basePrice: 24.90, foodOnly: false, aliases: ['פחמים', 'פחמים למנגל', 'שק פחמים'] },
  { id: 'charcoal_lighter_gel_1l', name: 'ג\'ל אקולוגי להדלקת פחמים ללא עשן וריח 1 ליטר', category: 'disposable_party', unit: '1 ליטר', basePrice: 14.90, foodOnly: false, aliases: ['חומר הדלקה', 'מדליק פחמים', 'מדליק מנגל'] },
  { id: 'bamboo_skewers_pack100', name: 'שיפודי במבוק 25 ס"מ למנגל מארז 100 שיפודים', category: 'disposable_party', unit: 'מארז 100 שיפודים', basePrice: 5.90, foodOnly: false, aliases: ['שיפודים', 'שיפודי עץ', 'שיפודי במבוק'] },

  // סוללות ואלקטרוניקה בסיסית
  { id: 'batteries_duracell_aa_12', name: 'סוללות אלקליין דורסל פלוס AA מארז 12 סוללות', category: 'disposable_party', unit: 'מארז 12 סוללות', basePrice: 34.90, foodOnly: false, aliases: ['סוללות AA', 'סוללות דורסל', 'בטריות אצבע'] },
  { id: 'batteries_duracell_aaa_12', name: 'סוללות אלקליין דורסל פלוס AAA מארז 12 סוללות', category: 'disposable_party', unit: 'מארז 12 סוללות', basePrice: 34.90, foodOnly: false, aliases: ['סוללות AAA', 'בטריות קטנות', 'סוללות דורסל קטנות'] },

  // מזון וציוד לחיות מחמד
  { id: 'dog_food_bonzo_12kg', name: 'מזון יבש ומלא לכלבים בוגרים בונזו קלאסי בשרי שק 12 ק"ג', category: 'disposable_party', unit: 'שק 12 ק"ג', basePrice: 119.90, foodOnly: false, aliases: ['בונזו', 'אוכל לכלבים', 'בונזו לכלב', 'מזון יבש לכלב'] },
  { id: 'dog_food_dogli_10kg', name: 'מזון יבש לכלבים דוגלי בשרי שק 10 ק"ג', category: 'disposable_party', unit: 'שק 10 ק"ג', basePrice: 89.90, foodOnly: false, aliases: ['דוגלי', 'אוכל דוגלי', 'מזון לכלבים'] },
  { id: 'cat_food_la_cat_4kg', name: 'מזון יבש לחתולים לה קט בטעם עוף וסלמון 4 ק"ג', category: 'disposable_party', unit: 'שק 4 ק"ג', basePrice: 59.90, foodOnly: false, aliases: ['לה קט', 'אוכל לחתולים', 'מזון יבש לחתול'] },
  { id: 'cat_pouch_felix_pack4', name: 'מעדני פאוצ\'ים עשירים ברוטב לחתולים פליקס מארז רביעייה (4*85 גרם)', category: 'disposable_party', unit: 'מארז 4 פאוצ\'ים', basePrice: 14.90, foodOnly: false, aliases: ['מעדן לחתול', 'פליקס', 'פאוץ לחתול', 'שימורי חתולים'] },
  { id: 'cat_litter_clumping_10l', name: 'חול מתגבש סופג איכותי לחתולים ללא אבק 10 ליטר', category: 'disposable_party', unit: 'שק 10 ליטר', basePrice: 39.90, foodOnly: false, aliases: ['חול לחתול', 'חול מתגבש', 'שירותי חתול'] }
];

const allBabyCleaningDisposable = [
  ...rawBaby.map(item => buildProduct(item, false)),
  ...rawCleaningBath.map(item => buildProduct(item, false)),
  ...rawDisposableParty.map(item => buildProduct(item, false))
];

module.exports = allBabyCleaningDisposable;
