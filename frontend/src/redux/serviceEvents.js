import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
    reducerPath: 'fetch_events',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Events'],
    endpoints: (build) => ({
        getEvents: build.query({
            query: () => '/event/',
            providesTags: (result) => result 
            ? [
                ...result.map(({ id }) => ({ type: 'Events', id})),
                { type: 'Events', id: 'LIST' }
            ] 
            : [{ type: 'Events', id: 'LIST' }]
        }),
        addEvent: build.mutation({
            query: (user) => ({
                url: '/event/',
                method: 'POST',
                body: user
            }),
            invalidatesTags: [{ type: 'Events', id: 'LIST' }]
        }),
    })
})

export const { useGetEventsQuery, useAddEventMutation } = eventsApi