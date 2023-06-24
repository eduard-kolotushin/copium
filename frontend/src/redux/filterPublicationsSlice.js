import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    types: [],
    doi: null,
    isbn: null,
    date: {
      from: dayjs().toString(),
      to: dayjs().toString(),
    },
    fs: [],
    db: [],
}

const filterPublicationsAlert = createSlice({
    name: 'filter',
    initialState: { 
        fields: initialState
    },
    reducers: {
        setFilterPublications: (state, actions) => {
            state.fields = actions.payload
        },
        clearFilterPublications: (state, actions) => {
            state.fields = initialState
        }
    }
})

export const { setFilterPublications, clearFilterPublications } = filterPublicationsAlert.actions

export default filterPublicationsAlert.reducer