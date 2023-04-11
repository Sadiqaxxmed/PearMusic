from flask import Blueprint
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


@album_routes.route('/allAlbums/<int:user_id>')
def get_user_albums(user_id):
    """
    Query for all user albums and returns them in a list of song dictionaries
    """
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404

    albums = Album.query.filter_by(owner_id=user_id).all()
    return {'albums': [album.to_dict() for album in albums]}
