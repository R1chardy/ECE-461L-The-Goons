import React, { useState } from 'react';
// import { Outlet, Link } from "react-router-dom";

function LoginPage() {
    const rightShift = 100; //Change this variable to shift everything right or left

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
        <div className="Login">
            <p style={{marginLeft: rightShift+80+"px"}}>
                Login Page
            </p>
            <div className="Username">
                <form>
                    <label style={{marginLeft: rightShift+"px"}}>
                    Username:
                    <input type="text" style={{marginLeft: "5px"}} placeholder="Enter Username" onChange={handleUserChange}/>
                    </label>
                </form>
            </div>
            <div ClassName="Password">
                <form>
                    <label  style={{marginLeft: rightShift+5+"px"}}>
                    Password:
                    <input type="password" style={{marginLeft: "5px"}} placeholder="Enter Password" onChange={handlePassChange}/>
                    </label>
                </form>
            </div>
            <button onClick={loginPressed} style={{marginLeft: rightShift+80+"px"}}>
                Login
            </button>
            <button onClick={signupPressed}>
                Sign Up
            </button>
            <div>
                <label style={{marginLeft: rightShift+80+"px"}}>
                    {outputMessage}
                </label>
            </div>
            <a href="/Projects">Project Page</a>
        </div>
    )
}

export default LoginPage;
