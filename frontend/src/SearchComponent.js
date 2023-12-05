import React, { useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { sendRequest } from './utils/resdbApi';
import { FETCH_CAR } from './utils/resdb';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submit action
    var payload = {
      "asset_type": "car",
      "numberPlate": searchTerm
    }
    try {
      sendRequest(
        FETCH_CAR(payload)
      ).then((res) => {
        if(res != {}){
          let ownerHistory = response.data.getCarTransaction.owner_history;
          let lastOwner = ownerHistory[ownerHistory.length - 1];
          res.currentOwner = lastOwner;
          //TODO: REDIRECT TO VEHICLE INFO PAGE
        console.log("added successfully ", res);
        }
        else{
          //TODO: pop up no car found
        }
      });
    } catch (error) {
      console.error('Error fetching data: ', error);
        //TODO: Handle the error as needed
    }
  };

  return (
    <Form className="inline-form" onSubmit={handleSubmit}>
      <FormControl 
        type="text" 
        placeholder="Search" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-success" type="submit">Search</Button>
    </Form>
  );
};

export default SearchComponent;
