import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('i:/math notes/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Fix escaped backticks
  content = content.replace(/\\`/g, '`');
  // Fix escaped dollars
  content = content.replace(/\\\$/g, '$');
  // Fix double backslashes which were intended as single backslash for MathRenderer
  // But wait! Did I write \\\\sum?
  // Let's just fix \` and \$ first.
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Done fixing backslashes.');
