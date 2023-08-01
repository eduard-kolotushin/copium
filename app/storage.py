from abc import ABC, abstractmethod
from typing import Type, Any
from sqlalchemy import select
from sqlalchemy.orm import Session


class StorageOperations(ABC):
    @abstractmethod
    def create(self, obj: Type[Any]):
        pass

    @abstractmethod
    def delete(self, obj: Type[Any]):
        pass

    @abstractmethod
    def update(self, obj, **kwargs: dict[Any]):
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
        with Session(self.engine) as session:
            return session.get(obj_cls, id)


db = DatabaseOperations(engine=engine, logger=logger)
