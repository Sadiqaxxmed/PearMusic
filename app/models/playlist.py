from .db import db, environment, SCHEMA,add_prefix_for_prod
from sqlalchemy import ForeignKey



class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    # ownerId = db.relationship('User', backref='playlist', lazy=True)
    owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    db.relationship("User", primaryjoin="User.id == Playlist.owner_id")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'owner_id': self.owner_id,
        }
