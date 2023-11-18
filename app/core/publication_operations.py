from flask_security import Security
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker, scoped_session
from werkzeug.exceptions import NotFound

import utils
from ..extensions import security
from ..model import PublicationsModel, db_session

logger = utils.create_logger(__name__)

publication_fields = [
    "id",
    "uploaded_by",
    "uploaded_from",
    "title",
    "authors",
    "authors_ids",
    "affilations",
    "topics",
    "publisher",
    "journal",
    "volume",
    "page",
    "isbn",
    "doi",
    "abstract",
    "date",
    "rinc_id",
    "issn",
    "web_of_science_id",
    "astrophysics_data_system_id",
    "mathscinet_id",
    "zbmath_id",
    "chemical_abstaracts_id",
    "springer_id",
    "agris_id",
    "georef_id",
    "scopus_id",
    "pubmed_id",
    "edn_id",
    "created",
    "updated",
    "publication_type"
]


def validate_publication_fields(args: dict) -> dict:
    validated_args = {}
    for field in publication_fields:
        if field in args:
            validated_args[field] = args[field]
    validated_args = validate_publication_fields_types(validated_args)
    return validated_args


def validate_publication_fields_types(args: dict) -> dict:
    validated_args = args
    return validated_args


class PublicationOperations:
    def __init__(self, session_maker: sessionmaker | scoped_session, _security: Security):
        self.db = session_maker
        self.security = _security

    def create_publication(self, args: dict) -> PublicationsModel:
        args["created"] = utils.get_current_time()
        args["uploaded_by"] = args.get("user_id", None)
        args = validate_publication_fields(args)
        pub = PublicationsModel(**args)
        self.db.add(pub)
        self.db.commit()
        return pub

    def update_publication(self, uid: int, args: dict) -> PublicationsModel:
        args["updated"] = utils.get_current_time()
        args = validate_publication_fields(args)
        pub = self.db.get(PublicationsModel, uid)
        if pub is None:
            raise NotFound(f"Publication with id {uid} not found")
        for key, value in args.items():
            setattr(pub, key, value)
        self.db.commit()
        return pub

    def get_all_publications(self):
        return self.db.scalars(select(PublicationsModel)).all()

    def get_publication_by_id(self, uid: int) -> PublicationsModel:
        publication = self.db.get(PublicationsModel, uid)
        if publication is None:
            raise NotFound(f"Publication with id {uid} not found")
        return publication

    def delete_publications(self, ids: list):
        for id in ids:
            publication = self.db.get(PublicationsModel, id)
            if publication is None:
                logger.warning(f"Publication with id {id} not found")
            self.db.delete(publication)
            self.db.commit()
            logger.info(f"Publication with id {id} deleted")


publication_operations = PublicationOperations(db_session, security)
