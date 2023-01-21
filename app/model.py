from .extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    lastname = db.Column(db.String)
    email = db.Column(db.String)

    def __repr__(self):
        return f"User {self.username} {self.lastname} " \
               f"with email {self.email} and id {self.id}"


class Publication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    authors = db.Column(db.String, nullable=False)
    affiliations = db.Column(db.String)
    doi = db.Column(db.String)
    summary = db.Column(db.Text)

    def __repr__(self):
        return f"Publication entitled {self.title} " \
               f"written by {self.authors}"
