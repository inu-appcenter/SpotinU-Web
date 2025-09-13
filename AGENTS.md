# Repository Guidelines

## Project Structure & Module Organization
- `src/`: application code (React + TypeScript)
  - `pages/`: route-level views (e.g., `MainPage.tsx`).
  - `components/`: reusable UI (feature folders such as `PlaceReview/`, `MainPage/`).
  - `hooks/`: reusable logic (e.g., `useKakaoLoader.ts`).
  - `types/`: shared TypeScript types.
  - `styles/`: global and theme styles.
- `public/`: static assets served as-is.
- Path alias: `@/*` maps to `src/*` (see `tsconfig.app.json`). Example: `import { PlaceCard } from '@/components/PlaceReview/PlaceCard'`.

## Build, Test, and Development Commands
- `npm run dev`: start Vite dev server on port `5173`.
- `npm run build`: type-check (project refs) then build for production.
- `npm run preview`: preview the production build.
- `npm run typecheck`: TypeScript no‑emit type checking.
- `npm run lint` | `npm run lint:fix`: run ESLint, optionally auto-fix.
- `npm run format`: format with Prettier.
- `npm run check`: run lint + typecheck before commits/PRs.

## Coding Style & Naming Conventions
- TypeScript strict mode; prefer explicit types for public APIs.
- Prettier defaults (2-space indent); keep files `.tsx/.ts`.
- ESLint rules: unused imports are errors; `import/order` enforced; React Hooks rules enabled.
- Naming: Components `PascalCase`, hooks `useX`, files match export (e.g., `PlaceCard.tsx`).

## Testing Guidelines
- No unit test framework is configured yet. Keep logic in hooks and small components to ease future testing.
- For manual QA: run `npm run dev`, exercise flows in `src/pages/` (login, map, reviews), and watch console for type/lint warnings.

## Commit & Pull Request Guidelines
- Commits: imperative, concise subject (<= 72 chars), descriptive body when needed. Group related changes.
- Refer to issues with `#123` in commit or PR.
- PRs: clear description, screenshots for UI changes, steps to verify, and `npm run check` passing. Keep PRs focused and small.

## Security & Configuration Tips
- Environment variables: create `.env.local` (not committed). Vite requires `VITE_` prefix.
  - Example: `VITE_KAKAO_MAP_KEY=your_app_key` used by `useKakaoLoader`.
- Avoid committing credentials or large media; place public assets under `public/`.

