import React, { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, MenuItem, Stack, Typography } from '@mui/material'
import InputSelect from '../InputSelect/InputSelect'
import { schemePublications } from '../../schemes/schemePublications'
import { useForm } from 'react-hook-form'
import InputCheck from '../InputCheck/InputCheck'
import InputDate from '../InputDate/InputDate'
import ScrollableBox from '../ScrollableBox/ScrollableBox'
import { useDispatch, useSelector } from 'react-redux'
import { clearFilterPublications, setFilterPublications } from '../../redux/filterPublicationsSlice'

const ResponsivePanel = () => {
  return(
    <>
    </>
  )
}

const FilterPanel = () => {

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
      // const data = getValues()

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
        <Stack width={'500px'} height={1} pr={'24px'}>
          <Typography variant='h4' my={'12px'}>{`Фильтр  ${countExpandedFields()}`}</Typography>

          <ScrollableBox height={1} p={'4px'} sx={{ overflowY: 'auto'}}>
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

          <form onSubmit={handleSubmit(applyFilter)}>
            <Stack direction={'row'} justifyContent={'space-between'} my={'24px'}>
              <Button disabled={countExpandedFields() == 0} variant='outlined' onClick={clearFilter}>Очистеть</Button>
              <Button variant='contained' type='submit'>Применить</Button>
            </Stack>
          </form>
        </Stack>
    )
}

export default FilterPanel