import React from 'react'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'


const InputDate = ({ name, control, label, rules, defaultValue, sx, ...props }) => {
  return (
    <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field : { onChange, value, ref } }) => (
          <DatePicker
            {...props}
            label={rules?.required ? `${label}*` : label}
            value={dayjs(value)}
            onChange={v => onChange(dayjs(v).format('YYYY-MM-DD'))}
            inputRef={ref}
            slotProps={{
              textField: {
                  sx: {
                      width: 1,
                      ...sx,
                  }
              }
          }}
          />
        )}
      />
  )
}

export default InputDate