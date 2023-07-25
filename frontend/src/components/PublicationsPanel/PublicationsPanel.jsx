import React from 'react'
import { useGetPublicationsQuery } from '../../redux/servicePublications'
import ScrollableBox from '../ScrollableBox/ScrollableBox'
import { Box, CircularProgress, List, Typography } from '@mui/material'
import Article from '../Article/Article'
import { useSelector } from 'react-redux'
import { schemePublications } from '../../schemes/schemePublications'
import dayjs from 'dayjs'
import CircleLoading from '../CircleLoading/CircleLoading'

const PublicansPanel = () => {
    
  const { data = [], isFetching, isLoading, isError } = useGetPublicationsQuery()

  const fields = useSelector(state => state.filterPublications.fields)

  let articles = data

  if(fields.types.length !== 0) { articles = articles.filter(article => fields.types.includes(article?.type)) }
  if(fields.fs.length !== 0) { articles = articles.filter(article => fields.fs.includes(article?.type)) }
  if(fields.db.length !== 0) { articles = articles.filter(article => fields.db.includes(article?.type)) }

  if(fields.doi !== null) { articles = articles.filter(article => article?.doi === fields.doi) }
  if(fields.isbn !== null) { articles = articles.filter(article => article?.isbn === fields.isbn) }

  if(!dayjs(fields.date.from).isToday() || !dayjs(fields.date.to).isToday()) { articles = articles.filter(article => dayjs(article.date).isBetween(fields.date.from, fields.date.to, 'day', '[]')) }

  if(isLoading) 
    return(
      <CircleLoading/>
    )

  if(isError) 
    return(
      <Typography width={1} textAlign='center' my={'12px'}>Ошибка. Попробуйте обновить страницу.</Typography>
    )

  return(
    <List disablePadding sx={{ width: 1 }}>
        { articles.length != 0 ? 
          articles.map(pub => <Article key={pub.id} publication={pub}/>) : 
          <Typography width={1} textAlign='center' my={'12px'}>{fields == null ? 'Список пока пуст.' : 'Соответсвий не найдено.'}</Typography> }
    </List>
      // <ScrollableBox height={1} width={1} sx={{ overflowY: 'auto'}}>
      //   { data.length != 0 ? 
      //     data.map((pub) => <Article key={pub.id} publication={pub}/>) : 
      //     <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
      // </ScrollableBox>
  )
}

export default PublicansPanel