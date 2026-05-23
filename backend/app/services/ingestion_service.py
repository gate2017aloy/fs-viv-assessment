from app.models.songs import Song
from app.core.database import SessionLocal, engine, Base
import json
from pathlib import Path
from typing import Any

DATA_FILE = Path(__file__).parent.parent.parent / "data" / "playlist.json"


def normalize_playlist(
    payload: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    """
    Convert column-oriented playlist JSON
    into row-oriented records.

    Example input:
    {
        "id": {
            "0": "song-1",
            "1": "song-2"
        },
        "title": {
            "0": "3AM",
            "1": "21 Guns"
        }
    }

    Example output:
    [
        {
            "id": "song-1",
            "title": "3AM"
        },
        {
            "id": "song-2",
            "title": "21 Guns"
        }
    ]
    """

    if not payload:
        return []

    columns = list(payload.keys())

    row_indices = sorted(
        payload[columns[0]].keys(),
        key=int,
    )

    normalized_rows = []

    for index in row_indices:
        row = {}

        for column in columns:
            row[column] = payload[column].get(index)

        normalized_rows.append(row)

    return normalized_rows


async def ingest_playlist() -> None:
    """
    Normalize playlist dataset and insert into SQLite.
    """

    with open(DATA_FILE, encoding="utf-8") as f:
        data = json.load(f)
    normalized = normalize_playlist(data)

    # Create all tables (e.g. songs) defined by SQLAlchemy models if they do not exist
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        db.query(Song).delete()
        db.bulk_insert_mappings(Song, normalized)  # type: ignore[arg-type]
        db.commit()

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()
