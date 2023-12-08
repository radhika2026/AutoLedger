import React from "react";
import { Card, Table } from "react-bootstrap";

const OwnerInfoComponent = ({ ownerData }) => {
  console.log("owner", ownerData);
  // ownerData = [
  //   {
  //     owner_name: "John Doe",
  //     registration_date: "12-01-2021",
  //     DMV_registered: "CA", // State in which it was registered
  //     driving_licence: "DL123456",

  //   },
  //   {
  //     owner_name: "John Doe",
  //     registration_date: "12-01-2021",
  //     DMV_registered: "CA", // State in which it was registered
  //     driving_licence: "DL123456",
  //   },
  // ];
  return (
    <Card className="owner-info-card">
      <Card.Body>
        <Card.Title>Owner Information</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Registration Date</th>
              <th>DMV Registered</th>
              <th>Driving License</th>
            </tr>
          </thead>
          <tbody>
           {ownerData.lenght > 0 && ownerData.map((owner, index) => (
              <tr key={index}>
                <td>{owner?.owner_name}</td>
                <td>{owner?.registration_date}</td>
                <td>{owner?.DMV_registered}</td>
                <td>{owner?.driving_licence}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OwnerInfoComponent;
