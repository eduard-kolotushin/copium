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
  Typography
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


const Header = ({ control, name, onClickFilter }) => {

  const navigate = useNavigate()
  const { fields, initialState } = useSelector(state => state.filterPublications)

  const isShowTypes = fields.types.length !== 0
  const isShowFS = fields.fs.length !== 0
  const isShowDB = fields.db.length !== 0
  const isShowDOI = fields.doi !== null
  const isShowISBN = fields.isbn !== null
  const isShowDate = !dayjs(fields.date.from).isToday() || !dayjs(fields.date.to).isToday()

  const isShow = (
      isShowTypes ||
      isShowFS ||
      isShowDB ||
      isShowDOI ||
      isShowISBN ||
      isShowDate
      )

  const [anchorEl, setAnchorEl] = useState(null)

  return(
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
            <Button variant="text" startIcon={<FilterAltIcon/>} onClick={onClickFilter}>
            Фильтр
          </Button>
          </Stack>
        </Stack>
        <ShowElement isVisible={isShow}>
          <Box width={1}>
            {isShow && <Chip variant='outlined' onClick={() => null} label={'Очистить фильтр'} color='primary'/>}
            {isShowTypes && fields.types.map((type, index) => <FilterItem name='types' value={type} label={type.label} key={`type-${index}`}/>)}
            {isShowDOI && <FilterItem name='doi' label={`${fields.doi ? 'Есть' : 'Нет'} DOI`}/>}
            {isShowISBN && <FilterItem name='isbn' label={`${fields.isbn ? 'Есть' : 'Нет'} ISBN`}/>}
            {isShowDate && <FilterItem name='date' label={`${dayjs(fields.date.from).format('DD.MM.YYYY')} - ${dayjs(fields.date.to).format('DD.MM.YYYY')}`}/> }
            {isShowFS && fields.fs.map((type, index) => <FilterItem name='fs' value={type} label={type.label} key={`fs-${index}`}/>)}
            {isShowDB && fields.db.map((type, index) => <FilterItem name='db' value={type} label={type.label} key={`db-${index}`}/>)}
          </Box>
        </ShowElement>
    </Stack>
  )
}

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

  const [id, setId] = useState(0)

  return(
    <Stack direction='column' width={1}>
      <Tabs value={id} onChange={(__, newId) => setId(newId)}>
        <Tab label='Публикации' id='tab-0'/>
        <Tab label='Конференции' id='tab-1'/>
        <Tab label='Патенты' id='tab-2'/>
        <Tab label='Гранты' id='tab-3'/>
      </Tabs>
      <Divider/>
      <Header control={control} name={'search_publication'} onClickFilter={() => setIsFilterShowing(prev => !prev)}/>
      <Divider/>
      <Subheader control={control} name={'search_article'}/>
      <Stack height={1} width={1} direction={'row'} spacing={2} sx={{ overflowX: 'hidden' }} divider={<Divider orientation="vertical" flexItem />}>
        <PublicationsPanel/>
      </Stack>
      <ShowElement isVisible={isShowingFilter}>
        <FilterPanel gr_xs={gr_xs} isShowingFilterState={[isShowingFilter, setIsFilterShowing]}/>
      </ShowElement>
      <Outlet/>
    </Stack>
  )

  return(
    <Stack direction='column' width={1}>
      <Header gr_xs={gr_xs} onClickFilter={() => setIsFilterShowing(prev => !prev)}/>
      <Divider/>
      <Subheader control={control} name={'search_article'}/>
      <Stack height={1} width={1} direction={'row'} spacing={2} sx={{ overflowX: 'hidden' }} divider={<Divider orientation="vertical" flexItem />}>
        <PublicationsPanel/>
        {/* {(gr_xs || isShowingFilter) && <FilterPanel gr_xs={gr_xs} isShowingFilterState={[isShowingFilter, setIsFilterShowing]}/>} */}
      </Stack>
      {isShowingFilter && <FilterPanel gr_xs={gr_xs} isShowingFilterState={[isShowingFilter, setIsFilterShowing]}/>}
      <Outlet/>
    </Stack>
  )
}

export default Publications
