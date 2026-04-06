const fs = require('fs');

try {
    let txt = fs.readFileSync('lib/data/products.ts', 'utf8');
    let match = txt.match(/const seeds: SeedProduct\[\] = \[\s*([\s\S]*?)\s*\];/);
    if (match) {
        let seedsStr = `[` + match[1] + `]`;
        // evaluating pure object literal array (it's safe here)
        const seedsArr = eval(seedsStr);
        fs.writeFileSync('lib/data/products.json', JSON.stringify(seedsArr, null, 2));
        console.log("Extraction complete.");
    } else {
        console.log("No match found.");
    }
} catch (e) {
    console.log("Error:", e);
}
