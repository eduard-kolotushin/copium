import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", default="LIASUDBFO87F8QWEOF8D")
    FLASK_ENV = os.getenv("FLASK_ENV", default="development")


class DevelopConfig(Config):
    # database envs
    FLASK_ENV = "development"
    DB_DIALECT = os.getenv("DB_DIALECT", default="sqlite")
    DB_NAME = os.getenv("DB_NAME", default="copium_db")
    DB_USER = os.getenv("DB_USER", default="copium_user")
    DB_PASSWORD = os.getenv("DB_PASSWORD", default="copium_password")
    DB_HOST = os.getenv("DB_HOST", default="localhost")
    DB_PORT = os.getenv("DB_PORT", default="5432")
    if DB_DIALECT == "sqlite":
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}:///{DB_NAME}"
    else:
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@" \
                                  f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProductionConfig(Config):
    # database envs
    FLASK_ENV = "production"
    DB_DIALECT = os.getenv("DB_DIALECT", default="sqlite")
    DB_NAME = os.getenv("DB_NAME", default="copium_db")
    DB_USER = os.getenv("DB_USER", default="copium_user")
    DB_PASSWORD = os.getenv("DB_PASSWORD", default="copium_password")
    DB_HOST = os.getenv("DB_HOST", default="localhost")
    DB_PORT = os.getenv("DB_PORT", default="5432")
    if DB_DIALECT == "sqlite":
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}:///{DB_NAME}"
    else:
        SQLALCHEMY_DATABASE_URI = f"{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@" \
                                  f"{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(Config):
    # database envs
    FLASK_ENV = "testing"
    SQLALCHEMY_DATABASE_URI = "sqlite:///copium_db.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = True
