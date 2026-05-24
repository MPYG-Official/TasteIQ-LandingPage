#!/usr/bin/env node
/**
 * Copies Next.js static export (out/) into the repo root for GitHub Pages.
 * Overwrites only paths that exist in out/ — does not delete source folders (nextjs-setup, etc.).
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.resolve(__dirname, '../out');

if (!fs.existsSync(OUT_DIR)) {
  console.error('Missing out/ directory. Run: npm run build:static');
  process.exit(1);
}

function copyEntry(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyEntry(path.join(src, name), path.join(dest, name));
    }
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

for (const name of fs.readdirSync(OUT_DIR)) {
  const src = path.join(OUT_DIR, name);
  const dest = path.join(REPO_ROOT, name);
  console.log(`→ ${name}`);
  copyEntry(src, dest);
}

const nojekyll = path.join(REPO_ROOT, '.nojekyll');
fs.writeFileSync(nojekyll, '');
console.log('→ .nojekyll');
console.log(`\nSynced ${OUT_DIR} → ${REPO_ROOT}`);
