from flask import Flask
from app.model import UserModel, Role, db_session
from flask_security import SQLAlchemySessionUserDatastore, Security, hash_password

user_datastore = SQLAlchemySessionUserDatastore(db_session, UserModel, Role)


def setup_security(app: Flask, security: Security) -> None:
    with app.app_context():
        security.datastore.find_or_create_role(
            name="admin"
        )
        db_session.commit()
        if not security.datastore.find_user(email="admin@admin.com"):
            security.datastore.create_user(email="admin@admin.com",
                                           password=hash_password(
                                               app.config.get("SECURITY_ADMIN_PASSWORD", default="admin_pass")
                                           ),
                                           roles=["admin"])
        db_session.commit()
