from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Playlist, User, Song, Comment, db

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

    return {'playlist': playlist.to_dict()}


@playlist_routes.route('/createPlaylist/<int:song_id>', methods=['POST'])
@login_required
def create_playlist_from_song(song_id):
    song = Song.query.get(song_id)

    if not song:
        return {'message': 'Song not found'}, 404

    # Get the user from the current session
    user = current_user

    # Create a new playlist with the user as the owner
    playlist = Playlist(
        title=song.title,
        description='Add Description',
        coverImage=song.coverImage,
        owner_id=user.id
    )

    # Add the song to the playlist
    playlist.songs.append(song)

    # Save the playlist to the database
    db.session.add(playlist)
    db.session.commit()

    # Return the new playlist as JSON
    return {'playlist': playlist.to_dict()}


@playlist_routes.route('/singlePlaylist/<int:playlist_id>/comments')
def get_playlists_comments(playlist_id):
    comments = Comment.query.filter_by(comment_id=playlist_id).all()

    if not comments:
        return {'message': 'There are no comments for this playlist'}, 404

    return {'comments': [comment.to_dict() for comment in comments]}


@playlist_routes.route('/singlePlaylist/<int:playlist_id>/newComment/<int:user_id>', methods=['POST'])
# @login_required
def create_comment(playlist_id, user_id):
    data = request.get_json()
    comment = Comment(
        comment=data['comment'],
        owner_id=user_id,
        comment_id=playlist_id
    )

    db.session.add(comment)
    db.session.commit()

    return { 'comment': comment.to_dict() }
