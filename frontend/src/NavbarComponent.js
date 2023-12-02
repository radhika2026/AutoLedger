import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import RegistrationModal from './RegistrationModal';

const NavbarComponent = ({ onRegisterClick, isModalOpen }) => {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/home">AutoLedger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/vehicleinfopage">Vehicle Information</Nav.Link>
          {/* The following Nav.Link acts as the "Register" button */}
          <Nav.Link onClick={onRegisterClick} style={{ cursor: 'pointer' }}>Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <RegistrationModal isOpen={isModalOpen} toggle={onRegisterClick} />
    </Navbar>
  );
};

export default NavbarComponent;
