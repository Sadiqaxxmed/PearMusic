from .db import db

liked_playlists = db.Table('liked_playlists',
    db.Column('owner_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id'), primary_key=True)
)
