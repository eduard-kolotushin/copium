import React from 'react'
import { useDispatch } from 'react-redux'
import { Chip, useMediaQuery } from '@mui/material'

import { clearFilterField } from '../../redux/filterPublicationsSlice'

const FilterTag = ({ label, name, value }) => {
    const gr_xs = useMediaQuery('(min-width:1200px)')
    const dispatch = useDispatch()
  
    return(
      <Chip onDelete={() => dispatch(clearFilterField({ name, value }))} label={label} sx={{ m: '6px'}} size={!gr_xs ? 'small' : 'default'}/>
    )
  }

export default FilterTag