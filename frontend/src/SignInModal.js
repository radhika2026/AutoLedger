import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie'; // Import Cookies
import { FETCH_USER } from './utils/resdb';
import { sendRequest } from './utils/resdbApi';

const SignInModal = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    tempErrors.email = emailRegex.test(email) ? '' : 'Email is not valid.';
    tempErrors.password = password.length >= 10 && password.length <= 15 ? '' : 'Password must be 10-15 characters long.';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        sendRequest(FETCH_USER({ email, password }))
          .then((res) => {
            // Assuming the response contains the user role
            // Set the user's role in a cookie
            Cookies.set('userRole', res.userRole, { expires: 1 }); // Expires in 1 day
            console.log("Signed in successfully", res);
            
            toggle(); // Close the modal after successful login
          })
          .catch(error => {
            // Handle any errors here
            console.error("Login error", error);
          });
      } catch (error) {
        // Handle error
        console.error("An error occurred during login", error);
      }
    } else {
      // Form validation failed
    }
  };

  return (
    <Modal show={isOpen} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
