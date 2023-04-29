import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useLogout } from '../../hooks/useLogout'
import { fetchPostCredential } from '../../API/API'

import { Container, 
    Card, 
    CardContent, 
    Stack, 
    Button, 
    Typography, 
} from '@mui/material'

import InputText from '../../components/InputText/InputText'
import Logo from '../../components/Logo/Logo'


const Register = () => {
    const navigate = useNavigate()
    const logout = useLogout()

    const { control, handleSubmit, formState: {isSubmitting} } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            firstname: '',
            lastname: ''
        }
    })

    const onSubmit = async (data) => {
        try{
            const request_data = {
                first_name: data.firstname,
                second_name: data.middlename,
                last_name: data.lastname
            }
            const status = await fetchPostCredential(request_data).then(responce => responce.status)

            if(status == 200)
                navigate('/auth', { replace: true })
        }
        catch(error){

        }
    }

    return (
        <Container maxWidth='xs' disableGutters>
            <Card sx={{ borderRadius: '15px', mt: '150px'}}>
                <CardContent sx={{
                    pr: '35px',
                    pl: '35px'
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack direction='column' justifyContent='center' alignItems='center'>

                            <Logo fontSize='50px' mt='25px' mb='25px'/>

                            <Typography sx={{
                                fontSize: '25px',
                                fontFamily: 'TimesNewRoman',
                                letterSpacing: '5px',
                                textTransform: 'uppercase',
                                userSelect: 'none',
                                color: 'rgb(106, 106, 106)',
                            }}>Регистрация</Typography>
                            
                            <Stack width={1} 
                                direction='column' 
                                justifyContent='center' 
                                alignItems='center' 
                                spacing={2} 
                                mt='25px'
                                mb='25px'
                            >
                                <InputText name='firstname' control={control} rules={{
                                        required: 'Это поле обязательно!'
                                    }} fullWidth label='Имя' variant='outlined' type={'text'}/>

                                <InputText name='middlename' control={control} rules={{
                                        required: false
                                    }} fullWidth label='Отчество' variant='outlined' type={'text'}/>

                                <InputText name='lastname' control={control} rules={{
                                        required: 'Это поле обязательно!'
                                    }} fullWidth label='Фамилия' variant='outlined' type={'text'}/>
                            </Stack>
                            <Stack width={1} spacing={3}>
                                <Button fullWidth disabled={isSubmitting} type='submit' variant='contained' size='large'>
                                    Зарегестрироваться
                                </Button>
                                <Button fullWidth disabled={isSubmitting} variant='outlined' size='large' onClick={logout}>
                                    Сменить пользователя
                                </Button>
                            </Stack>                                
                        </Stack>
                    </form>
                    </CardContent>
                </Card>
        </Container>
    )
}

export default Register