import { createSlice } from "@reduxjs/toolkit";

const filterPublicationsAlert = createSlice({
    name: 'filter',
    initialState: { fields: null },
    reducers: {
        setFilterPublications: (state, actions) => {
            state.fields = actions.payload
        },
        clearFilterPublications: (state, actions) => {
            state.fields = null
        }
    }
})

export const { setFilterPublications, clearFilterPublications } = filterPublicationsAlert.actions

export default filterPublicationsAlert.reducer