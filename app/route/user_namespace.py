from flask_restx import Namespace, Resource, fields
from ..extensions import db
from ..model import User
from flask_restx import reqparse
from utils.logger import create_logger

api = Namespace('users', description='User related operations')
api.logger = create_logger(__name__)

user_id_parser = reqparse.RequestParser()
user_id_parser.add_argument('first_name', help='User firstname', required=True)
user_id_parser.add_argument('last_name', help='User lastname', required=True)
user_id_parser.add_argument('email', help='User email', required=True)

user_model = api.model('user_model', {"first_name": fields.String,
                                      "last_name": fields.String,
                                      "email": fields.String})

user_id_model = api.model('user_id_model', {
    "response": fields.String,
    "user": fields.Nested(user_model),
    "error": fields.String
})


# noinspection PyArgumentList
class Users(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        users = User.query.all()
        return users

    @api.marshal_with(user_id_model)
    @api.expect(user_id_parser)
    def post(self):
        args = user_id_parser.parse_args()
        user = User(first_name=args.get('first_name'),
                    last_name=args.get('last_name'),
                    email=args.get('email'))
        error = user.save_db()
        response = {"response": f"User with id {user.id}",
                    "user": user,
                    "error": error}
        return response, 201


class UserId(Resource):
    @api.marshal_with(user_id_model, skip_none=True)
    def get(self, uid):
        user = User.query.filter_by(id=uid).first()
        response = {"response": f"User with id {uid}",
                    "user": user,
                    "error": None}
        return response, 200

    @api.marshal_with(user_id_model, skip_none=True)
    def put(self, uid):
        args = user_id_parser.parse_args()
        user = User.query.filter_by(id=uid).first()
        if user is None:
            return user, 404
        user.first_name = args.get('first_name')
        user.last_name = args.get('last_name')
        user.email = args.get('email')
        error = user.update_db()
        response = {"response": f"Updated user with id {uid}",
                    "user": user,
                    "error": error}
        return response, 200

    @api.marshal_with(user_id_model)
    def delete(self, uid):
        user = None
        error = None
        try:
            user = User.query.filter_by(id=uid).first()
            if user is not None:
                db.session.delete(user)
                db.session.commit()
        except Exception as e:
            error = str(e)
        response = {"response": f"User with id {uid} successfully deleted.",
                    "user": user,
                    "error": error}
        return response


api.add_resource(Users, '/')
api.add_resource(UserId, '/<int:uid>')
