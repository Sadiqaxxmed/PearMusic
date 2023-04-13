from .db import db, environment, SCHEMA,add_prefix_for_prod
from sqlalchemy import ForeignKey

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    comment = db.Column(db.String(1000), nullable=False)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    comment_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('playlists.id')))


    user = db.relationship('User', back_populates='comments')
    playlist = db.relationship('Playlist', back_populates='comments')
