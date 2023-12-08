import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import CreateCarEntry from "./CreateCarEntry";
import ModifyCarEntry from "./ModifyCarEntry";
import { sendRequest } from "./utils/resdbApi";
import { FETCH_CAR, POST_TRANSACTION, UPDATE_CAR } from "./utils/resdb";
import ToastComponent from "./ToastComponent";

const metadata = {
  signerPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
  signerPrivateKey: "2QdMTdaNj8mJjduXFAsHieVmcsBcqeWQyW9v891kZEXC",
  recipientPublicKey: "HvNRQznqrRdCwSKn6R8ZoQE4U3aobQShajK1NShQhGRn",
};

const DMV = () => {
  const [operation, setOperation] = useState("");
  const [carData, setCarData] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [searchedData, setSearchedData] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleOperationChange = (event) => {
    setOperation(event.target.value);
    setIsDataLoaded(false);
    setCarData({});
  };

  const handleCarDataChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearchDataChange = (event) => {
    const { name, value } = event.target;
    setSearchedData(value);
  };

  const handleFetch = (event) => {
    try {
      // const response = {
      //   chasisNumber: "12345678123456781",
      //   class: "Z",
      //   color: "12345678vj",
      //   driveType: "Front Wheel",
      //   drivingLicenseNumber: " 12345678",
      //   engineNumber: "1234567812345678",
      //   fuel: "Diesel",
      //   groundClearance: "-0.01",
      //   licensePlate: "12345678",
      //   manufacturer: "df",
      //   manufacturingDate: "2023-12-09",
      //   model: "rfg",
      //   odometerReading: "1",
      //   ownerName: "12345678",
      //   seating: "5",
      //   transmission: "Automatic",
      //   wheelBase: "0.98",
      // };
      sendRequest(FETCH_CAR(searchedData)).then((res) => {
        if (res != {}) {
          //TODO: REDIRECT TO VEHICLE INFO PAGE
          setCarData(res.data.getCarTransaction);
          setIsDataLoaded(true);
        } else {
          setToastMessage("Car Not Found");
          setShowToast(true);
        }
      });      
    } catch (error) {
      setToastMessage("Error! Check Entries!");
      setShowToast(true);
      setIsDataLoaded(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: Validate Form logic(Aakash)
    const timestamp = Date.now();
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    var dataWithTimestamp = {
      ...carData,
      timestamp: timestamp,
      asset_type: "car",
    };

    var ownerMap = {};
    ownerMap.ownerName = carData.ownerName;
    ownerMap.ownershipStartDate = formattedDate;
    ownerMap.ownershipEndDate = "";

    if (operation === "CreateCarEntry") {
      var ownerList = [];
      ownerList.push(ownerMap);
      dataWithTimestamp = {
        ...dataWithTimestamp,
        ownerHistory: ownerList,
      };
      const payload = JSON.stringify(dataWithTimestamp);
      try {
        sendRequest(POST_TRANSACTION(metadata, payload)).then((res) => {
          //TODO: add alert to show successly added user and redirect to login page
          console.log("added successfully ", res);
        });
      } catch (error) {
        //TODO: Internal server error toast/alert
      }
    }

    if (operation === "ModifyCarEntry") {
      var ownerList = dataWithTimestamp.ownerHistory;
      var current_owner = ownerList[ownerList.length - 1];
      if (current_owner?.ownerName != ownerMap?.ownerName) {
        ownerList.push(ownerMap);
      }
      dataWithTimestamp = {
        ...dataWithTimestamp,
        ownerHistory: ownerList,
      };
      const payload = JSON.stringify(dataWithTimestamp);
      console.log("payload", payload);
      try {
        sendRequest(UPDATE_CAR(metadata, payload)).then((res) => {
          //the res has all the updated car information.
          //TODO: add alert to show successly added user and redirect to login page
          console.log("added successfully ", res);
        });
      } catch (error) {
        //TODO: Internal server error toast/alert
      }
    }
  };

  return (
    <>
      <Card className="dmv-form-card p-3">
        <div className="d-flex justify-content-center">
          <Card style={{ width: "50rem" }} className="p-3">
            <Card.Body>
              <Card.Title className="text-center">DMV Services</Card.Title>
              <Form className="p-3 border rounded">
                <Form.Group>
                  <Form.Label>Operation you need to perform (DMV):</Form.Label>
                  <FormControl
                    as="select"
                    name="operation"
                    value={operation}
                    onChange={handleOperationChange}
                  >
                    <option value="">Select an operation</option>
                    <option value="CreateCarEntry">
                      Create a new car entry
                    </option>
                    <option value="ModifyCarEntry">
                      Modify existing car entries
                    </option>
                  </FormControl>
                </Form.Group>

                {operation === "CreateCarEntry" && (
                  <CreateCarEntry
                    carData={carData}
                    handleCarDataChange={handleCarDataChange}
                    handleSubmit={handleSubmit}
                  />
                )}

                {operation === "ModifyCarEntry" && (
                  <ModifyCarEntry
                    carData={carData}
                    handleCarDataChange={handleCarDataChange}
                    handleSubmit={handleSubmit}
                    handleFetch={handleFetch}
                    isDataLoaded={isDataLoaded}
                    searchedData={searchedData}
                    handleSearchDataChange={handleSearchDataChange}
                  />
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Card>
      <ToastComponent
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default DMV;
