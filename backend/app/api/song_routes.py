import mutagen
import requests
from io import BytesIO
from mutagen.mp3 import MP3
from flask import Blueprint, jsonify, redirect, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_required
from app.models import Song, User, db
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


@song_routes.route('/singleSong', methods=['POST'])
@login_required
def create_song():
    data = request.files

    form = SongForm(
        title=data.get('title'),
        genre=data.get('genre'),
        coverImage=data.get('songCoverImage'),
        mp3File=data.get('songMp3'),
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
            return {"message": "Error uploading file to AWS", "status": 500}

        songURL = uploadSong["url"]
        imageURL = uploadImage["url"]


        # Retrieve the file contents from the URL using requests.get()
        response = requests.get(songURL)

        # Pass the file contents to the MP3() function using BytesIO()
        audio = MP3(BytesIO(response.content))

        # audio = MP3(songURL)
        print('AUDIO', audio)
        print('AUDIO LENGTH', audio.info.length)
        print('AUDIO BIT-RATE', audio.info.bitrate)

        audio_info = audio.info

        length = int(audio_info.length)
        mins, seconds = audio_duration(length)
        songDuration = f'{mins}.{seconds}'

        print(songDuration)

        new_song = Song(
            title=form.data['title'],
            genre=form.data['genre'],
            coverImage=imageURL,
            mp3file=songURL,
            duration=float(songDuration)
        )
        db.session.add(new_song)
        db.session.commit()
        return {"message": "Succesfully Uploaded Song", "status": 201}

    if form.errors:
        print(form.errors)
        return {"message": "Invalid Data", "status": 403}
