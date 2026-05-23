from sqlalchemy import Column, Integer, Float, String
from app.core.database import Base


class Song(Base):
    __tablename__ = "songs"

    id = Column(String, primary_key=True)
    title = Column(String)

    danceability = Column(Float)
    energy = Column(Float)
    key = Column(Integer)
    loudness = Column(Float)
    mode = Column(Integer)

    acousticness = Column(Float)
    instrumentalness = Column(Float)
    liveness = Column(Float)
    valence = Column(Float)
    tempo = Column(Float)

    duration_ms = Column(Integer)
    time_signature = Column(Integer)

    num_bars = Column(Integer)
    num_sections = Column(Integer)
    num_segments = Column(Integer)

    class_label = Column("class", Integer)  # "class" is reserved keyword

    # ⭐ NEW FIELD
    rating = Column(Float)
