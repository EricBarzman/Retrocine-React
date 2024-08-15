import { useEffect, useState } from "react"
import MovieCard from "@/components/Movies/MovieCard/MovieCard";

import { getAllMovies } from '@/lib/apis';

function Pick_of_the_week() {

  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    let fiveMovies = [];
    getAllMovies()
      .then((result) => {
        for (let i = 0; i < 5; i++) {
          const randIndex = Math.floor(Math.random() * result.length)
          const randomMovie = result[randIndex];
          fiveMovies.push(randomMovie);
        }
        setRandomMovies(fiveMovies);
        fiveMovies = [];
      })
  }, []);

  return (
    <main className="text-white px-10 py-6">
      <h2 className="text-3xl font-semibold mb-8">Pick of the Week</h2>
      <h3 className="text-xl mb-6">Special random selection of five oldies but goodies!</h3>
      <section className="flex flex-row flex-wrap">
        {randomMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </section>
    </main>
  )
}

export default Pick_of_the_week