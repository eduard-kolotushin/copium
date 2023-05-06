import  { useState } from "react"

export function useFetch(callback){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(false)
            await callback()
        } catch (e) {
            setError(e.message)
        }
        finally{
            setIsLoading(true)
        }
    }

    return {fetching, isLoading, error}
}