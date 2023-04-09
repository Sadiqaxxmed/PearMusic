from flask import Blueprint, jsonify
from app.models import Album, User

album_routes = Blueprint('album', __name__)


@album_routes.route('/allAlbums')
# @login_required
def albums():
    """
    Query for all albums and returns them in a list of album dictionaries
    """
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}