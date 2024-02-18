import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import AppRoutes from './routes/AppRoutes.jsx'
import AlertPanel from './components/AlertPanel/AlertPanel'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
      <CssBaseline/>
      <AlertPanel/>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App
