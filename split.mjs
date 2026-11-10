import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';

const projectRoot = process.cwd();
const viewFiles = globSync('src/views/*.jsx', { cwd: projectRoot, absolute: true });

const preserveImports = ['ExcellenceHero', 'WorkHero', 'Hero', 'LightRays', 'CardSwap', 'React'];

let modifiedCount = 0;

for (const file of viewFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;

    // Replace static imports
    content = content.replace(/^import\s+([A-Za-z0-9_]+)\s+from\s+['"]([^'"]+)['"];?/gm, (match, componentName, importPath) => {
        if (preserveImports.includes(componentName)) {
            return match; // preserve
        }
        
        // Ensure it's a relative import (component)
        if (importPath.startsWith('../') || importPath.startsWith('./')) {
            modified = true;
            return `const ${componentName} = dynamic(() => import('${importPath}'));`;
        }
        return match;
    });

    if (modified) {
        if (!content.includes('import dynamic from')) {
            // Find the first import statement and prepend it there
            content = content.replace(/^(import|const|let|var)\s/m, "import dynamic from 'next/dynamic';\n$&");
        }
        fs.writeFileSync(file, content);
        modifiedCount++;
    }
}

console.log(`Applied code splitting to ${modifiedCount} files.`);
