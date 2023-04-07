from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError


class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    coverImage = StringField('Cover Image', validators=[DataRequired()])
    mp3file = StringField('Mp3 File', validators=[DataRequired()])
    duration = 
    userId =
    albumId =
