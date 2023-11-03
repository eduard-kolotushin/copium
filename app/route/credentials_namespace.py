from flask_restx import Namespace, Resource, fields
from flask_restx import reqparse
from flask_security import auth_required, current_user

from utils.logger import create_logger
from ..core.user_operations import user_operations

api = Namespace('credentials', description='Credentials related operations')
api.logger = create_logger(__name__)

credentials_parser = reqparse.RequestParser()
credentials_parser.add_argument('firstname')
credentials_parser.add_argument('middlename')
credentials_parser.add_argument('lastname')
credentials_parser.add_argument('degree')
credentials_parser.add_argument('position')

credentials_model = api.model('credentials_model', {"firstname": fields.String,
                                                    "middlename": fields.String,
                                                    "lastname": fields.String,
                                                    "degree": fields.String,
                                                    "position": fields.String})


class Credentials(Resource):

    @api.marshal_with(credentials_model)
    @auth_required("session")
    def get(self):
        return current_user, 200

    @api.expect(credentials_parser)
    @api.marshal_with(credentials_model)
    @auth_required("session")
    def post(self):
        args = credentials_parser.parse_args()
        user = user_operations.update_user(current_user.id, args)
        return user, 200


api.add_resource(Credentials, '/')
