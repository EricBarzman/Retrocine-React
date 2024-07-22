import axios from '@/components/utils/axios';
import { updateUserInfo } from './userSlice';

// Récupère les infos user

const userMiddleware = (store) => (next) => (action) => {
    if (action.type === 'FETCH_USER_INFOS') {
      axios.get('votes/user-infos/')
        .then((response) => {
          store.dispatch(updateUserInfo(response.data))
        });
    }
    next(action);
  };
  
export default userMiddleware; 