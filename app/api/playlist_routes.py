from flask import Blueprint
from app.models import Playlist, User, db

playlist_routes = Blueprint('playlist', __name__)


@playlist_routes.route('/allPlaylists')
# @login_required
def playlists():
    """
    Query for all playlists and returns them in a list of playlists dictionaries
    """
    playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}



@playlist_routes.route('/allPlaylists/<int:user_id>')
def get_user_playlists(user_id):
    """
    Query for all user playlists and returns them in a list of song dictionaries
    """
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404

    playlists = Playlist.query.filter_by(owner_id=user_id).all()
    return {'playlists': [playlist.to_dict() for playlist in playlists]}

@playlist_routes.route('/singlePlaylist/<int:playlist_id>')
def get_single_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return {'error': 'Playlist not found'}, 404

    return { 'playlist': playlist.to_dict() }
