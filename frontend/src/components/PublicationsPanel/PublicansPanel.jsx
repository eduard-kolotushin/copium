import React from 'react'
import { useGetPublicationsQuery } from '../../redux/servicePublications'
import ScrollableBox from '../ScrollableBox/ScrollableBox'
import { Box, CircularProgress, Typography } from '@mui/material'
import Article from '../Article/Article'

const PublicansPanel = () => {
    
  const { data = [], isFetching, isLoading, isError } = useGetPublicationsQuery()

  if(isLoading) 
    return(
      <Box display='flex' justifyContent='center' my='18px'>
        <CircularProgress color='inherit'/>
      </Box>
    )

  if(isError) 
    return(
      <Typography width={1} textAlign='center' my={'12px'}>Ошибка. Попробуйте обновить страницу.</Typography>
    )

  return(
      <ScrollableBox height={1} width={1} sx={{ overflowY: 'auto'}}>
        { data.length != 0 ? 
          data.map(pub => <Article key={pub.doi} publication={pub}/>) : 
          <Typography width={1} textAlign='center' my={'12px'}>Список пока пуст.</Typography>}
      </ScrollableBox>
  )
}

export default PublicansPanel