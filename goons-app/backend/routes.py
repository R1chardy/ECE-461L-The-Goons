from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def api_test():
    return jsonify({'test': 'testing this api!!!'})