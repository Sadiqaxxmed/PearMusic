from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_albums():
    album1 = Album(
        title='The Incredible True Story',
        coverImage='https://upload.wikimedia.org/wikipedia/en/e/ea/TheIncredibleTrueStory.jpg',
        owner_id=1
    )
    album2 = Album(
        title='Starboy',
        coverImage='https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png',
        owner_id=1
    )
    album3 = Album(
        title='GABRIEL',
        coverImage='https://i.scdn.co/image/ab67616d0000b27319aff2da63b211d75341e8eb',
        owner_id=1
    )
    album4 = Album(
        title='Juno',
        coverImage='https://upload.wikimedia.org/wikipedia/en/5/50/Juno-Remi_Wolf.png',
        owner_id=1
    )
    album5 = Album(
        title='The Views',
        coverImage='https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg',
        owner_id=1
    )
    album6 = Album(
        title='Luv Is Rage 2',
        coverImage='https://upload.wikimedia.org/wikipedia/en/6/65/Luv_Is_Rage_2_cover.jpg',
        owner_id=1
    )
    album7 = Album(
        title='The Album',
        coverImage='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1dd433105875275.5f83380a57d19.jpg',
        owner_id=1
    )
    album8 = Album(
        title='Alone at Prom',
        coverImage='https://upload.wikimedia.org/wikipedia/en/8/8a/Alatprom.jpg',
        owner_id=1
    )
    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.add(album4)
    db.session.add(album5)
    db.session.add(album6)
    db.session.add(album7)
    db.session.add(album8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
