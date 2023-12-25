import React from 'react'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import { Divider, Fab, Stack } from '@mui/material'
import EventsPanel from '../../components/EventsPanel/EventsPanel'

const Header = () => {
  
    return(
        <Stack p='16px' spacing={2}>
            <Stack direction='row' width={1} justifyContent='space-between' boxSizing='border-box'>
            <Stack direction='row' spacing={2} alignItems={'center'}>
                <Fab variant={'extended'} color='primary' size={'small'}>
                <AddIcon/>
                Добавить
                </Fab>
                <Fab variant='extended' color='primary' size='small'>
                Действия
                <ExpandMoreIcon/>
                </Fab>
            </Stack>
            <Fab variant={'extended'} color='primary' size='small' sx={{ flexShrink: 0 }}>
                <FilterAltIcon/>
                Фильтр
            </Fab>
            </Stack>
        </Stack>
    )
}

const Events = () => {
  return (
    <Stack direction='column' width={1}>
        <Header/>
        <Divider/>
        <Stack height={1} width={1} direction={'row'} spacing={2} sx={{ overflowX: 'hidden' }} divider={<Divider orientation="vertical" flexItem />}>
            <EventsPanel/>
        </Stack>
    </Stack>
  )
}

export default Events