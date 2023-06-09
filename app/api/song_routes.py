# import mutagen
import random
import requests
from io import BytesIO
from mutagen.mp3 import MP3
from flask import Blueprint, jsonify, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_required, current_user
from app.models import Song, User, liked_songs, db, playlist_songs
from app.forms import SongForm
from .AWS_helpers import get_unique_filename, upload_file_to_AWS

song_routes = Blueprint('song', __name__)


@song_routes.route('/allSongs')
# @login_required
def songs():
    """
    Query for all songs and returns them in a list of song dictionaries
    """
    songs = Song.query.all()
    return {'songs': [song.to_dict() for song in songs]}

import random

@song_routes.route('/devPicks/<string:song_ids>')
def devPicks(song_ids):
    """
    Query for songs with given IDs and returns them in a list of song dictionaries
    """
    song_ids = song_ids.split(',')  # Split the IDs into a list

    songs = Song.query.filter(Song.id.in_(song_ids)).all()

    if not songs:
        return {'error': 'No songs found with the provided IDs'}, 404

    return {'songs': [song.to_dict() for song in songs]}



@song_routes.route('/singleSong', methods=['POST'])
@login_required
def create_song():
    print('HERE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////')
    data = request.files

    user = current_user

    form = SongForm(
        title=data.get('title'),
        genre=data.get('genre'),
        coverImage=data.get('songCoverImage'),
        mp3File=data.get('songMp3'),
        artistName=data.get('artistName'),
        user_id=user.id,
        # Is this right? Not sure if we should be generating a new
        # token or grabbing the token from the client
        csrf_token=generate_csrf()
    )

    def audio_duration(length):
        length %= 3600
        mins = length // 60  # calculate in minutes
        length %= 60
        seconds = length  # calculate in seconds

        return mins, seconds  # returns the duration

    if form.validate_on_submit():

        song = form.data["mp3File"]
        coverImage = form.data["coverImage"]

        song.filename = get_unique_filename(song.filename)
        coverImage.filename = get_unique_filename(coverImage.filename)

        # Upload our song and image to AWS
        uploadSong = upload_file_to_AWS(song)
        uploadImage = upload_file_to_AWS(coverImage)

        # If song or upload failed to AWS return error message
        if "url" not in uploadSong and uploadImage:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return jsonify({"error": "Error uploading file to AWS"}), 500

        songURL = uploadSong["url"]
        imageURL = uploadImage["url"]

        # Retrieve the file contents from the URL using requests.get()/
        response = requests.get(songURL)

        # Pass the file contents to the MP3() function using BytesIO()
        audio = MP3(BytesIO(response.content))

        audio_info = audio.info

        length = int(audio_info.length)
        mins, seconds = audio_duration(length)
        songDuration = f'{mins}.{seconds}'


        new_song = Song(
            title=form.data['title'],
            genre=form.data['genre'],
            coverImage=imageURL,
            mp3file=songURL,
            duration=float(songDuration),
            artistName=form.data['artistName'],
            user_id=user.id
        )
        db.session.add(new_song)
        db.session.commit()
        return jsonify({"message": "Succesfully Uploaded Song"}), 201
    
    if form.errors:
        return jsonify({"error": "Invalid Data"}), 403
    
    else:
        return jsonify({"error": "Form Validation Error"}), 500


@song_routes.route('/allSongs/<int:user_id>')
def get_user_songs(user_id):
    """
    Query for all user songs and returns them in a list of song dictionaries
    """
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404

    songs = Song.query.filter_by(user_id=user_id).all()

    return {'songs': [song.to_dict() for song in songs]}


@song_routes.route('playlistSongs/<int:playlist_id>')
def get_playlist_songs(playlist_id):

    songs = db.session.query(Song).join(
        playlist_songs).filter_by(playlist_id=playlist_id).all()
    return {'playlistSongs': [song.to_dict() for song in songs]}

@song_routes.route('/update/<int:song_id>', methods=['PUT'])
@login_required
def update_song(song_id):
    song = Song.query.get(song_id)
    data = request.json
    if song:
        song.title = data.get('title')
        song.genre = data.get('genre')
        db.session.commit()
        return {'message': 'Song updated successfully', 'status': 200}
    else:
        return {'error': 'Song not found', 'status': 404}

@song_routes.route('/delete/<int:song_id>', methods=['DELETE'])
@login_required
def delete_song(song_id):
    song = Song.query.get(song_id)

    if song:
        db.session.delete(song)
        db.session.commit()
        return {'message': 'Song deleted successfully', 'status': 200}
    else:
        return {'error': 'Song not found', 'status': 404}


@song_routes.route('/likedSongs/<int:user_id>')
def get_liked_songs(user_id):
    """
    Query for all of user liked songs and returns them in a list of song dictionaries
    """

    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404

    liked_songs_query = db.session.query(Song).join(
        liked_songs).filter_by(owner_id=user_id).all()
    return {'likedSongs': [song.to_dict() for song in liked_songs_query]}


@song_routes.route('/likedSongs/<int:song_id>/<int:user_id>', methods=['PUT'])
def update_liked_songs(song_id, user_id):
    """
    Query to delete liked user song
    """

    def filter_likes(song):
        if song.id != song_id:
            return True
        return False

    user = User.query.get(user_id)
    user.likes = list(filter(filter_likes, user.likes))
    db.session.commit()

    return {'message': 'Song deleted successfully', 'status': 200}


@song_routes.route('likeSong/<int:song_id>', methods=['POST'])
@login_required
def add_liked_song(song_id):
    song = Song.query.get(song_id)

    if not song:
        return jsonify(message='Song not found'), 404

    current_user.likes.append(song)
    db.session.commit()

    return jsonify(message='Song added to liked songs')


@song_routes.route('/explore/<string:genre_type>')
def get_explore_genre(genre_type):
    songs = Song.query.filter(Song.genre == genre_type).all()
    if not songs:
        return jsonify(message='No Songs for this Genre'), 404
    return {'exploreGenre': [song.to_dict() for song in songs]}
