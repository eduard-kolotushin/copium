import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAddUserMutation } from '../../redux/serviceUsers'

import { 
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, 
  Divider, 
  Fab, 
  MenuItem, 
  Stack, 
  useMediaQuery
} from '@mui/material'

import InputSelect from '../../components/InputSelect/InputSelect'
import InputText from '../../components/InputText/InputText'
import InputDate from '../../components/InputDate/InputDate'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove';



const UserCell = ({control, id, lenIds, onRemove }) => {
    return(
      <Stack direction={'row'} width={1} py={'6px'} spacing={3} alignItems={'center'}>
        <InputText control={control} name={`user_${id}.firstname`} label={'Имя'} defaultValue={''}/>
        <InputText control={control} name={`user_${id}.lastname`} label={'Фамилия'} defaultValue={''}/>
        <InputText control={control} name={`user_${id}.email`} label={'email'} defaultValue={''}/>
        <InputText control={control} name={`user_${id}.password`} label={'password'} defaultValue={''}/>
        { lenIds != 1 && 
        <Fab variant={'circle'} color='primary' size={'small'} onClick={onRemove} sx={{ flexShrink: 0 }}>
          <RemoveIcon/>
        </Fab>}
      </Stack>
    )
}

const AddUsers = () => {

  const gr_sm = useMediaQuery('(min-width: 600px)')
  const navigate = useNavigate()

  const [id, setId] = useState(0)
  const [ids, setIds] = useState([0])

  const [addUser, { data, isLoading, isError, isSuccess }] = useAddUserMutation()

  const { control, handleSubmit, unregister, formState: { isSubmitting, errors } } = useForm()

  const onSubmit = async (data) => {

    let requestList = []

    for(var key in data){
      requestList.push(addUser({ ...data[key], roles: ['admin'] }).unwrap())
    }

    await Promise.all(requestList)

    navigate(-1)
  }

  const onAdd = () => {
    setId(prev => prev + 1)
    setIds(prev => {
      let tmp = prev
      tmp.push(id + 1)
      return tmp
    })
  }

  const onRemove = (id_) => () => {
    setIds(prev => prev.toSpliced(prev.indexOf(id_), 1))
    unregister(`user_${id_}`)
  }

  return (
    <Dialog open fullScreen={!gr_sm} scroll='paper'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ textAlign: 'center' }}>Добавить пользователя или создать аккаунт</DialogTitle>
        <DialogContent>
          {ids.map((id_) => <UserCell control={control} key={id_} id={id_} lenIds={ids.length} onRemove={onRemove(id_)}/>)}
          <Box display={'flex'} width={1} justifyContent={'center'}>
            <Fab variant={'circle'} color='primary' size={'small'} onClick={onAdd}>
              <AddIcon/>
            </Fab>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting && !errors} onClick={() => navigate(-1)}>Назад</Button>
          <Button disabled={isSubmitting && !errors} type='submit'>Добавить или создать</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddUsers