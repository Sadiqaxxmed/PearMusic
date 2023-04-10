from app.models import db, liked_songs, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want

def seed_liked_songs():
    liked_songs_data = [
        {'owner_id': 1, 'song_id': 1},
        {'owner_id': 1, 'song_id': 2},
        {'owner_id': 1, 'song_id': 3},
        {'owner_id': 1, 'song_id': 4},
        {'owner_id': 1, 'song_id': 5},
        {'owner_id': 1, 'song_id': 6}
    ]


    liked_songs_rows = []
    for data in liked_songs_data:
        liked_songs_rows.append(data)
    db.session.execute(liked_songs.insert().values(liked_songs_rows))
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_liked_songs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.liked_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM liked_songs"))

    db.session.commit()
