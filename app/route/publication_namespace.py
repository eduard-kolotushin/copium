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
                                                    "date": fields.Date,
                                                    "uploaded_by": fields.String,
                                                    "uploaded_from": fields.String,
                                                    "authors_ids": fields.List(fields.String),
                                                    "affilations": fields.String,
                                                    "topics": fields.List(fields.String),
                                                    "publisher": fields.String,
                                                    "journal": fields.String,
                                                    "volume": fields.Integer,
                                                    "page": fields.String,
                                                    "isbn": fields.String,
                                                    "doi": fields.String,
                                                    "abstract": fields.String,
                                                    "rinc_id": fields.String,
                                                    "issn": fields.String,
                                                    "web_of_science_id": fields.String,
                                                    "astrophysics_data_system_id": fields.String,
                                                    "mathscinet_id": fields.String,
                                                    "zbmath_id": fields.String,
                                                    "chemical_abstaracts_id": fields.String,
                                                    "springer_id": fields.String,
                                                    "agris_id": fields.String,
                                                    "georef_id": fields.String,
                                                    "scopus_id": fields.String,
                                                    "pubmed_id": fields.String,
                                                    "edn_id": fields.String,
                                                    "created": fields.Date,
                                                    "publication_type": fields.String})


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
