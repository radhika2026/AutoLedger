import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import InsuranceDropdown from './InsuranceDropdown'; // Import the new component


const NavbarComponent = ({ onRegisterClick, onSignInClick, onDMVClick, onInsuranceActions, onUserProfileClick }) => {
  
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/home" style={{ marginLeft: '12px' }}>AutoLedger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/vehicleinfopage">Vehicle Information</Nav.Link>
          <Nav.Link href="/ServiceCenterForm">Service Center</Nav.Link>
          <Nav.Link onClick={onRegisterClick} style={{ cursor: 'pointer' }}>Register</Nav.Link>
          <Nav.Link onClick={onSignInClick} style={{ cursor: 'pointer' }}>Sign In</Nav.Link>
          <Nav.Link href="/InsuranceDropdown">Insurance</Nav.Link>
          <Nav.Link href="/dmv">DMV Services</Nav.Link>
          <Nav.Link onClick={onUserProfileClick}>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
