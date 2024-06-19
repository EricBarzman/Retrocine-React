import { updateFavorites } from "./favoriteSlice";
import axios from '@/components/utils/axios';

/**
 * 
 * Récupère dans l'API les favoris de l'utilisateur
 */
const favoriteMiddleware = (store) => (next) => (action) => {
    if (action.type === 'FETCH_FAVORITES') {
      axios.get('votes/my-favorites/')
        .then((response) => store.dispatch(updateFavorites(response.data)));
    }
    next(action);
  };
  
  export default favoriteMiddleware;
  