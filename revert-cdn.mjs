import fs from 'fs';
import { globSync } from 'glob';

const projectRoot = process.cwd();
const files = globSync(['src/**/*.{js,jsx,ts,tsx,json,css}', 'app/**/*.{js,jsx,ts,tsx,json,css}'], { cwd: projectRoot, absolute: true });

let r2Count = 0;
const domainsToRevert = ['https://cdn.swastixa.com' ];
const primaryR2 = 'https://pub-6aea620a48a5427f992db658caf5fb4a.r2.dev';
const secondaryR2 = 'https://pub-9cfa6415ad044bcc8f009cfb63bc9ff9.r2.dev';

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let modified = false;
    for (const domain of domainsToRevert) {
        if (content.includes(domain)) {
            // Restore blog1, Swastixa - WORK, and Swastixa - HOME assets to secondary R2 bucket
            content = content.replaceAll(`${domain}/blog1/`, `${secondaryR2}/blog1/`);
            content = content.replaceAll(`${domain}/Swastixa%20-%20WORK/`, `${secondaryR2}/Swastixa%20-%20WORK/`);
            content = content.replaceAll(`${domain}/Swastixa%20-%20HOME/`, `${secondaryR2}/Swastixa%20-%20HOME/`);
            content = content.replaceAll(domain, primaryR2);
            modified = true;
        }
    }
    if (modified) {
        fs.writeFileSync(file, content, 'utf-8');
        r2Count++;
    }
}
console.log(`Reverted CDN URLs to respective R2 buckets in ${r2Count} files.`);