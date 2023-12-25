import { compose, configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import alertReducer from './alertSlice'
import authReducer from './authSlice'
import userReducer from './userSlice'
import publicationsReducer from './publicationsSlice'
import filterPublicationsReducer from './filterPublicationsSlice'
import { publicationsApi } from './servicePublications'
import { usersApi } from './serviceUsers'
import { eventsApi } from './serviceEvents'

export const store = configureStore(
  {
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        user: userReducer,
        publications: publicationsReducer,
        filterPublications: filterPublicationsReducer,
        [publicationsApi.reducerPath] : publicationsApi.reducer,
        [usersApi.reducerPath] : usersApi.reducer,
        [eventsApi.reducerPath] : eventsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(publicationsApi.middleware).concat(usersApi.middleware).concat(eventsApi.middleware),
    devTools: process.env.NODE_ENV === 'development'
  })