from ..model import StorageOperations, db, Publication, User
from typing import Any


class PublicationOperations:
    def __init__(self, db_ops: StorageOperations) -> None:
        self.db_ops = db_ops

    @staticmethod
    def string(pub) -> str:
        return f"Publication entitled {pub.title} " \
               f"written by {pub.authors}"

    def get_publications(self, user: User) -> list | str | None:
        error: str | None = None
        publications: list[Any] = []
        try:
            publications = self.db_ops.read(Publication, user_id=user.id)
        except Exception as e:
            error = str(e)
        if error:
            return error
        response: list[dict] = []
        for p in publications:
            response.append({"title": p.title, "authors": p.authors, "journal": p.journal, "volume": p.volume,
                             "page": p.page, "doi": p.doi, "date": str(p.date),
                             "p_type": p.publication_type, "id": p.id})
        return response

    def delete_publications(self, ids: list) -> str | None:
        error: str | None = None
        try:
            for id in ids:
                publication = self.db_ops.get(Publication, id)
                self.db_ops.delete(publication)
        except Exception as e:
            error = str(e)
            return error
        return error


pub_ops = PublicationOperations(db_ops=db)
