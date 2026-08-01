# Vienna Center Agent Rules

## Project Context

This project is an educational center management web app for Vienna Center.

Always read these files before making product or UI decisions:

- `docs/PROJECT_PLAN.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/reference/home-reference.jpg`
- `docs/reference/ui-referenc.jpg`

The product has two account types only:

- `Admin`
- `Student`

There are no teacher accounts. Teachers are managed as content records from the admin dashboard only.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase planned for auth, database, and storage
- Firebase Cloud Messaging planned later for push notifications

Use `npm.cmd` on Windows if PowerShell blocks `npm.ps1`.

Common commands:

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

## Implementation Order

Start with the UI using mock data before connecting the backend.

Recommended order:

1. Public layout and theme foundation.
2. Bottom navigation.
3. Home page.
4. Subjects page.
5. Teachers page.
6. Booking page.
7. Contact page.
8. Student auth.
9. Admin dashboard shell.
10. Supabase integration.
11. CRUD features.
12. Notifications.

Do not start with database complexity unless the user explicitly asks for it.

## Design Rules

The design must match the reference images and `docs/DESIGN_SYSTEM.md`.

- Dark theme only.
- Mobile-first.
- Premium educational style.
- Use gold as the primary color.
- Avoid blue buttons.
- Avoid Material Design style.
- Avoid playful colors.
- Avoid random gradients.
- Use rounded cards and large touch targets.
- Prefer Lucide icons for UI icons.
- Use Arabic-first typography.
- Keep all pages visually consistent.
- Use bottom navigation for the main student-facing experience.

Primary colors:

- Background: `#090909`
- Cards: `#111111`
- Secondary cards: `#181818`
- Gold: `#D4A017`
- Secondary gold: `#F2C14E`
- Text primary: `#FFFFFF`
- Text secondary: `#B8B8B8`
- Borders: `#2A2A2A`

## Code Style

- Use TypeScript types for shared data structures.
- Keep components small and reusable.
- Put generic UI components in `src/components/ui`.
- Put layout components in `src/components/layout`.
- Put page-specific components in `src/components/<page-name>`.
- Put mock data in `src/data`.
- Put shared types in `src/types`.
- Put React hooks in `src/hooks/<page-name>`.
- Put helpers and clients in `src/lib`.
- Prefer server components by default unless interactivity requires client components.
- Do not add large abstractions before they are needed.

## Project Structure Flow

Follow this structure. Do not place code in a different location without a clear reason.

```txt
src/
  app/
    page.tsx
    subjects/
      page.tsx
    teachers/
      page.tsx
    booking/
      page.tsx

  components/
    ui/
    layout/
    home/
    subjects/
    teachers/
    booking/

  hooks/
    home/
    subjects/
    teachers/
    booking/

  data/
  types/
  lib/
```

### `src/app`

Use `src/app` for routes only.

- Page files should compose components.
- Keep page files thin.
- Do not put large UI sections directly in a page once they grow.
- Do not put form logic, filtering logic, or API logic directly in page files.

Example:

```txt
src/app/page.tsx
src/app/booking/page.tsx
```

### `src/components/ui`

Use this folder for generic design-system components only.

Examples:

- `button.tsx`
- `card.tsx`
- `input.tsx`
- `section-header.tsx`

Rules:

- Components here must not know about business content like teachers, bookings, or subjects.
- Components here should be reusable across the app.

### `src/components/layout`

Use this folder for application layout components.

Examples:

- `app-shell.tsx`
- `bottom-navigation.tsx`
- `page-header.tsx`

Rules:

- Put shared navigation, shells, headers, and layout wrappers here.
- Do not put page-only sections here.

### `src/components/<page-name>`

Use page folders for page-specific UI sections and cards.

Current example:

```txt
src/components/home/contact-us.tsx
```

Expected future examples:

```txt
src/components/home/hero.tsx
src/components/home/subjects-section.tsx
src/components/teachers/teacher-card.tsx
src/components/booking/booking-form.tsx
```

Rules:

- If a component belongs to one page only, put it in that page folder.
- If a component becomes reusable across pages, move it to `src/components/ui` only if it is truly generic.

### `src/hooks/<page-name>`

Use hooks folders for page-specific client-side logic.

Current example:

```txt
src/hooks/home/use-contact-form.ts
```

Expected future examples:

```txt
src/hooks/booking/use-booking-form.ts
src/hooks/teachers/use-teachers-filter.ts
```

Rules:

- Put form state, submit handlers, filters, and local UI behavior in hooks.
- Keep hooks close to the page domain using a folder name.
- Do not create empty hook folders in advance.
- Create only the folder needed by the current work.

### `src/data`

Use this folder for mock data and temporary static content while the backend is not connected.

Rules:

- Mock data lives here until Supabase is connected.
- Do not scatter mock arrays inside components.

### `src/types`

Use this folder for shared TypeScript types.

Rules:

- Put types used by more than one file here.
- Component-only types can stay inside the component file.

### `src/lib`

Use this folder for shared helpers and external clients.

Expected future examples:

```txt
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/utils.ts
```

Rules:

- Put Supabase, Firebase, formatting helpers, and shared utility functions here.
- Do not put React components or hooks here.

## Context and Provider Rules

Do not add React Context or Providers without discussing it with the user first.

Use Context/Provider only when state must be shared across multiple distant parts of the app.

Possible future use cases:

- Auth/session state after Supabase integration.
- Current student profile.
- Site settings loaded once and used across many pages.
- Theme settings if dark/light mode is added later.
- Notifications state if multiple pages need it.

Do not use Context/Provider for:

- A single form.
- One page-only state.
- Simple props that can be passed directly.
- Mock data that can live in `src/data`.

If Context/Provider becomes necessary, discuss the folder structure before implementing. Preferred future shape:

```txt
src/providers/
  auth-provider.tsx
  site-settings-provider.tsx

src/hooks/
  auth/
    use-auth.ts
```

## Content Rules

- The UI is Arabic-first.
- Use clear Arabic labels.
- Keep copy short and professional.
- Do not add unnecessary instructional text inside the app.

## Safety Rules

- Do not delete docs or reference images.
- Do not remove the Next.js version warning below.
- Do not introduce backend services or credentials without user approval.
- Do not commit secrets.
- Run lint after code changes when practical.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
