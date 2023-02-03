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
publication_parser.add_argument('journal', help='Publication journal')
publication_parser.add_argument('volume', help='Publication volume')
publication_parser.add_argument('page', help='Publication page')
publication_parser.add_argument('doi', help='Publication doi')
publication_parser.add_argument('abstract', help='Publication abstract')
publication_parser.add_argument('date', help='Publication date')
publication_parser.add_argument('p_type', help='Publication type')

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
                          journal=args.get('journal'),
                          volume=args.get('volume'),
                          page=args.get('page'),
                          doi=args.get('doi'),
                          abstract=args.get('abstract'),
                          date=args.get('date'),
                          publication_type=args.get('p_type'))
        pub.save_db()
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

        api.logger.info(f"Update publication with properties {args}")

        pub.title = args.get('title') if args.get('title') is not None else pub.title
        pub.authors = args.get('authors') if args.get('authors') is not None else pub.authors
        pub.journal = args.get('journal') if args.get('journal') is not None else pub.journal
        pub.volume = args.get('volume') if args.get('volume') is not None else pub.volume
        pub.page = args.get('page') if args.get('page') is not None else pub.page
        pub.doi = args.get('doi') if args.get('doi') is not None else pub.doi
        pub.abstract = args.get('abstract') if args.get('abstract') is not None else pub.abstract
        pub.date = args.get('date') if args.get('date') is not None else pub.date
        pub.publication_type = args.get('p_type') if args.get('p_type') is not None else pub.publication_type

        pub.update_db()
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
