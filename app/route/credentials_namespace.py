from flask_login import login_required, current_user
from flask_restx import Namespace, Resource, fields
from flask_restx import reqparse
from utils.logger import create_logger

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
    @login_required
    def get(self):
        return current_user, 200

    @api.expect(credentials_parser)
    @login_required
    def post(self):
        args = credentials_parser.parse_args()
        firstname = args.get('firstname')
        middlename = args.get('middlename')
        lastname = args.get('lastname')
        degree = args.get('degree')
        position = args.get('position')
        current_user.firstname = firstname
        current_user.middlename = middlename
        current_user.lastname = lastname
        current_user.degree = degree
        current_user.position = position
        error = current_user.update_db()
        if error:
            return {"result": f"Error: {error}"}, 500
        else:
            return {"result": f"Success"}, 200


api.add_resource(Credentials, '/')
