from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.song_repository import get_songs, update_rating, get_song_by_title

router = APIRouter()


@router.get("/songs")
def get_all_songs(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    return get_songs(db, limit, offset)


@router.patch("/songs/{song_id}/rating")
def update_song_rating(
    song_id: str,
    rating: int = Query(..., ge=1, le=5),
    db: Session = Depends(get_db),
):
    updated_song = update_rating(db, song_id, rating)
    if not updated_song:
        raise HTTPException(status_code=404, detail="Song not found")
    return updated_song


@router.get("/songs/{title}")
def get_song(title: str, db: Session = Depends(get_db)):
    song = get_song_by_title(db, title)

    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    return song
