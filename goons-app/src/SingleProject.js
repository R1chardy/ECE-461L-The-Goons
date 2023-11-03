import React, { useState } from 'react';
import HWSet from './HWSet'

function SingleProject(props) {

    const id = props.id
    const hwsChecked = props.hwsChecked
    const code = props.code
    const description = props.description

    // const [code, setCode] = useState("")

    const LeavePressed = () => {
        props.onDataUpdate(id, code)
    }

    const CheckPressed = (proj, hws, num, flag) => {
        props.onHWUpdate(proj, hws, num, code, flag)
        console.log(code)
    }

    // const handleInputChange = (event) => {
    //     setCode(event.target.value)
    // }

    return (
        <div className="bg-white backdrop-filter backdrop-blur-md bg-opacity-60 shadow-md rounded-md m-5 p-5">
            <p className='text-3xl font-bold'>Project {props.id}</p>

            <div class="p-5 grid grid-cols-2 row-gap-8 md:grid-cols-4">
                <div class="text-center md:border-r">
                <p class="text-xs tracking-widest text-gray-800 uppercase">
                    HW Set 1 Items
                </p>
                <h6 class="text-5xl font-bold">{hwsChecked.has([id,1].toString()) ? hwsChecked.get([id,1].toString()) : 0}</h6>
                </div>
                <div class="text-center">
                <p class="text-xs tracking-widest text-gray-800 uppercase">
                    HW Set 2 Items
                </p>
                <h6 class="text-5xl font-bold">{hwsChecked.has([id,2].toString()) ? hwsChecked.get([id,2].toString()) : 0}</h6>
                </div>
            </div>

            <div style={{display: 'flex', marginBottom: 30}}>
                <HWSet hwname={1} projname={id} hwsChecked={props.hwsChecked} CheckPressed={CheckPressed}></HWSet>
                <HWSet hwname={2} projname={id} hwsChecked={props.hwsChecked} CheckPressed={CheckPressed}></HWSet>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                {/* <button style={{height: '100%', backgroundColor: joined.has(id)? 'lightGreen' : 'white'}} onClick={JoinPressed}>{joined.has(id)? 'Leave' : 'Join'}</button> */}
                <button style={{height: '100%', backgroundColor: 'lightGreen'}} onClick={LeavePressed}>Leave</button>
            </div>
                {/* <input type="text" placeholder="Enter Code" onChange={handleInputChange} style={{height: '10%', marginTop: '30px'}}/> */}
            </div>
            <div className="grow">
                <label htmlFor="project_description" className="block mb-2 text-sm font-medium text-gray-900">
                    Project Description
                </label>
                <textarea
                    id="description"
                    className="bg-gray-50 rounded-md py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    rows="4" // You can adjust the number of rows to control the height of the text box
                    value={description} 
                    readOnly
                />
            </div>
        </div>
    );
}

export default SingleProject