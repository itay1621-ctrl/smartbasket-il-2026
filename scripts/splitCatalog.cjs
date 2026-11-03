const fs = require('fs');
const path = require('path');

const original = fs.readFileSync(path.join(__dirname, '../src/data/mockStoresData.js'), 'utf8');

// Parse CATALOG_PRODUCTS out
const startMarker = 'export const CATALOG_PRODUCTS = ';
const endMarker = ';\n\nexport const WEEKLY_GROCERY_BASKET = ';
const startIdx = original.indexOf(startMarker) + startMarker.length;
const endIdx = original.indexOf(endMarker);

const productsJson = original.substring(startIdx, endIdx);
const allProducts = JSON.parse(productsJson);

console.log('Total parsed products:', allProducts.length);

const foodCategories = ['dairy_eggs', 'produce', 'meat_fish', 'bakery', 'pantry', 'snacks_drinks'];
const foodProducts = allProducts.filter(p => foodCategories.includes(p.category));
const stockProducts = allProducts.filter(p => !foodCategories.includes(p.category));

console.log('Food products:', foodProducts.length, 'Stock products:', stockProducts.length);

fs.writeFileSync(path.join(__dirname, '../src/data/groceryCatalogData.js'), 'export const GROCERY_PRODUCTS = ' + JSON.stringify(foodProducts) + ';\n', 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/data/stockCatalogData.js'), 'export const STOCK_PRODUCTS = ' + JSON.stringify(stockProducts) + ';\n', 'utf8');

const prefix = original.substring(0, original.indexOf('export const CATALOG_PRODUCTS = '));
const suffix = original.substring(endIdx);

const newMockStores = 'import { GROCERY_PRODUCTS } from "./groceryCatalogData.js";\n' +
  'import { STOCK_PRODUCTS } from "./stockCatalogData.js";\n\n' +
  prefix +
  'export const CATALOG_PRODUCTS = [...GROCERY_PRODUCTS, ...STOCK_PRODUCTS];' +
  suffix;

fs.writeFileSync(path.join(__dirname, '../src/data/mockStoresData.js'), newMockStores, 'utf8');
console.log('Split completed successfully!');
