import React, { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';

const RegistrationStepper = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    dlNumber: '',
    email: '',
    password: '',
    role: '',
    idNumber: '',
    centerId: '',
    dealershipNumber: ''
  });

  const validateInput = (name, value) => {
    let error = '';
    if (name === 'dlNumber' && !/^[a-zA-Z0-9]{8,10}$/.test(value)) {
      error = 'DL number must be 8 to 10 alphanumeric characters.';
    } else if (name === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Invalid email format.';
    } else if (name === 'password' && !/^[a-zA-Z0-9]{10,15}$/.test(value)) {
      error = 'Password must be 10 to 15 alphanumeric characters.';
    } else if ((name === 'idNumber' || name === 'centerId' || name === 'dealershipNumber') && !/^\d{9}$/.test(value)) {
      error = `${name} must be 9 numeric characters.`;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const error = validateInput(name, value);
    setShowToast(error !== '');
  };

  const handleNext = () => {
    // If no errors on the current step, proceed to the next step
    const formErrors = Object.entries(userData).reduce((acc, [key, value]) => {
      const error = validateInput(key, value);
      if (error) {
        acc[key] = error;
      }
      return acc;
    }, {});

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setStep(currentStep => currentStep + 1);
    } else {
      setShowToast(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2) {
      handleNext();
      if (Object.keys(errors).length === 0) {
        // Form is valid, you can send data to the server here
        console.log('Registration data:', userData);
        // Assume registration is successful and close the modal
        // If you're using a modal, you'd typically close it here
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="registration-form">
        {/* Form content based on step */}
        {step === 1 && (
          // Form fields for step 1
          // ...
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {step === 2 && (
          // Form fields for step 2
          // ...
          <Button variant="primary" type="submit">
            Register
          </Button>
        )}
      </Form>
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Validation Error</strong>
        </Toast.Header>
        <Toast.Body>
          {Object.values(errors).map((error, index) => (
            <p key={index} className="text-danger">
              {error}
            </p>
          ))}
        </Toast.Body>
      </Toast>
    </>
  );
};

export default RegistrationStepper;
