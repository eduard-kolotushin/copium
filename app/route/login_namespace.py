from flask_restx import Namespace, Resource, fields
from ..model import User
from flask_restx import reqparse
from utils.logger import create_logger
from flask_login import login_user, login_required, current_user

api = Namespace('login', description='Login related operations')
api.logger = create_logger(__name__)

login_parser = reqparse.RequestParser()
login_parser.add_argument('email', help='Login email', required=True)
login_parser.add_argument('password', help='Login password', required=True)

login_model = api.model('login_model', {"id": fields.Integer,
                                        "email": fields.String})


# noinspection PyArgumentList
class Login(Resource):
    @api.marshal_with(login_model, skip_none=True)
    @login_required
    def get(self):
        if current_user.is_authenticated:
            return current_user, 200
        else:
            return current_user, 401

    @api.marshal_with(login_model, skip_none=True)
    @api.expect(login_parser)
    def post(self):
        args = login_parser.parse_args()
        email = args.get('email')
        password = args.get('password')
        user = User.query.filter_by(email=email).first()
        if user is None:
            return {"result": f"Not found user with email {email}"}, 404
        if user.check_password(password=password):
            login_user(user)
            filled, to_fill = user.check_credentials()
            if to_fill:
                return {"result": "Successfully logged in, need specify some credentials.",
                        "to_fill": to_fill, "filled": filled}, 200
            else:
                return {"result": "Successfully logged in!"}, 200
        else:
            return {"result": "Wrong password"}, 401


api.add_resource(Login, '/')
