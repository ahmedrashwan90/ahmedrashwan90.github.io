// Builds src/assets/og-home.jpg: the 1200x630 share card used for link previews
// (WhatsApp, LinkedIn, Facebook). The portrait sits in the centre so WhatsApp's
// square crop still shows the full face. Run: node scripts-og.cjs
const sharp = require('sharp');
const path = require('path');
const W = 1200, H = 630;
const src = path.join(__dirname, 'src/assets/ahmed-rashwan.jpeg');
const out = path.join(__dirname, 'src/assets/og-home.jpg');

const card = { w: 430, h: 500, x: (W - 430) / 2, y: 30, r: 34 };

const bg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a101d"/><stop offset="1" stop-color="#111c38"/></linearGradient>
    <radialGradient id="g1" cx="0.5" cy="0.42" r="0.5"><stop offset="0" stop-color="#1236D8" stop-opacity="0.55"/><stop offset="1" stop-color="#1236D8" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#35BFEF" stop-opacity="0.35"/><stop offset="1" stop-color="#35BFEF" stop-opacity="0"/></radialGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#35BFEF"/><stop offset="0.55" stop-color="#1236D8"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.15"/></linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.04"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <ellipse cx="${W / 2}" cy="270" rx="430" ry="330" fill="url(#g1)"/>
  <ellipse cx="${W / 2 + 160}" cy="120" rx="260" ry="200" fill="url(#g2)"/>
  <rect x="${card.x - 7}" y="${card.y - 7}" width="${card.w + 14}" height="${card.h + 14}" rx="${card.r + 6}" fill="url(#ring)"/>
  <circle cx="${W / 2}" cy="${card.y + card.h / 2}" r="300" fill="none" stroke="#35BFEF" stroke-opacity="0.18" stroke-dasharray="4 10"/>
  <text x="${W / 2}" y="${H - 38}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="3" fill="#ffffff">AHMED RASHWAN</text>
  <rect x="${W / 2 - 22}" y="${H - 26}" width="44" height="3" rx="1.5" fill="#35BFEF"/>
  <!-- Side text stays inside x<270 and x>930 so WhatsApp's centred square crop never cuts it. -->
  <text x="60" y="92" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" fill="#ffffff" fill-opacity="0.92">Marketing</text>
  <text x="60" y="120" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="700" fill="#ffffff" fill-opacity="0.92">Strategist &amp;</text>
  <text x="60" y="148" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#35BFEF">Performance</text>
  <text x="60" y="176" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#35BFEF">Marketer</text>
  <rect x="60" y="194" width="36" height="3" rx="1.5" fill="#35BFEF"/>
  <text x="${W - 60}" y="${H - 132}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#c9d2e3">Strategy</text>
  <text x="${W - 60}" y="${H - 104}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#c9d2e3">Content</text>
  <text x="${W - 60}" y="${H - 76}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#c9d2e3">Media Buying</text>
  <rect x="${W - 96}" y="${H - 60}" width="36" height="3" rx="1.5" fill="#35BFEF"/>
</svg>`;

const mask = Buffer.from(`<svg width="${card.w}" height="${card.h}"><rect width="${card.w}" height="${card.h}" rx="${card.r}" fill="#fff"/></svg>`);

(async () => {
  const photo = await sharp(src)
    .resize(card.w, card.h, { fit: 'cover', position: 'top' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
  await sharp(Buffer.from(bg))
    .composite([{ input: photo, left: card.x, top: card.y }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(out);
  console.log('wrote', out);
})();
