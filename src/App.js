import './App.scss'
import NavHeader from './components/Navigation/NavHeader';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { UserContext } from "./context/UserContext";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import {Scrollbars } from 'react-custom-scrollbars';
import { Audio } from 'react-loader-spinner'


const App = () => {

   const { user } = useContext(UserContext); 
   const [ scrollHeight, setScrollHeight ] = useState(0);

   useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
   }, [user]);
  
  return (
    
    <Scrollbars autoHide style={{ height: scrollHeight }}> 
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
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
</Scrollbars>
    
  );
}

export default App;
