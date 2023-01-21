from flask_restx import Namespace, Resource, fields
from ..extensions import db
from ..model import User
from flask_restx import reqparse

api = Namespace('users', description='User related operations')

user_id_parser = reqparse.RequestParser()
user_id_parser.add_argument('username', help='User name', required=True)
user_id_parser.add_argument('lastname', help='User lastname', required=True)
user_id_parser.add_argument('email', help='User email', required=True)

user_model = api.model('user_model', {"username": fields.String,
                                      "lastname": fields.String,
                                      "email": fields.String})

user_id_model = api.model('user_id_model', {
    "response": fields.String,
    "user": fields.Nested(user_model),
    "error": fields.String
})


class Users(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        users = User.query.all()
        return users

    @api.marshal_with(user_id_model)
    @api.expect(user_id_parser)
    def post(self):
        args = user_id_parser.parse_args()
        user = User(username=args.get('username'),
                    lastname=args.get('lastname'),
                    email=args.get('email'))
        db.session.add(user)
        db.session.commit()
        response = {"response": f"User with id {user.id}",
                    "user": user,
                    "error": None}
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
        user.username = args.get('username')
        user.lastname = args.get('lastname')
        user.email = args.get('email')
        db.session.commit()
        response = {"response": f"Updated user with id {uid}",
                    "user": user,
                    "error": None}
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
