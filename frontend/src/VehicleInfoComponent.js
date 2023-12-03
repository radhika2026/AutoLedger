import React from 'react';
import { Card } from 'react-bootstrap';

const VehicleInfoComponent = () => {
  // Replace with actual data
  const vehicleInfo = {
    year: 2007,
    make: 'Toyota',
    model: 'Corolla',
    reportTitle: 'Vehicle History Report'
  };

  return (
    <Card className="vehicle-info-card">
      <Card.Body>
        <Card.Title>{`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model} ${vehicleInfo.reportTitle}`}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default VehicleInfoComponent;
