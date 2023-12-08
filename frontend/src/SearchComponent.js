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
import ToastComponent from "./ToastComponent";

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
      console.log(res, "res");

      if (res != {}) {
        let ownerHistory = res.data.getCarTransaction.ownerHistory;
        let lastOwner =
          ownerHistory.length > 0 ? ownerHistory[ownerHistory.length - 1] : "";
        res.data.getCarTransaction.currentOwner = lastOwner;
        console.log("added successfully ", res);
        navigate("/vehicleinfopage", {
          state: { carDetails: res.data.getCarTransaction },
        });
      } else {
        setToastMessage("No car found with the provided number plate.");
        setShowToast(true);
      }
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
      // var res = {
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
      if (Object.keys(res).length !== 0) {
        console.log("added successfully ", res);
        navigate("/vehicleinfopage", { state: { carDetails: res } });
      } else {
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

      <ToastComponent
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default SearchComponent;
