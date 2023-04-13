from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey


class Album(db.Model):
  __tablename__ = 'albums'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=True)
  coverImage = db.Column(db.String, nullable=False)
  owner_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
  # db.relationship("User", primaryjoin="User.id == Album.owner_id")
  user = db.relationship('User', back_populates="albums")
  songs = db.relationship('Song', back_populates='album')

  def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'coverImage': self.coverImage,
            'owner_id': self.owner_id,
        }
