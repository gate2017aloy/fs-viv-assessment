# app/cli.py

import asyncio

import typer

from app.services.ingestion_service import ingest_playlist


cli = typer.Typer()


@cli.command()
def ingest():
    """
    Normalize playlist dataset
    and insert into SQLite.
    """

    asyncio.run(ingest_playlist())

    typer.echo("Ingestion completed")


if __name__ == "__main__":
    cli()