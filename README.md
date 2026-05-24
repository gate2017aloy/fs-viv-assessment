# 🎵 FS Viv Assessment - Fullstack Playlist Dashboard

This project includes a FastAPI backend and a Next.js 16 frontend dashboard, providing users with live song searching, pagination, interactive inline rating mutations, and in-depth acoustic & structural analysis of their favorite tracks.

---

## 📂 Project Architecture

The repository is organized as a monorepo consisting of two primary sub-projects:

1. **[Backend API Server](file:///Users/aloydas/work/aloy/fs-viv-assessment/backend/README.md)**
   - Powered by **FastAPI**, **SQLAlchemy ORM**, **SQLite**, and **Typer**.
   - Handles row-oriented dataset normalization, high-performance querying, and rating update updates.
   - Includes full linting (`ruff`), typing (`mypy`), and test suites (`pytest`).
   - Read the [Backend README](file:///Users/aloydas/work/aloy/fs-viv-assessment/backend/README.md) for more details.

2. **[Frontend UI & Dashboard](file:///Users/aloydas/work/aloy/fs-viv-assessment/ui/README.md)**
   - Built with **Next.js 16 (App Router)**, **React 19**, **TailwindCSS v4**, and **TanStack React Query v5**.
   - Read the [UI README](file:///Users/aloydas/work/aloy/fs-viv-assessment/ui/README.md) for more details.

---

## ⚡ Getting Started & Quick Start

Follow these simple steps to get both services running locally.

### Step 1: Run the Backend API Server

Open a terminal window and navigate to the `backend/` directory:
```bash
cd backend
# Install dependencies, normalize dataset, seed database, and boot FastAPI server
just run
```
*The FastAPI server will boot at [http://127.0.0.1:8000](http://127.0.0.1:8000) with interactive Swagger documentation available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

### Step 2: Run the Frontend UI Client

Open a second terminal window and navigate to the `ui/` directory:
```bash
cd ui
# Install dependencies using pnpm
pnpm install
# Start Next.js Turbopack dev server
pnpm dev
```
*The web interface will boot at [http://localhost:3000](http://localhost:3000).*

---

## 🧪 Development & Quality Tools

- **Backend**: Command recipes available via `just` (`just lint`, `just format`, `just typecheck`, `just test`).
- **Frontend**: Standard script triggers available via `pnpm` (`pnpm lint`, `pnpm format`, `pnpm typecheck`).
