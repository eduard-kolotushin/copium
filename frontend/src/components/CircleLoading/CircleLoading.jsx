import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const CircleLoading = () => {
    return (
        <Box width={1} display='flex' justifyContent='center' my='18px'>
            <CircularProgress color='inherit'/>
        </Box>
    )
}

export default CircleLoading