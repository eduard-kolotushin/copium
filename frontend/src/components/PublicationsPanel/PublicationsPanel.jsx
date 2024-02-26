import React from 'react'
import { List, Typography } from '@mui/material'
import Publication from '../Publication/Publication'
import CircleLoading from '../CircleLoading/CircleLoading'

const PublicationsPanel = ({ articles, isLoading, isError, isInitialState}) => {
    
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
      { articles.map(pub => <Publication key={pub.id} publication={pub}/>) }
    </List>
      // <ScrollableBox height={1} width={1} sx={{ overflowY: 'auto'}}>
      //   { data.length != 0 ? 
      //     data.map((pub) => <Article key={pub.id} publication={pub}/>) : 
      //     <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
      // </ScrollableBox>
  )
}

export default PublicationsPanel