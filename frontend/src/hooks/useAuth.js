import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchGetCredential, isFirstEnter } from "../API/API"

import { setAuth } from "../redux/authSlice"
import { setUser } from "../redux/userSlice"

export function useAuth(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return async () => {
        try {
            const responceGetCredential = await fetchGetCredential()

            if(responceGetCredential.status == 200){
                const data = await responceGetCredential.json()

                dispatch(setUser(data))

                navigate('/home', { replace: true })
            }
            else if(responceGetCredential.status == 401){
                navigate('/login', { replace: true })
            }
        } catch (error) {
            console.log(error)
        }
    }
}