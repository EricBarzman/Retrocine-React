import { useState, useEffect } from 'react';
import axios from '@/components/utils/axios';
import MovieVideo from './Movies/MovieVideo/MovieVideo';
import MovieCard from './Movies/MovieCard/MovieCard'

function Home() {

    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState([]);
  
    
    useEffect(() => {
        document.title = 'Home | Retrocine';
        axios
            .get('movies/index/')
            .then(response => setMovies(response.data.slice(0,10))) // Retain only 10 films
        axios
            .get(`/movies/random`)
            .then((result) => setMovie(result.data))
    }, []);

    return (
        <main className='text-white px-10 py-4'>
            
            <h2 className='mt-6 ml-10 mb-20 text-4xl font-semibold'>Welcome back, Annie!</h2>
            <div>
                <MovieVideo youtube_id={movie.youtube_id} />
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

export default Home