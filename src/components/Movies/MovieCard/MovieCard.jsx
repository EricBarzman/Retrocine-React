/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { FaPlay, } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";

function MovieCard({ movie }) {

  function addToMyFavorites(event) {
    console.log(event.currentTarget.id);
  }

  return (
    <article className='w-[245px] mx-1 mb-6'>
        
        <Link to={'/movies/' + movie.slug}><img className='rounded-lg' src={movie.get_image} alt="movie image" /></Link>
        
        <h2 className='font-semibold'>{movie.title}</h2>
        
        <p className='text-gray-700 mt-3'>{movie.year}</p>
        
        <p className='text-sm text-gray-400'>
          Dir. by <span className='font-semibold'>{movie.director.first_name} {movie.director.last_name}</span>
        </p>
        
        <div className='ml-4 mr-10 mt-4 flex flex-row justify-between'>
          <button>
            <Link to={'/movies/' + movie.slug}><FaPlay /></Link>
          </button>

          <button onClick={addToMyFavorites} id={movie.id}>
            <MdFavoriteBorder />
          </button>
        </div>

    </article>
  )
}

export default MovieCard