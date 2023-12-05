import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './NavbarComponent.css'; // Import the CSS file for styling

const NavbarComponent = ({ onRegisterClick, onSignInClick, onDMVClick, onInsuranceActions, onUserProfileClick }) => {
  
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/home" className="navbar-brand-custom">AutoLedger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home" className="nav-link-custom">Home</Nav.Link>
          <Nav.Link href="/vehicleinfopage" className="nav-link-custom">Vehicle Information</Nav.Link>
          <Nav.Link href="/ServiceCenterForm" className="nav-link-custom">Service Center</Nav.Link>
          <Nav.Link onClick={onRegisterClick} className="nav-link-custom" style={{ cursor: 'pointer' }}>Register</Nav.Link>
          <Nav.Link onClick={onSignInClick} className="nav-link-custom" style={{ cursor: 'pointer' }}>Sign In</Nav.Link>
          <Nav.Link href="/InsuranceDropdown" className="nav-link-custom">Insurance</Nav.Link>
          <Nav.Link href="/dmv" className="nav-link-custom">DMV Services</Nav.Link>
          <Nav.Link onClick={onUserProfileClick} className="nav-link-custom">Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
