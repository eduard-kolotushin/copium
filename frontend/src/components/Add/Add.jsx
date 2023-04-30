import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { schemePublications } from '../../schemes/schemePublications'

import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, 
  Divider, 
  MenuItem, 
  Stack 
} from '@mui/material'

import InputSelect from '../InputSelect/InputSelect'
import InputText from '../InputText/InputText'
import InputDate from '../InputDate/InputDate'
import { useAddPublicationMutation } from '../../redux/servicePublications'


const CurrentPanel = ({ panel, control }) => {
  if(panel)
    return(
      <>
        <Divider sx={{ my: '24px'}}/>
        <Stack spacing={2}>
          { panel.fields.map(field => <Field key={field.name} control={control} {...field}/>) }
        </Stack>
      </>
    )
  else 
    return(<></>)
}

const Field = ({ control, name, type, title, rules, initialState }) => {
  switch (type) {
    case 'text':
      return(
        <InputText name={name} control={control} label={title} rules={rules} defaultValue={initialState}/>
      )

    case 'date':
      return(
        <InputDate name={name} control={control} label={title} rules={rules} defaultValue={initialState}/>
      )
  
    default:
      return(
        <></>
      )
  }
}

const Add = () => {
  const navigate = useNavigate()
  const [addPublication, { data, isLoading, isError, isSuccess }] = useAddPublicationMutation()

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({ 
    defaultValues: {
      p_type: ''
  }})

  const p_type = useWatch({
    control,
    name: 'p_type'
  })

  const onSubmit = async (data) => {
    let request_data = data
    request_data.authors = request_data.authors.split(',').map(author => author.trim())

    await addPublication(request_data).unwrap()
    navigate(-1)
  }

  const panels = schemePublications

  return (
    <Dialog open scroll='paper'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ textAlign: 'center' }}>Добавьте публикацию</DialogTitle>
        <DialogContent>
          <Stack sx={{ minWidth: '450px', py: '24px' }}>
            <InputSelect name={'p_type'} 
                  control={control}
                  label='Тип публикации'>
              {panels.map(scheme => <MenuItem key={scheme.p_type} value={scheme.p_type}>{scheme.title}</MenuItem>)}
            </InputSelect>
            <CurrentPanel panel={panels.find(scheme => scheme.p_type == p_type)} control={control}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting} onClick={() => navigate(-1)}>Назад</Button>
          <Button disabled={isSubmitting} type='submit'>Добавить</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Add