from flask_restx import Namespace, Resource, fields
from ..extensions import db
from ..model import Publication
from flask_restx import reqparse
from utils.logger import create_logger

api = Namespace('publications', description='Publication related operations')
api.logger = create_logger(__name__)

publication_parser = reqparse.RequestParser()
publication_parser.add_argument('title', help='Publication title', required=True)
publication_parser.add_argument('authors', help='Publication authors', required=True)
publication_parser.add_argument('affiliations', help='Publication affiliations')
publication_parser.add_argument('doi', help='Publication doi')
publication_parser.add_argument('summary', help='Publication summary')

publication_model = api.model('publication_model', {"id": fields.Integer,
                                                    "title": fields.String,
                                                    "authors": fields.String})


class Publications(Resource):
    @api.marshal_list_with(publication_model)
    def get(self):
        pubs = Publication.query.all()
        return pubs

    @api.marshal_with(publication_model)
    @api.expect(publication_parser)
    def post(self):
        args = publication_parser.parse_args()
        api.logger.info(f"Create publication with properties {args}")
        pub = Publication(title=args.get('title'),
                          authors=args.get('authors'),
                          affiliations=args.get('affiliations'),
                          doi=args.get('doi'),
                          summary=args.get('summary'))
        db.session.add(pub)
        db.session.commit()
        return pub, 201


class PublicationsId(Resource):
    @api.marshal_with(publication_model, skip_none=True)
    def get(self, pid):
        pub = Publication.query.filter_by(id=pid).first()
        return pub, 200

    @api.marshal_with(publication_model, skip_none=True)
    def put(self, pid):
        args = publication_parser.parse_args()
        pub = Publication.query.filter_by(id=pid).first()
        if pub is None:
            return pub, 404
        pub.title = args.get('title') if args.get('title') is not None else pub.title
        pub.authors = args.get('authors') if args.get('authors') is not None else pub.authors
        pub.affiliations = args.get('affiliations') if args.get('affiliations') is not None else pub.affiliations
        pub.doi = args.get('doi') if args.get('doi') is not None else pub.doi
        pub.summary = args.get('summary') if args.get('summary') is not None else pub.summary
        db.session.commit()
        return pub, 200

    @api.marshal_with(publication_model)
    def delete(self, pid):
        pub = None
        try:
            pub = Publication.query.filter_by(id=pid).first()
            if pub is not None:
                db.session.delete(pub)
                db.session.commit()
        except Exception as e:
            error = str(e)
            api.logger.error(error)
        return pub


api.add_resource(Publications, '/')
api.add_resource(PublicationsId, '/<int:pid>')
