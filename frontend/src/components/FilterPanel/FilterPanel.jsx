import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Box, 
  Button, 
  Dialog, 
  IconButton, 
  Stack, 
  Toolbar, 
  Typography, 
  useMediaQuery } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { schemePublications } from '../../schemes/schemePublications'

import { clearFilterPublications, setFilterPublications } from '../../redux/filterPublicationsSlice'

import ScrollableBox from '../ScrollableBox/ScrollableBox'
import SelectableTabs from './SelectableTabs'
import BooleanTabs from './BooleanTabs'
import InputDateRange from '../InputDateRange/InputDateRange'
import ResponsivePanel from './ResponsivePanel'

// const ResponsivePanel = ({ children, gr_xs }) => {

//   if(gr_xs){
//     return(
//       <Stack width={'450px'} height={1} pr={'24px'} flexShrink={0}>
//         {children}
//       </Stack>
//     )
//   }
//   else{
//     return(
//       <Dialog open fullScreen sx={{ minHeight: 1 }}>
//         <Stack flexDirection={'column'} p={'24px'} height={1}>
//           {children}
//         </Stack>
//       </Dialog>
//     )
//   }
// }

const FilterPanel = ({ onClickClose, isShowingFilterState }) => {

  const gr_xs = useMediaQuery('(min-width:1200px)')

  const dispatch = useDispatch()
  const fields = useSelector(state => state.filterPublications.fields)

  const [isShowingFilter, setIsFilterShowing] = isShowingFilterState

  const all_types_publications = schemePublications.map(pub => ({ value: pub.p_type, label: pub.title }))
  const all_types_finsupports = [
    {
      value: 'rnf',
      label: 'РНФ'
    },
    {
      value: 'basis',
      label: 'Фонд "Базис"'
    },
    {
      value: 'gt',
      label: 'Государственное задание'
    },
  ]
  const all_types_database = [
    {
      value: 'wos',
      label: 'WoS'
    },
    {
      value: 'scopus',
      label: 'Scopus'
    },
    {
      value: 'rinc',
      label: 'РИНЦ'
    },
  ]

  const { control, handleSubmit } = useForm({ 
      defaultValues: fields
  })

  const clearFilter = () => {
    dispatch(clearFilterPublications())
    setIsFilterShowing(false)
  }

  const applyFilter = (data) => {
    console.log(data)
    dispatch(setFilterPublications(data))
    setIsFilterShowing(false)
  }

  return (
      <ResponsivePanel gr_xs={gr_xs}>
        <Toolbar disableGutters>
          {!gr_xs &&
            <IconButton size='medium' onClick={onClickClose}>
              <CloseIcon fontSize='16px'/>
            </IconButton>
          }
          <Typography variant='h5' flexGrow={1}>
            Фильтр
          </Typography>
          <Button variant='text' onClick={clearFilter}>Сбросить</Button>
        </Toolbar>

        <ScrollableBox p={'4px'} sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <Stack direction={'column'} spacing={3}>
            <Box>
              <Typography fontWeight={'bold'}>Тип публикации</Typography>
              <SelectableTabs control={control} name={'types'} options={all_types_publications}/>
            </Box>

            <Box>
              <Typography fontWeight={'bold'}>Наличие DOI</Typography>
              <BooleanTabs control={control} name={'doi'}/>
            </Box>

            <Box>
              <Typography fontWeight={'bold'}>Наличие ISBN</Typography>
              <BooleanTabs control={control} name={'isbn'}/>
            </Box>

            <Box>
              <Typography fontWeight={'bold'}>Временной интервал</Typography>
              <InputDateRange control={control} name={'date'}/>
            </Box>

            <Box>
              <Typography fontWeight={'bold'}>Финансовая поддержка</Typography>
              <SelectableTabs control={control} name={'fs'} options={all_types_finsupports}/>
            </Box>

            <Box>
              <Typography fontWeight={'bold'}>Система цитирования</Typography>
              <SelectableTabs control={control} name={'db'} options={all_types_database}/>
            </Box>
          </Stack>
        </ScrollableBox>

        <Box display={'flex'} width={1}>
          <form onSubmit={handleSubmit(applyFilter)} style={{ width: '100%' }}>
            <Stack direction={'row'} justifyContent={'right'} py={'12px'} spacing={3} width={1}>
              <Button variant='contained' fullWidth type='submit'>Применить</Button>
            </Stack>
          </form>
        </Box>

      </ResponsivePanel>
  )
}

export default FilterPanel