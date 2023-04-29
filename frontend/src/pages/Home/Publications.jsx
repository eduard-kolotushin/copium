import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { fetchGetPublications } from '../../API/API'
import { useFetch } from '../../hooks/useFetch'

import {
    Box,
    Button,
    Typography,
    Chip,
    Stack,
    Divider,
    CircularProgress,
    } from '@mui/material'

import Article from '../../components/Article/Article'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import { useGetPublicationsQuery } from '../../redux/servicePublications'

import Filter from '../../components/Filter/Filter'
import PublicansPanel from '../../components/PublicationsPanel/PublicansPanel'
import FilterPanel from '../../components/FilterPanel/FilterPanel'


const Header = () => {
  const navigate = useNavigate()
  const fields = useSelector(state => state.filterPublications.fields)

  return(
    <Stack p='24px' spacing={2}>
        <Stack direction='row' width={1} justifyContent='space-between' boxSizing='border-box'>
          <Stack direction='row' spacing={2}>
            <Button variant='contained' endIcon={<AddIcon/>} onClick={() => navigate('add')}>Добавить</Button>
            <Button variant='contained' endIcon={<FilterAltIcon/>}>Фильтр</Button>
          </Stack>
          <Button variant='contained' disableElevation endIcon={<ExpandMoreIcon/>}>Экспорт</Button>
        </Stack>
        <Box width={1}>
          {(fields?.types != null) && fields.types.map((type, index) => <FilterItem label={type} key={`type-${index}`}/>)}
          {(fields?.doi != null) && <FilterItem label={`${fields.doi ? 'Есть' : 'Нет'} DOI`}/>}
          {(fields?.isbn != null) && <FilterItem label={`${fields.isbn ? 'Есть' : 'Нет'} ISBN`}/>}
          {(fields?.date != null) && <FilterItem label={`${(new Date(fields.date.date_from)).toLocaleDateString()} - ${(new Date(fields.date.date_to)).toLocaleDateString()}`}/>}
        </Box>
    </Stack>
  )
}

const FilterItem = ({ label }) => {
  return(
    <Chip onDelete={() => {}} label={label} sx={{ m: '6px'}}/>
  )
}

const Publications = () => {
  return(
    <Stack direction='column' width={1}>
      <Header/>
      <Divider/>
      <Stack height={1} width={1} direction={'row'} spacing={2} sx={{ overflowX: 'hidden' }} divider={<Divider orientation="vertical" flexItem />}>
        <PublicansPanel/>
        <FilterPanel/>
      </Stack>
      {/* <Filter/> */}
      <Outlet/>
    </Stack>
  )
}

export default Publications
