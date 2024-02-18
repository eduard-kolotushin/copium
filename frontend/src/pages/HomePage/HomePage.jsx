import React, { useState, useRef } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { fetchGetLogout } from '../../API/API'
import routes from '../../routes/routesSidebar'

import { Container,
  Stack, 
  Typography,
  Menu,
  MenuItem,
  Box,
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Divider,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction
  } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import Logo from '../../components/Logo/Logo'
import { Logout } from '@mui/icons-material'
import { useLogout } from '../../hooks/useLogout'
import Toolbar from './HomePage-Toolbar'
import Sidebar from './HomePage-Sidebar'
import HomeAppBar from './Home-AppBar'

const Search = () => {
  return(
    <Box display={'flex'} sx={{
      backgroundColor: '#F5F5F5',
      borderRadius: '12px'
    }}>
      <InputBase placeholder='Поиск...' sx={{
        ml: '8px',
        maxWidth: '250px'
      }}/>
      <IconButton>
        <SearchIcon/>
      </IconButton>
    </Box>
  )
}

const Home = () => {
  const gr_xs = useMediaQuery('(min-width:1200px)')
  const user = useSelector(state => state.user.credential)
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Container maxWidth={'lg'} sx={{ height: '100vh' }} disableGutters>
      <Stack boxSizing={'border-box'} flexDirection={'column'} width={1} height={1} px={gr_xs ? '24px' : '0px'}>
        <Toolbar user={user} gr_xs={gr_xs} setSearchParams={setSearchParams}/>

        <Stack flexDirection={gr_xs ? 'row' : 'column-reverse'} height={1}>
          <Sidebar gr_xs={gr_xs}/>
          <Box sx={{
            display: 'flex',
            flexGrow: 1,
            width: 1,
            my: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflowY: 'hidden'
          }}
          component={'main'}
          >
            <Outlet/>
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Home