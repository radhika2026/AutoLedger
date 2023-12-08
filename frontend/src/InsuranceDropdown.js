import React, { useState } from "react";
import { Card, Form, Button, Modal, FormControl } from "react-bootstrap";
import { Input } from "reactstrap";
import { FETCH_CAR, UPDATE_CAR } from "./utils/resdb";
import { sendRequest } from "./utils/resdbApi";
import ToastComponent from "./ToastComponent";

const InsuranceDropdown = () => {
  const [formData, setFormData] = useState({
    cost: "",
    date: "",
    description: "",
    numberPlate: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let numberPlate = formData.numberPlate;

    try {
      var newInsuranceObject = {};
      newInsuranceObject["date"] = formData.date;
      newInsuranceObject["cost"] = formData.cost;
      newInsuranceObject["description"] = formData.description;
      sendRequest(FETCH_CAR(numberPlate)).then((res) => {
        if (res != {}) {
          // if (res.data.getCarTransaction.servicingHistory) {
          console.log("response form fetch", res);
          var insuranceHistory = res.data.getCarTransaction.insuranceHistory;
          insuranceHistory.push(newInsuranceObject);
          res.data.getCarTransaction.insuranceHistory = insuranceHistory;
          var payload = res.data.getCarTransaction;
          const timestamp = Date.now();
          payload.timestamp = timestamp;
          payload.asset_type = "car";
          payload = JSON.stringify(payload);
          console.log("payload for update", payload);
          try {
            sendRequest(UPDATE_CAR(payload)).then((response) => {
              console.log("updated successfully", response);
              setToastMessage("Updated SUccessfully");
              setShowToast(true);
            });
          } catch (error) {
            console.log("error");
            setToastMessage("Error fetching data. Please try again.");
            setShowToast(true);
          }
        } else {
          //TODO: pop up no car found
          setToastMessage("Error fetching data. Please try again.");
          setShowToast(true);
        }
      });
    } catch (error) {}
    //CRITICAL: ADD Update Car API
  };

  return (
    <div className="Service-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Insurance Form</h2>
        <div>
          <label>License Plate</label>
          <input
            type="text"
            name="numberPlate"
            value={formData.numberPlate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Insurance</label>
          <input
            type="date" // Set the type to date
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cost</label>
          <input
            type="text"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            name="description"
            maxLength="250"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InsuranceDropdown;
