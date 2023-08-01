import os
import sys
from flask_security import RoleMixin, UserMixin, AsaList
from sqlalchemy.ext.mutable import MutableList
import config
from sqlalchemy import create_engine, ForeignKey, String, Column, Integer, Table
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import DeferredReflection
from sqlalchemy.orm import DeclarativeBase, scoped_session, sessionmaker, relationship, backref
from utils import create_logger

logger = create_logger(__name__)


class Base(DeclarativeBase):
    pass


class Reflected(DeferredReflection):
    __abstract__ = True


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


class UserModel(Reflected, Base, UserMixin):
    __tablename__ = 'users'
    id = Column(Integer(), primary_key=True)
    roles = relationship('Role', secondary="roles_users",
                         back_populates="users")


class Role(Base, RoleMixin):
    __tablename__ = 'role'
    id = Column(Integer(), primary_key=True)
    name = Column(String(80), unique=True)
    description = Column(String(255))
    permissions = Column(MutableList.as_mutable(AsaList()), nullable=True)
    users = relationship('UserModel', secondary="roles_users",
                         back_populates="roles")


class RolesUsers(Reflected, Base):
    __tablename__ = 'roles_users'
    id = Column(Integer(), primary_key=True)
    user_id = Column('user_id', Integer(), ForeignKey('users.id'))
    role_id = Column('role_id', Integer(), ForeignKey('role.id'))


# Reflect tables from database, exit on fail
try:
    Reflected.prepare(engine)
    Base.metadata.reflect(engine, only=["publications"])
except Exception as e:
    logger.error("Couldn't reflect tables from database", exc_info=e, stack_info=True)
    sys.exit(1)


class PublicationModel(Base):
    __table__ = Base.metadata.tables["publications"]


user = UserModel()
print(user.roles)
