import React, { useState } from 'react';

function CreateProject(props) {

    const [code, setCode] = useState("")
    const [name, setName] = useState("")

    const CreatePressed = () => {

    }

    const handleCodeChange = (event) =>{
        setCode(event.target.value)
    }

    const handleInputChange = (event) => {
        setName(event.target.value)
    }

    return (
        <div className="bg-white backdrop-filter backdrop-blur-xl bg-opacity-60 rounded-md m-5 p-5">
            <p className='text-2xl'>Create Project</p>
            <div style={{display: 'flex', marginBottom: 30}}>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '10px'}}>
                    <label>Project Name: </label>
                    <input type="text" placeholder="Enter Project Name" onChange={handleInputChange}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginRight: '10px'}}>
                    <label>Code: </label>
                    <input type="password" placeholder="Enter Code" onChange={handleCodeChange}/>
                </div>
                <div>
                    <button style={{height: '100%', backgroundColor: 'white'}} onClick={CreatePressed}>Create Project</button>
                </div>
            </div>
        </div>
    );
}

export default CreateProject