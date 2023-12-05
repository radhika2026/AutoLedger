import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./ServiceCenterForm.css";
import HomeComponent from './HomeComponent';
import VehicleInfo from './VehicleInfoPage';
import NavbarComponent from './NavbarComponent';
import SignInModal from './SignInModal';
import RegistrationModal from './RegistrationModal';
import ServiceCenterForm from './ServiceCenterForm';
import DMV from './dmvOperations';
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
        <Route path="/Serv" element={<VehicleInfo />} />
        <Route path="/ServiceCenterForm" element={<ServiceCenterForm />} />
        <Route path="/dmv" element={<DMV />} />
        {/* Define other routes as needed */}
      </Routes>
      <SignInModal isOpen={isSignInModalOpen} toggle={() => setSignInModalOpen(false)} />
      <RegistrationModal isOpen={isRegistrationModalOpen} toggle={toggleRegistrationModal} />
      {/* <DMV isOpen={isDMVModalOpen} toggle={() => setDMVModalOpen(false)} /> */}
    </Router>
  );
}

export default App;
