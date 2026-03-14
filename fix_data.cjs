const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');

// If it's a number followed by шт, add "В ящике: "
content = content.replace(/quantityInBox:\s*'(\d+шт)'/g, "quantityInBox: 'В ящике: $1'");

fs.writeFileSync('src/data.ts', content);
