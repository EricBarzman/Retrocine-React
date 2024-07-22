/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import { FaPlay, } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import toast from 'react-hot-toast';
import axios from '@/components/utils/axios'

function MovieCard({ movie }) {

  const my_favorites = useSelector((state) => state.favorites.my_favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const found = my_favorites.some((favorite) => favorite.id === movie.id)
    if (found) setIsFavorite(true);
  }, [])
  

  function addToMyFavorites() {   
    axios
      .get(`users/my-favorites/add/${movie.id}`)
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
      .get(`users/my-favorites/remove/${movie.id}`)
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