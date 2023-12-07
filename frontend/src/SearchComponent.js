import React, { useState } from "react";
import {
  Form,
  Button,
  FormControl,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { sendRequest } from "./utils/resdbApi";
import { FETCH_CAR } from "./utils/resdb";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submit action
    var payload = {
      asset_type: "car",
      numberPlate: searchTerm,
    };
    try {
      // sendRequest(FETCH_CAR(payload)).then((res) => {
      //   if (res != {}) {
      //     let ownerHistory = res.data.getCarTransaction.owner_history;
      //     let lastOwner = ownerHistory[ownerHistory.length - 1];
      //     res.currentOwner = lastOwner;
      //     console.log("added successfully ", res);
      //     navigate("/vehicleinfopage", { state: { carDetails: res } });
      //   } else {
      //     setToastMessage("No car found with the provided number plate.");
      //     setShowToast(true);
      //   }
      // });
      var res = {
        chasisNumber: "12345678123456781",
        class: "Z",
        color: "12345678vj",
        driveType: "Front Wheel",
        drivingLicenseNumber: " 12345678",
        engineNumber: "1234567812345678",
        fuel: "Diesel",
        groundClearance: "-0.01",
        licensePlate: "12345678",
        manufacturer: "df",
        manufacturingDate: "2023-12-09",
        model: "rfg",
        odometerReading: "1",
        ownerName: "12345678",
        seating: "5",
        transmission: "Automatic",
        wheelBase: "0.98",
      };
      console.log("res", res);
      if (Object.keys(res).length !== 0) {
        // let ownerHistory = res.data.getCarTransaction.ownerHistory;
        // let lastOwner = ownerHistory[ownerHistory.length - 1];
        // res.currentOwner = lastOwner;
        console.log("added successfully ", res);
        navigate("/vehicleinfopage", { state: { carDetails: res } });
      } else {;
        setToastMessage("No car found with the provided number plate.");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setToastMessage("Error fetching data. Please try again.");
      setShowToast(true);
    }
  };

  return (
    <>
      <Form className="inline-form" onSubmit={handleSubmit}>
        <FormControl
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="glow-on-hover" type="submit">
          Search
        </Button>
      </Form>

      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="light"
          className="d-inline-block m-1 text-dark"
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default SearchComponent;
