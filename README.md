# SolutionLab LMS Frontend (Next.js)

Production-grade frontend architecture for the YandyTech community LMS under SolutionLab

## Architecture highlights

- **Next.js App Router** with modular route groups for role-based layouts.
- **Role-based routing** via `middleware.ts` and client-side guards.
- **Global auth context** backed by Zustand persistent store.
- **API service layer** using Axios with JWT interceptor.
- **Reusable UI foundation** for loading, error boundaries, toasts, and shells.
- **TailwindCSS design system** preserving existing brand palette.

## Folder structure

- `app/(public)` public marketing + discovery screens.
- `app/(student)`, `app/(instructor)`, `app/(admin)` role portals.
- `components/layout` reusable nav/footer/role shell.
- `components/ui` UX primitives: boundary, loading, route guard.
- `components/providers` app-level auth and toast providers.
- `services` API clients and domain service contracts.
- `store` Zustand slices.
- `data` static fallback seed data for local UX continuity.

## Run locally

```bash
npm install
npm run dev
```

Set `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

## Auth flow

1. Login sets `access_token` and `user_role` cookies.
2. Middleware protects `/student`, `/instructor`, `/admin`.
3. Client guard (`ProtectedRoute`) validates hydrated store role.
4. Logout clears cookies and persisted auth state.

