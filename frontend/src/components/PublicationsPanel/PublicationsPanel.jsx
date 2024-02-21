import React from 'react'
import { List, Typography } from '@mui/material'
import { useGetPublicationsQuery } from '../../redux/servicePublications'
import Article from '../Article/Article'
import CircleLoading from '../CircleLoading/CircleLoading'
import { useFilter } from '../../hooks/useFilter'

const PublicationsPanel = ({ articles, isLoading, isError, isInitialState}) => {
    
  // const { data = [], isFetching, isLoading, isError } = useGetPublicationsQuery()
  // const { articles, isInitialState } = useFilter(data)

  // const { fields, isInitialState } = useSelector(state => state.filterPublications)

  // let articles = data

  // if(fields.types.length !== 0) { articles = articles.filter(article => fields.types.includes(article?.type)) }
  // if(fields.fs.length !== 0) { articles = articles.filter(article => fields.fs.includes(article?.type)) }
  // if(fields.db.length !== 0) { articles = articles.filter(article => fields.db.includes(article?.type)) }

  // if(fields.doi !== null) { articles = articles.filter(article => article?.doi === fields.doi) }
  // if(fields.isbn !== null) { articles = articles.filter(article => article?.isbn === fields.isbn) }

  // if(!dayjs(fields.date.from).isToday() || !dayjs(fields.date.to).isToday()) { articles = articles.filter(article => dayjs(article.date).isBetween(fields.date.from, fields.date.to, 'day', '[]')) }

  if(isLoading) 
    return(
      <CircleLoading/>
    )

  if(isError) 
    return(
      <Typography width={1} textAlign='center' my={'12px'}>Ошибка. Попробуйте обновить страницу.</Typography>
    )

  if(articles.length == 0)
    return(
      <Typography width={1} textAlign='center' my={'12px'}>
        { isInitialState ? 'Список пока пуст.' : 'Соответсвий не найдено.' }
      </Typography>
    )

  return(
    <List disablePadding sx={{ width: 1 }}>
      { articles.map(pub => <Article key={pub.id} publication={pub}/>) }
    </List>
      // <ScrollableBox height={1} width={1} sx={{ overflowY: 'auto'}}>
      //   { data.length != 0 ? 
      //     data.map((pub) => <Article key={pub.id} publication={pub}/>) : 
      //     <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
      // </ScrollableBox>
  )
}

export default PublicationsPanel