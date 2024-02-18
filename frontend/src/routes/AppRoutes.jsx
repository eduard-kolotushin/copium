import React from 'react'
import { Route, Routes, Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProtectedRoute from '../hoc/ProtectedRoute.jsx'

import Login from '../pages/LoginPage/LoginPage.jsx'
import Auth from '../pages/AuthPage/AuthPage.jsx'
import Home from '../pages/HomePage/HomePage.jsx'
import Register from '../pages/RegisterPage/RegisterPage.jsx'
import Users from '../pages/UsersPage/UsersPage.jsx'
import Documents from '../pages/DocumentsPage/DocumentsPage.jsx'
import Mail from '../pages/MailPage/MailPage.jsx'
import Messenger from '../pages/MessengerPage/MessengerPage.jsx'
import Cloud from '../pages/CloudPage/CloudPage.jsx'
import Publications from '../pages/PublicationsPage/PublicationsPage.jsx'
import AddPublications from '../pages/AddPublicationsPage/AddPublicationsPage.jsx'
import AddUsers from '../pages/AddUsersPage/AddUsersPage.jsx'
import Events from '../pages/EventsPage/EventsPage.jsx'

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
