import { createSlice } from '@reduxjs/toolkit';
import axios from '@/components/utils/axios'

export const initialState = {
    logged: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
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
            localStorage.setItem('token', token)
            // axios.defaults.headers.common['Authorization'] = "Token " + token;
            return newState;
        },

        handleLogout: (state) => {
            const newState = {
                ...state,
                logged: false,
                token: '',
            };
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = "";
            return newState;
        }
    }
});

export const { updateToken, handleLogout } = userSlice.actions;

export default userSlice.reducer;