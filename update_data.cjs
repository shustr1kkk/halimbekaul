const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');

// Replace weight: 'В ящике: Xшт' with quantityInBox: 'Xшт'
content = content.replace(/weight:\s*'В ящике:\s*(.*?)'/g, "quantityInBox: '$1'");
content = content.replace(/weight:\s*'В коробке:\s*(.*?)'/g, "quantityInBox: '$1'");

// For the rest of the weight properties, the user said "перекинь все в quantityInBox"
// So we replace weight: '...' with quantityInBox: '...'
content = content.replace(/weight:\s*'(.*?)'/g, "quantityInBox: '$1'");

fs.writeFileSync('src/data.ts', content);
