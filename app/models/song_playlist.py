from .db import db, add_prefix_for_prod, SCHEMA, environment

playlist_songs = db.Table('playlist_songs',
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    playlist_songs.schema = SCHEMA
