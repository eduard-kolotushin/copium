import React from 'react'
import { useGetPublicationsQuery } from '../../redux/servicePublications'
import ScrollableBox from '../ScrollableBox/ScrollableBox'
import { Box, CircularProgress, List, Typography } from '@mui/material'
import Article from '../Article/Article'
import { useSelector } from 'react-redux'
import { schemePublications } from '../../schemes/schemePublications'

const PublicansPanel = () => {
    
  const { data = [], isFetching, isLoading, isError } = useGetPublicationsQuery()

  const fields = useSelector(state => state.filterPublications.fields)

  let articles = data

  // if(fields?.types !== undefined) articles = articles.filter((article) => {
  //   const types = fields.types.map(type => schemePublications.find(el => el.title == type).p_type)
  //   return types.includes(article.p_type)
  // })
  // if(fields?.doi !== undefined) articles = articles.filter((article) => !!article.doi)
  // if(fields?.isbn !== undefined) articles = articles.filter((article) => !!article.isbn)
  // if(fields?.date !== undefined) articles = articles.filter((articles) => {
  //   const date_from = (new Date(fields.date.date_from)).getTime()
  //   const date_to = (new Date(fields.date.date_to)).getTime()
  //   const date_current = (new Date(articles.date)).getTime()

  //   return date_current >= date_from && date_current <= date_to
  // })

  if(isLoading) 
    return(
      <Box width={1} display='flex' justifyContent='center' my='18px'>
        <CircularProgress color='inherit'/>
      </Box>
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