from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Playlist, User, Song, playlist_songs, Comment, db


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

    # Save the playlist to the database
    db.session.add(playlist)
    db.session.commit()


    # # Add the song to the playlist
    playlistId = playlist.id
    playlist.songs.append(song)
    db.session.commit()

    # Add entry to playlist_songs table
    db.session.execute(playlist_songs.insert().values(playlist_id=playlistId, song_id=song_id))
    db.session.commit()
    # song_playlist = song_playlist(playlist_id=playlist_id, song_id=song_id)
    # db.session.add(song_playlist)
    # db.session.commit()
    # Return the new playlist as JSON

    return { 'playlist': playlist.to_dict() }


@playlist_routes.route('/singlePlaylist/<int:playlist_id>/delete', methods=['DELETE'])
def delete_playlist(playlist_id):
    playlist = Playlist.query.filter_by(id=playlist_id).first()
    if not playlist:
        return {'error': 'Playlist not found'}, 404

    db.session.delete(playlist)
    db.session.commit()

    return {'message': 'Playlist deleted successfully'}, 200


@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['DELETE'])
def delete_song_from_playlist(playlist_id, song_id):

    delete_stmt = playlist_songs.delete().where((playlist_songs.c.playlist_id == playlist_id) & (playlist_songs.c.song_id == song_id))
    db.session.execute(delete_stmt)

    db.session.commit()

    return {'message': 'Song deleted successfully'}, 200

@playlist_routes.route('/<int:playlist_id>/songs/<int:song_id>', methods=['POST'])
def add_song_to_playlist(song_id, playlist_id):

    playlist = Playlist.query.get(playlist_id)
    if not playlist:
        return {'error': 'Playlist not found'}, 404

    # song_id = request.json.get('song_id')
    # if not song_id:
    #     return {'error': 'Song ID is required'}, 400

    song = Song.query.get(song_id)
    if not song:
        return {'error': 'Song not found'}, 404

    if song in playlist.songs:
        return {'error': 'Song already in playlist'}, 400

    playlist.songs.append(song)
    db.session.commit()

    # Add entry to playlist_songs table
    db.session.execute(playlist_songs.insert().values(playlist_id=playlist_id, song_id=song_id))
    db.session.commit()

    return {'message': 'Song added to playlist successfully'}


@playlist_routes.route('/update/<int:playlist_id>', methods=['PUT'])
def update_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    data = request.json
    print(data)
    if playlist:
        playlist.title = data.get('title')
        playlist.description = data.get('description')
        playlist.coverImage = data.get('coverImage')
        db.session.commit()
        return {'message': 'Playlist updated successfully', 'status': 200}
    else:
        return {'error': 'Song not found', 'status': 404}



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


@playlist_routes.route('/singlePlaylist/deleteComment/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted successfully', 'status': 200}
    else:
        return {'error': 'Comment not found', 'status': 404}
