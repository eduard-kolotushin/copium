import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { 
  Box, 
  Button, 
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

const FilterPanel = ({ isShowingFilterState }) => {

  const gr_xs = useMediaQuery('(min-width:1200px)')

  const dispatch = useDispatch()
  const { fields } = useSelector(state => state.filterPublications)

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

  const { control, handleSubmit, formState: { isDirty, isValid } } = useForm({ 
      defaultValues: fields
  })

  const clearFilter = () => {
    // reset()
    dispatch(clearFilterPublications())
    setIsFilterShowing(false)
  }

  const applyFilter = (data) => {
    dispatch(setFilterPublications(data))
    setIsFilterShowing(false)
  }

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => { 
  //     if(gr_xs){ applyFilter(value) }
  //   })
  //   return () => subscription.unsubscribe()
  // }, [watch])

  return (
      <ResponsivePanel gr_xs={gr_xs}>
        <Toolbar disableGutters>
        <Typography variant='h5' flexGrow={1}>
            Фильтр
          </Typography>
          <IconButton size='medium' onClick={() => setIsFilterShowing(false)}>
            <CloseIcon fontSize='16px'/>
          </IconButton>
          {/* <Button variant='text' onClick={clearFilter}>Сбросить</Button> */}
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
        {/* {!gr_xs && */}
        <Box display={'flex'} width={1}>
          <form onSubmit={handleSubmit(applyFilter)} style={{ width: '100%' }}>
            <Stack direction={'row'} justifyContent={'space-between'} py={'12px'} spacing={2} width={1}>
              <Button variant='outlined' fullWidth onClick={clearFilter}>Сбросить</Button>
              <Button disabled={!isDirty || !isValid} variant='contained' fullWidth type='submit'>Применить</Button>
            </Stack>
          </form>
        </Box>
        {/* } */}

      </ResponsivePanel>
  )
}

export default FilterPanel