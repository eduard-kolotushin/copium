import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { showErrorAlert } from "../redux/alertSlice";

export function useErrorWrapper({ request, errorStatuses}){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const UNCONTROLLABLE_ERROR = 'UNCONTROLLABLE_ERROR'

    const enhancedRequest = async() => {
        let result;

        try{
            result = await request()
            const status = result.status

            const handleCurrentError = errorStatuses[toString(status)]

            if(handleCurrentError){
                handleCurrentError()
            }
            else{
                throw new Error(UNCONTROLLABLE_ERROR)
            }
        }
        catch(error){
            if(error === UNCONTROLLABLE_ERROR){
                navigate('error')
            }
            else{
                dispatch(showErrorAlert(error))
            }
        }

        return result
    }

    return enhancedRequest
}