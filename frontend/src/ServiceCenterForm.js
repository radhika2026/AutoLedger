import React, { useState } from "react";
import { sendRequest } from "./utils/resdbApi";
import { FETCH_CAR, UPDATE_CAR } from "./utils/resdb";
import Cookies from "js-cookie";

const metadata = {
  signerPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
  signerPrivateKey: "2QdMTdaNj8mJjduXFAsHieVmcsBcqeWQyW9v891kZEXC",
  recipientPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
};
const userRole = Cookies.get('userRole')
const ServiceCenterForm = () => {
  const [formData, setFormData] = useState({
    serviceCenter: "",
    serviceDate: "",
    serviceDescription: "",
    odometerReading: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var numberPlate = formData.numberPlate;
    try {
      var newServiceObject = {};
      newServiceObject["serviceCenter"] = formData.serviceCenter;
      newServiceObject["serviceDate"] = formData.serviceDate;
      newServiceObject["serviceDescription"] = formData.serviceDescription;
      sendRequest(FETCH_CAR(numberPlate)).then((res) => {
        if (res != {}) {
          console.log("fetch res", res);
          // if (res.data.getCarTransaction.servicingHistory) {
          var servicingHistory = res.data.getCarTransaction.servicingHistory;
          servicingHistory.push(newServiceObject);
          res.data.getCarTransaction.servicingHistory = servicingHistory;
          res.data.getCarTransaction.odometerReading = formData.odometerReading;
          var payload = res.data.getCarTransaction;
          const timestamp = Date.now();
          payload.timestamp = timestamp;
          payload.asset_type = "car";
          payload = JSON.stringify(payload);
          try {
            sendRequest(UPDATE_CAR(metadata, payload)).then((response) => {
              console.log("updated successfully", response);
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
  if (userRole === "Insurance"){
    return (
      <div className="Service-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Service Center Form</h2>
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
    )
  }else{
    <>
    <h1>Permission Denied</h1>
    </>
  }
};

export default ServiceCenterForm;
