// scripts/data_stock_home.cjs
// Departments:
// 13. kitchen (כלי בית, בישול ואירוח)
// 14. furniture (ריהוט, אחסון וארגון)
// 15. diy (כלי עבודה, חשמל ו-DIY)
// 16. decor (טקסטיל, עיצוב ואמבטיה)

const { buildProduct } = require('./catalogHelper.cjs');

const rawKitchen = [
  // סירים ומחבתות
  { id: 'pot_sotez_28cm', name: 'סיר סוטאז\' יציקת אלומיניום שיש נון-סטיק 28 ס"מ עם מכסה זכוכית', category: 'kitchen', unit: 'יחידה', basePrice: 89.90, isStock: true, aliases: ['סוטאז\'', 'סיר סוטאז', 'סוטאז 28', 'סיר שיש 28', 'סוטאז׳ רחב 28 ס״מ Non-Stick לבישול וצלייה'] },
  { id: 'pot_soup_24cm', name: 'סיר מרק עמוק יציקת אלומיניום 24 ס"מ (5.5 ליטר) עם מכסה', category: 'kitchen', unit: 'יחידה', basePrice: 79.90, isStock: true, aliases: ['סיר מרק', 'סיר 24', 'סיר עמוק', 'סיר אלומיניום', 'סיר נירוסטה / נון סטיק 24 ס״מ עם מכסה זכוכית'] },
  { id: 'pan_granite_24cm', name: 'מחבת נון-סטיק גרניט שיש אינדוקציה 24 ס"מ', category: 'kitchen', unit: 'יחידה', basePrice: 49.90, isStock: true, aliases: ['מחבת 24', 'מחבת שיש', 'מחבת גרניט', 'מחבת'] },
  { id: 'pan_granite_28cm', name: 'מחבת נון-סטיק גרניט שיש עמוקה אינדוקציה 28 ס"מ', category: 'kitchen', unit: 'יחידה', basePrice: 69.90, isStock: true, aliases: ['מחבת 28', 'מחבת גדולה', 'מחבת עמוקה'] },
  { id: 'pan_pancake_26cm', name: 'מחבת פנקייק ובלינצ\'ס נון-סטיק דקה 26 ס"מ', category: 'kitchen', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['מחבת פנקייק', 'מחבת בלינצ\'ס'] },

  // כלי אוכל, סכו"ם וכוסות
  { id: 'cutlery_set_24pcs_stainless', name: 'סט סכו"ם נירוסטה אל-חלד 24 חלקים ל-6 סועדים', category: 'kitchen', unit: 'מארז 24 חלקים', basePrice: 69.90, isStock: true, aliases: ['סט סכו"ם', 'סכו"ם נירוסטה', 'סכו"ם 24 חלקים', 'סכו"ם', 'סט סכו״ם נירוסטה 24 חלקים מלא (6 סכינים, 6 מזלגות, 6 כפות, 6 כפיות)'] },
  { id: 'dinnerware_opal_18pcs', name: 'סט צלחות זכוכית מחוסמת אופל לבן 18 חלקים ל-6 סועדים', category: 'kitchen', unit: 'מארז 18 צלחות', basePrice: 99.90, isStock: true, aliases: ['סט צלחות', 'צלחות אופל', 'סט צלחות לבן', 'צלחות'] },
  { id: 'glasses_low_set6', name: 'סט 6 כוסות שתייה נמוכות זכוכית קריסטלית 300 מ"ל (וויסקי/מים)', category: 'kitchen', unit: 'מארז 6 כוסות', basePrice: 24.90, isStock: true, aliases: ['כוסות שתייה', 'כוסות נמוכות', 'כוסות וויסקי'] },
  { id: 'glasses_high_set6', name: 'סט 6 כוסות שתייה גבוהות זכוכית שקופה 400 מ"ל', category: 'kitchen', unit: 'מארז 6 כוסות', basePrice: 24.90, isStock: true, aliases: ['כוסות גבוהות', 'כוסות שתייה קרה', 'סט כוסות'] },
  { id: 'mugs_ceramic_set6', name: 'סט 6 ספלי מאג מעוצבים לקפה ותה מקרמיקה 350 מ"ל', category: 'kitchen', unit: 'מארז 6 מאגים', basePrice: 34.90, isStock: true, aliases: ['מאגים', 'ספלים לקפה', 'כוסות קפה מאג'] },

  // סכינים וכלי עזר לבישול
  { id: 'knife_chef_20cm', name: 'סכין שף מקצועית 20 ס"מ מפלדת אל-חלד גרמנית', category: 'kitchen', unit: 'יחידה', basePrice: 49.90, isStock: true, aliases: ['סכין שף', 'סכין חדה', 'סכין מטבח'] },
  { id: 'knife_victorinox_serrated', name: 'סכין ירקות משוננת חדה ויקטורינוקס שוויצרית מקורית', category: 'kitchen', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['ויקטורינוקס', 'סכין ויקטורינוקס', 'סכין עגבניות', 'סכין משוננת'] },
  { id: 'peeler_victorinox', name: 'קולפן ירקות ויקטורינוקס ארגונומי משונן', category: 'kitchen', unit: 'יחידה', basePrice: 19.90, isStock: true, aliases: ['קולפן ויקטורינוקס', 'קולפן ירקות', 'קולפן'] },
  { id: 'butcher_board_bamboo', name: 'קרש חיתוך ובוצ\'ר עבה מבמבוק טבעי עם חריץ ניקוז 30*40 ס"מ', category: 'kitchen', unit: 'יחידה', basePrice: 49.90, isStock: true, aliases: ['קרש חיתוך', 'בוצ\'ר במבוק', 'לוח חיתוך'] },
  { id: 'chopper_manual_pull', name: 'קוצץ ירקות מהיר במשיכת חוט עם 3 להבי נירוסטה 500 מ"ל', category: 'kitchen', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['קוצץ ירקות', 'קוצץ ידני', 'קוצץ משיכה', 'קוצץ בצל'] },
  { id: 'grater_4sided_stainless', name: 'פומפייה 4 צדדים מנירוסטה איכותית עם בסיס סיליקון מונע החלקה', category: 'kitchen', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['פומפייה', 'פומפיה', 'מגררת'] },
  { id: 'colander_stainless_24cm', name: 'מסננת נירוסטה עמוקה לפסטה וירקות 24 ס"מ עם רגליות וידיות', category: 'kitchen', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['מסננת נירוסטה', 'מסננת לפסטה', 'מסננת'] },
  { id: 'mixing_bowls_set3', name: 'סט 3 קערות ערבוב מנירוסטה בגדלים שונים עם תחתיות סיליקון', category: 'kitchen', unit: 'מארז 3 קערות', basePrice: 49.90, isStock: true, aliases: ['קערות ערבוב', 'קערות נירוסטה', 'קערות לבישול'] },
  { id: 'pyrex_baking_dish', name: 'תבנית אפייה מלבנית פיירקס מזכוכית מחוסמת עמידה בחום 35*22 ס"מ', category: 'kitchen', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['תבנית פיירקס', 'פיירקס לתנור', 'תבנית זכוכית'] },

  // מכשירי חשמל קטנים וכלי אחסון למטבח
  { id: 'electric_kettle_stainless', name: 'קומקום חשמלי מהיר מנירוסטה מוברשת 1.7 ליטר 2000W', category: 'kitchen', unit: 'יחידה', basePrice: 69.90, isStock: true, aliases: ['קומקום חשמלי', 'קומקום נירוסטה', 'קומקום'] },
  { id: 'sandwich_toaster_press', name: 'טוסטר לחיצה פסים חשמלי 2 פרוסות ציפוי נון-סטיק', category: 'kitchen', unit: 'יחידה', basePrice: 69.90, isStock: true, aliases: ['טוסטר לחיצה', 'טוסטר פסים', 'טוסטר'] },
  { id: 'kitchen_scale_digital', name: 'משקל מטבח דיגיטלי דק ומדויק 1 גרם עד 5 ק"ג', category: 'kitchen', unit: 'יחידה', basePrice: 34.90, isStock: true, aliases: ['משקל מטבח', 'משקל דיגיטלי'] },
  { id: 'water_bottle_thermal_750', name: 'בקבוק שתייה תרמי שומר קור 24 שעות וחום מנירוסטה 750 מ"ל', category: 'kitchen', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['בקבוק תרמי', 'תרמוס אישי', 'בקבוק מים נירוסטה'] },
  { id: 'thermos_family_1_5l', name: 'תרמוס משפחתי לשתייה חמה עם משאבת לחץ 1.5 ליטר', category: 'kitchen', unit: 'יחידה', basePrice: 59.90, isStock: true, aliases: ['תרמוס', 'תרמוס משפחתי', 'תרמוס קפה'] },
  { id: 'dish_drying_rack_2tier', name: 'מתקן לייבוש כלים על השיש 2 קומות מנירוסטה שחורה עם מגש ניקוז', category: 'kitchen', unit: 'יחידה', basePrice: 79.90, isStock: true, aliases: ['מייבש כלים', 'מתקן לייבוש כלים', 'מייבש כלים 2 קומות'] },
  { id: 'food_containers_set12', name: 'סט 12 קופסאות אחסון פלסטיק BPA Free אטומות הרמטית עם סגירת קליפס', category: 'kitchen', unit: 'מארז 12 קופסאות', basePrice: 49.90, isStock: true, aliases: ['קופסאות אוכל', 'קופסאות אחסון', 'סט קופסאות'] }
];

