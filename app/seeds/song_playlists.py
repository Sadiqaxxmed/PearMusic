from app.models import db, playlist_songs, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want

def seed_song_playlists():
    playlist_songs_data = [
        {'playlist_id': 1, 'song_id': 1},
        {'playlist_id': 1, 'song_id': 2},
        {'playlist_id': 1, 'song_id': 3},
        {'playlist_id': 2, 'song_id': 4},
        {'playlist_id': 2, 'song_id': 5},
        {'playlist_id': 3, 'song_id': 6}
    ]


    playlist_songs_rows = []
    for data in playlist_songs_data:
        playlist_songs_rows.append(data)
    db.session.execute(playlist_songs.insert().values(playlist_songs_rows))
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_song_playlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
