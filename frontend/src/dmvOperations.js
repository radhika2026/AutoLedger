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
var ownershipLenght = 0;

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
    console.log("name", name, value, carData);
    if (name === "ownerName") {
      setCarData((p) => {
        if ("ownerHistory" in p) {
          if (ownershipLenght == p.ownerHistory.length) {
            const updatedOwnership = [
              ...p.ownerHistory,
              {
                ownerName: value,
                ownershipEndDate: "",
                ownershipStartDate: new Date().toLocaleDateString(),
              },
            ];
            return { ...p, ownerHistory: updatedOwnership };
          } else {
            const updatedOwnership = [...p.ownerHistory];
            const updatedNode = {
              ...updatedOwnership[updatedOwnership.length - 1],
            };
            updatedNode.ownerName = value;
            updatedOwnership[updatedOwnership.length - 1] = updatedNode;
            return { ...p, ownerHistory: updatedOwnership };
          }
        }
      });
    }
    setCarData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearchDataChange = (event) => {
    const { name, value } = event.target;
    setSearchedData(value);
  };

  const handleFetch = (event) => {
    try {
      var res = {
        data: {
          getCarTransaction: {
            chassisNo: "CH5453",
            engineNo: "EN134F",
            manufacturer: "BMW",
            manufacturingDate: "2023-12-01",
            numberPlate: "LICA123",
            registerDate: "",
            ownerHistory: [
              {
                ownerName: "Batman",
                ownershipStartDate: "2023-12-06",
                ownershipEndDate: "",
              },
            ],
            drivingLicense: "DL5432",
            color: "black",
            seating: "2",
            transmission: "Automatic",
            wheelBase: "1.2",
            groundClearance: "0.5",
            driveType: "Front Wheel",
            fuelType: "Petrol",
            carClass: "ACNS",
            model: "SDA",
            insuranceNo: "",
            insuranceProvider: "",
            policyEndDate: "",
            insuranceHistory: [
              {
                cost: "100",
                date: "today",
                description: "Accident",
              },
              {
                cost: "150",
                date: "yesterday",
                description: "Accident",
              },
            ],
            mileage: "",
            odometerReading: "12344",
            servicingHistory: [
              {
                serviceCenter: "AutoCaring Service Center",
                serviceDate: "01-09-2023",
                serviceDescription: "Oil change, filter replacement",
              },
              {
                serviceCenter: "AutoCare Service Center",
                serviceDate: "11-02-2022",
                serviceDescription: "Oil change, filter replacement",
              },
            ],
            ownerHistory: [
              {
                ownerName: "John Doe",
                ownershipStartDate: "12-01-2021",
                ownershipEndDate: "CA", // State in which it was registered
              },
              {
                ownerName: "Radhika",
                ownershipStartDate: "12-01-2021",
                ownershipEndDate: "CA", // State in which it was registe
              },
            ],
          },
        },
      };

      sendRequest(FETCH_CAR(searchedData)).then((res) => {
        if (res != {}) {
          //TODO: REDIRECT TO VEHICLE INFO PAGE
          ownershipLenght = res.data.getCarTransaction.ownerHistory.length;
          setCarData(res.data.getCarTransaction);
          setIsDataLoaded(true);
        } else {
          setToastMessage("Car Not Found");
          setShowToast(true);
        }
        setShowToast(true);
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
    ownerMap.ownerName = dataWithTimestamp.ownerName;
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
      // var ownerList = dataWithTimestamp.ownerHistory;
      // var current_owner = ownerList[ownerList.length - 1];
      // if (current_owner?.ownerName != ownerMap?.ownerName) {
      //   ownerList.push(ownerMap);
      // }
      // dataWithTimestamp = {
      //   ...dataWithTimestamp,
      //   ownerHistory: ownerList,
      // };
      if ("ownerName" in dataWithTimestamp) {
        delete dataWithTimestamp.ownerName;
      }
      console.log("dataWithTimestamp", dataWithTimestamp);
      const payload = JSON.stringify(dataWithTimestamp);
      console.log("payload", payload);
      try {
        sendRequest(UPDATE_CAR(metadata, payload)).then((res) => {
          //TODO: add alert to show successly added user and redirect to login page
          console.log("added successfully Updated", res);
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
