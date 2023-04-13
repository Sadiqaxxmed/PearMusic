from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey


class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    coverImage = db.Column(db.String, nullable=False)
    mp3file = db.Column(db.String, nullable=False)
    duration = db.Column(db.Float, nullable=False)
    artistName = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')))
    album_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('albums.id')))
    playlist_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('playlists.id')))

    user = db.relationship("User", back_populates='songs')
    album = db.relationship('Album', back_populates='songs')
    playlist = db.relationship('Playlist', back_populates='songs')

    likes = db.relationship('User', secondary='liked_songs', back_populates='likes')


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
