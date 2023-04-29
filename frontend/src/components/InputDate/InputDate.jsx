import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material';


const InputDate = ({ name, control, label, rules, defaultValue, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, formState: { errors } }) => (
          <DatePicker
            label={label}
            inputFormat="DD.MM.YYYY"
            {...field}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default InputDate