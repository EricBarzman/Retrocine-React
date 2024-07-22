import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import favoriteSlice from './favoriteSlice';
import favoriteMiddleware from './favoriteMiddleware';
import searchSlice from './searchSlice';
import userMiddleware from './userMiddleware';

const store = configureStore({
    reducer: {
        user: userSlice,
        favorites: favoriteSlice,
        search: searchSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        favoriteMiddleware, userMiddleware,
    ),
});

export default store;