const rawFurniture = [
  // ריהוט ואחסון
  { id: 'shelf_cube_4', name: 'כוורת 4 תאים לאחסון וספרים מודולרית (גוון אלון / לבן)', category: 'furniture', unit: 'יחידה', basePrice: 119.90, isStock: true, aliases: ['כוורת 4 תאים', 'כוורת ספרים', 'מדף כוורת'] },
  { id: 'shelf_cube_6', name: 'כוורת 6 תאים גדולה לאחסון ספרים ומשחקים', category: 'furniture', unit: 'יחידה', basePrice: 169.90, isStock: true, aliases: ['כוורת 6 תאים', 'כוורת גדולה'] },
  { id: 'shoe_rack_4tier', name: 'ארון / מעמד נעליים 4 קומות דק וקומפקטי עד 12 זוגות', category: 'furniture', unit: 'יחידה', basePrice: 59.90, isStock: true, aliases: ['ארון נעליים', 'מעמד נעליים', 'מתקן נעליים'] },
  { id: 'coffee_table_round', name: 'שולחן סלון מודרני עגול קוטר 60 ס"מ רגלי עץ אלון', category: 'furniture', unit: 'יחידה', basePrice: 129.90, isStock: true, aliases: ['שולחן סלון', 'שולחן קפה', 'שולחן עגול'] },
  { id: 'desk_computer_100', name: 'שולחן כתיבה ועבודה למחשב 100*50 ס"מ מסגרת מתכת שחורה', category: 'furniture', unit: 'יחידה', basePrice: 159.90, isStock: true, aliases: ['שולחן כתיבה', 'שולחן מחשב', 'שולחן עבודה'] },
  { id: 'office_chair_ergonomic', name: 'כיסא מחשב ארגונומי עם גב רשת נושם ובוכנה פנאומטית', category: 'furniture', unit: 'יחידה', basePrice: 229.90, isStock: true, aliases: ['כיסא מחשב', 'כיסא משרדי', 'כיסא ארגונומי'] },
  { id: 'clothes_rack_wheels', name: 'מתלה בגדים כפול מתכוונן לגובה על גלגלים ממתכת', category: 'furniture', unit: 'יחידה', basePrice: 69.90, isStock: true, aliases: ['מתלה בגדים', 'סטנד בגדים', 'מתלה על גלגלים'] },
  { id: 'plastic_drawers_4tier', name: 'שידת 4 מגירות פלסטיק רחבה לאחסון רב-תכליתי', category: 'furniture', unit: 'יחידה', basePrice: 99.90, isStock: true, aliases: ['שידת מגירות', 'שידת פלסטיק', 'מגירות אחסון'] },
  { id: 'bedside_table_drawer', name: 'שידת לילה קומפקטית לחדר שינה עם מגירת עץ', category: 'furniture', unit: 'יחידה', basePrice: 89.90, isStock: true, aliases: ['שידת לילה', 'שולחן לילה'] },
  { id: 'storage_box_60l_wheels', name: 'ארגז אחסון שקוף ענק 60 ליטר עם מכסה ננעל וגלגלים', category: 'furniture', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['ארגז אחסון', 'ארגז 60 ליטר', 'קופסת אחסון גדולה', 'ארגז פלסטיק'] },
  { id: 'storage_box_30l', name: 'ארגז אחסון שקוף 30 ליטר עם מכסה ננעל', category: 'furniture', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['ארגז 30 ליטר', 'קופסת אחסון'] },
  { id: 'velvet_hangers_pack20', name: 'מארז 20 קולבי בגדים קטיפה מונעי החלקה ודקים במיוחד', category: 'furniture', unit: 'מארז 20 קולבים', basePrice: 34.90, isStock: true, aliases: ['קולבים', 'קולבי קטיפה', 'קולבי בגדים'] },
  { id: 'laundry_basket_bamboo', name: 'סל כביסה מתקפל מבד פשתן עמיד ומסגרת במבוק 65 ליטר', category: 'furniture', unit: 'יחידה', basePrice: 59.90, isStock: true, aliases: ['סל כביסה', 'סל כביסה במבוק', 'סל כביסה מעוצב'] },
  { id: 'folding_step_stool', name: 'שרפרף פלסטיק מתקפל קל לנשיאה וקומפקטי עד 100 ק"ג', category: 'furniture', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['שרפרף מתקפל', 'שרפרף פלסטיק', 'דרגש מתקפל'] }
];

