import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { showErrorAlert } from "../redux/alertSlice"
import { fetchPostLogin } from "../API/API"

export const useLogin = ({ onSuccess, onError: {
    notFoundUser,
    incorrectData
}}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (data) => {
        try {
            const responcePostLoginStatus = await fetchPostLogin(data).then(responce => responce.status)

            if(responcePostLoginStatus === 200)
            {
                onSuccess?.()

                navigate('/auth', { replace: true })

                return;
            }
            
            if(responcePostLoginStatus === 401){

                incorrectData?.()

                throw new Error('Неверный пароль!')
            }
            
            if(responcePostLoginStatus === 404){

                notFoundUser?.()

                throw new Error('Такой пользователь не зарегестрирован!')
            }

            throw new Error('Неопознанная ошибка. Попробуйте повторить или обновите страницу.')
            
        } catch (error) {
            dispatch(showErrorAlert(error.message))
        }
    }

    return { login }
}