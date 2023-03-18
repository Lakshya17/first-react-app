import './App.css';
import React, { useEffect, useState } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
// OMDB API KEY: 64085a3e

const API_URL = 'https://www.omdbapi.com?apikey=64085a3e';

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] =useState('')
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }
  useEffect(()=>{
    searchMovies('Avengers')
  },[]);
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search For Movies' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
        <img src={SearchIcon} alt='Search' onClick={()=> searchMovies(searchTerm)}/>       
      </div>

      {
        movies?.length > 0
          ? (
            <div className='container'>
              {
                movies.map((movie)=> <MovieCard movie={movie}/>)
              }
            </div>
          ) : (
            <div className='empty'>
              <h2>No movies Found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;
