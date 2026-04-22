import fs from 'fs';
import path from 'path';

function walk(dir: string, depth: number = 0) {
  if (depth > 3) return []; // Limit depth
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(walk(fullPath, depth + 1));
        } else {
          if (file.includes('input_file')) {
            results.push(fullPath);
          }
        }
      } catch (e) {}
    });
  } catch (e) {}
  return results;
}

console.log(walk('/'));
