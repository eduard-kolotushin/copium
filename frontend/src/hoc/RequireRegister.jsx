import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { isFirstEnter } from '../API/API'

const RequireRegister = ({children}) => {
    // const auth = useSelector(state => state.auth)
    const credential = useSelector(state => state.user.credential)

    if(isFirstEnter(credential) === true)
        return (
            <Navigate to='/register'/>
        )
    else
        return (
            children
        )
}

export default RequireRegister