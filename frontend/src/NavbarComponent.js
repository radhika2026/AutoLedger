import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // make sure bootstrap CSS is imported

const NavbarComponent = ({
  userRole,
  onRegisterClick,
  onSignInClick,
  onUserProfileClick,
}) => {
  return (
    <Navbar variant="dark" expand="lg" className="shadow-5-strong">
      <Navbar.Brand href="/home">AutoLedger</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home" active>
            Home
          </Nav.Link>
          <Nav.Link href="/vehicleinfopage">Vehicle Information</Nav.Link>

          {/* Conditional Links based on userRole */}
          {userRole === "DMV" && <Nav.Link href="/dmv">DMV Services</Nav.Link>}
          {userRole === "insurance" && (
            <NavDropdown title="Insurance" id="insurance-dropdown">
              <NavDropdown.Item href="#action/3.1">Option 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Option 2</NavDropdown.Item>
              {/* Add more dropdown items here */}
            </NavDropdown>
          )}
          {userRole === "service center" && (
            <Nav.Link href="/ServiceCenterForm">Service Center</Nav.Link>
          )}

          <Nav.Link disabled>Disabled</Nav.Link>
        </Nav>

        {/* Right-aligned links, replace these with your actual login/register/profile links */}
        <Nav>
          <Nav.Link onClick={onRegisterClick}>Register</Nav.Link>
          <Nav.Link onClick={onSignInClick}>Sign In</Nav.Link>
          <Nav.Link onClick={onUserProfileClick}>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
