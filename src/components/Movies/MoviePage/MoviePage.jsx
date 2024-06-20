import axios from "@/components/utils/axios.js";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

import MovieVideo from '../MovieVideo/MovieVideo';
import VoteForMovie from "./VoteForMovie";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "./CommentCard";

function MoviePage() {
    
    // Define how a movie object looks like
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

    // Check if it's a favorite, and if already voted for
    const [isFavorite, setIsFavorite] = useState(false);
    
    const dispatch = useDispatch();
    const my_favorites = useSelector((state) => state.favorites.my_favorites);

    // Get the slug to recover the movie
    let movie_slug = useParams().movie_slug;
    const [movie, setMovie] = useState(defaultMovie);


    // Get the movie info, check if favorite, and if already voted for
    useEffect(() => {
        async function fetchMovie() {
            await axios
            .get(`movies/index/${movie_slug}/`)
            .then((response) => {
                setMovie(response.data)
            })
        }
        fetchMovie();
        const found = my_favorites.some((favorite) => favorite.id === movie.id)
        if (found) setIsFavorite(true);
        
        document.title = `${movie.title} | Retrocine`;
    }, [movie.title, movie_slug])


    function addToMyFavorites() {
        axios
            .get(`votes/my-favorites/add/${movie.id}`)
            .then(() => {
                toast.success('Added to my favorites');
                dispatch({ type: 'FETCH_FAVORITES' });
                // Cheat to display card as favorite, without rerendering the page
                setIsFavorite(true);
            })
            .catch(() => {
                toast.error('Could not add to favorites')
            })
    }


    function removeFromMyFavorites() {
        axios
            .get(`votes/my-favorites/remove/${movie.id}`)
            .then(() => {
                toast.success('Removed from my favorites');
                dispatch({ type: 'FETCH_FAVORITES' });
                // Little cheat to display card no longer as favorite, yet without rerendering
                setIsFavorite(false);
            })
            .catch(() => {
                toast.error('Could not add to favorites')
        })
    }

    

    return (
    <main className="text-white ml-20 py-10 mx-auto">  
        
        <h2 className="text-3xl font-semibold mb-6">{movie.title}</h2>
        
        {/* Trailer */}
        <MovieVideo youtube_id={movie.youtube_id} />
            
        <section className="mb-6">
            <div className="mt-10 ml-5 mb-10">
                
                {/* Add to favorites */}
                <div className="mb-6 text-xl">
                    {!isFavorite && (
                        <button onClick={addToMyFavorites} id={movie.id}>
                        <MdFavoriteBorder />
                        </button>
                    )}
                    {isFavorite && (
                        <button onClick={removeFromMyFavorites} id={movie.id}>
                        <MdFavorite className='fill-primary' />
                        </button>
                    )}
                </div>

                {/* Information */}
                <p className="text-sm mb-3">
                    <span className="text-gray-500">Directed by:</span> {movie.director.first_name} {movie.director.last_name}
                </p>
                <p className="text-sm mb-3"><span className="text-gray-500">Genre:</span> {movie.genre.label}</p>
                <p className="text-sm mb-3"><span className="text-gray-500">Country:</span> {movie.country.name}</p>
                <p className="text-sm mb-3"><span className="text-gray-500">Year:</span> {movie.year}</p>
            </div>

            <div className="p-10">
                <p className="text-gray-400 underline mb-3">Summary</p>
                <p>{movie.short_description}</p>
            </div>
            
            <div className="pl-10 mt-6 mb-10">
                <div className="text-gray-500 text-sm mb-3">Keywords</div>
                {movie.keywords.map(keyword => (
                    <div className="text-sm" key={keyword.id}>{keyword.label}</div>
                ))}
            
            </div>

            {/* Vote for movie */}
            <div className="ml-10 mb-4">
                <VoteForMovie movie={movie} />
            </div>

            {movie.votes && (
            <div className="pl-10 mt-10 w-1/3">
                <h2 className="text-gray-400 mb-3">Ratings</h2>
                {movie.votes.slice(0,3).map((vote) => (
                    <CommentCard key={vote.id} vote={vote} />
                ))}
            </div>
            )}

        </section>

    </main>
  )
}

export default MoviePage