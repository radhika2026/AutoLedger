import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = ({ onRegisterClick, onLoginClick }) => {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/home">AutoLedger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/vehicleinfopage">Vehicle Information</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={onRegisterClick}>Register</Nav.Link>
          <Nav.Link onClick={onLoginClick}>Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
