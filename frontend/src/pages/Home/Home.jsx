import React, { useState, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
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
  Divider
  } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import Logo from '../../components/Logo/Logo'
import { Logout } from '@mui/icons-material'
import { useLogout } from '../../hooks/useLogout'

const SideBar = () => {
  return(
    <Stack flexDirection={'column'} sx={{
      height: 1,
      width: '250px',
      backgroundColor: '#F5F5F5'
    }}>
      <Box mx={'auto'} pt={'16px'}>
        <Logo fontSize={35}/>
      </Box>
      <Box sx={{
        my: '150px',
        width: '250px',
      }}>
        <List>
          {routes.map((route, index) => <SidebarButton key={index} icon={route.icon} label={route.title} path={route.path}/>)}
        </List>
      </Box>
    </Stack>
  )
}

const SidebarButton = ({ icon, label, path }) => {

  const navigate = useNavigate()

  const handlerClick = (event) => {
    navigate(path)
  }

  return(
    <ListItem disablePadding>
      <ListItemButton sx={{ color: '#575757'}} onClick={handlerClick}>
        <ListItemIcon sx={{ color: 'inherit'}}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={label}/>
      </ListItemButton>
    </ListItem>
  )
}

const Search = () => {
  return(
    <Box display={'flex'} sx={{
      backgroundColor: '#F5F5F5',
      borderRadius: '12px'
    }}>
      <InputBase placeholder='Поиск...' sx={{
        ml: '8px',
        width: '250px'
      }}/>
      <IconButton>
        <SearchIcon/>
      </IconButton>
    </Box>
  )
}

const Profile = ({ user: { first_name } }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return(
    <Box>
      <ListItemButton sx={{ py: '12px' }} onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Avatar sx={{ backgroundColor: '#82AEE4', width: '32px', height: '32px', mr: '6px', fontSize: '16px' }}>
          {first_name[0]}
        </Avatar>
        <Typography px={'12px'}>{first_name}</Typography>
        <ExpandMoreIcon/>
      </ListItemButton>
      <ProfileMenu onClose={() => setAnchorEl(null)} anchorEl={anchorEl}/>
    </Box>
  )
}

const ProfileMenu = ({ anchorEl, onClose }) => {
  const logout = useLogout()

  return(
    <Menu 
      elevation={1}
      sx={{
        m: '6px'
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}>
      <ListItemButton disableRipple>
        <ListItemIcon>
          <SettingsIcon/>
        </ListItemIcon>
        <Typography>Настройки</Typography>
      </ListItemButton>
      <Divider/>
      <ListItemButton disableRipple onClick={logout}>
        <ListItemIcon>
          <Logout/>
        </ListItemIcon>
        <Typography>Выйти</Typography>
      </ListItemButton>
    </Menu>
  )
}



const ToolBar = ({ user }) => {
  return(
    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
      backgroundColor: 'white',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      px: '24px',
      flexShrink: 0
    }}>
      <Search/>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Box>
          <IconButton>
            <Badge badgeContent={5} color='error'>
              <NotificationsNoneIcon/>
            </Badge>
          </IconButton>
        </Box>
        <Profile user={user}/>
      </Stack>
    </Stack>
  )
}

const Home = () => {
  
  const user = useSelector(state => state.user.credential)

  return (
    <Container maxWidth={false} sx={{ height: '100vh' }} disableGutters>
      <Stack flexDirection={'row'} height={1}>
        <SideBar/>
        
        <Stack flexDirection={'column'} width={1} mx={'24px'}>
          <ToolBar user={user}/>
          <Box sx={{ 
            display: 'flex',
            flexGrow: 1,
            width: 1, 
            my: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflowY: 'hidden'
          }}>
            <Outlet/>
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Home