import { updateFavorites } from "./favoriteSlice";
import { getUserFavorites } from "../lib/apis.js";

/**
 * 
 * Récupère dans l'API les favoris de l'utilisateur
 */
const favoriteMiddleware = (store) => (next) => (action) => {

  if (action.type === 'FETCH_FAVORITES') {
    const sanityUserId = store.getState().user.sanityUserId;
    getUserFavorites(sanityUserId)
      .then(response => {
        store.dispatch(updateFavorites(response))
      })
    }
  next(action);
};
  
  export default favoriteMiddleware;
  