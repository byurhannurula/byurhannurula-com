// Warns on transitions of layout properties in class lists (DESIGN.md >
// Motion): they relayout every frame, and wrapping items jump between lines.
// A warning for now: it exits 0. Use FLIP (translate) instead.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const LAYOUT_PROPS = new Set([
  'margin',
  'padding',
  'max-width',
  'width',
  'height',
]);
const TRANSITION = /transition-\[([^\]]+)\]/g;

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (path.endsWith('.tsx')) yield path;
  }
}

let count = 0;
for (const file of files('src')) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const match of line.matchAll(TRANSITION)) {
      const layout = match[1]
        .split(',')
        .filter((prop) => LAYOUT_PROPS.has(prop));
      if (!layout.length) continue;
      count++;
      console.warn(
        `${file}:${index + 1}  ${match[0]}  (animates ${layout.join(', ')})`,
      );
    }
  });
}
console.warn(
  count
    ? `\n${count} layout transition(s). See DESIGN.md > Motion.`
    : 'No layout transitions.',
);
