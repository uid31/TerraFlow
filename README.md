# TerraFlow — Next.js + TypeScript + Prisma

Built the same way as your example `link-shortener` project: one single
Next.js app (App Router), Prisma called directly inside Server Components
and Server Actions — no separate Express backend.

## Project structure

```
prisma/
  schema.prisma      # User, SoilProfile, SensorReading models
  seed.ts            # data to insert — soil profiles + demo users/readings
src/
  lib/
    prisma.ts         # Prisma client singleton (same pattern as the example)
    auth.ts           # password hashing + session cookie helpers
  components/
    Sidebar.tsx
    LiveStats.tsx      # small client component that polls for live readings
  app/
    layout.tsx
    page.tsx           # home
    globals.css
    login/page.tsx, login/actions.ts       # Server Action + useFormState
    register/page.tsx, register/actions.ts
    selection/page.tsx, selection/actions.ts
    dashboard/page.tsx
    api/sensors/route.ts                    # used by LiveStats polling
    actions.ts          # shared logout action
middleware.ts          # redirects to /login if there's no session cookie
```

## First-time setup

1. **Get a Postgres database.** Easiest free option: create a project at
   https://neon.tech (or https://supabase.com) and copy the connection
   string it gives you.
2. Copy the env file and paste your connection string in:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set `DATABASE_URL` to what Neon/Supabase gave you.
   Also set `JWT_SECRET` to any random string.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create the tables and seed data:
   ```bash
   npx prisma db push
   npm run db:seed
   ```
5. Run it:
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000**.

## Demo login (from seed data)

| username        | password        |
|-----------------|-----------------|
| fieldmanager01  | TerraFlow123!   |
| shahad          | ChangeMe123!    |

Or click **Create an account** on the login screen.

## How the pieces map to your example

- `src/app/page.tsx` uses a Server Action the same way the link-shortener's
  home page does (`"use server"` function passed straight to `<form action={...}>`).
- `src/app/api/sensors/route.ts` is a Route Handler exactly like
  `src/app/api/shorten/route.ts` in your example — `export async function POST()`.
- `src/lib/prisma.ts` is copied from your example's pattern verbatim.
- Protected pages (`selection`, `dashboard`) call `requireUser()` at the top,
  which calls Prisma directly and redirects with `redirect()` — same idea as
  the example's `redirect("/links")`.

## Deploying (to share with people)

1. Push this project to a GitHub repo.
2. Go to https://vercel.com, import the repo.
3. Add `DATABASE_URL` and `JWT_SECRET` as environment variables in Vercel's
   project settings (same values as your `.env`).
4. Deploy — Vercel runs `npm run build` (which also runs `prisma generate`)
   automatically. You'll get a live `https://your-project.vercel.app` URL.

## Useful commands

- `npx prisma studio` — GUI to browse/edit your database
- `npm run db:push` — sync schema changes to the database
- `npm run build && npm start` — production build, run locally
