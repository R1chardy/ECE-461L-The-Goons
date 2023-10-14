import React, { useState } from 'react';

function ProjectPage() {
    const rightShift = 100; //Change this variable to shift everything right or left

    const loginPressed = (event) => {
        ;//Send over to backend

    }
    return (
        <div className="Login">
            <p style={{marginLeft: rightShift+80+"px"}}>
                This is a test
            </p>
            <div className="Username">
                <form>
                    <label style={{marginLeft: rightShift+"px"}}>
                    Username:
                    <input type="text" style={{marginLeft: "5px"}}/>
                    </label>
                </form>
            </div>
            <div ClassName="Password">
                <form>
                    <label  style={{marginLeft: rightShift+5+"px"}}>
                    Password:
                    <input type="password" style={{marginLeft: "5px"}}/>
                    </label>
                </form>
            </div>
            <button onClick={loginPressed} style={{marginLeft: rightShift+80+"px"}}>
                Create Project
            </button>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
        </div>
    )
}

export default ProjectPage;