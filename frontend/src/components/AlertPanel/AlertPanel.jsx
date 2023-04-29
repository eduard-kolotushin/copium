import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { hideAlert } from '../../redux/actions/alertActions'
import { Alert, Snackbar } from '@mui/material'
import { hideAlert } from '../../redux/alertSlice'

export const SUCCESS = 'success'
export const ERROR = 'error'

const AlertPanel = () => {
  const dispatch = useDispatch()
  const alert = useSelector(state => state.alert)

  const onClose = () => {
    dispatch(hideAlert())
  }

  return (
    <Snackbar open={!!alert.message} onClose={onClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={alert.type} sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default AlertPanel