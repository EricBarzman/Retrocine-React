import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    my_favorites: [],
}

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        updateFavorites: (state, action) => {
            return {
                ...state,
                my_favorites: action.payload
            };
        }
    }
});

export const { updateFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;