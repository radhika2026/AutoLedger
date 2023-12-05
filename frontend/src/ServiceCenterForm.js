import React, { useState } from "react";
import { sendRequest } from "./utils/resdbApi";
import { FETCH_CAR, UPDATE_CAR } from "./utils/resdb";

const ServiceCenterForm = () => {
  const [formData, setFormData] = useState({
    odometerReading: "",
    numberPlate: "",
    serviceCenterId: "",
    mechanicName: "",
    mechanicId: "",
    notes: "",
    dateOfService: "",
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
    try{sendRequest(FETCH_CAR(payload)).then((res) => {
      if (res != {}) {
        if (res.data.getCarTransaction.servicingHistory) {
          var servicingHistory = res.data.getCarTransaction.servicingHistory;
          servicingHistory.push(formData);
          res.data.getCarTransaction.servicingHistory = servicingHistory;
        }
        if (
          formData?.odometerReading !=
          res.data.getCarTransaction.odometerReading
        ) {
          res.data.getCarTransaction.odometerReading = formData.odometerReading;
        }
        try {
          sendRequest(UPDATE_CAR(res)).then((response) => {
            console.log("updated successfully");
          });
        } catch (error) {
          console.log("error");
        }
      } else {
        //TODO: pop up no car found
      }
      
    });
  }
  catch(error){

  }
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
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Service Center ID</label>
          <input
            type="number"
            name="serviceCenterId"
            value={formData.serviceCenterId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mechanic Name</label>
          <input
            type="text"
            name="mechanicName"
            value={formData.mechanicName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mechanic ID</label>
          <input
            type="number"
            name="mechanicId"
            value={formData.mechanicId}
            onChange={handleChange}
          />
        </div>
        <div>
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
            name="notes"
            maxLength="250"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ServiceCenterForm;
