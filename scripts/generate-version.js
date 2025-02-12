const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const content = `// This file is auto-generated. Do not edit it manually.
export const VERSION = '${pkg.version}';
`;

const outputPath = path.join(__dirname, '../src/version.ts');
fs.writeFileSync(outputPath, content);
console.log(`Generated version.ts with version ${pkg.version}`);