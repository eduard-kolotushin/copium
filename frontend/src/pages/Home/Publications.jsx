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
  } from '@mui/material'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import SortIcon from '@mui/icons-material/Sort'

import PublicansPanel from '../../components/PublicationsPanel/PublicationsPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import Search from '../../components/Search/Search'
import ShowElement from '../../hoc/ShowElement'


const Header = ({ gr_xs, onClickFilter }) => {

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

  return(
    <Stack p='16px' spacing={2}>
        <Stack direction='row' width={1} justifyContent='space-between' boxSizing='border-box'>
          <Stack direction='row' spacing={2} alignItems={'center'}>
            <Fab variant={gr_xs ? 'extended' : 'circular'} color='primary' size={'small'} onClick={() => navigate('add')}>
              <AddIcon sx={{ mr: gr_xs ? 1 : 0 }}/>
              {gr_xs ? 'Добавить' : null}
            </Fab>
            <Fab variant='extended' color='primary' size='small'>
              Действия
              <ExpandMoreIcon sx={{ ml: gr_xs ? 1 : 0 }}/>
            </Fab>
          </Stack>
          {/* {!gr_xs && */}
          <Fab variant={gr_xs ? 'extended' : 'circular'} color='primary' size='small' sx={{ flexShrink: 0 }} onClick={onClickFilter}>
            <FilterAltIcon sx={{ mr: gr_xs ? 1 : 0 }}/>
            {gr_xs ? 'Фильтр' : null}
          </Fab>
          {/* } */}
        </Stack>
        <ShowElement isVisible={isShow}>
          <Box width={1}>
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

const Subheader = ({ control, name }) => {

  const [sortType, setSortType] = useState('new')

  const label = useMemo(() => {
    switch(sortType){
      case 'new':
        return 'Сначала новые'
      case 'old':
        return 'Сначала старые'
    }
  }, [sortType])

  return(
    <Stack direction={'row'} width={1} spacing={3} justifyContent={'space-between'} p={'16px'} boxSizing={'border-box'} alignItems={'center'}>
      <Search control={control} name={name} sx={{ maxWidth: '550px' }}/>
      <Fab variant='extended' size='small' sx={{ flexShrink: 0 }}>
        { label }
        <SortIcon sx={{ ml: 1 }}/>
      </Fab>
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
    <Stack direction='column' width={1}>
      <Header gr_xs={gr_xs} onClickFilter={() => setIsFilterShowing(prev => !prev)}/>
      <Divider/>
      <Subheader control={control} name={'search_article'}/>
      <Stack height={1} width={1} direction={'row'} spacing={2} sx={{ overflowX: 'hidden' }} divider={<Divider orientation="vertical" flexItem />}>
        <PublicansPanel/>
        {/* {(gr_xs || isShowingFilter) && <FilterPanel gr_xs={gr_xs} isShowingFilterState={[isShowingFilter, setIsFilterShowing]}/>} */}
      </Stack>
      {isShowingFilter && <FilterPanel gr_xs={gr_xs} isShowingFilterState={[isShowingFilter, setIsFilterShowing]}/>}
      <Outlet/>
    </Stack>
  )
}

export default Publications
