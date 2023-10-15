import React, { useState } from 'react';
import HWSet from './HWSet'

function SingleProject(props) {

    const id = props.id
    const joined = props.joined
    

    const [code, setCode] = useState("")

    const JoinPressed = () => {
        props.onDataUpdate(id, code)
    }

    const CheckPressed = (proj, hws, num) => {
        props.onHWUpdate(proj, hws, num)
    }

    const handleInputChange = (event) => {
        setCode(event.target.value)
    }

    return (
        <div className="bg-white backdrop-filter backdrop-blur-xl bg-opacity-60 rounded-md m-5 p-5">
            <p className='text-2xl'>Project {props.id}</p>
            <div style={{display: 'flex', marginBottom: 30}}>
                <HWSet hwname={1} projname={id} joined={joined} hwsChecked={props.hwsChecked} CheckPressed={CheckPressed}></HWSet>
                <HWSet hwname={2} projname={id} joined={joined} hwsChecked={props.hwsChecked} CheckPressed={CheckPressed}></HWSet>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                <button style={{height: '100%', backgroundColor: joined.has(id)? 'lightGreen' : 'white'}} onClick={JoinPressed}>{joined.has(id)? 'Leave' : 'Join'}</button>
            </div>
                <input type="text" placeholder="Enter Code" onChange={handleInputChange} style={{height: '10%', marginTop: '30px'}}/>
            </div>
        </div>
    );
}

export default SingleProject