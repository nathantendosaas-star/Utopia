import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          if (!file.includes('node_modules') && !file.includes('.git')) {
            results = results.concat(walk(fullPath));
          }
        } else {
          results.push(fullPath);
        }
      } catch (e) {}
    });
  } catch (e) {}
  return results;
}

console.log(JSON.stringify(walk('.'), null, 2));
