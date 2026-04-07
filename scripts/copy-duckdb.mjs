import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const src = join(root, 'node_modules/@duckdb/duckdb-wasm/dist');
const dest = join(root, 'public/duckdb');

const files = [
  'duckdb-mvp.wasm',
  'duckdb-eh.wasm',
  'duckdb-browser-mvp.worker.js',
  'duckdb-browser-eh.worker.js',
];

mkdirSync(dest, { recursive: true });

for (const file of files) {
  const srcPath = join(src, file);
  const destPath = join(dest, file);
  if (existsSync(destPath)) continue; // skip if already copied
  copyFileSync(srcPath, destPath);
  console.log(`copied ${file}`);
}
