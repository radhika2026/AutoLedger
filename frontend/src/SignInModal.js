import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { FETCH_USER } from "./utils/resdb";
import { sendRequest } from "./utils/resdbApi";
import "./App.css"; // Import the custom CSS file
import { useNavigate } from "react-router-dom";
import ToastComponent from "./ToastComponent";

const SignInModal = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    tempErrors.email = emailRegex.test(email) ? "" : "Email is not valid.";
    tempErrors.password =
      password.length >= 8
        ? ""
        : "Password must be at least 8 characters long.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await sendRequest(FETCH_USER(email, password));
        console.log("added successfully ", res);
        if (Object.keys(res).length !== 0) {
          //TODO: add cookie Arvind
          navigate("/home");
        } else {
          setToastMessage("Invalid credentials!");
          setShowToast(true);
        }
      } catch (error) {
        // Handle error
        setToastMessage("Error Login, check later!");
        setShowToast(true);
      }
    } else {
      setToastMessage("Error! Check Entries!");
      setShowToast(true);
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={toggle} centered>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="text-center">
            <div className="modal-header">
              <h5 className="modal-title">Sign In</h5>
            </div>
            {showError && (
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
              >
                {errorMessage}
              </Alert>
            )}
            <div className="modal-body">
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  className="mb-3 custom-input"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
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
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="modal-footer">
              <Button
                variant="primary"
                type="submit"
                className="blue-bordered-button"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastComponent
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default SignInModal;
