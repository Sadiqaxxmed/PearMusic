from .db import db
from sqlalchemy import ForeignKey


class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    coverImage = db.Column(db.String, nullable=False)
    mp3file = db.Column(db.String, nullable=False)
    duration = db.Column(db.Float, nullable=False)

    # userId = db.relationship('User', backref='song', lazy=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    db.relationship("User", primaryjoin="User.id == Song.user_id")
    # albumId = db.relationship('Album', backref='song', lazy=True)
    album_id = db.Column(db.Integer, ForeignKey('users.id'))
    db.relationship("User", primaryjoin="User.id == Album.owner_id")
