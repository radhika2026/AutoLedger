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
    var numberPlate = searchTerm;

    try {
      sendRequest(FETCH_CAR(numberPlate)).then((res) => {
        if (Object.keys(res).length !== 0){
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
      });
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
