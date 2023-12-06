import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = ({ userRole, onRegisterClick, onSignInClick, onUserProfileClick }) => {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/home" style={{ marginLeft: '12px' }}>AutoLedger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/vehicleinfopage">Vehicle Information</Nav.Link>

          {/* Conditional Links based on userRole */}
          {userRole === 'DMV' && <Nav.Link href="/dmv">DMV Services</Nav.Link>}
          {userRole === 'insurance' && <Nav.Link href="/InsuranceDropdown">Insurance</Nav.Link>}
          {userRole === 'service center' && <Nav.Link href="/ServiceCenterForm">Service Center</Nav.Link>}

          {/* Always visible links */}
          <Nav.Link onClick={onRegisterClick} style={{ cursor: 'pointer' }}>Register</Nav.Link>
          <Nav.Link onClick={onSignInClick} style={{ cursor: 'pointer' }}>Sign In</Nav.Link>
          <Nav.Link onClick={onUserProfileClick} style={{ cursor: 'pointer' }}>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
