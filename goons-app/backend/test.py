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
    
def test_check_add_account():                                                                                
    url = 'http://127.0.0.1:5000/add_account'                   
    # Replace 'your-username' and 'your-password' with the actual values you want to send
    data = {'username': '', 'password': ''}

    headers = {'Content-Type': 'application/json'}

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        # Account added successfully.
        check.equal(response.json().get('message'), 'Account added successfully.')
    elif response.status_code == 400:
        # Username already exists
        check.equal(response.json().get('message'), 'invalid input')



def test_check_create_project_null():
    #checks if a project can be created with a null description
    url = 'http://127.0.0.1:5000/create_project'
    data = {'projectid': 'hi', 'name': 'world', 'description': '', 'username': 'hello'}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #Created project
        check.equal(response.json().get('message'), 'Successfully added new project with ID' + data['projectid'])
    elif response.status_code == 400:
        #Null input for creating project fields
        check.equal(response.json().get('message'), 'invalid input')
"""
def test_check_create_project():
    #checks if a project can be created with a null description
    url = 'http://127.0.0.1:5000/create_project'
    data = {'projectid': 'yoyoyo', 'name': 'world1', 'description': 'oyoyoyo', 'username': 'hello1'}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #Created project
        check.equal(response.json().get('message'), 'Successfully added new project with ID ' + data['projectid'])
    elif response.status_code == 400:
        #Null input for creating project fields
        check.equal(response.json().get('message'), 'invalid input')        
"""
def test_check_create_project_username_exists():
    #checks to see if project already exists when creating one
    url = 'http://127.0.0.1:5000/create_project'
    data = {'projectid': 'beepboop', 'name': 'DeshplopProj', 'description': 'this is a project', 'username': 'deshplop'}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #Created project
        check.equal(response.json().get('message'), 'Successfully added new project with ID' + data['projectid'])
    elif response.status_code == 400:
        #Null input for creating project fields
        check.equal(response.json().get('message'), 'Project with id beepboop already exists')

 
def test_check_check_in_too_much():
    #checks if normal check in behavior works, here 'check in more than you have checked out'
    url = 'http://127.0.0.1:5000/check_in_hw'
    data = {'projectid': 'beepboop', 'quantity': 10, 'hwset': 1}
    headers = {'Content-Type': 'application/json'} 
    response = requests.post(url, json=data, headers=headers)
    check.equal(response.json().get('message'), 'Cannot check in more than you have checked out')
    
""" #can't test this accurately
def test_check_check_out_too_much():
    #checks if too much hardware is checked out
    url = 'http://127.0.0.1:5000/check_out_hw'
    data = {'projectid': 'beepboop', 'quantity': 10000, 'hwset': 1}
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=data, headers=headers)
    print(response.json().get('message'))
    check.equal(response.json().get('message'), 'Checked out 0 units to project with id '+data['projectid']+' from HWSet'+str(data['hwset'])+' because ran out')
"""
 
def test_check_check_in_null_project():
    #checks if normal check in behavior works, here 'check in more than you have checked out'
    url = 'http://127.0.0.1:5000/check_in_hw'
    data = {'projectid': 'hellohellohello', 'quantity': 10, 'hwset': 1}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        #Successfully checked in hardware
        check.equal(response.json().get('message'), 'Successfully checked in 10 units to HWSet 1 from project with id' + data['projectid'])
    elif response.status_code == 400:
        #Invalid input or project does not exist in data string
        check.equal(response.json().get('message'), 'Project does not exist')
   
def test_check_check_out_null_project():
    #checks if too much hardware is checked out
    url = 'http://127.0.0.1:5000/check_out_hw'
    data = {'projectid': 'hellohellohello', 'quantity': 1000, 'hwset': 1}
    
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #Successfully checked in hardware
        check.equal(response.json().get('message'), 'Successfully checked out' + str(data['quantity']) + 'to HWSet' +str(data['hwset'])+ 'from project with id' + data['projectid'])
    elif response.status_code == 400:
        #Invalid input or project does not exist in data string
        check.equal(response.json().get('message'), 'Project does not exist')
    else:
        #User has tried to check in more than what project has checked out
        check.equal(response.json().get('message'), 'Checked out '+str(data['quantity'])+' units to project with id '+data['projectid']+' from HWSet'+str(data['hwset'])+' because ran out')        

def test_leave_project_nonexists():
    #checks to see if leaving a nonexistent project works
    url = 'http://127.0.0.1:5000/leave_project'
    
    data = {'projectid': 'hellohellohello', 'username': 'hi'}

    headers = {'Content-Type': 'application/json'}       

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 401:
        #project doesn't exist
        check.equal(response.json().get('message'), 'Project does not exist')
        
def test_leave_project():
    #checks to see if leaving a nonexistent project works
    url = 'http://127.0.0.1:5000/leave_project'
    
    data = {'projectid': 'beepboop', 'username': 'DeshplopProj'}

    headers = {'Content-Type': 'application/json'}       

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        #project doesn't exist
        check.equal(response.json().get('message'), 'Successfully removed user '+data['username']+ 'from project with ID '+data['projID'])   
   

if __name__ == '__main__':
    test_check_add_existing_account()
    test_check_add_null_account()
    test_check_check_out_negative_quantity()
    test_check_add_account()
    test_check_create_project_null()    
    test_check_create_project_username_exists()
    #test_check_create_project()
    test_check_check_in_too_much()
    test_check_check_in_null_project()
    #test_check_check_out_too_much()
    test_check_check_out_null_project()
    test_leave_project_nonexists()
    test_leave_project()