import './App.scss'
import NavHeader from './components/Navigation/NavHeader';

import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';

import { UserContext } from "./context/UserContext";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { Audio } from 'react-loader-spinner'

function App() {

   const { user } = useContext(UserContext); 
  
  return (
    <> 
    <Router>
      { user && user.isLoading ?
        <div className="loading-container"> 
        <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
          />
          <div> Loading data ....</div>
         </div>
        :
      <>
        <div className='app-header'>
      <NavHeader />
      </div>
    <div className='app-container'>
      <AppRoutes />
    </div>

      </>
    }
      
    </Router>
    <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </>
  );
}

export default App;
