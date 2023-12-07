import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the Cookies library
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
import Footer from './Footer';

function App() {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const [isDMVModalOpen, setDMVModalOpen] = useState(false);
  const [isInsuranceDropdownOpen, setInsuranceDropdownOpen] = useState(false); // New state for Insurance dropdown
  const [isUserProfileModalOpen, setUserProfileModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Update the user role from cookie on component mount
    const role = Cookies.get('userRole');
    setUserRole(role);
  }, []);

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
        onUserProfileClick={toggleUserProfileModal}
        onDMVClick={() => setDMVModalOpen(true)}
        onInsuranceActions={toggleInsuranceDropdown} // Pass toggle function to Insurance link
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
      <Footer/>
      <SignInModal isOpen={isSignInModalOpen} toggle={() => setSignInModalOpen(false)} />
      <UserProfileModal isOpen={isUserProfileModalOpen} toggle={toggleUserProfileModal} />
      <RegistrationModal isOpen={isRegistrationModalOpen} toggle={toggleRegistrationModal} />
      {/* <DMV isOpen={isDMVModalOpen} toggle={() => setDMVModalOpen(false)} /> */}
    </Router>
  );
}

export default App;
