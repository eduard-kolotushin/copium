import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import {
  Box,
  Chip,
  } from '@mui/material'

import ShowElement from '../../hoc/ShowElement'
import FilterTag from '../../components/FilterTag/FilterTag'
import { clearFilterPublications } from '../../redux/filterPublicationsSlice'


const FilterTags = () => {
  const dispatch = useDispatch()

  const { fields } = useSelector(state => state.filterPublications)

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
    <ShowElement isVisible={isShow}>
      <Box width={1} py={'6px'}>
        {isShow && <Chip variant='outlined' onClick={() => dispatch(clearFilterPublications())} label={'Очистить фильтр'} color='primary'/>}
        {isShowTypes && fields.types.map((type, index) => <FilterTag name='types' value={type} label={type.label} key={`type-${index}`}/>)}
        {isShowDOI && <FilterTag name='doi' label={`${fields.doi ? 'Есть' : 'Нет'} DOI`}/>}
        {isShowISBN && <FilterTag name='isbn' label={`${fields.isbn ? 'Есть' : 'Нет'} ISBN`}/>}
        {isShowDate && <FilterTag name='date' label={`${dayjs(fields.date.from).format('DD.MM.YYYY')} - ${dayjs(fields.date.to).format('DD.MM.YYYY')}`}/> }
        {isShowFS && fields.fs.map((type, index) => <FilterTag name='fs' value={type} label={type.label} key={`fs-${index}`}/>)}
        {isShowDB && fields.db.map((type, index) => <FilterTag name='db' value={type} label={type.label} key={`db-${index}`}/>)}
      </Box>
    </ShowElement>
  )
}

export default FilterTags