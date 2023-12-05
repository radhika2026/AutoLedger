import { Form, Button, FormControl } from "react-bootstrap";
import { Input } from "reactstrap";

const ModifyCarEntry = ({ carData, handleCarDataChange, handleSubmit }) => {
  return (
    <>
      <h4 className="mt-3">Modify Car Details</h4>

      {/* License Plate */}
      <Form.Group className="mb-3">
        <Form.Label>License Plate:</Form.Label>
        <Input
          type="text"
          name="numberPlate"
          value={carData.numberPlate}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Owner Name */}
      <Form.Group className="mb-3">
        <Form.Label>Owner Name:</Form.Label>
        <Input
          type="text"
          name="ownerName"
          value={carData.ownerName}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Driving License Number */}
      <Form.Group className="mb-3">
        <Form.Label>Driving License Number:</Form.Label>
        <Input
          type="text"
          name="drivingLicense"
          value={carData.drivingLicense}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Chasis Number */}
      <Form.Group className="mb-3">
        <Form.Label>Chasis Number:</Form.Label>
        <Input
          type="text"
          name="chassisNo"
          value={carData.chassisNo}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Engine Number */}
      <Form.Group className="mb-3">
        <Form.Label>Engine Number:</Form.Label>
        <Input
          type="text"
          name="engineNo"
          value={carData.engineNo}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Manufacturing Date */}
      <Form.Group className="mb-3">
        <Form.Label>Manufacturing Date:</Form.Label>
        <Input
          type="date"
          name="manufacturingDate"
          value={carData.manufacturingDate}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Odometer Reading */}
      <Form.Group className="mb-3">
        <Form.Label>Odometer Reading:</Form.Label>
        <Input
          type="number"
          name="odometerReading"
          value={carData.odometerReading}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Manufacturer */}
      <Form.Group className="mb-3">
        <Form.Label>Manufacturer:</Form.Label>
        <Input
          type="text"
          name="manufacturer"
          value={carData.manufacturer}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Car Features Section */}
      <h4>Car Features</h4>

      {/* Color */}
      <Form.Group controlId="color">
        <Form.Label>Color:</Form.Label>
        <Form.Control
          type="text"
          name="color"
          value={carData.color}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Seating Capacity */}
      <Form.Group controlId="seating">
        <Form.Label>Seating Capacity:</Form.Label>
        <Form.Control
          type="number"
          name="seating"
          value={carData.seating}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Transmission */}
      <Form.Group controlId="transmission">
        <Form.Label>Transmission:</Form.Label>
        <FormControl
          as="select"
          name="transmission"
          value={carData.transmission}
          onChange={handleCarDataChange}
        >
          <option value="">Select an option</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </FormControl>
      </Form.Group>

      {/* Wheel Base */}
      <Form.Group controlId="wheelBase">
        <Form.Label>Wheel Base (in meters):</Form.Label>
        <Form.Control
          type="number"
          name="wheelBase"
          step="0.01"
          value={carData.wheelBase}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Drive Type */}
      <Form.Group controlId="driveType">
        <Form.Label>Drive Type:</Form.Label>
        <FormControl
          as="select"
          name="driveType"
          value={carData.driveType}
          onChange={handleCarDataChange}
        >
          <option value="">Select an option</option>
          <option value="Front Wheel">Front Wheel</option>
          <option value="Rear Wheel">Rear Wheel</option>
          <option value="All Wheel">All Wheel</option>
        </FormControl>
      </Form.Group>

      {/* Ground Clearance */}
      <Form.Group controlId="groundClearance">
        <Form.Label>Ground Clearance (in meters):</Form.Label>
        <Form.Control
          type="number"
          name="groundClearance"
          step="0.01"
          value={carData.groundClearance}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Fuel Type */}
      <Form.Group controlId="fuel">
        <Form.Label>Fuel:</Form.Label>
        <FormControl
          as="select"
          name="fuel"
          value={carData.fuelType}
          onChange={handleCarDataChange}
        >
          <option value="">Select an option</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </FormControl>
      </Form.Group>

      {/* Car Class */}
      <Form.Group controlId="class">
        <Form.Label>Class:</Form.Label>
        <Form.Control
          type="text"
          name="class"
          value={carData.class}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Car Model */}
      <Form.Group controlId="model">
        <Form.Label>Model:</Form.Label>
        <Form.Control
          type="text"
          name="model"
          value={carData.model}
          onChange={handleCarDataChange}
        />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" onClick={handleSubmit}>
        Modify
      </Button>
    </>
  );
};

export default ModifyCarEntry;
