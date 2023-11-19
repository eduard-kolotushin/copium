from flask import Flask
from flask_security import SQLAlchemySessionUserDatastore, Security, hash_password
from werkzeug.exceptions import Unauthorized, Forbidden

from app.model import UserModel, Role, db_session

user_datastore = SQLAlchemySessionUserDatastore(db_session, UserModel, Role)


def setup_security(app: Flask, security: Security) -> None:
    security.unauthn_handler(unauthn_handler_default)
    security.unauthz_handler(unauthz_handler_default)
    with app.app_context():
        security.datastore.find_or_create_role(
            name="admin"
        )
        db_session.commit()
        if not security.datastore.find_user(email="admin@admin.com"):
            security.datastore.create_user(email="admin@admin.com",
                                           password=hash_password(
                                               app.config.get("SECURITY_ADMIN_PASSWORD")
                                           ),
                                           roles=["admin"])
        db_session.commit()


def unauthn_handler_default(mechanisms: list, headers: dict[str, str] | None = None):
    raise Unauthorized


def unauthz_handler_default(func_name: str, params: list[str] | None = None):
    raise Forbidden
