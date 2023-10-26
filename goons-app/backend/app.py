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

'''
need to make /join_project route (I believe a POST request)
this api will get the projectID and username from the frontend, and check if the projectID exists in the projects collection,
 if so, add the user to the project
'''
@app.route('/join_project', methods=['POST'])
def join_project():
    data = request.get_json() # get project ID from the frontend
    if data['projectID'] == '':
        return jsonify({'message': 'invalid input'}), 400
    
    projID = data.get('projectID')
    # check that project exists
    projectList = list(projects.find({'projectID': projID}))
    if len(projectList) == 0:
        return jsonify({'message': 'Project does not exist'})
    # add user to this project
    username = data.get('projectID')
    projects.update_one({'projectID': projID},{'$push': {'users': username}})

# ------------------------------------------------------------------------- 
'''
need to make /create_project route (I believe a POST request)
this api will get the projectID and project Name from the frontend, check if the projectID exists in the projects collection,
if so, return an error message, if not, add the project to the projects collection
'''
# ------------------------------------------------------------------------- 
'''
need to make /check_in_hardware route (I believe a POST request)
this api will first get what HWSet it is (either hwset1 or hwset2 lol),
and then update the avaiablilty of that hardware set in the hardwareSets collection respectively
'''
# ------------------------------------------------------------------------- 
'''
need to make /check_out_hardware route (I believe a POST request)
this api will first get what HWSet it is, and then update the avaiablilty of that hardware set in the hardwareSets collection respectively
ALSO this will update the project that the hardware is being checked out to (specifically the quantiy of the hardware in the project)
'''
# ------------------------------------------------------------------------- 

if __name__ == '__main__':
    app.run(debug=True)