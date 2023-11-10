from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# DONT ADD YOUTUBE LINKS
# MOBILE USERS CANNOT LISTEN TO YOUTUBE LINKS 
def seed_songs():
    song1 = Song(
        title='Is There Someone Else?',
        genre='Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/isThereSomeoneElse.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/The+Weeknd+-+Is+There+Someone+Else_+(Audio).mp3",
        duration=3.19,
        user_id=1,
        artistName='Weeknd'
    )
    song2 = Song(
        title='Never Been',
        genre='Rap',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/neverBeen.jpg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Logic+-+Never+Been+(Official+Audio).mp3",
        duration=4.07,
        user_id=1,
        artistName='Logic'
    )
    song3 = Song(
        title='War with Heaven',
        genre='Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/warWithHeaven.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/keshi+-+War+With+Heaven+%5BFor+Shang-Chi+Album%5D+(Official+Audio).mp3",
        user_id=1,
        duration=3.13,
        artistName='Keshi'
    )
    song4 = Song(
        title='Pink + White',
        genre='Alternative',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/pink%2Bwhite.jpeg',
        mp3file='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Pink++White+(Live+at+Electric+Lady).mp3',
        duration=3.15,
        user_id=1,
        artistName='Remi Wolf'
    )
    song5 = Song(
        title='Whats Next',
        genre='Rap',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/whatsNext.png',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Drake+-+What's+Next+(Official+Music+Video).mp3",
        duration=3.20,
        user_id=1,
        artistName='Drake'
    )
    song6 = Song(
        title='XO Tour Life',
        genre='Rap',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/xoTourLife.webp',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Lil+Uzi+Vert+-+XO+Tour+Llif3+(Official+Lyric+Video).mp3",
        duration=3.00,
        user_id=1,
        artistName='Lil Uzi Vert'
    )
    song7 = Song(
        title='OMG',
        genre='K-Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/OMG.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/NewJeans+(%E1%84%82%E1%85%B2%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3)+'OMG'+Official+MV+(Performance+ver.1).mp3",
        duration=3.40,
        user_id=1,
        artistName='New Jeans'
    )
    song8 = Song(
        title='How You Like That',
        genre='K-Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/howYouLikeThat.png',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/BLACKPINK+-+'How+You+Like+That'+MV.mp3",
        duration=3.03,
        user_id=1,
        artistName='BlackPink'
    )
    song9 = Song(
        title='Cupid',
        genre='K-Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/butter.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/FIFTY+FIFTY+(%E1%84%91%E1%85%B5%E1%84%91%E1%85%B3%E1%84%90%E1%85%B5%E1%84%91%E1%85%B5%E1%84%91%E1%85%B3%E1%84%90%E1%85%B5)+-+'Cupid'+(TwinVer.)+Official+Lyric+Video.mp3",
        duration=2.59,
        user_id=1,
        artistName='Fifty Fifty'
    )
    song10 = Song(
        title='Shelter',
        genre='EDM',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/shelter.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Porter+Robinson+%26+Madeon+-+Shelter+(Official+Audio).mp3",
        duration=3.37,
        user_id=1,
        artistName='Porter Robinson'
    )
    song11 = Song(
        title='Hypeboy',
        genre='K-Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/HypeBoy.webp',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/NewJeans+(%E1%84%82%E1%85%B2%E1%84%8C%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3)+-+Hype+Boy+Official+Audio.mp3",
        duration=3.37,
        user_id=1,
        artistName='New Jeans'
    )
    song12 = Song(
        title='Butter',
        genre='K-Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/butter.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/BTS+(%E1%84%87%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A9%E1%84%82%E1%85%A7%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AB)+-+Butter+(Official+Audio).mp3",
        duration=3.00,
        user_id=1,
        artistName='BTS'
    )
    song13 = Song(
        title='Kill This Love',
        genre='K-Pop',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/killThisLove.jpeg',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/BLACKPINK+-+'Kill+This+Love'+MV.mp3",
        duration=3.13,
        user_id=1,
        artistName='BlackPink'
    )
    song14 = Song(
        title='Hurt From Mercury',
        genre='R&B',
        coverImage='https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/Hurt+From+Mercury.png',
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Tory+Lanez+-+Hurt+From+Mercury+%5BOfficial+Audio%5D.mp3",
        duration=3.23,
        user_id=1,
        artistName='Tory Lanez'
    )
    song15 = Song(
        title="550's & Leon Dore",
        genre='R&B',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/550's.jpg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Karri+-+550s+%26+Leon+Dore+(Official+Visualizer).mp3",
        duration=2.03,
        user_id=1,
        artistName='Karri'
    )
    song16 = Song(
        title="Major ft. Key Glock",
        genre='R&B',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/Major.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Young+Dolph+-+Major+(Official+Music+Video)+ft.+Key+Glock.mp3",
        duration=4.53,
        user_id=1,
        artistName='Young Daplh'
    )
    song17 = Song(
        title="Talking To My Scale",
        genre='Rap',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/talking+to+my+scale.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Young+Dolph+-+Talking+To+My+Scale+(Official+Video).mp3",
        duration=4.46,
        user_id=1,
        artistName='Young Dalph'
    )
    song18 = Song(
        title="Get Down",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/getDown.png",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Still+Woozy+-+Get+Down+(Lyric+Video).mp3",
        duration=2.50,
        user_id=1,
        artistName='Still Woozy'
    )
    song19 = Song(
        title="Blonde Boyz",
        genre='Rap',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/BlondeBoyz.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Blonde+Boyz++Cyndago+Original+Music+Video.mp3",
        duration=4.40,
        user_id=1,
        artistName='Super Mega'
    )
    song20 = Song(
        title="My 2 Lovely Uncles (ft. Oney)",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/my2Uncles.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/SuperMega+-+My+2+Lovely+Uncles+(ft.+Oney)++(Official+Video).mp3",
        duration=3.53,
        user_id=1,
        artistName='SuperMega'
    )
    song21 = Song(
        title="Flower St",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/flowerSt.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Flower+St.mp3",
        duration=2.34,
        user_id=1, 
        artistName='Zen Haircuts'
    )
    song22 = Song(
        title="Godly Behaviour",
        genre='Pop',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/godlyBehavior.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/ELIO+-+Godly+Behaviour.mp3",
        duration=2.38,
        user_id=1,
        artistName='ELIO'
    )
    song23 = Song(
        title="Thunder",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/Thunder.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Thunder.mp3",
        duration=5.13,
        user_id=1,
        artistName='Roy Blair'
    )
    song24 = Song(
        title="I DONT KNOW ABOUT HIM",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/Dont+know+about+Him.jpg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/I+DONT+KNOW+ABOUT+HIM.mp3",
        duration=3.58,
        user_id=1,
        artistName='Roy Blair'
    )
    song25 = Song(
        title="Do U Mind? (Leave the Light On)",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/leave+the+light+on.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Fleece+-+Do+U+Mind_+(Leave+the+Light+On)+Official+Video.mp3",
        duration=3.53,
        user_id=1,
        artistName='Fleece'
    )
    song26 = Song(
        title="SAY THAT YOU MISS ME",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/sayThatYouMissMe.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/MICKEY+DARLING++SAY+THAT+YOU+MISS+ME+(audio).mp3",
        duration=3.48,
        user_id=1,
        artistName='Mickey Darling'
    )
    song27 = Song(
        title="Young",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/young.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Frankie+Cosmos+_Young_+Official+Single.mp3",
        duration=2.02,
        user_id=1,
        artistName='Frankie Cosmos'
    )
    song28 = Song(
        title="amphetamine",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/amphetamine.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/boylife+-+amphetamine+(official+audio).mp3",
        duration=2.00,
        user_id=1,
        artistName='boylife'
    )
    song29 = Song(
        title="lowlife w kenny beats",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/lowlife.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/lowlife+w+kenny+beats+-+not+dvr.mp3",
        duration=2.27,
        user_id=1,
        artistName='not dvr'
    )
    song30 = Song(
        title="25MPH",
        genre='Alternative',
        coverImage="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/images/25mph.jpeg",
        mp3file="https://pearbucket.s3.us-east-2.amazonaws.com/pearmp3s/Public+Library+Commute+-+25MPH.mp3",
        duration=3.03,
        user_id=1,
        artistName='Public Library Commute'
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
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)
    db.session.add(song21)
    db.session.add(song22)
    db.session.add(song23)
    db.session.add(song24)
    db.session.add(song25)
    db.session.add(song26)
    db.session.add(song27)
    db.session.add(song28)
    db.session.add(song29)
    db.session.add(song30)
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
