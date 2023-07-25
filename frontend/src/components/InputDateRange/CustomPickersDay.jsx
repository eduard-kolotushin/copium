import React from 'react'
import { PickersDay } from '@mui/x-date-pickers'
import { blue } from '@mui/material/colors'

const CustomPickersDay = ({ isFrom, isBetween, isTo, ...props }) => {

    return(
        <PickersDay 
        {...props}
        sx={{
            ...((isFrom || isTo) && {
                backgroundColor: 'primary.dark',
                color: 'common.white',
                '&:hover': {
                    backgroundColor: 'primary.dark',
                }
            }),
            ...(isBetween && {
                backgroundColor: blue[50],
                '&:hover': {
                    color: 'common.black',
                }
            })
        }}
        />
    )
}

export default CustomPickersDay