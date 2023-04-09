import pytest
from app import create_app
from app.extensions import db
from app.model import User, Publication
import datetime


# noinspection PyArgumentList
@pytest.fixture()
def app():
    app = create_app(config_string="testing")
    with app.app_context():
        db.drop_all()
        db.create_all()
        admin = User(
            email='ekolotushin@gmoil.cam',
            firstname='Egor',
            lastname='Kolotushin',
            middlename='Vladimirovich',
            degree='PhD',
            position='Assistant Professor',
        )
        admin.set_password("admin")
        db.session.add(admin)
        db.session.add(User(
            email='drodionov@gmoil.cim',
            firstname='Danil',
            lastname='Rodionov',
            middlename='Vladimirovich',
            degree='PhD',
            position='Assistant Professor',
        ))
        db.session.add(Publication(
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
        db.session.commit()
    yield app
    with app.app_context():
        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()
