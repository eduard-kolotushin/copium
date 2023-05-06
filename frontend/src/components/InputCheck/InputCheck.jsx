import React from 'react'
import { Controller } from 'react-hook-form'

import { FormControlLabel, Checkbox } from '@mui/material'

const InputCheck = ({ control, name, label, children, defaultValue, ...props}) => {
  return (
    <Controller 
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => (
        <FormControlLabel 
        control={(
            <Checkbox
            onChange={(e) => field.onChange(e.target.checked)}
            checked={field.value}
            {...props}
          />
        )} 
        label={label}/>
    )}/>
  )
}

export default InputCheck