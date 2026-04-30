import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';  // 🔥 ADD THIS IMPORT
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

export const BASE_URL = process.env.REACT_APP_API_URL;

// 🔥 ADD THESE TWO LINES HERE (after BASE_URL, before root.render) 🔥
axios.defaults.withCredentials = true;
axios.defaults.baseURL = BASE_URL || 'https://real-time-chat-app-backend-kdac.onrender.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);