const rawDIY = [
  // כלי עבודה וחשמל
  { id: 'cordless_drill_12v', name: 'מברגה נטענת 12V ליתיום קומפקטית כולל סט ביטים ומטען', category: 'diy', unit: 'ערכה', basePrice: 129.90, isStock: true, aliases: ['מברגה', 'מברגה נטענת', 'מקדחה 12V'] },
  { id: 'toolbox_rugged_16', name: 'ארגז כלים מקצועי קשיח 16 אינץ\' עם תאי ברגים ומגש נשלף', category: 'diy', unit: 'יחידה', basePrice: 49.90, isStock: true, aliases: ['ארגז כלים', 'ארגז כלי עבודה'] },
  { id: 'screwdriver_bits_set32', name: 'סט 32 כלי עבודה ביטים מברגים מגנטיים וידית רצ\'ט', category: 'diy', unit: 'מארז 32 חלקים', basePrice: 34.90, isStock: true, aliases: ['סט ביטים', 'סט מברגים', 'מברגים'] },
  { id: 'claw_hammer_fiber', name: 'פטיש טפסנים 500 גרם עם ראש פלדה וידית פיברגלס מונעת החלקה', category: 'diy', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['פטיש', 'פטיש טפסנים'] },
  { id: 'pliers_long_nose', name: 'פלייר שפיץ מקצועי 6 אינץ\' מפלדת כרום ונדיום', category: 'diy', unit: 'יחידה', basePrice: 19.90, isStock: true, aliases: ['פלייר שפיץ', 'פלייר'] },
  { id: 'wrench_adjustable_8', name: 'מפתח שוודי מתכוונן 8 אינץ\' מפלדה מחוזקת', category: 'diy', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['מפתח שוודי', 'שוודי'] },
  { id: 'tape_measure_5m', name: 'סרט מדידה פלדה 5 מטר עם מנגנון נעילה אוטומטית', category: 'diy', unit: 'יחידה', basePrice: 14.90, isStock: true, aliases: ['סרט מדידה', 'מטר', 'מטר מדידה'] },
  { id: 'magnetic_level_40cm', name: 'פלס בנאים מגנטי 40 ס"מ מאלומיניום עם 3 עיניות דיוק', category: 'diy', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['פלס', 'פלס מגנטי'] },
  { id: 'painting_kit_roller', name: 'ערכת צביעה מושלמת לבית: רולר 9 אינץ\', מגש צבע ומברשת 2 אינץ\'', category: 'diy', unit: 'ערכה', basePrice: 29.90, isStock: true, aliases: ['ערכת צביעה', 'רולר לצבע', 'כלי צביעה'] },
  { id: 'putty_knife_stainless', name: 'שפכטל נירוסטה גמיש 10 ס"מ לעבודות שפכטל וגבס', category: 'diy', unit: 'יחידה', basePrice: 12.90, isStock: true, aliases: ['שפכטל', 'סכין שפכטל'] },
  { id: 'silicone_super7_white', name: 'דבק איטום סופר 7 לבן שפופרת 290 מ"ל לאמבטיות ומטבחים', category: 'diy', unit: 'שפופרת 290 מ"ל', basePrice: 24.90, isStock: true, aliases: ['סופר 7', 'סיליקון לאמבטיה', 'דבק סופר 7'] },
  { id: 'super_glue_gel_pack3', name: 'דבק מהיר ג\'ל סופר גלו מקורי מארז 3 שפופרות (3*3 גרם)', category: 'diy', unit: 'מארז 3 יח\'', basePrice: 11.90, isStock: true, aliases: ['סופר גלו', 'דבק 3 שניות', 'דבק מהיר'] },
  { id: 'hot_glue_gun_kit', name: 'אקדח דבק חם חשמלי כולל 10 מקלות דבק סיליקון', category: 'diy', unit: 'ערכה', basePrice: 24.90, isStock: true, aliases: ['דבק חם', 'אקדח דבק חם'] },
  { id: 'extension_cord_5m', name: 'כבל מאריך חשמלי 5 מטר כבל עבה עם תקע יצוק', category: 'diy', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['כבל מאריך', 'מאריך חשמל'] },
  { id: 'power_strip_4outlets', name: 'מפצל חשמל 4 שקעים עם מפסק מואר והגנת ברגים', category: 'diy', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['מפצל חשמל', 'שקע מרובע', 'מפצל 4'] },
  { id: 'wall_charger_type_c_25w', name: 'מטען קיר מהיר Type-C PD 25W לסמארטפונים וטאבלטים', category: 'diy', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['מטען מהיר', 'מטען לטלפון', 'מטען טייפ סי'] },
  { id: 'cable_type_c_to_c_braided', name: 'כבל טעינה וסנכרון מהיר Type-C ל-Type-C מחוזק ניילון קלוע 1.5 מטר', category: 'diy', unit: 'יחידה', basePrice: 19.90, isStock: true, aliases: ['כבל טייפ סי', 'כבל Type C', 'כבל טעינה'] },
  { id: 'cable_lightning_braided', name: 'כבל טעינה מהיר לאייפון Lightning מחוזק קלוע 1.5 מטר', category: 'diy', unit: 'יחידה', basePrice: 19.90, isStock: true, aliases: ['כבל לאייפון', 'כבל אייפון', 'כבל אפל'] },
  { id: 'flashlight_led_rechargeable', name: 'פנס לד נטען USB עוצמתי עם זום ותאורת חירום צדדית', category: 'diy', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['פנס', 'פנס נטען', 'פנס לד'] }
];

