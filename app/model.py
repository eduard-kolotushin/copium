import os
import sys
from flask_security import RoleMixin, UserMixin, AsaList
from sqlalchemy.ext.mutable import MutableList
import config
from sqlalchemy import create_engine, ForeignKey, String, Column, Integer
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import DeclarativeBase, scoped_session, sessionmaker, relationship, backref
from utils import create_logger

logger = create_logger(__name__)


class Based(DeclarativeBase):
    pass


try:
    config_object = config.get_config(os.getenv("FLASK_ENV"))
    engine = create_engine(url=config_object.SQLALCHEMY_DATABASE_URI)
except Exception as e:
    logger.error("Couldn't create connection to database", exc_info=e, stack_info=True)
    sys.exit(1)

db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Based.query = db_session.query_property()


class UserModel(Based, UserMixin):
    __tablename__ = 'users'
    roles = relationship('Role', secondary='roles_users',
                         backref=backref('users', lazy='dynamic'))


class Role(Based, RoleMixin):
    __tablename__ = 'role'
    id = Column(Integer(), primary_key=True)
    name = Column(String(80), unique=True)
    description = Column(String(255))
    permissions = Column(MutableList.as_mutable(AsaList()), nullable=True)


class RolesUsers(Based):
    __tablename__ = 'roles_users'
    id = Column(Integer(), primary_key=True)
    user_id = Column('user_id', Integer(), ForeignKey('users.id'))
    role_id = Column('role_id', Integer(), ForeignKey('role.id'))


# Reflect tables from database, exit on fail
Base = automap_base(declarative_base=Based)
try:
    Base.prepare(autoload_with=engine)
    PublicationModel = Base.classes.publications
except Exception as e:
    logger.error("Couldn't reflect tables from database", exc_info=e, stack_info=True)
    sys.exit(1)
