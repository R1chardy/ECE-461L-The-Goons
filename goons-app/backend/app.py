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

@app.route('/add_account', method=['POST'])
def add_account():
    data = request.json # request should be a json with username/password
    res = users.insert_one(data) # this inserts it into mongoDB. consider encrypting the password tho

    if res.acknowledged:
        return jsonify({"message": "Account added successfuly."}), 201
    else:
        return jsonify({"message": "Failed to add an account"})

if __name__ == '__main__':
    app.run(debug=True)