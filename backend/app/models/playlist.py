from .db import db
from sqlalchemy import ForeignKey


class Playlist(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    # ownerId = db.relationship('User', backref='playlist', lazy=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'))
    db.relationship("User", primaryjoin="User.id == Playlist.owner_id")
