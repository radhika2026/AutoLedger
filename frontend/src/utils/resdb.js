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

export const FETCH_TRANSACTION = (signerPublicKey, recipientPublicKey) => `query { 
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
export const FETCH_USER =(user) => `query { 
  getFilteredUserTransactions(
    user: "${user}"
  )   
  }`