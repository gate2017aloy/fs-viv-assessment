from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.songs import Song


def get_songs(db: Session, limit: int, offset: int):
    total = db.query(func.count(Song.id)).scalar()
    items = db.query(Song).offset(offset).limit(limit).all()
    return {"songs": items, "total": total}


def get_song_by_title(db: Session, title: str):
    return db.query(Song).filter(Song.title == title).first()


def get_song_by_id(db: Session, song_id: str):
    return db.query(Song).filter(Song.id == song_id).first()


def update_rating(db: Session, song_id: str, rating: int):
    song = get_song_by_id(db, song_id)

    if not song:
        return None

    song.rating = rating
    db.commit()
    db.refresh(song)

    return song
