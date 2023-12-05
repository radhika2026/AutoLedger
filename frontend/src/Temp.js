import React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavbarComponent from "./NavbarComponent"; // Import Navbar component
import SearchComponent from "./SearchComponent"; // Import Search component

function App() {
  return (
    <div className="app-background">
      <NavbarComponent />
      <div className="centered-form">
        <Container className="form-container">
          <h1 className="form-heading">Vehicle License Plate Search</h1>
          {/* Other form elements */}
        </Container>
      </div>
      <SearchComponent />
      <h1>hello</h1>
    </div>
  );
}

export default App;
