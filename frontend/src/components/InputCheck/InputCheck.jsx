import React from 'react'
import { Controller } from 'react-hook-form'

import { FormControlLabel, Checkbox } from '@mui/material'

const InputCheck = ({ control, name, label, children, defaultValue, ...props}) => {

  const CorrectCheckbox = ({ field }) => (
    <Checkbox
    onChange={(e) => field.onChange(e.target.checked)}
    checked={field.value}
    {...props}
    />
  )

  return (
    <Controller 
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field }) => {
      if(label)
        return(
          <FormControlLabel 
          control={<CorrectCheckbox field={field}/>} 
          label={label}/>
        )
      else
        return(
          <CorrectCheckbox field={field}/>
        )
    }}/>
  )
}

export default InputCheck