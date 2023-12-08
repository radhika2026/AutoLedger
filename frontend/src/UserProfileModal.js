import React from 'react';
import Cookies from 'js-cookie';
import { Modal, Button } from 'react-bootstrap';

const UserProfileModal = ({ isOpen, toggle }, ) => {
  const userName =  Cookies.get('userName')
  const userRole =  Cookies.get('userRole')
  // const idNo =  Cookies.get('idNo')
  const idNo = ' '
  const email = Cookies.get('email')
  const drivingLicense = Cookies.get('drivingLicense')

  return (
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Your Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Name:</strong> {userName} 
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        {idNo && (
          <p>
            <strong>Secondary ID Number:</strong> {idNo}
          </p>
        )}

        <p>
          <strong>Driver's Licence Number:</strong> {drivingLicense}
        </p>
        <p>
          <strong>User Type:</strong> {userRole}
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
