import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./ServiceCenterForm.css";
import HomeComponent from './HomeComponent';
import VehicleInfo from './VehicleInfoPage';
import NavbarComponent from './NavbarComponent';
import SignInModal from './SignInModal';
import RegistrationModal from './RegistrationModal'; // Import your RegistrationModal component
import ServiceCenterForm from './ServiceCenterForm';

function App() {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const toggleRegistrationModal = () => {
    setRegistrationModalOpen(!isRegistrationModalOpen);
  };

  return (
    <Router>
      <NavbarComponent 
        onRegisterClick={toggleRegistrationModal} 
        onSignInClick={() => setSignInModalOpen(true)}
      />
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/vehicleinfopage" element={<VehicleInfo />} />
        <Route path="/ServiceCenterForm" element={<ServiceCenterForm />} />
        {/* Define other routes as needed */}
      </Routes>
      <SignInModal isOpen={isSignInModalOpen} toggle={() => setSignInModalOpen(false)} />
      <RegistrationModal isOpen={isRegistrationModalOpen} toggle={toggleRegistrationModal} /> {/* Ensure this is correctly implemented */}
    </Router>
  );
}

export default App;
