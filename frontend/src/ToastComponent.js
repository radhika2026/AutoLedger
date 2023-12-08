import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastComponent = ({ show, message, onClose }) => {
  return (
    <ToastContainer className="p-3" position="top-end">
      <Toast onClose={onClose} show={show} delay={3000} autohide bg="light" className="d-inline-block m-1 text-dark">
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
