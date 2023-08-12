import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Header from './components/Header';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
      </Routes>
    </div>
    <ToastContainer position='top-right'/>
  </BrowserRouter>
  );
}

export default App;
