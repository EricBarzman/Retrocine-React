import { useState, useEffect } from 'react';
import MovieVideo from '@/components/Movies/MovieVideo/MovieVideo';
import MovieCard from '@/components/Movies/MovieCard/MovieCard'

import { getAllMovies } from '@/lib/apis';


function Home() {

    const [randomMovie, setRandomMovie] = useState({});
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        document.title = 'Home | Retrocine';
        getAllMovies()
            .then(result => {
                setMovies(result);
                setMovies(result.slice(0,10));
            }
        );
        // Get a random movie
        getAllMovies()
            .then(result => {
                const randomIndex = Math.floor(Math.random() * result.length)
                const randomPick = result[randomIndex];
                setRandomMovie(randomPick);
            }
        );
    }, []);

    return (
        <main className='text-white px-10 py-4'>
            
            <h2 className='mt-6 ml-10 mb-20 capitalize text-4xl font-semibold'>
                Welcome back!
            </h2>

            <div>
                <MovieVideo youtube_id={randomMovie.youtube_id} />
            </div>

            <section className="flex flex-row flex-wrap mt-6">
                {movies.length > 0 && movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
                {movies.length == 0 && (
                <p className="h-screen">No result found.</p>
                )}
            </section>

        </main>
    )
}

export default Home