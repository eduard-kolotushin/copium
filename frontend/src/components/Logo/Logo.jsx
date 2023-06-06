import React from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/material'

const Logo = ({ fontSize, shortForm, ...props }) => {
  return (
    <Box {...props}>
        <Typography sx={{
            display: 'inline',
            color: 'rgb(0, 101, 202)',
            fontWeight: 'bold',
            fontFamily: 'TimesNewRoman',
            fontSize
        }}> 
            <span style={{ color: 'rgb(0, 101, 202)'}}>{!shortForm ? "Web" : "W"}</span>
            <span style={{ color: 'rgb(14, 51, 101)'}}>{!shortForm ? "Supplies" : "S"}</span>
        </Typography>
    </Box>
  )
}

export default Logo