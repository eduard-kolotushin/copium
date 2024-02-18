import React, { useState } from 'react'
import { stringToColor } from '../../utils'

import { Avatar, Box, Chip, ListItemButton, Typography } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ProfileMenu from './HomePage-Toolbar-Profile-Menu'

const Profile = ({ user: { firstname, lastname }, gr_xs, setSearchParams }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return(
    <Box>
      <ListItemButton sx={{ py: '12px', pr: '0px' }} onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Avatar size='small' sx={{ backgroundColor: stringToColor([firstname, lastname].join(' '))}}>
          {firstname[0]}
        </Avatar>
        {gr_xs && <Typography px={'12px'}>{firstname}</Typography>}
        <Chip size='small' label='пользователь'/>
        <ExpandMoreIcon/>
      </ListItemButton>
      <ProfileMenu setSearchParams={setSearchParams} onClose={() => setAnchorEl(null)} anchorEl={anchorEl}/>
    </Box>
  )
}

export default Profile