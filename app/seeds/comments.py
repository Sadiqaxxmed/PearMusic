from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comment1 = Comment(
      comment='Drake is fire!!!',
      owner_id=2,
      comment_id=1
    )
    comment2 = Comment(
      comment='This playlist is straight fire!!!',
      owner_id=3,
      comment_id=1
    )
    comment3 = Comment(
      comment='Best playlist for the gym ya feeeel me.',
      owner_id=4,
      comment_id=1
    )
    comment4 = Comment(
      comment='Draaaaaaaaayke?',
      owner_id=5,
      comment_id=1
    )
    comment5 = Comment(
      comment='These songs are clean!!!!',
      owner_id=6,
      comment_id=2
    )
    comment6 = Comment(
      comment='J Cole is the real GOAT',
      owner_id=2,
      comment_id=2
    )
    comment7 = Comment(
      comment='KING OF RAP!!',
      owner_id=5,
      comment_id=2
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the songs table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
