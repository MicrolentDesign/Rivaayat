/* Generates the placeholder art set: abstract textile motifs in the Rivaayat
   palette. Every product/editorial slot has a real file, so nothing ever
   renders as a broken image before real photography lands.
   Run: npm run art                                                        */
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../public/img/', import.meta.url);
mkdirSync(OUT, { recursive: true });

// Palette drawn straight from tokens.css
const P = {
  bone: '#F2EDE4', alabaster: '#FAF8F4', clay: '#E7DFD2', sand: '#DDD6CA',
  ink: '#1A1714', inkSoft: '#4A443C', stone: '#B3AA9C',
  henna: '#9C4A21', hennaDeep: '#7E3A18', marigold: '#C08A2E',
  indigo: '#2B3A4A', indigoDeep: '#1E2A36', moss: '#4F5B44',
  rose: '#A8676B', plum: '#5C3B4A', teal: '#3F5C58',
};

const grain = (id) => `
  <filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.055"/></feComponentTransfer>
    <feBlend in2="SourceGraphic" mode="multiply"/>
  </filter>`;

/* ── Motif generators: each returns <defs> pattern markup + the fill id ── */
const motifs = {
  // Suzani — radiating medallion
  suzani: (fg, id) => ({
    defs: `<pattern id="${id}" width="120" height="120" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="${fg}" stroke-width="1.1" opacity="0.5">
        <circle cx="60" cy="60" r="26"/><circle cx="60" cy="60" r="14"/><circle cx="60" cy="60" r="5" fill="${fg}" stroke="none"/>
        ${Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return `<ellipse cx="${(60 + Math.cos(a) * 40).toFixed(1)}" cy="${(60 + Math.sin(a) * 40).toFixed(1)}" rx="7" ry="3.4" transform="rotate(${i * 30} ${(60 + Math.cos(a) * 40).toFixed(1)} ${(60 + Math.sin(a) * 40).toFixed(1)})"/>`;
        }).join('')}
      </g></pattern>`, id }),
  // Ikat — feathered chevron
  ikat: (fg, id) => ({
    defs: `<pattern id="${id}" width="64" height="56" patternUnits="userSpaceOnUse">
      <g stroke="${fg}" stroke-width="2.4" fill="none" opacity="0.42" stroke-linecap="square">
        <path d="M0 40 L16 16 L32 40 L48 16 L64 40"/>
        <path d="M0 12 L16 -12 L32 12 L48 -12 L64 12" opacity="0.55"/>
        <path d="M0 68 L16 44 L32 68 L48 44 L64 68" opacity="0.55"/>
      </g></pattern>`, id }),
  // Bandhani — tie-dye dot clusters
  bandhani: (fg, id) => ({
    defs: `<pattern id="${id}" width="46" height="46" patternUnits="userSpaceOnUse">
      <g fill="${fg}" opacity="0.4">
        <circle cx="11" cy="11" r="3"/><circle cx="34" cy="23" r="3"/><circle cx="11" cy="34" r="2"/>
        <circle cx="23" cy="4" r="1.6"/><circle cx="41" cy="41" r="2.4"/><circle cx="4" cy="23" r="1.6"/>
      </g></pattern>`, id }),
  // Block print — floral butti grid
  butti: (fg, id) => ({
    defs: `<pattern id="${id}" width="72" height="72" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="${fg}" stroke-width="1.2" opacity="0.45">
        <path d="M36 18 C46 26 46 40 36 50 C26 40 26 26 36 18Z"/>
        <path d="M36 24 L36 46"/>
        <path d="M18 58 C22 54 26 54 30 58" /><path d="M42 58 C46 54 50 54 54 58"/>
        <circle cx="36" cy="8" r="2" fill="${fg}" stroke="none"/>
      </g></pattern>`, id }),
  // Zari — fine metallic stripe
  zari: (fg, id) => ({
    defs: `<pattern id="${id}" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
      <line x1="0" y1="0" x2="0" y2="18" stroke="${fg}" stroke-width="1.6" opacity="0.34"/>
      <line x1="9" y1="0" x2="9" y2="18" stroke="${fg}" stroke-width="0.6" opacity="0.22"/>
    </pattern>`, id }),
  // Jaali — lattice screen
  jaali: (fg, id) => ({
    defs: `<pattern id="${id}" width="52" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="52" height="52" fill="none"/>
      <g stroke="${fg}" stroke-width="1.1" fill="none" opacity="0.4">
        <rect x="6" y="6" width="40" height="40"/><rect x="17" y="17" width="18" height="18"/>
      </g></pattern>`, id }),
  // Khadi — hand-loom weave
  khadi: (fg, id) => ({
    defs: `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse">
      <g stroke="${fg}" stroke-width="0.9" opacity="0.3">
        <line x1="0" y1="2.5" x2="10" y2="2.5"/><line x1="0" y1="7.5" x2="10" y2="7.5"/>
        <line x1="2.5" y1="0" x2="2.5" y2="10"/><line x1="7.5" y1="0" x2="7.5" y2="10"/>
      </g></pattern>`, id }),
  // Kantha — running-stitch rows
  kantha: (fg, id) => ({
    defs: `<pattern id="${id}" width="40" height="22" patternUnits="userSpaceOnUse">
      <g stroke="${fg}" stroke-width="1.6" stroke-linecap="round" opacity="0.4" stroke-dasharray="6 5">
        <line x1="0" y1="5" x2="40" y2="5"/><line x1="-3" y1="16" x2="37" y2="16"/>
      </g></pattern>`, id }),
};

