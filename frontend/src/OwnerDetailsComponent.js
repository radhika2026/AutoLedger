import React from 'react';
import { Card, Table } from 'react-bootstrap';

const OwnerInfoComponent = () => {
  // Static data for demonstration, replace with actual data fetching logic
  const ownerData = {
    owner_name: 'John Doe',
    registration_date: '12-01-2021',
    DMV_registered: 'CA', // State in which it was registered
    driving_licence: "DL123456"
    // Add more owner details as needed
  };

  return (
    <Card className="owner-info-card">
      <Card.Body>
        <Card.Title>Owner Information</Card.Title>
        <Table striped bordered hover>
          <tbody>
            {Object.entries(ownerData).map(([key, value]) => (
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

export default OwnerInfoComponent;
