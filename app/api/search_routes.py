from flask import Blueprint
from app.models import Song
from sqlalchemy import or_
from sqlalchemy.sql.expression import case

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:search_terms>')
def search(search_terms):
    print('INITIAL SEARCH TERMS:', search_terms)

    search_terms = search_terms.split()

    print('SEARCH TERMS:', search_terms)

    search_matched_songs = Song.query.filter(or_(*[Song.title.ilike(f'%{term}%') for term in search_terms])).all()

    # Calculate the number of matches for each song
    song_match_counts = {}
    for song in search_matched_songs:
        count = sum(song.title.lower().count(term.lower()) for term in search_terms)
        song_match_counts[song] = count

    # Sort the search results by the number of matches in descending order
    sorted_search_results = sorted(song_match_counts.items(), key=lambda x: x[1], reverse=True)

    search_results_to_dict = [song.to_dict() for song, count in sorted_search_results]

    return {'search_results': search_results_to_dict}
