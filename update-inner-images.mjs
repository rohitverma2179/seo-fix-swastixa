import fs from 'fs';

const filePath = 'e:\\next-swastixa\\src\\data\\blogs.js';
let content = fs.readFileSync(filePath, 'utf8');

const imageMap = {
  "blog1-1.jpg": "digital-marketing-goals.jpg",
  "blog1-2.jpg": "digital-marketing-plan.jpg",
  "blog1-3.jpg": "digital-marketing-tracking.jpg",
  "blog2-1.jpg": "digital-transformation-media.jpg",
  "blog2-2.jpg": "digital-transformation-roadmap.jpg",
  "blog2-3.jpg": "digital-transformation-tracking.jpg",
  "blog3-1.jpg": "social-media-content.jpg",
  "blog3-2.jpg": "social-media-emoji.jpg",
  "blog3-3.jpg": "social-media-planning.jpg",
  "blog4-1.jpg": "on-page-seo.jpg",
  "blog4-2.jpg": "on-page-work.jpg",
  "blog5-1.jpg": "high-converting-layout.jpg",
  "blog5-2.jpg": "high-converting-wireframe.jpg",
  "blog6-1.jpg": "seo-sco-business.jpg",
  "blog6-2.jpg": "seo-sco-content.jpg",
  "blog7.jpg": "google-ads-meta-ads.jpg",
  "blog8-1.jpg": "local-seo-guide.jpg",
  "blog8-2.jpg": "local-seo-service.jpg",
  "blog9-1.jpg": "explainer-videos-reels.jpg",
  "blog9-2.jpg": "explainer-videos-swastixa.jpg",
  "blog10-1.jpg": "data-driven-brands.jfif",
  "blog10-2.JPG": "data-driven-marketing.jpg",
  "blog11-1.jpg": "paid-ads-businesses.jpg",
  "blog11-2.jpg": "paid-ads-mistakes.jpg",
  "blog12-1.jpg": "website-design-killing.jpg",
  "blog12-2.jpg": "website-design-swastixa.jpg",
  "blog13.1.jpg": "content-calendar-framework.jpg",
  "blog13.2.jpg": "content-calendar-template.jpg",
  "blog14-1.jpg": "retargeting-ads-guide.jpg",
  "blog14-2.jpg": "retargeting-ads-visitors.jpg",
  "blog15-1.jpg": "in-house-content.jfif",
  "blog15-2.JPG": "in-house-production.jpg",
  "blog16-1.jpg": "how-graphic-builds.jpg",
  "blog16-2.jpg": "how-graphic-design.jpg",
  "blog17-1.jpg": "build-your-builds.jpg",
  "blog17-2.jpg": "build-your-instagram.jpg",
  "blog18-1.jpg": "choose-swastixa-digital.jpg",
  "blog19-1.jpg": "full-stack-digital.jpg",
  "blog19-2.jpg": "full-stack-marketing.jpg",
  "blog20-1.jpg": "swastixa-client-blueprint.jpg",
  "blog20-2.jpg": "swastixa-client-success.jpg"
};

const baseUrl = "https://pub-6aea620a48a5427f992db658caf5fb4a.r2.dev/swastixablog/swastixa-inner-blog/inner-blog/";

let replaceCount = 0;

for (const [oldName, newName] of Object.entries(imageMap)) {
  const targetStr = baseUrl + oldName;
  const replacementStr = baseUrl + newName;
  
  if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    replaceCount++;
  } else {
    console.warn(`Could not find: ${targetStr}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Replaced ${replaceCount} images successfully.`);
