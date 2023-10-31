import React, { useState } from 'react';

function CreateProject(props) {

    const [code, setCode] = useState("")
    const [name, setName] = useState("")

    const createPressed = () => {
        props.onCreatePress(name, code)
    }

    const handleCodeChange = (event) => {
        setCode(event.target.value)
    }

    const handleInputChange = (event) => {
        setName(event.target.value)
    }

    return (
        <div className="bg-white backdrop-filter backdrop-blur-xl bg-opacity-60 shadow-md rounded-md mt-3 mb-3 p-5">
            <p className='text-3xl font-bold'>Create a New Project</p>
            <div className='flex m-5'>
                <div className='grow'>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Project Name</label>
                    <input type="text" className="bg-gray-50 rounded-md py-1.5 pl-3 pr-17 mr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500" onChange={handleInputChange}/>
                </div>
                <div className='grow'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Project Code</label>
                    <input type="text" className="bg-gray-50 rounded-md py-1.5 pl-3 pr-17 mr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500" onChange={handleCodeChange}/>
                </div>
                <button type="button" className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={createPressed}>Create Project</button>
            </div>
        </div>
    );
}

export default CreateProject