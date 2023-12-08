import React from 'react';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import { Button, Image } from 'react-bootstrap';
import logo from  "./A.png"
import './HomePage.css';
import './AutoLedger.webp'; // Update with the path to your logo image

const HomePage = () => {
  return (
    <>
      <div className="hero-section d-flex justify-content-center align-items-center text-center">
        <div className="mx-auto">
          <img src={logo} alt="AutoLedger Logo" className="logo"/>
          <h1>Welcome to AutoLedger</h1>
          <p>Your ultimate vehicle management solution.</p>
          <div className="cta-buttons">
            <Button variant="primary" href="/login">Log in</Button>
            <Button variant="outline-light" href="/register">Sign up</Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
