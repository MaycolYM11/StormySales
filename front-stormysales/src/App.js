import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import './App.css';
import MainLayout from './components/Layout/Main_Layout.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />  
    </BrowserRouter>
      
  );
}

export default App;
