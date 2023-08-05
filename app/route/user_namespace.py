from flask_login import login_required
from flask_restx import Namespace, Resource, fields
from flask_restx import reqparse
from utils.logger import create_logger
from ..model import UserModel, db_session

api = Namespace('users', description='User related operations')
api.logger = create_logger(__name__)

user_id_parser = reqparse.RequestParser()
user_id_parser.add_argument('firstname', help='User firstname', required=True)
user_id_parser.add_argument('lastname', help='User lastname', required=True)
user_id_parser.add_argument('email', help='User email', required=True)

user_model = api.model('user_model', {"firstname": fields.String,
                                      "lastname": fields.String,
                                      "email": fields.String})

user_id_model = api.model('user_id_model', {
    "response": fields.String,
    "user": fields.Nested(user_model),
    "error": fields.String
})


# noinspection PyArgumentList
class Users(Resource):
    @api.marshal_list_with(user_model)
    @login_required
    def get(self):
        users = UserModel.query.all()
        return users

    @api.marshal_with(user_id_model)
    @api.expect(user_id_parser)
    @login_required
    def post(self):
        args = user_id_parser.parse_args()
        user = UserModel(firstname=args.get('firstname'),
                         lastname=args.get('lastname'),
                         email=args.get('email'))
        error = user.save_db()
        response = {"response": f"User with id {user.id}",
                    "user": user,
                    "error": error}
        return response, 201


class UserId(Resource):
    @api.marshal_with(user_id_model, skip_none=True)
    @login_required
    def get(self, uid):
        user = UserModel.query.filter_by(id=uid).first()
        response = {"response": f"User with id {uid}",
                    "user": user,
                    "error": None}
        return response, 200

    @api.marshal_with(user_id_model, skip_none=True)
    @login_required
    def put(self, uid):
        args = user_id_parser.parse_args()
        user = UserModel.query.filter_by(id=uid).first()
        if user is None:
            return user, 404
        user.first_name = args.get('firstname')
        user.last_name = args.get('lastname')
        user.email = args.get('email')
        error = user.update_db()
        response = {"response": f"Updated user with id {uid}",
                    "user": user,
                    "error": error}
        return response, 200

    @api.marshal_with(user_id_model)
    @login_required
    def delete(self, uid):
        user = None
        error = None
        try:
            user = UserModel.query.filter_by(id=uid).first()
            if user is not None:
                db_session.delete(user)
                db_session.commit()
        except Exception as e:
            error = str(e)
        response = {"response": f"User with id {uid} successfully deleted.",
                    "user": user,
                    "error": error}
        return response


api.add_resource(Users, '/')
api.add_resource(UserId, '/<int:uid>')
