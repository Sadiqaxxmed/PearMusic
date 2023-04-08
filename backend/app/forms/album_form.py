from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class AlbumForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    