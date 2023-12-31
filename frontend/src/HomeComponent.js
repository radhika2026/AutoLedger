import React, { useState } from 'react';
import Footer from './Footer';
import { Button, Image } from 'react-bootstrap';
import logo from  "./A.png"
import './HomePage.css';
import './App.css'
import SignInModal from './SignInModal'; // Import SignInModal
import RegistrationModal from './RegistrationModal'; // Import RegistrationModal

const HomePage = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const toggleSignInModal = () => setShowSignInModal(!showSignInModal);
  const toggleRegistrationModal = () => setShowRegistrationModal(!showRegistrationModal);

  return (
    <>
      <div className="hero-section justify-content-center align-items-center text-center">
        <div className="mx-auto">
          <img src={logo} alt="AutoLedger Logo" className="logo"/>
          <h1>Welcome to AutoLedger</h1>
          <p>Your ultimate vehicle management solution.</p>
          <div className="cta-buttons">
            <Button variant="primary" className='blue-bordered-button' onClick={toggleSignInModal}>Log in</Button>
            <Button  className='b-bordered-button' onClick={toggleRegistrationModal}>Sign up</Button>
          </div>
        </div>
      </div>
      <Footer />

      {/* SignInModal */}
      <SignInModal isOpen={showSignInModal} toggle={toggleSignInModal} />

      {/* RegistrationModal */}
      <RegistrationModal isOpen={showRegistrationModal} toggle={toggleRegistrationModal} />
    </>
  );
};

export default HomePage;