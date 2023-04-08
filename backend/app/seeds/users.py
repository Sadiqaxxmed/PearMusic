from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    Nipsey = User(
        username='Nipsey Hussle', email='bignip@aa.io', password='password')
    Spice = User(
        username='Ice Spice', email='spice@aa.io', password='password')
    keshi = User(
        username='Keshi', email='keshijitt@aa.io', password='password')
    lilUziVert = User(
        username='Lil Uzi Vert', email='uzi@aa.io', password='password')
    Drake = User(
        username='Drake', email='Drizzy@aa.io', password='password')
    Remi = User(
        username='Remi Wolf', email='Remmiiup@aa.io', password='password')

    db.session.add(demo)
    db.session.add(Nipsey)
    db.session.add(Spice)
    db.session.add(keshi)
    db.session.add(lilUziVert)
    db.session.add(Drake)
    db.session.add(Remi)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
