from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL


class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    coverImage = StringField('Cover Image', validators=[DataRequired(), URL()])
    mp3File = StringField('Mp3 File', validators=[DataRequired(), URL()])
