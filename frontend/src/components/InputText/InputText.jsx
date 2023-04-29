import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

const InputText = ({name, control, rules, children, label, defaultValue, ...props}) => {

  return (
    <Controller render={({ field, formState: { errors } }) => (
        <TextField 
        error={!!errors[name]?.message} 
        {...field} 
        {...props} 
        label={label + (rules?.required ? '*' : '')} 
        helperText={errors[name]?.message}>
          {children}
        </TextField>
     )}
    name={name}
    control={control} 
    defaultValue={defaultValue}
    rules={rules}/>
  )
}

export default InputText