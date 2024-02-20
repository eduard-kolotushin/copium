import React from 'react'

import { 
    Box, 
    Container, 
    Typography, 
    Card, 
    Fade,
    Divider,
    Chip,
    Stack,
    CardContent,
    Button,
    Link
} from '@mui/material'

import Logo from '../../components/Logo/Logo'
import { useForm } from 'react-hook-form'
import InputText from '../../components/InputText/InputText'
import InputCheck from '../../components/InputCheck/InputCheck'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { showErrorAlert } from '../../redux/alertSlice'
import { useLogin } from '../../hooks/useLogin'

import VKIcon from '../../icons/VKIcon'
import GosuslugiIcon from '../../icons/GosuslugiIcon'
import SberIcon from '../../icons/SberIcon'


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

                            <Logo fontSize='50px' my='16px'/>

                            <Typography sx={{
                                py: '12px',
                                fontSize: '25px',
                                fontFamily: 'TimesNewRoman',
                                letterSpacing: '15px',
                                textTransform: 'uppercase',
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
                                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={1}>
                                    <InputCheck name='remember' control={control} label='Запомнить'/>
                                    <Link>Забыли пароль?</Link>
                                </Stack>
                            </Stack>

                            <Button fullWidth disabled={isSubmitting} type='submit' variant='contained' size='large' sx={{
                                mt: '25px',
                            }}>
                                {isSubmitting ? 'Вход...' : 'Войти'}
                            </Button>
                            <Stack flexDirection={'column'} spacing={2} width={1} mt={'12px'}>
                                <Divider>
                                    <Chip label='или' size='small'/>
                                </Divider>
                                
                                <Stack direction={'row'} justifyContent={'center'} spacing={5}>
                                    <Button variant='outlined' format='square'>
                                        <VKIcon fontSize='large'/>
                                    </Button>
                                    <Button variant='outlined' format='square'>
                                        <GosuslugiIcon fontSize='large'/>
                                    </Button>
                                    <Button variant='outlined' format='square'>
                                        <SberIcon fontSize='large'/>
                                    </Button>
                                </Stack>

                                <Button variant='outlined' fullWidth>
                                    вход с цифровой подписью
                                </Button>
                                <Divider/>
                                <Stack direction={'row'} justifyContent={'center'} spacing={3}>
                                    <Typography display={'inline'} variant='body1'>Нет аккаунта?</Typography>
                                    <Link>Зарегестрироваться</Link>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Fade>
    </Container>
    )
}

export default Login
