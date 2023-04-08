from .db import db
from sqlalchemy import ForeignKey

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer(), primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    # owner_id = db.relationship('User', backref='comment', lazy=True)
    # playlist_id = db.relationship('Playlist', backref='comment', lazy=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'))
    db.relationship("User", primaryjoin="User.id == Comment.owner_id")
    db.relationship("Playlist", primaryjoin="User.id == Playlist.owner_id")
