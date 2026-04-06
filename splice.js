const fs = require('fs');

let txt = fs.readFileSync('lib/data/products.ts', 'utf8');
txt = txt.replace(/const seeds: SeedProduct\[\] = \[\s*([\s\S]*?)\s*\];/, 'import seedsRaw from "./products.json";\n\nconst seeds: SeedProduct[] = seedsRaw as SeedProduct[];');
fs.writeFileSync('lib/data/products.ts', txt);
console.log("Spliced products.ts successfully.");
