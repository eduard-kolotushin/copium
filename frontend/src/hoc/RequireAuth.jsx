import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({children}) => {
    // const auth = useSelector(state => state.auth)

    const credential = useSelector(state => state.user.credential)

    if(credential == true)
        return (
            children
        )
    else
        return (
            <Navigate to='/auth'/>
        )
}

export default RequireAuth