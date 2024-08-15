import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './style/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';
import Toast from './components/Toast/Toast.jsx';


axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <Toast />
          <App />
      </Provider>    
    </BrowserRouter>
  </React.StrictMode>,
)
