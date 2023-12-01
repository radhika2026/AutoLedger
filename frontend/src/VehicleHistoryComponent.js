import React from 'react';
import { Card } from 'react-bootstrap';

const VehicleHistoryComponent = () => {
  // Static data for demonstration, replace with actual data fetching logic
  const historyData = [
    { date: '01/01/2020', event: 'Vehicle serviced', location: 'Service Station A' },
    { date: '12/12/2020', event: 'Oil changed', location: 'Service Station B' },
    // Add more history records as needed
  ];

  return (
    <Card className="vehicle-history-card">
      <Card.Body>
        <Card.Title>Vehicle History</Card.Title>
        <ul className="list-unstyled">
          {historyData.map((record, index) => (
            <li key={index}>
              <strong>{record.date}</strong>: {record.event} at {record.location}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default VehicleHistoryComponent;
