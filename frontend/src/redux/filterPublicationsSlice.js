import { createSlice } from "@reduxjs/toolkit"
import dayjs from "dayjs"
import isEqual from "lodash.isequal"

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
        isInitialState: true
    },
    reducers: {
        setFilterPublications: (state, actions) => {
            state.fields = actions.payload
            state.isInitialState = isEqual(state.fields, initialState)
        },
        clearFilterPublications: (state, actions) => {
            state.fields = initialState
            state.isInitialState = isEqual(state.fields, initialState)
        },
        clearFilterField: (state, actions) => {
            state.fields[actions.payload.name] = actions.payload?.value ? state.fields[actions.payload.name].toSpliced(state.fields[actions.payload.name].indexOf(state.fields[actions.payload.value]), 1) : initialState[actions.payload.name]
            state.isInitialState = isEqual(state.fields, initialState)
        }
    }
})

export const { setFilterPublications, clearFilterPublications, clearFilterField } = filterPublicationsAlert.actions

export default filterPublicationsAlert.reducer