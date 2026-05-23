from app.api.routes import songs
import logging
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application started")
    yield
    logger.info("Application stopped")


app = FastAPI(
    title="FS Viv Assessment API",
    description="API for FS Viv Assessment",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(songs.router)


@app.get("/health")
async def health():
    return {"status": "healthy"}
