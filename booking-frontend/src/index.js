import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from "react-router-dom";
import {Navigate, Routes} from "react-router";
import Login from "./components/Login";
import Booking from "./components/Booking";
import Register from "./components/Register";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="booking" element={<Booking/>}></Route>
            <Route path="register" element={<Register/>}></Route>
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
