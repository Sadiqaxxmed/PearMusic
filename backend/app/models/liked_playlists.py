from .db import db, add_prefix_for_prod, SCHEMA, environment

liked_playlists = db.Table('liked_playlists',
    db.Column('owner_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('playlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True)
)

if environment == "production":
    liked_playlists.schema = SCHEMA