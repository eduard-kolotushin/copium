import React from 'react'
import CustomPickersDay from './CustomPickersDay'
import dayjs from 'dayjs'

const CustomDay = ({ from, to, ...props }) => {

    const isFrom = dayjs(props.day).isSame(from)
    const isBetween = dayjs(props.day).isBetween(from, to, 'day', '()')
    const isTo = dayjs(props.day).isSame(to)

    return(
        <CustomPickersDay 
        {...props}
        isFrom={isFrom}
        isBetween={isBetween}
        isTo={isTo}
        />
    )
}

export default CustomDay