import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    logged: false,
    username: '',
    mail: '',
    token: '',
    avatarURL: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            const newState = {
                ...state,
                logged: true,
                token: action.payload
            };
            return newState;
        },

        handleLogout: (state) => {
            const newState = {
                ...state,
                logged: false,
                username: '',
                mail: '',
                token: '',
                avatarURL: '',
            };
            return newState;
        }
    }
});

export const { updateToken, handleLogout } = userSlice.actions;

export default userSlice.reducer;