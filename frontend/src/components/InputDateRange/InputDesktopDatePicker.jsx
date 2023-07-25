import React, { useMemo, useRef, useState } from 'react'
import { TextField } from "@mui/material"
import { blue } from '@mui/material/colors'
import { 
    DatePicker, 
    PickersDay 
} from '@mui/x-date-pickers'
import dayjs from "dayjs"


// const CustomPickersDay = ({ isFrom, isBetween, isTo, ...props }) => {

//     return(
//         <PickersDay 
//         {...props}
//         sx={{
//             ...((isFrom || isTo) && {
//                 backgroundColor: 'primary.dark',
//                 color: 'common.white',
//                 '&:hover': {
//                     backgroundColor: 'primary.dark',
//                 }
//             }),
//             ...(isBetween && {
//                 backgroundColor: blue[50],
//                 '&:hover': {
//                     color: 'common.black',
//                 }
//             })
//         }}
//         />
//     )
// }

// const Day = ({ from, to, ...props }) => {

//     const isFrom = dayjs(props.day).isSame(from)
//     const isBetween = dayjs(props.day).isBetween(from, to, 'day', '()')
//     const isTo = dayjs(props.day).isSame(to)

//     return(
//         <CustomPickersDay 
//         {...props}
//         isFrom={isFrom}
//         isBetween={isBetween}
//         isTo={isTo}
//         />
//     )
// }

const CustomTextField = ({value, from, to, open, onClick, onChange, ...props}) => {

    const inputRef = useRef(null)
    
    const states = [
        {
            start: 0,
            end: 2
        },
        {
            start: 3,
            end: 5
        },
        {
            start: 6,
            end: 10
        },
        {
            start: 13,
            end: 15
        },
        {
            start: 16,
            end: 18
        },
        {
            start: 19,
            end: 23
        }
    ]
   
    const [state, setState] = useState(states[0])

    const handlerClick= (event) => {

        if(open) return;

        let selectionStart = event.target.selectionStart
        let selectionEnd = event.target.selectionEnd

        let s = states[0]

        if(selectionStart >= 3 && selectionStart <= 5){
            s = states[1]
        }

        if(selectionStart >= 6 && selectionStart <= 10){
            s = states[2]
        }

        if(selectionStart >= 13 && selectionStart <= 15){
            s = states[3]
        }

        if(selectionStart >= 16 && selectionStart <= 18){
            s = states[4]
        }

        if(selectionStart >= 19 && selectionStart <= 22){
            s = states[5]
        }

        setState(s)

        inputRef.current.setSelectionRange(s.start, s.end)
    }

    const handlerChange = (value, event) => {

        if(open) return;

        console.log('change from input')
    }

    return(
        <TextField value={`${dayjs(from).format('DD.MM.YYYY')} - ${dayjs(to).format('DD.MM.YYYY')}`} {...props} inputRef={inputRef} onChange={handlerChange} onClick={handlerClick}/>
    )
}

const InputDesktopDatePicker = ({slotProps, slots, value, onChange, open, inputSx, ...props}) => {

    // const  { from, to } = useMemo(() => value, [value])
    // const setValue = (newValue) => onChange(newValue)

    // const [isOpen, setIsOpen] = useState(false)
    // const [isSelectionFrom, setIsSelectionFrom] = useState(true)

    // const handlerChange = (v) => {
    //     if(!isOpen) return;

    //     const new_v = dayjs(v).format('YYYY-MM-DD')

    //     isSelectionFrom ?  setValue({ from: new_v, to }) : setValue({ from, to: new_v })

    //     !isSelectionFrom && setIsOpen(false)

    //     setIsSelectionFrom(!isSelectionFrom)
    // }

    return (
        <DatePicker
            {...props}
            onChange={onChange}
            // onChange={handlerChange}
            slots={{
                ...slots,
                // day: Day,
                textField: CustomTextField
            }}
            slotProps={{
                ...slotProps,
                textField: {
                    sx: {
                        width: 1,
                        ...inputSx
                    },
                    from: value.from,
                    to: value.to,
                    open
                }
            }}
            open={open}
            />
    )
}

export default InputDesktopDatePicker