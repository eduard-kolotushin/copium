import React, { useState, useRef } from 'react'
import { Outlet, useMatches, useNavigate } from 'react-router-dom'
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

const SideBar = ({ gr_xs }) => {

  const navigate = useNavigate()

  const handlerClick = (path) => (event) => {
    navigate(path)
  }

  if(gr_xs){
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
            {routes.map((route, index) => (
                  <ListItem disablePadding key={index}>
                    <ListItemButton sx={{ color: '#575757'}} onClick={handlerClick(route.path)}>
                      <ListItemIcon sx={{ color: 'inherit'}}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText primary={route.title}/>
                    </ListItemButton>
                  </ListItem>
            ))}
          </List>
        </Box>
      </Stack>
    )
  }
  else{
    return(
      <BottomNavigation>
        {routes.map((route, id) => <BottomNavigationAction key={id} label={route.title} icon={route.icon} path={route.path} onClick={handlerClick(route.path)}/>)}
      </BottomNavigation>
    )
  }
}

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

const Profile = ({ user: { firstname }, gr_xs }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return(
    <Box>
      <ListItemButton sx={{ py: '12px', pr: '0px' }} onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Avatar sx={{ backgroundColor: '#82AEE4', width: '32px', height: '32px', mr: '6px', fontSize: '16px' }}>
          {firstname[0]}
        </Avatar>
        {gr_xs && <Typography px={'12px'}>{firstname}</Typography>}
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

const ToolBar = ({ user, gr_xs }) => {
  return(
    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
      backgroundColor: 'white',
      borderBottomLeftRadius: '12px',
      borderBottomRightRadius: '12px',
      px: '16px',
      flexShrink: 0
    }}>
      <Stack direction='row' alignItems='center' spacing={3}>
        {!gr_xs && <Logo fontSize={'32px'} shortForm={true}/>}
        <Search/>
      </Stack>

      <Stack direction='row' alignItems='center' spacing={1}>
        <Box>
          <IconButton>
            <Badge badgeContent={5} color='error'>
              <NotificationsNoneIcon/>
            </Badge>
          </IconButton>
        </Box>
        <Profile user={user} gr_xs={gr_xs}/>
      </Stack>
    </Stack>
  )
}

const Home = () => {

  const gr_xs = useMediaQuery('(min-width:1200px)')
  const user = useSelector(state => state.user.credential)

  return (
    <Container maxWidth={false} sx={{ height: '100vh' }} disableGutters>
      <Stack flexDirection={gr_xs ? 'row' : 'column-reverse'} height={1}>
        <SideBar gr_xs={gr_xs}/>
        
        <Stack flexDirection={'column'} width={1} height={1} mx={gr_xs ? '24px' : '0px'}>
          <ToolBar user={user} gr_xs={gr_xs}/>
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