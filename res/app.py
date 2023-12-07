from resdb_driver import Resdb
from resdb_driver.crypto import generate_keypair

db_root_url = "localhost:18000"
protocol = "http://"
fetch_all_endpoint = "/v1/transactions"
db = Resdb(db_root_url)

import strawberry
import typing
import ast
from typing import Optional, List
from filter import filter_by_keys
from filter import filter_by_user, get_all_user_data, get_user_record
from filter import filter_by_car, get_all_cars_data

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

from strawberry.flask.views import GraphQLView

@strawberry.type
class RetrieveTransaction:
    id: str
    version: str
    amount: int
    uri: str
    type: str
    publicKey: str
    operation: str
    metadata: typing.Optional["str"]
    asset: str

@strawberry.type
class RetrieveUserTransaction:
    userName: str
    userRole: str
    idNo: str
    email: str
    password: str

@strawberry.type
class ServicingHistory:
    serviceCenter: str
    serviceDate: str
    serviceDescription: str

@strawberry.type
class OwnerHistory:
    ownerName: str
    ownershipStartDate: str
    ownershipEndDate: str

@strawberry.type
class InsuranceHistory:
    date: str
    cost: str
    description: str

@strawberry.type
class RetrieveCarTransaction:
    chassisNo: str
    engineNo: str
    manufacturer: str
    manufacturingDate: str
    numberPlate: str
    registerDate: str
    ownerHistory: List[OwnerHistory]
    drivingLicense: str
    color: str
    seating: str
    transmission: str
    wheelBase: str
    groundClearance: str
    driveType: str
    fuelType: str
    carClass: str
    model: str
    insuranceNo: str
    insuranceProvider: str
    policyEndDate: str
    insuranceHistory: List[InsuranceHistory]
    mileage: str
    odometerReading: str
    servicingHistory: List[ServicingHistory]



@strawberry.type
class CommitTransaction:
    id: str

@strawberry.input
class PrepareAsset:
    operation: str
    amount: int
    signerPublicKey: str
    signerPrivateKey: str
    recipientPublicKey: str
    asset: str

@strawberry.input
class UpdateAsset:
    id: str
    operation: typing.Optional["str"]
    amount: typing.Optional["int"]
    signerPublicKey: str
    signerPrivateKey: str
    recipientPublicKey: typing.Optional["str"]
    asset: typing.Optional["str"]

@strawberry.input
class FilterKeys:
    ownerPublicKey: Optional[str]
    recipientPublicKey: Optional[str]

@strawberry.input
class UserLogin:
    userEmail: str
    userPwd: str

@strawberry.input
class CarInfo:
    numberPlate: str

@strawberry.type
class Keys:
    publicKey: str
    privateKey: str

def update(data):
    record = db.transactions.retrieve(data.id)
    prepared_token_tx = db.transactions.prepare(
    operation=record["operation"] if data.operation == "" else data.operation,
    signers=data.signerPublicKey,
    recipients=[([record["outputs"][0]["condition"]["details"]["public_key"] if data.recipientPublicKey == "" else data.recipientPublicKey], record["outputs"][0]["amount"] if data.amount == "" else data.amount)],
    asset=record["asset"] if data.asset == "" else ast.literal_eval(data.asset),
    )

    # fulfill the tnx
    fulfilled_token_tx = db.transactions.fulfill(prepared_token_tx, private_keys=data.signerPrivateKey)

    id = db.transactions.send_commit(fulfilled_token_tx)[4:] # Extract ID
    data = db.transactions.retrieve(txid=id)
    payload = RetrieveTransaction(
        id=data["id"],
        version=data["version"],
        amount=data["outputs"][0]["amount"],
        uri=data["outputs"][0]["condition"]["uri"],
        type=data["outputs"][0]["condition"]["details"]["type"],
        publicKey=data["outputs"][0]["condition"]["details"]["public_key"],
        operation=data["operation"],
        metadata=data["metadata"],
        asset=str(data["asset"])
    )
    return payload

def user_update(record, data):
    prepared_token_tx = db.transactions.prepare(
    operation=record["operation"] if data.operation == "" else data.operation,
    signers=data.signerPublicKey,
    recipients=[([record["outputs"][0]["condition"]["details"]["public_key"] if data.recipientPublicKey == "" else data.recipientPublicKey], record["outputs"][0]["amount"] if data.amount == "" else data.amount)],
    asset=record["asset"] if data.asset == "" else ast.literal_eval(data.asset),
    )

    # fulfill the tnx
    fulfilled_token_tx = db.transactions.fulfill(prepared_token_tx, private_keys=data.signerPrivateKey)

    id = db.transactions.send_commit(fulfilled_token_tx)[4:] # Extract ID
    data = db.transactions.retrieve(txid=id)
    payload = RetrieveUserTransaction(
                userName=data["asset"]["data"]["name"],
                userRole=data["asset"]["data"]["role"],
                idNo=data["asset"]["data"]["id_no"],
                email=data["asset"]["data"]["email"],
                password=data["asset"]["data"]["password"]
                )
    return payload


