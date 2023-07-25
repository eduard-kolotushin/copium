import React from 'react'
import { Controller } from 'react-hook-form'

import { FormControl, InputLabel, Select } from '@mui/material'

const InputSelect = ({ name, control, children, defaultValue, rules, ...props}) => {
  return (
    <Controller
        render={({ field, formState: { errors } }) => (
          <FormControl fullWidth error={!!errors[name]}>
              <InputLabel>{rules?.required ? `${props?.label}*` : props?.label}</InputLabel>
              <Select {...field} {...props}>
                  {children}
              </Select>
          </FormControl>
        )}
        rules={{...rules, validate: (v) => v !== '' || rules.required }}
        name={name}
        control={control}
        defaultValue={defaultValue}
    />
  )
}

export default InputSelect