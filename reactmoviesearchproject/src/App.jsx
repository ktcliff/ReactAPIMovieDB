import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

// const API_URL = process.env.MOVIE_API_URL;
const API_URL = 'http://www.omdbapi.com/?apikey=5666b545';

function App() {

  const searchMovies = async (title) => { 
  const response = await fetch(`${API_URL}&s=${title}`)

  const data = await response.json();

  setMovies(data.Search)
}

useEffect(() => {
  searchMovies('boss baby')
}, [])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])

  return (
   <div className='app'>
       <h1>🎥 Search for your favorite movies here 🎥</h1>

       <div className='search'>
        <input type="text" 
        placeholder='Type here...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt=""
        onClick={()=> searchMovies(searchTerm)}
        />
       </div>


    {
      movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie)=> (
            <MovieCard movie={movie} key={movie.imdbID}/>
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )
    }

   </div>
  )
}

export default App
