from flask_restx import Namespace, Resource, fields
from utils.logger import create_logger

api = Namespace('home', description='User related operations')
api.logger = create_logger(__name__)

home_model = api.model('home_model', {
    "response": fields.String,
    "error": fields.String
})


class Home(Resource):
    @api.marshal_with(home_model, skip_none=True)
    def get(self):
        api.logger.info("Access to home resource...")
        response = {"response": "Hello there!",
                    "error": None}
        return response, 200


api.add_resource(Home, '')
