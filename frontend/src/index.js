import React from 'react';
import dayjs from 'dayjs';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';

import { store } from './redux/store'

require('dayjs/locale/ru')
dayjs.locale('ru')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);