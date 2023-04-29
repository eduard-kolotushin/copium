import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        credential: null
    },
    reducers: {
        setUser: (state, action) => {
            state.credential = action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer