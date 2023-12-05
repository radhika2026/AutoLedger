import React, { useState } from "react";

const ServiceCenterForm = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    odometerReading: "",
    numberPlate: "",
    serviceCenterId: "",
    mechanicName: "",
    mechanicId: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const validateEmail = (email) => {
  //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
  //     return re.test(String(email).toLowerCase());
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();

    const timestamp = Date.now();
    const dataWithTimestamp = {
      ...formData,
      timestamp: timestamp,
    };

    const payload = JSON.stringify(dataWithTimestamp);
    console.log(payload);
    //CRITICAL: ADD Update Car API
  };

  return (
    <div className="Service-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Service Center Form</h2>
        <div>
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Owner Email</label>
          <input
            type="email"
            name="ownerEmail"
            value={formData.ownerEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Make</label>
          <input
            type="text"
            name="vehicleMake"
            value={formData.vehicleMake}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Vehicle Model</label>
          <input
            type="text"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Vehicle Year</label>
          <input
            type="number"
            name="vehicleYear"
            value={formData.vehicleYear}
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
