from .extensions import db, login
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from sqlalchemy.dialects.postgresql import ARRAY


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class DbOps:
    def save_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as e:
            return str(e)
        return None

    def update_db(self):
        try:
            db.session.commit()
        except Exception as e:
            return str(e)
        return None

    def update(self, json_data):
        for key, value in json_data.items():
            if hasattr(self, key):
                setattr(self, key, value)


class User(db.Model, DbOps, UserMixin):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(1000), index=True, unique=True)
    firstname = db.Column(db.String(1000))
    lastname = db.Column(db.String(1000))
    middlename = db.Column(db.String(1000))
    degree = db.Column(db.String(1000))
    position = db.Column(db.String(1000))
    password_hash = db.Column(db.String(1000))
    publications = db.relationship("Publication", backref="user")
    articles = db.relationship("Article", backref="user")
    theses = db.relationship("Thesis", backref="user")
    monographs = db.relationship("Monograph", backref="user")

    def __repr__(self):
        return f"User {self.firstname} {self.lastname} " \
               f"with email {self.email} and id {self.id}"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def check_credentials(self):
        required = ['email', 'firstname', 'lastname', 'degree', 'position']
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

    __tablename__ = "publications"

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
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

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


class Article(db.Model, DbOps):

    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1000), unique=True, nullable=False)
    authors = db.Column(ARRAY(db.String(128)), nullable=False)
    journal = db.Column(db.Text)
    volume = db.Column(db.Integer)
    page = db.Column(db.Integer)
    doi = db.Column(db.String(1000), unique=True)
    isbn = db.Column(db.Text)
    date = db.Column(db.Date, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    financial_support = db.Column(db.Text)
    publisher = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"Article entitled {self.title} " \
               f"written by {self.authors}"

    @staticmethod
    def get_articles(user):
        error = None
        articles = []
        try:
            articles = user.articles
        except Exception as e:
            error = str(e)
        if error:
            return error
        response = []
        for p in articles:
            response.append({"title": p.title, "authors": p.authors, "journal": p.journal, "volume": p.volume,
                             "page": p.page, "doi": p.doi, "date": str(p.date),
                             "id": p.id})
        return response

    @staticmethod
    def delete_articles(ids):
        error = None
        try:
            Article.query.filter_by(id=ids).delete()
            db.session.commit()
        except Exception as e:
            error = str(e)
            return error
        return error


class Thesis(db.Model, DbOps):

    __tablename__ = "theses"

    id = db.Column(db.Integer, primary_key=True)
    title_book_of_abstracts = db.Column(db.String(1000), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    authors = db.Column(ARRAY(db.String(128)), nullable=False)
    page = db.Column(db.Integer)
    doi = db.Column(db.String(1000))
    url = db.Column(db.String(1000), nullable=False)
    date = db.Column(db.Date, nullable=False)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    financial_support = db.Column(db.Text, nullable=False)
    publisher = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"Thesis entitled {self.title} " \
               f"written by {self.authors}"

    @staticmethod
    def get_theses(user):
        error = None
        theses = []
        try:
            theses = user.theses
        except Exception as e:
            error = str(e)
        if error:
            return error
        response = []
        for p in theses:
            response.append({"title": p.title, "authors": p.authors,
                             "page": p.page, "doi": p.doi, "date": str(p.date),
                             "id": p.id})
        return response

    @staticmethod
    def delete_theses(ids):
        error = None
        try:
            Thesis.query.filter_by(id=ids).delete()
            db.session.commit()
        except Exception as e:
            error = str(e)
            return error
        return error


class Monograph(db.Model, DbOps):

    __tablename__ = "monographs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1000), nullable=False)
    authors = db.Column(ARRAY(db.String(128)), nullable=False)
    total_pages = db.Column(db.Integer)
    date = db.Column(db.Date, nullable=False)
    isbn = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow(), nullable=False)
    publisher = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"Monograph entitled {self.title} " \
               f"written by {self.authors}"

    @staticmethod
    def get_monographs(user):
        error = None
        monographs = []
        try:
            monographs = user.monographs
        except Exception as e:
            error = str(e)
        if error:
            return error
        response = []
        for p in monographs:
            response.append({"title": p.title, "authors": p.authors,
                             "page": p.page, "doi": p.doi, "date": str(p.date),
                             "id": p.id})
        return response

    @staticmethod
    def delete_monographs(ids):
        error = None
        try:
            Monograph.query.filter_by(id=ids).delete()
            db.session.commit()
        except Exception as e:
            error = str(e)
            return error
        return error
