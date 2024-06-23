import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import favoriteSlice from './favoriteSlice';
import favoriteMiddleware from './favoriteMiddleware';
import searchSlice from './searchSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        favorites: favoriteSlice,
        search: searchSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        favoriteMiddleware,
    ),
});

export default store;