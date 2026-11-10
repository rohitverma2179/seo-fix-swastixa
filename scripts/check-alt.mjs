#!/usr/bin/env node
// scripts/check-alt.mjs
// CI gate for the alt-text rule. Fails the build when an image has no alt,
// an empty alt on a content image, a generic alt, or no width/height.
//
// Usage:  node scripts/check-alt.mjs          (report + exit 1 on errors)
//         node scripts/check-alt.mjs --warn   (report only, never fails)

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

/** Recursive .tsx finder (fs.globSync needs Node 22+). */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const WARN_ONLY = process.argv.includes("--warn");

const GENERIC = new Set([
  "image", "img", "photo", "picture", "banner", "logo", "icon",
  "team meeting", "awards_img", "video poster", "project image",
  "content image", "document preview", "preview", "client-logo",
]);

const files = [...walk("app"), ...walk("src")];

const errors = [];
const warnings = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    // skip comments — JSX comments and line comments are not rendered markup
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;
    if (!/<img\b|<Image\b/.test(line)) return;

    // Grab the whole tag, which may span lines.
    const start = i;
    let tag = line;
    let end = i;
    while (!tag.includes(">") && end < lines.length - 1) {
      end += 1;
      tag += " " + lines[end];
    }
    const where = `${file}:${start + 1}`;
    const altMatch = tag.match(/alt\s*=\s*(?:"([^"]*)"|\{([^}]*)\})/);

    if (!altMatch) {
      errors.push(`${where}  missing alt attribute`);
    } else if (altMatch[1] !== undefined) {
      // alt="literal string"
      const value = altMatch[1].trim();
      if (value === "") {
        warnings.push(`${where}  alt="" — OK only if the image is purely decorative`);
      } else if (GENERIC.has(value.toLowerCase())) {
        errors.push(`${where}  generic alt "${value}" — describe the image instead`);
      } else if (value.length > 125) {
        warnings.push(`${where}  alt is ${value.length} chars (aim <= 125)`);
      }
    } else {
      // alt={expression}
      const expr = (altMatch[2] || "").trim();
      if (/^["'`]\s*["'`]$/.test(expr)) {
        warnings.push(`${where}  alt={\"\"} — OK only if the image is purely decorative`);
      } else if (/^(title|item\.title|blog\.title|card\.title|alt)$/.test(expr)) {
        warnings.push(`${where}  alt={${expr}} — confirm the data value is descriptive, not a label`);
      }
    }

    if (!/\bwidth\b/.test(tag) && !/\bwidth=/.test(tag)) {
      warnings.push(`${where}  no width — causes layout shift (CLS)`);
    }
    if (!/\bheight\b/.test(tag) && !/\bheight=/.test(tag)) {
      warnings.push(`${where}  no height — causes layout shift (CLS)`);
    }
  });
}

const report = (label, list) => {
  if (!list.length) return;
  console.log(`\n${label} (${list.length})`);
  for (const item of list) console.log("  " + item);
};

report("ERRORS", errors);
report("WARNINGS", warnings);

if (!errors.length && !warnings.length) {
  console.log(`Alt-text check passed across ${files.length} files.`);
}

if (errors.length && !WARN_ONLY) {
  console.error(`\n${errors.length} alt-text error(s). Fix them or run with --warn.`);
  process.exit(1);
}
