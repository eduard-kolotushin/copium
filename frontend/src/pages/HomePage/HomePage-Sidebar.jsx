import React, { useState } from 'react'

import { 
    BottomNavigation, 
    BottomNavigationAction, 
    Box, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import routes from '../../routes/routesSidebar'

const SideBar = ({ gr_xs }) => {

    const navigate = useNavigate()
    const [currentRoute, setCurrentRoute] = useState(0)

    const handlerClick = (path, id) => (event) => {
        setCurrentRoute(id)
        navigate(path)
    }

    if(gr_xs){
        return(
        <Box sx={{ mt: '24px', mr: '24px' }}>
            <Box sx={{
            borderRadius: '12px',
            backgroundColor: 'white',
            }}>
                <List>
                    {routes.map((route, id) => (
                        <ListItem disablePadding key={id}>
                            <ListItemButton sx={{ color: currentRoute === id ? 'primary.main' : '#575757'}} onClick={handlerClick(route.path, id)}>
                                <ListItemIcon sx={{ color: 'inherit'}}>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText color='inherit' primary={route.title}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
        )
    }
    else{
        return(
        <BottomNavigation 
        showLabels
        value={currentRoute}
        onChange={(event, route) => {
            setCurrentRoute(route);
        }}>
            {routes.map((route, id) => <BottomNavigationAction key={id} label={route.title} icon={route.icon} path={route.path} onClick={handlerClick(route.path, id)}/>)}
        </BottomNavigation>
        )
    }
}

export default SideBar