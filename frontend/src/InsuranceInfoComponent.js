import React from 'react';
import { Card, Table } from 'react-bootstrap';

const InsuranceInfoComponent = (insuranceData) => {
  // Static data for demonstration, replace with actual data fetching logic
  // const insuranceData = {
  //   insurance_number: 'INS1234567',
  //   insurance_provider: 'ABC Insurance Co.',
  //   policy_start_date: '12-01-2022',
  //   policy_end_date: '15-08-2022'
  // };

  return (
    <Card className="insurance-info-card">
      <Card.Body>
        <Card.Title>Insurance Information</Card.Title>
        <Table striped bordered hover>
          <tbody>
            {Object.entries(insuranceData).map(([key, value]) => (
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

export default InsuranceInfoComponent;