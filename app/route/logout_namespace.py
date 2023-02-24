from flask_restx import Namespace, Resource, fields
from utils.logger import create_logger
from flask_login import logout_user, login_required, current_user

api = Namespace('logout', description='Logout related operations')
api.logger = create_logger(__name__)

logout_model = api.model('logout_model', {"id": fields.Integer,
                                          "email": fields.String})


# noinspection PyArgumentList
class Logout(Resource):
    @api.marshal_with(logout_model)
    @login_required
    def get(self):
        user = {
            "id": current_user.id,
            "email": current_user.email
        }
        logout_user()
        return user, 200


api.add_resource(Logout, '/')
