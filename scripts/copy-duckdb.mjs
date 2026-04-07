import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const copies = [
  {
    src: join(root, 'node_modules/sql.js/dist'),
    dest: join(root, 'public/sqljs'),
    files: ['sql-wasm.js', 'sql-wasm.wasm'],
  },
];

for (const { src, dest, files } of copies) {
  mkdirSync(dest, { recursive: true });
  for (const file of files) {
    const destPath = join(dest, file);
    if (existsSync(destPath)) continue;
    copyFileSync(join(src, file), destPath);
    console.log(`copied ${file} → public/${dest.split('public/')[1]}/`);
  }
}
