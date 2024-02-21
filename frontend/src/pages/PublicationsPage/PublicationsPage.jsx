import React, { useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

import { clearFilterField } from '../../redux/filterPublicationsSlice'

import {
  Box,
  Chip,
  Stack,
  Divider,
  Fab,
  useMediaQuery,
  Button,
  Paper,
  Tabs,
  Tab,
  Typography,
  Card
  } from '@mui/material'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import SortIcon from '@mui/icons-material/Sort'

import PublicationsPanel from '../../components/PublicationsPanel/PublicationsPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import Search from '../../components/Search/Search'
import ShowElement from '../../hoc/ShowElement'
import ActionsMenu from './ActionsMenu'
import Header from './PublicationsPage-Header'
import Panel from './PublicationsPage-Panel'

const Subheader = ({ counts }) => {

  const [sortType, setSortType] = useState(0)

  const label = useMemo(() => {
    switch(sortType){
      case 0:
        return 'Сначала новые'
      case 1:
        return 'Сначала старые'
    }
  }, [sortType])

  return(
    <Stack direction={'row'} width={1} spacing={3} justifyContent={'space-between'} p={'8px'} boxSizing={'border-box'} alignItems={'center'}>
      <Typography fontWeight={'bold'}>{`Найдено публикаций (${counts | 0})`}</Typography>
      <Button variant='text' color='inherit' size='small' sx={{ flexShrink: 0 }} >
        { label }
        <SortIcon/>
      </Button>
    </Stack>
  )
}

const FilterItem = ({ label, name, value }) => {
  const gr_xs = useMediaQuery('(min-width:1200px)')
  const dispatch = useDispatch()

  return(
    <Chip onDelete={() => dispatch(clearFilterField({ name, value })) } label={label} sx={{ m: '6px'}} size={!gr_xs ? 'small' : 'default'}/>
  )
}

const Publications = () => {
  const gr_xs = useMediaQuery('(min-width:1200px)')

  const [isShowingFilter, setIsFilterShowing] = useState(gr_xs)

  const { control } = useForm({ 
    defaultValues: {
      search_article: ''
    }
  })

  return(
    <Stack direction='column' width={1} spacing={'24px'} my={'24px'} component={'main'}>
      <Header control={control} name={'search_publication'} onClickFilter={() => setIsFilterShowing(prev => !prev)}/>
      <Panel/>
      <Outlet/>
    </Stack>
  )
}

export default Publications
