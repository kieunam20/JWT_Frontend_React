import React, { useContext } from 'react';
import './Nav.scss'
import {NavLink,  useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const  NavHeader =(props) => {
  const {user} = useContext(UserContext); 
  let location = useLocation();

  if((user && user.isAuthenticated === true) || location.pathname === '/'){

    return (
   <>
  
     {/* <div class="topnav">
  <NavLink  to="/" exact >Home</NavLink>
  <NavLink to="/users">Users</NavLink>
  <NavLink to="/projects">Projects</NavLink>
  <NavLink to="/about">About</NavLink>
    </div> */}

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
            <Nav.Item className='nav-link'>
              Welcome Nam!
              </Nav.Item>
            </Nav>

            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"> Change Password </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
               Log out
              </NavDropdown.Item>
            </NavDropdown>
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