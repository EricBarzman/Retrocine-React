import { useEffect, useState } from "react"
import axios from '@/lib/axios';
import MovieCard from "../MovieCard/MovieCard";
import { IoStar } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";

function Popular() {

    const [mostPopularMovies, setMostPopularMovies] = useState([]);

    useEffect(() => {
        axios
            .get('movies/index')
            .then(response => {
              const movies = response.data
              const five_most_popular = movies.sort((a, b) => b.average_rating - a.average_rating).slice(0, 4);
              console.log(five_most_popular);
              setMostPopularMovies(five_most_popular)
            })
    }, [])

    return (
    <main className="text-white px-10 py-6">
      <h2 className="text-3xl font-semibold mb-8">Popular movies</h2>
      <h3 className="text-xl mb-6">Based on your ratings</h3>
      
      <section className="flex flex-row flex-wrap">
        
        {mostPopularMovies.map((movie) => (
          <div key={movie.id} className="p-5">
              <MovieCard key={movie.id} movie={movie} />    
              <div className="flex flex-row items-center">
                <p className="mr-5 text-gray-400">Ratings: {Math.round(movie.average_rating * 10) / 10}</p>
                
                {movie.average_rating >= 1 && (<IoStar />)}
                {movie.average_rating > 1 && movie.average_rating < 2 && (<IoStarHalfSharp />)}
                {movie.average_rating >= 2 && (<IoStar />)}
                {movie.average_rating > 2 && movie.average_rating < 3 && (<IoStarHalfSharp />)}
                {movie.average_rating >= 3 && (<IoStar />)}
                {movie.average_rating > 3 && movie.average_rating < 4 && (<IoStarHalfSharp />)}
                {movie.average_rating >= 4 && (<IoStar />)}
                {movie.average_rating > 4 && movie.average_rating < 5 && (<IoStarHalfSharp />)}
                {movie.average_rating >= 5 && (<IoStar />)}
                
              </div>
              <p className="text-gray-600 text-xs">{movie.number_of_votes} votes</p>
          </div>
        ))}

      </section>
    </main>
  )
}

export default Popular