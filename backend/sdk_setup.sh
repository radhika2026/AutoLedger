# !!!Run the script with root permissions
# Script to setup ResilientDB Python SDK

cd ResilientDB-GraphQL/

#Create venv for the SDK
#python3 -m venv venv --without-pip

#Activate the venv
source venv/bin/activate

#Install pip in the venv
curl https://bootstrap.pypa.io/get-pip.py | python
#Install python dependencies
pip install -r requirements.txt

#Start the Python SDK
#python3 test_sdk.py

cd ..
