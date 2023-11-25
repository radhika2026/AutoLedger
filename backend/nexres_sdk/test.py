from resdb_driver import Resdb
from resdb_driver.crypto import generate_keypair
from fastapi import FastAPI, Path

app = FastAPI()

@app.get("/")
def home():
    return {"Data" : "Testing"}

# Front: ReactJS
# Backend: FastAPI
# Sec DB: MongoDB

# # Advantages:
# New Powerful Better
# Hot reload
# Auto documentation API endpoints
# Autocompletion and code suggetion: ease fo development for new members
# less data validation : info sent to API is automatically checked for datatypes. We define expected value.
# automatic JSONify the python types
# ASGI Server : Do not need to use async io in python and very fast in deploymrnt because of concurrency. Eliminates Express.

# @app.get("/view_nft/{nft_id}")
# def create_nft(nft_id: int):
#     return nft_dict[nft_id]

# nft_dict = {
#     1: {
#         "name" : "KokoMonkey",
#         "price" : 100,
#         "Currency" : "BTC",
#         "Author": "Luffy",
#         "Producer" : "OnePiece",
#     }
# }


@app.get("/about")
def about():
    return "NFT-Marketplace Under Construction"

@app.get("/view_nft/{nft_id}")
def view_nft(nft_id: int = Path(None, description="Please enter the ID of item you like to view")):
    return nft_dict[nft_id]

nft_dict = {
    1: {
        "name" : "KokoMonkey",
        "price" : 100,
        "Currency" : "BTC",
        "Author": "Luffy",
        "Producer" : "OnePiece",
    }
}

@app.get("/create_NFT")
def create_nft():

    db_root_url = "http://0.0.0.0:18000"
    db = Resdb(db_root_url)
    kaustubh, honey = generate_keypair(), generate_keypair()

    # create a digital asset for Alice
    love_token = {
        "data": {
            "token_for": {"love_token": {"serial_number": "HK143"}},
            "description": "Love share token. Each token represents infinite Love.",
        },
    }

    # prepare the transaction with the digital asset and issue 10 tokens for Bob
    prepared_token_tx = db.transactions.prepare(
        operation="CREATE",
        signers=kaustubh.public_key,
        recipients=[([honey.public_key], 10)],
        asset=love_token,
    )

    # fulfill the tnx
    fulfilled_token_tx = db.transactions.fulfill(prepared_token_tx, private_keys=kaustubh.private_key)

    tx_reciept = db.transactions.send_commit(fulfilled_token_tx)
    
    return tx_reciept






# @app.get("/create_NFT")
# def create_nft():

#     db_root_url = "localhost:18000"
#     db = Resdb(db_root_url)
#     kaustubh, honey = generate_keypair(), generate_keypair()

#     # create a digital asset for Alice
#     love_token = {
#         "data": {
#             "token_for": {"love_token": {"serial_number": "HK143"}},
#             "description": "Love share token. Each token represents infinite Love.",
#         },
#     }

#     # prepare the transaction with the digital asset and issue 10 tokens for Bob
#     prepared_token_tx = db.transactions.prepare(
#         operation="CREATE",
#         signers=kaustubh.public_key,
#         recipients=[([honey.public_key], 10)],
#         asset=love_token,
#     )

#     # fulfill the tnx
#     fulfilled_token_tx = db.transactions.fulfill(prepared_token_tx, private_keys=kaustubh.private_key)

#     tx_reciept = db.transactions.send_commit(fulfilled_token_tx)
    
#     return fulfilled_token_tx



# @app.get("/send_tx")
# def send_tx():

#     db_root_url = "localhost:18000"
#     db = Resdb(db_root_url)

#     tx = {'inputs': [{'owners_before': ['9vMJ4tNbQxiiVDKNBwiK7zRgpeGu5yTcoRbdyz2eceh7'],
#    'fulfills': None,
#    'fulfillment': 'pGSAIISIOZ8LgRitnbCGJsnBH_tgkPSwoe3qW3C7DHjK9QPygUD_32nKlgNdeuglmSXcTIsC7vGt39si8yZiAjcvryANyYuOD6nVjEya48987yAiqX_uhOYrLWZM4SKATpyuzI0E'}],
#  'outputs': [{'public_keys': ['3TtxTfJcZRs7x18wcymiGefgzaSqtLQHn3z1TehJqUkm'],
#    'condition': {'details': {'type': 'ed25519-sha-256',
#      'public_key': '3TtxTfJcZRs7x18wcymiGefgzaSqtLQHn3z1TehJqUkm'},
#     'uri': 'ni:///sha-256;BYl-OF5zPByKl7xhr1eaPkAqe7vNzgxx06vStewr7i8?fpt=ed25519-sha-256&cost=131072'},
#    'amount': '10'}],
#  'operation': 'CREATE',
#  'metadata': None,
#  'asset': {'data': {'token_for': {'love_token': {'serial_number': 'HK143'}},
#    'description': 'Love share token. Each token represents infinite Love.'}},
#  'version': '2.0',
#  'id': 'dac1c539f1ba31c6c281448ed2492e705f131686b467a1f85b613321cad93f02'}
    
    
#     tx_reciept = db.transactions.send_commit(tx)
    
    
#     return tx_reciept