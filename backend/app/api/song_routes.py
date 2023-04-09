import mutagen
from mutagen.wave import WAVE
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
    print('BEFORE:   ', request.files)
    cover_image = request.files.get('songCoverImage')
    song_mp3 = request.files.get('songMp3')
    title = request.form.get('title')
    genre = request.form.get('genre')

    print('HERE     :     ' ,cover_image, song_mp3, title, genre)
    # form = SongForm(
    #     title=data['songTitle'],
    #     genre=data['genreValue'],
    #     coverImage=data['songCoverImage'],
    #     mp3File=data['songMp3'],
    #     csrf_token=generate_csrf()
    # )

    # print('REQUEST   :   ', request.files)

    return {'message': 'lol'}

    # print('DATA  :  ', data['songMp3'])
    # print('DATA  :  ', data['songTitle'])

    def audio_duration(length):
        length %= 3600
        mins = length // 60  # calculate in minutes
        length %= 60
        seconds = length  # calculate in seconds

        return mins, seconds  # returns the duration

    if form.validate_on_submit():

        song = form.data["mp3file"]
        coverImage = form.data["coverImage"]

        song.filename = get_unique_filename(song.filename)
        coverImage.filename = get_unique_filename(coverImage.filename)

        # Upload our song and image to AWS
        uploadSong = upload_file_to_AWS(song)
        uploadImage = upload_file_to_AWS(coverImage)

        # If song or upload failed to AWS return error message
        if "url" not in uploadSong or uploadImage:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return {"message": "Error uploading file to AWS", "status": 500}

        songURL = uploadSong["url"]
        imageURL = uploadImage["url"]

        audio = WAVE(songURL)

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
        return redirect("/")

    if form.errors:
        print(form.errors)
        return {"message": "Invalid Data", "status": 403}
