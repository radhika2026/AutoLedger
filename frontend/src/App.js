import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomeComponent from './HomeComponent';
import VehicleInfo from './VehicleInfoPage';
import NavbarComponent from './NavbarComponent';

function App() {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  const toggleRegistrationModal = () => {
    setRegistrationModalOpen(!isRegistrationModalOpen);
  };

  return (
    <Router>
      <NavbarComponent 
        onRegisterClick={toggleRegistrationModal} 
        isModalOpen={isRegistrationModalOpen} 
      />
      <Routes>
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/vehicleinfopage" element={<VehicleInfo />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
