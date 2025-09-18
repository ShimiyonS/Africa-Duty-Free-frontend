import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import App from './App.jsx'
import MyProvider from './Provider/CommonProvider.jsx';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from './store/store.js';
import { ToastContainer } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyProvider>
        <ToastContainer position="top-right" autoClose={2000} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </MyProvider>
    </BrowserRouter>
  </StrictMode>,
)
