import React from "react";
import { Card, Table } from "react-bootstrap";

const VehicleHistoryComponent = (historyData) => {
  // const historyData = [
  //   {
  //     date: "01/01/2020",
  //     event: "Vehicle serviced",
  //     location: "Service Station A",
  //   },
  //   { date: "12/12/2020", event: "Oil changed", location: "Service Station B" },
  // ];
  console.log("historyData", historyData);

  return (
    <Card className="owner-info-card">
      <Card.Body>
        <Card.Title>Owner Information</Card.Title>
        <Table striped bordered hover>
          <thead></thead>
          <tbody>
            {historyData.historyData.map((record, index) => (
              <tr key={index}>
                <td>{record.serviceDescription}</td>
                <td>{record.serviceDate}</td>
                <td>{record.serviceCenter}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VehicleHistoryComponent;
