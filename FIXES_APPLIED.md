# Swastixa — SEO fixes applied (FIXES_APPLIED)

Yeh file batati hai ki `Swastixa_Technical_SEO_Audit.docx` ke kaun-kaun se findings code
mein fix kiye gaye hain, kis file mein, aur kya abhi bhi baaki hai.

**Verification jo is sandbox mein chali:** `npx tsc --noEmit` clean, `node scripts/check-alt.mjs`
pe 0 errors, aur saare JSON-LD builders compile karke validate kiye (8 nodes, valid JSON).
`next build` yahan poori nahi chali kyunki sandbox mein 2 GB RAM hai aur Tailwind v4 ka
WASM step OOM ho jata hai — yeh environment ki limit hai, code ki nahi. Apni machine pe
`npm install && npm run build` chala kar confirm kar lena.

---

## Fixed — findings register ke hisaab se

| ID | Kya galat tha | Ab kya kiya | File(s) |
|----|----------------|-------------|---------|
| F-01 | Homepage pe 4 H1 | Hero ekmatra H1 (keyword ke saath), baaki teen H2 | `src/components/home/Hero.tsx`, `HeroSecond.tsx`, `HomeAbout.tsx`, `EndToEndExcellence.tsx` |
| F-02 | /services pe 2 H1 | H1 = "Digital Marketing Services for Growing Brands", "What we do" → H2 | `src/views/Services.tsx` |
| F-03 | Service pages pe H2 pehle, H1 baad mein | Bada heading ab H1 hai + "in Gurugram", tagline H2 | 8 × `src/components/*/ExcellenceHero.tsx` |
| F-04 | /awards, /privacy-policy, /work, /work/digital-marketing, /work/website-development pe H1 nahi | Sab pe ek-ek H1 add | `AwardList.tsx`, `views/PrivacyPolicy.tsx`, `views/Work.tsx`, `work/DigitalMarketing.tsx`, `work/WebsiteDevelopment.tsx` |
| F-05 | Apache har missing URL pe 200 (soft 404) | Rule 3 hata diya, `ErrorDocument 404 /404.html`, asli 404 | `.htaccess` |
| F-06 | Nav buttons JS-only, footer me duplicate link, 4 orphan pages | Nav items `<Link to>` (crawlable), 4-column `SiteFooter` layout me mount, "Terms" ab `/privacy-policy#terms` | `Header.tsx`, `Contact.tsx`, `app/layout.tsx`, `SiteFooter.tsx`, `PrivacyPolicy.tsx` |
| F-07 | Organization / LocalBusiness schema nahi | Ek `@graph` (Organization + WebSite) root layout me | `app/layout.tsx`, `src/lib/schema.ts`, `src/lib/site.ts` |
| F-08 | title.template nahi, brand 26 jagah hand-typed | `title.template = "%s | Swastixa"` + `stripBrand()` + bare titles | `app/layout.tsx`, `src/lib/seo.ts`, `src/data/seoData.ts` |
| F-09 | og:image 192×192 favicon | Asli `public/og/swastixa-og-default.jpg` (1200×630, 54 KB) generate kiya, width/height/alt ke saath | `public/og/`, `src/lib/seo.ts` |
| F-10 | Blog pe `type: website`, dates/authors nahi | `type: article` + publishedTime, modifiedTime, authors, section, tags + `blogDates` map | `src/lib/seo.ts`, `src/data/blogDates.ts` |
| F-11 | 8 descriptions 120–160 se bahar | Saari 26 descriptions 140–155 chars mein rewrite | `src/data/seoData.ts` |
| F-12 | Sitemap me 4 pages missing, `new Date()` har build pe | 26 static + 21 posts = 47 URLs, per-URL date map, slug de-dup | `app/sitemap.ts` |
| F-13 | 47 images pe width/height nahi | Hero, case studies, portfolio, logo — sab pe dimensions | kai components |
| F-14 | Hero images lazy (LCP late) | Hero pe `loading="eager" fetchPriority="high" decoding="sync"` | 8 × ExcellenceHero, Header logo |
| F-15 | 12 generic alts ("Team Meeting", "Logo", "Awards_img", "Video Poster") | Sab descriptive aur unique; empty alt bhi bhar diya | 8 heroes, Header, Awa, VideoPlayer, HomeAbout, ContentRenderer, Logo |
| F-17 | robots.ts sirf allow-all | Targeted disallow + sitemap + host + AI bots rules | `app/robots.ts` |
| F-18 | Service / BlogPosting / Breadcrumb schema nahi | Har service page pe Service + ProfessionalService + Breadcrumb, har post pe BlogPosting + Breadcrumb, work pages pe Breadcrumb | `app/services/*`, `app/work/*`, `app/blog/[slug]` |
| F-21 | /work pe khaali main (0 H1, 0 content, 0 link) | Naya crawlable work index (H1 + 8 cards + copy); website-development stub bhi asli page ban gaya | `src/views/Work.tsx`, `src/components/work/WebsiteDevelopment.tsx` |
| F-22 | manifest, theme-color, lang region, max-image-preview nahi | `lang="en-IN"`, `themeColor`, `site.webmanifest`, `max-image-preview: large` | `app/layout.tsx`, `public/site.webmanifest` |
| F-23 | blogs.ts me duplicate slug ka risk | Sitemap me slug de-dup | `app/sitemap.ts` |
| — | 404 page client component tha (metadata nahi) | Server component + `robots: noindex` + 3 recovery links | `app/not-found.tsx` |
| — | Alt-text regression ka koi gate nahi | `scripts/check-alt.mjs` + `npm run check:alt` + `predeploy` | `scripts/`, `package.json` |

