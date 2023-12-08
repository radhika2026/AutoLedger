import React from "react";
import { Card, Table } from "react-bootstrap";

const InsuranceInfoComponent = (insuranceData) => {
  // Static data for demonstration, replace with actual data fetching logic
  // const insuranceData = {
  //   insurance_number: 'INS1234567',
  //   insurance_provider: 'ABC Insurance Co.',
  //   policy_start_date: '12-01-2022',
  //   policy_end_date: '15-08-2022'
  // };
console.log("insuranceData", insuranceData)
  return (
    <Card className="insurance-info-card">
      <Card.Body>
        <Card.Title>Insurance Information</Card.Title>
        <Table striped bordered hover>
          <tbody>
            {insuranceData.lenght > 0 &&
              insuranceData.map((insurance, index) => (
                <tr key={index}>
                  <td>{insurance.cost}</td>
                  <td>{insurance.description}</td>
                  <td>{insurance.date}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default InsuranceInfoComponent;
