import { createSlice } from "@reduxjs/toolkit"


const publicationsSlice = createSlice({
    name: 'publications',
    initialState: {
        items: null
    },
    reducers: {
        setPublications: (state, action) => {
            state.items = action.payload
        }
    }
})

export const { setPublications } = publicationsSlice.actions

export default publicationsSlice.reducer