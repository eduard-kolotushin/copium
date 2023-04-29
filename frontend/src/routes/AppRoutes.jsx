import React from 'react'
import { Route, Routes, Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Login from '../pages/Login/Login.jsx'
import Auth from '../pages/Auth/Auth.jsx'
import Home from '../pages/Home/Home.jsx'
import ProtectedRoute from '../hoc/ProtectedRoute.jsx'
import Register from '../pages/Register/Register.jsx'

import Documents from '../pages/Home/Documents'
import Mail from '../pages/Home/Mail'
import Messenger from '../pages/Home/Messenger'
import Cloud from '../pages/Home/Cloud'

import Publications from '../pages/Home/Publications'
import Filter from '../components/Filter/Filter.jsx'
import Add from '../components/Add/Add.jsx'

import { isFirstEnter } from '../API/API.js'

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
                <Route index element={<Navigate to='publications'/>}/>
                <Route path='publications' element={<Publications/>}>
                    <Route path='filter' element={<Filter/>}/>
                    <Route path='add' element={<Add/>}/>
                </Route>
                <Route path='documents' element={<Documents/>}/>
                <Route path='email' element={<Mail/>}/>
                <Route path='cloud' element={<Cloud/>}/>
                <Route path='messenger' element={<Messenger/>}/>
            </Route>
        </Routes>
    )
}

export default AppRoutes
