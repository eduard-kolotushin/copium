from flask import Flask
from .extensions import db, api, migrate, login
from config import DevelopConfig, ProductionConfig, TestingConfig
from . import route
from . import model
from utils.logger import create_logger


def create_app(config_string="development"):
    match config_string:
        case "development":
            config_object = DevelopConfig
        case "production":
            config_object = ProductionConfig
        case "testing":
            config_object = TestingConfig
        case _:
            config_object = DevelopConfig
    app = Flask(__name__)
    app.config.from_object(config_object)
    app.logger = create_logger(__name__)
    register_extensions(app)
    return app


def register_extensions(app):
    db.init_app(app)
    api.init_app(app)    #, doc=False, add_specs=False
    migrate.init_app(app, db)
    login.init_app(app)
