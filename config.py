import os
from typing import Type

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", default="LIASUDBFO87F8QWEOF8D")
    SECURITY_PASSWORD_SALT = os.getenv("SECURITY_PASSWORD_SALT", default="123877190450587514317174152507510896291")
    SECURITY_EMAIL_VALIDATOR_ARGS = {"check_deliverability": False}
    FLASK_ENV = os.getenv("FLASK_ENV", default="development")
    SQLALCHEMY_DATABASE_URI = None
    SECURITY_ADMIN_PASSWORD = os.getenv("SECURITY_ADMIN_PASSWORD", default="org_admin_765")


class DevelopConfig(Config):
    # database envs
    FLASK_ENV = "development"
    DB_DIALECT = os.getenv("DB_DIALECT", default="sqlite")
    DB_DRIVER = os.getenv("DB_DRIVER", default="")
    DB_NAME = os.getenv("DB_NAME", default="copium_db")
    DB_SCHEMA = os.getenv("DB_SCHEMA", default="public")
    DB_USER = os.getenv("DB_USER", default="copium_user")
    DB_PASSWORD = os.getenv("DB_PASSWORD", default="copium_password")
    DB_HOST = os.getenv("DB_HOST", default="localhost")
    DB_PORT = os.getenv("DB_PORT", default="5432")
    if DB_DIALECT == "sqlite":
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}:///{DB_NAME}"
    else:
        if DB_DRIVER:
            SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}+{DB_DRIVER}://{DB_USER}:{DB_PASSWORD}@" \
                                      f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
        else:
            SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@" \
                                      f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProductionConfig(Config):
    # database envs
    FLASK_ENV = "production"
    DB_DIALECT = os.getenv("DB_DIALECT", default="sqlite")
    DB_DRIVER = os.getenv("DB_DRIVER", default="")
    DB_NAME = os.getenv("DB_NAME", default="copium_db")
    DB_SCHEMA = os.getenv("DB_SCHEMA", default=None)
    DB_USER = os.getenv("DB_USER", default="copium_user")
    DB_PASSWORD = os.getenv("DB_PASSWORD", default="copium_password")
    DB_HOST = os.getenv("DB_HOST", default="localhost")
    DB_PORT = os.getenv("DB_PORT", default="5432")
    if DB_DIALECT == "sqlite":
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}:///{DB_NAME}"
    else:
        if DB_DRIVER:
            SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}+{DB_DRIVER}://{DB_USER}:{DB_PASSWORD}@" \
                                      f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
        else:
            SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@" \
                                      f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(Config):
    # database envs
    FLASK_ENV = "testing"
    SQLALCHEMY_DATABASE_URI = "".join(["sqlite:///", os.path.join(basedir, "copium_db.db")])
    SQLALCHEMY_TRACK_MODIFICATIONS = True


def get_config(config_string: str = "development") -> Type[Config]:
    match config_string:
        case "development":
            config_object = DevelopConfig
        case "production":
            config_object = ProductionConfig
        case "testing":
            config_object = TestingConfig
        case _:
            config_object = DevelopConfig
    return config_object
