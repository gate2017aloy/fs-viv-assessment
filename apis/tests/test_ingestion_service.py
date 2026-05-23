import pytest
from app.services.ingestion_service import normalize_playlist, ingest_playlist


def test_normalize_playlist_empty():
    """Test that an empty payload returns an empty list."""
    assert normalize_playlist({}) == []


def test_normalize_playlist_standard():
    """Test standard column-oriented input mapping to row-oriented output."""
    payload = {
        "id": {"0": "song-1", "1": "song-2"},
        "title": {"0": "3AM", "1": "21 Guns"},
    }
    expected = [{"id": "song-1", "title": "3AM"}, {"id": "song-2", "title": "21 Guns"}]
    assert normalize_playlist(payload) == expected


def test_normalize_playlist_sorting():
    """Test that row indices are correctly sorted numerically, even if provided out of order or as numeric strings."""
    payload = {"id": {"10": "song-10", "2": "song-2", "0": "song-0"}}
    expected = [{"id": "song-0"}, {"id": "song-2"}, {"id": "song-10"}]
    assert normalize_playlist(payload) == expected


def test_normalize_playlist_missing_values():
    """Test handling of missing indices in some columns."""
    payload = {
        "id": {"0": "song-1", "1": "song-2"},
        "title": {
            "0": "3AM"
            # "1" is missing
        },
    }
    expected = [{"id": "song-1", "title": "3AM"}, {"id": "song-2", "title": None}]
    assert normalize_playlist(payload) == expected


@pytest.mark.anyio
async def test_ingest_playlist():
    """Test that the async ingest_playlist function runs without errors."""
    await ingest_playlist()