def car_update(record, data):
    prepared_token_tx = db.transactions.prepare(
    operation=record["operation"] if data.operation == "" else data.operation,
    signers=data.signerPublicKey,
    recipients=[([record["outputs"][0]["condition"]["details"]["public_key"] if data.recipientPublicKey == "" else data.recipientPublicKey], record["outputs"][0]["amount"] if data.amount == "" else data.amount)],
    asset=record["asset"] if data.asset == "" else ast.literal_eval(data.asset),
    )

    # fulfill the tnx
    fulfilled_token_tx = db.transactions.fulfill(prepared_token_tx, private_keys=data.signerPrivateKey)

    id = db.transactions.send_commit(fulfilled_token_tx)[4:] # Extract ID
    json_data = db.transactions.retrieve(txid=id)
    payload = RetrieveCarTransaction(
                chassisNo=json_data["asset"]["data"]["chassis_no"],
                engineNo=json_data["asset"]["data"]["engine_no"],
                manufacturer=json_data["asset"]["data"]["manufacturer"],
                manufacturingDate=json_data["asset"]["data"]["manufacturing_date"],
                numberPlate=json_data["asset"]["data"]["number_plate"],
                registerDate=json_data["asset"]["data"]["register_date"],
                ownerHistory=[
                    OwnerHistory(
                        ownerName=owner["owner_name"],
                        ownershipStartDate=owner["ownership_start_date"],
                        ownershipEndDate=owner["ownership_end_date"],
                    )
                    for owner in json_data["asset"]["data"]["owner_history"]
                    ],
                drivingLicense=json_data["asset"]["data"]["driving_license"],
                color=json_data["asset"]["data"]["color"],
                seating=json_data["asset"]["data"]["seating"],
                transmission=json_data["asset"]["data"]["transmission"],
                wheelBase=json_data["asset"]["data"]["wheel_base"],
                groundClearance=json_data["asset"]["data"]["ground_clearance"],
                driveType=json_data["asset"]["data"]["drive_type"],
                fuelType=json_data["asset"]["data"]["fuel_type"],
                carClass=json_data["asset"]["data"]["class"],
                model=json_data["asset"]["data"]["model"],
                insuranceNo=json_data["asset"]["data"]["insurance_no"],
                insuranceProvider=json_data["asset"]["data"]["insurance_provider"],
                policyEndDate=json_data["asset"]["data"]["policy_end_date"],
                insuranceHistory=[
                    InsuranceHistory(
                       date=insurance["date"],
                       cost=insurance["cost"],
                       description=insurance["description"]
                    ) for insurance in json_data["asset"]["data"]["insurance_history"]
                ],
                mileage=json_data["asset"]["data"]["mileage"],
                odometerReading=json_data["asset"]["data"]["odometer_reading"],
                servicingHistory=[
                    ServicingHistory(
                        serviceCenter=service["service_center"],
                        serviceDate=service["service_date"],
                        serviceDescription=service["service_description"]
                    )
                    for service in json_data["asset"]["data"]["servicing_history"]
                ]
                )
    return payload



@strawberry.type
class Query:

    @strawberry.field
    def getUserTransaction(self, user: UserLogin) -> RetrieveUserTransaction:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        json_data = filter_by_user(url, user.userEmail, user.userPwd)
        #print(json_data)
        payload = RetrieveUserTransaction(
                    userName=json_data["asset"]["data"]["name"],
                    userRole=json_data["asset"]["data"]["role"],
                    idNo=json_data["asset"]["data"]["id_no"],
                    email=json_data["asset"]["data"]["email"],
                    password=json_data["asset"]["data"]["password"]
                    )
        return payload

