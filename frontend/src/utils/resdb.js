export const GENERATE_KEYS = `
mutation{
    generateKeys{
      publicKey,
      privateKey
    }
  }
`;

export const POST_TRANSACTION = (metadata, asset) => `mutation {
  postTransaction(data: {
  operation: "CREATE",
  amount: 100,
  signerPublicKey: "${metadata?.signerPublicKey}",
  signerPrivateKey: "${metadata?.signerPrivateKey}",
  recipientPublicKey: "${metadata?.recipientPublicKey}",
  asset: """{
    "data": ${asset},    
  }
  """
  }){
  id
  }
}`;

export const FETCH_TRANSACTION = (
  signerPublicKey,
  recipientPublicKey
) => `query { 
  getFilteredTransactions(filter: {
  ownerPublicKey:"${signerPublicKey}"
  recipientPublicKey:"${recipientPublicKey}"
  }){
  asset
  }
}`;

export const FETCH_PRODUCT = (product) => `query { 
  getFilteredProductTransactions(filter: {
		product: "${product}"
  }){
    asset
  }
}`;

//Fetch user for login
export const FETCH_USER = (email, password) => `query { 
  getUserTransaction(user: {
    userEmail: "${email}",
    userPwd: "${password}"
  }) 
  { userName userRole idNo email password drivingLicense } }

`;

//Fetch Car Details
export const FETCH_CAR = (searchedData) =>
  `query { getCarTransaction(car: { 
    numberPlate: "${searchedData}" }) 
  { chassisNo
   engineNo 
   manufacturer
  manufacturingDate 
  numberPlate 
  registerDate 
  ownerHistory { 
          ownerName 
          ownershipStartDate 
          ownershipEndDate 
  } 
  drivingLicense 
  color 
  seating 
  transmission 
  wheelBase 
  groundClearance 
  driveType 
  fuelType 
  carClass 
  model 
  insuranceNo 
  insuranceProvider 
  policyEndDate 
  insuranceHistory 
  { date cost description } 
  mileage odometerReading 
  servicingHistory { serviceCenter serviceDate serviceDescription } } }`;

//Update Car Details
export const UPDATE_CAR = (metadata, car) => `mutation {
  updateCarTransaction(data: {
    operation: "CREATE",
    amount: 100,
    signerPublicKey: "${metadata?.signerPublicKey}",
    signerPrivateKey: "${metadata?.signerPrivateKey}",
    recipientPublicKey: "${metadata?.recipientPublicKey}",
    asset: """{
      "data": ${car},    
    }
    """
    })
    { chassisNo
      engineNo 
      manufacturer
     manufacturingDate 
     numberPlate 
     registerDate 
     ownerHistory { 
             ownerName 
             ownershipStartDate 
             ownershipEndDate 
     } 
     drivingLicense 
     color 
     seating 
     transmission 
     wheelBase 
     groundClearance 
     driveType 
     fuelType 
     carClass 
     model 
     insuranceNo 
     insuranceProvider 
     policyEndDate 
     insuranceHistory 
     { date cost description } 
     mileage odometerReading 
     servicingHistory { serviceCenter serviceDate serviceDescription } }
}`;
