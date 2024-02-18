import React from 'react'

import { Divider, ListItemButton, ListItemIcon, Menu, Typography } from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'
import { Logout } from '@mui/icons-material'

import { useLogout } from '../../hooks/useLogout'

const ProfileMenu = ({ anchorEl, onClose, setSearchParams }) => {
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
            <ListItemButton disableRipple onClick={() => setSearchParams({ act: 'setting' })}>
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

export default ProfileMenu