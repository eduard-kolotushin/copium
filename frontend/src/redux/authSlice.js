import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: null,
        isFirstEnter: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload.isAuth
            state.isFirstEnter = action.payload.isFirstEnter
        }
    }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer