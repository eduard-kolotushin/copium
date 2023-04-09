from flask_login import login_required, current_user
from flask_restx import Namespace, Resource, fields
from ..extensions import db
from ..model import Publication, Article, Thesis, Monograph
from ..core.publication_manufacture import PublicationFactory
from flask_restx import reqparse, inputs
from utils.logger import create_logger
import datetime

api = Namespace('publications', description='Publication related operations')
api.logger = create_logger(__name__)

publication_parser = reqparse.RequestParser()
publication_parser.add_argument('title', help='Publication title', required=True, type=str)
publication_parser.add_argument('authors', help='Publication authors', required=True, type=list, location='json')
publication_parser.add_argument('journal', help='Publication journal', type=str)
publication_parser.add_argument('volume', help='Publication volume', type=int)
publication_parser.add_argument('page', help='Publication page', type=int)
publication_parser.add_argument('doi', help='Publication doi', type=str)
publication_parser.add_argument('abstract', help='Publication abstract', type=str)
publication_parser.add_argument('date', help='Publication date', type=inputs.date_from_iso8601)
publication_parser.add_argument('p_type', help='Publication type', type=str)
publication_parser.add_argument('isbn', help='Publication isbn', type=str)
publication_parser.add_argument('financial_support', help='Publication financial support', type=str)
publication_parser.add_argument('publisher', help='Publication publisher', type=str)
publication_parser.add_argument('url', help='Publication url', type=str)
publication_parser.add_argument('title_book_of_abstracts', help='Publication title book of abstracts', type=str)
publication_parser.add_argument('total_pages', help='Publication total pages', type=int)

publication_model = api.model('publication_model', {"id": fields.Integer,
                                                    "title": fields.String,
                                                    "authors": fields.List(fields.String),
                                                    "date": fields.Date})


# noinspection PyArgumentList
class Publications(Resource):
    @api.marshal_list_with(publication_model)
    @login_required
    def get(self):
        pubs = Publication.query.all()
        articles = Article.query.all()
        theses = Thesis.query.all()
        monographs = Monograph.query.all()
        return pubs + articles + theses + monographs

    @api.marshal_with(publication_model)
    @api.expect(publication_parser)
    @login_required
    def post(self):
        args = publication_parser.parse_args()
        args["user_id"] = current_user.id
        api.logger.info(f"Create publication with properties {args}")
        pub = PublicationFactory.get_publication(args.get('p_type'), args)
        pub.save_db()
        return pub, 201


class PublicationsId(Resource):
    @api.marshal_with(publication_model, skip_none=True)
    @login_required
    def get(self, pid):
        pub = Publication.query.filter_by(id=pid).first()
        return pub, 200

    @api.marshal_with(publication_model, skip_none=True)
    @login_required
    def put(self, pid):
        args = publication_parser.parse_args()
        pub_cls = PublicationFactory.get_publication_cls(publication_type=args.get('p_type'))
        pub = pub_cls.query.filter_by(id=pid).first()
        if pub is None:
            return pub, 404

        api.logger.info(f"Update publication with properties {args}")

        pub.update(args)
        pub.update_db()
        return pub, 200

    @api.marshal_with(publication_model)
    @login_required
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
