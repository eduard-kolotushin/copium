import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { showErrorAlert } from '../../redux/actions/alertActions'

import { fetchPostLogin } from '../../API/API'

import { Container, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Logo from '../../components/Logo/Logo'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText/InputText'
import InputCheck from '../../components/InputCheck/InputCheck'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { showErrorAlert } from '../../redux/alertSlice'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { control, 
        handleSubmit, 
        resetField, 
        setFocus, 
        formState: {
             isSubmitting 
            } } = useForm({
                
                defaultValues: {
                    email: '',
                    password: '',
                    remember: false
        }
    })

    const onSubmit = async (data) => {
        try {
            const responcePostLoginStatus = await fetchPostLogin(data).then(responce => responce.status)

            if(responcePostLoginStatus == 200)
            {
                navigate('/auth', { replace: true })
            }
            else if(responcePostLoginStatus == 401){
                dispatch(showErrorAlert("Неверный пароль!"))
                resetField('password')
                setFocus('password')
            }
            else if(responcePostLoginStatus == 404){
                dispatch(showErrorAlert('Такой пользователь не зарегестрирован'))
                resetField('email')
                resetField('password')
            }
        } catch (error) {
            
        }
    }

    return(
        <>
            <Container maxWidth='xs' disableGutters>
                    <Card sx={{ borderRadius: '15px', mt: '150px'}}>
                        <CardContent sx={{
                            pr: '35px',
                            pl: '35px'
                        }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack direction='column' justifyContent='center' alignItems='center'>

                                        <Logo fontSize='50px' mt='24px' mb='24px'/>

                                        <Typography sx={{
                                            py: '18px',
                                            fontSize: '25px',
                                            fontFamily: 'TimesNewRoman',
                                            letterSpacing: '15px',
                                            textTransform: 'uppercase',
                                            userSelect: 'none',
                                            color: 'rgb(106, 106, 106)'
                                        }}>Вход</Typography>

                                        <Stack direction='row' alignItems='center' justifyContent='center' width='100%' spacing={2} mb='25px'>
                                            <EmailOutlinedIcon sx={{ 
                                                fontSize: 35
                                                }}/>
                                            <InputText name='email' control={control} rules={{
                                                required: true,
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Неверный формат email!"
                                                }
                                            }} fullWidth label='Email' variant='filled' type={'email'}/>
                                        </Stack>

                                        <Stack direction='row' alignItems='center' justifyContent='center' width='100%' spacing={2} mb='25px'>
                                            <LockOutlinedIcon sx={{
                                                fontSize: 35
                                                }}/>
                                            <InputText name='password' control={control} rules={{
                                                required: true,
                                                minLength: {
                                                    value: 6,
                                                    message: 'Не менее 6 символов!'
                                                }
                                            }} fullWidth label='Пароль' variant='filled' type={'password'}/>
                                        </Stack>

                                        <InputCheck name='remember' control={control} label='Запомнить'/>

                                        <Button disabled={isSubmitting} type='submit' variant='contained' size='large' sx={{
                                            mt: '25px',
                                            width: 0.5
                                        }}>
                                            ВХОД
                                        </Button>
                                        
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
            </Container>
                {/* <LoginPanel/> */}
        </>

    )
}

export default Login
