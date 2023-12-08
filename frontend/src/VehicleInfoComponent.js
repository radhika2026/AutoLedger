import React from "react";
import { Card } from "react-bootstrap";

const VehicleInfoComponent = (vehicleInfo) => {
  // Replace with actual data
  // const vehicleInfo = {
  //   year: 2021,
  //   make: 'Porshe',
  //   model: '911',
  //   reportTitle: 'Vehicle History Report'
  // };

  console.log("vehicle", vehicleInfo);
  return (
    <Card className="vehicle-info-card">
      <Card.Body>
        <Card.Title>{`${vehicleInfo.vehicleInfo.manufacturingDate} ${vehicleInfo.vehicleInfo.model} ${vehicleInfo.vehicleInfo.carClass}`}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default VehicleInfoComponent;
