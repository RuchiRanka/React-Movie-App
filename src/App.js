
import React, { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard.jsx';
import SearchIcon from './search.svg';

const api_url = 'http://www.omdbapi.com?apikey=c032e2d7';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${api_url}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies("Superman");
    }, []);

    return (
        <>
            <div className="app">
                <h1>MovieLand</h1>

                <div className="search">
                    <input
                        placeholder="Search for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value) }
                    />
                    <img
                        src={SearchIcon}
                        alt="search"
                        onClick={() => searchMovies(searchTerm) }
                    />
                </div>

                {
                    movies?.length > 0
                        ? (
                            <div className="container">
                            {movies.map((movie)=>(
                                    <MovieCard movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty">
                                <h2>No movies found.</h2>
                            </div>
                        )
                }
            </div>
        </>
    );
};

export default App;