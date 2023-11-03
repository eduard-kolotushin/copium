import os
import sys

from flask_security import RoleMixin, AsaList, UserMixin
from sqlalchemy import create_engine, Column
from sqlalchemy.ext.automap import automap_base, name_for_collection_relationship
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.orm import scoped_session, sessionmaker

import config
from utils import create_logger

collection_names: dict[str, str] = {
    "Role": "roles",
    "UserModel": "users",
}


def proper_collection_names(base, local_cls, referred_cls, constraint):
    referred_name = referred_cls.__name__
    if referred_name in collection_names:
        return collection_names[referred_name]
    else:
        return name_for_collection_relationship(base, local_cls, referred_cls, constraint)


logger = create_logger(__name__)

Base = automap_base()


class Role(Base, RoleMixin):
    __tablename__ = 'role'
    permissions = Column(MutableList.as_mutable(AsaList()), nullable=True)


class UserModel(Base, UserMixin):
    __tablename__ = 'users'


try:
    config_object = config.get_config(os.getenv("FLASK_ENV"))
    engine = create_engine(url=config_object.SQLALCHEMY_DATABASE_URI)
except Exception as e:
    logger.error("Couldn't create connection to database", exc_info=e, stack_info=True)
    sys.exit(1)

db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base.query = db_session.query_property()


# Reflect tables from database, exit on fail
try:
    Base.prepare(
        autoload_with=engine,
        name_for_collection_relationship=proper_collection_names
    )
    PublicationsModel = Base.classes.publications
    # UserModel = Base.classes.users
except Exception as e:
    logger.error("Couldn't reflect tables from database", exc_info=e, stack_info=True)
    sys.exit(1)
