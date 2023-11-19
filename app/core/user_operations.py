from typing import Sequence, Any

from flask_security import Security, login_user
from flask_security import verify_password, hash_password
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker, scoped_session
from werkzeug.exceptions import NotFound, Unauthorized, BadRequest

import utils
from ..extensions import security
from ..model import UserModel, db_session

logger = utils.create_logger(__name__)


def validate_user_args(args: dict):
    args_out = {}
    valid_args = [
        "email",
        "roles",
        "password",
        "firstname",
        "lastname",
        "middlename",
        "position",
        "degree"
    ]
    need_args = ["roles", "password", "email"]
    for key, value in args.items():
        if key in valid_args:
            args_out[key] = value
    for arg in need_args:
        if arg not in args_out:
            args_out[arg] = None
    return args_out


class UserOperations:
    def __init__(self, session_maker: sessionmaker | scoped_session, _security: Security):
        self.db = session_maker
        self.security = _security

    def get_users_by_filter(self, **kwargs: dict) -> Sequence:
        return self.db.scalars(select(UserModel).filter_by(**kwargs)).all()

    def get_user_by_id(self, id: int) -> Any:
        return self.db.get(UserModel, id)

    def create_user(self, args: dict) -> UserModel:
        args = validate_user_args(args)
        if not self.security.datastore.find_user(email=args.get("email")):
            user = self.security.datastore.create_user(email=args.get("email"),
                                                       password=hash_password(
                                                           args.get("password")
                                                       ),
                                                       roles=args.get("roles"))
        else:
            raise BadRequest("User already exist")
        self.db.commit()
        return user # noqa

    def update_user(self, uid: int, args: dict) -> Any:
        user = self.security.datastore.find_user(id=uid)
        if user is None:
            ex = NotFound
            ex.description = (f"User with id {uid} doesn't exist",)
            raise ex
        args = validate_user_args(args)
        roles = args.pop("roles")
        password = args.pop("password")
        email = args.pop("email")
        for key, value in args.items():
            if hasattr(user, key):
                setattr(user, key, value)
        # If user wants to change email which is used as login
        if email is not None and user.email != email:
            # Raise exception if user with wanted email already exists
            if self.security.datastore.find_user(email=email) is not None:
                raise BadRequest("User with provided email already exits")
            # Change email otherwise
            user.email = email
        if roles is not None:
            for role in roles:
                self.security.datastore.add_role_to_user(user, role)
        if password is not None:
            user.password = hash_password(password)
        self.db.commit()
        return user

    def delete_user(self, uid: int) -> Any:
        user = self.security.datastore.find_user(id=uid)
        if user is None:
            ex = NotFound
            ex.description = (f"User with id {uid} doesn't exist",)
            raise ex
        self.security.datastore.delete_user(user)
        self.db.commit()
        return user

    def try_login_user(self, email: str, password: str):
        user = self.security.datastore.find_user(email=email)
        if user is None:
            ex = NotFound
            ex.description = f"Couldn't find user with email {email} in storage"
            raise ex
        if not verify_password(password, user.password):
            raise Unauthorized("Incorrect password")
        if not login_user(user):
            raise Unauthorized("WTF I don't know why but you can't login")
        self.db.commit()


user_operations = UserOperations(session_maker=db_session, _security=security)
