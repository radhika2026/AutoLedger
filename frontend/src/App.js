import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeComponent from './HomeComponent';
import VehicleInfo from './VehicleInfoPage';
import NavbarComponent from './NavbarComponent';
import RegistrationModal from './RegistrationModal'; // New component for the registration modal

function App() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowRegistration = () => setShowRegistrationModal(true);
  const handleHideRegistration = () => setShowRegistrationModal(false);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleHideLogin = () => setShowLoginModal(false);

  return (
    <Router>
      <NavbarComponent onRegisterClick={handleShowRegistration} onLoginClick={handleShowLogin} />
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/vehicleinfopage" element={<VehicleInfo />} />
        {/* Define other routes as needed */}
      </Routes>
      <RegistrationModal show={showRegistrationModal} onHide={handleHideRegistration} />
      {/* Implement a similar modal for login */}
      {/* <LoginModal show={showLoginModal} onHide={handleHideLogin} /> */}
    </Router>
  );
}

export default App;
