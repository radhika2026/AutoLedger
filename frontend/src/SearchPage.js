import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchComponent from './SearchComponent'; // Import Search component
import Cookies from 'js-cookie';

const isLoggedIn = Cookies.get('isLoggedIn');

function SearchPage() {
  if(isLoggedIn === true){
    return (
      <div className="HomeComponent-background">
        <div className="centered-form">
          <Container className="form-container">
            <h1 className="form-heading">Vehicle License Plate Search</h1>
            {/* Other form elements */}
          </Container>
        </div>
        <SearchComponent />
      </div>
  
    );
  }else{
    <>
    <h1>Permission Denied</h1>
    </>
  }
}

export default SearchPage;