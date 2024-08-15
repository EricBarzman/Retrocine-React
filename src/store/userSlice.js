import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    logged: localStorage.getItem('retrocine-token') ? true : false,
    token: localStorage.getItem('retrocine-token') ?? '',
    firebaseUserId: localStorage.getItem('firebase-user-id') ?? '',
    sanityUserId: localStorage.getItem('sanity-user-id') ?? '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            const token = action.payload;

            const newState = {
                ...state,
                logged: true,
                token: token
            };
            localStorage.setItem('retrocine-token', token)
            return newState;
        },

        handleLogout: (state) => {
            const newState = {
                ...state,
                logged: false,
                token: '',
                firebaseUserId: '',
                sanityUserId: '',
            };

            localStorage.removeItem('retrocine-token')
            localStorage.removeItem('firebase-user-id')
            localStorage.removeItem('sanity-user-id')
            
            return newState;
        },

        updateUserId: (state, action) => {
            const { firebaseUserId } = action.payload;

            localStorage.setItem('firebase-user-id', firebaseUserId);
            const newState = {
                ...state,
                firebaseUserId,
            }
            return newState;
        },

        updateSanityUserId: (state, action) => {
            const { sanityUserId } = action.payload;

            localStorage.setItem('sanity-user-id', sanityUserId);
            const newState = {
                ...state,
                sanityUserId,
            }
            return newState;
        },
    }
});

export const { updateToken, handleLogout, updateUserId, updateSanityUserId } = userSlice.actions;

export default userSlice.reducer;