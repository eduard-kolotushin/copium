import React from 'react'
import { Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InputDateRangeComponent from './InputDateRangeComponent'


const InputDateRangeTmp = ({ name, control, label, rules, ...props }) => {

    return (
        <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref}}) => (
            <InputDateRangeComponent
            {...props}
            label={rules?.required ? `${label}*` : label}
            format="DD.MM.YYYY"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            />
        )}
        />
    )
}

export default InputDateRangeTmp