from .db import db
from sqlalchemy import ForeignKey

class Album(db.Model):
  __tablename__ = 'albums'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=True)
  coverImage = db.Column(db.String, nullable=False)
  owner_id = db.Column(db.Integer, ForeignKey('users.id'))
  db.relationship("User", primaryjoin="User.id == Album.owner_id")

  def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'coverImage': self.coverImage,
            'owner_id': self.owner_id,
        }
