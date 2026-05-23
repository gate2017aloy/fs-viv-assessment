from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database file
DATABASE_URL = "sqlite:///./app.db"

# Engine = core connection to DB
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},  # required only for SQLite
)

# Session = used to talk to DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()
