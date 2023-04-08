from .db import db

liked_songs = db.Table('liked_songs',
    db.Column('owner_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id'), primary_key=True)
)