#    @strawberry.field
#    def getFilteredUserTranscation(self, id: strawberry.ID) -> None:
#        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
#        data = get_user(url)
#        print(data)
#        return None
#

    @strawberry.field
    def getAllUserTransactions(self, id: strawberry.ID) -> List[RetrieveUserTransaction]:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        json_data = get_all_user_data(url)
        records = []
        for data in json_data:
            try:
                records.append(RetrieveUserTransaction(
                userName=data["asset"]["data"]["name"],
                userRole=data["asset"]["data"]["role"],
                idNo=data["asset"]["data"]["id_no"],
                email=data["asset"]["data"]["email"],
                password=data["asset"]["data"]["password"]
                ))
            except Exception as e:
                print(e)
        return records


    @strawberry.field
    def getCarTransaction(self, car: CarInfo) -> RetrieveCarTransaction:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        json_data = filter_by_car(url, car.numberPlate)
        print(json_data)


        payload = RetrieveCarTransaction(
                    chassisNo=json_data["asset"]["data"]["chassis_no"],
                    engineNo=json_data["asset"]["data"]["engine_no"],
                    manufacturer=json_data["asset"]["data"]["manufacturer"],
                    manufacturingDate=json_data["asset"]["data"]["manufacturing_date"],
                    numberPlate=json_data["asset"]["data"]["number_plate"],
                    registerDate=json_data["asset"]["data"]["register_date"],
                    ownerHistory=[
                        OwnerHistory(
                            ownerName=owner["owner_name"],
                            ownershipStartDate=owner["ownership_start_date"],
                            ownershipEndDate=owner["ownership_end_date"],
                        )
                        for owner in json_data["asset"]["data"]["owner_history"]
                        ],
                    drivingLicense=json_data["asset"]["data"]["driving_license"],
                    color=json_data["asset"]["data"]["color"],
                    seating=json_data["asset"]["data"]["seating"],
                    transmission=json_data["asset"]["data"]["transmission"],
                    wheelBase=json_data["asset"]["data"]["wheel_base"],
                    groundClearance=json_data["asset"]["data"]["ground_clearance"],
                    driveType=json_data["asset"]["data"]["drive_type"],
                    fuelType=json_data["asset"]["data"]["fuel_type"],
                    carClass=json_data["asset"]["data"]["class"],
                    model=json_data["asset"]["data"]["model"],
                    insuranceNo=json_data["asset"]["data"]["insurance_no"],
                    insuranceProvider=json_data["asset"]["data"]["insurance_provider"],
                    policyEndDate=json_data["asset"]["data"]["policy_end_date"],
                    insuranceHistory=[
                        InsuranceHistory(
                           date=insurance["date"],
                           cost=insurance["cost"],
                           description=insurance["description"]
                        ) for insurance in json_data["asset"]["data"]["insurance_history"]
                    ],
                    mileage=json_data["asset"]["data"]["mileage"],
                    odometerReading=json_data["asset"]["data"]["odometer_reading"],
                    servicingHistory=[
                        ServicingHistory(
                            serviceCenter=service["service_center"],
                            serviceDate=service["service_date"],
                            serviceDescription=service["service_description"]
                        )
                        for service in json_data["asset"]["data"]["servicing_history"]
                    ]
                    )
        return payload


    @strawberry.field
    def getAllCarTransactions(self, id: strawberry.ID) -> List[RetrieveCarTransaction]:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        json_data = get_all_cars_data(url)
        records = []
        for data in json_data:
            try:
            
                records.append(RetrieveCarTransaction(
                            chassisNo=data["asset"]["data"]["chassis_no"],
                            engineNo=data["asset"]["data"]["engine_no"],
                            manufacturer=data["asset"]["data"]["manufacturer"],
                            manufacturingDate=data["asset"]["data"]["manufacturing_date"],
                            numberPlate=data["asset"]["data"]["number_plate"],
                            registerDate=data["asset"]["data"]["register_date"],
                            ownerHistory=[
                                OwnerHistory(
                                    ownerName=owner["owner_name"],
                                    ownershipStartDate=owner["ownership_start_date"],
                                    ownershipEndDate=owner["ownership_end_date"],
                                )
                                for owner in data["asset"]["data"]["owner_history"]
                                ],
                            drivingLicense=data["asset"]["data"]["driving_license"],
                            color=data["asset"]["data"]["color"],
                            seating=data["asset"]["data"]["seating"],
                            transmission=data["asset"]["data"]["transmission"],
                            wheelBase=data["asset"]["data"]["wheel_base"],
                            groundClearance=data["asset"]["data"]["ground_clearance"],
                            driveType=data["asset"]["data"]["drive_type"],
                            fuelType=data["asset"]["data"]["fuel_type"],
                            carClass=data["asset"]["data"]["class"],
                            model=data["asset"]["data"]["model"],
                            insuranceNo=data["asset"]["data"]["insurance_no"],
                            insuranceProvider=data["asset"]["data"]["insurance_provider"],
                            policyEndDate=data["asset"]["data"]["policy_end_date"],
                            insuranceHistory=[
                                InsuranceHistory(
                                   date=insurance["date"],
                                   cost=insurance["cost"],
                                   description=insurance["description"]
                                ) for insurance in data["asset"]["data"]["insurance_history"]
                            ],
                            mileage=data["asset"]["data"]["mileage"],
                            odometerReading=data["asset"]["data"]["odometer_reading"],
                            servicingHistory=[
                                ServicingHistory(
                                    serviceCenter=service["service_center"],
                                    serviceDate=service["service_date"],
                                    serviceDescription=service["service_description"]
                                )
                                for service in data["asset"]["data"]["servicing_history"]
                            ]
                            ))

            except Exception as e:
                print(e)
        return records


    @strawberry.field
    def getTransaction(self, id: strawberry.ID) -> RetrieveTransaction:
        data = db.transactions.retrieve(txid=id)
        payload = RetrieveTransaction(
            id=data["id"],
            version=data["version"],
            amount=data["outputs"][0]["amount"],
            uri=data["outputs"][0]["condition"]["uri"],
            type=data["outputs"][0]["condition"]["details"]["type"],
            publicKey=data["outputs"][0]["condition"]["details"]["public_key"],
            operation=data["operation"],
            metadata=data["metadata"],
            asset=str(data["asset"])
        )
        return payload
    
    @strawberry.field
    def getFilteredTransactions(self, filter: Optional[FilterKeys]) -> List[RetrieveTransaction]:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        if filter.ownerPublicKey != None:
            filter.ownerPublicKey = filter.ownerPublicKey if filter.ownerPublicKey.strip() else None
        if filter.recipientPublicKey != None:
            filter.recipientPublicKey = filter.recipientPublicKey if filter.recipientPublicKey.strip() else None
        json_data = filter_by_keys(url, filter.ownerPublicKey, filter.recipientPublicKey)
        records = []
        for data in json_data:
            try:
                records.append(RetrieveTransaction(
                id=data["id"],
                version=data["version"],
                amount=data["outputs"][0]["amount"],
                uri=data["outputs"][0]["condition"]["uri"],
                type=data["outputs"][0]["condition"]["details"]["type"],
                publicKey=data["outputs"][0]["condition"]["details"]["public_key"],
                operation=data["operation"],
                metadata=data["metadata"],
                asset=str(data["asset"])
                ))
            except Exception as e:
                print(e)
        return records


