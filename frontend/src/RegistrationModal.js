import React from 'react';
import { Modal } from 'react-bootstrap';
import RegistrationStepper from './RegistrationStepper';

const RegistrationModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistrationStepper />
      </Modal.Body>
    </Modal>
  );
};

export default RegistrationModal;
