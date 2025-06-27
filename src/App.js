import './App.scss'
import Nav from './components/Navigation/Nav';

import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';


import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

function App() {

  
  
  return (
    <> 
    <Router>
      <div className='app-header'>
      <Nav />
      </div>
    <div className='app-container'>

      <AppRoutes />
    </div>
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
