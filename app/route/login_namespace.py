from flask_restx import Namespace, Resource, fields
from flask_restx import reqparse
from flask_security import current_user, auth_required, roles_required

from utils.logger import create_logger
from ..core.user_operations import user_operations

api = Namespace('login', description='Login related operations')
api.logger = create_logger(__name__)

login_parser = reqparse.RequestParser()
login_parser.add_argument('email', help='Login email', required=True)
login_parser.add_argument('password', help='Login password', required=True)

login_model = api.model('login_model', {"id": fields.Integer,
                                        "email": fields.String})


class Login(Resource):
    @api.marshal_with(login_model, skip_none=True)
    @auth_required("session")
    @roles_required("admin")
    def get(self):
        if current_user.is_authenticated:
            return current_user, 200
        else:
            return current_user, 401

    @api.marshal_with(login_model, skip_none=True)
    @api.expect(login_parser)
    def post(self):
        args: dict = login_parser.parse_args()
        email = args.get('email')
        password = args.get('password')
        user_operations.try_login_user(email=email, password=password)


api.add_resource(Login, '/')
