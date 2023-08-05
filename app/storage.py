from abc import ABC, abstractmethod
from logging import Logger
from typing import Any
from sqlalchemy import select, Engine
from sqlalchemy.orm import Session


class StorageOperations(ABC):
    @abstractmethod
    def create(self, obj: Any):
        pass

    @abstractmethod
    def delete(self, obj: type):
        pass

    @abstractmethod
    def update(self, obj: Any, **kwargs: dict[Any]):
        pass

    @abstractmethod
    def read(self, obj_cls: type, **kwargs: dict[Any]):
        pass

    @abstractmethod
    def get(self, obj_cls: type, id: int):
        pass


class DatabaseOperations(StorageOperations):
    """
    Class representing CRUD operations over relational database using SQLAlchemy
    """
    def __init__(self, engine: Engine, logger: Logger):
        self.engine = engine
        self.logger = logger

    def create(self, obj: Any):
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

    def read(self, obj_cls: type, **kwargs: dict[Any]):
        with Session(self.engine) as session:
            return session.scalars(select(obj_cls).filter_by(**kwargs)).all()

    def update(self, obj: Any, **kwargs):
        with Session(self.engine) as session:
            for key, val in kwargs:
                if hasattr(obj, key):
                    setattr(obj, key, val)
            try:
                session.commit()
                self.logger.info("Updated object %s", obj)
            except Exception as e:
                self.logger.error("Couldn't update object %s in database", obj, exc_info=e, stack_info=True)

    def delete(self, obj: Any):
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

    def get(self, obj_cls: type, id: int):
        with Session(self.engine) as session:
            return session.get(obj_cls, id)
