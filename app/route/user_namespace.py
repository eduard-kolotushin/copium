from flask_restx import Namespace, Resource, fields
from flask_restx import reqparse
from flask_security import auth_required, roles_required

from utils.logger import create_logger
from ..core.user_operations import user_operations

api = Namespace('users', description='User related operations')
api.logger = create_logger(__name__)

user_id_parser = reqparse.RequestParser()
user_id_parser.add_argument('firstname', help='User firstname', required=True)
user_id_parser.add_argument('lastname', help='User lastname', required=True)
user_id_parser.add_argument('email', help='User email', required=True)
user_id_parser.add_argument('password', help='User password')
user_id_parser.add_argument('roles', help='User roles', location='json', type=list)

user_model = api.model('user_model', {"firstname": fields.String,
                                      "lastname": fields.String,
                                      "email": fields.String})

user_id_model = api.model('user_id_model', {
    "response": fields.String,
    "user": fields.Nested(user_model),
    "error": fields.String
})


class Users(Resource):
    @api.marshal_list_with(user_model)
    @auth_required("session")
    @roles_required("admin")
    def get(self):
        users = user_operations.get_users_by_filter()
        return users

    @api.marshal_with(user_id_model)
    @api.expect(user_id_parser)
    @auth_required("session")
    @roles_required("admin")
    def post(self):
        args = user_id_parser.parse_args()
        user = user_operations.create_user(args)
        response = {
            "response": "User created",
            "user": user
        }
        return response, 201


class UserId(Resource):
    @api.marshal_with(user_id_model, skip_none=True)
    @auth_required("session")
    @roles_required("admin")
    def get(self, uid):
        user = user_operations.get_user_by_id(uid)
        response = {"response": f"User with id {uid}",
                    "user": user,
                    "error": None}
        return response, 200

    @api.marshal_with(user_id_model, skip_none=True)
    @auth_required("session")
    @roles_required("admin")
    def put(self, uid):
        args = user_id_parser.parse_args()
        user = user_operations.update_user(uid, args)
        response = {
            "response": f"Updated user",
            "user": user
        }
        return response, 200

    @api.marshal_with(user_id_model)
    @auth_required("session")
    @roles_required("admin")
    def delete(self, uid):
        user = user_operations.delete_user(uid)
        response = {
            "response": f"User with id {uid} successfully deleted.",
            "user": user
        }
        return response


api.add_resource(Users, '/')
api.add_resource(UserId, '/<int:uid>')
