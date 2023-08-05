import os
import sys

from flask_security import RoleMixin, AsaList
from sqlalchemy import create_engine, Column
from sqlalchemy.ext.automap import automap_base, name_for_collection_relationship
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.orm import scoped_session, sessionmaker

import config
from utils import create_logger


def proper_collection(base, local_cls, referred_cls, constraint):
    referred_name = referred_cls.__name__
    match referred_name:
        case "Role":
            result = "roles"
        case "users":
            result = "users"
        case _:
            return name_for_collection_relationship(base, local_cls, referred_cls, constraint)
    return result


logger = create_logger(__name__)

Base = automap_base()


class Role(Base, RoleMixin):
    __tablename__ = 'role'
    permissions = Column(MutableList.as_mutable(AsaList()), nullable=True)


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
        name_for_collection_relationship=proper_collection
    )
    PublicationsModel = Base.classes.publications
    UserModel = Base.classes.users
except Exception as e:
    logger.error("Couldn't reflect tables from database", exc_info=e, stack_info=True)
    sys.exit(1)
