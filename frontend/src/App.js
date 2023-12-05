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
import Insurance from './InsuranceDropdown';
import UserProfileModal from './UserProfileModal';

function App() {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isDMVModalOpen, setDMVModalOpen] = useState(false);
  const [isInsuranceDropdownOpen, setInsuranceDropdownOpen] = useState(false); // New state for Insurance dropdown
  const [isUserProfileModalOpen, setUserProfileModalOpen] = useState(false);

  const toggleRegistrationModal = () => {
    setRegistrationModalOpen(!isRegistrationModalOpen);
  };

  const toggleInsuranceDropdown = () => {
    setInsuranceDropdownOpen(!isInsuranceDropdownOpen);
  };

  const toggleUserProfileModal = () => {
    setUserProfileModalOpen(!isUserProfileModalOpen);
  };

  return (
    <Router>
      <NavbarComponent
        onRegisterClick={toggleRegistrationModal}
        onSignInClick={() => setSignInModalOpen(true)}
        onDMVClick={() => setDMVModalOpen(true)}
        onInsuranceActions={toggleInsuranceDropdown} // Pass toggle function to Insurance link
        onUserProfileClick={toggleUserProfileModal} // Pass toggle function to UserProfile link
      />
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/vehicleinfopage" element={<VehicleInfo />} />
        <Route path="/Serv" element={<VehicleInfo />} />
        <Route path="/ServiceCenterForm" element={<ServiceCenterForm />} />
        <Route path="/dmv" element={<DMV />} />
        <Route path="/InsuranceDropdown" element={<Insurance />} />
        {/* Define other routes as needed */}
      </Routes>
      <SignInModal isOpen={isSignInModalOpen} toggle={() => setSignInModalOpen(false)} />
      <UserProfileModal isOpen={isUserProfileModalOpen} toggle={toggleUserProfileModal} />
      <RegistrationModal isOpen={isRegistrationModalOpen} toggle={toggleRegistrationModal} />
      {/* <DMV isOpen={isDMVModalOpen} toggle={() => setDMVModalOpen(false)} /> */}
    </Router>
  );
}

export default App;
