import { updateFavorites } from "./favoriteSlice";
import { getUserFavorites, getUserInfo } from "@/lib/apis.js";

/**
 * 
 * Récupère dans l'API les favoris de l'utilisateur
 */
const favoriteMiddleware = (store) => (next) => (action) => {

  if (action.type === 'FETCH_FAVORITES') {
    
    const firebaseUserId = store.getState().user.firebaseUserId;
    
    getUserInfo(firebaseUserId)
      .then(result =>
          getUserFavorites(result._id)
            .then(response => store.dispatch(updateFavorites(response)))
      )
  }
  next(action);
};
  
  export default favoriteMiddleware;
  