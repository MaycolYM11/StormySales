import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import './App.css';
import MainLayout from './components/Layout/Main_Layout.jsx';
import Login from './components/Login/Login';

const App = () => {
  const [user,setUser] = useState(null);

  const hayUser =()=>{

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    setUser(usuario != null)
  }


  useEffect(()=>{
    hayUser();      
  },[]);

  return (

    <BrowserRouter>
      {!user ? <Login /> : <MainLayout /> }
    </BrowserRouter>
    
  );
}

export default App;
