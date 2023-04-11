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
    artistName = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    album_id = db.Column(db.Integer, ForeignKey('users.id'))

    db.relationship("User", primaryjoin="User.id == Song.user_id")
    db.relationship("User", primaryjoin="User.id == Album.owner_id")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'coverImage': self.coverImage,
            'mp3file': self.mp3file,
            'duration': self.duration,
            'user_id': self.user_id,
            'album_id': self.album_id,
            'artistName': self.artistName
        }
