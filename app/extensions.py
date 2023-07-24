from flask_restx import Api
from flask_login import LoginManager

api = Api(
    version="1.0",
    title="Copium project",
    description="Copium project is created in order to maintain peace in the world...",
    prefix="/api",
    doc="/api/doc"
)
login = LoginManager()
