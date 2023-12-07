import React, { useState } from 'react';
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
import './HomePage.css';
import SignInModal from './SignInModal'; // Import SignInModal
import RegistrationModal from './RegistrationModal'; // Import RegistrationModal

const HomePage = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const toggleSignInModal = () => setShowSignInModal(!showSignInModal);
  const toggleRegistrationModal = () => setShowRegistrationModal(!showRegistrationModal);

  return (
    <>
      <div className="hero-section d-flex justify-content-center align-items-center text-center">
        <div className="mx-auto">
          <img src={'./AutoLedger.webp'} alt="AutoLedger Logo" className="logo"/>
          <h1>Welcome to AutoLedger</h1>
          <p>Your ultimate vehicle management solution.</p>
          <div className="cta-buttons">
            <Button variant="primary" onClick={toggleSignInModal}>Log in</Button>
            <Button variant="outline-light" onClick={toggleRegistrationModal}>Sign up</Button>
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