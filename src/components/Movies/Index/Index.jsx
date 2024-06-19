import { useEffect, useState } from "react"
import axios from "@/components/utils/axios";

import MovieCard from "@/components/Movies/MovieCard/MovieCard";

function Index() {

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  
  // On mount
  useEffect(()=> {
    document.title = `Movies | Retrocine`;
    // Get all movies
    axios
      .get('movies/index/')
      .then(response => setMovies(response.data.slice(0,10))) // Retain only 10 films
    // Get genres
    axios
      .get('movies/genre/')
      .then(response => setGenres(response.data))
    // Get country
    axios
      .get('movies/country/')
      .then(response => setCountries(response.data))
  }, [])


  // Search by Genre
  function searchMoviesByGenre(event) {
    axios
      .get(`movies/genre/${event.target.value}`)
      .then(response => setMovies(response.data))
  }

  // Search by Criteria
  function searchMoviesByCriteria(event) {
    axios
      .get(`movies/${event.target.name}/${event.target.value}`)
      .then(response => setMovies(response.data))
  }

  return (
    <main className="text-white px-10 py-4">
      
      <h2 className="text-3xl font-semibold mb-6">Classic Movies</h2>
      
      <div className="flex items-center">
        <h3>Search by</h3>
        
          <select
            onChange={searchMoviesByGenre}
            className="bg-black p-3 rounded-lg flex flex-wrap text-gray-600"
            name="genre"
          >
            <option selected>- Genre -</option>
            {genres.map((genre) => (
              <option key={genre.slug} value={genre.id}>{genre.label}</option>
            ))}
          </select>
          
          <h3 className="ml-4">OR by</h3>
          <select
            onChange={searchMoviesByCriteria}
            className="bg-black p-3 rounded-lg flex flex-wrap text-gray-600"
            name="country"
          >
            <option selected>- Country -</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))}
          </select>
        

      </div>
      
      <section className="flex flex-row flex-wrap mt-6">
        {movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {movies.length == 0 && (
          <p className="h-screen">No result found.</p>
        )}
      </section>

    </main>
  )
}

export default Index