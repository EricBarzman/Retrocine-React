import { createSlice } from '@reduxjs/toolkit';
import axios from '@/components/utils/axios'

export const initialState = {
    logged: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ?? '',
    username: localStorage.getItem('username') ?? '',
    email: localStorage.getItem('email') ?? '',
    about: localStorage.getItem('about') ?? '',
    avatar: localStorage.getItem('avatar') ?? '',
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
                email:'',
                about:'',
                avatar: '',
                username: '',
            };
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('about')
            localStorage.removeItem('avatar')
            localStorage.removeItem('username')
            axios.defaults.headers.common['Authorization'] = "";
            return newState;
        },

        updateUserInfo: (state, action) => {
            const { about, avatar, user } = action.payload;
            
            localStorage.setItem('about', about);
            localStorage.setItem('email', user.email);
            localStorage.setItem('avatar', avatar.get_image);
            localStorage.setItem('username', user.username);

            const newState = {
                ...state,
                about,
                avatar: avatar.get_image,
                email: user.email,
                username: user.username, 
            }
            return newState;
        },
    }
});

export const { updateToken, handleLogout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;