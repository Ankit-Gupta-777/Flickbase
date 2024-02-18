import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes.jsx';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './store/index.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router />
  </Provider>
)
