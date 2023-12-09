from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import importlib

module_name = "ResilientDB-GraphQL.resdb_driver"
module = importlib.import_module(module_name)

from model import User
import motor.motor_asyncio


#from database import create_user
app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.Users_Store
collection = database.users

a,b = module.crypto.generate_keypair(), module.crypto.generate_keypair()
root_url = 'http://localhost:18000'
db = module.Resdb(root_url)
#db = Resdb(root_url)

@app.get("/api/get_all_transcations")
async def get_nft_all_data():

    info = db.transactions.retrieve("849e9d8faab006a5a5c60fec14606f2a46ade83dfa748e9c00222c51c5a0b3f6")
    return {"message": "Hello World", "info":info}


@app.post("/api/create_transcation/")
async def post_nft_data():

    painting_asset = {
        'data': {
            'car': {
            'engine_number'             : 'ENG1234',
            'manufacturing_date'        : '10-07-2021'
            'manufacturer'              : 'PORSCHE'
            'number_plate'              : 'X2DF45',         # everything under data is immutable stuff
            'color'                     : 'black',          # car features
            'seating'                   : '6-seater',
            'transmission'              : '',
            'wheel-base'                : '',
            'drive_type'                : '',
            'ground_clearance'          : '',
            'fuel'                      : '',
            'class'                     : '',
            'model'                     : '',
            'current_owner_name'        : 'New Mona Lisa', 
            'owners_history'            : {},
            'chassis_number'            : 'CHAS_X123',
            'driving_license_number'    : 'LIC_X23CF45',
            'insurance_number'          : 'INS12345',
            'insurance_expiry_date'     : '15-08-2024',
            'insurance_history'         : {},
            'current_mileage'           : '35',
            'current_odometer_reading'  : '10234',
            'service_center_history'    : {},

            },
        },
    }

    painting_asset_metadata = {
        'date_started': '1/1/2022',
        'date_completed': '12/3/2022',
        'price': '100',
        'currency': 'USD'
    }

    print('Defined asset')

    prepared_creation_tx = db.transactions.prepare(
        operation="CREATE",
        signers=a.public_key,
        asset=painting_asset,
        metadata=painting_asset_metadata
    )
    print('Prepared TX')

    fulfilled_creation_tx = db.transactions.fulfill(
        prepared_creation_tx,
        private_keys=a.private_key
    )
    print('Fulfilled TX')

    #committing the transaction
    tx_id = db.transactions.send_commit(fulfilled_creation_tx)
    print("Transaction commit done")
    tx_reciept_id = tx_id[4:]

    nft_data = nft_data.set_tx_id(tx_reciept_id)

    document = nft_data.dict()

    result = await collection.insert_one(document)

    return nft_data