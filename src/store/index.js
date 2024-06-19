import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import favoriteSlice from './favoriteSlice';
import favoriteMiddleware from './favoriteMiddleware';

const store = configureStore({
    reducer: {
        user: userSlice,
        favorites: favoriteSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        favoriteMiddleware,
    ),
});

export default store;