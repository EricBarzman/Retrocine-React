import axios from "@/components/utils/axios.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import MovieVideo from '../MovieVideo/MovieVideo';

function MoviePage() {
    
    const defaultMovie = {
        title:'',
        year:'',
        country: '',
        director: {
            first_name:'',
            last_name:'',
        },
        genre:{
            label: ''
        },
        keywords: []
    }

    let movie_slug = useParams().movie_slug;
    const [movie, setMovie] = useState(defaultMovie);
    
    useEffect(() => {
        async function fetch() {
            await axios
            .get(`movies/index/${movie_slug}/`)
            .then((response) => {
                setMovie(response.data)
            })
        }
        fetch();
        document.title = `${movie.title} | Retrocine`;
    }, [movie.title, movie_slug])

    return (
    <main className="text-white ml-20 py-10 mx-auto">  
        
        <h2 className="text-3xl font-semibold mb-6">{movie.title}</h2>
        
        <MovieVideo youtube_id={movie.youtube_id} />
            
        <section className="mb-6">
            <div className="mt-10 ml-5 mb-10">
                <p className="text-sm mb-3"><span className="text-gray-500">Directed by:</span> {movie.director.first_name} {movie.director.last_name}</p>
                <p className="text-sm mb-3"><span className="text-gray-500">Genre:</span> {movie.genre.label}</p>
                <p className="text-sm mb-3"><span className="text-gray-500">Country:</span> {movie.country.name}</p>
                <p className="text-sm mb-3"><span className="text-gray-500">Year:</span> {movie.year}</p>
            </div>
            
            <div className="p-10">
                <p className="text-gray-400 underline mb-3">Summary</p>
                <p>{movie.short_description}</p>
            </div>
            
            <div className="pl-10 mt-6">
                <div className="text-gray-500 text-sm mb-3">Keywords</div>
                {movie.keywords.map(keyword => (
                    <div className="text-sm" key={keyword.id}>{keyword.label}</div>
                ))}
            
            </div>

        </section>

    </main>
  )
}

export default MoviePage