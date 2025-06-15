import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';

function App(){
  const token = localStorage.getItem('token');


  return(
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path ="/register" element={<RegisterPage/>}/>
          <Route path ="/orders" 
          element={token?<OrderPage/>:<Navigate to ="/login"/>}/>
        </Routes>
      </Router>
  );
}

export default App;