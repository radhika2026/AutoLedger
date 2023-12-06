import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FETCH_USER } from './utils/resdb';
import { sendRequest } from './utils/resdbApi';
import './App.css'; // Import the custom CSS file

const SignInModal = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    tempErrors.email = emailRegex.test(email) ? '' : 'Email is not valid.';
    tempErrors.password = password.length >= 8 ? '' : 'Password must be at least 8 characters long.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await sendRequest(FETCH_USER({ email, password }));
        // TODO: Handle successful sign-in, add cookie, and redirect
        console.log('Sign in successful', res);
      } catch (error) {
        // Handle error
        setShowError(true);
        setErrorMessage('Internal server error. Please try again later.');
      }
    } else {
      // TODO: Handle form not valid toast
    }
  };

  return (
    <Modal show={isOpen} onHide={toggle} centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="text-center">
          <Modal.Title className="mb-4">Sign In</Modal.Title>

          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              {errorMessage}
            </Alert>
          )}

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              className="mb-3 custom-input"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              className="custom-input"
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3 custom-button">
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
