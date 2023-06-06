import React from 'react'
import { useGetPublicationsQuery } from '../../redux/servicePublications'
import ScrollableBox from '../ScrollableBox/ScrollableBox'
import { Box, CircularProgress, List, Typography } from '@mui/material'
import Article from '../Article/Article'

const PublicansPanel = () => {
    
  const { data = [], isFetching, isLoading, isError } = useGetPublicationsQuery()

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
        { data.length != 0 ? 
          data.map((pub) => <Article key={pub.id} publication={pub}/>) : 
          <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
    </List>
      // <ScrollableBox height={1} width={1} sx={{ overflowY: 'auto'}}>
      //   { data.length != 0 ? 
      //     data.map((pub) => <Article key={pub.id} publication={pub}/>) : 
      //     <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
      // </ScrollableBox>
  )
}

export default PublicansPanel