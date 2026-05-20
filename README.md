# Apex Circle

> **Unlocking the innovation & capital for your business success.**
>
> A private business networking group for ambitious founders, operators, and
> investors across Singapore, China, and Japan. Curated, not crowded.

The official site for **Apex Circle Pte. Ltd.** (UEN `201730864Z`).

- Instagram: [@apexcirclesg](https://www.instagram.com/apexcirclesg/)
- Council contact: `aloycwl@gmail.com`

---

## Tech stack

- **Frontend** — React 19 + Vite 7 + Tailwind CSS 4 + react-router-dom
- **Server** — Hono (on Zo / Bun) **or** Vercel serverless functions (on Vercel / Node)
- **Email** — [Resend](https://resend.com) (shared by both hosts)
- **Forms** — POST to `/api/apply` and `/api/enquire`; validated by `lib/submission.ts`

This repo runs on **two hosts** with no code changes:

| Host    | Server                | Storage                         | Email   |
| ------- | --------------------- | ------------------------------- | ------- |
| Zo      | `server.ts` (Hono)    | `submissions/*.json` on disk    | Resend  |
| Vercel  | `api/*.ts` (Node)     | Resend only (no persistent FS)  | Resend  |

---

## Project structure

```
apex-circle/
├── api/                # Vercel serverless functions
│   ├── apply.ts
│   └── enquire.ts
├── lib/
│   └── submission.ts   # Shared validation + Resend email (Zo + Vercel both call this)
├── public/             # Static assets (logo, QR, founder/company images)
├── src/
│   ├── App.tsx
│   ├── components/
│   │   └── layout.tsx  # Nav, footer, logo
│   ├── pages/
│   │   ├── home.tsx
│   │   ├── apply.tsx
│   │   ├── enquire.tsx
│   │   ├── events.tsx
│   │   ├── thank-you.tsx
│   │   └── not-found.tsx
│   └── styles.css      # Apex theme tokens (dark + gold)
├── server.ts           # Zo deployment (Hono + Vite middleware)
├── vercel.json         # Vercel deployment config
├── vite.config.ts
└── zosite.json         # Zo deployment config
```

## Routes

| Path         | Page                    |
| ------------ | ----------------------- |
| `/`          | Home (hero, pillars, founders, members, events teaser, tiers, PayNow, CTA) |
| `/events`    | Every Thursday 7–9 PM   |
| `/apply`     | Membership application  |
| `/enquire`   | General enquiry         |
| `/thank-you` | Submission confirmation |

| Endpoint        | Method | Behaviour                                  |
| --------------- | ------ | ------------------------------------------ |
| `/api/apply`    | POST   | Validate + email Council + (Zo) save JSON  |
| `/api/enquire`  | POST   | Validate + email Council + (Zo) save JSON  |

---

## Environment variables

| Var                  | Required | Purpose                                                       |
| -------------------- | -------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`     | yes      | Resend API key — emails Council on every form submission      |
| `APEX_NOTIFY_EMAIL`  | no       | Recipient. Defaults to `aloycwl@gmail.com`                    |
| `APEX_FROM_EMAIL`    | no       | Sender. Defaults to `Apex Circle <onboarding@resend.dev>`. Once a domain is verified in Resend, set to e.g. `Apex Circle <hello@apexcirclesg.com>` |

If `RESEND_API_KEY` is missing, the site still accepts submissions — they're
just not emailed. On Zo, they remain on disk in `submissions/`. On Vercel,
they're written to function logs.

---

## Local development (Bun / Zo workflow)

```bash
bun install
bun run dev   # http://localhost:51947
```

This runs `server.ts` with Vite middleware (HMR off).

## Production builds

```bash
bun run build    # writes /dist
bun run prod     # builds + serves /dist via Hono (Zo production)
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New… → Project → Import** the repo.
3. Framework preset: **Other**. Vercel will read `vercel.json`:
   - Build: `vite build`
   - Output: `dist`
   - Functions: `api/*.ts`
4. Add Environment Variables:
   - `RESEND_API_KEY` — from https://resend.com/api-keys
   - `APEX_NOTIFY_EMAIL` — optional override
   - `APEX_FROM_EMAIL` — optional override
5. Deploy. Vercel serves the SPA from `dist/` and the API from `api/`.

For a custom domain (`apex.insightginie.com`):

- Vercel: Project → Settings → Domains → add `apex.insightginie.com`
- DNS at `insightginie.com`: CNAME `apex` → `cname.vercel-dns.com`

---

## Deploying on Zo

Already wired via `zosite.json`. Add `RESEND_API_KEY` in
**Settings → Advanced → Secrets**, then re-publish.

---

## Submissions on Zo

Every form post is also persisted to `submissions/` as a timestamped JSON
file plus an append-only `submissions.jsonl`. The directory is gitignored.

---

© Apex Circle Pte. Ltd. · Singapore
