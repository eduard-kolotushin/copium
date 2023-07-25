import React from 'react'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'

const CustomTextField = ({ from, to, ...other }) => {
    return(
        <TextField {...other}/>
    )
}

// const CustomTextField = ({ from, to, outInputProps, inputProps, ...other }) => {
//     console.log(inputProps)
//     return(
//         <TextField {...{ ...other, value: `${dayjs(from).format('DD.MM.YYYY')} - ${dayjs(to).format('DD.MM.YYYY')}`, ...inputProps, ...outInputProps }}/>
//     )
// }

export default CustomTextField