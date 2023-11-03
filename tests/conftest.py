import datetime

import pytest

from app import create_app
from app.model import UserModel, PublicationsModel, db_session


# noinspection PyArgumentList
@pytest.fixture()
def app():
    app = create_app(config_string="testing")
    with app.app_context():
        db_session.drop_all()
        db_session.create_all()
        admin = UserModel(
            email='ekolotushin@gmoil.cam',
            firstname='Egor',
            lastname='Kolotushin',
            middlename='Vladimirovich',
            degree='PhD',
            position='Assistant Professor',
        )
        admin.set_password("admin")
        db_session.add(admin)
        db_session.add(UserModel(
            email='drodionov@gmoil.cim',
            firstname='Danil',
            lastname='Rodionov',
            middlename='Vladimirovich',
            degree='PhD',
            position='Assistant Professor',
        ))
        db_session.add(PublicationsModel(
            title='Wow paper',
            authors=['Egor Kolotushin', 'Danil Rodionov'],
            journal='Nature',
            volume=2,
            page=1,
            doi='Test doi',
            abstract='Test abstract',
            date=datetime.datetime(2020, 1, 1),
            publication_type='Article',
        ))
        db_session.commit()
    yield app
    with app.app_context():
        db_session.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()
