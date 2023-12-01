import React from 'react';
import { Card, Table } from 'react-bootstrap';

const VehicleSpecsComponent = () => {
  // Static data for demonstration, replace with actual data fetching logic
  const specsData = {
    make: 'Toyota',
    model: 'Corolla',
    year: 2007,
    engine: '1.8L I4',
    transmission: 'Automatic',
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
                <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
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
