import React from "react";
import { Card, Table } from "react-bootstrap";

const OwnerInfoComponent = ({ ownerData }) => {
  console.log("owner", ownerData);
  // ownerData = [
  //   {
  //     "ownerName": "John Doe",
  //     "ownershipStartDate": "12-01-2021",
  //     "ownershipEndDate": "CA", // State in which it was registered

  //   },
  //   {
  //     "ownerName": "Radhika",
  //     "ownershipStartDate": "12-01-2021",
  //     "ownershipEndDate": "CA", // State in which it was registe
  //   },
  // ];
  return (
    <Card className="owner-info-card">
      <Card.Body>
        <Card.Title>Owner Information</Card.Title>
        <Table striped bordered hover>
          <thead>
          </thead>
          <tbody>
           {ownerData.length > 0 && ownerData.map((owner, index) => (
              <tr key={index}>
                <td>{owner?.ownerName}</td>
                <td>{owner?.ownershipStartDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OwnerInfoComponent;
