import requests
import json
import re

def fix_json_with_commas(json_str):
    fixed_json = json_str.replace('}{', '},{')
    # Remove single characters and extra commas using regular expressions
    filtered_data = re.sub(r',\s*\b\w\b', '', fixed_json)
    return f"[{filtered_data}]"

def get_json_objects_by_public_key(json_data, owner_public_key=None, recipient_public_key=None):
    matching_objects = []
    if owner_public_key != None and recipient_public_key != None:
        for obj in json_data[0]:
            try:
                if owner_public_key in obj['inputs'][0]['owners_before'] and recipient_public_key in obj['outputs'][0]['public_keys']:
                    matching_objects.append(obj)
            except Exception as e:
                print(e)
    elif owner_public_key == None and recipient_public_key != None:
        for obj in json_data[0]:
            try:
                if recipient_public_key in obj['outputs'][0]['public_keys']:
                    matching_objects.append(obj)
            except Exception as e:
                print(e)
    elif owner_public_key != None and recipient_public_key == None:
        for obj in json_data[0]:
            try:
                if owner_public_key in obj['inputs'][0]['owners_before']:
                    matching_objects.append(obj)
            except Exception as e:
                print(e)
    else:
        for obj in json_data[0]:
            try:
                matching_objects.append(obj)
            except Exception as e:
                print(e)
    return matching_objects

def get_json_data(url, ownerPublicKey=None, recipientPublicKey=None):
    try:
        response = requests.get(url)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON data from the response
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)
            if ownerPublicKey == None and recipientPublicKey == None:
                matching_objects = get_json_objects_by_public_key(json_data, None, None)
                return matching_objects
            elif ownerPublicKey == None and recipientPublicKey != None:
                matching_objects = get_json_objects_by_public_key(json_data, None, recipientPublicKey)
                return matching_objects
            elif ownerPublicKey != None and recipientPublicKey == None:
                matching_objects = get_json_objects_by_public_key(json_data, ownerPublicKey, None)
                return matching_objects
            else:
                # Get all JSON objects that match the given publicKey
                matching_objects = get_json_objects_by_public_key(json_data, ownerPublicKey, recipientPublicKey)
                return matching_objects
        else:
            print(f"Error: Unable to retrieve data from {url}. Status code: {response.status_code}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def filter_by_keys(url, ownerPublicKey, recipientPublicKey):
    json_data = get_json_data(url, ownerPublicKey, recipientPublicKey)
    return json_data

#def get_filtered_user(url):
#    response = requests.get(url)
#    json_text = fix_json_with_commas(response.text)
#    json_data = json.loads(json_text)
#    return (json_data)
#
#def get_user(url):
#    data = get_filtered_user(url)
#    return data

def get_latest_record(filtered_objects):
    if not filtered_objects:
        return {}

    def get_timestamp(record):
        # Use get with a default value to handle missing 'asset' or 'data' keys
        timestamp_str = record.get('asset', {}).get('data', {}).get('timestamp', "")

        try:
            # Try converting the timestamp to a float
            timestamp = float(timestamp_str)
        except ValueError:
            # Handle the case where the conversion fails (e.g., if timestamp_str is not a valid float)
            timestamp = float('-inf')

        return timestamp

    record = max(filtered_objects, key=get_timestamp)
    return record


#def get_latest_record(filtered_objects):
#    record = max(filtered_objects, key=lambda x: x['asset']['data']['timestamp'])
#    return record

def get_user_record(url, user_name):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)

        for obj in json_data[0]:
            asset_data = obj.get('asset', {}).get('data', {})
            if(asset_data.get('asset_type') == 'user'):
                name = asset_data.get('name')
                if name == user_name:
                    return obj

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None



def get_filtered_user(url, user_email, user_pwd):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)

        filtered_objects = []
        for obj in json_data[0]:
            # Safely access nested dictionaries
            asset_data = obj.get('asset', {}).get('data', {})
            if(asset_data.get('asset_type') == 'user'):
                email = asset_data.get('email')
                password = asset_data.get('password')
                #print(asset_data,asset_data.get('email'),asset_data.get('password'), "\n\n asset", user_email, user_pwd)

                if email == user_email and password == user_pwd:
                    #return obj
                    filtered_objects.append(obj)

        record = get_latest_record(filtered_objects)
        #print(record)
        return record

                #return filtered_objects

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def filter_by_user(url, user_email, user_pwd):
    json_data = get_filtered_user(url, user_email, user_pwd)
    return json_data

def get_all_user_data(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)

            objects = []
            for obj in json_data[0]:
                asset_data = obj.get('asset', {}).get('data', {})
                if(asset_data.get('asset_type') == 'user'):
                    objects.append(obj)

            return objects

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None


def get_all_cars_data(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)

            objects = []
            for obj in json_data[0]:
                asset_data = obj.get('asset', {}).get('data', {})
                if(asset_data.get('asset_type') == 'car'):
                    objects.append(obj)

            return objects

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None

def get_filtered_car(url, number_plate):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            json_text = fix_json_with_commas(response.text)
            json_data = json.loads(json_text)

        filtered_objects = []
        for obj in json_data[0]:
            asset_data = obj.get('asset', {}).get('data', {})
            if(asset_data.get('asset_type') == 'car'):
                plate = asset_data.get('numberPlate')
                if number_plate == plate:
                    filtered_objects.append(obj)

        record = get_latest_record(filtered_objects)
        return record

    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None


def filter_by_car(url, number_plate):
    json_data = get_filtered_car(url, number_plate)
    return json_data