const rawDecor = [
  // טקסטיל, עיצוב ואמבטיה
  { id: 'bath_towel_cotton_70x140', name: 'מגבת גוף ענקית 100% כותנה סרוקה צפופה 70*140 ס"מ (550 גרם/מ"ר)', category: 'decor', unit: 'יחידה', basePrice: 34.90, isStock: true, aliases: ['מגבת גוף', 'מגבת גדולה', 'מגבת כותנה', 'מגבות'] },
  { id: 'face_towel_cotton_50x90', name: 'מגבת פנים וידיים 100% כותנה מובחרת 50*90 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 16.90, isStock: true, aliases: ['מגבת פנים', 'מגבת ידיים'] },
  { id: 'bath_mat_memory_foam', name: 'שטיחון אמבטיה מפנק ספוג זיכרון Memory Foam מונע החלקה 50*80 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['שטיחון אמבטיה', 'שטיח אמבטיה', 'שטיח למקלחת'] },
  { id: 'shower_curtain_waterproof', name: 'וילון מקלחת ואמבטיה דוחה מים 180*200 ס"מ כולל 12 טבעות תלייה', category: 'decor', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['וילון אמבטיה', 'וילון מקלחת'] },
  { id: 'bath_accessories_set4', name: 'סט אביזרי אמבטיה מעוצב 4 חלקים (דיספנסר סבון, מעמד מברשות, כוסית, סבונייה)', category: 'decor', unit: 'סט 4 חלקים', basePrice: 49.90, isStock: true, aliases: ['סט לאמבטיה', 'אביזרי אמבטיה', 'דיספנסר סבון', 'אבזור אמבטיה ללא קידוח סדרת OCEAN (מתקן ואקום למברשות, מעמד סבון, ווים כפולים)'] },
  { id: 'curtains_pair_living', name: 'זוג וילונות הצללה מודרניים לסלון / חדר שינה 140*260 ס"מ', category: 'decor', unit: 'זוג וילונות', basePrice: 79.90, isStock: true, aliases: ['וילונות', 'וילון לסלון', 'זוג וילונות הצללה לסלון / חדר שינה + מוט תלייה טלסקופי'] },
  { id: 'lighting_package_led', name: 'חבילת תאורה מלאה: מנורת שולחן מודרנית + מארז 6 נורות LED חסכוניות', category: 'decor', unit: 'ערכה', basePrice: 69.90, isStock: true, aliases: ['תאורה', 'חבילת תאורה', 'נורות לד', 'חבילת תאורה מלאה: שנדליר 3 קנים + מנורת שולחן מודרנית + מארז 6 נורות LED חסכוניות'] },
  { id: 'toilet_brush_matte_black', name: 'מברשת אסלה ומעמד מעוצב בגימור שחור מט / נירוסטה', category: 'decor', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['מברשת אסלה', 'מעמד למברשת אסלה'] },
  { id: 'bedding_set_cotton_160x200', name: 'סט מצעים זוגי מלא 100% כותנה פרקל 160*200 ס"מ (סדין, ציפה, 2 ציפיות)', category: 'decor', unit: 'סט זוגי מלא', basePrice: 139.90, isStock: true, aliases: ['מצעים זוגיים', 'מצעים 100% כותנה', 'סט מצעים', 'מצעים'] },
  { id: 'bedding_set_satin_160x200', name: 'סט מצעים זוגי יוקרתי 100% כותנה סאטן רך ומבריק 160*200 ס"מ', category: 'decor', unit: 'סט זוגי מלא', basePrice: 179.90, isStock: true, aliases: ['מצעי סאטן', 'מצעים יוקרתיים'] },
  { id: 'duvet_winter_double', name: 'שמיכת פוך זוגית חורפית מפנקת סיבים חלולים מיקרופייבר היפואלרגנית', category: 'decor', unit: 'יחידה', basePrice: 119.90, isStock: true, aliases: ['שמיכת פוך', 'פוך זוגי', 'שמיכת חורף'] },
  { id: 'fleece_blanket_fluffy', name: 'שמיכת כרבולית פליז קטיפתית מחממת ומפנקת לסלון 150*200 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['כרבולית', 'שמיכת פליז', 'שמיכה לטלוויזיה'] },
  { id: 'visco_pillows_pair', name: 'זוג כריות שינה אורתופדיות ויסקו אלסטי זיכרון מבד נושם', category: 'decor', unit: 'זוג כריות', basePrice: 119.90, isStock: true, aliases: ['כריות ויסקו', 'כרית שינה', 'זוג כריות'] },
  { id: 'floor_mirror_standing', name: 'מראת גוף עומדת בעיצוב מודרני מינימליסטי 160*40 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 139.90, isStock: true, aliases: ['מראת גוף', 'מראה עומדת', 'מראה גדולה'] },
  { id: 'round_wall_mirror_60', name: 'מראת קיר עגולה מעוצבת מסגרת מתכת דקה קוטר 60 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 89.90, isStock: true, aliases: ['מראה עגולה', 'מראת קיר'] },
  { id: 'wall_clock_modern_silent', name: 'שעון קיר מודרני מנגנון שקט ללא תקתוק קוטר 30 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 39.90, isStock: true, aliases: ['שעון קיר', 'שעון שקט'] },
  { id: 'succulent_ceramic_plant', name: 'עציץ סוקולנט מלאכותי מעוצב בכלי קרמיקה דקורטיבי', category: 'decor', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['עציץ מלאכותי', 'צמח נוי', 'סוקולנט'] },
  { id: 'glass_vase_decorative', name: 'אגרטל זכוכית שקוף מודרני לפרחים גובה 25 ס"מ', category: 'decor', unit: 'יחידה', basePrice: 29.90, isStock: true, aliases: ['אגרטל', 'אגרטל פרחים', 'אגרטל זכוכית'] },
  { id: 'scented_candle_jar', name: 'נר ריחני שעוות סויה בצנצנת זכוכית יוקרתית בניחוח וניל ולבנדר', category: 'decor', unit: 'יחידה', basePrice: 24.90, isStock: true, aliases: ['נר ריחני', 'נרות', 'נר בצנצנת'] },
  { id: 'reed_diffuser_200ml', name: 'מפיץ ריח יוקרתי לבית עם מקלות במבוק שמנים אתריים 200 מ"ל', category: 'decor', unit: 'יחידה', basePrice: 34.90, isStock: true, aliases: ['מפיץ ריח', 'בושם לבית', 'מקלות ריח'] }
];

const allStockHome = [
  ...rawKitchen.map(item => buildProduct(item, true)),
  ...rawFurniture.map(item => buildProduct(item, true)),
  ...rawDIY.map(item => buildProduct(item, true)),
  ...rawDecor.map(item => buildProduct(item, true))
];

module.exports = allStockHome;
