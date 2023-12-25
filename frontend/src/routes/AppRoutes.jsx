import React from 'react'
import { Route, Routes, Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Login from '../pages/Login/Login.jsx'
import Auth from '../pages/Auth/Auth.jsx'
import Home from '../pages/Home/Home.jsx'
import ProtectedRoute from '../hoc/ProtectedRoute.jsx'
import Register from '../pages/Register/Register.jsx'

import Users from '../pages/Home/Users.jsx'
import Documents from '../pages/Home/Documents'
import Mail from '../pages/Home/Mail'
import Messenger from '../pages/Home/Messenger'
import Cloud from '../pages/Home/Cloud'
import Publications from '../pages/Home/Publications'
import AddPublications from '../components/AddPublications/AddPublications.jsx'
import AddUsers from '../components/AddUsers/AddUsers.jsx'

import { isFirstEnter } from '../API/API.js'
import Events from '../pages/Home/Events.jsx'

const AppRoutes = () => {
    const credential = useSelector(state => state.user.credential)

    const isAuth = !!credential
    const isFE = isFirstEnter(credential)

    return(
        <Routes>
            <Route index element={<Navigate to='/auth'/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/login' element={
                <ProtectedRoute isAllowed={!isAuth} redirect='/home'>
                    <Login/>
                </ProtectedRoute>
                }/>
            <Route path='/register' element={
                <ProtectedRoute isAllowed={isAuth} redirect='/home'>
                    <ProtectedRoute isAllowed={isFE} redirect='/home'>
                        <Register/>
                    </ProtectedRoute>
                </ProtectedRoute>}/>
            <Route path='/home' element={
                <ProtectedRoute isAllowed={isAuth} redirect='/auth'>
                    <ProtectedRoute isAllowed={!isFE} redirect='/register'>
                        <Home/>
                    </ProtectedRoute>
                </ProtectedRoute>}>
                <Route index element={<Navigate to='users'/>}/>
                <Route path='users' element={<Users/>}>
                    <Route path='add' element={<AddUsers/>}/>
                </Route>
                <Route path='publications' element={<Publications/>}>
                    <Route path='add' element={<AddPublications/>}/>
                </Route>
                <Route path='events' element={<Events/>}/>
                <Route path='documents' element={<Documents/>}/>
                <Route path='email' element={<Mail/>}/>
                <Route path='cloud' element={<Cloud/>}/>
                <Route path='messenger' element={<Messenger/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes
