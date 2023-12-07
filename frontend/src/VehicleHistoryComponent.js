import React from "react";
import { Card } from "react-bootstrap";

const VehicleHistoryComponent = (historyData) => {
  // const historyData = [
  //   {
  //     date: "01/01/2020",
  //     event: "Vehicle serviced",
  //     location: "Service Station A",
  //   },
  //   { date: "12/12/2020", event: "Oil changed", location: "Service Station B" },
  // ];

  return (
    <Card className="vehicle-history-card">
      <Card.Body>
        <Card.Title>Service History</Card.Title>
        <ul className="list-unstyled">
          {historyData.map((record, index) => (
            <li key={index}>
              <strong>{record.date}</strong>: {record.event} at{" "}
              {record.location}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default VehicleHistoryComponent;
