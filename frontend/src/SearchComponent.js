import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

const SearchComponent = () => {
  return (
    // Add the inline-form class to the Form component
    <Form className="inline-form">
      <FormControl type="text" placeholder="Search" />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default SearchComponent;