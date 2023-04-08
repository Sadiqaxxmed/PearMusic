from .db import db
from sqlalchemy import ForeignKey

class Album(db.Model):
  __tablename__ = 'albums'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=True)
  # owner_id = db.relationship('User', backref='album', lazy=True)
  owner_id = db.Column(db.Integer, ForeignKey('users.id'))
  db.relationship("User", primaryjoin="User.id == Album.owner_id")
