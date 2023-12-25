import React from 'react'
import { 
    Box, 
    IconButton, 
    InputBase
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import { Controller } from 'react-hook-form'


const Search = ({ control, name, sx, placeholder, disabled }) => {
    return(
    <Controller
    name={name}
    control={control}
    render={({ field: { onBlur, onChange, ref, value } }) => (
        <Box sx={{ ...sx, width: 1, boxSizing: 'border-box' }}>
            <Box display={'flex'} sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: '12px',
            }}>
                <InputBase disabled={disabled} placeholder={placeholder || 'Поиск...'} sx={{
                    ml: '8px',
                    flexGrow: 1,
                }}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}/>
                <IconButton disabled={disabled} onClick={() => onChange(value)}>
                    <SearchIcon/>
                </IconButton>
            </Box>
        </Box>
    )}
    />
    )
}

export default Search