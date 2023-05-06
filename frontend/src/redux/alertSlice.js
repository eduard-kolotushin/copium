import { createSlice } from "@reduxjs/toolkit"

const alertSlice = createSlice({
    name: 'alert',
    initialState: { isVisible: false },
    reducers: {
        showSuccessAlert: (state, action) => {
            state.type = 'success'
            state.message = action.payload
        },
        showErrorAlert: (state, action) => {
            state.type = 'error'
            state.message = action.payload
        },
        showWarningAlert: (state, action) => {
            state.type = 'warning'
            state.message = action.payload
        },
        hideAlert: (state) => {
            state.message = ''
        },
    }
})

export const { showSuccessAlert, showErrorAlert, hideAlert } = alertSlice.actions

export default alertSlice.reducer