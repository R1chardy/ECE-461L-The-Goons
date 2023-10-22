from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import json_util
import json
from config import uri

app = Flask(__name__)
client = MongoClient(uri)
db = client["Application"] # main application database
users = db["Users"] # user collection
projects = db["Projects"] # projects collection
hardwareSets = db["HWSets"] # hardware sets collection

CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/test', methods=['GET'])
def api_test():
    return jsonify({'test': 'testing this api!!!'})

@app.route('/add_account', methods=['POST'])
def add_account():
    data = request.get_json() # request should be a json with username/password

    if data["username"] == "" or data["password"] == "":
        return jsonify({'message': 'invalid input'}), 400

    username = data.get('username')
    password = data.get('password')

    usernameList = list(users.find({"username": username}))
    if len(usernameList) > 0:
        return jsonify({'message': 'Username already exists'}), 400
    else:
        users.insert_one({"username": username, "password": password}) # inserts new acc in db    
        return jsonify({"message": "Account added successfully."}), 201
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Get the JSON data from the request body

    if data["username"] == "" or data["password"] == "":
        return jsonify({'message': 'invalid input'}), 400

    username = data.get('username')
    password = data.get('password')


    usernameList = list(users.find({"username": username}))
    for user in usernameList:
        if user["password"] == password:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/update_projectpage', methods=['GET'])
def get_project():
    username = request.args.get('username')
    projectList = list(projects.find())
    user_projectList = list(projects.find({"Users": username}))
    hardwareSetsList = list(hardwareSets.find())
    print(user_projectList)

    response_data = {
        "projects": projectList,
        "user_projects": user_projectList,
        "hardwareSets": hardwareSetsList
    }

    return json.loads(json_util.dumps(response_data))

# need to make /add_project route

# need to make /get_project route
if __name__ == '__main__':
    app.run(debug=True)