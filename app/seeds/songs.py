from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_songs():
    song1 = Song(
        title='Is There Someone Else?',
        genre='Pop',
        coverImage='https://images.genius.com/e302445fd7858455c4ae44690356d476.1000x1000x1.jpg',
        mp3file='https://www.youtube.com/watch?v=i4ZuseKFBF0&ab_channel=TheWeekndVEVO',
        duration=3.19,
        user_id=1,
        artistName='Demo'
    )
    song2 = Song(
        title='Never Been',
        genre='Rap',
        coverImage='https://upload.wikimedia.org/wikipedia/en/e/ea/TheIncredibleTrueStory.jpg',
        mp3file='https://www.youtube.com/watch?v=maENVrd7Y0k&list=PLy48iUF99hDGhs-MVMzCkn9nJIxqNPZaQ&index=15&ab_channel=VisionaryMusicGroup',
        duration=4.07,
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
        duration=3.15,
        user_id=1,
        artistName='Demo'
    )
    song5 = Song(
        title='Whats Next',
        genre='Rap',
        coverImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRutoQr73RIvghrgN5AxuDfBCVQLLVehJ9_JA&usqp=CAU',
        mp3file='https://www.youtube.com/watch?v=7EUVJaKJtBY',
        duration=3.20,
        user_id=1,
        artistName='Demo'
    )
    song6 = Song(
        title='XO Tour Life',
        genre='Rap',
        coverImage='https://i1.sndcdn.com/artworks-JP1tzUizbOmgwn4o-pEwDPg-t500x500.jpg',
        mp3file='https://www.youtube.com/watch?v=VcyFfcJbyeM',
        duration=3.00,
        user_id=1,
        artistName='Demo'
    )
    song7 = Song(
        title='OMG',
        genre='K-Pop',
        coverImage='https://www.nme.com/wp-content/uploads/2023/01/newjeans-ador-hybe-090123.jpg',
        mp3file='https://www.youtube.com/watch?v=sVTy_wmn5SU&ab_channel=HYBELABELS',
        duration=3.40,
        user_id=8,
        artistName='Mike'
    )
    song8 = Song(
        title='How You Like That',
        genre='K-Pop',
        coverImage='https://i.ytimg.com/vi/ioNng23DkIM/maxresdefault.jpg',
        mp3file='https://www.youtube.com/watch?v=ioNng23DkIM&ab_channel=BLACKPINK',
        duration=3.03,
        user_id=8,
        artistName='Mike'
    )
    song9 = Song(
        title='Cupid',
        genre='K-Pop',
        coverImage='https://upload.wikimedia.org/wikipedia/en/a/a6/Fifty_Fifty_-_The_Beginning_Cupid.png',
        mp3file='https://www.youtube.com/watch?v=6uvUTu716rU&ab_channel=FIFTYFIFTYOfficial',
        duration=2.59,
        user_id=8,
        artistName='Mike'
    )
    song10 = Song(
        title='Shelter',
        genre='EDM',
        coverImage='https://i.ytimg.com/vi/fzQ6gRAEoy0/maxresdefault.jpg',
        mp3file='https://www.youtube.com/watch?v=HQnC1UHBvWA&ab_channel=Madeon',
        duration=3.37,
        user_id=8,
        artistName='Porter Robinson'
    )
    song11 = Song(
        title='Hypeboy',
        genre='K-Pop',
        coverImage='https://images.genius.com/0cc17757cbe6c7934352f1d2ce021a34.1000x1000x1.jpg',
        mp3file='https://www.youtube.com/watch?v=T--6HBX2K4g&ab_channel=KMUSIC',
        duration=3.37,
        user_id=8,
        artistName='New Jeans'
    )
    song12 = Song(
        title='Butter',
        genre='K-Pop',
        coverImage='https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png',
        mp3file='https://www.youtube.com/watch?v=Uz0PppyT7Cc&ab_channel=LQKPOP',
        duration=3.00,
        user_id=8,
        artistName='Mike'
    )
    song13 = Song(
        title='Kill This Love',
        genre='K-Pop',
        coverImage='https://www.billboard.com/wp-content/uploads/media/blackpink-kill-this-love-MV-2019-billboard-1548.jpg',
        mp3file='https://www.youtube.com/watch?v=2S24-y0Ij3Y&ab_channel=BLACKPINK',
        duration=3.13,
        user_id=8,
        artistName='Mike'
    )
    song14 = Song(
        title='Hurt From Mercury',
        genre='R&B',
        coverImage='https://i1.sndcdn.com/artworks-YfXbYJtJ1DBq-0-t500x500.jpg',
        mp3file="https://www.youtube.com/watch?v=VcsqCiMrtkc&ab_channel=ToryLanez",
        duration=3.23,
        user_id=8,
        artistName='Mike'
    )
    song15 = Song(
        title="550's & Leon Dore",
        genre='R&B',
        coverImage='https://i1.sndcdn.com/artworks-Y0AJaOJ1j7CZMDq7-AEAYOA-t240x240.jpg',
        mp3file="https://www.youtube.com/watch?v=k7tQAKkK3GY&ab_channel=Karri",
        duration=2.03,
        user_id=8,
        artistName='Mike'
    )
    song16 = Song(
        title="Major ft. Key Glock",
        genre='R&B',
        coverImage='',
        mp3file="https://www.youtube.com/watch?v=SdMW1Ya0nHM",
        duration=4.53,
        user_id=1,
        artistName='Young Daplh'
    )
    song17 = Song(
        title="Talking To My Scale",
        genre='Rap',
        coverImage='',
        mp3file="https://www.youtube.com/watch?v=KymiqOr5So4",
        duration=4.46,
        user_id=1,
        artistName='Young Dalph'
    )
    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
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
