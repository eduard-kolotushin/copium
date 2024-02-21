import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import {
  Box,
  Stack,
  Button,  
  Tabs,
  Tab,
  Divider,
  Paper,
  } from '@mui/material'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'

import Search from '../../components/Search/Search'
import ShowElement from '../../hoc/ShowElement'
import ActionsMenu from './ActionsMenu'

const Header = ({ control, name }) => {

    const navigate = useNavigate()
  
    const [anchorEl, setAnchorEl] = useState(null)
    const [id, setId] = useState(0)
  
    return(
    <Paper>
        <Tabs value={id} onChange={(__, newId) => setId(newId)}>
            <Tab label='Публикации' id='tab-0'/>
            <Tab label='Конференции' id='tab-1'/>
            <Tab label='Патенты' id='tab-2'/>
            <Tab label='Гранты' id='tab-3'/>
        </Tabs>

        <Divider/>

        <Stack p='8px'>
            <Stack direction='row' width={1} justifyContent='space-between' boxSizing='border-box'>
                <Stack direction='row' spacing={2} alignItems={'center'}>
                    <Button variant="text" startIcon={<AddIcon/>} onClick={() => navigate('add')}>
                    Добавить
                    </Button>
                    <Button variant='text' endIcon={<ExpandMoreIcon/>} onClick={(event) => setAnchorEl(event.currentTarget)}>
                    Действия
                    </Button>
                    <ActionsMenu onClose={() => setAnchorEl(null)} anchorEl={anchorEl} numberElements={1} maxNumberElements={3}/>
                </Stack>
                <Stack direction='row' spacing={2} alignItems={'center'}>
                    <Box flexShrink={0}>
                    <Search control={control} name={name}/>
                    </Box>
                    <Button variant="text" startIcon={<FilterAltIcon/>} onClick={() => navigate('filter')}>
                    Фильтр
                </Button>
                </Stack>
            </Stack>
        </Stack>
    </Paper>
    )
}

export default Header