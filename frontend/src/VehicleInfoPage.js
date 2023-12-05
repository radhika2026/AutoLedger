import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import VehicleInfoComponent from './VehicleInfoComponent';
import VehicleHistoryComponent from './VehicleHistoryComponent';
import VehicleSpecsComponent from './VehicleSpecsComponent';
import OwnerInfoComponent from './OwnerDetailsComponent.js';
import InsuranceInfoComponent from './InsuranceInfoComponent.js';

function VehicleInfo() {
  return (
    <div className="VehicleInfo-container">
      <VehicleInfoComponent />
      <OwnerInfoComponent />  
      <InsuranceInfoComponent />
      <VehicleHistoryComponent />
      <VehicleSpecsComponent />
    </div>
  );
}

export default VehicleInfo;