/* ── Compose one image ── */
function make({ w, h, ground, accent, motif, glowFrom, glowTo, seed = 1, depth = 0 }) {
  const gid = `g${seed}`, mid = `m${seed}`, nid = `n${seed}`, did = `d${seed}`;
  const m = motifs[motif](accent, mid);
  // `depth` bakes a bottom-anchored tonal wash into the artwork. Anything that
  // carries overlay text gets one, so white type never sits on a pale ground —
  // the CSS scrim alone cannot rescue an image that is light all the way down.
  const deep = depth > 0 ? `
    <linearGradient id="${did}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#1A1714" stop-opacity="${(0.62 * depth).toFixed(2)}"/>
      <stop offset="0.42" stop-color="#1A1714" stop-opacity="${(0.26 * depth).toFixed(2)}"/>
      <stop offset="1" stop-color="#1A1714" stop-opacity="${(0.06 * depth).toFixed(2)}"/>
    </linearGradient>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0.65" y2="1">
      <stop offset="0" stop-color="${glowFrom}"/><stop offset="1" stop-color="${glowTo}"/>
    </linearGradient>
    <radialGradient id="v${seed}" cx="0.5" cy="0.4" r="0.78">
      <stop offset="0.45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.16"/>
    </radialGradient>
    ${deep}${m.defs}${grain(nid)}
  </defs>
  <rect width="${w}" height="${h}" fill="${ground}"/>
  <rect width="${w}" height="${h}" fill="url(#${gid})"/>
  <rect width="${w}" height="${h}" fill="url(#${mid})"/>
  <rect width="${w}" height="${h}" fill="url(#v${seed})"/>
  <rect width="${w}" height="${h}" filter="url(#${nid})" fill="${ground}" opacity="0.4"/>
  ${depth > 0 ? `<rect width="${w}" height="${h}" fill="url(#${did})"/>` : ''}
</svg>`;
}

