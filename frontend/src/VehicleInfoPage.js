import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useLocation } from "react-router-dom";
import VehicleInfoComponent from "./VehicleInfoComponent";
import VehicleHistoryComponent from "./VehicleHistoryComponent";
import VehicleSpecsComponent from "./VehicleSpecsComponent";
import OwnerInfoComponent from "./OwnerDetailsComponent.js";
import InsuranceInfoComponent from "./InsuranceInfoComponent.js";
function VehicleInfo({ userRole }) {
  var userRole = "DMV";
  const location = useLocation();
  const carDetails = location.state?.carDetails;
  console.log("carDetails", carDetails);
  return (
    <div className="VehicleInfo-container">
      <VehicleInfoComponent vehicleInfo={carDetails} />
      {console.log(userRole)}
      {(userRole === "vehicle owner" || userRole === "DMV") && (
        <OwnerInfoComponent ownerata={carDetails} />
      )}
      {userRole === "vehicle owner" ||
        (userRole === "insurance" && <InsuranceInfoComponent insuranceData = {carDetails} />)}
      <VehicleHistoryComponent historyData={carDetails} />
      <VehicleSpecsComponent specsData = {carDetails} />
    </div>
  );
}

export default VehicleInfo;
