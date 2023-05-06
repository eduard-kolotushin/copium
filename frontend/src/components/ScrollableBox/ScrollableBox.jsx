import { Box } from '@mui/material'
import React, { useRef, useState } from 'react'

const ScrollableBox = ({ children, sx: old_sx, ...props}) => {
    const sx = {
        ...old_sx,
        ...{
            '&::-webkit-scrollbar': {
                width: '8px'
            },
            '&::-webkit-scrollbar-track': {
                backgroundColor: 'white'
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '4px',
                backgroundColor: '#AAA'
            },
            '&::-webkit-scrollbar-thumb:hover': {
                transition: '0.2s',
                backgroundColor: '#888'
            }
        }
    }

    return (
        <Box {...props} sx={sx}>
            {children}
        </Box>
    )
}

export default ScrollableBox