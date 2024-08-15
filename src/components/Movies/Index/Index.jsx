import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

import MovieCard from "@/components/Movies/MovieCard/MovieCard";

import { getAllMovies, getGenres, getCountries, getMoviesByGenre } from '@/lib/apis';
import { getMoviesByCountry } from "@/lib/apis";

function Index() {

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const myFavorites = useSelector((state) => state.favorites.my_favorites)
  
  // On mount
  useEffect(()=> {
    document.title = `Movies | Retrocine`;
    // Get all movies
    getAllMovies()
            .then(result => {
                setMovies(result);
                // setMovies(result.slice(0,10));
            }
        );
    // Get genres
    getGenres().then(response => setGenres(response))
    // Get country
    getCountries().then(response => setCountries(response))
  }, [])


  // Search by Genre
  function searchMoviesByGenre(e) {
    getMoviesByGenre(e.target.value)
      .then(response => setMovies(response))
  }

  // Search by Criteria
  function searchMoviesByCriteria(e) {
    console.log(e.target.value);
    
    getMoviesByCountry(e.target.value)
      .then(response => setMovies(response))
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
              <option key={genre._id} value={genre._id}>{genre.label}</option>
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
              <option key={country.name} value={country._id}>{country.name}</option>
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