from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, URL


class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    coverImage = StringField('Cover Image', validators=[DataRequired(), URL()])
    mp3File = StringField('Mp3 File', validators=[DataRequired(), URL()])
