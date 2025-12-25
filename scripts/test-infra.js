const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'public', 'Infra', 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('manifest.json not found. Run `npm run generate-infra-manifest` to create it.');
  process.exit(2);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
let ok = true;
if (!Array.isArray(manifest.items)) {
  console.error('manifest.json missing items array');
  process.exit(1);
}
for (const item of manifest.items) {
  const p = path.join(process.cwd(), 'public', 'Infra', item.file);
  if (!fs.existsSync(p)) {
    console.error(`Missing file for manifest item: ${item.file}`);
    ok = false;
  }
}

if (!ok) {
  console.error('Infra manifest verification failed.');
  process.exit(1);
}

console.log('Infra manifest verification passed.');
process.exit(0);
