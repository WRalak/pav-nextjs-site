# PAV — People's Alternative Voice

Official website for the People's Alternative Voice (PAV), built with Next.js
(App Router), TypeScript and Tailwind CSS v4.

## Pages
- `/` — Home
- `/manifesto` — Preamble & Manifesto
- `/ideology` — Ideology & Core Principles (six principles, jump-links)
- `/vision-mission` — Vision, Mission, Logo & Slogan
- `/corruption` — Position on Corruption
- `/leader` — Word from the Party Leader
- `/join` — Membership registration form (Code of Conduct + voter details)
- `/login`, `/verify` — Admin sign-in (email + password, then emailed 2FA code)
- `/admin` — Admin dashboard (see below)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Admin auth

`/admin/*` is protected by middleware: email + password, then a 6-digit code
emailed to the admin, before a session cookie is issued. There's a single
admin account, configured entirely through environment variables — no
database involved.

1. Copy `.env.example` to `.env`.
2. Generate a password hash and paste the output line as-is into `.env`:
   ```bash
   npm run hash-password -- "your-password-here"
   ```
   The script escapes every `$` in the hash before printing it. Don't
   hand-type or re-copy a bcrypt hash into `.env` yourself — Next's env
   loader expands `$name` patterns, and an unescaped hash gets silently
   truncated (you'll see "Invalid email or password" on a correct password).
3. Set `ADMIN_EMAIL` and a random `SESSION_SECRET` (`openssl rand -base64 32`).
4. Optionally configure `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` /
   `SMTP_FROM` to actually email the verification code. Leave `SMTP_HOST`
   blank during local development and the code is printed to the server
   console instead.
5. Sign in at `/login`.

Details:
- Codes expire after 5 minutes.
- Resending a code is rate-limited (30s cooldown, 5 sends per 15 minutes) —
  the same limit applies whether the code came from logging in or from
  hitting "Resend code", so re-submitting the login form isn't a way around it.
- 5 incorrect codes locks the account out for 15 minutes.
- The OTP/lockout state lives in memory in `lib/auth/otp-store.ts` — it's
  fine for a single long-running Node server, but won't work correctly
  across multiple instances or serverless invocations. Back it with shared
  storage (Redis, a database row, etc.) if you deploy to a multi-instance or
  serverless platform.

`/admin` itself is fully wired end to end — the join form creates real
member records, `/admin/members` lists/filters/paginates/approves/rejects
them, and `/admin/content` edits actually take effect on the public
pages — but every read and write flows through **in-memory repositories**
rather than a database. That means data is real and consistent within a
running server (submit on `/join`, see it on `/admin/members`; edit
`/admin/content`, see it live on the public page), but it all resets on
restart and won't work across multiple instances/serverless invocations.

## Backend integration

The app is deliberately structured so wiring up a real database touches
exactly three files — every route, page and action already goes through
these, so nothing else needs to change:

| Domain | Swap point | Contract |
|---|---|---|
| Membership applications | `lib/members/store.ts` | `MemberRepository` in `lib/members/types.ts` |
| Page content (CMS) | `lib/content/store.ts` | `getOverride`/`setOverride` in that file |
| Admin OTP/lockout state | `lib/auth/otp-store.ts` | exported functions in that file |

To connect a real database (Postgres via Prisma/Drizzle, or anything else):

1. Pick each file above and reimplement its exported functions against your
   DB client, keeping the exact same function names and signatures.
2. Nothing in `app/` needs to change — admin pages, server actions, and the
   public pages all import from these files, never touch storage directly.
3. For a multi-instance or serverless deployment, the OTP store
   (`lib/auth/otp-store.ts`) especially needs to move off in-process memory
   (e.g. Redis) — session validity, resend limits and lockouts are all
   per-process state right now.

## Before going live
- Configure real SMTP delivery (see "Admin auth" above) before exposing
  `/admin` outside your local machine.
- Back the three files in "Backend integration" with a real database and
  add server-side validation/storage discipline for the ID numbers and
  other personal data collected on `/join` — don't store sensitive PII
  in a repository that isn't actually persisted or access-controlled.
- Fonts are self-hosted via `@fontsource` (Fraunces, Inter, IBM Plex Mono) so
  the site builds without contacting Google Fonts directly.
- Replace `public/pav-seal.jpeg` / `public/pav-banner.jpeg` with
  higher-resolution source art if available.
- Add the official Party Code and any live registration portal link once
  issued by headquarters.

## Deploy
Works out of the box on Vercel, or any Node host:

```bash
npm run build
npm run start
```
