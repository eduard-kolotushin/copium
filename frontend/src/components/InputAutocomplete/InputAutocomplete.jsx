import React from 'react'
import { Controller } from 'react-hook-form'

import { Autocomplete} from '@mui/material'


const InputAutocomplete = ({ name, control, defaultValue, ...props}) => {
  return (
    <Controller
    render={({ field }) => (
      <Autocomplete
        {...field}
        {...props}
        onChange={(_, data) => field.onChange(data)}
      />
    )}
    name={name}
    control={control}
    defaultValue={defaultValue}
    />
  )
}

export default InputAutocomplete