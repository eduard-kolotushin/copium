from app import create_app
import logging
import os


if __name__ == '__main__':
    app = create_app(os.getenv("FLASK_ENV", default="development"))
    loggers = [logging.getLogger(name) for name in logging.root.manager.loggerDict]
    app.run()
