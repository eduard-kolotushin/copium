from flask import Flask
from .extensions import db, api, migrate, login
from config import DevelopConfig, ProductionConfig, TestingConfig
from . import route
from . import model
from utils.logger import create_logger


def create_app():
    app = Flask(__name__)
    app.config.from_object(ProductionConfig)
    app.logger = create_logger(__name__)
    register_extensions(app)
    return app


def register_extensions(app):
    db.init_app(app)
    api.init_app(app)    #, doc=False, add_specs=False
    migrate.init_app(app, db)
    login.init_app(app)
