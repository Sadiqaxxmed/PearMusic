from flask import Blueprint, jsonify
from app.models import Song, User

song_routes = Blueprint('song', __name__)


@song_routes.route('/allSongs')
# @login_required
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}
