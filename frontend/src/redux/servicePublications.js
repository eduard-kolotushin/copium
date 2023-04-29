import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const publicationsApi = createApi({
    reducerPath: 'fetch_publications',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Publications'],
    endpoints: (build) => ({
        getPublications: build.query({
            query: () => '/publications',
            providesTags: (result) => result 
            ? [
                ...result.map(({ id }) => ({ type: 'Publications', id})),
                { type: 'Publications', id: 'LIST' }
            ] 
            : [{ type: 'Publications', id: 'LIST' }]
        }),
        addPublication: build.mutation({
            query: (publications) => ({
                url: '/publications',
                method: 'POST',
                body: publications
            }),
            invalidatesTags: [{ type: 'Publications', id: 'LIST' }]
        }),
        deletePublication: build.mutation({
            query: (id) => ({
                url: '/publications',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: [{ type: 'Publications', id: 'LIST' }]
        })
    })
})

export const { useGetPublicationsQuery, useAddPublicationMutation, useDeletePublicationMutation } = publicationsApi