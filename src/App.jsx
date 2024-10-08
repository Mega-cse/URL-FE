
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import './App.css'

import URLShortener from './Components/URLShortener'

import Dashboard from './Components/Dashboard';

function App() {
 

  return (
    <>

  <Router>
      <Routes>
       
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path="/url-shortener" element={<URLShortener />} />
    
         </Routes>
    </Router>
    
    </>
  )
}

export default App
