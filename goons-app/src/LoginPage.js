import React, { useState } from 'react';
// import { Outlet, Link } from "react-router-dom";

function LoginPage() {

    const [user, setUser] = useState("")
    const[pass, setPass] = useState("")
    const[outputMessage, setOutputMessage] = useState("")

    const loginPressed = () => {
        const jsonString = JSON.stringify({
            username: user,
            password: pass
        });
        
        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
        })
        .then(response => {return response.json()})
        .then(data => {
            console.log(data)
            setOutputMessage(data.message)
            if (data.message === "Login successful") {
                window.location.href = '/projects?user=${encodeURIComponent(' + user + ')}'
            }
        })
        .catch(error => {
            console.log(error)
            setOutputMessage(error)
        });
    }

    const signupPressed = () =>{
        const jsonString = JSON.stringify({
            username: user,
            password: pass
        });

        fetch('http://127.0.0.1:5000/add_account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
        })
        .then(response => {return response.json()})
        .then(data => {
            console.log(data)
            setOutputMessage(data.message)
        })
        .catch(error => {
            console.log(error)
            setOutputMessage(error.error)
        });
    }

    const handleUserChange = (event) => {
        setUser(event.target.value)
    }

    const handlePassChange = (event) => {
        setPass(event.target.value)
    }
    return (
        <div className="flex flex-col h-[85vh] justify-center">
            <div>
                <h2 className="text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='space-y-6'>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <input
                            type="text"
                            required
                            className="bg-gray-50 w-full rounded-md py-1.5 pl-3 pr-17 mr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onChange={handleUserChange}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <input
                            type="password"
                            required
                            className="bg-gray-50 w-full rounded-md py-1.5 pl-3 pr-17 mr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onChange={handlePassChange}
                        />
                    </div>

                    <div>
                        <button
                            className="flex w-full justify-center rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={loginPressed}
                        >
                            Sign in
                        </button>
                        <button
                            className="flex w-full justify-center rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={signupPressed}
                        >
                            Create Account
                        </button>
                    </div>
                    <div>
                        <label>
                            {outputMessage}
                        </label>
                    </div>
                </div>
            </div>


            {/* <button onClick={signupPressed}>
                Sign Up
            </button> */}
            {/* <div>
                <label style={{marginLeft: rightShift+80+"px"}}>
                    {outputMessage}
                </label>
            </div> */}
        </div>
    )
}

export default LoginPage;
