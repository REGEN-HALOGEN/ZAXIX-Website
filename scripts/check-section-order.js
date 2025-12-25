const fs = require('fs');
const path = require('path');

const pagePath = path.join(process.cwd(), 'src', 'app', 'page.tsx');
if (!fs.existsSync(pagePath)) {
  console.error('Could not find src/app/page.tsx');
  process.exit(2);
}
const src = fs.readFileSync(pagePath, 'utf8');

const markers = ['<Hero />', '<About />', '<Services />', '<InfrastructureSection />', '<Careers />', '<Contact />'];
const indices = markers.map(m => src.indexOf(m));

let ok = true;
for (let i = 1; i < indices.length; i++) {
  if (indices[i] === -1) {
    console.error(`Missing marker: ${markers[i]}`);
    ok = false;
  }
  if (indices[i-1] === -1) continue;
  if (indices[i] < indices[i-1]) {
    console.error(`Order error: ${markers[i-1]} should appear before ${markers[i]}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('Section order OK: Home → Systems → Infrastructure → About → Careers → Contact');
process.exit(0);
