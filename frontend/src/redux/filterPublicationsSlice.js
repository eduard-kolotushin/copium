import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
    types: [],
    doi: null,
    isbn: null,
    date: {
      from: dayjs().format('YYYY-MM-DD'),
      to: dayjs().format('YYYY-MM-DD'),
    },
    fs: [],
    db: [],
}

const filterPublicationsAlert = createSlice({
    name: 'filter',
    initialState: { 
        fields: initialState,
    },
    reducers: {
        setFilterPublications: (state, actions) => {
            state.fields = actions.payload
        },
        clearFilterPublications: (state, actions) => {
            state.fields = initialState
        },
        clearFilterField: (state, actions) => {
            state.fields[actions.payload.name] = actions.payload?.value ? state.fields[actions.payload.name].toSpliced(state.fields[actions.payload.name].indexOf(state.fields[actions.payload.value]), 1) : initialState[actions.payload.name]
        }
    }
})

export const { setFilterPublications, clearFilterPublications, clearFilterField } = filterPublicationsAlert.actions

export default filterPublicationsAlert.reducer