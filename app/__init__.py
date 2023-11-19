from flask import Flask
import config
from .extensions import api, security
from . import route
from . import model
from utils.logger import create_logger
from app.security import setup_security


def create_app(config_string: str = "development") -> Flask:
    config_object = config.get_config(config_string)
    app: Flask = Flask(__name__)
    app.config.from_object(config_object)
    app.logger = create_logger(__name__)
    register_extensions(app)
    return app


def register_extensions(app: Flask) -> None:
    api.init_app(app)    #, doc=False, add_specs=False
    security.init_app(app)
    setup_security(app, security)
