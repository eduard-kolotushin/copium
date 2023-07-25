import React, { useMemo } from 'react'
import { useMediaQuery, useThemeProps } from '@mui/material'
import { 
    DEFAULT_DESKTOP_MODE_MEDIA_QUERY, 
    DesktopDatePicker, 
    MobileDatePicker
} from '@mui/x-date-pickers'
import { useBaseDateRangePicker } from './useBaseDateRangePicker'


const InputDateRangeComponent = React.forwardRef(( inProps, ref ) => {

    const props = useThemeProps({ props: inProps, name: 'MuiDatePicker' })

    const { desktopModeMediaQuery = DEFAULT_DESKTOP_MODE_MEDIA_QUERY, value, onChange, ...other } = props

    const isDesktop = useMediaQuery(desktopModeMediaQuery, { defaultMatches: true })

    const { desktop, mobile, inputRef } = useBaseDateRangePicker({
        value,
        onChange
    })

    if (isDesktop) {
        return(
            <DesktopDatePicker 
            {...other}
            {...desktop}
            value={null}
            ref={ref}
            inputRef={inputRef}
            />
        )
    }

    return (
        <MobileDatePicker
        {...other}
        {...mobile}
        value={null}
        ref={ref}
        inputRef={inputRef}
        />
    )
})

export default InputDateRangeComponent