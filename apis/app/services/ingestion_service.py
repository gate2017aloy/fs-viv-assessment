# app/services/normalization_service.py

from fastapi.logger import logger
from typing import Any


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

    print(columns)

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
    pass