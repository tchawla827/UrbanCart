import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    initialState: {
        userData: [],
        isLoggedIn : false
    },
    name: 'user',
    reducers: {
        loginUser : (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload
        },
        logoutUser : (state, action) => {
            state.isLoggedIn= false
            state.userData = [];
        },
        userState : (state, action) => {
            state.isLoggedIn = action.payload;
            state.userData = action.payload.data;
        }
    }
})

export const { loginUser, logoutUser, userState } = userSlice.actions;
export default userSlice.reducer