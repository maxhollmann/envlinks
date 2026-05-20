#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const env = {};
for (const [k, v] of Object.entries(process.env)) {
  if (k.startsWith('LINKS_') || k.startsWith('LINK_')) env[k] = v;
}

const out = process.argv[2] || path.join(__dirname, '..', 'public', 'config.js');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `window.env = ${JSON.stringify(env)};\n`);
