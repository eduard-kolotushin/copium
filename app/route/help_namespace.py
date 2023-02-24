from flask_login import login_required
from flask_restx import Namespace, Resource, fields
from ..extensions import api as app
from utils.logger import create_logger

api = Namespace('help', description='User related operations')
api.logger = create_logger(__name__)


class Help(Resource):
    @login_required
    def get(self):
        """Print all defined routes and their endpoint docstrings

        This also handles flask-router, which uses a centralized scheme
        to deal with routes, instead of defining them as a decorator
        on the target function.
        """
        api.logger.info("Start getting help")
        routes = []
        for view_type, ns, paths, endpoints in app.resources:
            routes.append({
                "view class": str(view_type.__name__),
                "namespace": ns.name,
                "paths": paths,
                "endpoints": endpoints
            })

        return routes


api.add_resource(Help, '')
