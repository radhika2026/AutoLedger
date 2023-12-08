import React, { useState } from "react";
import { Card, Form, Button, Modal, FormControl } from "react-bootstrap";
import { Input } from "reactstrap";

const InsuranceDropdown = () => {

  const [formData, setFormData] = useState({
    cost: "",
    date: "",
    description: "",
    numberPlate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var payload = {
      asset_type: "car",
      numberPlate: formData.numberPlate,
    };
    try {
      var newInsuranceObject = {};
      newServiceObject["date"] = formData.date;
      newServiceObject["cost"] = formData.cost;
      newServiceObject["description"] = formData.description;
      sendRequest(FETCH_CAR(payload.numberPlate)).then((res) => {
        if (res != {}) {
          // if (res.data.getCarTransaction.servicingHistory) {
          var insuranceHistory = res.data.getCarTransaction.insuranceHistory;
          insuranceHistory.push(newInsuranceObject);
          res.data.getCarTransaction.insuranceHistory = insuranceHistory;
          var payload = res.data.getCarTransaction;
          const timestamp = Date.now();
          payload.timestamp = timestamp,
          payload = JSON.stringify(payload)
          try {
            sendRequest(UPDATE_CAR(payload)).then((response) => {
              console.log("updated successfully");
            });
          } catch (error) {
            console.log("error");
          }
        } else {
          //TODO: pop up no car found
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
            pattern="[A-Za-z0-9]{6,8}"
            title="6 to 8 alphanumeric characters"
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