## Abhi baaki (jaan-boojh kar chhoda)

1. **F-16 — CSS background heroes** (Contact, real-estate AboutSection/HeroSecond/TrustSection).
   Inhe `<img>` me badalne se layout badal sakta hai; visual QA ke bina risk nahi liya.
   Agar inme se koi LCP element hai to us section ko `<img priority>` banao.
2. **F-19 — Video SEO ka bacha hua hissa.** Poster attribute aur schema helper ready hain
   (`videoSchema`), par har reel ka asli `uploadDate`, `duration` aur thumbnail data
   `src/data/reelsData.ts` se bharna hoga; `.vtt` captions bhi content team banayegi.
3. **F-20 — JavaScript weight.** 154 client components ko todna bada refactor hai; isme
   animation tootne ka risk hai, isliye ise alag task rakha hai.
4. **`blogDates.ts` khaali hai** — 21 posts ki asli publish/update dates CMS ya Search
   Console se bharo. Guess mat karo; date na ho to schema se field nikal jata hai.
5. **`src/lib/site.ts` ke TODO** — street address, postal code, phone, geo coordinates
   Google Business Profile se exact copy karo.
6. **47 checker warnings** — team/PDF card images pe width/height baaki hain (cosmetic CLS).

## Naye files

```
src/lib/site.ts                    site constants (NAP, socials, areaServed)
src/lib/schema.ts                  8 JSON-LD builders + graph()
src/components/seo/JsonLd.tsx      escaped JSON-LD server component
src/components/seo/SmartImage.tsx  img wrapper (alt/width/height/priority enforced)
src/components/common/SiteFooter.tsx  4-column crawlable footer
src/data/blogDates.ts              publishedAt/updatedAt map (bharna hai)
scripts/check-alt.mjs              alt-text CI gate
public/og/swastixa-og-default.jpg  1200×630 social card
public/site.webmanifest            PWA manifest
```

## Deploy ke baad yeh chalao

```bash
npm install
npm run build          # ya: npm run predeploy (alt gate + build)
node scripts/check-alt.mjs
curl -s -o /dev/null -w "%{http_code}\n" https://swastixa.com/nahi-hai-ye  # 404
curl -s https://swastixa.com/sitemap.xml | grep -c "<url>"                 # 47
```
