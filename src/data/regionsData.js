// נתוני אזורים גיאוגרפיים וסניפים פיזיים מלאים בישראל לשנת 2026
// כולל כתובות מדויקות, שעות פתיחה, טלפונים וקישורי Waze ישירים

export const REGIONS_DATA = [
  {
    id: 'modiin_shfela',
    name: 'מודיעין, שפלה ומרכז',
    shortName: 'מודיעין והמרכז',
    icon: '🏙️',
    description: 'סניפי מודיעין (ישפרו ועזריאלי), רמלה, לוד וערי השפלה',
    branches: [
      {
        id: 'max_modiin_yspro',
        name: 'מקס סטוק ישפרו סנטר מודיעין',
        chain: 'max_stock',
        chainName: 'מקס סטוק',
        chainColor: '#e11d48',
        badgeColor: 'bg-rose-600',
        city: 'מודיעין',
        address: 'שדרות המלאכות 125, ישפרו סנטר, מודיעין',
        hours: {
          weekdays: '09:00 - 21:30',
          friday: '08:30 - 15:00',
          saturday: '20:00 - 23:00'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:30 | ו׳ 08:30-15:00 | מוצ"ש 20:00-23:00',
        phone: '08-9717145',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%9E%D7%A7%D7%A1%20%D7%A1%D7%98%D7%95%D7%A7%20%D7%99%D7%A9%D7%A4%D7%A8%D7%95%20%D7%A1%D7%A0%D7%98%D7%A8%20%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F&navigate=yes',
        notes: 'סניף ענק דו-קומתי, מתחם קניות מרכזי, חניה חינם'
      },
      {
        id: 'stock_modiin_yspro',
        name: 'הסטוק ישפרו סנטר מודיעין',
        chain: 'hastock',
        chainName: 'הסטוק',
        chainColor: '#ea580c',
        badgeColor: 'bg-orange-600',
        city: 'מודיעין',
        address: 'מתחם R, רח\' החרט (ישפרו סנטר), מודיעין',
        hours: {
          weekdays: '09:00 - 21:00',
          friday: '08:30 - 14:30',
          saturday: 'סגור במוצ"ש'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:00 | ו׳ 08:30-14:30 | מוצ"ש סגור',
        phone: '08-6441777',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%94%D7%A1%D7%98%D7%95%D7%A7%20%D7%99%D7%A9%D7%A4%D7%A8%D7%95%20%D7%A1%D7%A0%D7%98%D7%A8%20%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F&navigate=yes',
        notes: 'ממוקם במתחם R ליד תחנת הדלק, חניה צמודה בשפע'
      },
      {
        id: 'stock_modiin_azrieli',
        name: 'הסטוק מרכז עזריאלי מודיעין',
        chain: 'hastock',
        chainName: 'הסטוק',
        chainColor: '#ea580c',
        badgeColor: 'bg-orange-600',
        city: 'מודיעין',
        address: 'ערער 17, קניון עזריאלי מודיעין (מתחם B)',
        hours: {
          weekdays: '09:00 - 21:30',
          friday: '09:00 - 14:30',
          saturday: 'חצי שעה מצאת השבת - 22:30'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:30 | ו׳ 09:00-14:30 | מוצ"ש עד 22:30',
        phone: '08-9721118',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F%20%D7%A2%D7%96%D7%A8%D7%99%D7%90%D7%9C%D7%99%20%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F&navigate=yes',
        notes: 'נגיש ברכבת ומרכז תחבורה, חניה מקורה חינם בשעתיים הראשונות'
      },
      {
        id: 'rami_ramlod',
        name: 'רמי לוי סטוק סניף הדגל קניון רמלוד',
        chain: 'rami_levy',
        chainName: 'רמי לוי סטוק',
        chainColor: '#0284c7',
        badgeColor: 'bg-blue-600',
        city: 'רמלה-לוד',
        address: 'צומת רמלה-לוד, קניון רמלוד',
        hours: {
          weekdays: '08:00 - 22:00',
          friday: '08:00 - 15:00',
          saturday: 'סגור במוצ"ש'
        },
        hoursDisplay: 'א׳-ה׳ 08:00-22:00 | ו׳ 08:00-15:00 | מוצ"ש סגור',
        phone: '08-9200210',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F%20%D7%A8%D7%9E%D7%9C%D7%95%D7%93%20%D7%A8%D7%9E%D7%99%20%D7%97%D7%9C%D7%95%D7%99&navigate=yes',
        notes: 'מתחם ענק 3,000 מ"ר עם מתחם סטוק ענק וכלי בית, חניה חופשית'
      }
    ]
  },
  {
    id: 'pardes_hanna_sharon',
    name: 'פרדס חנה, שרון וצפון',
    shortName: 'פרדס חנה והשרון',
    icon: '🌳',
    description: 'סניפי פרדס חנה-כרכור, חדרה, עמק חפר ויישובי השרון הצפוני',
    branches: [
      {
        id: 'rami_pardes_hanna',
        name: 'רמי לוי סטוק פרדס חנה-כרכור',
        chain: 'rami_levy',
        chainName: 'רמי לוי סטוק',
        chainColor: '#0284c7',
        badgeColor: 'bg-blue-600',
        city: 'פרדס חנה-כרכור',
        address: 'המלאכה 2, אזה"ת פרדס חנה-כרכור',
        hours: {
          weekdays: '08:30 - 22:00',
          friday: '08:00 - 14:30',
          saturday: 'סגור במוצ"ש'
        },
        hoursDisplay: 'א׳-ה׳ 08:30-22:00 | ו׳ 08:00-14:30 | מוצ"ש סגור',
        phone: '04-6379990',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%A8%D7%9E%D7%99%20%D7%9C%D7%95%D7%99%20%D7%A4%D7%A8%D7%93%D7%A1%20%D7%97%D7%A0%D7%94&navigate=yes',
        notes: 'סניף ענק 2,500 מ"ר, מחלקת סטוק עצמאית וגדולה, חניה צמודה חינם'
      },
      {
        id: 'max_pardes_hanna',
        name: 'מקס סטוק מתחם ביג פרדס חנה',
        chain: 'max_stock',
        chainName: 'מקס סטוק',
        chainColor: '#e11d48',
        badgeColor: 'bg-rose-600',
        city: 'פרדס חנה-כרכור',
        address: 'דרך הנדיב 62, מתחם BIG פרדס חנה',
        hours: {
          weekdays: '09:00 - 21:30',
          friday: '08:30 - 15:00',
          saturday: '20:00 - 23:00'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:30 | ו׳ 08:30-15:00 | מוצ"ש 20:00-23:00',
        phone: '04-6272555',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%9E%D7%A7%D7%A1%20%D7%A1%D7%98%D7%95%D7%A7%20%D7%91%D7%99%D7%92%20%D7%A4%D7%A8%D7%93%D7%A1%20%D7%97%D7%A0%D7%94&navigate=yes',
        notes: 'מתחם ביג פתוח, מגוון רחב של כלי בית וריהוט קל, חניה נרחבת'
      },
      {
        id: 'max_hadera_mix',
        name: 'מקס סטוק מתחם MIX חדרה',
        chain: 'max_stock',
        chainName: 'מקס סטוק',
        chainColor: '#e11d48',
        badgeColor: 'bg-rose-600',
        city: 'חדרה',
        address: 'צה"ל 35, מתחם MIX חדרה',
        hours: {
          weekdays: '09:00 - 21:30',
          friday: '08:30 - 15:00',
          saturday: 'מוצ"ש עד 23:00'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:30 | ו׳ 08:30-15:00 | מוצ"ש 19:30-23:00',
        phone: '04-6330008',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%9E%D7%A7%D7%A1%20%D7%A1%D7%98%D7%95%D7%A7%20%D7%9E%D7%99%D7%A7%D7%A1%20%D7%97%D7%93%D7%A8%D7%94&navigate=yes',
        notes: 'סניף דגל חדיש במתחם MIX, מעליות מרווחות לעגלות וחניה מקורה/פתוחה'
      },
      {
        id: 'stock_hadera',
        name: 'הסטוק חדרה',
        chain: 'hastock',
        chainName: 'הסטוק',
        chainColor: '#ea580c',
        badgeColor: 'bg-orange-600',
        city: 'חדרה',
        address: 'הרב עובדיה יוסף 12, חדרה',
        hours: {
          weekdays: '09:00 - 21:00',
          friday: '08:30 - 14:30',
          saturday: 'סגור במוצ"ש'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:00 | ו׳ 08:30-14:30 | מוצ"ש סגור',
        phone: '04-6228833',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%94%D7%A1%D7%98%D7%95%D7%A7%20%D7%97%D7%93%D7%A8%D7%94%20%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%94%20%D7%99%D7%95%D7%A1%D7%A3&navigate=yes',
        notes: 'מול קניון לב חדרה, מגוון מוצרי טקסטיל ומטבח'
      }
    ]
  },
  {
    id: 'south_ashdod',
    name: 'דרום ואשדוד',
    shortName: 'דרום ואשדוד',
    icon: '🌊',
    description: 'סניפי אשדוד (סטאר סנטר, ביג פאשן וסי מול), אשקלון ועוטף עזה',
    branches: [
      {
        id: 'max_ashdod_star',
        name: 'מקס סטוק סטאר סנטר אשדוד',
        chain: 'max_stock',
        chainName: 'מקס סטוק',
        chainColor: '#e11d48',
        badgeColor: 'bg-rose-600',
        city: 'אשדוד',
        address: 'ז\'בוטינסקי 47, מתחם סטאר סנטר, אשדוד',
        hours: {
          weekdays: '09:00 - 22:00',
          friday: '08:30 - 15:00',
          saturday: '20:30 - 23:30'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-22:00 | ו׳ 08:30-15:00 | מוצ"ש 20:30-23:30',
        phone: '08-8566670',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%9E%D7%A7%D7%A1%20%D7%A1%D7%98%D7%95%D7%A7%20%D7%A1%D7%98%D7%90%D7%A8%20%D7%A1%D7%A0%D7%98%D7%A8%20%D7%90%D7%A9%D7%93%D7%95%D7%93&navigate=yes',
        notes: 'סניף הדגל בדרום, 2 קומות מסחר, מול הכניסה הראשית למתחם'
      },
      {
        id: 'max_ashdod_big',
        name: 'מקס סטוק מתחם ביג פאשן אשדוד',
        chain: 'max_stock',
        chainName: 'מקס סטוק',
        chainColor: '#e11d48',
        badgeColor: 'bg-rose-600',
        city: 'אשדוד',
        address: 'אריאל שרון 1, מתחם BIG FASHION, אשדוד',
        hours: {
          weekdays: '09:30 - 22:00',
          friday: '09:00 - 15:30',
          saturday: '20:30 - 23:30'
        },
        hoursDisplay: 'א׳-ה׳ 09:30-22:00 | ו׳ 09:00-15:30 | מוצ"ש 20:30-23:30',
        phone: '08-8664420',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%9E%D7%A7%D7%A1%20%D7%A1%D7%98%D7%95%D7%A7%20%D7%91%D7%99%D7%92%20%D7%A4%D7%90%D7%A9%D7%9F%20%D7%90%D7%A9%D7%93%D7%95%D7%93&navigate=yes',
        notes: 'צמוד לתחנת הרכבת אשדוד עד הלום, חניה עילית ותחתית חינם'
      },
      {
        id: 'stock_ashdod_sea_mall',
        name: 'הסטוק מתחם סי מול אשדוד',
        chain: 'hastock',
        chainName: 'הסטוק',
        chainColor: '#ea580c',
        badgeColor: 'bg-orange-600',
        city: 'אשדוד',
        address: 'הגדוד העברי 6, קניון סי מול, אשדוד',
        hours: {
          weekdays: '09:00 - 21:30',
          friday: '09:00 - 14:30',
          saturday: 'שעה מצאת השבת - 23:00'
        },
        hoursDisplay: 'א׳-ה׳ 09:00-21:30 | ו׳ 09:00-14:30 | מוצ"ש 19:45-23:00',
        phone: '08-8671190',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%A7%D7%A0%D7%99%D7%95%D7%9F%20%D7%A1%D7%99%20%D7%9E%D7%95%D7%9C%20%D7%90%D7%A9%D7%93%D7%95%D7%93&navigate=yes',
        notes: 'לב העיר אשדוד, קרוב לתחנה המרכזית, חניה מקורה'
      },
      {
        id: 'rami_ashdod_orgim',
        name: 'רמי לוי שיווק השקמה אשדוד',
        chain: 'rami_levy',
        chainName: 'רמי לוי',
        chainColor: '#0284c7',
        badgeColor: 'bg-blue-600',
        city: 'אשדוד',
        address: 'האורגים 11, אזור תעשייה כבדה, אשדוד',
        hours: {
          weekdays: '08:00 - 22:00',
          friday: '07:30 - 14:30',
          saturday: 'סגור במוצ"ש'
        },
        hoursDisplay: 'א׳-ה׳ 08:00-22:00 | ו׳ 07:30-14:30 | מוצ"ש סגור',
        phone: '08-8520840',
        wazeUrl: 'https://www.waze.com/ul?q=%D7%A8%D7%9E%D7%99%20%D7%9C%D7%95%D7%99%20%D7%94%D7%90%D7%95%D7%A8%D7%92%D7%99%D7%9D%20%D7%90%D7%A9%D7%93%D7%95%D7%93&navigate=yes',
        notes: 'סניף גדול הכולל מחלקת כלי בית, חומרי ניקוי וסטוק מורחב, חניה חופשית'
      }
    ]
  }
];

export const DEFAULT_REGION_ID = 'modiin_shfela';

/**
 * מחזיר את פרטי האזור לפי ID
 */
export function getRegionById(regionId) {
  return REGIONS_DATA.find((r) => r.id === regionId) || REGIONS_DATA[0];
}

/**
 * מחזיר סניפים המסוננים לפי אזור ורשתות נבחרות
 */
export function getBranchesForRegionAndChains(regionId, chainKeys = []) {
  const region = getRegionById(regionId);
  if (!region) return [];

  if (!chainKeys || chainKeys.length === 0) {
    return region.branches;
  }

  // התאמת מזהי רשתות בין המזהים של החישוב (max_stock, hastock, rami_levy, max_stock_online, stock_online)
  // לסניפים הפיזיים
  return region.branches.filter((branch) => {
    return chainKeys.some((k) => {
      if (k === 'max_stock' || k === 'max_stock_online') return branch.chain === 'max_stock';
      if (k === 'hastock' || k === 'stock_online') return branch.chain === 'hastock';
      if (k === 'rami_levy') return branch.chain === 'rami_levy';
      return branch.chain === k;
    });
  });
}
