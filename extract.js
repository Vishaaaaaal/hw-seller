// Dev utility: re-run if you ever move seeds back into products.ts
// Usage: node extract.js
const fs = require('fs');

try {
    const txt = fs.readFileSync('lib/data/products.ts', 'utf8');
    const match = txt.match(/const seeds: SeedProduct\[\] = \[\s*([\s\S]*?)\s*\];/);
    if (!match) {
        console.log("No inline seeds found in products.ts — data is already in products.json.");
        process.exit(0);
    }

    // Convert JS object-literal array to valid JSON
    const seedsStr = match[1]
        .replace(/\/\/[^\n]*/g, '')           // strip line comments
        .replace(/,\s*([\]}])/g, '$1')         // remove trailing commas
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // quote unquoted keys
        .trim();

    const seedsArr = JSON.parse(`[${seedsStr}]`);
    fs.writeFileSync('lib/data/products.json', JSON.stringify(seedsArr, null, 2));
    console.log(`Extraction complete — ${seedsArr.length} products written.`);
} catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
}
