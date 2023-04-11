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
        user_id=1,
        artistName='Demo'
    )
    song2 = Song(
        title='Bikini Bottom',
        genre='Rap/Hip-Hop',
        coverImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsC4HgFu9j1QDKSNZdekFCEE5iBhBD3-b8iQ&usqp=CAU',
        mp3file='https://www.youtube.com/watch?v=s8bHLBqnOMQ',
        duration=2.50,
        user_id=1,
        artistName='Demo'
    )
    song3 = Song(
        title='War with Heaven',
        genre='Pop',
        coverImage='https://www.udiscovermusic.com/wp-content/uploads/2022/03/Keshi-Gabriel-Album.jpg',
        mp3file='https://www.youtube.com/watch?v=9jdReDQre38&ab_channel=keshi',
        user_id=1,
        duration=3.13,
        artistName='Demo'
    )
    song4 = Song(
        title='Pink + White',
        genre='Alternative',
        coverImage='https://s.yimg.com/ny/api/res/1.2/DuJgkQetGhmVmIcp_sMITQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTk2MDtjZj13ZWJw/https://media.zenfs.com/en/udiscovermusic_435/6c064427dd17d256ced8ec2c9b3fd747',
        mp3file='https://www.youtube.com/watch?v=JdR0ls28KNE',
        duration=2.50,
        user_id=1,
        artistName='Demo'
    )
    song5 = Song(
        title='Whats Next',
        genre='Rap/Hip-Hop',
        coverImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRutoQr73RIvghrgN5AxuDfBCVQLLVehJ9_JA&usqp=CAU',
        mp3file='https://www.youtube.com/watch?v=7EUVJaKJtBY',
        duration=2.50,
        user_id=1,
        artistName='Demo'
    )
    song6 = Song(
        title='XO Tour Life',
        genre='Rap/Hip-Hop',
        coverImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTesOhbn7d2kGpZNXGY7TUz1TpcxJN8GBiETA&usqp=CAU',
        mp3file='https://www.youtube.com/watch?v=VcyFfcJbyeM',
        duration=2.50,
        user_id=1,
        artistName='Demo'
    )
    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
