
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // make sure bootstrap CSS is imported
import './NavbarComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Cookies from 'js-cookie';

const NavbarComponent = ({
  userRole,
  onRegisterClick,
  onSignInClick,
  onUserProfileClick,
}) => {

  const isLoggedIn = Cookies.get('isLoggedIn');
  
  return (
    <Navbar variant="dark tabs" expand="lg" className="shadow-5-strong navbar-custom">
      <Navbar.Brand href="/home"> <img src={process.env.PUBLIC_URL + 'A.png'} alt="GitHub Icon" style={{ marginLeft: '5px', height: '40px' }} />AutoLedger </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home">
            Home
          </Nav.Link>
          {/* <Nav.Link href="/vehicleinfopage">Vehicle Information</Nav.Link> */}
          <Nav.Link href="/search">Search</Nav.Link>
          {/* Conditional Links based on userRole */}
          {userRole === "DMV" && <Nav.Link href="/dmv">DMV Services</Nav.Link>}
          {userRole === "Insurance" && (<Nav.Link href="/InsuranceDropdown">DMV Services</Nav.Link>
          )}
          {userRole === "Service Center" && (
            <Nav.Link href="/ServiceCenterForm">Service Center</Nav.Link>
          )}
        </Nav>
          {/* GitHub Link with Icon */}
          <Nav.Link href="https://github.com/radhika2026/AutoLedger" target="_blank" rel="noopener noreferrer" style={{ paddingRight: '10px' }}>
  <FontAwesomeIcon icon={faGithub} /> 
</Nav.Link>

        {/* Right-aligned links, replace these with your actual login/register/profile links */}
        <Nav>
          {!isLoggedIn && <Nav.Link onClick={onRegisterClick}>Register</Nav.Link>}
          {!isLoggedIn && <Nav.Link onClick={onSignInClick}>Sign In</Nav.Link>}
          {isLoggedIn && <Nav.Link onClick={onUserProfileClick}>Profile</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
