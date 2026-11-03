// scripts/buildMegaCatalog.cjs
const fs = require('fs');
const path = require('path');

const pDairyProduce = require('./data_dairy_produce.cjs');
const pMeatBakeryPantry = require('./data_meat_bakery_pantry.cjs');
const pSpicesSaladsSnacks = require('./data_spices_salads_snacks.cjs');
const pBabyCleaningDisposable = require('./data_baby_cleaning_disposable.cjs');
const pStockHome = require('./data_stock_home.cjs');

console.log('--- Loading catalog modules ---');
console.log('1. Dairy & Produce:', pDairyProduce.length);
console.log('2. Meat, Bakery & Pantry:', pMeatBakeryPantry.length);
console.log('3. Spices, Salads, Snacks & Frozen:', pSpicesSaladsSnacks.length);
console.log('4. Baby, Cleaning & Disposable:', pBabyCleaningDisposable.length);
console.log('5. Stock, Kitchen, Furniture, DIY, Decor:', pStockHome.length);

const groceryList = [
  ...pDairyProduce,
  ...pMeatBakeryPantry,
  ...pSpicesSaladsSnacks,
  ...pBabyCleaningDisposable
];

const stockList = [...pStockHome];

// Verify ID uniqueness
const seen = new Set();
const duplicates = [];

[...groceryList, ...stockList].forEach(p => {
  if (seen.has(p.id)) {
    duplicates.push(p.id);
  }
  seen.add(p.id);
});

if (duplicates.length > 0) {
  console.error('ERROR: Duplicate IDs found:', duplicates);
  process.exit(1);
}

console.log(`\nTotal Grocery Products: ${groceryList.length}`);
console.log(`Total Stock Products: ${stockList.length}`);
console.log(`TOTAL MEGA CATALOG: ${groceryList.length + stockList.length} products`);

// Generate JS output files
const groceryFilePath = path.join(__dirname, '..', 'src', 'data', 'groceryCatalogData.js');
const stockFilePath = path.join(__dirname, '..', 'src', 'data', 'stockCatalogData.js');

const groceryContent = `// Auto-generated Mega Grocery Catalog - SmartBasket IL 2026
// Total products: ${groceryList.length}

export const GROCERY_PRODUCTS = ${JSON.stringify(groceryList, null, 2)};
`;

const stockContent = `// Auto-generated Mega Stock Catalog - SmartBasket IL 2026
// Total products: ${stockList.length}

export const STOCK_PRODUCTS = ${JSON.stringify(stockList, null, 2)};
`;

fs.writeFileSync(groceryFilePath, groceryContent, 'utf-8');
console.log(`Written: ${groceryFilePath} (${(groceryContent.length / 1024).toFixed(1)} KB)`);

fs.writeFileSync(stockFilePath, stockContent, 'utf-8');
console.log(`Written: ${stockFilePath} (${(stockContent.length / 1024).toFixed(1)} KB)`);

console.log('Catalog build successful!');
