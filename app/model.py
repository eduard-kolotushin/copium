from .extensions import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class DbOps:
    def save_db(self):
        try:
            db.session.add(self)
            db.session.commit()
            return None
        except Exception as e:
            return str(e)

    def update_db(self):
        try:
            db.session.commit()
            return None
        except Exception as e:
            return str(e)

    def update(self, json_data):
        for key, value in json_data.items():
            if hasattr(self, key):
                setattr(self, key, value)


class User(db.Model, DbOps, UserMixin):

    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    first_name = db.Column(db.String(1000))
    last_name = db.Column(db.String(1000))
    second_name = db.Column(db.String(1000))
    degree = db.Column(db.String(1000))
    position = db.Column(db.String(1000))
    password_hash = db.Column(db.String(128))
    publications = db.relationship("Publication", backref="user")

    def __repr__(self):
        return f"User {self.first_name} {self.last_name} " \
               f"with email {self.email} and id {self.id}"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def check_credentials(self):
        required = ['email', 'first_name', 'last_name', 'degree', 'position']
        to_fill = []
        filled = dict()
        for field in required:
            attr = getattr(self, field)
            if attr is None or attr == "":
                to_fill.append(field)
            else:
                filled[field] = attr
        return filled, to_fill


class Publication(db.Model, DbOps):

    __tablename__ = "publication"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1000), unique=True, nullable=False)
    authors = db.Column(db.Text, nullable=False)
    journal = db.Column(db.Text)
    volume = db.Column(db.Integer)
    page = db.Column(db.Integer)
    doi = db.Column(db.String(1000), unique=True)
    abstract = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    publication_type = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __repr__(self):
        return f"Publication entitled {self.title} " \
               f"written by {self.authors}"

    @staticmethod
    def get_publications(user):
        error = None
        publications = []
        try:
            publications = Publication.query.filter_by(user_id=user.id).all()
        except Exception as e:
            error = str(e)
        if error:
            return error
        response = []
        for p in publications:
            response.append({"title": p.title, "authors": p.authors, "journal": p.journal, "volume": p.volume,
                             "page": p.page, "doi": p.doi, "date": str(p.date),
                             "p_type": p.publication_type, "id": p.id})
        return response

    @staticmethod
    def delete_publications(ids):
        error = None
        try:
            publication = Publication.query.filter_by(id=ids).first()
            db.session.delete(publication)
            db.session.commit()
        except Exception as e:
            error = str(e)
            return error
        return error
