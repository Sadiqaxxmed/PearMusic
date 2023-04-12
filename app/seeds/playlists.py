from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')
    playlist1 = Playlist(
        title='DRAKE ESSENTIALS 🦉',
        description='Drake is the GOAT 🫶🏽',
        owner_id=1,
        coverImage='https://is3-ssl.mzstatic.com/image/thumb/Video112/v4/19/df/47/19df47ce-cca1-d215-2d0a-028696533479/Jobe967a22f-51d6-41eb-9464-f7af5c4a7034-140368232-PreviewImage_Preview_Image_Intermediate_nonvideo_263440363_1304739370-Time1670451053186.png/540x540cc.webp'
    )
    playlist2 = Playlist(
        title='JCOLE ESSENTIALS 👑',
        description='Cole is to real',
        owner_id=1,
        coverImage='https://is2-ssl.mzstatic.com/image/thumb/Video112/v4/ee/23/59/ee235990-49cd-05d6-9c63-00eab607a614/Jobbb4da7a2-6c56-4f0f-bbcf-195091780cf4-140527173-PreviewImage_preview_image_nonvideo_sdr-Time1670624318078.png/540x540cc.webp'
    )
    playlist3 = Playlist(
        title='KENDRICK ESSENTIALS 💭',
        description='Kendrick just be spittin facts',
        owner_id=1,
        coverImage='https://is2-ssl.mzstatic.com/image/thumb/Video122/v4/cf/c6/53/cfc65343-9e63-749b-d5c8-0ebf4fa6d76e/Jobc6cab819-f596-4e41-83a6-04f87f06c4f7-140523723-PreviewImage_preview_image_nonvideo_sdr-Time1670618922979.png/540x540cc.webp'
    )
    playlist4 = Playlist(
        title='TRAVIS ESSENTIALS 🌵',
        description='ITSSSS LITTTT!!!!',
        owner_id=1,
        coverImage='https://is1-ssl.mzstatic.com/image/thumb/Video112/v4/9a/9e/89/9a9e89a5-d5bb-8962-6e49-891a86c62699/Jobeb24ed35-0a10-413b-a8a1-0bd81becf087-140527798-PreviewImage_preview_image_nonvideo_sdr-Time1670625381682.png/540x540cc.webp'
    )
    playlist5 = Playlist(
        title='PLAYBOI CARTI ESSENTIALS 🧛🏾',
        description='CARTiii is VIBESS',
        owner_id=1,
        coverImage='https://is2-ssl.mzstatic.com/image/thumb/Features112/v4/6e/3f/94/6e3f946b-7539-dc88-e556-674482d8d557/mzl.nlqqapzi.jpg/540x540SC.FPESS03.webp?l=en-US'
    )
    playlist6 = Playlist(
        title='LIL UZI VERT ESSENTIALS 👁️',
        description='UZI IS HIM!',
        owner_id=1,
        coverImage='https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/52/cd/3d/52cd3d0e-47c6-3bf4-d81c-b86bd4468d10/pr_source.png/540x540SC.FPESS03.webp?l=en-US'
    )
    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
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
