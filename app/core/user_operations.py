from ..storage import StorageOperations
from ..model import UserModel
from werkzeug.security import generate_password_hash, check_password_hash


class UserOperations:
    def __init__(self, db_ops: StorageOperations):
        self.dp_ops = db_ops

    @staticmethod
    def string(user: UserModel) -> str:
        return f"User {user.firstname} {user.lastname} " \
               f"with email {user.email} and id {user.id}"

    @staticmethod
    def set_password(user: UserModel, password: str) -> None:
        user.password_hash = generate_password_hash(password)

    @staticmethod
    def check_password(user: UserModel, password: str) -> bool:
        return check_password_hash(user.password_hash, password)

    @staticmethod
    def check_credentials(user: UserModel) -> tuple[dict, list[str]]:
        required: list[str] = ['email', 'firstname', 'lastname', 'degree', 'position']
        to_fill: list[str] = []
        filled: dict = dict()
        for field in required:
            attr = getattr(user, field)
            if attr is None or attr == "":
                to_fill.append(field)
            else:
                filled[field] = attr
        return filled, to_fill

    def get_users_by_filter(self, **kwargs: dict) -> list[UserModel]:
        return self.dp_ops.read(UserModel, **kwargs)


usr_ops = UserOperations(db_ops=db)
