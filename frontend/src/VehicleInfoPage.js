import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import VehicleInfoComponent from './VehicleInfoComponent';
import VehicleHistoryComponent from './VehicleHistoryComponent';
import VehicleSpecsComponent from './VehicleSpecsComponent';

function VehicleInfo() {
  return (
    <div className="VehicleInfo-container">
      <VehicleInfoComponent />  
      <VehicleHistoryComponent />
      <VehicleSpecsComponent />
    </div>
  );
}

export default VehicleInfo;
