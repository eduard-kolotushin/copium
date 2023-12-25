import React from 'react'
import { useGetEventsQuery } from '../../redux/serviceEvents'

import CircleLoading from '../CircleLoading/CircleLoading'
import { Typography } from '@mui/material'

const EventsPanel = () => {

    const { data = [], isLoading, isFetching, isError } = useGetEventsQuery()

    if(isLoading || isFetching) 
        return(
        <CircleLoading/>
        )

    if(isError) 
        return(
        <Typography width={1} textAlign='center' my={'12px'}>Ошибка. Попробуйте обновить страницу.</Typography>
        )

    return(
        <div>Events</div>
        // <ScrollableBox height={1} width={1} sx={{ overflowY: 'auto'}}>
        //   { data.length != 0 ? 
        //     data.map((pub) => <Article key={pub.id} publication={pub}/>) : 
        //     <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
        // </ScrollableBox>
    )
}

export default EventsPanel