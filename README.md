# Castefy

Production-ready Next.js (App Router) + Firebase PWA for intent-first matchmaking with admin-curated caste & sub caste data.

> **Firebase project creation is manual.** Provide your own Firebase config and service account. Seed files are a starter pack only—please curate and expand responsibly.

## Prerequisites
- Node.js 18+
- Firebase project with Blaze or Spark (for Firestore + Storage)
- Firebase CLI (`npm i -g firebase-tools`)
- Vercel account (for deploy)

## Quick start
1. Clone and install:
   ```bash
   git clone <repo-url> castefy
   cd castefy
   npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env.local
   ```
3. In Firebase console, create a Web App and copy SDK keys into `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_FIREBASE_VAPID_KEY= # optional if using FCM
   FIREBASE_SERVICE_ACCOUNT_BASE64= # base64 of service account JSON (for server routes)
   ```
4. Enable Phone Auth in **Authentication → Sign-in method → Phone**.
5. Create Firestore (Native mode) and Storage buckets.
6. (Recommended) Enable App Check with reCAPTCHA v3, then update the web app config if needed.

## Running locally
```bash
npm run dev
# http://localhost:3000
```
The PWA service worker is disabled in dev; build to test offline support:
```bash
npm run build && npm run start
```

## Firebase security rules
Rules live under `/firebase`.

- Firestore: `firebase/firestore.rules`
  ```bash
  firebase login
  firebase init firestore # skip rule creation when prompted, reuse existing
  firebase deploy --only firestore:rules
  ```
- Storage: `firebase/storage.rules`
  ```bash
  firebase deploy --only storage:rules
  ```
- Indexes: `firebase/indexes.json`
  ```bash
  firebase deploy --only firestore:indexes
  ```

## Data model (Firestore collections)
- `users/{uid}`: role, status, profile, preferences, timestamps
- `casteMaster/{casteId}`: admin curated list (isActive controls visibility)
- `subCasteMaster/{subCasteId}`: linked to casteId
- `swipes/{swipeId}`: `${fromUid}_${toUid}` with action
- `matches/{matchId}`: deterministic id of two users
- `chats/{matchId}/messages/{messageId}`: chat messages
- `reports/{reportId}`: user reports
- `blocks/{blockId}`: `${blockerUid}_${blockedUid}`
- `dailyStacks/{uid_yyyyMMdd}`: optional cached discovery stack

## Admin seed (starter pack)
Seed files are under `firebase/seed` and intentionally **not exhaustive**.
- `casteSeed.json`
- `subCasteSeed.json`

To import once (admin only):
1. Ensure `FIREBASE_SERVICE_ACCOUNT_BASE64` is set and the admin user has `role=admin` in their ID token / custom claims.
2. Call the protected route:
   ```bash
   curl -X POST https://<your-vercel-domain>/api/seed \
     -H "Cookie: castefy_token=<ID_TOKEN>"
   ```
   The route reads the JSON files and upserts Firestore docs.

## Creating the first admin user
1. Sign in via phone to create a `users/{uid}` doc.
2. In Firestore console, set `role = "admin"` on that document (or via custom claims on the user in Firebase Auth).
3. Re-authenticate so the ID token carries the admin claim.

## PWA setup
- `next-pwa` is configured in `next.config.js` with an offline fallback at `/offline`.
- Manifest + icons live in `public/manifest.json` and `public/icons/*` (SVG, maskable friendly).
- Install prompt suggestion can be triggered client-side using localStorage heuristics (stub ready).

## Core flows implemented
- Phone OTP auth pages (login + verify) with invisible reCAPTCHA placeholder.
- Onboarding wizard (multi-step, form validation via Zod + React Hook Form, admin-driven caste/sub caste dropdowns).
- Discovery swipe UI with Framer Motion + `@use-gesture/react`.
- Matches list + chat placeholder with optimistic send.
- Verification status messaging on profile.
- Admin panel for caste/sub caste CRUD, moderation queue placeholder, seed import hook.

## Firebase connection
- Client SDK initialized in `lib/firebaseClient.ts` using `.env.local`.
- Server-side admin SDK optional in `lib/firebaseAdmin.ts` (requires `FIREBASE_SERVICE_ACCOUNT_BASE64`).
- Auth token is expected in the `castefy_token` cookie for server routes.

## Deployment (Vercel)
1. Push code to a Git repo.
2. In Vercel project settings, add environment variables from `.env.local`.
3. Set `NODE_ENV=production` to enable PWA service worker.
4. Deploy. After the first production build, verify:
   - `/manifest.json` loads
   - Service worker is registered (Application > Service Workers)
   - Offline fallback page works (toggle offline in DevTools)

## Security checklist
- Roles enforced in Firestore rules (user can only mutate their own data; caste masters admin-only; chats limited to participants).
- Storage path scoped to `userPhotos/{uid}` with auth check.
- Server routes expect admin tokens where required.
- Avoids runtime scraping or external data pulls.

## Troubleshooting
- **OTP not sending**: ensure Phone Auth is enabled and the domain is whitelisted in Firebase console.
- **Admin APIs return 401**: confirm `role=admin` custom claim and service account env is set.
- **PWA not installing**: production build only; ensure served over HTTPS and manifest/service worker load without errors.
- **Firestore permissions**: re-deploy rules after edits; check simulator with sample tokens.

## Notes
- UI is mobile-first with Framer Motion microinteractions and swipe physics.
- Skeleton loaders and glassmorphism styling keep perceived performance high.
- Seed data is a **starter**; admins must curate and localize appropriately.
