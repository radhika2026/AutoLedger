import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import VehicleInfoComponent from './VehicleInfoComponent';
import VehicleHistoryComponent from './VehicleHistoryComponent';
import VehicleSpecsComponent from './VehicleSpecsComponent';
import OwnerInfoComponent from './OwnerDetailsComponent.js';
import InsuranceInfoComponent from './InsuranceInfoComponent.js';
function VehicleInfo({ userRole }) {
  var userRole = 'DMV'
  return (
    <div className="VehicleInfo-container">
      <VehicleInfoComponent />
      {console.log(userRole)}
      {(userRole === 'vehicle owner' || userRole === 'DMV') && <OwnerInfoComponent />}  
      {userRole === 'vehicle owner' || userRole === 'insurance' && <InsuranceInfoComponent />}
      <VehicleHistoryComponent />
      <VehicleSpecsComponent />
    </div>
  );
}

export default VehicleInfo;