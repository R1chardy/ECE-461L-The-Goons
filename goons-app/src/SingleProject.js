import React, { useState } from 'react';
import HWSet from './HWSet'

function SingleProject(props){

    const prop1 = props.prop1
    const prop3 = props.prop3
    const prop4 = props.prop4
    const prop5 = props.prop5

    const [code, setCode] = useState("")

    const JoinPressed = () =>{
        props.onDataUpdate(prop1)
    }

    const CheckPressed = (hws, num) =>{
        props.onHWUpdate(hws, num)
    }

    const handleInputChange = (event) =>{
        setCode(event.target.value)
    }

    return (
    <div>
        <p style={{marginBottom: '10px', fontWeight: 'bold'}}>Project {prop1}</p>
        <div style={{display: 'flex', marginBottom: 30}}>
            <HWSet prop1={1} prop2={prop1} prop3={prop3} prop4={prop4} prop5={prop5} CheckPressed={CheckPressed}></HWSet>
            <HWSet prop1={2} prop2={prop1} prop3={prop3} prop4={prop4} prop5={prop5} CheckPressed={CheckPressed}></HWSet>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px'}}>
                <button style={{height: '100%', backgroundColor: prop3.has(prop1)? 'lightGreen' : 'white'}} onClick={JoinPressed}>{prop3.has(prop1)? 'Leave' : 'Join'}</button>
            </div>
            <input type="text" placeholder="Enter Code" onChange={handleInputChange} style={{height: '10%', marginTop: '30px'}}/>
        </div>
    </div>
    );
}

export default SingleProject