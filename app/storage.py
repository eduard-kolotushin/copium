from abc import ABC, abstractmethod
from logging import Logger
from typing import Any

from sqlalchemy import select, Engine
from sqlalchemy.orm import Session


class StorageOperations(ABC):
    """
    Base abstract class for operations over some kind of storage.
    """
    @abstractmethod
    def create(self, obj: Any):
        """
        Create object by instance *obj* provided.
        :param obj:
        :return:
        """
        pass

    @abstractmethod
    def delete(self, obj: type):
        """
        Delete object by instance *obj* provided.
        :param obj:
        :return:
        """
        pass

    @abstractmethod
    def update(self, obj: Any, **kwargs: Any):
        """
        Update object by instance *obj* provided and properties
        that should be updated in *kwargs* key-value params.
        :param obj:
        :param kwargs:
        :return:
        """
        pass

    @abstractmethod
    def read(self, obj_cls: type, **kwargs: Any):
        """
        Read objects from storage by providing its class *obj_cls* and
        filters in key-value params *kwargs*.
        :param obj_cls:
        :param kwargs:
        :return:
        """
        pass

    @abstractmethod
    def get(self, obj_cls: type, id: int):
        """
        Get single object from storage by providing its class *obj_cls*
        and its primary key (usually it's an **int** unique identifier).
        :param obj_cls:
        :param id:
        :return:
        """
        pass


class DatabaseOperations(StorageOperations):
    """
    Class representing CRUD operations over relational database using SQLAlchemy
    """
    def __init__(self, engine: Engine, logger: Logger | None = None):
        """
        Initialization of instance with SQLAlchemy *engine* and
        standard python logging *logger* if needed.
        :param engine:
        :param logger:
        """
        self.engine = engine
        self.logger = logger
        if self.logger is not None:
            self.logging_enabled = True
        else:
            self.logging_enabled = False

    def create(self, obj: Any):
        with Session(self.engine) as session:
            session.begin()
            try:
                session.add(obj)
            except Exception as e:
                session.rollback()
                if self.logging_enabled:
                    self.logger.error("Couldn't create object %s in database", obj, exc_info=e, stack_info=True)
                raise
            else:
                session.commit()
                if self.logging_enabled:
                    self.logger.info("Created object %s", obj)

    def read(self, obj_cls: type, **kwargs: dict):
        with Session(self.engine) as session:
            try:
                objs = session.scalars(select(obj_cls).filter_by(**kwargs)).all()
            except Exception as e:
                if self.logging_enabled:
                    self.logger.error("Couldn't read objects %s in database", obj_cls, exc_info=e, stack_info=True)
                    raise
            return objs

    def update(self, obj: Any, **kwargs: Any):
        with Session(self.engine) as session:
            for key, val in kwargs:
                if hasattr(obj, key):
                    setattr(obj, key, val)
            try:
                session.commit()
                if self.logging_enabled:
                    self.logger.info("Updated object %s", obj)
            except Exception as e:
                if self.logging_enabled:
                    self.logger.error("Couldn't update object %s in database", obj, exc_info=e, stack_info=True)
                    raise

    def delete(self, obj: Any):
        with Session(self.engine) as session:
            session.begin()
            try:
                session.delete(obj)
            except Exception as e:
                session.rollback()
                if self.logging_enabled:
                    self.logger.error("Couldn't delete object %s from database", obj, exc_info=e, stack_info=True)
                raise
            else:
                session.commit()
                if self.logging_enabled:
                    self.logger.info("Deleted object %s from database", obj)

    def get(self, obj_cls: type, id: int):
        with Session(self.engine) as session:
            try:
                obj = session.get(obj_cls, id)
            except Exception as e:
                if self.logging_enabled:
                    self.logger.error("Couldn't get object of class %s from database by id %d",
                                      obj_cls, id, exc_info=e, stack_info=True)
                    raise
            return obj
