from flask_restx import Namespace, Resource, fields
from flask_security import logout_user, auth_required, current_user

from utils.logger import create_logger

api = Namespace('logout', description='Logout related operations')
api.logger = create_logger(__name__)

logout_model = api.model('logout_model', {"id": fields.Integer,
                                          "email": fields.String})


class Logout(Resource):
    @api.marshal_with(logout_model)
    @auth_required("session")
    def get(self):
        user = {
            "id": current_user.id,
            "email": current_user.email
        }
        logout_user()
        return user, 200


api.add_resource(Logout, '/')
