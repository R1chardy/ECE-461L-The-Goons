import pytest_check as check
import requests

def test_check_add_existing_account():
    url = 'http://127.0.0.1:5000/add_account'
    
    data = {'username': 'aryanj179', 'password': 'password123'}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    # print(response.json().get('message'))
    check.equal(response.json().get('message'), 'Username already exists')

def test_check_add_null_account():
    url = 'http://127.0.0.1:5000/add_account'
    
    data = {'username': 'aryanj179', 'password': ''}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    #print(response.json().get('message'))
    check.equal(response.json().get('message'), 'invalid input')

def test_check_check_out_negative_quantity():
    url = 'http://127.0.0.1:5000/check_out_hw'

    data = {'projectid': 'beepboop', 'quantity': -10, 'hwset': 1}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    #print(response.json())
    check.equal(response.json().get('message'), 'invalid input')
    
def check_add_account():                                                                                #invalid input
    url = 'http://127.0.0.1:5000/add_account'                   
    # Replace 'your-username' and 'your-password' with the actual values you want to send
    data = {'username': '', 'password': ''}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        # Account added successfully.
        print(response.json().get('message'))
        check.equal(response.json().get('message'), 'Account added successfully.')
    elif response.status_code == 400:
        # Username already exists
        print(response.json().get('message'))
        check.equal(response.json().get('message'), 'invalid input')



def test_check_create_project_null():
    url = 'http://127.0.0.1:5000/create_project'
    data = {'projectid': 'hi', 'name': 'world', 'description': '', 'username': 'hello'}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #Created project
        print(response.json().get('message'))
        check.equal(response.json().get('message'), 'Successfully added new project with ID hi')
    elif response.status_code == 400:
        #Null input for creating project fields
        print(response.json().get('message'))
        check.equal(response.json().get('message'), 'invalid input')
        

def test_check_create_project_username():
    url = 'http://127.0.0.1:5000/create_project'
    data = {'projectid': 'beepboop', 'name': 'DeshplopProj', 'description': 'this is a project', 'username': 'deshplop'}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #Created project
        print(response.json().get('message'))
        check.equal(response.json().get('message'), 'Successfully added new project with ID world')
    elif response.status_code == 400:
        #Null input for creating project fields
        print(response.json().get('message'))
        check.equal(response.json().get('message'), 'Project with id beepboop already exists')
        

if __name__ == '__main__':
    test_check_add_existing_account()
    test_check_add_null_account()
    test_check_check_out_negative_quantity()