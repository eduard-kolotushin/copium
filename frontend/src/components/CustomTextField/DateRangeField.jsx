import React, { useEffect, useState } from 'react'
import { useThemeProps } from '@mui/material'
import { useSlotProps } from '@mui/base/utils'
import MuiTextField from '@mui/material/TextField'
import { useDateField } from './hooks/useDateField'

const DateRangeField = React.forwardRef(( inProps, ref ) => {

    const themeProps = useThemeProps({
        props: inProps,
        name: 'MuiDateField'
    })

    const { components, componentsProps, slots, slotProps, InputProps, inputProps, ...other } = themeProps;

    const ownerState = themeProps

    const TextField = slots?.textField ?? components?.TextField ?? MuiTextField
    const { inputRef: externalInputRef, ...textFieldProps } = useSlotProps({
      elementType: TextField,
      externalSlotProps: slotProps?.textField ?? componentsProps?.textField,
      externalForwardedProps: other,
      ownerState,
    })

    textFieldProps.inputProps = { ...textFieldProps.inputProps, ...inputProps }
    textFieldProps.InputProps = { ...textFieldProps.InputProps, ...InputProps }

    const {
        ref: inputRef,
        onPaste,
        onKeyDown,
        inputMode,
        readOnly,
        ...fieldProps
    } = useDateField({
        props: textFieldProps,
        inputRef: externalInputRef,
      })

    return (
        <TextField
            ref={ref}
            {...fieldProps}
            InputProps={{ ...fieldProps.InputProps, readOnly }}
            inputProps={{ ...fieldProps.inputProps, inputMode, onPaste, onKeyDown, ref: inputRef }}
        />
    )
})

export default DateRangeField