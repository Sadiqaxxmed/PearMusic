import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { thunkPlayNow } from "../../store/queue";
import './Search.css'
import { useDispatch } from "react-redux";
import loading from '../../images/loading.gif'

function Search() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false) //for switching the state to hide suggestions and title when search is clicked on
    const genres = [
        { genre: 'R&B', color: '#FF98B1' },
        { genre: 'Alternative', color: '#FFD700' },
        { genre: 'Rock', color: '#A85500' },
        { genre: 'Funk', color: '#A674E9' },
        { genre: 'Grunge', color: '#1DB245' },
        { genre: 'Country', color: '#85878A' },
        { genre: 'Pop', color: '#0088CC' },
        { genre: 'Trap', color: '#84218E' },
        { genre: 'EDM', color: '#B3882F' },
        { genre: 'K-Pop', color: '#D62040' },
        { genre: 'Disco', color: '#FFC8E1' },
        { genre: 'Folk', color: '#FF98B1' },
        { genre: 'Heavy Metal', color: '#A85500' },
        { genre: 'Jazz', color: '#84218E' }
    ];
    useEffect(() => {
        const handleSearch = async () => {
            setSearchLoading(true);
            try {
                const res = await fetch(`/api/search/${searchTerm}`);
                if (res.ok) {
                    const result = await res.json();
                    setSearchResults(result);
                    setSearchLoading(false);
                } else {
                    console.error('Search request failed:', res.status);
                }
            } catch (error) {
                console.error('An error occurred during search:', error);
            }
        };

        if (searchTerm) {
            handleSearch();
        } else {
            setSearchLoading(null);
            setSearchResults([]);
        }
    }, [searchTerm]);
    useEffect(() => {
        const checkScreenSize = () => {
            if (!(window.innerWidth <= 1050)) history.push('/browse')
        };
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const playNowFunc = (song) => {
        dispatch(thunkPlayNow(song));
    };

    return (
        <>
            {isSearching
                ?
                <div className="SA-Wrapper">
                    <div className='SA-Search-Field-Wrapper'>
                        <i class="fa-solid fa-arrow-left" id='SA-Arrow' onClick={(() => setIsSearching(false))} />
                        <span className='material-symbols-outlined' id='SA-SearchIcon'>search</span>
                        <div className="SA-InputBox-Wrapper">
                            <input
                                className='SA-Search-Input'
                                type='text'
                                placeholder='What do you want to listen to?'
                                value={searchTerm}
                                onChange={((e) => setSearchTerm(e.target.value))}
                            />
                        </div>
                    </div>
                    {(searchLoading !== null) && searchLoading
                        ?
                        <img className='LoadingGIf' src={loading} alt="loading-gif" />
                        :
                        <div className="SA-Search-Results-Wrapper">
                            {searchResults?.search_results?.length > 0 && (
                                <ul className='SA-Search-Results'>
                                    {Object.values(searchResults.search_results).map((song, idx) => (
                                        <li className='SA-Search-Result' key={`search-result-${idx}`} onClick={() => playNowFunc(song)}>
                                            <img src={song.coverImage} alt='' className="SA-Search-Img" />
                                            <div className="SA-TitlenType-Wrapper">
                                                <p className="SA-SongTitle">{song.title} </p>
                                                <p className="SA-Type">Song</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    }
                </div>

                :

                <div className="SI-Wrapper">
                    <h1 className="SI-Title">Search</h1>
                    <div className='SI-Search-Field-Wrapper'>
                        <div className="SI-InputBox-Wrapper">
                            <span className='material-symbols-outlined' id='SI-SearchIcon'>search</span>
                            <input
                                className="SI-Search-Input"
                                type='text'
                                placeholder='What do you want to listen to?'
                                onClick={() => setIsSearching(true)}
                            />
                        </div>
                        <p className="SI-BrowseAll">Browse all</p>
                        <div className="SI-DiscoverGenreBlocks-Wrapper">
                            {genres.map((genre, idx) => (
                                <div
                                    className="SI-GenreBlock"
                                    key={`DiscoverGenre-Block-${idx}`}
                                    style={{ backgroundColor: genre.color }}
                                    onClick={((e) => history.push(`/explore/${genre.genre}`))}
                                >
                                    <p className="SI-GenreBlock-Text">{genre.genre}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Search