@strawberry.type
class Mutation:
    @strawberry.mutation
    def postTransaction(self, data: PrepareAsset) -> CommitTransaction:
        prepared_token_tx = db.transactions.prepare(
        operation=data.operation,
        signers=data.signerPublicKey,
        recipients=[([data.recipientPublicKey], data.amount)],
        asset=ast.literal_eval(data.asset),
        )

        # fulfill the tnx
        fulfilled_token_tx = db.transactions.fulfill(prepared_token_tx, private_keys=data.signerPrivateKey)

        id = db.transactions.send_commit(fulfilled_token_tx)[4:] # Extract ID
        payload = CommitTransaction(
            id=id
        )
        return payload


    
    @strawberry.mutation
    def updateUserTransaction(self, data: PrepareAsset) -> RetrieveUserTransaction:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        asset=ast.literal_eval(data.asset)
        user_email = asset["data"]["email"]
        user_pwd = asset["data"]["password"]
        record = filter_by_user(url, user_email, user_pwd)
        #record = get_user_record(url, user_name)
        return user_update(record, data)

    
    @strawberry.mutation
    def updateCarTransaction(self, data: PrepareAsset) -> RetrieveCarTransaction:
        url = f"{protocol}{db_root_url}{fetch_all_endpoint}"
        asset=ast.literal_eval(data.asset)
        number_plate = asset["data"]["number_plate"]
        record = filter_by_car(url, number_plate)
        return car_update(record, data)


    @strawberry.mutation
    def updateTransaction(self, data: UpdateAsset) -> RetrieveTransaction:
        return update(data)
    
    @strawberry.mutation
    def updateMultipleTransaction(self, data: List[UpdateAsset]) -> List[RetrieveTransaction]:
        result = []
        for transaction in data:
            result.append(update(transaction))
        return result

    @strawberry.mutation
    def generateKeys(self) -> Keys:
        keys = generate_keypair()
        payload = Keys(
            publicKey=keys.public_key,
            privateKey=keys.private_key
        )
        return payload


schema = strawberry.Schema(query=Query, mutation=Mutation)

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql_view", schema=schema),
)

if __name__ == "__main__":
    app.run(port="8000")
