import React, { useState } from "react";
import { Modal, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { sendRequest } from "./utils/resdbApi";
import { GENERATE_KEYS, POST_TRANSACTION } from "./utils/resdb";
import { useNavigate } from "react-router-dom";
import ToastComponent from "./ToastComponent";

//TODO: remove encrypted keys
const metadata = {
  signerPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
  signerPrivateKey: "2QdMTdaNj8mJjduXFAsHieVmcsBcqeWQyW9v891kZEXC",
  recipientPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
};


const RegistrationModal = ({ isOpen, toggle }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    dlNumber: "",
    email: "",
    password: "",
    role: "",
    additionalId: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const validateStepOne = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name) {
      isValid = false;
      errors.name = "Name is required";
    }

    const dlRegex = /^[a-zA-Z0-9]{8,10}$/;
    if (!dlRegex.test(formData.dlNumber)) {
      isValid = false;
      errors.dlNumber = "DL number must be 8-10 alphanumeric characters";
    }

    if (!formData.email.includes("@")) {
      isValid = false;
      errors.email = "Invalid email";
    }

    const passwordRegex = /^[a-zA-Z0-9]{10,15}$/;
    if (!passwordRegex.test(formData.password)) {
      isValid = false;
      errors.password = "Password must be 10-15 alphanumeric characters";
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const nextStep = () => {
    if (step === 1 && validateStepOne()) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = Date.now();
    const dataWithTimestamp = {
      ...formData,
      timestamp: timestamp,
      asset_type: "user",
    };
    const payload = JSON.stringify(dataWithTimestamp);
    console.log(payload);
    try {
      sendRequest(POST_TRANSACTION(metadata, payload)).then((res) => {
        navigate("/home");
        console.log("added successfully ", res);
      });
    } catch (error) {
      setToastMessage("Error! Check Entries!");
      setShowToast(true);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="dlNumber">DL Number</Label>
              <Input
                type="text"
                name="dlNumber"
                id="dlNumber"
                value={formData.dlNumber}
                onChange={handleInputChange}
              />
              {errors.dlNumber && (
                <div className="error">{errors.dlNumber}</div>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </FormGroup>
          </Form>
        );
      case 2:
        return (
          <Form>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Vehicle Owner">Vehicle Owner</option>
                <option value="DMV">DMV</option>
                <option value="Service Center">Service Center</option>
                <option value="Insurance">Insurance</option>
                <option value="Dealership">Dealership</option>
                <option value="Normal User">Normal User</option>
              </Input>
            </FormGroup>
            {["DMV", "Insurance", "Service Center", "Dealership"].includes(
              formData.role
            ) && (
              <FormGroup>
                <Label for="additionalId">{`${formData.role} ID`}</Label>
                <Input
                  type="text"
                  name="additionalId"
                  id="additionalId"
                  value={formData.additionalId}
                  onChange={handleInputChange}
                />
              </FormGroup>
            )}
          </Form>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title">User Registration</h5>
          <button type="button" className="close" onClick={toggle}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">{renderStepContent(step)}</div>
        <div className="modal-footer">
          {step > 1 && (
            <Button color="secondary" onClick={previousStep}>
              Back
            </Button>
          )}
          {step < 2 ? (
            <Button color="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button color="success" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Modal>
      <ToastComponent
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default RegistrationModal;
