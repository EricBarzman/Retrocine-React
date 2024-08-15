import axios from '@/lib/axios';
import { useEffect, useState } from "react"
import MovieCard from "../MovieCard/MovieCard";

function Pick_of_the_week() {

  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    axios
      .get('movies/pick-of-the-week')
      .then((response) => setRandomMovies(response.data))
  }, []);

  return (
    <main className="text-white px-10 py-6">
      <h2 className="text-3xl font-semibold mb-8">Pick of the Week</h2>
      <h3 className="text-xl mb-6">Special random selection of five oldies but goodies!</h3>
      <section className="flex flex-row flex-wrap">
        {randomMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  )
}

export default Pick_of_the_week