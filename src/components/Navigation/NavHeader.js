import React, { useContext } from 'react';
import './Nav.scss'
import {NavLink,  useLocation, Link , useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logoutUser} from '../../services/userService';
import { toast } from 'react-toastify';

const  NavHeader =(props) => {
  const {user, logoutContext} = useContext(UserContext); 
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () =>{
    let data = await logoutUser(); // clear cookies
    localStorage.removeItem('jwt'); // clear local storage
    logoutContext();// clear user in context
    
    if( data && +data.EC ===0 ){
      toast.success('Log out susscess...');
      history.push('/login');

    }else{
      toast.error(data.EM);
    }
  }


  if((user && user.isAuthenticated === true) || location.pathname === '/'){

    return (
   <>
  

        <div className='nav-header'>  
        <Navbar bg='header' expand="lg" >
          <Container>
         <Navbar.Brand href="/" className="brand-wrapper">
              <img
              src="https://inkythuatso.com/uploads/images/2021/11/logo-mercedes-inkythuatso-3-01-11-09-10-56.jpg"
              alt="Mercedes Logo"
               height="40"
                className="logo-img"
            />
            <span className="brand-text">Kieu Nam</span>
          </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" exact className='nav-link'> Home </Nav.Link>
            <Nav.Link as={NavLink} to="/users" exact className='nav-link'> User </Nav.Link>
            <Nav.Link as={NavLink} to="/projects" exact className='nav-link'> Project </Nav.Link>
            <Nav.Link as={NavLink} to="/about" exact className='nav-link'> About </Nav.Link>
                 </Nav>

             <Nav>
              { user && user.isAuthenticated === true 
                ?
              
              <>
            <Nav.Item className='nav-link'>
              Welcome {user.account.username} !
              </Nav.Item>
           

            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item > Change Password </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <span onClick={() => handleLogout()}>   Log out </span>
             
              </NavDropdown.Item>
            </NavDropdown>
           </>
            :
            <Link className='nav-link' to='/login' >
              Login
            </Link>

          }
         </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   </>
    );
    }
    else{
      return <> </>
    }
}

export default NavHeader;