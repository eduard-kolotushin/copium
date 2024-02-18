import React from 'react'

import { Badge, Box, IconButton, Stack, useTheme } from '@mui/material'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import Search from '../../components/Search/Search'
import Logo from '../../components/Logo/Logo'
import Profile from './HomePage-Toolbar-Profile'
import { useForm } from 'react-hook-form'

const ToolBar = ({ user, gr_xs, setSearchParams }) => {
    const { control } = useForm({
        defaultValues: {
            globalSearch: ''
        }
    })

    const theme = useTheme()

    return(
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
        backgroundColor: theme.palette.background.default,
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        px: '16px',
        flexShrink: 0
        }}>
            <Stack direction='row' alignItems='center' spacing={3}>
                <Logo fontSize={'24px'} shortForm={!gr_xs}/>
                <Search control={control} name={'globalSearch'}/>
            </Stack>

            <Stack direction='row' alignItems='center' spacing={1}>
                <Box>
                    <IconButton>
                        <Badge badgeContent={5} color='error'>
                            <NotificationsNoneIcon/>
                        </Badge>
                    </IconButton>
                </Box>
                <Profile user={user} gr_xs={gr_xs} setSearchParams={setSearchParams}/>
            </Stack>
        </Stack>
    )
}

export default ToolBar