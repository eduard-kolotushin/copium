import React from 'react'

import { 
    Box, 
    Container, 
    Typography, 
    Card, 
    Fade
} from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Logo from '../../components/Logo/Logo'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText/InputText'
import InputCheck from '../../components/InputCheck/InputCheck'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { showErrorAlert } from '../../redux/alertSlice'
import { useLogin } from '../../hooks/useLogin'


const Login = () => {

    const { control, 
        handleSubmit, 
        resetField, 
        setFocus, 
        formState: {
             isSubmitting 
            }
        } = useForm({
            defaultValues: {
                email: '',
                password: '',
                remember: false
        }
    })

    const { login } = useLogin({
        onError: {
            notFoundUser: () => {
                resetField('email')
                resetField('password')
            },
            incorrectData: () => {
                resetField('password')
                setFocus('password')
            }
        }
    })

    return(
    <Container maxWidth='xs' disableGutters>
        <Fade in timeout={500}>
            <Card sx={{ borderRadius: '15px', mt: '150px'}}>
                <CardContent sx={{
                    px: 4
                }}>
                    <form onSubmit={handleSubmit(login)}>
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
                            }}>
                                Вход
                            </Typography>

                            {/* <Stack direction='row' alignItems='center' justifyContent='center' width='100%' spacing={2} mb='25px'>
                                <EmailOutlinedIcon fontSize='large'/>
                                <InputText name='email' control={control} rules={{
                                    required: 'Это обязательное поле!',
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Неверный формат email!"
                                    }
                                }} fullWidth label='Email' variant='filled' type={'email'}/>
                            </Stack> */}

                            {/* <Stack direction='row' alignItems='center' justifyContent='center' width='100%' spacing={2} mb='25px'>
                                <LockOutlinedIcon fontSize='large'/>
                                <InputText name='password' control={control} rules={{
                                    required: 'Это обязательное поле!',
                                    minLength: {
                                        value: 6,
                                        message: 'Не менее 6 символов!'
                                    }
                                }} fullWidth label='Пароль' variant='filled' type={'password'}/>
                            </Stack> */}
                            <Stack direction={'column'} spacing={3} width={1} alignItems={'center'}>
                                <Box display={'flex'} alignItems='flex-start' width={1}>
                                    <EmailOutlinedIcon fontSize='large' sx={{ color: 'action.active', mr: 2, mt: 2 }}/>
                                    <InputText name='email' control={control} rules={{
                                        required: 'Это обязательное поле!',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Неверный формат email!"
                                        }
                                    }} fullWidth label='Email' variant='standard' type={'email'}/>
                                </Box>

                                <Box display={'flex'} alignItems='flex-start' width={1}>
                                    <LockOutlinedIcon fontSize='large' sx={{ color: 'action.active', mr: 2, mt: 2 }}/>
                                    <InputText name='password' control={control} rules={{
                                        required: 'Это обязательное поле!',
                                        minLength: {
                                            value: 6,
                                            message: 'Не менее 6 символов!'
                                        }
                                    }} fullWidth label='Пароль' variant='standard' type={'password'}/>
                                </Box>

                                <InputCheck name='remember' control={control} label='Запомнить'/>
                            </Stack>

                            <Button fullWidth disabled={isSubmitting} type='submit' variant='contained' size='large' sx={{
                                mt: '25px',
                            }}>
                                {isSubmitting ? 'Вход в систему...' : 'Войти в систему'}
                            </Button>
                                
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Fade>
    </Container>
    )
}

export default Login
