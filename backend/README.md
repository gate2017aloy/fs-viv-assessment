# 🎵 Playlist Analyzer - Backend

A robust and clean Python API serving Spotify-style track analysis. Built with FastAPI, SQLAlchemy, SQLite, and managed with the incredibly fast package installer `uv`.

---

## 🛠️ Stack in a Nutshell

- **Web Framework**: FastAPI & Uvicorn
- **DB & ORM**: SQLite & SQLAlchemy 2.0 (structured via a clean repository pattern)
- **Data Ingestion**: Typer CLI script
- **Tooling**: [uv](https://github.com/astral-sh/uv) (dependency resolution) & [Just](https://github.com/casey/just) (task runner)
- **Quality Control**: `pytest`, `ruff`, `mypy`

---

## 📂 Key Folders

- `app/api/routes/`: API endpoint definitions (e.g. `/songs`)
- `app/models/`: Database model definitions (`Song` schema, including a custom user `rating` field)
- `app/repositories/`: Database queries and data updates (clean separation from routes)
- `app/services/`: Core logic (e.g., parsing raw column-oriented JSON into normalized row-oriented DB records)
- `data/`: Contains the raw `playlist.json` track details
- `tests/`: Automated unit testing suite

---

## 🔌 API Endpoints

- `GET /health` — Check if the backend is alive.
- `GET /songs?limit=10&offset=0` — Retrieve songs in a paginated format.
- `GET /songs/{title}` — Fetch a specific song by its exact title.
- `PATCH /songs/{song_id}/rating?rating=5` — Submit or update a track's 1-to-5 star rating.

---

## ⚡ How to Run

Make sure you have `uv` and `just` installed on your machine.

### The Quick Start (All-in-One)
To set up your virtualenv, import/normalize the dataset, and boot the server, run:
```bash
just run
```
*The interactive API docs will be ready at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).*

### Step-by-Step Control

If you prefer executing individual steps manually:

```bash
# 1. Install dependencies into a local .venv
just install

# 2. Normalize and ingest the playlist.json into SQLite
just ingest

# 3. Spin up the FastAPI server with hot-reload
just serve

# 4. Run pytest suite
just test

# 5. Lint, format, and check typing
just lint
just format
just typecheck
```
