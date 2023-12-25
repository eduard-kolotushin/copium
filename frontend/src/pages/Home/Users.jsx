import React, { useState } from 'react'
import { Badge, Box, Divider, Fab, Grid, List, ListItem, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { scheme } from '../../schemes/schemeRoles'
import { useGetUsersQuery } from '../../redux/serviceUsers'
import { Outlet, useNavigate } from 'react-router-dom'

import CircleLoading from '../../components/CircleLoading/CircleLoading'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'

const Header = () => {

  const navigate = useNavigate()

  const [countRequests, setCountRequests] = useState(2)

  return(
    <>
    <Stack py='12px' spacing={2}>
      <Stack direction='row' width={1} justifyContent='space-between' boxSizing='border-box'>
        <Stack direction='row' spacing={2} alignItems={'center'}>
          <Fab variant={'extended'} color='primary' size={'small'} onClick={() => navigate('add')}>
            <AddIcon/>
            Добавить
          </Fab>

          <Badge badgeContent={countRequests} color="error">
            <Fab variant={'extended'} color='primary' size={'small'} onClick={() => {}}>
              Заявки
              <NotificationAddIcon/>
            </Fab>
          </Badge>
        </Stack>
      </Stack>
    </Stack>
    </>
  )
}

const HeaderGrid = () => {
  return(
    <>
    <Divider/>
    
    <Grid container alignItems={'center'} spacing={2} py={'12px'}>
      <Grid item xs>
        <Typography fontWeight={'bold'}>Фамилия</Typography>
      </Grid>
      <Grid item xs>
        <Typography fontWeight={'bold'}>Имя</Typography>
      </Grid>
      <Grid item xs>
        <Typography fontWeight={'bold'}>Отчество</Typography>
      </Grid>
      <Grid item xs>
        <Typography fontWeight={'bold'}>email</Typography>
      </Grid>
    </Grid>

    <Divider/>
    </>
  )
}

const User = ({ user }) => {
  return(
    <>
    <ListItem disableGutters py={'6px'}>
      <Grid container alignItems={'center'} spacing={2}>
        <Grid item xs>
          <Typography>{user.firstname || '-'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{user.lastname  || '-'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{user.middlename  || '-'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography>{user.email}</Typography>
        </Grid>
      </Grid>
    </ListItem>
    <Divider/>
    </>
  )
}

const UsersPanel = () => {

  const { data: users = [], isFetching, isLoading, isError } = useGetUsersQuery()

  if(isLoading) 
    return(
      <CircleLoading/>
    )

  if(isError) 
    return(
      <Typography width={1} textAlign='center' my={'12px'}>Ошибка. Попробуйте обновить страницу.</Typography>
    )

  return(
    <List disablePadding>
      {users.map((user, ind) => <User user={user} key={`user-${ind}`}/>)}
    </List>
  )
}

const Users = () => {
  return (
    <Box width={1} px={'12px'}>
      <Header/>
      <HeaderGrid/>
      <UsersPanel/>
      <Outlet/>
    </Box>
  )
}

export default Users