from flask_login import login_required
from flask_restx import Namespace, Resource
from ..model import Publication, Article, Thesis, Monograph
from utils.logger import create_logger
from app.core.report_creator import create_report
from flask import send_file

api = Namespace('report', description='Report related operations')
api.logger = create_logger(__name__)


# noinspection PyArgumentList
class Report(Resource):
    @login_required
    def get(self):
        pubs = Publication.query.all()
        articles = Article.query.all()
        theses = Thesis.query.all()
        monographs = Monograph.query.all()
        filename = create_report(
            publications=pubs + articles + theses + monographs
        )
        return send_file(
            filename,
            as_attachment=True
        )


api.add_resource(Report, '/')
