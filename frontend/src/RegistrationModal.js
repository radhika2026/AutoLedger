import React, { useState } from "react";
import { Modal, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { sendRequest } from "./utils/resdbApi";
import { POST_TRANSACTION } from "./utils/resdb";
import { useNavigate } from "react-router-dom";
import ToastComponent from "./ToastComponent";

const metadata = {
  signerPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
  signerPrivateKey: "2QdMTdaNj8mJjduXFAsHieVmcsBcqeWQyW9v891kZEXC",
  recipientPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
};

const RegistrationModal = ({ isOpen, toggle }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: "",
    userRole: "",
    idNo: "",
    email: "",
    password: "",
    drivingLicense: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const validateStepOne = () => {
    let errors = {};
    let isValid = true;

    if (!formData.userName) {
      isValid = false;
      errors.userName = "Name is required";
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
              <Label for="userName">Name</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                value={formData.userName}
                onChange={handleInputChange}
              />
              {errors.userName && (
                <div className="error">{errors.userName}</div>
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
            <FormGroup>
              <Label for="drivingLicense">Driving License</Label>
              <Input
                type="text"
                name="drivingLicense"
                id="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        );
      case 2:
        return (
          <Form>
            <FormGroup>
              <Label for="userRole">Role</Label>
              <Input
                type="select"
                name="userRole"
                id="userRole"
                value={formData.userRole}
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
            {console.log("userName", formData)}
            {["DMV", "Insurance", "Service Center", "Dealership"].includes(
              formData.userRole
            ) && (
              <FormGroup>
                <Label for="idNo">{`${formData.userRole} ID`}</Label>
                <Input
                  type="text"
                  name="idNo"
                  id="idNo"
                  value={formData.idNo}
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
      <Modal isOpen={isOpen} toggle={toggle}>
        <div className="modal-header">
          <h5 className="modal-title">User Registration</h5>
        </div>
        <div className="modal-body">{renderStepContent(step)}</div>
        <div className="modal-footer">
          {step > 1 && (
            <Button className="blue-bordered-button" onClick={previousStep}>
              Back
            </Button>
          )}
          {step < 2 ? (
            <Button className="blue-bordered-button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button className="blue-bordered-button" onClick={handleSubmit}>
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
