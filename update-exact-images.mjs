import fs from 'fs';

const filePath = 'e:\\next-swastixa\\src\\data\\blogs.js';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

const updates = {
  605: "digital-marketing.jpg",
  1340: "digital-transformation.jpg",
  2159: "social-media.jpg",
  3409: "on-page.jpg",
  4248: "high-converting.jpg",
  5117: "seo-sco.jpg",
  6266: "google-meta.jpg",
  7114: "local-seo.jpg",
  8338: "explainer-videos.jpg",
  9333: "data-driven.jpg",
  10303: "paid-ads.jpg",
  10840: "website-design.jpg",
  11520: "content-calendar.jpg",
  12148: "retargeting-ads.jpg",
  12784: "in-house.jpg",
  13383: "how-graphic.jpg",
  14018: "build-your.jpg",
  14635: "choose.jpg",
  15244: "full-stack.jpg",
  15875: "swastixa-client.jpg"
};

const baseUrl = "https://pub-6aea620a48a5427f992db658caf5fb4a.r2.dev/swastixablog/";

for (const [lineNum, imgName] of Object.entries(updates)) {
  const index = parseInt(lineNum) - 1;
  const oldLine = lines[index];
  lines[index] = oldLine.replace(/"https:\/\/[^"]+"/, `"${baseUrl}${imgName}"`);
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Done replacing exactly on lines.');
