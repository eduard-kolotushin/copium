import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchGetCredential, isFirstEnter } from "../API/API"

// import { setAuthStatus } from "../redux/actions/authActions"
// import { setUser} from "../redux/actions/userActions"
import { setAuth } from "../redux/authSlice"
import { setUser } from "../redux/userSlice"

export function useAuth(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const isAuth = useSelector(state => state.auth.isAuth)

    return async () => {
        try {
            const responceGetCredential = await fetchGetCredential()

            if(responceGetCredential.status == 200){
                const data = await responceGetCredential.json()

                // dispatch(setAuthStatus(true, isFirstEnter(data)))
                // dispatch(setAuth({ isAuth: true, isFirstEnter: isFirstEnter(data) }))
                // dispatch(setUser(data))

                dispatch(setUser(data))

                navigate('/home', { replace: true })
            }
            else if(responceGetCredential.status == 401){
                // dispatch(setAuthStatus(false, null))
                // dispatch(setAuth({ isAuth: false, isFirstEnter: null }))
                navigate('/login', { replace: true })
            }
        } catch (error) {
            console.log(error)
        }
    }
}