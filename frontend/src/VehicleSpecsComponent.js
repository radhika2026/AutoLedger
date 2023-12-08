import React from 'react';
import { Card, Table } from 'react-bootstrap';

const VehicleSpecsComponent = ({ specsData }) => {
  return (
    <Card className="vehicle-specs-card">
      <Card.Body>
        <Card.Title>Vehicle Specifications</Card.Title>
        <Table striped bordered hover>
          <tbody>
            {Object.entries(specsData).map(([key, value]) => (
              typeof value === 'string' && (
                <tr key={key}>
                  <td>{key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                  <td>{value}</td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VehicleSpecsComponent;
