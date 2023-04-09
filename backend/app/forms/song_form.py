from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    coverImage = FileField('Cover Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    mp3File = FileField('Mp3 File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
