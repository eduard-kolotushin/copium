import React from 'react'
import dayjs from 'dayjs'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'

import { store } from './redux/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

require('dayjs/locale/ru')
dayjs.extend(require('dayjs/plugin/isToday'))
dayjs.extend(require('dayjs/plugin/isBetween'))
dayjs.locale('ru')

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

ReactDOM.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <App />
    </LocalizationProvider>
  </Provider>,
  document.getElementById('root')
);