import React, { useState } from "react";
import { sendRequest } from "./utils/resdbApi";
import { FETCH_CAR, UPDATE_CAR } from "./utils/resdb";

const ServiceCenterForm = () => {
  const [formData, setFormData] = useState({
    serviceCenter: "",
    serviceDate: "",
    serviceDescription: "",
    odometerReading: "",
  });

  // "servicingHistory": [
  //   {
  //     "serviceCenter": "AutoCare Service Center",
  //     "serviceDate": "01-09-2022",
  //     "serviceDescription": "Oil change, filter replacement"
  //   }
  // ]
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
      var newServiceObject = {};
      newServiceObject["serviceCenter"] = formData.serviceCenter;
      newServiceObject["serviceDate"] = formData.serviceDate;
      newServiceObject["serviceDescription"] = formData.serviceDescription;
      sendRequest(FETCH_CAR(payload.numberPlate)).then((res) => {
        if (res != {}) {
          // if (res.data.getCarTransaction.servicingHistory) {
          var servicingHistory = res.data.getCarTransaction.servicingHistory;
          servicingHistory.push(newServiceObject);
          res.data.getCarTransaction.servicingHistory = servicingHistory;
          res.data.getCarTransaction.odometerReading = formData.odometerReading;
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
        <h2>Service Center Form</h2>
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
          <label>Date of Service</label>
          <input
            type="date" // Set the type to date
            name="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Service Center Name</label>
          <input
            type="text"
            name="serviceCenter"
            value={formData.serviceCenter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Odometer Reading</label>
          <input
            type="number"
            name="odometerReading"
            value={formData.odometerReading}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            name="serviceDescription"
            maxLength="250"
            value={formData.serviceDescription}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ServiceCenterForm;
