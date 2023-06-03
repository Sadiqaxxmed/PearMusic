import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { thunkPlayNow } from "../../store/queue";
import './Search.css'
import { useDispatch } from "react-redux";

function Search() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false) //for switching the state to hide suggestions and title when search is clicked on

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
            setSearchLoading(false);
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
                    <h1 className="SA-Title">Search</h1>

                    <div className='SA-Search-Field-Wrapper'>
                        <span className='material-symbols-outlined' id='SA-SearchIcon'>search</span>
                        <div>
                            <input
                                id='SA-Search-Input'
                                type='text'
                                placeholder='Search...'
                                value={searchTerm}
                                onChange={((e) => setSearchTerm(e.target.value))}
                            />

                            {searchResults?.search_results?.length > 0 && (
                                <ul className='SA-Search-Results'>
                                    {Object.values(searchResults.search_results).map((song, idx) => (
                                        <li className='SA-Search-Result' key={`search-result-${idx}`} onClick={() => playNowFunc(song)}>
                                            {song.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
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
                    </div>
                </div>
            }
        </>
    )
}

export default Search