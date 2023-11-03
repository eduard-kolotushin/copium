from werkzeug.exceptions import HTTPException


class CopiumCoreException(Exception):
    _description: str

    def __init__(self, description: str):
        super().__init__()
        self._description = description

    @property
    def description(self):
        return self._description


class CopiumHttpException(HTTPException):
    headers: dict = {}


def handle_copium_http_error(error):
    return {'message': error.description}, error.code, error.headers
