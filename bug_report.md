# 🐛 PhotoGenie — Bug Report

## Severity Levels
- 🔴 **CRITICAL** — Security vulnerability / data loss
- 🟠 **HIGH** — Major functional bug
- 🟡 **MEDIUM** — Logic flaw or incorrect behavior
- 🟢 **LOW** — Minor issue / code quality

---

## 🔴 BUG 1 — Login Function Has No try/catch (Unhandled Crash)

**File:** [`auth.controller.ts` Line 168–252](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/auth.controller.ts#L168-L252)

`login()` function mein **koi bhi try/catch nahi hai**. Agar database down ho ya Redis fail kare toh ye function unhandled exception throw karega aur server crash ho sakta hai.

```typescript
// BUG: No try/catch — entire function is exposed
export async function login(req: Request, res: Response): Promise<Response> {
  const body = loginSchema.parse(req.body);   // Can throw ZodError → uncaught
  const user = await prisma.user.findFirst(…); // Can throw DB error → uncaught
  const attemptsCountStr = await redis.get(…); // Can throw Redis error → uncaught
  …
}
```

**Fix:** Poore `login()` body ko `try/catch` mein wrap karo, jaisa `register()` mein kiya gaya hai.

---

## 🔴 BUG 2 — Hardcoded Reset Password URL (Production Break)

**File:** [`auth.controller.ts` Line 509](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/auth.controller.ts#L509)

Password reset email mein URL hardcoded `localhost:3000` hai. Production mein yeh galat link jayega.

```typescript
// BUG: Hardcoded localhost URL — breaks in production
const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
```

**Fix:**
```typescript
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
```

---

## 🔴 BUG 3 — setup2FA Stores Secret BEFORE Verification

**File:** [`auth.controller.ts` Line 353–358](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/auth.controller.ts#L353-L358)

`setup2FA()` immediately `totpSecret` aur `backupCodes` database mein save kar deta hai **bina user ke verify kiye**. Agar user TOTP QR scan nahi karta, toh unverified secrets database mein reh jate hain.

```typescript
// BUG: Secret saved immediately — not verified by user first
await prisma.user.update({
  where: { id: user.id },
  data: {
    totpSecret: secret,          // Stored before user confirms
    totpBackupCodes: backupCodes, // Stored before user confirms
  },
});
```

**Fix:** `totpSecret` ko temporarily Redis mein store karo with TTL. Tabhi DB mein save karo jab user pehli baar code verify kare.

---

## 🔴 BUG 4 — `/api/v1/leads` Routes Are Completely Unprotected

**File:** [`app.ts` Line 117](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/app.ts#L117) & [`leads.routes.ts` Line 19](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/leads/leads.routes.ts#L19)

`app.ts` mein `/api/v1/leads` ko **koi bhi global auth middleware nahi** lagaya gaya. Route file mein `router.use(authMiddleware)` hai lekin public quote route (`/quote`) galti se bina auth ke accessible hai — **upar se `authMiddleware` bhi `app.ts` se missing hai**, toh attacker directly `GET /api/v1/leads` hit kar sakta hai agar router-level middleware skip ho jaye.

```typescript
// app.ts — NO authMiddleware for leads!
app.use('/api/v1/events', authMiddleware, eventsRoutes);  // ✅ Protected
app.use('/api/v1/leads', leadsRoutes);                    // ❌ Not protected at app level
```

**Fix:**
```typescript
app.use('/api/v1/leads', authMiddleware, leadsRoutes);
```
(Leads router ke andar guest route ko `router.use(authMiddleware)` se pehle define karo — already kiya gaya hai, just app-level protect missing hai.)

---

## 🔴 BUG 5 — Duplicate Route Mounts (culling, editing, reels)

**File:** [`app.ts` Lines 119–123](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/../app.ts#L119-L123)

Same routes **do baar mount** ho rahi hain — ek `/api/v1/` par aur ek `/api/` par. Isse requests dono versions se match karegi, authorization bypass ho sakta hai agar ek path pe middleware miss ho.

```typescript
app.use('/api/v1/culling', cullingRoutes);
app.use('/api/culling', cullingRoutes);    // ❌ Duplicate — /api/culling has no version check
app.use('/api/v1/editing', editingRoutes);
app.use('/api/editing', editingRoutes);    // ❌ Duplicate
app.use('/api/v1/reels', reelsRoutes);
app.use('/api/reels', reelsRoutes);        // ❌ Duplicate
```

**Fix:** Sirf `/api/v1/` prefix use karo. `/api/` (without version) wale mounts remove karo.

---

## 🟠 BUG 6 — refresh() aur resetPassword() Have No try/catch

**File:** [`auth.controller.ts` Line 256](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/auth.controller.ts#L256)

`refresh()` aur `resetPassword()` functions mein bhi koi error handling nahi — DB error directly crash karayega.

```typescript
export async function refresh(req: Request, res: Response): Promise<Response> {
  const body = refreshSchema.parse(req.body); // ZodError uncaught
  const storedToken = await prisma.refreshToken.findUnique(…); // DB error uncaught
  …
}
```

---

## 🟠 BUG 7 — Race Condition in `generateUniqueSlug()`

**File:** [`events.service.ts` Line 14–30](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/events/events.service.ts#L14-L30)

`generateUniqueSlug()` pehle `findUnique` se check karta hai, phir create karta hai. Dono requests simultaneously same slug generate kar sakti hain (classic **TOCTOU race condition**). `@unique` constraint se DB error aayegi.

```typescript
// BUG: Check-then-act race condition
const existing = await prisma.event.findUnique({ where: { slug } });
if (!existing) return slug; // Another request can grab this slug between check & create
```

**Fix:** Prisma event create mein slug collision ko `try/catch` mein handle karo aur retry karo.

---

## 🟠 BUG 8 — Photos Route: `mock-upload` is Completely Public (No Auth)

**File:** [`photos.routes.ts` Lines 12–14](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/photos/photos.routes.ts#L12-L14)

`/mock-upload` aur `/mock-view` routes auth ke bina accessible hain — ye production mein bhi available rahenge agar `isMockEnv` check properly nahi lagaya gaya.

```typescript
// No auth, no env check — public file storage access
router.put('/mock-upload', rawBodyParser, PhotosController.mockUpload);
router.get('/mock-view', PhotosController.mockView);
```

**Fix:** Environment guard lagao:
```typescript
if (process.env.NODE_ENV !== 'production') {
  router.put('/mock-upload', rawBodyParser, PhotosController.mockUpload);
  router.get('/mock-view', PhotosController.mockView);
}
```

---

## 🟠 BUG 9 — `uploadPhoto()` Always Converts to JPEG (Loses HEIC/PNG Format)

**File:** [`photos.service.ts` Line 267–270](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/photos/photos.service.ts#L267-L270)

EXIF stripping ke time har image `.jpeg({ quality: 95 })` se process hoti hai — PNG aur HEIC images bhi JPEG mein convert ho jaati hain, quality loss hota hai.

```typescript
const processedOriginal = await sharp(rawBuffer)
  .rotate()
  .jpeg({ quality: 95 }) // BUG: Forces JPEG for ALL formats including PNG, HEIC
  .toBuffer();
```

---

## 🟡 BUG 10 — Token Blacklisting Full Token in Redis (Memory Waste)

**File:** [`auth.middleware.ts` Line 47](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/middleware/auth.middleware.ts#L47) & [`auth.controller.ts` Line 304](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/auth.controller.ts#L304)

Full JWT access token Redis key mein store ho raha hai (`blacklist:<full-jwt-token>`). JWT tokens 300+ characters ke hote hain — thousands of logouts mein yeh significant memory waste hai. `jti` (JWT ID) already present hai — woh hi use karna chahiye exclusively.

```typescript
// INEFFICIENT: Storing full 300+ char token as Redis key
await redis.set(`blacklist:${token}`, 'revoked', 'EX', remainingTtl);
```

---

## 🟡 BUG 11 — `selfie-match` Route Has No Auth (Public Selfie Upload)

**File:** [`gallery.routes.ts` Line 25](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/gallery/gallery.routes.ts#L25)

`selfie-match` route `guestMiddleware` ke **baad** define hai, lekin `router.use(guestMiddleware)` ke baad ke routes automatically protected nahi hote agar Multer middleware direct lagaya ho. Check karna chahiye ki `guestMiddleware` proper tarike se chain ho rahi hai.

---

## 🟢 BUG 12 — `unsafe-inline` & `unsafe-eval` in CSP Header

**File:** [`app.ts` Lines 27–28](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/app.ts#L27-L28)

```typescript
scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Weakens XSS protection
```

Helmet se CSP set karna but `unsafe-inline` aur `unsafe-eval` allow karna practically CSP ko useless bana deta hai.

---

## Summary Table

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | 🔴 Critical | auth.controller.ts:168 | login() has no try/catch |
| 2 | 🔴 Critical | auth.controller.ts:509 | Hardcoded localhost reset URL |
| 3 | 🔴 Critical | auth.controller.ts:353 | 2FA secret stored before user verification |
| 4 | 🔴 Critical | app.ts:117 | /api/v1/leads not auth-protected at app level |
| 5 | 🔴 Critical | app.ts:119-123 | Duplicate route mounts (/api vs /api/v1) |
| 6 | 🟠 High | auth.controller.ts:256 | refresh() & resetPassword() no try/catch |
| 7 | 🟠 High | events.service.ts:21 | Race condition in slug generation |
| 8 | 🟠 High | photos.routes.ts:12 | mock-upload public in production |
| 9 | 🟠 High | photos.service.ts:267 | All uploads forced to JPEG |
| 10 | 🟡 Medium | auth.middleware.ts:47 | Full JWT token stored in Redis |
| 11 | 🟡 Medium | gallery.routes.ts:25 | selfie-match auth chain verification needed |
| 12 | 🟢 Low | app.ts:27 | unsafe-inline/eval in CSP header |

---

## 🔍 Part 2 — Additional Bugs (Deeper Scan)

---

## 🔴 BUG 13 — SFTP Plain-Text Credentials Stored in DB

**File:** [`cameraSync.service.ts` Line 75](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/cameraSync/cameraSync.service.ts#L75)

SFTP password (plain-text) directly database mein `sftpCredentials` JSON field mein store ho rahi hai. DB breach hone par saari camera credentials leak ho jayengi.

```typescript
// BUG: Plain-text SFTP password stored in DB!
await prisma.event.update({
  data: {
    sftpCredentials: JSON.stringify(credentials), // includes raw password
  },
});
```

**Fix:** Password ko `AES-256-GCM` se encrypt karke store karo, decrypt karo tabhi jab `resolveCode` called ho.

---

## 🔴 BUG 14 — `deleteMyData()` Deletes ALL Event FaceEmbeddings (Data Corruption)

**File:** [`dpdp.controller.ts` Lines 61–65](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/dpdp.controller.ts#L61-L65)

Yeh CRITICAL data corruption bug hai. Guest apna data delete karta hai, lekin code **poore event ki saari face embeddings** delete kar deta hai — sirf us guest ki nahi!

```typescript
// BUG: Deletes ALL embeddings for the event, not just the guest's
for (const lead of leads) {
  await prisma.faceEmbedding.deleteMany({
    where: { eventId: lead.eventId }, // ❌ Missing guestId/photoId filter!
  });
}
```

Agr ek event mein 500 guests hain, toh ek guest ke data delete karne par poore event ke saare 500 guests ki face data chal jayegi.

**Fix:**
```typescript
// Delete only photos belonging to this specific guest's sessions
await prisma.faceEmbedding.deleteMany({
  where: { 
    eventId: lead.eventId,
    photo: { photographerId: guestId } // filter properly
  },
});
```

---

## 🔴 BUG 15 — Dev OTP Bypass `123456` Active in Production Risk

**File:** [`guest.controller.ts` Lines 94–95](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/guest.controller.ts#L94-L95)

Dev bypass OTP `123456` sirf `NODE_ENV === 'development'` mein active hai. Lekin agar production server par `NODE_ENV` set nahi hua (which happens) toh bypass automatically enable ho jaata hai:

```typescript
// BUG: If NODE_ENV is not set → bypass is ACTIVE in production!
const isDevBypass =
  (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) && body.otp === '123456';
                                           // ^^^ THIS IS DANGEROUS
```

**Fix:**
```typescript
const isDevBypass = process.env.NODE_ENV === 'development' && body.otp === '123456';
// Remove the !process.env.NODE_ENV condition
```

---

## 🔴 BUG 16 — `cameraSync.controller.ts` Accesses `req.user.id` Instead of `req.userId`

**File:** [`cameraSync.controller.ts` Lines 18, 37, 50, 79, 99, 114](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/cameraSync/cameraSync.controller.ts#L18)

`authMiddleware` `req.userId` set karta hai aur `req.user.userId` bhi. Lekin `cameraSync.controller.ts` galat field access karta hai:

```typescript
// BUG: Accesses req.user.id — but auth middleware sets req.user.userId (not req.user.id)!
(req as Request & { user: { id: string } }).user.id
```

Auth middleware mein `JwtPayload` interface dekho — field `userId` hai, `id` nahi. Yeh har camera sync action ke liye `undefined` return karega.

**Fix:** `req.userId` use karo (already set by authMiddleware).

---

## 🟠 BUG 17 — `culling/overrideStatus` Mein Status Validation Missing

**File:** [`culling.controller.ts` Lines 198–221](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/culling/culling.controller.ts#L198-L221)

`overrideStatus` endpoint mein `status` field ka **koi validation nahi** hai. Koi bhi arbitrary string DB mein save ho sakti hai.

```typescript
// BUG: No validation — any value accepted!
const { status } = req.body;
…
await prisma.photo.update({
  data: { cullingStatus: status }, // Could be "HACKED", null, undefined
});
```

**Fix:**
```typescript
const VALID_STATUSES = ['PENDING', 'KEEPER', 'MAYBE', 'REJECT'];
if (!status || !VALID_STATUSES.includes(status)) {
  res.status(400).json({ success: false, error: 'Invalid status value' });
  return;
}
```

---

## 🟠 BUG 18 — `editingController.revertEdits()` Hardcoded Backblaze URL

**File:** [`editing.controller.ts` Line 287](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/editing/editing.controller.ts#L287)

Revert operation mein original URL hardcoded `backblazeb2.com` domain se bana diya jata hai — yeh signed URL nahi hai (CDN/custom domain use nahi hota):

```typescript
// BUG: Hardcoded B2 URL — not using CDN, not a signed URL
const originalUrl = `https://f003.backblazeb2.com/file/${B2_BUCKET_NAME}/${photo.b2Key}`;
```

Yeh publicly accessible URL hai — agar file private hai toh broken link banega, aur agar public hai toh watermark bypass possible.

**Fix:** `getSignedUrl(photo.b2Key, 86400)` use karo, ya CDN_BASE_URL se.

---

## 🟠 BUG 19 — `exportLeads()` Fetches 10,000 Rows In-Memory (Memory DoS)

**File:** [`leads.service.ts` Line 345](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/leads/leads.service.ts#L345)

Lead export bina kisi limit ke 10,000 rows ek saath memory mein load kar leta hai:

```typescript
// BUG: 10,000 leads loaded into RAM at once
const { leads } = await this.listLeads(photographerId, { ...query, limit: 10000, page: 1 });
```

Ek photographer ke paas lakhs leads ho sakte hain agar batch data import ho. Yeh memory exhaustion / server crash cause kar sakta hai.

**Fix:** Streaming CSV generate karo using cursor-based pagination ya `prisma.$transaction` with `findMany` in chunks of 500.

---

## 🟠 BUG 20 — `getTaskStatus()` (Culling/Editing/Reels) Has No Ownership Check

**File:** [`culling.controller.ts` Line 268](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/culling/culling.controller.ts#L268), [`editing.controller.ts` Line 314](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/editing/editing.controller.ts#L314), [`reels.controller.ts` Line 177](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/reels/reels.controller.ts#L177)

Koi bhi authenticated user kisi bhi `taskId` ka status check kar sakta hai — apna ya doosre ka:

```typescript
// BUG: No ownership check — any user can poll any task
async getTaskStatus(req, res) {
  const { taskId } = req.params;
  const response = await axios.get(`${AI_SERVICE_URL}/api/culling/status/${taskId}`);
  res.json(response.data); // Returns data for ANY taskId
}
```

---

## 🟠 BUG 21 — B2 CORS `AllowedOrigins: ['*']` (Wildcard) in Production

**File:** [`b2.client.ts` Line 117](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/photos/b2.client.ts#L117)

B2 bucket CORS configuration mein `AllowedOrigins: ['*']` set hai — koi bhi website aapke B2 bucket se directly files upload/download kar sakti hai:

```typescript
// BUG: Wildcard CORS — any origin can access your B2 bucket directly
AllowedOrigins: ['*'],
```

**Fix:**
```typescript
AllowedOrigins: [
  'https://photogenie.in',
  'https://gallery.photogenie.in',
  'http://localhost:3000',
],
```

---

## 🟡 BUG 22 — `bulkWhatsApp()` Returns Wrong `updatedCount`

**File:** [`leads.service.ts` Lines 446–450](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/leads/leads.service.ts#L446-L450)

`updatedCount` mein `leads.length` return hota hai jo **saare requested leads** hain. Lekin `prisma.lead.updateMany` sirf `NEW/HOT/WARM/COLD` status wale update karta hai. Already `CONTACTED/CONVERTED/LOST` status wale leads count mein include hote hain but update nahi hote — incorrect count.

```typescript
// BUG: updatedCount reflects ALL fetched leads, not actually updated leads
return {
  updatedCount: leads.length, // Wrong — should be count of actually updated
  …
};
```

---

## Updated Summary Table (All 22 Bugs)

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | 🔴 | auth.controller.ts:168 | login() has no try/catch |
| 2 | 🔴 | auth.controller.ts:509 | Hardcoded localhost reset URL |
| 3 | 🔴 | auth.controller.ts:353 | 2FA secret stored before verification |
| 4 | 🔴 | app.ts:117 | /api/v1/leads not protected at app level |
| 5 | 🔴 | app.ts:119–123 | Duplicate route mounts |
| 6 | 🟠 | auth.controller.ts:256 | refresh() no try/catch |
| 7 | 🟠 | events.service.ts:21 | Race condition in slug generation |
| 8 | 🟠 | photos.routes.ts:12 | mock-upload public in production |
| 9 | 🟠 | photos.service.ts:267 | All uploads forced to JPEG |
| 10 | 🟡 | auth.middleware.ts:47 | Full JWT token in Redis |
| 11 | 🟡 | gallery.routes.ts:25 | selfie-match auth chain |
| 12 | 🟢 | app.ts:27 | unsafe-inline in CSP |
| 13 | 🔴 | cameraSync.service.ts:75 | **Plain-text SFTP password in DB** |
| 14 | 🔴 | dpdp.controller.ts:63 | **Deletes ALL event face embeddings on guest delete** |
| 15 | 🔴 | guest.controller.ts:95 | **Dev OTP bypass active when NODE_ENV unset** |
| 16 | 🔴 | cameraSync.controller.ts:18 | **req.user.id used (should be req.userId)** |
| 17 | 🟠 | culling.controller.ts:200 | No status validation in overrideStatus |
| 18 | 🟠 | editing.controller.ts:287 | Hardcoded Backblaze URL in revertEdits |
| 19 | 🟠 | leads.service.ts:345 | 10,000 rows in-memory CSV export |
| 20 | 🟠 | culling/editing/reels controllers | Task status has no ownership check |
| 21 | 🟠 | b2.client.ts:117 | Wildcard CORS on B2 bucket |
| 22 | 🟡 | leads.service.ts:448 | bulkWhatsApp returns wrong updatedCount |

---

## 🔍 Part 3 — Even More Bugs (Deepest Scan)

---

## 🔴 BUG 23 — SFTP Password Comparison is NOT Constant-Time (Timing Attack)

**File:** [`sftp.server.ts` Line 61](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/sftp/sftp.server.ts#L61) & [`ftps.server.ts` Line 83](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/sftp/ftps.server.ts#L83)

Dono SFTP aur FTPS servers mein password comparison `===` operator se ho raha hai. Yeh **timing attack** ke liye vulnerable hai — attacker response time measure karke password guess kar sakta hai.

```typescript
// BUG: JavaScript === is NOT constant-time
if (creds.username === username && creds.password === password) return ev.id;
```

**Fix:**
```typescript
import crypto from 'crypto';
if (
  crypto.timingSafeEqual(Buffer.from(creds.username), Buffer.from(username)) &&
  crypto.timingSafeEqual(Buffer.from(creds.password), Buffer.from(password))
) return ev.id;
```

---

## 🔴 BUG 24 — SFTP `authenticate()` Fetches ALL Camera-Sync Events on Every Login

**File:** [`sftp.server.ts` Lines 52–68](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/sftp/sftp.server.ts#L52-L68)

Har SFTP login attempt par **saare events** DB se load hote hain aur in-memory compare hote hain:

```typescript
// BUG: Full table scan on every SFTP connection attempt!
const events = await prisma.event.findMany({
  where: { cameraSyncEnabled: true, sftpCredentials: { not: null } },
});

for (const ev of events) { // Linear scan!
  if (creds.username === username && creds.password === password) ...
}
```

Koi bhi attacker 1000 connection attempts bana sakta hai aur DB ko overload kar sakta hai.

**Fix:** Username directly DB mein store karo aur `findFirst({ where: { sftpUsername: username } })` use karo.

---

## 🔴 BUG 25 — FTPS `PASV` Mode Returns `127.0.0.1` (Breaks Remote Connections)

**File:** [`ftps.server.ts` Line 263](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/sftp/ftps.server.ts#L263)

PASV response mein server apna IP address hardcode `127.0.0.1` bhejta hai:

```typescript
// BUG: Hardcoded 127.0.0.1 — remote cameras can't connect in PASV mode!
send(controlSocket, 227, `Entering Passive Mode (127,0,0,1,${p1},${p2})`);
```

Canon EOS R cameras jo remote FTPS se connect karti hain, unhe data connection nahi milega. Yeh real-world FTPS ko completely broken bana deta hai.

**Fix:**
```typescript
const serverIp = (process.env.FTPS_PASSIVE_IP || process.env.DOMAIN || '127.0.0.1').replace(/\./g, ',');
send(controlSocket, 227, `Entering Passive Mode (${serverIp},${p1},${p2})`);
```

---

## 🔴 BUG 26 — `thumbnail.job.ts`: `mediumKey` Generated But Never Saved to DB

**File:** [`thumbnail.job.ts` Lines 30–49](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/jobs/thumbnail.job.ts#L30-L49)

Thumbnail worker 1080p medium preview banata aur B2 par upload karta hai, lekin **DB mein `mediumKey` kabhi save nahi hota**:

```typescript
// Generated & uploaded but NEVER saved to DB!
const mediumKey = `${baseKey}-medium.jpg`;
await uploadFile(mediumKey, mediumBuffer, 'image/jpeg');

// DB update mein mediumKey missing!
await prisma.photo.update({
  data: { thumbnailKey: thumbKey }, // mediumKey NOT saved!
});
```

Gallery ka medium preview column `null` rehta hai hamesha, B2 par orphan file banti hai.

**Fix:**
```typescript
await prisma.photo.update({
  data: { 
    thumbnailKey: thumbKey,
    mediumKey: mediumKey, // ← ADD THIS
  },
});
```

---

## 🔴 BUG 27 — `guestOtp()` No try/catch — Unhandled Crashes

**File:** [`guest.controller.ts` Line 25](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/auth/guest.controller.ts#L25)

`guestOtp()` function mein koi bhi `try/catch` nahi hai. Zod parse error, Redis error, ya DB error directly unhandled exception banegi:

```typescript
// BUG: No try/catch anywhere
export async function guestOtp(req: Request, res: Response): Promise<Response> {
  const body = guestOtpSchema.parse(req.body);    // ZodError → unhandled
  const event = await prisma.event.findUnique(...); // DB error → unhandled
  await redis.set(otpKey, otp, 'EX', 60);           // Redis error → unhandled
  await sendOtpEmail(...);                           // Email error → unhandled
}
```

Same bug `guestVerify()` mein bhi hai (Line 63).

---

## 🔴 BUG 28 — `env.ts` Has `INTERNAL_API_KEY` Default Fallback in Production

**File:** [`env.ts` Line 69](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/config/env.ts#L69)

Env schema mein `INTERNAL_API_KEY` ka default value `'dev-internal-api-key-photogenie-32chars'` hai:

```typescript
// BUG: Default value means prod server can run without setting this!
INTERNAL_API_KEY: z.string().default('dev-internal-api-key-photogenie-32chars'),
```

Same key `culling.controller.ts`, `editing.controller.ts`, `reels.controller.ts`, `face.service.ts` mein hardcoded default hai. Koi bhi attacker yeh default key use karke internal AI endpoints directly access kar sakta hai.

**Fix:** `.default()` hata do, required banana chahiye:
```typescript
INTERNAL_API_KEY: z.string().min(32), // No default — must be set
```

---

## 🟠 BUG 29 — `cameraSync.watcher.ts`: EXIF Strip Forces JPEG on All Formats

**File:** [`cameraSync.watcher.ts` Lines 103–106](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/jobs/cameraSync.watcher.ts#L103-L106)

Same as Bug #9 from Part 1 — watcher bhi `.jpeg({ quality: 92 })` force karta hai `.png`, `.heic`, `.heif` files par bhi:

```typescript
// BUG: PNG, HEIC files converted to JPEG with quality loss
processedBuffer = await sharpImage
  .withMetadata({})
  .jpeg({ quality: 92 }) // Forces ALL formats to JPEG
  .toBuffer();
```

---

## 🟠 BUG 30 — `authenticatedApiLimiter` Keys on Full JWT Token (Memory Waste)

**File:** [`rateLimit.middleware.ts` Lines 89–91](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/middleware/rateLimit.middleware.ts#L89-L91)

Authenticated rate limiter pura JWT token key mein use karta hai (300+ chars). Yahi problem `photoUploadLimiter` aur `batchPresignLimiter` mein bhi hai. Redis mein bahut memory waste:

```typescript
// BUG: Full JWT (300+ chars) as Redis key
keyGenerator: (req) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return token ? `token:${token}` : (req.ip ?? '127.0.0.1'); // Huge keys!
},
```

**Fix:** `userId` extract karo ya token ka SHA-256 hash use karo as key.

---

## 🟠 BUG 31 — `events.service.ts`: Share Link aur QR Code Use HTTP `DOMAIN` Env Var

**File:** [`events.service.ts` Lines 34, 318](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/events/events.service.ts#L34)

`getEventShareLink()` aur `generateQrCodeDataUrl()` `DOMAIN` env var use karte hain jisme default `'http://localhost:3000'` hai — production mein HTTP link generate hoga, HTTPS nahi:

```typescript
// BUG: HTTP by default — insecure share links in production
const domain = process.env.DOMAIN || 'http://localhost:3000';
return { link: `${domain}/gallery/${event.slug}` }; // http:// link!
```

**Fix:** `FRONTEND_URL` env var use karo jo `https://` se start ho.

---

## 🟡 BUG 32 — `sendOtpEmail()` Subject Line Mein OTP Plaintext Expose

**File:** [`email.service.ts` Line 47](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/services/email.service.ts#L47)

Email subject mein OTP plaintext likha jaata hai:

```typescript
// BUG: OTP visible in email subject line (email server logs, notification previews)
const subject = `Your ${contextTitle} Verification Code is ${otp}`;
```

Email server logs, push notifications, aur email client preview mein OTP expose ho jaata hai.

**Fix:**
```typescript
const subject = `Your ${contextTitle} Verification Code`; // OTP sirf body mein
```

---

## 🟢 BUG 33 — `gallery.service.ts`: `downloadAll` Mein No Rate Limit

**File:** [`gallery.service.ts` Line 137](file:///c:/Users/ROHIT/Downloads/photogenie-monorepo%20(2)/photogenie/apps/api/src/modules/gallery/gallery.service.ts#L137)

`downloadAll` endpoint par koi rate limit nahi hai. Ek guest repeatedly bulk ZIP download requests bhej sakta hai, causing B2 bandwidth aur server memory abuse.

---

## Updated Summary Table (All 33 Bugs)

| # | 🚨 | File | Issue |
|---|------|------|-------|
| 1–22 | (Part 1 & 2) | Various | See above |
| 23 | 🔴 | sftp.server.ts:61 & ftps.server.ts:83 | SFTP/FTPS password timing attack |
| 24 | 🔴 | sftp.server.ts:52 | Full DB scan on every SFTP login |
| 25 | 🔴 | ftps.server.ts:263 | PASV returns 127.0.0.1 — remote broken |
| 26 | 🔴 | thumbnail.job.ts:49 | mediumKey never saved to DB |
| 27 | 🔴 | guest.controller.ts:25 | guestOtp() has no try/catch |
| 28 | 🔴 | env.ts:69 | INTERNAL_API_KEY has insecure default value |
| 29 | 🟠 | cameraSync.watcher.ts:105 | EXIF strip forces JPEG on all formats |
| 30 | 🟠 | rateLimit.middleware.ts:91 | Full JWT as Redis rate limit key |
| 31 | 🟠 | events.service.ts:34,318 | HTTP (not HTTPS) share links generated |
| 32 | 🟡 | email.service.ts:47 | OTP plaintext in email subject line |
| 33 | 🟢 | gallery.service.ts:137 | downloadAll has no rate limit |
