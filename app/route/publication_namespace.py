from flask import request
from flask_restx import Namespace, Resource, fields
from flask_security import auth_required, current_user

from utils.logger import create_logger
from ..core.publication_operations import publication_operations

api = Namespace('publications', description='Publication related operations')
api.logger = create_logger(__name__)

publication_model = api.model('publication_model', {"id": fields.Integer,
                                                    "title": fields.String,
                                                    "authors": fields.List(fields.String),
                                                    "date": fields.Date})


class Publications(Resource):
    @api.marshal_list_with(publication_model)
    @auth_required("session")
    def get(self):
        pubs = publication_operations.get_all_publications()
        return pubs

    @api.marshal_with(publication_model)
    @auth_required("session")
    def post(self):
        args = request.get_json()
        args["user_id"] = current_user.id
        api.logger.info(f"Create publication with properties {args}")
        publication = publication_operations.create_publication(args)
        return publication, 201


class PublicationsId(Resource):
    @api.marshal_with(publication_model, skip_none=True)
    @auth_required("session")
    def get(self, pid):
        pub = publication_operations.get_publication_by_id(pid)
        return pub, 200

    @api.marshal_with(publication_model, skip_none=True)
    @auth_required("session")
    def put(self, pid):
        args = request.get_json()
        api.logger.info(f"Update publication with properties {args}")
        pub = publication_operations.update_publication(pid, args)
        return pub, 200

    @api.marshal_with(publication_model)
    @auth_required("session")
    def delete(self, pid):
        publication_operations.delete_publications([pid])
        return "", 204


api.add_resource(Publications, '/')
api.add_resource(PublicationsId, '/<int:pid>')
