import React from 'react'
import { Controller } from 'react-hook-form'

import { FormControl, InputLabel, Select } from '@mui/material'

const InputSelect = ({ name, control, children, defaultValue, ...props}) => {
  return (
    <Controller
        render={({ field }) => (
            <FormControl fullWidth>
                <InputLabel>{props.label}</InputLabel>
                <Select {...field} {...props}>
                    {children}
                </Select>
            </FormControl>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
    />
  )
}

export default InputSelect