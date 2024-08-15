/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FaPlay, } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import toast from 'react-hot-toast';

import { createUserFavorite, deleteUserFavorite } from '@/lib/apis';

function MovieCard({ movie }) {


  const dispatch = useDispatch();
  
  const { sanityUserId } = useSelector((state) => state.user);
  const my_favorites = useSelector((state) => state.favorites.my_favorites);
  const [favoriteId, setFavoriteId] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  

  useEffect(() => {
    const foundFavorite = my_favorites.some((favorite) => favorite.movie._id === movie._id)
    if (foundFavorite) {
      setIsFavorite(true);
      setFavoriteId(foundFavorite._id);
    }
  }, [])
  

  function addToMyFavorites() {   
    createUserFavorite(sanityUserId, movie._id)
      .then(() => {
        toast.success('Added to my favorites');
        setIsFavorite(true);
        dispatch({ type: 'FETCH_FAVORITES' });        
      })

      .catch(() => {
        toast.error('Could not add to favorites');
      })
  }


  function removeFromMyFavorites() {
    console.log(favoriteId);
    
    deleteUserFavorite(favoriteId)
      .then(() => {
        toast.success('Removed from my favorites');
        dispatch({ type: 'FETCH_FAVORITES' });
        // Little cheat to display card no longer as favorite, yet without rerendering
        setIsFavorite(false);
      })
      .catch(() => {
        toast.error('Could not remove from favorites')
      })
  }


  return (
    <article className='w-[245px] mx-1 mb-6'>
        
        <Link to={'/movies/' + movie.slug}>
          <img className='rounded-lg' src={movie.imageUrl} alt="movie image" />
        </Link>
        
        <h2 className='font-semibold'>{movie.title}</h2>
        
        <p className='text-gray-700 mt-3'>{movie.year}</p>
        
        <p className='text-sm text-gray-400'>
          Dir. by <span className='font-semibold'>{movie.director.first_name} {movie.director.last_name}</span>
        </p>
        
        <div className='ml-4 mr-10 mt-4 flex flex-row justify-between'>
          <button>
            <Link to={'/movies/' + movie.slug}><FaPlay /></Link>
          </button>

          {!isFavorite && (
            <button onClick={addToMyFavorites}>
              <MdFavoriteBorder />
            </button>
          )}
          
          {isFavorite && (
            <button onClick={removeFromMyFavorites}>
              <MdFavorite className='fill-primary' />
            </button>
          )}
        
        </div>

    </article>
  )
}

export default MovieCard