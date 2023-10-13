from flask import Flask, request, jsonify
from pymongo import MongoClient
from config import uri

app = Flask(__name__)
client = MongoClient(uri)
db = client["Application"] # main application database
users = db["Users"] # user collection
collection2 = db["Projects"] # projects collection
# unsure that the second collection is needed for the login page, it should just be updating the users collection


@app.route('/test', methods=['GET'])
def api_test():
    return jsonify({'test': 'testing this api!!!'})

@app.route('/add_account', methods=['POST'])
def add_account():
    data = request.get_json() # request should be a json with username/password
    res = users.insert_one(data) # this inserts it into mongoDB. consider encrypting the password tho

    if data is None:
        return jsonify({'error': 'invalid input'}), 400

    username = data.get('username')
    password = data.get('password')

    usernameList = list(users.find({"username": username}))
    if len(usernameList) > 0:
        return jsonify({'error': 'Username already exists'}), 400
    else:
        res = users.insert_one({"username": username, "password": password}) # inserts new acc in db    
        return jsonify({"message": "Account added successfuly."}), 201
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get the JSON data from the request body

    if data is None:
        return jsonify({'error': 'invalid input'}), 400

    username = data.get('username')
    password = data.get('password')


    usernameList = list(users.find({"username": username}))
    for user in usernameList:
        if user["password"] == password:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    return jsonify({'error': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)