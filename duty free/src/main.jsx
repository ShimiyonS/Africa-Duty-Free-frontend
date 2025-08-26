import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'
import MyProvider from './Provider/CommonProvider.jsx';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MyProvider>
    </BrowserRouter>
  </StrictMode>,
)
