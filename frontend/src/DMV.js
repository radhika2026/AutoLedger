import React, { useState } from 'react';
import { Form, Button, Modal, FormControl } from 'react-bootstrap';
import { Input } from 'reactstrap';

const DMV = () => {
    const [operation, setOperation] = useState('');
    const [carDetails, setCarDetails] = useState({
        licensePlate: '',
        drivingLicenseNumber: ' ',
        ownerName: '',
        chasisNumber: '',
        engineNumber: '',
        manufacturingDate: '',
        odometerReading: 0,
        manufacturer: '',
    });
    const [carFeatures, setCarFeatures] = useState({
        color: '',
        seating: 0,
        transmission: '',
        wheelBase: 0.0,
        driveType: '',
        groundClearance: 0,
        fuel: '',
        class: '',
        model: '',
    });
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

    const handleOperationChange = (event) => {
        setOperation(event.target.value);
    };

    const handleCarDetailsChange = (event) => {
        const { name, value } = event.target;
        setCarDetails((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCarFeaturesChange = (event) => {
        const { name, value } = event.target;
        setCarFeatures((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateLicensePlate = (licensePlate) => {
        const regex = /^[a-zA-Z0-9]{6,8}$/;
        return regex.test(licensePlate);
    };
    const validateOwnerName = (ownerName) => {
        const regex = /^[a-zA-Z]{1,25}$/;
        return regex.test(ownerName);
    };

    const validateDrivingLicenseNumber = (drivingLicenseNumber) => {
        const regex = /^[a-zA-Z0-9]{8,10}$/;
        return regex.test(drivingLicenseNumber);
    };
    const validateChasisNumber = (chasisNumber) => {
        const regex = /^[a-zA-Z0-9]{17}$/;
        return regex.test(chasisNumber);
    };

    const validateEngineNumber = (engineNumber) => {
        const regex = /^[a-zA-Z0-9]{11,17}$/;
        return regex.test(engineNumber);
    };
    const validateManufacturer = (manufacturer) => {
        const regex = /^[a-zA-Z]{1,25}$/;
        return regex.test(manufacturer);
    };

    const validateSeating = (seating) => {
        if (!Number.isInteger(parseInt(seating))) {
            return false;
        }

        return parseInt(seating) >= 1;
    };

    const validateWheelBase = (wheelBase) => {
        if (!Number.isFinite(parseFloat(wheelBase)) || isNaN(wheelBase)) {
            return false;
        }

        return parseFloat(wheelBase) > 0;
    };

    const validateGroundClearance = (groundClearance) => {
        if (!Number.isFinite(parseFloat(groundClearance)) || isNaN(groundClearance)) {
            return false;
        }

        return parseFloat(groundClearance) >= 0;
    };

    const validateForm = () => {
        let isValid = true;

        // if (operation === 'Create a new entry for the car') {
        //     // isValid = isValid && validateLicensePlate(carDetails.licensePlate);
        //     // isValid = isValid && validateOwnerName(carDetails.ownerName);
        //     // isValid = isValid && validateDrivingLicenseNumber(carDetails.drivingLicenseNumber);
        //     // isValid = isValid && validateChasisNumber(carDetails.chasisNumber);
        //     // isValid = isValid && validateEngineNumber(carDetails.engineNumber);
        //     // isValid = isValid && validateManufacturer(carDetails.manufacturer);

        //     // isValid = isValid && validateSeating(carFeatures.seating);
        //     // isValid = isValid && validateWheelBase(carFeatures.wheelBase);
        //     // isValid = isValid && validateGroundClearance(carFeatures.groundClearance);
        // } else if (operation === 'Modify the existing car entries') {
        //     isValid = isValid && validateLicensePlate(carDetails.licensePlate);
        // }

        return isValid;
    };



    const handleNext = () => {
        if (!validateForm()) {
            alert('Invalid form data. Please check your inputs.');
            return;
        }

        if (operation === 'Create a new entry for the car') {
            // Show the second section for car features
        } else if (operation === 'Modify the existing car entries') {
            // Fetch car details and show the second section with prefilled data
        } else if (operation === 'Delete a car entry') {
            // Fetch car details and show the second section with non-modifiable data
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            alert('Invalid form data. Please check your inputs.');
            return;
        }

        if (operation === 'Create a new entry for the car') {
            // Submit car details and car features
        } else if (operation === 'Modify the existing car entries') {
            // Submit modified car details
        } else if (operation === 'Delete a car entry') {
            // Perform delete operation
        }
    };

    const handleDeleteConfirmation = () => {
        // Perform delete operation and close the modal
        setShowDeleteConfirmationModal(false);
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <Form className="p-3 border rounded">
                    <h3 className="text-center">DMV Services</h3>
                    <Form.Group>
                        <Form.Label>Operation you need to perform (DMV):</Form.Label>
                        <FormControl
                            as="select"
                            name="operation"
                            value={operation}
                            onChange={handleOperationChange}
                        >
                            <option value="">Select an operation</option>
                            <option value="Create a new entry for the car">Create a new car entry</option>
                            <option value="Modify the existing car entries">Modify existing car entries</option>
                            <option value="Delete a car entry">Delete a car entry</option>
                        </FormControl>
                    </Form.Group>

                    {operation === 'Create a new entry for the car' && (
                        <>
                            <h4 className="mt-3">Car Details</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>License Plate:</Form.Label>
                                <Input type="text" name="licensePlate" value={carDetails.licensePlate} onChange={handleCarDetailsChange} />
                                {carDetails.licensePlate.length < 6 || carDetails.licensePlate.length > 8 ? (
                                    <Form.Text className="text-danger">License plate must be 6 to 8 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Owner Name:</Form.Label>
                                <Input type="text" name="ownerName" value={carDetails.ownerName} onChange={handleCarDetailsChange} />
                                {carDetails.ownerName.length > 25 ? (
                                    <Form.Text className="text-danger">Owner name cannot exceed 25 characters.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Driving License Number:</Form.Label>
                                <Input type="text" name="drivingLicenseNumber" value={carDetails.drivingLicenseNumber} onChange={handleCarDetailsChange} />
                                {carDetails.drivingLicenseNumber.length < 8 || carDetails.drivingLicenseNumber.length > 10 ? (
                                    <Form.Text className="text-danger">Driving license number must be 8 to 10 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Chasis Number:</Form.Label>
                                <Input type="text" name="chasisNumber" value={carDetails.chasisNumber} onChange={handleCarDetailsChange} />
                                {carDetails.chasisNumber.length !== 17 ? (
                                    <Form.Text className="text-danger">Chassis number must be 17 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Engine Number:</Form.Label>
                                <Input type="text" name="engineNumber" value={carDetails.engineNumber} onChange={handleCarDetailsChange} />
                                {carDetails.engineNumber.length < 11 || carDetails.engineNumber.length > 17 ? (
                                    <Form.Text className="text-danger">Engine number must be 11 to 17 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Manufacturing Date:</Form.Label>
                                <Input type="date" name="manufacturingDate" value={carDetails.manufacturingDate} onChange={handleCarDetailsChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Odometer Reading:</Form.Label>
                                <Input type="number" name="odometerReading" value={carDetails.odometerReading} onChange={handleCarDetailsChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Manufacturer:</Form.Label>
                                <Input type="text" name="manufacturer" value={carDetails.manufacturer} onChange={handleCarDetailsChange} required />
                                {carDetails.manufacturer.length > 25 ? (
                                    <Form.Text className="text-danger">Manufacturer name cannot exceed 25 characters.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            {/* <Button variant="primary" onClick={handleNext}>Next</Button> */}
                            <h2>Car Features</h2>

                            <Form.Group controlId="color">
                                <Form.Label>Color:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="color"
                                    value={carFeatures.color}
                                    onChange={handleCarFeaturesChange}
                                />
                                {carFeatures.color.length > 25 ? (
                                    <Form.Text className="text-danger">Color name cannot exceed 25 characters.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            <Form.Group controlId="seating">
                                <Form.Label>Seating Capacity:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="seating"
                                    value={carFeatures.seating}
                                    onChange={handleCarFeaturesChange}
                                />
                            </Form.Group>


                            <Form.Group controlId="transmission">
                                <Form.Label>Transmission:</Form.Label>
                                <FormControl
                                    as="select"
                                    name="transmission"
                                    value={carFeatures.transmission}
                                    onChange={handleCarFeaturesChange}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </FormControl>
                            </Form.Group>



                            <Form.Group controlId="wheelBase">
                                <Form.Label>Wheel Base (in meters):</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="wheelBase"
                                    step="0.01"
                                    value={carFeatures.wheelBase}
                                    onChange={handleCarFeaturesChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="driveType">
                                <Form.Label>Drive Type:</Form.Label>
                                <FormControl
                                    as="select"
                                    name="driveType"
                                    value={carFeatures.driveType}
                                    onChange={handleCarFeaturesChange}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Front Wheel">Front Wheel</option>
                                    <option value="Rear Wheel">Rear Wheel</option>
                                    <option value="Four Wheel">Four Wheel</option>
                                </FormControl>
                            </Form.Group>

                            <Form.Group controlId="groundClearance">
                                <Form.Label>Ground Clearance (in meters):</Form.Label>
                                <Form.Control type="number"
                                    name="groundClearance"
                                    step="0.01"
                                    value={carFeatures.groundClearance}
                                    onChange={handleCarFeaturesChange}
                                />
                            </Form.Group>


                            <Form.Group controlId="fuel">
                                <Form.Label>Fuel:</Form.Label>
                                <FormControl
                                    as="select"
                                    name="fuel"
                                    value={carFeatures.fuel}
                                    onChange={handleCarFeaturesChange}
                                >
                                    <option value="">Select an option</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                </FormControl>
                            </Form.Group>

                            <Form.Group controlId="class">
                                <Form.Label>Class:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="class"
                                    value={carFeatures.class}
                                    onChange={handleCarFeaturesChange}
                                />

                                {carFeatures.class.length > 25 ? (
                                    <Form.Text className="text-danger">Class name cannot exceed 25 characters.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            <Form.Group controlId="model">
                                <Form.Label>Model:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="model"
                                    value={carFeatures.model}
                                    onChange={handleCarFeaturesChange}
                                />
                                {carFeatures.model.length > 25 ? (
                                    <Form.Text className="text-danger">Model name cannot exceed 25 characters.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmit}>Submit</Button>

                        </>
                    )}

                    {operation === 'Modify the existing car entries' && (
                        <>
                            <h4 className="mt-3">Car License Plate</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>License Plate:</Form.Label>
                                <Input type="text" name="licensePlate" value={carDetails.licensePlate} onChange={handleCarDetailsChange} />
                                {carDetails.licensePlate.length < 6 || carDetails.licensePlate.length > 8 ? (
                                    <Form.Text className="text-danger">License plate must be 6 to 8 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            <Button variant="primary" onClick={handleNext}>Fetch</Button>
                        </>
                    )}

                    {operation === 'Delete a car entry' && (
                        <>
                            <h4 className="mt-3">Car License Plate</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>License Plate:</Form.Label>
                                <Input type="text" name="licensePlate" value={carDetails.licensePlate} onChange={handleCarDetailsChange} />
                                {carDetails.licensePlate.length < 6 || carDetails.licensePlate.length > 8 ? (
                                    <Form.Text className="text-danger">License plate must be 6 to 8 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            <Button variant="primary" onClick={handleNext}>Fetch</Button>
                        </>
                    )}

                    {operation === 'Modify the existing car entries' && carDetails.licensePlate && (
                        <>
                            <h4 className="mt-3">Car Details</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>License Plate:</Form.Label>
                                <Input type="text" name="licensePlate" value={carDetails.licensePlate} onChange={handleCarDetailsChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Owner Name:</Form.Label>
                                <Input type="text" name="ownerName" value={carDetails.ownerName} onChange={handleCarDetailsChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Driving License Number:</Form.Label>
                                <Input type="text" name="drivingLicenseNumber" value={carDetails.drivingLicenseNumber} onChange={handleCarDetailsChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Odometer Reading:</Form.Label>
                                <Input type="number" name="odometerReading" value={carDetails.odometerReading} onChange={handleCarDetailsChange} />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit}>Modify</Button>
                        </>
                    )}

                    {operation === 'Delete a car entry' && carDetails.licensePlate && (
                        <>
                            <h4 className="mt-3">Car Details</h4>
                            <Form.Group className="mb-3">
                                <Form.Label>License Plate:</Form.Label>
                                <Input type="text" name="licensePlate" value={carDetails.licensePlate} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Owner Name:</Form.Label>
                                <Input type="text" name="ownerName" value={carDetails.ownerName} readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Driving License Number:</Form.Label>
                                <Input type="text" name="drivingLicenseNumber" value={carDetails.drivingLicenseNumber} readOnly />
                            </Form.Group>

                            <Button variant="primary" onClick={() => setShowDeleteConfirmationModal(true)}>Delete</Button>

                            <Modal show={showDeleteConfirmationModal} onHide={() => setShowDeleteConfirmationModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete the car with license plate {carDetails.licensePlate}?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
                                    <Button variant="primary" onClick={handleDeleteConfirmation}>Delete</Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
};

export default DMV;



