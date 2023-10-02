from flask import Flask, request, jsonify
from pymongo import MongoClient
from config import uri

app = Flask(__name__)
client = MongoClient(uri)
db = client["db_name"] # the input should be the database name of our MongoDB
collection1 = db["collection_name"] # this should be the collection table (maybe account info table)
collection2 = db["second_collection_name"] # this should be some other collection table (maybe the items table?)


@app.route('/test', methods=['GET'])
def api_test():
    return jsonify({'test': 'testing this api!!!'})

@app.route('/add_account', method=['POST'])
def add_account():
    data = request.json # request should be a json with username/password
    res = collection1.insert_one(data) # this inserts it into mongoDB. consider encrypting the password tho

    if res.acknowledged:
        return jsonify({"message": "Account added successfuly."}), 201
    else:
        return jsonify({"message": "Failed to add an account"})

if __name__ == '__main__':
    app.run(debug=True)