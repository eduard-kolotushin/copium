import React from 'react'
import { Controller } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'


const InputDate = ({ name, control, label, rules, defaultValue, sx, ...props }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field : { onChange, onBlur, value, ref } }) => (
          <DatePicker
            label={rules?.required ? `${label}*` : label}
            inputFormat="DD.MM.YYYY"
            value={dayjs(value)}
            onChange={v => onChange(dayjs(v).format('YYYY-MM-DD'))}
            onBlur={onBlur}
            ref={ref}
            renderInput={(params) => <TextField {...params} sx={sx}/>}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default InputDate