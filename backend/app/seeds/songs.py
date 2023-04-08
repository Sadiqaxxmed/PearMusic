from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_songs():
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')
    song1 = Song(
          title='Respect Ya Passion',
          genre='Rap/Hip-Hop',
          coverImage='https://images.squarespace-cdn.com/content/v1/5bb52768d86cc94c8613ccf9/1557940709042-A3JRMIA2TN0WT5GMPYSL/Nipsey-Hussle-Casey-Lynn-Hancock-Painting-2small.jpg',
          mp3file='https://www.youtube.com/watch?v=dmqwI1zKoU4&ab_channel=kvshmvsic',
          duration=2.50,
          user_id=1
      )
    db.session.add(song1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
