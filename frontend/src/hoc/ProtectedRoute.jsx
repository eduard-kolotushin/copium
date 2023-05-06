import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAllowed, redirect, children}) => {
    
    if(!isAllowed) return <Navigate to={redirect} replace={true}/>

    return children ? children : <Outlet/>
}

export default ProtectedRoute