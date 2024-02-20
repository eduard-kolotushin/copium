import React from 'react'

import { ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const ActionsMenu = ({ open, anchorEl, onClose, numberElements, maxNumberElements }) => {
    
    return (
        <Menu         
        elevation={12}
        sx={{
            m: '6px'
        }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={onClose}>
            <MenuList>
                <MenuItem disabled={numberElements == 0}>
                    <ListItemIcon >
                        <GetAppOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>{`Экспортировать выбранные элементы (${numberElements}/${maxNumberElements})`}</ListItemText>
                </MenuItem>
                <MenuItem disabled={numberElements == 0}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText>{`Удалить выбранные элементы (${numberElements}/${maxNumberElements})`}</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ActionsMenu