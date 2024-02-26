import React from 'react'
import {
    Stack,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    } from '@mui/material'


const DialogConfirm = ({ title, id, deletePublication, setIsOpenDialogConfirm }) => {

    const handlerClickDelete = async () => {
        setIsOpenDialogConfirm(false)
        await deletePublication(id).unwrap()
    }

    const handlerClickBack = async () => {
        setIsOpenDialogConfirm(false)
    }

    return(
    <Dialog open scroll='paper'>
        <DialogTitle sx={{ textAlign: 'center' }}>Удаление публикации</DialogTitle>
        <DialogContent>
          <Stack sx={{ minWidth: '250px' }}>
            <DialogContentText>Вы уверены, что хотите удалить публикацию?</DialogContentText>
            {/* <Typography>Вы уверены, что хотите удалить публикацию?</Typography> */}
            <Typography fontWeight='bold'>{title}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlerClickBack()}>Отмена</Button>
          <Button onClick={() => handlerClickDelete()} color='error'>Удалить</Button>
        </DialogActions>
    </Dialog>
    )
}

export default DialogConfirm