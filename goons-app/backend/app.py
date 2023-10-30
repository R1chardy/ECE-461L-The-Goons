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
        return jsonify({"message": "Account added successfully."}), 200
    
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
            return jsonify({'message': 'Invalid username or password'}), 400
    return jsonify({'message': 'Invalid username or password'}), 400

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

    return json.loads(json_util.dumps(response_data)), 200

'''
 /join_project route
 this api will get the projectid and username from the frontend, and check if the projectid exists in the projects collection,
 if so, add the user to the project
'''
@app.route('/join_project', methods=['POST'])
def join_project():
    data = request.get_json() # get json form frontend
    if data['projectid'] == '' or data['username'] == '':
        return jsonify({'message': 'invalid input'}), 400
    
    projID = data.get('projectid')
    # check that project exists
    projectList = list(projects.find({'projectid': projID}))
    if len(projectList) == 0:
        return jsonify({'message': 'Project does not exist'}), 400
    # add user to this project
    username = data.get('username')
    projects.update_one({'projectid': projID},{'$push': {'users': username}})
    return jsonify({'message': 'Successfully added user '+username+' to project with ID '+projID}), 200

# ------------------------------------------------------------------------- 
'''
/leave_project route
this api will get project id and username from frontend, check that the project exists, and remove the user from the project
'''
@app.route('/leave_project', methods=['POST'])
def leave_project():
    data = request.get_json() # get json form frontend
    if data['projectid'] == '' or data['username'] == '':
        return jsonify({'message': 'invalid input'}), 400
    
    projID = data.get('projectid')
    # check that project exists
    projectList = list(projects.find({'projectid': projID}))
    if len(projectList) == 0:
        return jsonify({'message': 'Project does not exist'}), 400
    # check that user is in this project
    username = data.get('username')
    userList = list(projectList[0]['users'])
    if username not in userList:
        return jsonify({'message': 'User not part of specified project'}), 400
    # remove user from project
    projects.update_one({'projectid': projID},{'$pull': {'users': username}})
    return jsonify({'message': 'Successfully removed user '+username+' from project with ID '+projID}), 200
'''
/create_project route 
this api will get the projectid, name, and description from the frontend, check if the projectid exists in the projects collection,
if so, return an error message, if not, add the project to the projects collection
'''
@app.route('/create_project', methods=['POST'])
def create_project():
    data = request.get_json()
    if data['projectid'] == '' or data['name'] == '' or data['description'] == '':
        return jsonify({'message': 'invalid input'}), 400
    
    projID = data.get('projectid')
    projectList = list(projects.find({'projectid': projID}))
    if len(projectList) > 0:
        return jsonify({'message': 'Project with id '+projID+' already exists'}), 400
    
    name = data.get('name')
    description = data.get('description')
    projects.insert_one({'name': name, 'description': description, 'projectid': projID, 'users': [], 'hwsets': []})
    return jsonify({'message': 'Successfully added new project with ID '+projID}), 200

# ------------------------------------------------------------------------- 
'''
/check_in_hw route 
this api will first get what HWSet it is (either hwset1 or hwset2 lol),
and then update the avaiablilty of that hardware set in the hardwareSets collection respectively
ALSO this will update the project that the hardware is being checked in from (specifically the quantiy of the hardware in the project)
needs: projectid (str), hardware set (int 1 or 2), quantity (number/int)
'''
@app.route('/check_in_hw', methods=['POST'])
def check_in():
    data = request.get_json()
    valid_hwset = [1,2]
    if data['projectid'] == '' or data['quantity'] == '' or data['hwset'] not in valid_hwset:
        return jsonify({'message': 'invalid input',
                        'quant': 0}), 400
    
    projID = data.get('projectid')
    # check that project exists
    projectList = list(projects.find({'name': projID}))
    if len(projectList) == 0:
        return jsonify({'message': 'Project does not exist',
                        'quant': 0}), 400
    
    hwset = data.get('hwset')
    quantity = data.get('quantity')
    message = 'Successfully checked in '+str(quantity)+' units to HWSet'+str(hwset)+' from project with id '+projID
    # if project attempts to return more than project has checked out, return only what they have
    if int(quantity) > int(projectList[0]['hwsets']['hwset'+str(hwset)]):
        quantity = int(projectList[0]['hwsets']['hwset'+str(hwset)])
        message = 'Cannot check in more than you have checked out'
    # now to update hwset collection
    hardwareSets.update_one({'name': 'HWSet'+str(hwset)}, {'$inc': {'availability': quantity}})
    
    #now update the project collection
    projects.update_one({'name': projID}, {'$inc': {
        'hwsets.hwset'+str(hwset): -1*quantity
    }})
    
    return jsonify({'message': message,
                    'quant': quantity}), 200
# ------------------------------------------------------------------------- 
'''
/check_out_hw route
this api will first get what HWSet it is, and then update the avaiablilty of that hardware set in the hardwareSets collection respectively
ALSO this will update the project that the hardware is being checked out to (specifically the quantiy of the hardware in the project)
needs: projectid (str), hardware set (int 1 or 2), quantity (number/int)
'''
@app.route('/check_out_hw', methods=['POST'])
def check_out():
    data = request.get_json()
    valid_hwset = [1,2]
    if data['projectid'] == '' or data['quantity'] == '' or data['hwset'] not in valid_hwset:
        return jsonify({'message': 'invalid input',
                        'quant': 0}), 400
    
    projID = data.get('projectid')
    # check that project exists
    projectList = list(projects.find({'name': projID}))
    if len(projectList) == 0:
        return jsonify({'message': 'Project does not exist',
                        'quant': 0}), 400
    
    hwset = data.get('hwset')
    quantity = data.get('quantity')
    # check if we have enough capacity
    message = 'Successfully checked out '+str(quantity)+' units to project with id '+projID+' from HWSet'+str(hwset)
    hwdoc = hardwareSets.find_one({'name': 'HWSet'+str(hwset)})
    # if amount requested is greater than availability
    if (hwdoc['availability']) < quantity:
        quantity = hwdoc['availability']
        # set flag for return
        message = 'Checked out '+str(quantity)+' units to project with id '+projID+' from HWSet'+str(hwset)+' because ran out'
    # now to update hwset collection
    hardwareSets.update_one({'name': 'HWSet'+str(hwset)}, {'$inc': {'availability': -1*quantity}})
    
    #now update the project collection
    projects.update_one({'name': projID}, {'$inc': {
        'hwsets.hwset'+str(hwset): quantity
    }})
    return jsonify({'message': message,
                    'quant': quantity}),200

# ------------------------------------------------------------------------- 
# deprecated
# hardware information route
@app.route('/get_hardware_sets', methods=['GET'])
def get_hardware_sets():
    data = request.get_json()
    
    cursor = hardwareSets.find()
    hardwareSetsList = []
    hardwareSet = {}
    for document in cursor:
        tempSet = {"name" : document["Name"] , "capacity" : document["Capacity"], "availability" : document["Availability"] , "checkedOut" : document["CheckedOut"]}
        hardwareSetsList.append(tempSet)
        if (data.get('name') == document["Name"]):
            hardwareSet = tempSet
            print(hardwareSetsList)
            print(hardwareSet)

    response_data = {
    "hardwareSets": hardwareSetsList,
    "hardwareSet": hardwareSet,
    }

    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(debug=True)