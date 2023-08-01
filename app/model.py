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

Base = automap_base()


# class UserModel(Base, UserMixin):
#     __tablename__ = 'users'
#     role_collection = relationship('Role', secondary="roles_users",
#                                    back_populates="users_collection")


# class Role(Base, RoleMixin):
#     __tablename__ = 'role'
#     permissions = Column(MutableList.as_mutable(AsaList()), nullable=True)
#     users_collection = relationship('users', secondary="roles_users",
#                                     back_populates="role_collection")


# class RolesUsers(Base):
#     __tablename__ = 'roles_users'
#     id = Column(Integer(), primary_key=True)
#     user_id = Column('user_id', Integer(), ForeignKey('users.id'))
#     role_id = Column('role_id', Integer(), ForeignKey('role.id'))


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
    Base.prepare(autoload_with=engine)
    Publications = Base.classes.publications
    RolesUsers = Base.classes.roles_users
    UserModel = Base.classes.users
    Role = Base.classes.role
except Exception as e:
    logger.error("Couldn't reflect tables from database", exc_info=e, stack_info=True)
    sys.exit(1)

user = UserModel()
print(user.role_collection)
