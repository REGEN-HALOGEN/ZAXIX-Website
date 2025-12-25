const fs = require('fs');
const path = require('path');

const infraDir = path.join(process.cwd(), 'public', 'Infra');
const manifestPath = path.join(infraDir, 'manifest.json');

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
const VIDEO_EXTS = ['.mp4', '.webm', '.ogg', '.mov'];

function humanizeName(filename) {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function buildManifest() {
  if (!fs.existsSync(infraDir)) {
    console.warn('public/Infra directory does not exist. Creating...');
    fs.mkdirSync(infraDir, { recursive: true });
  }

  const files = fs.readdirSync(infraDir).filter((f) => !f.startsWith('.') && f !== 'manifest.json');

  const items = files
    .map((file) => {
      const ext = path.extname(file).toLowerCase();
      const url = `/Infra/${file}`;
      if (IMAGE_EXTS.includes(ext)) {
        return { type: 'image', file, url, name: humanizeName(file), ext };
      }
      if (VIDEO_EXTS.includes(ext)) {
        const base = file.replace(ext, '');
        const posterCandidates = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => `${base}${e}`);
        const poster = posterCandidates.find((p) => fs.existsSync(path.join(infraDir, p)));
        return { type: 'video', file, url, name: humanizeName(file), ext, poster: poster ? `/Infra/${poster}` : null };
      }
      return null;
    })
    .filter(Boolean);

  const manifest = { generatedAt: new Date().toISOString(), items };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Wrote manifest with ${items.length} items to ${manifestPath}`);
}

buildManifest();
