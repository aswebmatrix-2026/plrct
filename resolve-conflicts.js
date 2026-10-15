const fs = require('fs');
const path = require('path');

const side = process.argv[2] || 'theirs'; // 'ours' = HEAD wala, 'theirs' = niche wala (incoming)
const exts = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.mjs'];
const skip = ['node_modules', '.next', '.git'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (exts.includes(path.extname(e.name)) && e.name !== 'resolve-conflicts.js') out.push(p);
  }
  return out;
}

const fixed = [], broken = [];
for (const f of walk('.')) {
  const txt = fs.readFileSync(f, 'utf8');
  if (!/^<<<<<<<( |$)/m.test(txt) || !/^>>>>>>>( |$)/m.test(txt)) continue;

  const eol = txt.includes('\r\n') ? '\r\n' : '\n';
  const out = [];
  let state = 0; // 0 normal, 1 ours, 2 theirs

  for (const line of txt.split(/\r?\n/)) {
    if (state === 0 && /^<<<<<<<( |$)/.test(line)) { state = 1; continue; }
    if (state === 1 && line.trimEnd() === '=======') { state = 2; continue; }
    if (state === 2 && /^>>>>>>>( |$)/.test(line)) { state = 0; continue; }
    if (state === 0 || (state === 1 && side === 'ours') || (state === 2 && side === 'theirs')) out.push(line);
  }

  if (state !== 0) { broken.push(f); continue; }
  fs.writeFileSync(f, out.join(eol), 'utf8');
  fixed.push(f);
}

console.log('Fixed (' + fixed.length + '):'); fixed.forEach(f => console.log('  ' + f));
if (broken.length) { console.log('\nManual check needed:'); broken.forEach(f => console.log('  ' + f)); }