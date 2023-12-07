import React, { useState } from 'react';
import { Card, Form, Button, Modal, FormControl } from 'react-bootstrap';
import { Input } from 'reactstrap';

const InsuranceDropdown = () => {
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

        // if (operation === 'Add insurance details') {
        //     // isValid = isValid && validateLicensePlate(carDetails.licensePlate);
        //     // isValid = isValid && validateOwnerName(carDetails.ownerName);
        //     // isValid = isValid && validateDrivingLicenseNumber(carDetails.drivingLicenseNumber);
        //     // isValid = isValid && validateChasisNumber(carDetails.chasisNumber);
        //     // isValid = isValid && validateEngineNumber(carDetails.engineNumber);
        //     // isValid = isValid && validateManufacturer(carDetails.manufacturer);

        //     // isValid = isValid && validateSeating(carFeatures.seating);
        //     // isValid = isValid && validateWheelBase(carFeatures.wheelBase);
        //     // isValid = isValid && validateGroundClearance(carFeatures.groundClearance);
        // } else if (operation === 'Search by Plate') {
        //     isValid = isValid && validateLicensePlate(carDetails.licensePlate);
        // }

        return isValid;
    };



    const handleNext = () => {
        if (!validateForm()) {
            alert('Invalid form data. Please check your inputs.');
            return;
        }

        if (operation === 'Add insurance details') {
            // Show the second section for car features
        } else if (operation === 'Search by Plate') {
            // Fetch car details and show the second section with prefilled data
        } else if (operation === 'Update insurance details') {
            // Fetch car details and show the second section with non-modifiable data
        }
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            alert('Invalid form data. Please check your inputs.');
            return;
        }

        if (operation === 'Add insurance details') {
            // Submit car details and car features
        } else if (operation === 'Search by Plate') {
            // Submit modified car details
        } else if (operation === 'Update insurance details') {
            // Perform delete operation
        }
    };

    const handleDeleteConfirmation = () => {
        // Perform delete operation and close the modal
        setShowDeleteConfirmationModal(false);
    };
    
    return (
        <div className="d-flex justify-content-center">
            <Card className="p-3" style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Title className="text-center">Insurance Services</Card.Title>
                    <Form className="p-3 border rounded">
                    <h3 className="text-center">Insurance Services</h3>
                    <Form.Group>
                        <Form.Label>Operation :</Form.Label>
                        <FormControl
                            as="select"
                            name="operation"
                            value={operation}
                            onChange={handleOperationChange}
                        >
                            <option value="">Select an operation</option>
                            <option value="Add insurance details">Add insurance details</option>
                            <option value="Search by Plate">Search by Plate</option>
                            <option value="Update insurance details">Update insurance details</option>
                        </FormControl>
                    </Form.Group>

                    {operation === 'Add insurance details' && (
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
                         
                            <Form.Group className="mb-3">
                                <Form.Label>Insurance Number:</Form.Label>
                                <Input type="text" name="drivingLicenseNumber" value={carDetails.drivingLicenseNumber} onChange={handleCarDetailsChange} />
                                {carDetails.drivingLicenseNumber.length < 8 || carDetails.drivingLicenseNumber.length > 10 ? (
                                    <Form.Text className="text-danger">Insurance number must be 8 to 10 characters long.</Form.Text>
                                ) : (
                                    <></>
                                )}
                            </Form.Group>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Incident</Form.Label>
                                <Input type="text" name="ownerName" value={carDetails.ownerName} onChange={handleCarDetailsChange} />
                              
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Damage</Form.Label>
                                <Input type="text" name="ownerName" value={carDetails.ownerName} onChange={handleCarDetailsChange} />
                              
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Service Centre id:</Form.Label>
                                <Input type="text" name="chasisNumber" value={carDetails.chasisNumber} onChange={handleCarDetailsChange} />
                            
                            </Form.Group>

        

                            <Form.Group className="mb-3">
                                <Form.Label> Date:</Form.Label>
                                <Input type="date" name="manufacturingDate" value={carDetails.manufacturingDate} onChange={handleCarDetailsChange} />
                            </Form.Group>




                            {/* <Button variant="primary" onClick={handleNext}>Next</Button> */}

                            <Button variant="primary" onClick={handleSubmit}>Submit</Button>

                        </>
                    )}

                    {operation === 'Search by Plate' && (
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

                    {operation === 'Update insurance details' && (
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

                    {operation === 'Search by Plate' && carDetails.licensePlate && (
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

                    {operation === 'Update insurance details' && carDetails.licensePlate && (
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

                </Card.Body>
            </Card>
        </div>
    );
};

export default InsuranceDropdown;