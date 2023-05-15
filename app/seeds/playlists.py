from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    playlist1 = Playlist(
        title='DRAKE ESSENTIALS 🦉',
        description='Drake is the GOAT 🫶🏽',
        owner_id=1,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/draykeee.png'
    )
    playlist2 = Playlist(
        title='JCOLE ESSENTIALS 👑',
        description='Cole is to real',
        owner_id=1,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/jcole.png'
    )
    playlist3 = Playlist(
        title='KENDRICK ESSENTIALS 💭',
        description='Kendrick just be spittin facts',
        owner_id=1,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/brown.png'
    )
    playlist4 = Playlist(
        title='TRAVIS ESSENTIALS 🌵',
        description='ITSSSS LITTTT!!!!',
        owner_id=2,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/purple.png'
    )
    playlist5 = Playlist(
        title='PLAYBOI CARTI ESSENTIALS 🧛🏾',
        description='CARTiii is VIBESS',
        owner_id=2,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/grey.png'
    )
    playlist6 = Playlist(
        title='LIL UZI VERT ESSENTIALS 👁️',
        description='UZI IS HIM!',
        owner_id=2,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/tealEssentials.png'
    )
    playlist7 = Playlist(
        title='Keegster Essentials',
        description='Keegster approved!',
        owner_id=2,
        coverImage='https://mypearmusicbucket.s3.us-west-1.amazonaws.com/tealEssentials.png'
    )
    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
    db.session.add(playlist7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
