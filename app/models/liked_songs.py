from .db import db, add_prefix_for_prod, environment, SCHEMA

liked_songs = db.Table('liked_songs',
    db.Column('owner_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), primary_key=True)
)

if environment == "production":
    liked_songs.schema = SCHEMA