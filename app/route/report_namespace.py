from flask_login import login_required
from flask_restx import Namespace, Resource
from ..model import PublicationsModel
from utils.logger import create_logger
from app.core.report_creator import create_report
from app.model import db_session
from flask import send_file

api = Namespace('report', description='Report related operations')
api.logger = create_logger(__name__)


# noinspection PyArgumentList
class Report(Resource):
    @login_required
    def get(self):
        pubs = db_session.query(PublicationsModel).all()
        filename = create_report(
            publications=pubs
        )
        return send_file(
            filename,
            as_attachment=True
        )


api.add_resource(Report, '/')
