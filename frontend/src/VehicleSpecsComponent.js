import React from 'react';
import { Card, Table } from 'react-bootstrap';

const VehicleSpecsComponent = () => {
  // Static data for demonstration, replace with actual data fetching logic
  const specsData = {
    licence: 'ABC123',
    VIN: 'SV30-0169266', 
    engine_no: 'PJ12345U123456P', 
    make: 'PORSCHE',
    model: '911',
    color: 'Blue', 
    year: 2007,
    engine: '1.8L I4',
    transmission: 'Automatic',
    seating: '5', 
    wheelbase: '2.80 meters', 
    drive: '150 mm', 
    fuel: 'Front-wheel drive', 
    class: 'Sedan', 
    manufacture: '01-08-2021'

    // Add more specifications as needed
  };

  return (
    <Card className="vehicle-specs-card">
      <Card.Body>
        <Card.Title>Vehicle Specifications</Card.Title>
        <Table striped bordered hover>
          <tbody>
            {Object.entries(specsData).map(([key, value]) => (
              <tr key={key}>
                <td>{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VehicleSpecsComponent;
