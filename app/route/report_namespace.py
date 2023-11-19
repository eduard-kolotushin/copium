from flask import send_file
from flask_login import login_required
from flask_restx import Namespace, Resource

from app.core.report_creator import create_report
from utils.logger import create_logger
from ..core.publication_operations import publication_operations

api = Namespace('report', description='Report related operations')
api.logger = create_logger(__name__)


class Report(Resource):
    @login_required
    def get(self):
        pubs = publication_operations.get_all_publications()
        if not isinstance(pubs, list):
            return {
                "error": "Couldn't get publications for the report",
                "description": pubs
            }
        filename = create_report(
            publications=pubs
        )
        return send_file(
            filename,
            as_attachment=True
        )


api.add_resource(Report, '/')
