import React, { useState } from 'react'
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Box, 
  Button, 
  Chip, 
  Dialog, 
  DialogContent, 
  IconButton, 
  MenuItem, 
  Stack, 
  Toolbar, 
  Typography, 
  useMediaQuery } from '@mui/material'
import InputSelect from '../InputSelect/InputSelect'
import { schemePublications } from '../../schemes/schemePublications'
import { useForm } from 'react-hook-form'
import InputCheck from '../InputCheck/InputCheck'
import InputDate from '../InputDate/InputDate'
import ScrollableBox from '../ScrollableBox/ScrollableBox'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilterPublications, setFilterPublications } from '../../redux/filterPublicationsSlice'
import CloseIcon from '@mui/icons-material/Close';

const ResponsivePanel = ({ children, gr_xs }) => {

  if(gr_xs){
    return(
      <Stack width={'500px'} height={1} pr={'24px'}>
        {children}
      </Stack>
    )
  }
  else{
    return(
      <Dialog open fullScreen sx={{ minHeight: 1 }}>
        <Stack flexDirection={'column'} p={'24px'} height={1}>
          {children}
        </Stack>
      </Dialog>
    )
  }

}

const FilterPanel = ({ onClickClose }) => {

  const gr_xs = useMediaQuery('(min-width:1200px)')

  const dispatch = useDispatch()
  const filterPublications = useSelector(state => state.filterPublications)

  const allTypes = schemePublications.map(pub => pub.title)
  const { control, getValues, handleSubmit } = useForm({ 
      defaultValues: {
          types: [],
          doi: false,
          isbn: false,
          date: {
            date_from: new Date(),
            date_to: new Date(),
          },
      }
  })

  const initialExpandedFields = {
    types: false,
    doi: false,
    isbn: false,
    date: false
  }
  const [expandedFields, setExpandedFields] = useState(initialExpandedFields)

  const countExpandedFields = () => {
    let c = 0
    for(var key in expandedFields)
    {
      if(expandedFields[key] === true) c++
    }
    return c
  }

  const expandField = (name) => {
    setExpandedFields({...expandedFields, [name]: true})
  }

  const hideField = (name) => {
    setExpandedFields({...expandedFields, [name]: false})
  }

  const handleChange = (name) => {
    return (__, isExpanded) => isExpanded ? expandField(name) : hideField(name)
  }

  const clearFilter = () => {
    setExpandedFields(initialExpandedFields)
    dispatch(clearFilterPublications())
  }

  const applyFilter = (data) => {

    let filter = {}

    if(expandedFields.types) filter.types = data.types
    if(expandedFields.doi) filter.doi = data.doi
    if(expandedFields.isbn) filter.isbn = data.isbn
    if(expandedFields.date) filter.date = {
        date_from: data.date.date_from.toString(),
        date_to: data.date.date_to.toString(),
      }

    dispatch(setFilterPublications(filter))
  }

  return (
      <ResponsivePanel gr_xs={gr_xs}>
        <Toolbar disableGutters>
          <Typography variant='h4' flexGrow={1}>
            {`Фильтр  ${countExpandedFields()}`}
          </Typography>
          {!gr_xs &&
          <IconButton size='large' onClick={onClickClose}>
            <CloseIcon fontSize='16px'/>
          </IconButton>
          }
        </Toolbar>

        <ScrollableBox p={'4px'} sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <Accordion expanded={expandedFields.types} onChange={handleChange('types')}>
            <AccordionSummary>
              <Typography>Тип публикации</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputSelect name={'types'} 
                    control={control}
                    label='Типы публикаций'
                    multiple={true}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}>
                {allTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </InputSelect>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expandedFields.doi} onChange={handleChange('doi')}>
            <AccordionSummary>
              <Typography>Наличие DOI</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputCheck control={control} name={'doi'} label={'Есть DOI'}/>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expandedFields.isbn} onChange={handleChange('isbn')}>
            <AccordionSummary>
              <Typography>Наличие ISBN</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <InputCheck control={control} name={'isbn'} label={'Есть ISBN'}/>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expandedFields.date} onChange={handleChange('date')}>
            <AccordionSummary>
              <Typography>Выбрать дату</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction={'column'} spacing={2}>
                <InputDate name={'date.date_from'} control={control} label={'С этой даты'}/>
                <InputDate name={'date.date_to'} control={control} label={'До этой даты'}/>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </ScrollableBox>

        <Box>

        </Box>
        <form onSubmit={handleSubmit(applyFilter)}>
          <Stack direction={'row'} justifyContent={'right'} py={'12px'} spacing={3}>
            <Button disabled={countExpandedFields() == 0} variant='outlined' onClick={clearFilter}>Сбросить</Button>
            <Button variant='contained' type='submit'>Применить</Button>
          </Stack>
        </form>
      </ResponsivePanel>
  )
}

export default FilterPanel