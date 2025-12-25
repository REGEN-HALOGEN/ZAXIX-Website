const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'public', 'Infra', 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('manifest.json not found. Run `npm run generate-infra-manifest` to create it.');
  process.exit(2);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const images = (manifest.items || []).filter((i) => i.type === 'image');
console.log(`Found ${images.length} images in Infra manifest.`);
if (images.length === 0) {
  console.warn('No images found. The embedded Infrastructure section displays images only.');
  process.exit(1);
}
console.log('Infra image check passed.');
process.exit(0);
