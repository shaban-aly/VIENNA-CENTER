# Vienna Center

نظام إدارة سنتر تعليمي — واجهة عربية داكنة (RTL) بنظام حجز للمواد والمدرسين، مصمم لأدوار: **طالب** و**أدمن**.

Dark, Arabic-first (RTL) web app for an educational center — subject/teacher browsing and lesson booking with a student & admin experience.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) 16
- TypeScript
- Tailwind CSS v4
- Lucide icons
- Supabase (Auth + Database + Storage) — planned
- Firebase Cloud Messaging — planned later

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> On Windows PowerShell, use `npm.cmd` if `npm` is blocked.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Structure

```txt
src/
  app/          # Routes (public site + app + auth)
  components/   # ui (generic), layout (shell/nav), page-specific sections
  hooks/        # Page-scoped client logic + shared hooks (debounce, search)
  lib/          # Helpers and external clients
  data/         # Mock data (until Supabase is connected)
  types/        # Shared TypeScript types
docs/           # Project plan, design system, and reference images
```

## Status

The UI runs on mock data in `src/data/mock.ts`. Backend (Supabase) integration, student auth, and the admin dashboard are planned next. See `docs/PROJECT_PLAN.md` and `docs/DESIGN_SYSTEM.md`.
