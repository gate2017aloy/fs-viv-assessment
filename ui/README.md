# 🎨 Playlist Analyzer - UI

A premium Next.js dashboard featuring glassmorphic designs, real-time playlist metrics, and an interactive rating system. Built with **Next.js 16** (App Router), **React 19**, **TailwindCSS v4**, and **TanStack React Query v5**.

---

## ✨ Highlight Features

- **Composed Headless Architecture**: Core state, pagination, search, metrics, and mutations are isolated into focused, reusable custom hooks (`ui/feat/songs/hooks/`) and composed into a single `useSongs` entry point.
- **Acoustic & Musical Profiler**: Click any track in the dashboard to slide open a detailed profile showing acousticness, energy, valence, key, tempo, sections, and segments.
- **Optimistic Inline Ratings**: A smooth 5-star rating mutation that dynamically sends updates to the backend with optimistic UI updates and instant cache invalidations.
- **Premium Toolbar**: Multi-page navigation controls, customizable page-size selectors (10, 20, 50 tracks), and live title filtering.

---

## 🛠️ Stack in a Nutshell

- **Framework**: Next.js 16 (App Router + Turbopack) & React 19
- **State Management**: TanStack React Query v5 & Axios
- **Styling**: TailwindCSS v4 & Lucide Icons
- **Design Primitives**: Shadcn UI & Radix UI

---

## 📂 Key Folders

- `app/`: Router page layouts and global Tailwind variables
- `api/`: API client configurations and response typings
- `components/ui/`: Standard reusable design primitives (button, table, pagination, etc.)
- `feat/songs/components/`: Modular dashboard views (search inputs, stat cards, song details)
- `feat/songs/hooks/`: Headless business logic custom hooks

---

## ⚡ How to Run

Make sure you have `pnpm` installed.

```bash
# 1. Install project dependencies
pnpm install

# 2. Spin up Next.js Turbopack dev server
pnpm dev

# 3. Build the production package
pnpm build

# 4. Check linting, format, and static typing
pnpm lint
pnpm format
pnpm typecheck
```

*By default, the UI talks to the API at `http://localhost:8000`. You can customize this by creating a `.env.local` file:*
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
