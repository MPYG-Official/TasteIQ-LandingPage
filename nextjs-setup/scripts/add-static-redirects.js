#!/usr/bin/env node
/**
 * GitHub Pages cannot run Next.js redirects from next.config.js on static export.
 * Writes meta-refresh HTML for external and legacy paths.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../out');

const REDIRECTS = [
  { dir: 'foods', url: 'https://foods.tasteiq.in' },
  { dir: 'affiliate', url: 'https://foods.tasteiq.in' },
];

function redirectHtml(target) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="refresh" content="0;url=${target}" />
  <link rel="canonical" href="${target}" />
  <title>Redirecting…</title>
  <script>location.replace(${JSON.stringify(target)});</script>
</head>
<body>
  <p>Redirecting to <a href="${target}">${target}</a>…</p>
</body>
</html>
`;
}

if (!fs.existsSync(OUT)) {
  console.error('Missing out/. Run build first.');
  process.exit(1);
}

for (const { dir, url } of REDIRECTS) {
  const folder = path.join(OUT, dir);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), redirectHtml(url));
  console.log(`redirect: /${dir} → ${url}`);
}

const nojekyll = path.join(OUT, '.nojekyll');
fs.writeFileSync(nojekyll, '');
console.log('→ .nojekyll');
