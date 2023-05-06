import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchGetLogout } from "../API/API"
import { setUser } from "../redux/userSlice"

export function useLogout(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return async () => {
        try{
            const status = await fetchGetLogout().then(responce => responce.status)

            if(status == 200)
            {
                dispatch(setUser(null))
                navigate('/auth', { replace: true })
            }
        }
        catch(error){

        }
    }
}