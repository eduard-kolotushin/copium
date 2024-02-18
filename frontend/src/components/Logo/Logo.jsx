import React from 'react'

import { Typography } from '@mui/material'
import { Box } from '@mui/material'

const Logo = ({ fontSize, shortForm, ...props }) => {
  return (
    <Box {...props}>
        <Typography sx={{
            display: 'inline',
            fontWeight: 'bold',
            fontFamily: 'Comfortaa',
            fontSize
        }}> 
            <span style={{ color: '#530FAD'}}>{!shortForm ? "Наук" : "Н"}</span>
            <span style={{ color: '#FFE800'}}>{!shortForm ? "иум" : "и"}</span>
        </Typography>
    </Box>
  )
  // return (
  //   <Box {...props}>
  //       <Typography sx={{
  //           display: 'inline',
  //           color: 'rgb(0, 101, 202)',
  //           fontWeight: 'bold',
  //           fontFamily: 'Comfortaa',
  //           fontSize
  //       }}> 
  //           <span style={{ color: 'rgb(0, 101, 202)'}}>{!shortForm ? "Наук" : "W"}</span>
  //           <span style={{ color: 'rgb(14, 51, 101)'}}>{!shortForm ? "иум" : "S"}</span>
  //       </Typography>
  //   </Box>
  // )
}

export default Logo