from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Song(db.Model):
    __tablname__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    coverImage = db.Column(db.String, nullable=False)
    mp3file = db.Column(db.String, nullable=False )
    duration = db.Column(db.Float, nullable=False)
    userId = db.relationship('User', backref='song', lazy=True)
    albumId = db.relationship('Album', backref='song', lazy=True)


# EXAMPLE
# books = db.relationship('Book', backref='author', lazy=True)
