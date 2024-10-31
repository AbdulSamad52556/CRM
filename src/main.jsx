// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/signup';
import Login from './components/login';
import './index.css';
import Dashboard from './components/admin/dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
