// import fs from 'fs';
// import path from 'path';
// import { globSync } from 'glob';

// // --- Configuration ---
// const projectRoot = process.cwd();
// console.log(`Starting optimizations in ${projectRoot}`);

// // 3. Global Find & Replace R2 URLs
// const filesToReplaceR2 = globSync(['src/**/*.js', 'src/**/*.jsx', 'app/**/*.js', 'app/**/*.jsx'], { cwd: projectRoot, absolute: true });
// let r2Count = 0;
// for (const file of filesToReplaceR2) {
//     let content = fs.readFileSync(file, 'utf-8');
//     if (content.includes('https://pub-6aea620a48a5427f992db658caf5fb4a.r2.dev')) {
//         content = content.replace(/https:\/\/pub-6aea620a48a5427f992db658caf5fb4a\.r2\.dev/g, 'https://cdn.swastixa.com');
//         fs.writeFileSync(file, content);
//         r2Count++;
//     }
// }
// console.log(`Replaced R2 URLs in ${r2Count} files.`);

// // 5. Image Optimization (loading="lazy" decoding="async")
// // We will look for <img ... > tags without loading attribute
// const imgFiles = globSync(['src/**/*.jsx', 'src/**/*.js', 'app/**/*.jsx', 'app/**/*.js'], { cwd: projectRoot, absolute: true });
// let imgCount = 0;
// for (const file of imgFiles) {
//     let content = fs.readFileSync(file, 'utf-8');
//     let modified = false;
    
//     // Find all <img tags. We will use a regex replace function to check if loading exists.
//     content = content.replace(/<img\s([^>]+)>/gi, (match, attrs) => {
//         if (!attrs.includes('loading=') && !attrs.includes('fetchPriority=')) {
//             modified = true;
//             return `<img loading="lazy" decoding="async" ${attrs}>`;
//         }
//         return match;
//     });

//     // Also remove aos library usage from specific files
//     if (file.endsWith('Print.jsx') || file.endsWith('BlogCard.jsx') || file.endsWith('caseStudies.jsx') || file.endsWith('servicecards.jsx')) {
//         if (content.includes('data-aos')) {
//             content = content.replace(/\sdata-aos="[^"]*"/g, '');
//             content = content.replace(/\sdata-aos-duration="[^"]*"/g, '');
//             content = content.replace(/\sdata-aos-delay="[^"]*"/g, '');
//             modified = true;
//             console.log(`Removed data-aos from ${path.basename(file)}`);
//         }
//     }

//     if (modified) {
//         fs.writeFileSync(file, content);
//         imgCount++;
//     }
// }
// console.log(`Updated images/AOS in ${imgCount} files.`);

// console.log("Done running simple optimizations.");




import fs from "fs";
import path from "path";
import { globSync } from "glob";

// ----------------------------------------
// Configuration
// ----------------------------------------

const projectRoot = process.cwd();

console.log(`Starting optimizations in ${projectRoot}`);

// ----------------------------------------
// 1. R2 URL Replacement
// ----------------------------------------

// OLD R2 domains mapped to custom CDN
const oldR2Domains = [
  "https://pub-6aea620a48a5427f992db658caf5fb4a.r2.dev",
  "https://pub-9cfa6415ad044bcc8f009cfb63bc9ff9.r2.dev",
  "https://cdn.swastixa.com", // currently returning 404 — replace with working R2
];


// CURRENT TESTING/PRODUCTION CDN DOMAIN
// Switch back to "https://cdn.swastixa.com" once CDN is properly configured in Cloudflare
const newCdnDomain = process.env.CDN_DOMAIN || "https://cdn.swastixa.com";

// Search JS / JSX / TS / TSX / JSON / CSS files
const filesToReplaceR2 = globSync(
  [
    "src/**/*.{js,jsx,ts,tsx,json,css}",
    "app/**/*.{js,jsx,ts,tsx,json,css}",
  ],
  {
    cwd: projectRoot,
    absolute: true,
  }
);

let r2Count = 0;
let r2ReferenceCount = 0;

for (const file of filesToReplaceR2) {
  let content = fs.readFileSync(file, "utf-8");
  const originalContent = content;

  for (const oldDomain of oldR2Domains) {
    if (oldDomain === newCdnDomain) continue;

    const matches = content.split(oldDomain).length - 1;

    if (matches > 0) {
      r2ReferenceCount += matches;
      content = content.split(oldDomain).join(newCdnDomain);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf-8");
    r2Count++;

    console.log(`R2 URLs updated: ${path.relative(projectRoot, file)}`);
  }
}

console.log("");
console.log(`R2 files updated: ${r2Count}`);
console.log(`R2 references replaced: ${r2ReferenceCount}`);

// ----------------------------------------
// 2. Image Optimization
// ----------------------------------------

const imgFiles = globSync(
  [
    "src/**/*.jsx",
    "src/**/*.js",
    "src/**/*.tsx",
    "src/**/*.ts",
    "app/**/*.jsx",
    "app/**/*.js",
    "app/**/*.tsx",
    "app/**/*.ts",
  ],
  {
    cwd: projectRoot,
    absolute: true,
  }
);

let imgCount = 0;

for (const file of imgFiles) {
  let content = fs.readFileSync(file, "utf-8");
  const originalContent = content;

  // Add lazy loading + async decoding
  content = content.replace(/<img\s([^>]+)>/gi, (match, attrs) => {
    const hasLoading = /\bloading\s*=/.test(attrs);
    const hasFetchPriority = /\bfetchPriority\s*=/.test(attrs);

    if (!hasLoading && !hasFetchPriority) {
      return `<img loading="lazy" decoding="async" ${attrs}>`;
    }

    return match;
  });

  // ----------------------------------------
  // Remove AOS from selected files
  // ----------------------------------------

  const fileName = path.basename(file);

  const aosFiles = [
    "Print.jsx",
    "BlogCard.jsx",
    "caseStudies.jsx",
    "servicecards.jsx",
  ];

  if (aosFiles.includes(fileName)) {
    content = content.replace(/\sdata-aos="[^"]*"/g, "");
    content = content.replace(/\sdata-aos-duration="[^"]*"/g, "");
    content = content.replace(/\sdata-aos-delay="[^"]*"/g, "");
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf-8");
    imgCount++;

    console.log(`Image/AOS optimized: ${path.relative(projectRoot, file)}`);
  }
}

console.log("");
console.log(`Updated images/AOS in ${imgCount} files.`);

console.log("");
console.log("========================================");
console.log("Optimization completed successfully.");
console.log("========================================");
console.log(`CDN Domain: ${newCdnDomain}`);