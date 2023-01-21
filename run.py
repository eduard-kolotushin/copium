from app import create_app
import logging
import os


if __name__ == '__main__':
    app = create_app()
    loggers = [logging.getLogger(name) for name in logging.root.manager.loggerDict]
    app.run()
