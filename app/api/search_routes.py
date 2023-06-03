from flask import Blueprint, jsonify
from app.models import Song
from sqlalchemy import or_
from sqlalchemy.sql.expression import case

search_routes = Blueprint("search", __name__)


@search_routes.route("/<string:search_terms>")
def search(search_terms):
    try:
        print("INITIAL SEARCH TERMS:", search_terms)

        search_terms = search_terms.split()

        print("SEARCH TERMS:", search_terms)

        search_matched_songs = Song.query.filter(
            or_(*[Song.title.ilike(f"%{term}%") for term in search_terms])
        ).all()

        # Calculate the number of matches for each song
        song_match_counts = {}
        for song in search_matched_songs:
            count = sum(song.title.lower().count(term.lower()) for term in search_terms)
            song_match_counts[song] = count

        # Sort the search results by the number of matches in descending order
        sorted_search_results = sorted(
            song_match_counts.items(), key=lambda x: x[1], reverse=True
        )

        search_results_to_dict = [
            song.to_dict() for song, count in sorted_search_results
        ]

        if len(search_results_to_dict) == 0:
            return jsonify({"message": "No matching results found."})
        else:
            return jsonify({"search_results": search_results_to_dict})

    except Exception as e:
        # Handle the error and return an error message
        error_message = "An error occurred during the search."
        print(f"Error: {e}")
        return jsonify({"error": error_message}), 500