const PRODUCT = { w: 900, h: 1200 };
const products = [
  ['sherwani-mehr',       { ...PRODUCT, ground: P.alabaster, accent: P.indigo,    motif: 'zari',     glowFrom: '#F2F3F5', glowTo: '#D3D8DE' }],
  ['sherwani-mehr-alt',   { ...PRODUCT, ground: P.bone,      accent: P.indigoDeep,motif: 'khadi',    glowFrom: '#EFF1F3', glowTo: '#CFD6DD' }],
  ['sherwani-daraab',     { ...PRODUCT, ground: P.bone,      accent: P.henna,     motif: 'suzani',   glowFrom: '#F7F1E8', glowTo: '#E3D6C6' }],
  ['sherwani-daraab-alt', { ...PRODUCT, ground: P.alabaster, accent: P.hennaDeep, motif: 'butti',    glowFrom: '#FBF7F1', glowTo: '#E8DCCB' }],
  ['bandhgala-shahzada',  { ...PRODUCT, ground: P.clay,      accent: P.plum,      motif: 'jaali',    glowFrom: '#EFE3D6', glowTo: '#D8C2B6' }],
  ['bandhgala-shahzada-alt',{...PRODUCT, ground: P.bone,     accent: P.indigo,    motif: 'khadi',    glowFrom: '#EEF0F3', glowTo: '#CDD4DB' }],
  ['jacket-parvaaz',      { ...PRODUCT, ground: P.bone,      accent: P.indigo,    motif: 'kantha',   glowFrom: '#F1F2F4', glowTo: '#CFD5DC' }],
  ['jacket-parvaaz-alt',  { ...PRODUCT, ground: P.alabaster, accent: P.indigoDeep,motif: 'ikat',     glowFrom: '#F4F5F7', glowTo: '#D6DBE1' }],
  ['waistcoat-meher',     { ...PRODUCT, ground: P.bone,      accent: P.marigold,  motif: 'kantha',   glowFrom: '#FAF3E6', glowTo: '#E7D3B2' }],
  ['waistcoat-meher-alt', { ...PRODUCT, ground: P.clay,      accent: P.henna,     motif: 'zari',     glowFrom: '#F2E7DB', glowTo: '#DDC4B2' }],
  ['kurta-raahat',        { ...PRODUCT, ground: P.alabaster, accent: P.moss,      motif: 'khadi',    glowFrom: '#F4F5F0', glowTo: '#DCE0D4' }],
  ['kurta-raahat-alt',    { ...PRODUCT, ground: P.bone,      accent: P.moss,      motif: 'kantha',   glowFrom: '#F2F4EE', glowTo: '#D8DDCF' }],
  ['kurta-gulzar',        { ...PRODUCT, ground: P.clay,      accent: P.henna,     motif: 'ikat',     glowFrom: '#F3E7DA', glowTo: '#DEC3AE' }],
  ['kurta-gulzar-alt',    { ...PRODUCT, ground: P.bone,      accent: P.hennaDeep, motif: 'kantha',   glowFrom: '#F5EBE1', glowTo: '#E0CAB6' }],
  ['kurta-zafar',         { ...PRODUCT, ground: P.bone,      accent: P.marigold,  motif: 'zari',     glowFrom: '#FBF4E4', glowTo: '#E9D5AE' }],
  ['kurta-zafar-alt',     { ...PRODUCT, ground: P.alabaster, accent: P.marigold,  motif: 'butti',    glowFrom: '#FDF8EC', glowTo: '#EFDCBB' }],
  ['kurta-noor',          { ...PRODUCT, ground: P.alabaster, accent: P.plum,      motif: 'butti',    glowFrom: '#F7F1F3', glowTo: '#DCC9D0' }],
  ['kurta-noor-alt',      { ...PRODUCT, ground: P.bone,      accent: P.rose,      motif: 'suzani',   glowFrom: '#F8F0F0', glowTo: '#E0C7C9' }],
  ['stole-firdaus',       { ...PRODUCT, ground: P.alabaster, accent: P.moss,      motif: 'ikat',     glowFrom: '#F3F5F0', glowTo: '#D9DFD2' }],
  ['stole-firdaus-alt',   { ...PRODUCT, ground: P.bone,      accent: P.teal,      motif: 'khadi',    glowFrom: '#EFF3F2', glowTo: '#D3DDDA' }],
  ['dupatta-shabnam',     { ...PRODUCT, ground: P.alabaster, accent: P.teal,      motif: 'jaali',    glowFrom: '#F0F4F3', glowTo: '#D2DEDB' }],
  ['dupatta-shabnam-alt', { ...PRODUCT, ground: P.bone,      accent: P.teal,      motif: 'bandhani', glowFrom: '#EEF3F2', glowTo: '#CEDCD9' }],
  ['achkan-aftab',        { ...PRODUCT, ground: P.clay,      accent: P.hennaDeep, motif: 'jaali',    glowFrom: '#F1E5D8', glowTo: '#D9C0AC' }],
  ['achkan-aftab-alt',    { ...PRODUCT, ground: P.bone,      accent: P.marigold,  motif: 'bandhani', glowFrom: '#FAF3E5', glowTo: '#E6D2AF' }],
];

const wide = [
  ['hero-01',      { w: 2000, h: 1250, ground: P.clay,      accent: P.henna,      motif: 'suzani', glowFrom: '#EDE0D0', depth: 1, glowTo: '#6E5B49' }],
  ['hero-02',      { w: 2000, h: 1250, ground: P.bone,      accent: P.indigo,     motif: 'jaali',  glowFrom: '#E9EBEE', depth: 1, glowTo: '#4C5764' }],
  ['hero-03',      { w: 2000, h: 1250, ground: P.alabaster, accent: P.marigold,   motif: 'zari',   glowFrom: '#F8EFDD', depth: 1, glowTo: '#8A6E45' }],
  ['editorial-01', { w: 1600, h: 1200, ground: P.bone,      accent: P.hennaDeep,  motif: 'kantha', glowFrom: '#F3E9DC', depth: 0.45, glowTo: '#8E7561' }],
  ['editorial-02', { w: 1600, h: 1200, ground: P.alabaster, accent: P.moss,       motif: 'butti',  glowFrom: '#F1F3EC', depth: 0.45, glowTo: '#6E7763' }],
  ['editorial-03', { w: 1600, h: 1200, ground: P.clay,      accent: P.plum,       motif: 'ikat',   glowFrom: '#F0E5DC', depth: 0.45, glowTo: '#725A64' }],
  ['atelier',      { w: 1600, h: 1200, ground: P.bone,      accent: P.inkSoft,    motif: 'khadi',  glowFrom: '#F2EEE7', depth: 1, glowTo: '#7C7466' }],
];

