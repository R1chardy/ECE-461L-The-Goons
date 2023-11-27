import pytest_check as check
import requests

def check_add_existing_account():
    url = 'http://127.0.0.1:5000/add_account'
    
    data = {'username': 'aryanj179', 'password': 'password123'}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    #print(response.json().get('message'))
    assert(check.equal(response.json().get('message'), 'Username already exists'))

def check_add_null_account():
    url = 'http://127.0.0.1:5000/add_account'
    
    data = {'username': 'aryanj179', 'password': ''}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    #print(response.json().get('message'))
    assert(check.equal(response.json().get('message'), 'invalid input'))

def check_check_out_negative_quantity():
    url = 'http://127.0.0.1:5000/check_out_hw'

    data = {'projectid': 'beepboop', 'quantity': -10, 'hwset': 1}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    #print(response.json())
    assert(check.equal(response.json().get('message'), 'invalid input'))

if __name__ == '__main__':
    check_add_existing_account()
    check_add_null_account()
    check_check_out_negative_quantity()