import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import './App.css'

import AppRoutes from './routes/AppRoutes.jsx'
import AlertPanel from './components/AlertPanel/AlertPanel'

function App() {
  return (
    <>
      <AlertPanel/>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App