const tiles = [
  ['cat-sherwani',    { w: 1000, h: 1250, ground: P.clay,      accent: P.henna,     motif: 'suzani'  , glowFrom: '#EFE1D2', depth: 0.9, glowTo: '#6B5544' }],
  ['cat-bandhgala',   { w: 1000, h: 1250, ground: P.alabaster, accent: P.indigo,    motif: 'khadi'   , glowFrom: '#EEF0F3', depth: 0.9, glowTo: '#4A5563' }],
  ['cat-kurta',       { w: 1000, h: 1250, ground: P.bone,      accent: P.marigold,  motif: 'zari'    , glowFrom: '#FAF2E1', depth: 0.9, glowTo: '#8A6C3C' }],
  ['cat-everyday',    { w: 1000, h: 1250, ground: P.bone,      accent: P.moss,      motif: 'kantha'  , glowFrom: '#F1F3EC', depth: 0.9, glowTo: '#646D57' }],
  ['cat-accessories', { w: 1000, h: 1250, ground: P.alabaster, accent: P.teal,      motif: 'bandhani', glowFrom: '#EDF2F1', depth: 0.9, glowTo: '#4E625E' }],
  ['cat-archive',     { w: 1000, h: 1250, ground: P.clay,      accent: P.plum,      motif: 'jaali'   , glowFrom: '#EFE6DF', depth: 0.9, glowTo: '#665059' }],
];

const squares = [
  ['journal-01', { w: 1200, h: 900, ground: P.bone,      accent: P.henna,    motif: 'butti',   glowFrom: '#F5ECE1', glowTo: '#CDB39C' }],
  ['journal-02', { w: 1200, h: 900, ground: P.alabaster, accent: P.indigo,   motif: 'ikat',    glowFrom: '#EFF1F4', glowTo: '#AEB8C4' }],
  ['journal-03', { w: 1200, h: 900, ground: P.clay,      accent: P.marigold, motif: 'suzani',  glowFrom: '#F4EADA', glowTo: '#CBB088' }],
  ['social-01',  { w: 900,  h: 900, ground: P.bone,      accent: P.henna,    motif: 'kantha',  glowFrom: '#F5ECE2', glowTo: '#D0B69F' }],
  ['social-02',  { w: 900,  h: 900, ground: P.alabaster, accent: P.marigold, motif: 'zari',    glowFrom: '#FAF3E4', glowTo: '#D9BE8D' }],
  ['social-03',  { w: 900,  h: 900, ground: P.clay,      accent: P.indigo,   motif: 'jaali',   glowFrom: '#EBEDF0', glowTo: '#A9B4C0' }],
  ['social-04',  { w: 900,  h: 900, ground: P.bone,      accent: P.moss,     motif: 'khadi',   glowFrom: '#F1F3ED', glowTo: '#BCC4B0' }],
  ['social-05',  { w: 900,  h: 900, ground: P.alabaster, accent: P.plum,     motif: 'bandhani',glowFrom: '#F6F0F2', glowTo: '#C9B2BB' }],
  ['social-06',  { w: 900,  h: 900, ground: P.bone,      accent: P.teal,     motif: 'ikat',    glowFrom: '#EEF3F2', glowTo: '#AFC3BF' }],
];

let n = 0, count = 0;
for (const group of [products, wide, tiles, squares]) {
  for (const [name, cfg] of group) {
    writeFileSync(new URL(`${name}.svg`, OUT), make({ ...cfg, seed: ++n }));
    count++;
  }
}

// Favicon + wordmark seal
writeFileSync(new URL('../favicon.svg', OUT), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${P.ink}"/><text x="32" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="34" fill="${P.bone}">R</text></svg>`);

console.log(`Generated ${count} artwork files + favicon into public/img/`);
