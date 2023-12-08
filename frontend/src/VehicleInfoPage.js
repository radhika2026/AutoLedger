import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useLocation } from "react-router-dom";
import VehicleInfoComponent from "./VehicleInfoComponent";
import VehicleHistoryComponent from "./VehicleHistoryComponent";
import VehicleSpecsComponent from "./VehicleSpecsComponent";
import OwnerInfoComponent from "./OwnerDetailsComponent.js";
import InsuranceInfoComponent from "./InsuranceInfoComponent.js";
import Cookies from "js-cookie";

function VehicleInfo() {
  const userRole = Cookies.get('userRole');
  const location = useLocation();
  const carDetails = location.state?.carDetails;
  console.log("carDetails in VehicleInforPage", carDetails);
  return (
    <div className="VehicleInfo-container">
      <VehicleInfoComponent vehicleInfo={carDetails} />
      {console.log(userRole)}
      {(
        <OwnerInfoComponent ownerData={carDetails.ownerHistory || []} />
      )}
      {(userRole === "Vehicle Owner" || userRole === "Insurance" || userRole === "DMV") && (
          <InsuranceInfoComponent insuranceData={carDetails.insuranceHistory || []} />
        )}
      <VehicleHistoryComponent historyData={carDetails.servicingHistory|| []} />
      <VehicleSpecsComponent specsData={carDetails} />
    </div>
  );
}

export default VehicleInfo;
