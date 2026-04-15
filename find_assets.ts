import fs from 'fs';
import path from 'path';

const filenames = [
  'input_file_0.mp4',
  'input_file_0.png',
  'input_file_1.png',
  'input_file_2.png',
  'input_file_3.png',
  'input_file_4.png',
];

function search(dir: string, depth: number = 0) {
  if (depth > 5) return;
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      if (filenames.includes(file)) {
        console.log(`FOUND: ${fullPath}`);
      }
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
          search(fullPath, depth + 1);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

console.log('Searching in /app/applet...');
search('/app/applet');
console.log('Searching in /...');
search('/');
