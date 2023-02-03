from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()
api = Api(
    version="1.0",
    title="Copium project",
    description="Copium project is created in order to maintain peace in the world...",
    prefix="/api",
    doc="/api/doc"
)
migrate = Migrate()
login = LoginManager()
