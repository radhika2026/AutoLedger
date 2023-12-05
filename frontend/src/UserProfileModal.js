import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

const UserProfileModal = ({ isOpen, toggle }) => {
  return (
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: 'center' }}>
          <Image
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            roundedCircle
            style={{ marginBottom: '20px' }}
          />
        </div>
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Age:</strong> 30
        </p>
        <p>
          <strong>Location:</strong> City, Country
        </p>
        <p>
          <strong>User Type:</strong> User
        </p>
        {/* Add more user details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;
