import os
import sys
import config
from .extensions import login
from sqlalchemy import create_engine, select
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from utils.logger import create_logger
from abc import ABC, abstractmethod


class StorageOperations(ABC):
    @abstractmethod
    def create(self, obj):
        pass

    @abstractmethod
    def delete(self, obj):
        pass

    @abstractmethod
    def update(self, obj, **kwargs):
        pass

    @abstractmethod
    def read(self, obj_cls, **kwargs):
        pass

    @abstractmethod
    def get(self, obj_cls, id):
        pass


class DatabaseOperations(StorageOperations):
    """
    Class representing CRUD operations over relational database using SQLAlchemy
    """
    def __init__(self, engine, logger):
        self.engine = engine
        self.logger = logger

    def create(self, obj):
        with Session(self.engine) as session:
            session.begin()
            try:
                session.add(obj)
            except Exception as e:
                session.rollback()
                self.logger.error("Couldn't create object %s in database", obj, exc_info=e, stack_info=True)
                raise
            else:
                session.commit()
                self.logger.info("Created object %s", obj)

    def read(self, obj_cls, **kwargs):
        with Session(self.engine) as session:
            return session.scalars(select(obj_cls).filter_by(**kwargs)).all()

    def update(self, obj, **kwargs):
        with Session(self.engine) as session:
            for key, val in kwargs:
                if hasattr(obj, key):
                    setattr(obj, key, val)
            try:
                session.commit()
                self.logger.info("Updated object %s", obj)
            except Exception as e:
                self.logger.error("Couldn't update object %s in database", obj, exc_info=e, stack_info=True)

    def delete(self, obj):
        with Session(self.engine) as session:
            session.begin()
            try:
                session.delete(obj)
            except Exception as e:
                session.rollback()
                self.logger.error("Couldn't delete object %s from database", obj, exc_info=e, stack_info=True)
                raise
            else:
                session.commit()
                self.logger.info("Deleted object %s from database", obj)

    def get(self, obj_cls, id):
        with Session(engine) as session:
            return session.get(obj_cls, id)


class UserOperations:
    def __init__(self, db_ops: StorageOperations):
        self.dp_ops = db_ops

    @staticmethod
    def string(user):
        return f"User {user.firstname} {user.lastname} " \
               f"with email {user.email} and id {user.id}"

    @staticmethod
    def set_password(user, password):
        user.password_hash = generate_password_hash(password)

    @staticmethod
    def check_password(user, password):
        return check_password_hash(user.password_hash, password)

    @staticmethod
    def check_credentials(user):
        required = ['email', 'firstname', 'lastname', 'degree', 'position']
        to_fill = []
        filled = dict()
        for field in required:
            attr = getattr(user, field)
            if attr is None or attr == "":
                to_fill.append(field)
            else:
                filled[field] = attr
        return filled, to_fill


class PublicationOperations:
    def __init__(self, db_ops: StorageOperations):
        self.db_ops = db_ops

    @staticmethod
    def string(pub):
        return f"Publication entitled {pub.title} " \
               f"written by {pub.authors}"

    def get_publications(self, user):
        error = None
        publications = []
        try:
            publications = self.db_ops.read(Publication, user_id=user.id)
        except Exception as e:
            error = str(e)
        if error:
            return error
        response = []
        for p in publications:
            response.append({"title": p.title, "authors": p.authors, "journal": p.journal, "volume": p.volume,
                             "page": p.page, "doi": p.doi, "date": str(p.date),
                             "p_type": p.publication_type, "id": p.id})
        return response

    def delete_publications(self, ids: list):
        error = None
        try:
            for id in ids:
                publication = self.db_ops.get(Publication, id)
                self.db_ops.delete(publication)
        except Exception as e:
            error = str(e)
            return error
        return error


logger = create_logger(__name__)

# Create database engine, exit on fail
try:
    config_object = config.get_config(os.getenv("FLASK_ENV"))
    engine = create_engine(url=config_object.SQLALCHEMY_DATABASE_URI)
except Exception as e:
    logger.error("Couldn't create connection to database", exc_info=e, stack_info=True)
    sys.exit(1)

# Reflect tables from database, exit on fail
Base = automap_base()
try:
    Base.prepare(autoload_with=engine)
    User = Base.classes.users
    User.__bases__ = (*User.__bases__, UserMixin,)
    Publication = Base.classes.publications
except Exception as e:
    logger.error("Couldn't reflect tables from database", exc_info=e, stack_info=True)
    sys.exit(1)


@login.user_loader
def load_user(id):
    with Session(engine) as session:
        user = session.get(User, int(id))
    return user
